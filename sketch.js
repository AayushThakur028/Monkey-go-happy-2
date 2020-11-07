
var monkey , monkey_running , monkeyCollide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime;
var invisibleGround;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollide = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(600,300);
  
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  monkey = createSprite(100,230,10,10);
  monkey.scale=0.13;
  monkey.addAnimation("monkey",monkey_running)
  monkey.addAnimation("collide",monkeyCollide)

  invisibleGround = createSprite(300,300,600,10);
  invisibleGround.visible=false;
 
  console.log(invisibleGround.x)
}


function draw() {
  background("skyBlue"); 
 
   monkey.velocityY=monkey.velocityY + 0.8;
   if(gameState===PLAY){
    obstacles();
    bananas();
     monkey.collide(invisibleGround);
    score=score+Math.round(frameRate%60==0);
    stroke("black")
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time:"+survivalTime,100,50);  
    invisibleGround.velocityX=-(4+score*1.5/100);
    
   if(keyDown("space")&&monkey.y>=235){
      monkey.velocityY=-13;       
      }
      
     
    
    
   if (invisibleGround.x < 0){
     invisibleGround.x = invisibleGround.width/2;
    }
      if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();    
    }
    
     if (obstacleGroup.isTouching(monkey)){
      gameState = END;
     }
   }    
     
  if (gameState === END){
   invisibleGround.velocityX = 0;
    
    monkey.changeAnimation("collide", monkeyCollide);
    monkey.collide(invisibleGround);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
     
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      gameState = PLAY; 
    }
  }
  drawSprites();
  }
 
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);

  }
}

function obstacles(){
  if (frameCount%300 === 0){
    
    obstacle = createSprite(300,300,600,10);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    obstacleGroup.collide(invisibleGround);
  }
  
  
}


