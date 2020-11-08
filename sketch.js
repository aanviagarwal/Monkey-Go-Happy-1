
var monkey , monkey_running;
var ground;
var banana ,bananaImage; 
var stone, stoneImage, obstacleGroup;
var score = 0;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(30,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,380,800,5);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  if(keyDown("space")){
    monkey.velocityY=-3;
  }
  if(ground.x<0){
    ground.x = ground.width/2;
    
  }
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  
  obstacles();
  food();
  drawSprites();
  stroke = ("violet");
  textSize(15);
  fill("violet");
  text("Score: "+score,300,50);
  
  
  stroke = ("black");
  textSize(15);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time: "+survivalTime,10,50);
}

function food(){
  if(frameCount%80===0){
    banana = createSprite(370,350);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%300===0){
    stone = createSprite(370,360);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -4;
    stone.lifetime = 100;
    obstacleGroup.add(stone);
  }
}