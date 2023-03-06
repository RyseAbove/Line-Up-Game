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
        for(let m = 0; m < (boolarr[i].length - 1); m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i+1][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i+1][m+1] != prearr[i+1][m+1]))){
                    turndata[0] = true;
                } 
            }
        }
    }
    for(let i = 8; i > 0; i--){//fix
        for(let m = 0; m < (boolarr[i].length - 1); m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i-1][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i-1][m+1] != prearr[i-1][m+1]))){
                    turndata[0] = true;
                }
            }
        }
    }
    for(let i = 0; i < (boolarr.length); i++){//vertical
        for(let m = 0; m < (boolarr[i].length - 1); m++){
            if(boolarr[i][m] != 'e'){
                if((boolarr[i][m] == boolarr[i][m+1]) && ((boolarr[i][m] != prearr[i][m]) || (boolarr[i][m+1] != prearr[i][m+1]))){
                    turndata[0] = true;
                }
            }
        }
    }
    console.log(turndata)
}
