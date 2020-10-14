class Game {
  constructor(){}
  
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
  }
  play(){
  form.hide();
  textSize(30);
  text("Game Started",120,90);
  player.getplayerinfo();
  if(allplayers !== undefined){
    var position = 130;
    position +=20
    for(var plr in allPlayers){
      if (plr === "player" + player.index)
        fill("red")
      else
        fill("black");
    textSize(15);
    text(allplayers[plr].name + allplayers[plr].distance,120,position)
   }
  }
  if (keyIsDown(UP_ARROW) &&player.index !== null){
    player.distance +=50;
    player.update();
  }
 }
}