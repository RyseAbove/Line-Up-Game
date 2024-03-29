/*server*/
import {joinRoom, selfId} from 'https://cdn.skypack.dev/trystero/ipfs';
let joinroom;
let prevarr;
let x = document.cookie;
let turnfirst = false; 

let playername;

window.onload = (event) => {
    prevarr = x.split(" ");
    joinroom = prevarr[0];
    playername = prevarr[2];
    room = joinroom
    if (prevarr[1] == "origin"){
        turnfirst = true;
    }   
    if(prevarr[1] == "untrue"){
        color = "blue";
        fill = "#5187EE"
    }
    else{
        color = "red";
        fill = "#EE5151";
    }
    if(color == "red"){
        document.getElementById("player-1").innerHTML = `${playername}`
    }
    else if(color == "blue"){
        document.getElementById("player-2").innerHTML = `${playername}`
    }
};


window.addEventListener('resize', function(event) {
    for(let i = 0; i<boolarr.length; i++){
        for(let m = 0; m<boolarr[i].length; m++){
            if(boolarr[i][m] == "red"){
                let canvas = document.getElementById(`${i + 1}${m + 1}`);
                let draw = canvas.getContext("2d");
                let wid = (top.innerWidth / 100);
                draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                draw.stroke();
                draw.fillStyle = "#EE5151";
                draw.fill();
            }
            else if(boolarr[i][m] == "blue"){
                let canvas = document.getElementById(`${i + 1}${m + 1}`);
                let draw = canvas.getContext("2d");
                let wid = (top.innerWidth / 100);
                draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                draw.stroke();
                draw.fillStyle = "#5187EE";
                draw.fill();
            }
        }
    }
});


const config = { appId: 'line-up' };
let room = joinRoom(config, `${joinroom}`);

let onjoincondition = false;
let [sendplayers, getplayers] = room.makeAction('players');

room.onPeerJoin(peerId => (console.log(`${peerId} joined`, sendplayers({players: `${playername}`})), onjoincondition = peerId))
room.onPeerLeave(peerId => console.log(`${peerId} left`))

onjoin();

function onjoin(){
    if(onjoincondition === false){
        window.setTimeout(onjoin, 1000);
    }
    else{
        document.getElementById("join").remove();
        return;
    }
}



//
let player2;


getplayers((data) => {
    player2 = data.players;
    if(color == "red"){
        document.getElementById("player-2").innerHTML = `${player2}`
    }
    else if(color == "blue"){
        document.getElementById("player-1").innerHTML = `${player2}`
    }
});
//
let [sendarr, getarr] = room.makeAction('array');
let [sendpoint, getpoint] = room.makeAction('point');


getpoint((data) => {
    if((data.color == "blue")){
        points[1] += 1;
        appendwin("blue");
        document.getElementById('point-blue').innerHTML = `${points[1]}`;
    }
    else if((data.color == "red")){
        points[0] += 1;
        appendwin("red");
        document.getElementById('point-red').innerHTML = `${points[0]}`;
    }
});

//win condition

function appendwin(cparam){
    for(let i=0; i<points.length; i++){
        console.log(points[i]);
        if(points[i] == 10){
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

getarr((data) => {
    let newarr = data.array
    for(let i = 0; i<newarr.length; i++){
        for(let m = 0; m<newarr[i].length; m++){
            if(boolarr[i][m] != newarr[i][m]){
                prearr[i][m] = newarr[i][m];

                let canvas = document.getElementById(`${i + 1}${m + 1}`);
                let draw = canvas.getContext("2d");
                let wid = (top.innerWidth / 100);
                //( canvas.width/2, canvas.height/2, 2*wid, 0, 2 * Math.PI)
                draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                draw.stroke();
                if(newarr[i][m] == "red"){
                    draw.fillStyle = "#EE5151";
                }
                else if(newarr[i][m] == "blue"){
                    draw.fillStyle = "#5187EE";
                }
  
                draw.fill();
            }
        }
    }
    boolarr = newarr;
});




let [sendturn, getturn] = room.makeAction('turn');



//game

//on join to server

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

let gamecheck = []

let clist = []

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

let turndata = [false, false, false, false, false]

let rollopt;

let points = [0, 0];

let color;
let precolor;   
let fill;

getturn((data, peerId) => {   
    turnfirst = true;
});




// Placing checkers
let temproll = false;

let canvelem = document.querySelectorAll('.canvas');
for (let i = 0; i < canvelem.length; i++) {
    canvelem[i].addEventListener('click', e => {
        if (rollopt == true || turnfirst == false || onjoincondition == false) {
            return;
        }
        else {
            spectate = false;
            temproll = true;

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
                    //( canvas.width/2, canvas.height/2, 2*wid, 0, 2 * Math.PI)
                    draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                    draw.stroke();
                    draw.fillStyle = fill;
                    draw.fill();
                    gamecheck.push(color);

                    turnfirst = false;

                    cfunc();
                    rollfuncl2();
                    rollfuncl3();
                    rollfuncl4();
                    rollfuncl5();
                    rollfuncl6();
                    tellfunc();
                    sendarr({array: boolarr});
                    break;
                }
            }
        }
    }
    );
}

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
            //( canvas.width/2, canvas.height/2, 2*wid, 0, 2 * Math.PI)
            draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
            draw.stroke();
            draw.fillStyle = fill;
            draw.fill();
        }
    })
}

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
}

function cfunc() {
    for (let i = 0; i < 5; i++) {
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
            sendturn({turn:true})
        }
    }
}

// Dice visual and math

let face = document.getElementsByClassName("item-1");

function roller() {
    if(color == "red"){
        die = document.getElementById("c3d");
        face = document.getElementsByClassName("item");
    }
    else if (color == "blue"){
        die = document.getElementById("c3d-1");
        face = document.getElementsByClassName("item-1");
    }
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
}




let rolledX;
let rolledY;
let prevX = 0;
let prevY = 0;
let fullX = (rolledX + prevX);
let fullY = (rolledY + prevY);
let spectate = false;

let [sendie, getdie] = room.makeAction('die');

let die = document.getElementById("c3d-1");


getdie((data) => {
    spectate = true;
    turnfirst = false;
    rolledX = data.die[0];
    rolledY = data.die[1];
    prevX = data.die[2];
    prevY = data.die[3];
    if(color == "red"){
        die = document.getElementById("c3d-1");
        face = document.getElementsByClassName("item-1");
    }
    else if (color == "blue"){
        die = document.getElementById("c3d");
        face = document.getElementsByClassName("item");
    }
    rolldie()
});

function getRandom() {
    rolledX = (Math.floor(Math.random() * 23) + 1);
    rolledY = (Math.floor(Math.random() * 23) + 1);
    fullX = (rolledX + prevX);
    fullY = (rolledY + prevY);
    turnfirst = false;
    sendie({die:[rolledX, rolledY, prevX, prevY]});
}

function rolldie() {
    let i = 0;
    turnfirst = false;
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
            if(spectate == false){
                sendturn({turn:true});  
            }

            die = document.getElementById("c3d-1")
            face = document.getElementsByClassName("item-1")
            if(temproll == false){
                return;
            }
            setturn();
            spectate = false;
            numcheck();
            diecheck();
        }
    }, 16.667);
    function setturn(){
      if(spectate == true){
        turnfirst = true;
        }  
    }
    
}

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
}

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
}

let pointid = 0;

function addpoint() {
    if(color == "red"){
        points[0] += 1;
        appendwin("red");
        sendpoint({point: pointid, color:"red"});
        document.getElementById('point-red').innerHTML = `${points[0]}`;
    }
    else{
        points[1] += 1;
        appendwin("blue");
        sendpoint({point: pointid, color:"blue"});
        document.getElementById('point-blue').innerHTML = `${points[1]}`;
    }
    temproll = false;
    document.getElementById("pos").innerHTML = "Point Gained";  
}


/*server*/

