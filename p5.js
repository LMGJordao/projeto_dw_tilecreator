let rows = 5;
let cols = 5;
let cellWidth;
let cellHeight;
let currentShape = 'rect'; // Initially set to draw rectangles
let sizePercentage = 1;
let showGridLines = true;
let startR;
let startG;
let startB;
let canChangeColor = false;
let backgroundShapeColor = true;
let fileName;
let tags = [];
let selectedTags = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    calculateCellSize();
    angleMode(DEGREES);
    strokeWeight(3);
    startR = random(165);
    startG = random(165);
    startB = random(165);
    background(startR + 45, startG + 45, startB + 45);
    drawGrid(startR, startG, startB);
}

function calculateCellSize() {
    // Calculate the cell size based on the number of rows and columns from the slider after the page is loaded

    cols = document.getElementById('gridColumns').value;
    rows = document.getElementById('gridRows').value;
    cellWidth = width / cols;
    cellHeight = height / rows;
    redrawGrid(); // Redraw the grid with the new cell size

    // Update the current values of rows and columns 
    document.getElementById('currentRows').textContent = rows;
    document.getElementById('currentColumns').textContent = cols;
}

function calculateShapeSize() {
    shapeSize = document.getElementById('shapeSize').value;
    sizePercentage = shapeSize / 100;

    redrawGrid(); // Redraw the grid with the new cell size
    document.getElementById('currentShapeSize').textContent = shapeSize + '%';
}

function toggleGridLines() {
    if (document.getElementById('gridCheckbox').checked) {
        showGridLines = true;
    } else {
        showGridLines = false;
    }
    redrawGrid();
}

function toggleShapeBackgroundColor() {
    if (document.getElementById('shapeBackgroundColorCheckbox').checked) {
        backgroundShapeColor = true;
    } else {
        backgroundShapeColor = false;
    }
    redrawGrid();
}

function changeColors() {
    canChangeColor = true;
    background(startR + 45, startG + 45, startB + 45);
    startR = random(165);
    startG = random(165);
    startB = random(165);
    drawGrid(startR, startG, startB);
}

function drawColors(startR, startG, startB) {
    fill(
        random(startR, startR + 90),
        random(startG, startG + 90),
        random(startB, startB + 90)
    );
    stroke(
        random(startR - 90, startR),
        random(startG - 40, startG),
        random(startB - 90, startB)
    );
}

function drawGrid(startR, startG, startB) {
    for (let x = 0; x < width; x += cellWidth) {
        stroke(0);
        if (showGridLines) {
            line(x, 0, x, height);
        }
        for (let y = 0; y < height; y += cellHeight) {
            stroke(0);
            if (showGridLines) {
                line(0, y, width, y);
            }
            drawColors(startR, startG, startB);
            if (backgroundShapeColor) {
                rect(x, y, cellWidth, cellHeight);
            }
            drawColors(startR, startG, startB);
            drawShape(x, y);
        }
        if (showGridLines) {
            line(x, 0, x, height);
        }
    }

}


function drawShape(x, y) {
    let shapeWidth = sizePercentage * cellWidth;
    let shapeHeight = sizePercentage * cellHeight;
    let shapeX = x + (cellWidth - shapeWidth) / 2; // Calculate x position
    let shapeY = y + (cellHeight - shapeHeight) / 2; // Calculate y position

    if (currentShape === 'rect') {
        drawRectangle(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'triangle') {
        drawTriangle(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'circle') {
        drawCircle(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'wave') {
        drawWave(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'cross') {
        drawCross(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'plus') {
        drawPlusSign(shapeX, shapeY, shapeWidth, shapeHeight);
    } else if (currentShape === 'random') {
        let randomShape = floor(random(0, 6));
        if (randomShape === 0) {
            drawRectangle(shapeX, shapeY, shapeWidth, shapeHeight);
        } else if (randomShape === 1) {
            drawTriangle(shapeX, shapeY, shapeWidth, shapeHeight);
        } else if (randomShape === 2) {
            drawCircle(shapeX, shapeY, shapeWidth, shapeHeight);
        } else if (randomShape === 3) {
            drawWave(shapeX, shapeY, shapeWidth, shapeHeight);
        } else if (randomShape === 4) {
            drawCross(shapeX, shapeY, shapeWidth, shapeHeight);
        }
        else if (randomShape === 5) {
            drawPlusSign(shapeX, shapeY, shapeWidth, shapeHeight);
        }
    }
}

function drawTriangle(shapeX, shapeY, shapeWidth, shapeHeight) {
    triangle(shapeX + shapeWidth / 2, shapeY, shapeX, shapeY + shapeHeight, shapeX + shapeWidth, shapeY + shapeHeight);
}

function drawRectangle(shapeX, shapeY, shapeWidth, shapeHeight) {
    rect(shapeX, shapeY, shapeWidth, shapeHeight);
}

function drawCircle(shapeX, shapeY, shapeWidth, shapeHeight) {
    ellipse(shapeX + shapeWidth / 2, shapeY + shapeHeight / 2, shapeWidth, shapeHeight);
}

function drawPlusSign(shapeX, shapeY, shapeWidth, shapeHeight) {
    line(shapeX + shapeWidth / 2, shapeY, shapeX + shapeWidth / 2, shapeY + shapeHeight);
    line(shapeX, shapeY + shapeHeight / 2, shapeX + shapeWidth, shapeY + shapeHeight / 2);
}

//draw a sinewave
function drawWave(x, y, width, height) {
    let numPoints = 100;
    let frequency = 6;
    noFill();
    beginShape();
    for (let i = 0; i < numPoints; i++) {
        let angle = i * frequency;
        let wave = sin(angle) * (height / 2);
        let xPos = map(i, 0, numPoints - 1, x, x + width); // x-position based on the cell width
        vertex(xPos, y + height / 2 + wave);
    }
    endShape();
}

function drawCross(shapeX, shapeY, shapeWidth, shapeHeight) {
    line(shapeX, shapeY, shapeX + shapeWidth, shapeY + shapeHeight);
    line(shapeX + shapeWidth, shapeY, shapeX, shapeY + shapeHeight);
}

function redrawGrid() {
    let startR = random(165);
    let startG = random(165);
    let startB = random(165);
    background(startR + 45, startG + 45, startB + 45);
    drawGrid(startR, startG, startB);
}

function changeShape(shape) {
    currentShape = shape; // Set the current shape based on the selected shape
    console.log(currentShape);
    redrawGrid(); // Redraw the canvas with the selected shape
    console.log('test');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    calculateCellSize();
    redrawGrid();
}

// show and hide the parameters containers
function toggleParameters(btnId, containerId) {
    const container = document.getElementById(containerId);
    const btn = document.getElementById(btnId);
    console.log(container.style.display)
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block'; // Show the container
        btn.style.backgroundColor = 'var(--main)';

    } else {
        container.style.display = 'none'; // Hide the container
        btn.style.backgroundColor = 'var(--dark)';
    }
}

function exportTile() {
    let tileTitle = document.getElementById('title').value;
    let fileName = "";
    if (tileTitle  === null || tileTitle.length === 0)
        fileName = "tile";
    else
        fileName += tileTitle;

    let file = save(fileName + ".png");
    noLoop(); // export once
}

//post the image to cosmic
async function postImage(e) {
    e.preventDefault();
    let tileTitle = document.getElementById('title').value;
    let tileDescription = document.getElementById('description').value;
    let author = document.getElementById('author').value;
    let today = new Date();
    today = today.toISOString().split('T')[0];

    document.getElementById('defaultCanvas0')
        .toBlob(async blob => {
            const myFile = new File([blob], `${tileTitle}.png`, {
                type: blob.type,
            });
            const data = new FormData();
            data.set("media", myFile);
            data.set("folder", "post_pictures");

            let res = await fetch("https://workers.cosmicjs.com/v3/buckets/projetodw-production/media", {
                method: "POST",
                mode: "cors",
                body: data,
                headers: {
                    Authorization: "Bearer WTHyDISlEk2EDbAHT90WR0qv90LoXcQsNQIoCswuWkCGvItvOH"
                }
            });
            let media = await res.json();
            console.log(media.media);
            let tileData = {
                title: tileTitle,
                type: "posts",
                metadata: {
                    picture: media.media.name,
                    description: tileDescription,
                    creator: author,
                    publish_date: today,
                    tags: [...selectedTags],
                }
            };
            await fetch("https://api.cosmicjs.com/v3/buckets/projetodw-production/objects", {
                    method: "POST",
                    body: JSON.stringify(tileData),
                    headers: {
                        Authorization: "Bearer WTHyDISlEk2EDbAHT90WR0qv90LoXcQsNQIoCswuWkCGvItvOH",
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
            });
        })
}

//get the current tags from cosmic
async function getCurrentTags() {
    const Cosmic = require("cosmicjs")();
    const bucket = Cosmic.bucket({
        slug: "projetodw-production",
        read_key: "2oP6NUJGKT1sZnD2RMdbBjVNLRhJAqucAJVMyte7sASOsRqgXg",
        write_key: "WTHyDISlEk2EDbAHT90WR0qv90LoXcQsNQIoCswuWkCGvItvOH",
    });
    const params = {
        type: "tags",
        props: "title,slug",
    };
    const data = await bucket.getObjects(params);
    console.log(data);
}


// Update rows and columns from slider changes
document.getElementById('gridColumns').addEventListener('input', calculateCellSize);
document.getElementById('gridRows').addEventListener('input', calculateCellSize);
document.getElementById('shapeSize').addEventListener('input', calculateShapeSize);
document.getElementById('gridCheckbox').addEventListener('input', toggleGridLines);
document.getElementById('shapeBackgroundColorCheckbox').addEventListener('input', toggleShapeBackgroundColor);
document.getElementById('publishForm').addEventListener('submit', postImage);

document.addEventListener("DOMContentLoaded", async e => {
    tags = [];
    selectedTags = [];

    const url = new URL("https://api.cosmicjs.com/v3/buckets/projetodw-production/objects");
    const query = new URLSearchParams({
        read_key: "2oP6NUJGKT1sZnD2RMdbBjVNLRhJAqucAJVMyte7sASOsRqgXg",
        props: "title,id",
        query: JSON.stringify({"type":"tags"})
    });
    query.forEach((value, key) => url.searchParams.append(key, value));
    const result = await fetch(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json());
    tags = [...result.objects];

    const tagContainer = document.getElementById("tags")
    tags.forEach(t => {
        const tagButton = document.createElement("button");
        tagButton.setAttribute("type", "button");
        tagButton.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("tagToggle");
            if (selectedTags.includes(t.id) === false)
                selectedTags = [...selectedTags, t.id];
            else
                selectedTags = selectedTags.filter(tagId => t.id !== tagId);
        });
        const tagElement = document.createElement("div");
        tagElement.setAttribute("value", t.title);
        tagElement.classList.add("tag");
        tagElement.innerHTML = t.title;
        tagButton.appendChild(tagElement);
        tagContainer.appendChild(tagButton);
    });
    console.log(env.CMS_SLUG);
});
