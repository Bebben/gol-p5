const res = 10;
let cols;
let rows;
let grid;
let fps = 24;
function setup() {
    createCanvas(800, 800);
    frameRate(fps);
    cols = width / res;
    rows = height / res;
    grid = createGrid(cols, rows);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
}

function draw() {
    background(255);
    updateGrid();
    displayGrid();
}

function updateGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].update();
        }
    }
}

function withinGrid(i, j) {
    if (i < 0 || j < 0 || i >= rows || j >= cols) {
        return false;
    }
    return true;
}

function displayGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].refresh();
            grid[i][j].show();
        }
    }
}

function createGrid(cols, rows) {
    grid = new Array(rows);
    for (let i = 0;i < rows; i++) {
        grid[i] = new Array(cols);
    }
    return grid;
}

class Cell {
    constructor(y, x) {
        this.x = x;
        this.y = y;
        if (random(1) > 0.1) {
            this.old = 0;
            this.new = 0;
        } else {
            this.old = 1;
            this.new = 1;
        }
    }

    show() {
        if (this.new == 1) {
            fill(0);
        } else {
            fill(255);
        }
        rect(this.x*res,this.y*res,res,res);
    }

    countNeighbors() {
        let neighbors = 0;
        for (let i = this.y - 1; i <= this.y + 1; i++) {
            for (let j = this.x - 1; j <= this.x + 1; j++) {
                if (withinGrid(i, j)) {
                    neighbors += grid[i][j].old;
                }
            }
        }
        return neighbors - this.old;
    }

    update() {
        let neighbors = this.countNeighbors();
        if (this.old == 0 && neighbors == 3) {
            this.new = 1;
        } else if (this.old == 1 && (neighbors < 2 || neighbors > 3)) {
            this.new = 0;
        } else {
            this.new = this.old;
        }
    }

    refresh() {
        this.old = this.new;
    }
}
