var monkey , monkey_running;
var ground;
var banana ,bananaImage; 
var stone, stoneImage, obstacleGroup;
var score = 0;
var survivalTime;
var gameState = "play";

function preload(){
  //loading the images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}
function setup() {
  //creating the canvas
  createCanvas(400,400);
  //creating the monkey
  monkey = createSprite(30,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  //creating the ground
  ground = createSprite(200,380,800,5);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  //creating the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  //clearing the screen
  background("white");
  if (gameState === "play"){
    //if space is pressed monkey should jump
    if(keyDown("space")){
      monkey.velocityY=-3;
    }
    //for the continuous ground
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    //increasing the score after monkey touches banana
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score+2;
    }
    //ending the game when monkey touches obstacle
    if (monkey.isTouching(obstacleGroup)){
      gameState = "end";
    }
    //calling the functions
    obstacles();
    food();
  }
    
  if (gameState === "end"){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    fill("lightBlue");
    textSize(20);
    text("GAME OVER",150,200);
  }    
  //gravity
  monkey.velocityY = monkey.velocityY+0.8;
  //monkey to collide with the ground
  monkey.collide(ground);

  
  //drawing the sprites
  drawSprites();
  //displaying the score and survival time
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
  //creating banana
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
  //creating obstacles
  if(frameCount%300===0){
    stone = createSprite(370,360);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -4;
    stone.lifetime = 100;
    obstacleGroup.add(stone);
  }
}