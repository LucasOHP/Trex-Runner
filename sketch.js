//variáveis
var trex ,trex_running,trexD;
var borda;
var solo ,sImage;
var soloV
var nuvem ,nImage,nuvem_gp
var sorteio
var cacto,ci1,ci2,ci3,ci4,ci5,ci6,cacto_gp;
var score = 0;
var record = 0;
var play = 1;
var end = 0;
var gameState = play;
var GO,GOimg
var restart,restartImg
var jumpS
var dieS
var cpS

function preload(){
  trex_running = loadAnimation("trex3.png","trex4.png");

  jumpS = loadSound("jump.mp3");

  dieS = loadSound("die.mp3");

  cpS = loadSound("checkpoint.mp3");

  sImage = loadImage("ground2.png");

  nImage = loadImage("cloud.png");

  ci1 = loadImage("obstacle1.png");
  ci2 = loadImage("obstacle2.png");
  ci3 = loadImage("obstacle3.png");
  ci4 = loadImage("obstacle4.png");
  ci5 = loadImage("obstacle5.png");
  ci6 = loadImage("obstacle6.png");

  trexD = loadAnimation("trex_collided.png");
  
  GOimg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");
}

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  //600 x 200
  trex = createSprite(50,height-50,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexD);
  trex.scale = 0.5;

  solo = createSprite(width/2,height-20,width,20);
  solo.addImage("ground", sImage);
  

  soloV = createSprite(width/2,height-15,width,10);
  soloV.visible = false;

  cacto_gp = new Group();
  nuvem_gp = new Group();

  borda = createEdgeSprites();

  GO = createSprite(width/2,height-120,20,20);
  GO.addImage(GOimg);
  GO.scale = 0.7;
  GO.visible = false;
 
  restart = createSprite(width/2,height-80,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw(){
  background("white");

  text("Score: "+score,width-100,height-180);
  text("Record: "+record,width-170,height-180);
  
  if(gameState === play){
    if(keyDown("space")&&trex.y > height-50){
      trex.velocityY = -10.5; 
      jumpS.play();
    }

    score = 0;

    gravity(); 

    if(trex.isTouching(cacto_gp)){
      gameState = end;
      //dieS.play();
    }
    /*if(trex.isTouching(cacto_gp)){
      trex.velocityY = -8.5; 
      jumpS.play();
    }*/

    if(score%100 === 0&&score>0){
      cpS.play();
    }

    /*if(score%500 === 0&&score>0){
      background("black");
    }*/
    
    solo.velocityX = -(2+score/100);
    if(solo.x < 300){
      solo.x = solo.width/2;
    }

    SN();

    SC();

    score = Math.round(frameCount/2);
  }

  if(gameState === end){
    gravity();
    stopGame();
    if(score>record){
      record = score;
    }
    if(mousePressedOver(restart)){
      restartGame();
    }
  }

  trex.collide(soloV); 

  console.log(score);
  
  drawSprites();
}

function gravity(){
  trex.velocityY = trex.velocityY + 0.5;
}

function SN(){
  if(frameCount%60 === 0){
    nuvem = createSprite(width,100,30,30);
    nuvem.velocityX = -(2+score/100);
    nuvem.addImage(nImage);
    nuvem.y = Math.round(random(height-180,height-100)); 
    nuvem.scale = random(0.3,1);
    nuvem.lifetime = width/nuvem.velocityX;
    nuvem.depth = trex.depth-1;
    nuvem_gp.add(nuvem);
  }
} 

function SC(){
  if(frameCount%90 === 0){
    cacto = createSprite(width,height-30,30,30);
    cacto.velocityX = -(2+score/100);
    cacto.lifetime = width/cacto.velocityX;
    cacto.depth = trex.depth-1;
    sorteio = Math.round(random(1,6));
    cacto.scale = 0.4;
    switch (sorteio) {
      case 1:
        cacto.addImage(ci1);
        break;
      case 2:
        cacto.addImage(ci2);
        break;
      case 3:
        cacto.addImage(ci3);
        break;
      case 4:
        cacto.addImage(ci4);
        break;
      case 5:
        cacto.addImage(ci5);
        break;
      case 6:
        cacto.addImage(ci6);
        cacto.scale = 0.3
        break;
    }
    cacto_gp.add(cacto);
  }
}

function stopGame(){
  nuvem_gp.setVelocityXEach(0); 
  cacto_gp.setVelocityXEach(0);
  solo.velocityX = 0;
  trex.changeAnimation("trexD",trexD);  
  GO.visible = true;
  restart.visible = true;
  cacto_gp.setLifetimeEach(-1);
  nuvem_gp.setLifetimeEach(-1);
}

function restartGame() {
  gameState = play;
  trex.changeAnimation("run",trex_running);
  cacto_gp.destroyEach();
  nuvem_gp.destroyEach();
  GO.visible = false;
  restart.visible = false; 
  score = 0;
  frameCount = 0;
  console.log(score);
}
