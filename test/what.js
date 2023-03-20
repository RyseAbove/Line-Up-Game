
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


function pageload() {
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
    let headID = true;
    let tailID = true;
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
            if ((headclear == false) && (headID == true)) {
                document.getElementById("heads").remove();
                headclear = true;
                headID = false;
                tailID = true;
            }
            tailclear = false;
        }
        else {
            rotobj.appendChild(heads);
            if ((tailclear == false) && (tailID == true)) {
                document.getElementById("tails").remove();
                tailclear = true;
                tailID = false;
                headID = true;
            }
            headclear = false;
        }
    }, 16.67);
}

// First Player

function firstTurn() {
    if (flip % 2 == 0) {
        localStorage.setItem("firstPlayer", "red");
    } else {
        localStorage.setItem("firstPlayer", "blue");
    }

}

function checkFirst() {
    // to read set value
    const firstPlayer = localStorage.getItem("firstPlayer");
    // to check value
    console.log(firstPlayer);
}
