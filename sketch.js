var trex, trex_running, trex_collided, trex_down, trex2, trex_collided;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var jump,die,checkpoint;
var ground, invisibleGround, groundImage;
var cloudGroup, obstacleGroup;
var restart,restartImg,gamO,gamOImg;
var moon, moonImg;
var tero_fly;
var clouds;
var dinoImg;
var highscore,score;
var gameState = "play";
var play = 1;
var time = "day";
var end = 0;


function preload() {
  highscore = 0;
  score = 0;
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkpoint.mp3");

  moonImg = loadImage("moon.png");
  gamOImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  dinoImg = loadImage("test.png");
  clouds = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  trex_down = loadAnimation("trex_down1.png","trex_down2.png");
  tero_fly = loadAnimation("tero1.png","tero1.png","tero2.png","tero2.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  obstacleGroup = createGroup();
  cloudGroup = createGroup();

  moon = createSprite(width*4,50);
  moon.addImage(moonImg);
  moon.visible=false;
  moon.scale=0.5;

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale = 0.4;
  restart.visible = false;

  gamO = createSprite(windowWidth/2,windowHeight/2-50);
  gamO.addImage(gamOImg);
  gamO.visible = false;
  gamO.scale = 0.5;

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("down",trex_down);
  trex.addImage("collide", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(width/2,height-80,width,2);
  ground.addImage("ground",groundImage);

  invisibleGround = createSprite(200,height-70,400,10);
  invisibleGround.visible=false;
}
 
function draw() {
  background("white");

  if(gameState=="play"){

    if(obstacleGroup.isTouching(trex)){
      gameState = "end";
      die.play();
    }

    if(frameCount % 100 == 0){
      if(time=="day"){
        time = "night";
      } else{
        time = "day";
      }
    }

    if(time=="day"){
      background("white");
      moon.visible=false;
    } else{
      background("black");
      moon.visible = true;
    }

    if (touches.length>0||keyDown("space")&&trex.y>=invisibleGround.y-53) {
      trex.velocityY = -13;
      jump.play();
      touches = [];
    }

    if(keyDown("down")){
      trex.changeAnimation("down",trex_down);
      trex.scale = 0.35;
    }

    if(keyWentUp("down")){
      trex.changeAnimation("running",trex_running);
      trex.scale = 0.5;
    }

    if (ground.x < 0) {
       ground.x = ground.width /4;
    }

    if (score >= highscore){
      highscore = score;
    }

    if(time=="day"){
      fill("black");
    } else {
      fill("white");
    }

    text("Puntuacion: " + score,1100,50);
    text("Mejor Puntuacion: " + highscore,1065,68);

    score = score + Math.round(frameCount/60);
    
    trex.setCollider("rectangle",0,0,30,75);
    trex.velocityY = trex.velocityY + 0.8

    ground.velocityX = -4;

    obstacle_spawn();
    cloud_spawn();
  }
  if(gameState=="end"){
    
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    trex.changeImage("collide",trex_collided);

    ground.velocityX=0;
    trex.velocityY=0;

    restart.visible = true;
    gamO.visible = true;

    if(touches.length>0||keyDown("space")){
      reset();
      touches = [];
    }
    if(mousePressedOver(restart)){
      reset();
    }
  }

  trex.collide(invisibleGround);

  drawSprites();
}

function reset(){ 

  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();

  restart.visible = false;
  gamO.visible = false;

  gameState="play";

  trex.changeAnimation("running",trex_running);

  score = 0;
}

function cloud_spawn(){
  if(frameCount % 60 == 0){

    var cloud = createSprite(1200,70);
    cloud.addImage(clouds);
    cloud.y = Math.round(random(windowHeight-525,windowHeight-625));
    cloud.velocityX = -3;
    cloud.scale =0.1;
    cloud.lifetime = 410;
    cloudGroup.add(cloud);

    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
  }
}

function obstacle_spawn(){
  if(frameCount % 60 ==0){

    var ran = Math.round(random(1,8))
    switch(ran){
      case 1:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle1);
        obstacle.velocityX= -3;
        obstacle.scale=0.4;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 2:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle2);
        obstacle.velocityX= -3;
        obstacle.scale=0.4;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 3:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle3);
        obstacle.velocityX= -3;
        obstacle.scale=0.4;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 4:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle4);
        obstacle.velocityX= -3;
        obstacle.scale=0.4;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 5:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle5);
        obstacle.velocityX= -3;
        obstacle.scale=0.4;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 6:
        var obstacle = createSprite(1200,invisibleGround.y-20,10,40);
        obstacle.addImage(obstacle6);
        obstacle.velocityX= -3;
        obstacle.scale=0.3;
        obstacle.lifetime = 410;
        obstacleGroup.add(obstacle);
        break;
      case 7:
        var tero = createSprite(1200,Math.round(random(invisibleGround.y-20,invisibleGround.y-40)),10,40);
        tero.addAnimation("terofly",tero_fly);
        tero.velocityX = -3;
        tero.scale=0.7;
        tero.lifetime = 410;
        obstacleGroup.add(tero);
        break;
      case 8:
        var dino = createSprite(1200,invisibleGround.y-20,10,40);
        dino.addImage(dinoImg);
        dino.velocityX = -3;
        dino.scale=0.4;
        dino.lifetime = 410;
        obstacleGroup.add(dino);
        break;
      default:
        break;
    }
  }
}