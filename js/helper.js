var openTiles = [];
var matchedTiles = [];
var timeTaken,timeCounter;
var movesTaken

function updateMoves(init=null){
  if(init != null){
    movesTaken = init;
  }
  else {
    movesTaken += 1;
  }
  $('#moves').html(" " + movesTaken);
}

function createTile(tile,row){
    var $tile = $("<div class='tile col-xs-3'> </div>");
    var $content = $("<div class='content'></div>");
    var $front = $("<div class='front'></div>");
    var $back = $(`<div class="back ${tile.colorClass}" key="${tile.id}"> <i class="fa ${tile.icon} fa-2x"></i></div>`);
    $content.append($front).append($back);
    $tile.append($content);
    row.append($tile);
}

function getRandomTile(tiles){
  tiles.index = Math.floor(Math.random()*tiles.array.length);
  tiles.rand = tiles.array[tiles.index];
  tiles.array.splice(tiles.index,1);
  return tiles;
}

function createTiles(tilesArray){
  var tiles = {
    array: tilesArray
  }
  var $card = $(".card");
  $card.empty();
  for(var i = 0; i < 4; i++){
    var $row = $("<div class='row'></div>");
    for(var j = (4*i); j < 4*(i+1); j++){
      tiles = getRandomTile(tiles);
      createTile(tiles.rand,$row);
    }
    $card.append($row);
  }
}

function createRestartScreen() {
  var restartScreen = `
   <div class="curtain">
      <div class="row restart animated flipInY">
          <div class="col-xs-12 text-center score">
            <span class="head">SCORE </span>
            <span class="value">${Math.round(1000/(timeTaken + (movesTaken*10)))} </span>
          </div>

          <div class="col-xs-12 text-center margin-top-5" id="restart">
            <i class="fa fa-repeat fa-4x"></i>
          </div>

          <div class="col-xs-offset-2 col-xs-8 margin-top-5 star">
            <div class="col-xs-4 text-right">
              <i class="fa fa-star fa-2x"></i>
            </div>
            <div class="col-xs-4 text-center">
              <i class="fa ${(movesTaken > 14)?"fa-star-o":"fa-star" } fa-2x"></i>
            </div>
            <div class="col-xs-4">
              <i class="fa ${(movesTaken > 10)?"fa-star-o":"fa-star" } fa-2x"></i>
            </div>
          </div>
      </div>
    </div>
  `;
  $card = $(".card");
  $card.empty();
  $card.append($(restartScreen));
}

function gameOver() {
  clearInterval(timeCounter);
  $('.restart').addClass('flipInY');
  createRestartScreen();
  $('#restart').click(function(){
    startGame();
    $(this).off();
  });
  console.log("Game Over");
  console.log("Time Taken:" + timeTaken);
}

function flipIt(self){

  if(openTiles.length < 2) {
      // Length is less than 2.
    $(self).addClass('flipped');
    $(self).off();
    openTiles.push(self);
  }

  if(openTiles.length === 2){
      var val1 = $($(openTiles[0]).find('.back')[0]).attr('key');
      var val2 = $($(openTiles[1]).find('.back')[0]).attr('key');
      updateMoves();
      if (val1 !== val2){
        // Doesn't Match
        setTimeout(function () {
          clickListen(openTiles[0]);
          clickListen(openTiles[1]);
          openTiles = [];
        }, 1000);
      }
      else {
        // match
        matchedTiles.push(val1);
        openTiles = [];

        if(matchedTiles.length === 8){
          gameOver();
        }
      }
  }
}

function clickListen(self){
  $(self).removeClass('flipped');
  $(self).click(function(){
    flipIt(this);
  });
}

function startGame(){

  createTiles(data.slice());

  $('.tile').click(function(){
    flipIt(this);
  });

  timeTaken = 0;
  $('#time').html(" " + timeTaken);
  updateMoves(0);

  timeCounter = setInterval(function(){
    timeTaken += 1;
    $('#time').html(" " + timeTaken);
  },1000);

}

$(function(){
  $("#start").click(function(){
    startGame();
    $(this).off();
  });
})
