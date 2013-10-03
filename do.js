// Run $.getScript('file:///THE_PATH/do.js'); at console
// var script= document.createElement('script');
// script.type= 'text/javascript';
// script.src= 'file:///THE_PATH/do.js';
// document.head.appendChild(script);

/*

$.getScript('http://SOME_SITE/do.js');

javascript:(function(){ $.getScript('http://SOME_SITE/do.js'); })();

*/


// Enum ordered starting from 1
function Enumeration() {
  this.allItems = [];
  for(var i = 0; i < arguments.length; i++) {
    name = arguments[i];
    this[name] = (i+1);
    this[(i+1)] = name;
    this.allItems.push(name)
  }
}

/* Convert to Strings */
var c_color   = new Enumeration('red', 'blue', 'green');
var c_shading = new Enumeration('solid', 'open', 'striped');
var c_shape   = new Enumeration('oval', 'diamond', 'squiggle');
var c_number  = new Enumeration('one', 'two', 'three');


/* Helper Functs */
function get_card_shapes(index){
	return $(".cardwrap").find(".shapeWrap").eq(index).find(".shape");
}
function get_pos(index){
	return get_card_shapes(index).eq(0).css("background-position");
}
function get_board_size(){
	//return $("#board td").length;
	return $("#board .card").length;
}


/* Card Object */
function card(index){
	this.index = index;
	var shapes = get_card_shapes(this.index);
	var pos = get_pos(this.index).replace('px','').replace('px','').split(' ');
	
	var x = eval(pos[0]) / (-33);
	var y = eval(pos[1]) / (-55);

	this.num = shapes.length;
	this.shape = y + 1;
	this.shading = (x % 3) + 1;
	this.color = Math.floor(x / 3) + 1;
}

function get_board(){
	var board = new Array();
	var board_size = get_board_size();
	for(var i = 0; i < board_size; i++) {
		board[i] = new card(i);
	}
	return board;
}

function card_log(card){
	console.log(c_color[card.color] + ', ' + c_shading[card.shading] + ', ' + c_shape[card.shape] + ', ' + c_number[card.num]);
}


/* Solver Functions */

function is_prop(p1,p2,p3){
	if ( ((p1 == p2) && (p2 == p3)) || ((p1 != p2) && (p2 != p3) && (p1 != p3)) ) return true;
	else return false;
}

function is_set(c1, c2, c3){
	if( !is_prop(c1.num,c2.num,c3.num) ) return false;
	if( !is_prop(c1.shape,c2.shape,c3.shape) ) return false;
	if( !is_prop(c1.shading,c2.shading,c3.shading) ) return false;
	if( !is_prop(c1.color,c2.color,c3.color) ) return false;
	return true;
}


function find_set(){
	var b = get_board();
	var board_size = get_board_size();
	for(var x = 0; x < board_size; x++) {
		for(var y = 0; y < board_size; y++) {
			for(var z = 0; z < board_size; z++) {
				if((x == y) || (y == z) || (x == z)) continue;
				if(is_set(b[x],b[y],b[z])){
					console.log("Set found: " + x.toString() + ', ' + y.toString() + ', ' + z.toString());
					return new Array(x,y,z);
				}
			}
		}
	}
	console.log("# No set found");
	return -1;
}

function move(){
	var set = find_set();
	if (set == -1) return;
	var cards = $("#board .card");
	cards.eq(set[0]).mousedown()
	cards.eq(set[1]).mousedown()
	cards.eq(set[2]).mousedown()
}

$( "input" ).click(function( event ){
		//event.preventDefault();
		move();
	});
