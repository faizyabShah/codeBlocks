
class variable {
    id = "0";
    text = "Variable";

    constructor() {
        this.name = "";
        this.value = "";
        this.render = true;
        this.canHaveChildren = false;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
            codeEl.classList.add("codeInstance");
            codeEl.classList.add("variable");
            codeEl.id = this.id;
            let title = document.createElement("p");
            title.innerHTML = this.text;
            title.classList.add("title");
            let text = document.createElement("p");
            text.innerHTML = "Set";
            let input = document.createElement("input");
            input.type = "text";
            input.addEventListener("change", () => {
                this.name = input.value;
            })
            let text2 = document.createElement("p");
            text2.innerHTML = "To";
            let input2 = document.createElement("input");
            input2.type = "text";
            input2.addEventListener("change", () => {
                this.value = input2.value;
            })
            codeEl.appendChild(title);
            codeEl.appendChild(text);
            codeEl.appendChild(input);
            codeEl.appendChild(text2);
            codeEl.appendChild(input2);
            return codeEl;
    }

    generatePHPCode = function() {
        return "$" + this.name + " = " + this.value + ";";
    }
}

class math {
    id = "0";
    text = "Math";

    constructor() {
        this.operations = ["+", "-", "*", "/"];
        this.assignTo = "";
        this.value1 = "";
        this.value2 = "";
        this.render = true;
        this.canHaveChildren = false;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("math");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let input0 = document.createElement("input");
        input0.type = "text";
        let input = document.createElement("input");
        input.type = "text";
        let choose = document.createElement("select");
        for (let i=0; i<this.operations.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = this.operations[i];
            choose.append(option);
        }
        let input2 = document.createElement("input");
        input2.type = "text";
        let text = document.createElement("p");
        codeEl.appendChild(title);
        codeEl.appendChild(input0);
        codeEl.innerHTML += "=";
        codeEl.appendChild(input);
        codeEl.appendChild(choose);
        codeEl.appendChild(input2);
        codeEl.appendChild(text);
        return codeEl;
    }
    
}

class func {
    id = "2";
    text = "Function";

    constructor() {
        this.name = "";
        this.parameters = [];
        this.canHaveChildren = true;
        this.children = [];
        this.render = true;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("function");
        codeEl.classList.add("allowsNesting");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let input = document.createElement("input");
        input.type = "text";
        input.addEventListener("change", () => {
            this.name = input.value;
        })
        let text = document.createElement("p");
        text.innerHTML = "Add Parameter";
        let button = document.createElement("button");
        button.innerHTML = "+";
        button.addEventListener("click", () => {
            let input = document.createElement("input");
            input.type = "text";
            input.addEventListener("change", () => {
                this.parameters[this.parameters.length] = input.value;
            })
            codeEl.appendChild(input);
        })
        
        let insideDiv = document.createElement("div");
        insideDiv.classList.add("insideDiv");
        codeEl.appendChild(title);
        codeEl.appendChild(input);
        codeEl.appendChild(text);
        codeEl.appendChild(button);
        codeEl.appendChild(insideDiv);
        codeEl.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newNode = drop_handler(e);
            this.children = [...this.children, newNode];

        });
        return codeEl;
    }

    generatePHPCode = function() {
        let code = "function " + this.name + "(";
        for (let i=0; i<this.parameters.length; i++) {
            code += "$" + this.parameters[i];
            if (i != this.parameters.length-1) {
                code += ", ";
            }
        }
        code += ") {";
        return code;
    }
}

class forLoop {
    id = "3";
    text = "For Loop";

    constructor() {
        this.canHaveChildren = true;
        this.children = [];
        this.render = true;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("forLoop");
        codeEl.classList.add("allowsNesting");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let text = document.createElement("p");
        text.innerHTML = "From";
        let start = document.createElement("input");
        start.type = "text";
        start.addEventListener("change", () => {
            this.start = start.value;
        })
        let text2 = document.createElement("p");
        text2.innerHTML = "To";
        let end = document.createElement("input");
        end.type = "text";
        end.addEventListener("change", () => {
            this.end = end.value;
        })
        let text4 = document.createElement("p");
        text4.innerHTML = "Variable";
        let input4 = document.createElement("input");
        input4.type = "text";
        input4.addEventListener("change", () => {
            this.variable = input4.value;
        })
        codeEl.appendChild(title);
        codeEl.appendChild(text4);
        codeEl.appendChild(input4);
        codeEl.appendChild(text);
        codeEl.appendChild(start);
        codeEl.appendChild(text2);
        codeEl.appendChild(end);
        let insideDiv = document.createElement("div");
        insideDiv.classList.add("insideDiv");
        codeEl.appendChild(insideDiv);
        codeEl.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newNode = drop_handler(e);
            this.children = [...this.children, newNode];

        });
        
        return codeEl;
    }

    generatePHPCode = function() {
        let code = "for ($" + this.variable + "=" + this.start + "; $" + this.variable + "<" + this.end + "; $" + this.variable + "++) {";
        return code;
    }
}

class condition {
    id = "4";
    text = "Condition";

    constructor() {
        this.canHaveChildren = true;
        this.children = [];
        this.render = true;
        this.comparators = [">", "<", "==", ">=", "<=", "!="];
        this.var1 = "";
        this.var2 = "";
        this.comparator = "";
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("ifCondition");
        codeEl.classList.add("allowsNesting");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let input = document.createElement("input");
        input.type = "text";
        input.addEventListener("change", () => {
            this.var1 = input.value;
        })
        let choose = document.createElement("select");
        for (let i=0; i<this.comparators.length; i++) {
            let option = document.createElement("option");
            option.value = this.comparators[i];
            option.innerHTML = this.comparators[i];
            choose.append(option);
        }
        choose.addEventListener("change", () => {
            this.comparator = choose.value;
        })
        
        choose.innerHTML += "<option value='' selected></option>";
        let input2 = document.createElement("input");
        input2.type = "text";
        input2.addEventListener("change", () => {
            this.var2 = input2.value;
        })
        codeEl.appendChild(title);
        codeEl.appendChild(input);
        codeEl.appendChild(choose);
        codeEl.appendChild(input2);
        let insideDiv = document.createElement("div");
        insideDiv.classList.add("insideDiv");
        codeEl.appendChild(insideDiv);
        codeEl.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newNode = drop_handler(e);
            this.children = [...this.children, newNode];

        });
        return codeEl;
    }

    generatePHPCode = function() {
        let code = "if ($" + this.var1 + " " + this.comparator + " $" + this.var2 + ") {";
        return code;
    }
}

class print {
    id ="5";
    text = "Print";

    constructor() {
        this.value = "";
        this.render = true;
        this.canHaveChildren = false;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("print");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let input = document.createElement("input");
        input.type = "text";
        input.addEventListener("change", () => {
            this.value = input.value;
        })
        let text = document.createElement("p");
        text.innerHTML = "Print";
        codeEl.appendChild(title);
        codeEl.appendChild(text);
        codeEl.appendChild(input);
        return codeEl;
    }

    generatePHPCode = function() {
        let code = "echo " + this.value + ";";
        return code;
    }
} 

class funcCall {
    id = "6";
    text = "Function Call";
    
    constructor() {
        this.render = true;
        this.canHaveChildren = false;
        this.parameters = [];
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("funcCall");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let params = document.createElement("div");
        params.classList.add("params");
        let select = document.createElement("select");
        let funcs = getAllFunctions();
        for (let i=0; i<funcs.length; i++) {
            let option = document.createElement("option");
            option.value = funcs[i].name;
            option.innerHTML = funcs[i].name;
            select.append(option);
        }
        select.innerHTML += "<option value='' selected></option>";
        select.addEventListener("change", () => {
            params.innerHTML = "";
            this.name = select.value;
            for (let i=0; i<funcs.length; i++) {
                if (funcs[i].name == this.name) {
                    console.log("name matched")
                    for (let j=0; j<funcs[i].parameters.length; j++) {
                        console.log(j)
                        let input = document.createElement("input");
                        input.type = "text";
                        input.addEventListener("change", () => {
                            this.parameters[this.parameters.length] = input.value;
                        })
                        params.appendChild(input);
                    }
                }
            }
        })

        let text = document.createElement("p");
        text.innerHTML = "Call Function";
        codeEl.appendChild(title);
        codeEl.appendChild(text);
        codeEl.appendChild(select);
        codeEl.appendChild(params);
        return codeEl;
    }
}