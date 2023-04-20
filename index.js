let globalObjs = [];
let insideDivs = 0;

function _generatePHP (arr, indent = "") {
    let code = "";
    // console.log(arr.length);
    for (let i=0; i<arr.length; i++) {
        // console.log(i)
        if (arr[i].render) {
            if (arr[i].canHaveChildren) {
                code += indent + arr[i].generatePHPCode() + "<br>";
                if (arr[i].children.length > 0) {
                    code += _generatePHP(arr[i].children, indent + "    ") + "<br>";
                }
                code += indent + "} <br>"
            } else {
                code += indent + arr[i].generatePHPCode() + "<br>";
            }
        }
    }
    return code;
}

function generatePHP(arr = globalObjs) {
    let code = _generatePHP(arr);
    code = code.replace(/ /g, "&nbsp;");
    document.getElementById("phpOutput").innerHTML = code;
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i=0; i<codeBlocks.length; i++) {
        let parent = document.getElementById("toolbar");
        let newCodeBlock = document.createElement("div");
        newCodeBlock.classList.add("codeElement");
        newCodeBlock.id = codeBlocks[i].id;
        newCodeBlock.innerHTML = codeBlocks[i].text;
        newCodeBlock.draggable = "true";
        newCodeBlock.setAttribute('ondragstart', "dragstart_handler(event)");
        parent.appendChild(newCodeBlock);
    }
})


function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");
    const source = document.getElementById(data);
    const target = ev.target;
    let codeBlock;
    let index;
    if (ev.target.classList.contains("insideDiv")) {
        codeBlock = createCodeBlock(source, target);
        index = ev.target.classList[1];
    } else {
        codeBlock = createCodeBlock(source, document.getElementById("codeBlocks"));
    }
    if (codeBlock.canHaveChildren) {
        insideDivs += 1;
    }

    if (typeof(index) != 'undefined') {
        globalObjs[index].children.push(codeBlock);
    }
    else {
        globalObjs.push(codeBlock);
    }
    
}
    
    

function createCodeBlock(source, target) {
    let codeBlock;
    switch (source.id) {
        case "0":
            codeBlock = new variable(target);
            return codeBlock;
        case "1":
            codeBlock = new math(target);
            return codeBlock;
        case "2":
            codeBlock = new func(target, insideDivs);
            return codeBlock;
        case "3":
            codeBlock = new forLoop(target, insideDivs);
            return codeBlock;
        case "4":
            codeBlock = new condition(target, insideDivs);
            return codeBlock;
        case "5":
            codeBlock = new print(target);
            return codeBlock;
        case "6":
            codeBlock = new funcCall(target, globalObjs);
            return codeBlock;
    }
}


function getAllFunctions() {
    funcs = [];
    for (let i=0; i<globalObjs.length; i++) {
        if (globalObjs[i].canHaveChildren && globalObjs[i].children.length > 0) {
            if (globalObjs[i].id == "2") {
                funcs.push(globalObjs[i]);
            }
            funcs.push(getAllFunctions(globalObjs[i].children));
        }
        else {
            if (globalObjs[i].id == "2") {
                funcs.push(globalObjs[i]);
            }
        }
    }
    return funcs;
}