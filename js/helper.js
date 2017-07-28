/*jshint esversion: 6 */
// Global Variable Declarations
var openTiles = [];
var matchedTiles = [];
var timeTaken,
  timeCounter;
var movesTaken;

function updateMoves(init = null) {
  // function takes a value and initialize the moves taken to that value.
  // if no value is passed the function will increment current value of moves by 1.
  if (init != null) {
    movesTaken = init;
  } else {
    movesTaken += 1;
  }
  $('#moves').html(" " + movesTaken);
}

function createTile(tile, row) {
  // function takes the row element and tile object
  // creates and appends a tile to row element
  var $tile = $("<div class='tile col-xs-3'> </div>");
  var $content = $("<div class='content'></div>");
  var $front = $("<div class='front'></div>");
  var $back = $(`<div class="back ${tile.colorClass}" key="${tile.id}"> <i class="fa ${tile.icon} fa-2x"></i></div>`);
  $content.append($front).append($back);
  $tile.append($content);
  row.append($tile);
}

function getRandomTile(tiles) {
  // takes in a tiles object with following keys: array ( array of tiles object), rand ( random objec from tiles array), index ( index of random objec from tiles array)
  tiles.index = Math.floor(Math.random() * tiles.array.length);
  tiles.rand = tiles.array[tiles.index];
  tiles.array.splice(tiles.index, 1);
  return tiles;
}

function createTiles(tilesArray) {
  // function takes in array of objects and then creates a grid of tiles of size 4 * 4.
  var tiles = {
    array: tilesArray
  };
  var $card = $(".card");
  $card.empty();
  for (var i = 0; i < 4; i++) {
    var $row = $("<div class='row'></div>");
    for (var j = (4 * i); j < 4 * (i + 1); j++) {
      tiles = getRandomTile(tiles);
      createTile(tiles.rand, $row);
    }
    $card.append($row);
  }
}

function createRestartScreen() {
  // After the game completes this function renders the restart screen
  var restartScreen = `
   <div class="curtain">
      <div class="row restart animated flipInY">
          <div class="col-xs-12 text-center score">
            <span class="head">SCORE </span>
            <span class="value">${Math.round(1000 / (timeTaken + (movesTaken * 10)))} </span>
          </div>

          <div class="col-xs-12 text-center margin-top-5" id="restart">
            <i class="fa fa-repeat fa-4x"></i>
          </div>

          <div class="col-xs-offset-2 col-xs-8 margin-top-5 star">
            <div class="col-xs-4 text-right">
              <i class="fa fa-star fa-2x"></i>
            </div>
            <div class="col-xs-4 text-center">
              <i class="fa ${ (movesTaken > 14) ? "fa-star-o" : "fa-star"} fa-2x"></i>
            </div>
            <div class="col-xs-4">
              <i class="fa ${ (movesTaken > 10) ? "fa-star-o" : "fa-star"} fa-2x"></i>
            </div>
          </div>
      </div>
    </div>
  `;
  var $card = $(".card");
  $card.empty();
  $card.append($(restartScreen));
}

function gameOver() {
  // function invoked when the game ends
  // renders the restart screen
  // apply restart game click binding
  clearInterval(timeCounter);
  $('.restart').addClass('flipInY');
  createRestartScreen();
  $('#restart').click(function() {
    startGame();
    $(this).off();
  });
}

function flipIt(self) {
  // flip takes in the dom tile element that needs to be flipped.
  if (openTiles.length < 2) {
    // Length is less than 2.
    // thus the tile is flipped
    $(self).addClass('flipped');
    $(self).off();
    openTiles.push(self);
  }

  if (openTiles.length === 2) {
    // closes the opened tiles if the 2 tiles does not match.
    var val1 = $($(openTiles[0]).find('.back')[0]).attr('key');
    var val2 = $($(openTiles[1]).find('.back')[0]).attr('key');
    updateMoves();
    if (val1 !== val2) {
      // Doesn't Match
      // Flip them back and again apply click listener
      setTimeout(function() {
        clickListen(openTiles[0]);
        clickListen(openTiles[1]);
        openTiles = [];
      }, 800);
    } else {
      // match
      // keep them open and push them to matchedTiles array.
      matchedTiles.push(val1);
      openTiles = [];
      // check if all the tiles have matched.
      if (matchedTiles.length === 8) {
        // all matched this over the game.
        gameOver();
      }
    }
  }
}

function clickListen(self) {
  // apply click listener to a tile that flips it
  // if the tile is already flipped, then unflip it.
  $(self).removeClass('flipped');
  $(self).click(function() {
    flipIt(this);
  });
}

function startGame() {
  // Starts the game when the play buttom is clicked
  // calls the function that renders the tile grid.
  createTiles(data.slice());

  // apply click binding to all the tiles
  $('.tile').click(function() {
    flipIt(this);
  });

  // initialize the time taken to 0 befor the game starts
  timeTaken = 0;
  $('#time').html(" " + timeTaken);
  // initialize the moves taken to 0 befor the game starts
  updateMoves(0);

  // initialize a interval function to update time at every 1 second.
  timeCounter = setInterval(function() {
    timeTaken += 1;
    $('#time').html(" " + timeTaken);
  }, 1000);

}

// This function apply the start game click binding after the whole dom has loaded.
$(function() {
  $("#start").click(function() {
    startGame();
    $(this).off();
  });
});
