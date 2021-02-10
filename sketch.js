var ball;
var database;
var position;
var ballimage,bgimage
function preload(){
  ballimage=loadImage("Hot Air Ballon-02.png")
  bgimage=loadImage("Hot Air Ballon-01.png")
}

function setup(){
    createCanvas(1600,700);
    ball = createSprite(250,250,10,10);
    ball.addImage(ballimage)
    database=firebase.database();
    var ballposition=database.ref("ball/height");
    ballposition.on("value",readHeight,showError)
}

function draw(){
    background(bgimage);
    if(keyDown(LEFT_ARROW)){
      ball.x=ball.x-10;
    }
    else if(keyDown(RIGHT_ARROW)){
      ball.x=ball.x+10;
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
      ball.addAnimation("Hot Air Ballon-02.png",ballimage);
      ball.scale=ball.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      ball.y=ball.y+10;
    }
    var ballposition=database.ref("ball/height");
    ballposition.on("value",readHeight,showError)
    drawSprites();
}
function updateHeight(x,y){
database.ref("ball/height").set({
  "x": height.x+x,
  "y": height.y+y,
})
}


function readHeight(data){
  height=data.val();
  ball.x=height.x;
  ball.y=height.y;
}
function showError(){
    console.log("it is an error")
}