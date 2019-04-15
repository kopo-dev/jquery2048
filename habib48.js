let	screenWidth = window.screen.availWidth;
let	gridDisplay = [];
let	gridLogic = [];
let	collision = [];
let	gameOver = 0;
let	score = 0;

//displayGrid();
//displayScore();
//getPos();


$(function () {
    init();
})

function		initGrid()
{
    gridLogic = [];
    gridDisplay = [];
    for (let i = 0; i < 4; i++) {
	gridLogic[i] = [];
	for (let j = 0; j < 4; j++) {
	    gridLogic[i][j] = 0;
	    $(".grid-container").append("<div class='grid-cell value' id='grid-cell-" + i + "-" + j + "'> " + i + "-" + j + "</div>");
	}
    }
}

function		getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



function		setRandomCell() {
    let x = getRandomInt(4);
    let y = getRandomInt(4);

    if (gridLogic[x][y] == 0) {
        if (getRandomInt(10) > 6)
            gridLogic[x][y] = 4;
        else
	     gridLogic[x][y] = 2;    
    }
    else if (!isGridFull()){
	setRandomCell();
    }    
}

function		init()
{
    score = 0;
    initGrid();
    setRandomCell();
    setRandomCell();
    displayGrid();
    displayScore();
}

function		newGame()
{

}

function	isGridFull() {
    for (let i = 0; i < 4; i++) {
	for (let j = 0; j < 4; j++) {
	    if (gridLogic[i][j] == 0)
		return true;
	}
    }
    return false;
}

function displayScore(score) {
    
}

function		displayGrid()
{
    let debug = "";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            debug += " [" + i + "][" + j + "] ";
	    let target = $('#grid-cell-'+ i + '-' + j);
	    target.attr("class","grid-cell-" + gridLogic[i][j]);
	    target.text(gridLogic[i][j]);
        }
        debug += "\n";
    }
    console.log(debug);
}

$(document).keyup(function(event) {
    switch (event.which) {
    case 37: case 65:
	event.preventDefault();
	if (executeLeft()) {
	    	    console.log("POPING");
	    setRandomCell();
	    displayGrid();
	    console.log("Left move");
	}
	break;
    case 38: case 87:
	event.preventDefault();
	if (executeUp()) {
	    	    console.log("POPING");
	    setRandomCell();
	    displayGrid();
	    console.log("Up move");
	}
	break;
    case 39: case 68:
	event.preventDefault();
	if (executeRight()) {
	    console.log("POPING");
	    setRandomCell();
	    displayGrid();
	    console.log("Right move");
	}
	break;
    case 40: case 83:
	event.preventDefault();
	if (executeDown()) {
	    	    console.log("POPING");
	    setRandomCell();
	    displayGrid();
	    console.log("Down move");
	}
	break;
    }
})

function	executeUp() {
    let i = 0;
    
    i += moveUp();
    i += mergeUp();
    i += moveUp();
    return (i);
}

function	mergeUp() {
    let moved = 0
    for (x = 0; x < 4; x++) {
        for (y = 0; y < 3; y++) {
            let i = y + 1;
            if (gridLogic[y][x] != 0 && gridLogic[i][x] == gridLogic[y][x]) {
                gridLogic[y][x] += gridLogic[i][x];
                score += gridLogic[y][x];
                gridLogic[i][x] = 0;
                moved = 1;
            }
        }
    }
    return (moved);
}

function	moveUp() {
    let moved = 0;
    for (let i = 0; i < 4; i++) {
	for (let j = 0; j < 4; j++) {
	    var y = i + 1;
	    while (y < 4) {
		if (gridLogic[y][j] != 0 && gridLogic[i][j] == 0) {
		    gridLogic[i][j] = gridLogic[y][j];
            gridLogic[y][j] = 0;
            y = 0;
		    moved = 1
		    break;
		}
		y++;
	    }
	}
    }
    return (moved);
}

function	executeLeft() {
    let i = 0;
    i += moveLeft();
    i += mergeLeft();
    i += moveLeft();
    return (i);
}

function	mergeLeft() {
    let moved = 0;
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 3; x++) {
            let j = x + 1;
            if (gridLogic[y][x] != 0 && gridLogic[y][j] == gridLogic[y][x]) {
                gridLogic[y][x] += gridLogic[y][j];
                score += gridLogic[y][x];
                gridLogic[y][j] = 0;
                moved = 1;
            }
        }
    }
    return (moved);
}

function	moveLeft() {
    let moved = 0;
    for (let i = 0; i < 4; i++) {
	for (let j = 0; j < 4; j++) {
	    var x = j + 1;
	    while (x < 4) {
		if (gridLogic[i][x] != 0 && gridLogic[i][j] == 0) {
		    gridLogic[i][j] = gridLogic[i][x];
		    gridLogic[i][x] = 0;
		    moved = 1;
		    j = 0;
		    break;
		}
		x++;
	    }
	}
    }
    return (moved);
}

function	executeRight() {
    let i = 0;
    i += moveRight();
    i += mergeRight();
    i += moveRight();
    return i;
}

function	mergeRight() {
    let moved = 0;
    for (y = 0; y < 4; y++) {
        for (x = 3; x > 0; x--) {
            let j = x - 1;
            if (gridLogic[y][x] != 0 && gridLogic[y][j] == gridLogic[y][x]) {
                gridLogic[y][x] += gridLogic[y][j];
                score += gridLogic[y][x];
                gridLogic[y][j] = 0;
                moved = 1;
            }
        }
    }
    return (moved);
}

function	moveRight() {
    let moved = 0;
    for (let i = 3; i >= 0; i--) {
	for (let j = 3; j >= 0; j--) {
		var x = j - 1;
		while (x >= 0) {
		    if (gridLogic[i][x] != 0 && gridLogic[i][j] == 0 ) {
			gridLogic[i][j] = gridLogic[i][x];
			gridLogic[i][x] = 0;
			moved = 1;
			j = 3;
			break;
		    }
		    x--;
		}
	    }
	    
    }
    return moved;
}

function	executeDown() {
    let i  = 0;
    i += moveDown();
    i += mergeDown();
    i += moveDown();
    return (i);
}

function	mergeDown() {
    let moved = 0
    for (x = 0; x < 4; x++) {
        for (y = 3; y > 0; y--) {
            let i = y - 1;
            if (gridLogic[y][x] != 0 && gridLogic[i][x] == gridLogic[y][x]) {
                gridLogic[y][x] += gridLogic[i][x];
                score += gridLogic[y][x];
                gridLogic[i][x] = 0;
                moved = 1;
            }
        }
    }
    return moved;
}

function	moveDown() {
    let moved = 0;
    for (let i = 3; i >= 0; i--) {
	for (let j = 3; j >= 0; j--) {
	    var y = i - 1;
	    while (y >= 0) {
		if (gridLogic[y][j] != 0 && gridLogic[i][j] == 0) {
            gridLogic[i][j] = gridLogic[y][j];
		    gridLogic[y][j] = 0;
		    moved = 1;
		    i = 3;
		    break;
		}
		y--;
	    }
	}
	
    }
    if (moved)
	return (1);
    return 0;
}
