
//coin

let rotobj = document.getElementById("rot");

let noclick = true;

let heads = document.createElement("img");
heads.src = "test/quarter-heads.png";

let tails = document.createElement("img");
tails.src = "test/quarter-tails.png";


heads.setAttribute("id", "heads")

tails.setAttribute("id", "tails")

let headclear = false;

let tailclear = false;


function pageload(){
    location.href = "board.html";
}

rotobj.addEventListener("click", function () {
    if (noclick == true) {
        document.getElementById("heads").remove();
        rotfunc();
    }
});



function rotfunc() {
    noclick = false;
    let flip = Math.floor((Math.random() * 10) + 1);
    let i = 0;
    let inter = setInterval(function () {
        if (i <= flip * 1000) {
            rotobj.style.transform = `rotateY(${(i / 1000) * 180}deg)`;
            i += 16.67;
        }
        else {
            clearInterval(inter);
            let timeout = setTimeout(pageload, 1000) 
        }
        if ((Math.floor((i + 500) / 1000) % 2 == 1)) {
            rotobj.appendChild(tails);
            if (headclear == false) {
                document.getElementById("heads").remove();
                headclear = true;
            }
            tailclear = false;
        }
        else {
            rotobj.appendChild(heads);
            if (tailclear == false) {
                document.getElementById("tails").remove();
                tailclear = true;
            }
            headclear = false;
        }
    }, 16.67);
}



//die

let die = document.getElementById("c3d");

let noroll = false;
die.addEventListener("click", function () {
    if (noroll == true) {
        return;
    }
    else {
        getRandom();
        roller();
    }
});


let rolledX;
let rolledY;

function getRandom(){
    rolledX = (Math.floor(Math.random() * 24) + 1);
    rolledY = (Math.floor(Math.random() * 24) + 1);
}

function roller() {
    let i = 0;
    let rollinter = setInterval(function () {
        if (i <= 4000 + 16.667) {
            die.style.transform = `rotateX(${(i / 4000)*rolledX*90}deg) rotateY(${(i / 4000)*rolledY*90}deg)`;
            i += 16.667;
            noroll = true;
        }
        else {
            numcheck();
            clearInterval(rollinter);
            noroll = false;
        }
    }, 16.667);
}

function numcheck(){
        switch(true){
            case(rolledY%4 == 0):
                switch(true){
                    case(rolledX%4 == 0):
                        console.log("1");
                        break;
                    case(rolledX%4 == 1):
                        console.log("4")
                        break;
                    case(rolledX%4 == 2):
                        console.log("6")
                        break;
                    case(rolledX%4 == 3):
                        console.log("2")
                        break;
                        
                }
                break;
            case((rolledY%4 == 1)):
                switch(true){
                    case(rolledX%4 == 0):
                        console.log("5");
                        break;
                    case(rolledX%4 == 1):
                        console.log("4")
                        break;
                    case(rolledX%4 == 2):
                        console.log("3")
                        break;
                    case(rolledX%4 == 3):
                        console.log("2")
                        break;
                }
                break;
            case((rolledY%4 == 2)):
                switch(true){
                    case(rolledX%4 == 0):
                        console.log("6");
                        break;
                    case(rolledX%4 == 1):
                        console.log("4")
                        break;
                    case(rolledX%4 == 2):
                        console.log("1")
                        break;
                    case(rolledX%4 == 3):
                        console.log("2")
                        break;
                }
                break;
            case((rolledY%4 == 3)):
                switch(true){
                    case(rolledX%4 == 0):
                        console.log("3");
                        break;
                    case(rolledX%4 == 1):
                        console.log("4")
                        break;
                    case(rolledX%4 == 2):
                        console.log("5")
                        break;
                    case(rolledX%4 == 3):
                        console.log("2")
                        break;
                }
                break;
        }
    }