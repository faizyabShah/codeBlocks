
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
            input.placeholder = "Variable Name";
            input.addEventListener("change", () => {
                this.name = input.value;
            })
            let text2 = document.createElement("p");
            text2.innerHTML = "To";
            let input2 = document.createElement("input");
            input2.type = "text";
            input2.placeholder = "String/Num"
            input2.addEventListener("change", () => {
                this.value = input2.value;
            })
            let wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            codeEl.appendChild(title);
            wrapper.appendChild(text);
            wrapper.appendChild(input);
            wrapper.appendChild(text2);
            wrapper.appendChild(input2);
            codeEl.appendChild(wrapper);
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
        this.operation = "";
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
        let inputZero = document.createElement("input");
        inputZero.type = "text";
        inputZero.placeholder = "Variable";
        inputZero.addEventListener("change", () => {
            this.assignTo = inputZero.value;
        })
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Variable/value";
        input.addEventListener("change", () => {
            this.value1 = input.value;
        })
        let choose = document.createElement("select");
        choose.innerHTML += "<option value='' selected></option>"
        for (let i=0; i<this.operations.length; i++) {
            let option = document.createElement("option");
            option.value = this.operations[i];
            option.innerHTML = this.operations[i];
            choose.append(option);
        }
        choose.addEventListener("change", () => {
            this.operation = choose.value;
        })
        let input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "Variable/value";
        input2.addEventListener("change", () => {
            this.value2 = input2.value;
        })
        let text = document.createElement("p");
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        wrapper.appendChild(inputZero);
        text.innerHTML = "=";
        wrapper.appendChild(text);
        wrapper.appendChild(input);
        wrapper.appendChild(choose);
        wrapper.appendChild(input2);
        codeEl.appendChild(wrapper);
        return codeEl;
    }

    generatePHPCode = function() {
        return `$${this.assignTo} = ${this.value1} ${this.operation} ${this.value2};
        `
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
        input.placeholder = "Name";
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
            input.placeholder = "Variable name";
            input.addEventListener("change", () => {
                this.parameters[this.parameters.length] = input.value;
            })
            wrapper.appendChild(input);
        })
        
        let insideDiv = document.createElement("div");
        insideDiv.classList.add("insideDiv");
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        wrapper.appendChild(input);
        wrapper.appendChild(text);
        wrapper.appendChild(button);
        codeEl.appendChild(wrapper);
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
        start.placeholder = "Number";
        start.addEventListener("change", () => {
            this.start = start.value;
        })
        let text2 = document.createElement("p");
        text2.innerHTML = "To";
        let end = document.createElement("input");
        end.type = "text";
        end.placeholder = "Number";
        end.addEventListener("change", () => {
            this.end = end.value;
        })
        let text4 = document.createElement("p");
        text4.innerHTML = "Variable";
        let input4 = document.createElement("input");
        input4.type = "text";
        input4.placeholder = "variable name";
        input4.addEventListener("change", () => {
            this.variable = input4.value;
        })
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        wrapper.appendChild(text4);
        wrapper.appendChild(input4);
        wrapper.appendChild(text);
        wrapper.appendChild(start);
        wrapper.appendChild(text2);
        wrapper.appendChild(end);
        codeEl.appendChild(wrapper);
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
    text = "If Condition";

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
        let text = document.createElement("p");
        text.innerHTML = "IF";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Variable/Value";
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
        input2.placeholder = "Variable/value";
        input2.addEventListener("change", () => {
            this.var2 = input2.value;
        })
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(text);
        wrapper.appendChild(input);
        wrapper.appendChild(choose);
        wrapper.appendChild(input2);
        codeEl.appendChild(title);
        codeEl.appendChild(wrapper);
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
        let code = "if (" + this.var1 + " " + this.comparator + " " + this.var2 + ") {";
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
        input.placeholder = "Variable/value";
        input.addEventListener("change", () => {
            this.value = input.value;
        })
        let text = document.createElement("p");
        text.innerHTML = "Print";
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        wrapper.appendChild(text);
        wrapper.appendChild(input);
        codeEl.appendChild(wrapper);
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
        let funcs = getAllFunctions(globalObjs);
        console.log(globalObjs);
        console.log(funcs);
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
                        input.placeholder = funcs[i].parameters[j];
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
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        wrapper.appendChild(text);
        wrapper.appendChild(select);
        wrapper.appendChild(params);
        codeEl.appendChild(wrapper);
        return codeEl;
    }

    generatePHPCode = function() {
        let code = this.name + "(";
        for (let i=0; i<this.parameters.length; i++) {
            code += this.parameters[i];
            if (i != this.parameters.length-1) {
                code += ", ";
            }
        }
        code += ");";
        return code;
    }
}


class elseIf {
    id = "7";
    text = "Else if";

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
        codeEl.classList.add("elseIfCondition");
        codeEl.classList.add("allowsNesting");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let text = document.createElement("p");
        text.innerHTML = "IF";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Variable/Value";
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
        input2.placeholder = "Variable/value";
        input2.addEventListener("change", () => {
            this.var2 = input2.value;
        })
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(text);
        wrapper.appendChild(input);
        wrapper.appendChild(choose);
        wrapper.appendChild(input2);
        codeEl.appendChild(title);
        codeEl.appendChild(wrapper);
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
        let code = "elseif (" + this.var1 + " " + this.comparator + " " + this.var2 + ") {";
        return code;
    }

}

class Else {
    id = "8";
    text = "Else";

    constructor() {
        this.canHaveChildren = true;
        this.children = [];
        this.render = true;
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("elseCondition");
        codeEl.classList.add("allowsNesting");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        codeEl.appendChild(title);
        codeEl.appendChild(wrapper);
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
        let code = "else {";
        return code;
    }

}

class fileRead {
    id= "9";
    text = "File Read";

    constructor() {
        this.canHaveChildren = false;
        this.render = true;
        this.var1 = "";
        this.fileName = "";
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("fileRead");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let text1 = document.createElement("p");
        text1.innerHTML = "Store in:";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Variable";
        input.addEventListener("change", () => {
            this.var1 = input.value;
        })
        let text2 = document.createElement("p");
        text2.innerHTML = "From: ";
        let input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "File Name";
        input2.addEventListener("change", () => {
            this.fileName = input2.value;
        })
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(text1);
        wrapper.appendChild(input);
        wrapper.appendChild(text2);
        wrapper.appendChild(input2);
        codeEl.appendChild(title);
        codeEl.appendChild(wrapper);
        return codeEl;
    }

    generatePHPCode = function() {
        let code = "$" + this.var1 + ' = file_get_contents("' + this.fileName + '");';
        return code;
    }

}

class fileWrite {
    id= "9";
    text = "File Write";

    constructor() {
        this.canHaveChildren = false;
        this.render = true;
        this.string = "";
        this.fileName = "";
    }

    makeDiv = function() {
        let codeEl = document.createElement("div");
        codeEl.classList.add("codeInstance");
        codeEl.classList.add("fileWrite");
        codeEl.id = this.id;
        let title = document.createElement("p");
        title.innerHTML = this.text;
        title.classList.add("title");
        let text1 = document.createElement("p");
        text1.innerHTML = "Write to: ";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "File Name";
        input.addEventListener("change", () => {
            this.fileName = input.value;
        })
        let text2 = document.createElement("p");
        text2.innerHTML = "text: ";
        let input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "Enter Text";
        input2.addEventListener("change", () => {
            this.string = input2.value;
        })
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(text1);
        wrapper.appendChild(input);
        wrapper.appendChild(text2);
        wrapper.appendChild(input2);
        codeEl.appendChild(title);
        codeEl.appendChild(wrapper);
        return codeEl;
    }

    generatePHPCode = function() {
        let code = 'file_put_contents("' + this.fileName + '", "' + this.string + '");';
        return code;
    }
}