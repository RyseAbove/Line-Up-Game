let boolarr = [
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"]
]

let gamecheck = []

let clist = []

let prearr = [
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e"]
]

let turndata = [false, false, false, false, false]

let rollopt;

let points = [0, 0];


//placement

let color = "red";
let fill = "#EE5151";

function placefunc(event) {
    if (rollopt == true) {
        return;
    }
    else {
        let box = event.target;
        let col = box.parentElement.parentElement.id;
        let num = parseFloat(col.replace('c', '')) - 1;
        for (let i = 7; i >= 0; i--) {
            if (boolarr[num][i] == 'e') {
                boolarr[num][i] = color;
                prefill(num, i, color);
                let canvas = document.getElementById(`${num + 1}${i + 1}`);
                let draw = canvas.getContext("2d");
                let wid = (top.innerWidth / 100);
                //( canvas.width/2, canvas.height/2, 2*wid, 0, 2 * Math.PI)
                draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                draw.stroke();
                draw.fillStyle = fill;
                draw.fill();
                gamecheck.push(color);

                cfunc();
                rollfuncl2();
                rollfuncl3();
                rollfuncl4();
                rollfuncl5();
                rollfuncl6();
                tellfunc();

                if (((gamecheck.length + 1) / 2) % 1 == 0) {
                    color = "blue";
                    precolor = 0;
                    fill = "#5187EE"
                }
                else {
                    color = "red";
                    precolor = 1;
                    fill = "#EE5151";
                }
                break;
            }
        }
    }
}

/*filling prearr*/
function prefill(x, y, z) {
    clist.push([x, y, z]);
    fillarr();
}

function fillarr() {
    for (let i = 0; i < (clist.length - 1); i++) {
        let m = 0;
        prearr[clist[i][m]][clist[i][m + 1]] = clist[i][m + 2];
    }
    console.log(prearr);
}

function cfunc() {
    for (let i = 0; i < 4; i++) {
        turndata[i] = false;
    }
}

//functions for line checks
function rollfuncl2() {
    for (let i = 0; i < (boolarr.length - 1); i++) {//horizontals
        for (let m = 0; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i + 1][m]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m] != prearr[i + 1][m]))) {
                    turndata[0] = true;
                }
            }
        }
        for (let m = 0; m < (boolarr[i].length - 1); m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i + 1][m + 1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m + 1] != prearr[i + 1][m + 1]))) {
                    turndata[0] = true;
                }
            }
        }
    }
    for (let i = 0; i < boolarr.length - 1; i++) {//fix
        for (let m = 1; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i + 1][m - 1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m - 1] != prearr[i + 1][m - 1]))) {
                    turndata[0] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length); i++) {//vertical
        for (let m = 0; m < (boolarr[i].length - 1); m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i][m + 1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m + 1] != prearr[i][m + 1]))) {
                    turndata[0] = true;
                }
            }
        }
    }
}

function rollfuncl3() {
    for (let i = 0; i < (boolarr.length - 2); i++) {//horizontals
        for (let m = 0; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m]) && (boolarr[i][m] == boolarr[i + 2][m])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m] != prearr[i + 1][m]) || (boolarr[i + 2][m] != prearr[i + 2][m]))) {
                    turndata[1] = true;
                }
            }
        }
        for (let m = 0; m < (boolarr[i].length - 2); m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i + 1][m + 1]) && (boolarr[i][m] == boolarr[i + 2][m + 2]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m + 1] != prearr[i + 1][m + 1]) || (boolarr[i + 2][m + 2] != prearr[i + 2][m + 2]))) {
                    turndata[1] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length - 2); i++) {//fix
        for (let m = 2; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m - 1]) && (boolarr[i][m] == boolarr[i + 2][m - 2])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m - 1] != prearr[i + 1][m - 1]) || (boolarr[i + 2][m - 2] != prearr[i + 2][m - 2]))) {
                    turndata[1] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length); i++) {//vertical
        for (let m = 0; m < (boolarr[i].length - 2); m++) {
            if (boolarr[i][m] != 'e') {
                if ((boolarr[i][m] == boolarr[i][m + 1]) && (boolarr[i][m] == boolarr[i][m + 2]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m + 1] != prearr[i][m + 1]) || (boolarr[i][m + 2] != prearr[i][m + 2]))) {
                    turndata[1] = true;
                }
            }
        }
    }
}

function rollfuncl4() {
    for (let i = 0; i < (boolarr.length - 3); i++) {//horizontals
        for (let m = 0; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m]) && (boolarr[i][m] == boolarr[i + 2][m]) && (boolarr[i][m] == boolarr[i + 3][m])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m] != prearr[i + 1][m]) || (boolarr[i + 2][m] != prearr[i + 2][m]) || (boolarr[i + 3][m] != prearr[i + 3][m]))) {
                    turndata[2] = true;
                }
            }
        }
        for (let m = 0; m < (boolarr[i].length - 3); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m + 1]) && (boolarr[i][m] == boolarr[i + 2][m + 2]) && (boolarr[i][m] == boolarr[i + 3][m + 3])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m + 1] != prearr[i + 1][m + 1]) || (boolarr[i + 2][m + 2] != prearr[i + 2][m + 2]) || (boolarr[i + 3][m + 3] != prearr[i + 3][m + 3]))) {
                    turndata[2] = true;
                }
            }
        }
    }
    for (let i = 0; i < boolarr.length - 3; i++) {//fix
        for (let m = 3; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m - 1]) && (boolarr[i][m] == boolarr[i + 2][m - 2]) && (boolarr[i][m] == boolarr[i + 3][m - 3])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m - 1] != prearr[i + 1][m - 1]) || (boolarr[i + 2][m - 2] != prearr[i + 2][m - 2]) || (boolarr[i + 3][m - 3] != prearr[i + 3][m - 3]))) {
                    turndata[2] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length); i++) {//vertical
        for (let m = 0; m < (boolarr[i].length - 3); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i][m + 1]) && (boolarr[i][m] == boolarr[i][m + 2]) && (boolarr[i][m] == boolarr[i][m + 3])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m + 1] != prearr[i][m + 1]) || (boolarr[i][m + 2] != prearr[i][m + 2]) || (boolarr[i][m + 3] != prearr[i][m + 3]))) {
                    turndata[2] = true;
                }
            }
        }
    }
}

function rollfuncl5() {
    for (let i = 0; i < (boolarr.length - 4); i++) {//horizontals
        for (let m = 0; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m]) && (boolarr[i][m] == boolarr[i + 2][m]) && (boolarr[i][m] == boolarr[i + 3][m]) && (boolarr[i][m] == boolarr[i + 4][m])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m] != prearr[i + 1][m]) || (boolarr[i + 2][m] != prearr[i + 2][m]) || (boolarr[i + 3][m] != prearr[i + 3][m]) || (boolarr[i + 4][m] != prearr[i + 4][m]))) {
                    turndata[3] = true;
                }
            }
        }
        for (let m = 0; m < (boolarr[i].length - 4); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m + 1]) && (boolarr[i][m] == boolarr[i + 2][m + 2]) && (boolarr[i][m] == boolarr[i + 3][m + 3]) && (boolarr[i][m] == boolarr[i + 4][m + 4])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m + 1] != prearr[i + 1][m + 1]) || (boolarr[i + 2][m + 2] != prearr[i + 2][m + 2]) || (boolarr[i + 3][m + 3] != prearr[i + 3][m + 3]) || (boolarr[i + 4][m + 4] != prearr[i + 4][m + 4]))) {
                    turndata[3] = true;
                }
            }
        }
    }
    for (let i = 0; i < boolarr.length - 4; i++) {//fix
        for (let m = 4; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m - 1]) && (boolarr[i][m] == boolarr[i + 2][m - 2]) && (boolarr[i][m] == boolarr[i + 3][m - 3]) && (boolarr[i][m] == boolarr[i + 4][m - 4])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m - 1] != prearr[i + 1][m - 1]) || (boolarr[i + 2][m - 2] != prearr[i + 2][m - 2]) || (boolarr[i + 3][m - 3] != prearr[i + 3][m - 3]) || (boolarr[i + 4][m - 4] != prearr[i + 4][m - 4]))) {
                    turndata[3] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length); i++) {//vertical
        for (let m = 0; m < (boolarr[i].length - 4); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i][m + 1]) && (boolarr[i][m] == boolarr[i][m + 2]) && (boolarr[i][m] == boolarr[i][m + 3]) && (boolarr[i][m] == boolarr[i][m + 4]) && (boolarr[i][m] == boolarr[i][m + 5])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m + 1] != prearr[i][m + 1]) || (boolarr[i][m + 2] != prearr[i][m + 2]) || (boolarr[i][m + 3] != prearr[i][m + 3]) || (boolarr[i][m + 4] != prearr[i][m + 4]))) {
                    turndata[3] = true;
                }
            }
        }
    }
}

function rollfuncl6() {
    for (let i = 0; i < (boolarr.length - 5); i++) {//horizontals
        for (let m = 0; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m]) && (boolarr[i][m] == boolarr[i + 2][m]) && (boolarr[i][m] == boolarr[i + 3][m]) && (boolarr[i][m] == boolarr[i + 4][m]) && (boolarr[i][m] == boolarr[i + 5][m])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m] != prearr[i + 1][m]) || (boolarr[i + 2][m] != prearr[i + 2][m]) || (boolarr[i + 3][m] != prearr[i + 3][m]) || (boolarr[i + 4][m] != prearr[i + 4][m]) || (boolarr[i + 5][m] != prearr[i + 5][m]))) {
                    turndata[4] = true;
                }
            }
        }
        for (let m = 0; m < (boolarr[i].length - 5); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m + 1]) && (boolarr[i][m] == boolarr[i + 2][m + 2]) && (boolarr[i][m] == boolarr[i + 3][m + 3]) && (boolarr[i][m] == boolarr[i + 4][m + 4]) && (boolarr[i][m] == boolarr[i + 5][m + 5])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m + 1] != prearr[i + 1][m + 1]) || (boolarr[i + 2][m + 2] != prearr[i + 2][m + 2]) || (boolarr[i + 3][m + 3] != prearr[i + 3][m + 3]) || (boolarr[i + 4][m + 4] != prearr[i + 4][m + 4]) || (boolarr[i + 5][m + 5] != prearr[i + 5][m + 5]))) {
                    turndata[4] = true;
                }
            }
        }
    }
    for (let i = 0; i < boolarr.length - 5; i++) {//fix
        for (let m = 5; m < boolarr[i].length; m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i + 1][m - 1]) && (boolarr[i][m] == boolarr[i + 2][m - 2]) && (boolarr[i][m] == boolarr[i + 3][m - 3]) && (boolarr[i][m] == boolarr[i + 4][m - 4]) && (boolarr[i][m] == boolarr[i + 5][m - 5])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i + 1][m - 1] != prearr[i + 1][m - 1]) || (boolarr[i + 2][m - 2] != prearr[i + 2][m - 2]) || (boolarr[i + 3][m - 3] != prearr[i + 3][m - 3]) || (boolarr[i + 4][m - 4] != prearr[i + 4][m - 4]) || (boolarr[i + 5][m - 5] != prearr[i + 5][m - 5]))) {
                    turndata[4] = true;
                }
            }
        }
    }
    for (let i = 0; i < (boolarr.length); i++) {//vertical
        for (let m = 0; m < (boolarr[i].length - 5); m++) {
            if (boolarr[i][m] != 'e') {
                if (((boolarr[i][m] == boolarr[i][m + 1]) && (boolarr[i][m] == boolarr[i][m + 2]) && (boolarr[i][m] == boolarr[i][m + 3]) && (boolarr[i][m] == boolarr[i][m + 4]) && (boolarr[i][m] == boolarr[i][m + 5])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m + 1] != prearr[i][m + 1]) || (boolarr[i][m + 2] != prearr[i][m + 2]) || (boolarr[i][m + 3] != prearr[i][m + 3]) || (boolarr[i][m + 4] != prearr[i][m + 4]) || (boolarr[i][m + 5] != prearr[i][m + 5]))) {
                    turndata[4] = true;
                }
            }
        }
    }
}


function tellfunc() {
    for (let i = 0; i < turndata.length; i++) {
        if (turndata[i] == true) {
            document.getElementById("pos").innerHTML = "a roll is possible";
            rollopt = true;
            break;
        }
        else {
            document.getElementById("pos").innerHTML = "";
        }
    }
}

let dieresult;

function diefunc() {
    if (rollopt == false) {
        return;
    }
    else {
        let prob;
        for (let i = 0; i < turndata.length; i++) {
            if (turndata[i] == true) {
                prob = i;
            }
        }
        if (prob == 0) {
            roller();
            if (dieresult == 0) {
                addpoint();
            }
            else {
                document.getElementById("pos").innerHTML = "no points gained"
            }
            rollopt = false;
        }
        else if (prob == 1) {
            roller();
            if (dieresult == (0 || 1)) {
                addpoint();
            }
            else {
                document.getElementById("pos").innerHTML = "no points gained"
            }
            rollopt = false;
        }
        else if (prob == 2) {
            roller();
            if (dieresult == (0 || 1 || 2)) {
                addpoint();
            }
            else {
                document.getElementById("pos").innerHTML = "no points gained"
            }
            rollopt = false;
        }
        else if (prob == 3) {
            roller();
            if (dieresult == (0 || 1 || 2 || 3)) {
                addpoint();
            }
            else {
                document.getElementById("pos").innerHTML = "no points gained"
            }
            rollopt = false;
        }
        else if (prob == 4) {
            roller();
            if (dieresult == (0 || 1 || 2 || 3 || 4)) {
                addpoint();
            }
            else {
                document.getElementById("pos").innerHTML = "no points gained"
            }
            rollopt = false;
        }
    }

}

function addpoint() {
    points[precolor] += 1;
    document.getElementById("point-red").innerHTML = points[0];
    document.getElementById("point-blue").innerHTML = points[1];

    document.getElementById("pos").innerHTML = ("Point Gained")
}

function roller() {
    dieresult = Math.floor(Math.random() * 6);
    console.log(dieresult)
}

// Dice

// function rollDice() {
//     const dice = [...document.querySelectorAll(".die-list")];
//     dice.forEach(die => {
//         toggleClasses(die);
//         die.dataset.roll = getRandomNumber(1, 6);
//     });
// }

// function toggleClasses(die) {
//     die.classList.toggle("odd-roll")
//     die.classList.toggle("even-roll");
// }

// function getRandomNumber(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// window.addEventListener('DOMContentLoaded', function() {

// const btn = document.querySelector('#roll-button');
// btn.addEventListener('click', rollDice);

// });

// document.getElementById("#roll-button").addEventListener("click", rollDice);