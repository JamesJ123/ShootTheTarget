var shooter, shooterImage, explosion;
var target1, target2, target3;
var BG, BGImage;
var bullet, bulletImage, bulletGroup;
var edge,edgeBlock1,edgeBlock2,edgeBlock3,edgeBlock4;
var blocker;
var score=0;
var coin, coinImage, coinGroup;

function preload(){
    shooterImage=loadImage("shooter_3.png");
    BGImage=loadImage("bg.jpeg");
    bulletImage=loadImage("bullet1.png");
    coinImage=loadImage("goldCoin.png");
    explosion=loadSound("explosion.mp3");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    edge=createEdgeSprites();
    BG=createSprite(windowWidth/2,displayHeight/2,100,100);
    BG.addImage(BGImage);

    shooter=createSprite(displayWidth-1250,displayHeight-300,100,100);
    shooter.addImage(shooterImage);
    shooter.scale=0.5;

    target1=createSprite(1400,400,25,300);
    target2=createSprite(1380,400,25,150);
    target3=createSprite(1360,400,25,100);

    target1.shapeColor="blue";
    target2.shapeColor="red";
    target3.shapeColor="green";

    edgeBlock1=createSprite(windowWidth/2,70,windowWidth,10);
    edgeBlock2=createSprite(windowWidth/2,windowHeight-70,windowWidth,10);
    edgeBlock3=createSprite(windowWidth/2,95,windowWidth,10);
    edgeBlock4=createSprite(windowWidth/2,windowHeight-95,windowWidth,10);

    blocker=createSprite(800,400,25,300);

    edgeBlock1.visible=false;
    edgeBlock2.visible=false;
    edgeBlock3.visible=false;
    edgeBlock4.visible=false;

    target1.velocityY=10;
    target2.velocityY=10;
    target3.velocityY=10;

    bulletGroup=new Group();
    coinGroup=new Group();
}
function draw(){
    background(0);

    if(keyDown("UP_ARROW")){
        shooter.y=shooter.y-30
    }
    if(keyDown("DOWN_ARROW")){
        shooter.y=shooter.y+30
    }

    if(keyDown("space")){
        newBullet();
        explosion.play();
    }
    blocker.bounceOff(edge);
    target1.bounceOff(edge);
    target2.bounceOff(edgeBlock1);
    target2.bounceOff(edgeBlock2);
    target3.bounceOff(edgeBlock3);
    target3.bounceOff(edgeBlock4);

    if(bulletGroup.isTouching(target1)){
        score+=1;
    }
    else if(bulletGroup.isTouching(target2)){
        score+=5;
    }
    else if(bulletGroup.isTouching(target3)){
        score+=10;
    }

    if(bulletGroup.isTouching(blocker)){
        bulletGroup.destroyEach();  
    }
    
    if(frameCount%50===0){
        blocker.y=Math.round(random(100,windowHeight-100));
        blocker.x=Math.round(random(windowWidth-1000,windowWidth-200))
    }
    newCoin()

    if(bulletGroup.isTouching(coinGroup)){
        score+=50;
        coinGroup.destroyEach(coin);
    }

    drawSprites();

    textSize(20);
    fill("white");
    text("Score: " + score,windowWidth/2,50);
    console.log(score);
}

function newBullet(){
    bullet=createSprite(displayWidth-1150,shooter.y-40);
    bullet.addImage(bulletImage);
    bullet.velocityX=3;
    bullet.scale=0.1;
    bullet.lifetime=500;
    bulletGroup.add(bullet);
}

function newCoin(){
    if(frameCount%300===0){
        coin=createSprite(10,-100,10,10);
        coin.addImage(coinImage);
        coin.x=Math.round(random(windowWidth-1000,windowWidth-200));
        coin.velocityY=6;
        coin.scale=0.1;
        coin.lifetime=500;
        coinGroup.add(coin);
    }
}
