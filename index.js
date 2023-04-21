let globalObjs = [];


// function that generates the PHP code from each element, and calls recursively on 
// elements that allow nesting of other elements inside of them
function _generatePHP (arr, indent = "") {
    let code = "";
    for (let i=0; i<arr.length; i++) {
        if (arr[i].render) {
            if (arr[i].canHaveChildren) {
                code += indent + arr[i].generatePHPCode() + "<br>";
                if (arr[i].children.length > 0) {
                    code += _generatePHP(arr[i].children, indent + "    ");
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
    document.getElementById("phpCodeOutput").innerHTML = code;
}



// This function runs on start and dynamically makes all the blocks in the toolbar
document.addEventListener("DOMContentLoaded", () => {
    for (let i=0; i<codeBlocks.length; i++) {
        let parent = document.getElementById("toolbar");
        let newCodeBlock = document.createElement("div");
        newCodeBlock.classList.add("codeElement");
        newCodeBlock.id = codeBlocks[i].id;
        newCodeBlock.innerHTML = codeBlocks[i].text;
        newCodeBlock.style.backgroundColor = codeBlocks[i].color;
        newCodeBlock.draggable = "true";
        newCodeBlock.setAttribute('ondragstart', "dragstart_handler(event)");
        parent.appendChild(newCodeBlock);
    }
})


// This function deals with dragging code blocks
function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}


// This function deals with moving code blocks
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

// This function deals with dropping code blocks, and keeps on calling recursively untill
// it reaches the block that allows nesting of other blocks inside of it
function drop_handler(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/my-app");
    const source = document.getElementById(data);
    const target = getFertileParent(e.target);
    if (target == document.getElementById("codeBlocks")) {
        let codeBlock = createCodeBlock(source, target);
        globalObjs.push(codeBlock);
    } else {
        let codeBlock = createCodeBlock(source, target.getElementsByClassName("insideDiv")[0]);
        return codeBlock;
    } 
}
    
    
// this function creates the appropriate code object and returns it
function createCodeBlock(source, target) {
    let codeBlock;
    switch (source.id) {
        case "0":
            codeBlock = new variable();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "1":
            codeBlock = new math();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "2":
            codeBlock = new func();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "3":
            codeBlock = new forLoop();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "4":
            codeBlock = new condition();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "5":
            codeBlock = new print();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "6":
            codeBlock = new funcCall();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "7":
            codeBlock = new elseIf();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "8":
            codeBlock = new Else();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "9":
            codeBlock = new fileRead();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
        case "10":
            codeBlock = new fileWrite();
            target.appendChild(codeBlock.makeDiv());
            return codeBlock;
    }
}

// This function returns the block that allows nesting of other blocks inside of it
function getFertileParent(node) {
    if (node.classList.contains("allowsNesting"))return node;
    else return getFertileParent(node.parentNode);
}


// This function runs recursively to find all the code objects that are of type function
// This information is used in making the function call object
function getAllFunctions(arr) {
    funcs = [];
    for (let i=0; i<arr.length; i++) {
        if (arr[i].id == "2") {
            funcs.push(arr[i]);
            console.log("added one");
            if (arr[i].children.length > 0) {
                funcs = [... funcs, ... getAllFunctions((arr[i]).children)];
            }
    }
}
    return funcs;
}


// This function makes the request to php server to run the code it sent
// and outputs the response to user
function executePHP() {
    let code = document.getElementById("phpCodeOutput").innerText;
    console.log(code);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "execute.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(code));
    console.log(xhr);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          
            document.getElementById("phpExecutionOutput").innerHTML = xhr.responseText;
        }
      };


}