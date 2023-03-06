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
    ["e", "e", "e", "e", "e", "e", "e", "e"],                                      
]

let gamecheck = [

]

let clist = [

]

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
    ["e", "e", "e", "e", "e", "e", "e", "e"],              
]

let turndata = [false,false,false,false,false,false]

//placement

let color = "red";
let fill = "#EE5151";

function placefunc(event){
    let box = event.target;
    let col = box.parentElement.parentElement.id;
    let num = parseFloat(col.replace('c','')) - 1;
    for(let i = 7; i >= 0; i--){
        if(boolarr[num][i] == 'e'){
            boolarr[num][i] = color;
            prefill(num, i, color);
            let canvas = document.getElementById(`${num + 1}${i + 1}`);
            let draw = canvas.getContext("2d");
            let wid = (top.innerWidth /100);

            draw.arc( 2.95*wid, 2.95*wid, 2*wid, 0, 2 * Math.PI);
            draw.stroke();
            draw.fillStyle = fill;
            draw.fill();
            gamecheck.push(color);

            rollfuncl2();
            rollfuncl3();
            //rollfuncl4();
            //rollfuncl5();
            //rollfuncl6();

            if(((gamecheck.length + 1)/2) % 1 == 0){
                color = "blue";
                fill =  "#5187EE"
            }
            else{
                color = "red";
                fill = "#EE5151";
            } 
            break;
        }
    }    
}
        
/*filling prearr*/
function prefill(x, y, z){
    clist.push([x, y, z]);
    fillarr();
}

function fillarr(){
    for(let i = 0; i < (clist.length - 1); i++){
        let m = 0;
        prearr[clist[i][m]][clist[i][m+1]] = clist[i][m+2];
    }
}

//functions for line checks
function rollfuncl2(){
    for(i = 0; i < 5; i++){
        turndata[i].length = 0;
    }
    for(let i = 0; i < (boolarr.length - 1); i++){//horizontals
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i+1][m]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i+1][m] != prearr[i+1][m]))){
                    turndata[0] = true;
                } 
            }
        }
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i+1][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i+1][m+1] != prearr[i+1][m+1]))){
                    turndata[0] = true;
                } 
            }
        }
    }
    for(let i = 9; i > 0; i--){//fix
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i-1][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i-1][m+1] != prearr[i-1][m+1]))){
                    turndata[0] = true;
                }
            }
        }
    }
    for(let i = 0; i < (boolarr.length); i++){//vertical
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m+1] != prearr[i][m+1]))){
                    turndata[0] = true;
                }
            }
        }
    }
    console.log(turndata)
}

function rollfuncl3(){
    for(i = 0; i < 5; i++){
        turndata[i].length = 0;
    }
    for(let i = 0; i < (boolarr.length - 2); i++){//horizontals
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if(((boolarr[i][m] == boolarr[i+1][m]) && (boolarr[i][m] == boolarr[i+2][m])) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i+1][m] != prearr[i+1][m]) || (boolarr[i+2][m] != prearr[i+2][m]))){
                    turndata[1] = true;
                } 
            }
        }
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i+1][m+1] == boolarr[i+2][m+2]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i+1][m+1] != prearr[i+1][m+1]) || (boolarr[i+2][m+2] != prearr[i+2][m+2]))){
                    turndata[1] = true;
                } 
            }
        }
    }
    for(let i = 9; i > 0; i--){//fix
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i-1][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i-1][m+1] != prearr[i-1][m+1]))){
                    turndata[1] = true;
                }
            }
        }
    }
    for(let i = 0; i < (boolarr.length); i++){//vertical
        for(let m = 0; m < boolarr[i].length; m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m+1] != prearr[i][m+1]))){
                    turndata[1] = true;
                }
            }
        }
    }
}



function diefunc(x){
    if(x == 1){
        Math.random()
    }
    else if(x == 2){

    }
    else if(x == 3){

    }
    else if(x == 4){
        
    }
    else if(x == 5){
        
    }
    else if(x == 6){
        
    }
}


