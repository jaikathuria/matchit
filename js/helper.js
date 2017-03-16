function createTile(tile,row){
    var $tile = $("<div class='tile col-xs-3'> </div>");
    var $content = $("<div class='content'></div>");
    var $front = $("<div class='front'></div>");
    var $back = $(`<div class="back ${tile.colorClass}" > <i class="fa ${tile.icon} fa-2x"></i></div>`);
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


createTiles(data);
