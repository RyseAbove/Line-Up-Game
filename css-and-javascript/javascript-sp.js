// board array

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

// premove board array

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

let gamecheck = []

let clist = []

let turndata = [false, false, false, false, false]

let rollopt;

let points = [0, 0];

//win condition
function appendwin(cparam){
    for(let i=0; i<points.length; i++){
        console.log(points[i]);
        if(points[i] == 5){
            console.log("breh");
            let windiv = document.createElement("div");
            windiv.id = ("windiv");
            let winh2 = document.createElement("h2");
            winh2.innerHTML = `${cparam} has won!`;
            windiv.appendChild(winh2);
            document.body.appendChild(windiv);
            onjoincondition = false;
        }
    }
}

let color = "red";
let fill = "#EE5151";

// Placing checkers

let canvelem = document.querySelectorAll('.canvas');

for (let i = 0; i < canvelem.length; i++) {
    canvelem[i].addEventListener('click', e => {
        if (rollopt == true) {
            return;
        }
        // else if (color == "blue") {
        //     aiPlace();
        // }
        else {
            let box = e.target;
            let col = box.parentElement.parentElement.id;
            let num = parseFloat(col.replace('c', '')) - 1;
            for (let i = 7; i >= 0; i--) {
                if (boolarr[num][i] == 'e') {
                    boolarr[num][i] = color;
                    prefill(num, i, color);
                    let canvas = document.getElementById(`${num + 1}${i + 1}`);
                    let draw = canvas.getContext("2d");
                    let wid = (top.innerWidth / 100);
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
})};

// hover

for (let i = 0; i < canvelem.length; i++) {
    canvelem[i].addEventListener('mouseover', e => {
        let box = e.target;
        let col = box.parentElement.parentElement.id;
        let num = parseFloat(col.replace('c', '')) - 1;
        let first = 0;
        if (boolarr[num][first] == 'e') {
            let canvas = document.getElementById(`${num + 1}${first + 1}`);
            let draw = canvas.getContext("2d");
            let wid = (top.innerWidth / 100);
            draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
            draw.stroke();
            draw.fillStyle = fill;
            draw.fill();
        }
    })
};

// removes hover

for (let i = 0; i < canvelem.length; i++) {
    canvelem[i].addEventListener('mouseleave', e => {
        let box = e.target;
        let col = box.parentElement.parentElement.id;
        let num = parseFloat(col.replace('c', '')) - 1;
        let first = 0;
        if (boolarr[num][first] == 'e') {
            let canvas = document.getElementById(`${num + 1}${first + 1}`);
            let draw = canvas.getContext("2d");
            draw.clearRect(0, 0, canvas.width, canvas.height);
        }
    })
};

// Computer Opponent

// ai array

// let aiarray = [[0], [0], [0], [0], [0]];

// // ai function

// function aiPlace() {
//     if (color == 'blue') {
//         for (let i = 0; i < (boolarr.length - 1); i++) {
//             for (let m = 0; m < boolarr[i].length; m++) {
//                 if (boolarr[i][m] == 'e') {
//                     switch (true) {
//                         case (boolarr[i + 1][m]):
//                             aiarray[0].push[i, m];
//                         case (boolarr[i + 1][m + 1]):
//                             aiarray[0].push[i, m];
//                         case (boolarr[i + 1][m - 1]):
//                             aiarray[0].push[i, m];
//                         case (boolarr[i][m + 1]):
//                             aiarray[0].push[i, m];
//                         case (boolarr[i + 2][m]):
//                             aiarray[1].push[i, m];
//                         case (boolarr[i + 2][m + 2]):
//                             aiarray[1].push[i, m];
//                         case (boolarr[i + 2][m - 2]):
//                             aiarray[1].push[i, m];
//                         case (boolarr[i][m + 2]):
//                             aiarray[1].push[i, m];
//                         case (boolarr[i + 3][m]):
//                             aiarray[2].push[i, m];
//                         case (boolarr[i + 3][m + 3]):
//                             aiarray[2].push[i, m];
//                         case (boolarr[i + 3][m - 3]):
//                             aiarray[2].push[i, m];
//                         case (boolarr[i][m + 3]):
//                             aiarray[2].push[i, m];
//                         case (boolarr[i + 4][m]):
//                             aiarray[3].push[i, m];
//                         case (boolarr[i + 4][m + 4]):
//                             aiarray[3].push[i, m];
//                         case (boolarr[i + 4][m - 4]):
//                             aiarray[3].push[i, m];
//                         case (boolarr[i][m + 4]):
//                             aiarray[3].push[i, m];
//                         case (boolarr[i + 5][m]):
//                             aiarray[4].push[i, m];
//                         case (boolarr[i + 5][m + 1]):
//                             aiarray[4].push[i, m];
//                         case (boolarr[i + 5][m - 5]):
//                             aiarray[4].push[i, m];
//                         case (boolarr[i][m + 5]):
//                             aiarray[4].push[i, m];
//                         case (boolarr[i + 6][m]):
//                             aiarray[5].push[i, m];
//                         case (boolarr[i + 6][m + 6]):
//                             aiarray[5].push[i, m];
//                         case (boolarr[i + 6][m - 6]):
//                             aiarray[5].push[i, m];
//                         case (boolarr[i][m + 6]):
//                             aiarray[5].push[i, m];
//                     }   if (m == undefined) {

//                     }
//                 }
//             }
//         }
//     } for (let i = 0; i < aiarray.length; i++) {
//         if (aiarray[i + 1] == 0) {
//             let aiChoice = (Math.floor(Math.random() * aiarray[i].length));
//             let aiColumn = aiarray[i][aiChoice][0];
//             let aiRow = aiarray[i][aiChoice][1];
//             let box = document.getElementById(`${aiColumn + 1}${aiRow + 1}`);
//             let col = box.parentElement.parentElement.id;
//             let num = parseFloat(col.replace('c', '')) - 1;
//             if (boolarr[num][i] == 'e') {
//                 boolarr[num][i] = color;
//                 prefill(num, i, color);
//                 let canvas = document.getElementById(`${num + 1}${i + 1}`);
//                 let draw = canvas.getContext("2d");
//                 let wid = (top.innerWidth / 100);
//                 draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2);
//                 draw.stroke();
//                 draw.fillStyle = fill;
//                 draw.fill();
//                 gamecheck.push(color);

//                 cfunc();
//                 rollfuncl2();
//                 rollfuncl3();
//                 rollfuncl4();
//                 rollfuncl5();
//                 rollfuncl6();
//                 tellfunc();

//                 if (((gamecheck.length + 1) / 2) % 1 == 0) {
//                     color = "blue";
//                     precolor = 0;
//                     fill = "#5187EE"
//                 }
//                 else {
//                     color = "red";
//                     precolor = 1;
//                     fill = "#EE5151";
//                 }
//                 break;
//             }
//         }
//     }   color = "red";
// }

// filling prearr

function prefill(x, y, z) {
    clist.push([x, y, z]);
    fillarr();
};

function fillarr() {
    for (let i = 0; i < (clist.length - 1); i++) {
        let m = 0;
        prearr[clist[i][m]][clist[i][m + 1]] = clist[i][m + 2];
    }
};

function cfunc() {
    for (let i = 0; i < 5; i++) {
        turndata[i] = false;
    }
};

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
    for (let i = 0; i < boolarr.length - 1; i++) {
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
    for (let i = 0; i < (boolarr.length - 2); i++) {
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
    for (let i = 0; i < boolarr.length - 3; i++) {
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
    for (let i = 0; i < boolarr.length - 4; i++) {
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
    for (let i = 0; i < boolarr.length - 5; i++) {
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

//dice sequence

let noroll = false;

function tellfunc() {
    for (let i = 0; i < turndata.length; i++) {
        if (turndata[i] == true) {
            document.getElementById("pos").innerHTML = "A roll is possible";
            noroll = true;
            rollopt = true;
            roller();
            break;
        }
        else {
            document.getElementById("pos").innerHTML = "";
        }
    }
};

// Dice visual and math

let die = document.getElementById("c3d-1");

let face = document.getElementsByClassName("item-1");

function roller() {
    die.addEventListener("click", function () {
        if (noroll == false) {
            return;
        }
        else {
            noroll = false;
            getRandom();
            rolldie();
        }
    });
};



let rolledX;
let rolledY;
let prevX = 0;
let prevY = 0;
let fullX = (rolledX + prevX);
let fullY = (rolledY + prevY);

function getRandom() {
    rolledX = (Math.floor(Math.random() * 23) + 1);
    rolledY = (Math.floor(Math.random() * 23) + 1);
    fullX = (rolledX + prevX);
    fullY = (rolledY + prevY);
};

function rolldie() {
    let i = 0;
    let rollinter = setInterval(function () {
        for (let i = 0; i < face.length; i++) {
            face[i].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        }
        if (i <= 2000 + 16.667) {
            die.style.transform = `rotateX(${prevX * 90 + (i / 2000) * rolledX * 90}deg) rotateY(${prevY * 90 + (i / 2000) * rolledY * 90}deg)`;
            i += 16.667;
        }
        else {
            for (let i = 0; i < face.length; i++) {
                face[i].style.backgroundColor = "rgba(255, 255, 255, 1)";
            }
            prevX += rolledX;
            prevY += rolledY;
            clearInterval(rollinter);
            numcheck();
            diecheck();
        }
    }, 16.667);
};

function numcheck() {
    switch (true) {
        case (fullY % 4 == 0):
            switch (true) {
                case (fullX % 4 == 0):
                    dieresult = 0;
                    break;
                case (fullX % 4 == 1):
                    dieresult = 3;
                    break;
                case (fullX % 4 == 2):
                    dieresult = 5;
                    break;
                case (fullX % 4 == 3):
                    dieresult = 1;
                    break;

            }
            break;
        case ((fullY % 4 == 1)):
            switch (true) {
                case (fullX % 4 == 0):
                    dieresult = 4;;
                    break;
                case (fullX % 4 == 1):
                    dieresult = 3;
                    break;
                case (fullX % 4 == 2):
                    dieresult = 2;
                    break;
                case (fullX % 4 == 3):
                    dieresult = 1;
                    break;
            }
            break;
        case ((fullY % 4 == 2)):
            switch (true) {
                case (fullX % 4 == 0):
                    dieresult = 5;;
                    break;
                case (fullX % 4 == 1):
                    dieresult = 3;
                    break;
                case (fullX % 4 == 2):
                    dieresult = 0;
                    break;
                case (fullX % 4 == 3):
                    dieresult = 1;
                    break;
            }
            break;
        case ((fullY % 4 == 3)):
            switch (true) {
                case (fullX % 4 == 0):
                    dieresult = 2;
                    break;
                case (fullX % 4 == 1):
                    dieresult = 3;
                    break;
                case (fullX % 4 == 2):
                    dieresult = 4;
                    break;
                case (fullX % 4 == 3):
                    dieresult = 1;
                    break;
            }
            break;
    }
};

let dieresult;

function diecheck() {
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
            document.getElementById("pos").innerHTML = "No point gained"
        }
        rollopt = false;
    }
    else if (prob == 1) {
        roller();
        if (dieresult == 0 || dieresult == 1) {
            addpoint();
        }
        else {
            document.getElementById("pos").innerHTML = "No point gained"
        }
        rollopt = false;
    }
    else if (prob == 2) {
        roller();
        if (dieresult == 0 || dieresult == 1 || dieresult == 2) {
            addpoint();
        }
        else {
            document.getElementById("pos").innerHTML = "No point gained"
        }
        rollopt = false;
    }
    else if (prob == 3) {
        roller();
        if (dieresult == 0 || dieresult == 1 || dieresult == 2 || dieresult == 3) {
            addpoint();
        }
        else {
            document.getElementById("pos").innerHTML = "No point gained"
        }
        rollopt = false;
    }
    else if (prob == 4) {
        roller();
        if (dieresult == 0 || dieresult == 1 || dieresult == 2 || dieresult == 3 || dieresult == 4) {
            addpoint();
        }
        else {
            document.getElementById("pos").innerHTML = "No point gained"
        }
        rollopt = false;
    }
};

function addpoint() {
    if(color == "red"){
        points[0] += 1;
        appendwin("red");
        document.getElementById('point-red').innerHTML = `${points[0]}`;
    }
    else{
        points[1] += 1;
        appendwin("blue");
        document.getElementById('point-blue').innerHTML = `${points[1]}`;
    }
    temproll = false;
    document.getElementById("pos").innerHTML = "Point Gained";  
}

