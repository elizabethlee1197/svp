class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

   
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      textSize(25);
      fill("white");
      text("player 1"+allPlayers.player1.score,50,150);
      text("player 2"+allPlayers.player2.score,50,200);
      text("player 3"+allPlayers.player3.score,50,250);
      text("player 4"+allPlayers.player4.score,50,300);

      textSize(25);
      fill("white");
      text("player 1 "+allPlayers.player1.lives,50,350);
      text("player 2 "+allPlayers.player2.lives,50,400);
      text("player 3 "+allPlayers.player3.lives,50,450);
      text("player 4 "+allPlayers.player4.lives,50,500);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill ("black");
          textSize(20);
          text(allPlayers[plr].name, x-25, y+65);
        }
      
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      //carSound.play();
    }

    if(keyIsDown(RIGHT_ARROW) ){
       player.velocityX=-9;
       player.velocityY=0;
    }
   
    if(keyIsDown(LEFT_ARROW) ){
      player.velocityX=+10;
      player.velocityY=0;
    }

    if (frameCount%200===0){
      obstacle=createSprite(random(100,1000),100, 100,);
      obstacle.velocityY=15;
      var rand=Math.round(random(1,2));
      switch(rand){
      case 1:obstacle.addImage("obstacle1",obstacle1_img);
      break;
      case 2:obstacle.addImage("obstacle2",obstacle2_img);
      break;
      
      }
  
      obstacle.scale=0.1;
     obstacleGroup.add(obstacle);
      
      }

      if (player.index !==null){
        for (var i=0; i < obstacleGroup.length; i++){
          if (obstacleGroup.get(i).isTouching(cars)){
            obstacleGroup.get(i).destroy();
           
            crashSound.play();
          }
        }
      }
          



if (frameCount%200===0){
  coin=createSprite(random(100,1000),100, 100,);
  coin.velocityY=15;
  var rand=Math.round(random(1,1));
  switch(rand){
  case 1:coin.addImage("coin",coin_img);
  break;

  }
  coin.scale=0.3;
 coinGroup.add(coin);
  
  }

  if (player.index !==null){
    for (var i=0; i < coinGroup.length; i++){
      if (coinGroup.get(i).isTouching(cars)){
        coinGroup.get(i).destroy();
        player.score=player.score+1;
        player.update();
        coinSound.play();
      }
    }
  }
      
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
