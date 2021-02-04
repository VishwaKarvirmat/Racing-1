var ball;
var database;
var ballPositionRef;
var position;

function setup(){
    createCanvas(500,500);

    //create a database --> firebase.database();
    database = firebase.database();

    //refer to the database
    ballPositionRef = database.ref('ball/position');

    //create a listner for the variable
    ballPositionRef.on("value",readPosition, showError)

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        updatePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+1);
    }
    drawSprites();
}

function updatePosition(x,y){
    database.ref('ball/position').update({
        'x': position.x + x,
        'y': position.y + y
    })
  
}

function readPosition(data){
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function showError(){
   console.log("error!");
}
