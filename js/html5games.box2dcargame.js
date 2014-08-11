// the global object that contains the variable needed for the player game
var superJumpGame =
{
	// game state constant
	STATE_STARTING_SCREEN : 1,
	STATE_PLAYING : 2,
	STATE_GAMEOVER_SCREEN : 3,
	state : 0,
	currentLevel: 0
}

var canvas;
var ctx;
var canvasWidth
var canvasHeight;

var player;

var canJump;

superJumpGame.death = new Array();
superJumpGame.levels = new Array();

superJumpGame.levels[0] = [{"type":"player","x":100,"y":525},
	// Bottom border
	{"type":"HorizontalBorder","x":500, "y":575, "width":450,
		"height":25, "rotation":0},
	// Left Border
	{"type":"VerticalBorder","x":25, "y":300, "width":25,
		"height":300, "rotation":0},
	// Right Border
	{"type":"VerticalBorder","x":975, "y":300, "width":25,
		"height":300, "rotation":0},
	// Top Border
	{"type":"HorizontalBorder","x":500, "y":25, "width":450,
		"height":25, "rotation":0},
	
	// level specific boxes
	{"type":"Level1Box1","x":400, "y":400, "width":350,
		"height":25, "rotation":0},
	{"type":"Level1Box2","x":875, "y":500, "width":125,
		"height":25, "rotation":-40},
	{"type":"Level1Box1","x":600, "y":225, "width":350,
		"height":25, "rotation":0},
	{"type":"Level1Box2","x":125, "y":325, "width":125,
		"height":25, "rotation":40},
	
	// Death (obstacle) boxes
	{"type":"death", "x": 250, "y":440, "width":75, "height":15,
		"rotation":-180},	
	{"type":"death", "x": 865, "y":265, "width":75, "height":15,
		"rotation":-180},
	{"type":"death", "x": 135, "y":65, "width":75, "height":15,
		"rotation":-180},
	{"type":"death", "x": 300, "y":65, "width":75, "height":15,
		"rotation":-180},
	
	// win box
	{"type":"win","x":925,"y":75,"width":15,"height":25,
		"rotation":0}];

superJumpGame.levels[1] = [{"type":"player","x":100,"y":525},
	// Bottom border
	{"type":"HorizontalBorder","x":500, "y":575, "width":450,
		"height":25, "rotation":0},
	// Left Border
	{"type":"VerticalBorder","x":25, "y":300, "width":25,
		"height":300, "rotation":0},
	// Right Border
	{"type":"VerticalBorder","x":975, "y":300, "width":25,
		"height":300, "rotation":0},
	// Top Border
	{"type":"HorizontalBorder","x":500, "y":25, "width":450,
		"height":25, "rotation":0},
	
	// level specific boxes
	{"type":"Level2Box1","x":250, "y":400, "width":200,
		"height":25, "rotation":0},
	{"type":"Level2Box2","x":600, "y":325, "width":225,
		"height":25, "rotation":90},
	{"type":"Level2Box3","x":570, "y":550, "width":50,
		"height":25, "rotation":-45},
	{"type":"Level2Box1","x":250, "y":275, "width":200,
		"height":25, "rotation":0},
	{"type":"Level2Box3","x":570, "y":275, "width":50,
		"height":25, "rotation":-45},
	{"type":"Level2Box3","x":575, "y":125, "width":50,
		"height":25, "rotation":0},
	{"type":"Level2Box3","x":60, "y":235, "width":50,
		"height":25, "rotation":45},
	{"type":"Level2Box4","x":300, "y":150, "width":175,
		"height":25, "rotation":0},
	{"type":"Level2Box2","x":750, "y":275, "width":225,
		"height":25, "rotation":90},
	{"type":"Level2Box3","x":950, "y":425, "width":50,
		"height":25, "rotation":-45},
	{"type":"Level2Box3","x":780, "y":325, "width":50,
		"height":25, "rotation":45},
	{"type":"Level2Box3","x":950, "y":225, "width":50,
		"height":25, "rotation":-45},
		
	// Death (obstacle) boxes
	{"type":"death", "x": 135, "y":360, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 300, "y":360, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 790, "y":135, "width":75, "height":15,
		"rotation":90},
	
	// win box
	{"type":"win","x":925,"y":75,"width":15,"height":25,
		"rotation":0}];
		
superJumpGame.levels[2] = [{"type":"player","x":100,"y":75},
	// Bottom border
	{"type":"HorizontalBorder","x":500, "y":575, "width":450,
		"height":25, "rotation":0},
	// Left Border
	{"type":"VerticalBorder","x":25, "y":300, "width":25,
		"height":300, "rotation":0},
	// Right Border
	{"type":"VerticalBorder","x":975, "y":300, "width":25,
		"height":300, "rotation":0},
	// Top Border
	{"type":"HorizontalBorder","x":500, "y":25, "width":450,
		"height":25, "rotation":0},
		
	// level specific boxes
	{"type":"Level2Box2","x":275, "y":200, "width":225,
		"height":25, "rotation":0},
	{"type":"Level3Box1","x":700, "y":237, "width":188,
		"height":25, "rotation":-90},
	{"type":"Level2Box3","x":675, "y":75, "width":50,
		"height":25, "rotation":55},
	{"type":"Level3Box2","x":555, "y":225, "width":75,
		"height":25, "rotation":-90},
	{"type":"Level3Box3","x":460, "y":400, "width":265,
		"height":25, "rotation":0},
	{"type":"Level2Box3","x":530, "y":285, "width":50,
		"height":25, "rotation":0},
	{"type":"Level3Box2","x":70, "y":250, "width":75,
		"height":25, "rotation":-45},
	{"type":"Level3Box2","x":200, "y":400, "width":75,
		"height":25, "rotation":45},
	{"type":"Level3Box2","x":310, "y":480, "width":75,
		"height":25, "rotation":0},
	{"type":"Level3Box4","x":580, "y":435, "width":140,
		"height":25, "rotation":-15},
	{"type":"Level3Box5","x":850, "y":400, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":865, "y":250, "width":25,
		"height":25, "rotation":0},
	
	// Death (obstacle) boxes
	{"type":"death", "x": 515, "y":175, "width":75, "height":15,
		"rotation":90},
	{"type":"death", "x": 300, "y":360, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 355, "y":440, "width":75, "height":15,
		"rotation":-180},
	{"type":"death", "x": 700, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 865, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 810, "y":175, "width":75, "height":15,
		"rotation":-180},
	
	// win box
	{"type":"win","x":750,"y":75,"width":15,"height":25,
		"rotation":0}];
		
superJumpGame.levels[3] = [{"type":"player","x":100,"y":525},
	// Bottom border
	{"type":"HorizontalBorder","x":500, "y":575, "width":450,
		"height":25, "rotation":0},
	// Left Border
	{"type":"VerticalBorder","x":25, "y":300, "width":25,
		"height":300, "rotation":0},
	// Right Border
	{"type":"VerticalBorder","x":975, "y":300, "width":25,
		"height":300, "rotation":0},
	// Top Border
	{"type":"HorizontalBorder","x":500, "y":25, "width":450,
		"height":25, "rotation":0},
		
	// level specific boxes
	{"type":"Level1Box2","x":450, "y":325, "width":125,
		"height":25, "rotation":90},
	{"type":"Level3Box5","x":265, "y":525, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":350, "y":450, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":250, "y":375, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":150, "y":300, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":300, "y":225, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":600, "y":325, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":800, "y":325, "width":25,
		"height":25, "rotation":0},
	{"type":"Level3Box5","x":925, "y":225, "width":25,
		"height":25, "rotation":0},

	// Death (obstacle) boxes
	// Inside border death boxes
	{"type":"death", "x": 375, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 540, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 705, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 870, "y":535, "width":75, "height":15,
		"rotation":0},
	{"type":"death", "x": 65, "y":135, "width":75, "height":15,
		"rotation":90},
	{"type":"death", "x": 65, "y":300, "width":75, "height":15,
		"rotation":90},
	{"type":"death", "x": 165, "y":65, "width":75, "height":15,
		"rotation":180},
	{"type":"death", "x": 330, "y":65, "width":75, "height":15,
		"rotation":180},
	{"type":"death", "x": 495, "y":65, "width":75, "height":15,
		"rotation":180},
	{"type":"death", "x": 660, "y":65, "width":75, "height":15,
		"rotation":180},
	{"type":"death", "x": 825, "y":65, "width":75, "height":15,
		"rotation":180},
	{"type":"death", "x": 935, "y":435, "width":75, "height":15,
		"rotation":-90},
	// area death boxes
	{"type":"death", "x": 410, "y":325, "width":75, "height":15,
		"rotation":-90},
	{"type":"death", "x": 490, "y":325, "width":75, "height":15,
		"rotation":90},
	
	// win box
	{"type":"win","x":925,"y":75,"width":15,"height":25,
		"rotation":0}];

$(function()
{
	superJumpGame.music = document.getElementById("music");
	// Keyboard event
	$(document).keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 87: // w key to jump up
				if (canJump)
				{
					var vec = player.GetLinearVelocity();
					vec.y = -200;
					player.SetLinearVelocity(vec);
				}
				break;
			case 83: // s key to jump down
				if (canJump)
				{
					var vec = player.GetLinearVelocity();
					vec.y = 200;
					player.SetLinearVelocity(vec);
				}
				break;
			case 65: // a key to apply force towards left
				var vec = player.GetLinearVelocity();
				vec.x = -200;
				player.SetLinearVelocity(vec);
				break;
			
			case 68: // d key to apply force towards right
				var vec = player.GetLinearVelocity();
				vec.x = 200;
				player.SetLinearVelocity(vec);
				break;
			
			case 82: // r key to restart the level
				if (superJumpGame.currentLevel != 2)
					restartGame(superJumpGame.currentLevel, 0, 300);
				else
					restartGame(superJumpGame.currentLevel, 0, -300);
				break;
			
			case 81: // q key to restart the game
				restartGame(0, 0, 300);
				setTimeout(playMusic, 1000);
				break;
		}
	});
	
	// set the game state as "starting screen"
	superJumpGame.state = superJumpGame.STATE_STARTING_SCREEN;
	// start the game when clicking anywhere in starting screen
	$('#game').click(function()
	{
		if (superJumpGame.state == superJumpGame.STATE_STARTING_SCREEN)
		{
			setTimeout(playMusic, 1000);
			$("#help").fadeOut();
			// change the state to playing.
			superJumpGame.state = superJumpGame.STATE_PLAYING;
			// start new game
			restartGame(superJumpGame.currentLevel, 0, 300);
			// start advancing the step
			step();
		}
	});
	
	restartGame(superJumpGame.currentLevel, 0, 300);
	
	// get the reference of the context
	canvas = document.getElementById('game');
	ctx = canvas.getContext('2d');
	canvasWidth = parseInt(canvas.width);
	canvasHeight = parseInt(canvas.height);
	// draw the world
	drawWorld(superJumpGame.world, ctx);
});

function createWorld(gravityx, gravityy)
{
	// set the size of the world
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-4000, -4000);
	worldAABB.maxVertex.Set(4000, 4000);
	// Define the gravity
	superJumpGame.gravity = new b2Vec2(gravityx, gravityy);
	// set to ignore sleeping object
	var doSleep = false;
	// finally create the world with the size, gravity, and sleep object parameter
	var world = new b2World(worldAABB, superJumpGame.gravity, doSleep);
	return world;
}

function createGround(x, y, width, height, rotation, type)
{
	// box shape definition
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(width, height);
	groundSd.restitution = 0;
	if (type == "win")
	{
		groundSd.userData = document.getElementById('flag');
	}
	if (type == "death")
	{
		groundSd.userData = document.getElementById('death');
	}
	if (type == "HorizontalBorder")
	{
		groundSd.userData = document.getElementById('HorizontalBorder');
	}
	if (type == "VerticalBorder")
	{
		groundSd.userData = document.getElementById('VerticalBorder');
	}
	// Level 1 Specific boxes
	if (type == "Level1Box1")
	{
		groundSd.userData = document.getElementById('Level1Box1');
	}
	if (type == "Level1Box2")
	{
		groundSd.userData = document.getElementById('Level1Box2');
	}
	// Level 2 Specific boxes
	if (type == "Level2Box1")
	{
		groundSd.userData = document.getElementById('Level2Box1');
	}
	if (type == "Level2Box2")
	{
		groundSd.userData = document.getElementById('Level2Box2');
	}
	if (type == "Level2Box3")
	{
		groundSd.userData = document.getElementById('Level2Box3');
	}
	if (type == "Level2Box4")
	{
		groundSd.userData = document.getElementById('Level2Box4');
	}
	// Level 3 Specific boxes
	if (type == "Level3Box1")
	{
		groundSd.userData = document.getElementById('Level3Box1');
	}
	if (type == "Level3Box2")
	{
		groundSd.userData = document.getElementById('Level3Box2');
	}
	if (type == "Level3Box3")
	{
		groundSd.userData = document.getElementById('Level3Box3');
	}
	if (type == "Level3Box4")
	{
		groundSd.userData = document.getElementById('Level3Box4');
	}
	if (type == "Level3Box5")
	{
		groundSd.userData = document.getElementById('Level3Box5');
	}
	
	// body definition with the given shape we just created.
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x, y);
	groundBd.rotation = rotation * Math.PI / 180;
	
	var body = superJumpGame.world.CreateBody(groundBd);
	return body;
}

// drawing functions
function drawWorld(world, context)
{
	for (var b = world.m_bodyList; b != null; b = b.m_next)
	{
		for (var s = b.GetShapeList(); s != null; s = s.GetNext())
		{
			if (s.GetUserData() != undefined)
			{
				// the user data contains the reference to the image
				var img = s.GetUserData();
				// the x and y of the image.
				// We have to substract the half width/height
				var x = s.GetPosition().x;
				var y = s.GetPosition().y;
				var topleftX = - $(img).width()/2;
				var topleftY = - $(img).height()/2;
				context.save();
				context.translate(x,y);
				context.rotate(s.GetBody().GetRotation());
				context.drawImage(img, topleftX, topleftY);
				context.restore();
			}
			// for debugging only
			else
			{
				drawShape(s, context);
			}
		}
	}
}
				
// drawShape function directly copied from draw_world.js in Box2dJS library
function drawShape(shape, context)
{
	context.strokeStyle = '#003300';
	context.beginPath();
	switch (shape.m_type)
	{
		case b2Shape.e_circleShape:
		// Draw the circle in canvas bases on the physics object shape
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++)
			{
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
			break;
			
		case b2Shape.e_polyShape:
			// Draw the polygon in canvas bases on the physics object shape
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++)
			{
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
			break;
	}
	context.stroke();
}

function step()
{
	superJumpGame.world.Step(1.0/60, 1);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(superJumpGame.world, ctx);
	setTimeout(step, 10);
	
	var cn = superJumpGame.world.GetContactList();
	if (cn == null)
	{
		canJump = false;
	}
	
	//loop all contact list to check if the player hits the winning wall
	for (var cn = superJumpGame.world.GetContactList(); cn != null;
		cn = cn.GetNext())
	{
		var body1 = cn.GetShape1().GetBody();
		var body2 = cn.GetShape2().GetBody();
		
		// Cycles through each obstacle for the level
		jQuery.each(superJumpGame.death, function()
		{
			if ((body1 == player && body2 == this) ||
				(body2 == player && body1 == this))
			{
				if (superJumpGame.currentLevel == 2)
					restartGame(superJumpGame.currentLevel, 0, -300);
				else
					restartGame(superJumpGame.currentLevel, 0, 300);
			}
		});
		
		// attempt at changing gravity, ignore
		if ((body1 == player && body2 == superJumpGame.gravity) ||
			(body2 == player && body1 == superJumpGame.gravity))
		{
			superJumpGame.world = createWorld(300, 0);
		}
		
		canJump = true;
		
		if ((body1 == player && body2 == superJumpGame.gamewinWall) ||
			(body2 == player && body1 == superJumpGame.gamewinWall))
		{
			if (superJumpGame.currentLevel == 1)
			{
				restartGame(superJumpGame.currentLevel+1,0, -300);
			}
			else if (superJumpGame.currentLevel < 3)
			{
				restartGame(superJumpGame.currentLevel+1, 0, 300);
			}
			else
			{
				// show game over screen
				$('#game').removeClass().addClass('gameWon');
				$('#level').fadeOut();
				// clear the physics world
				superJumpGame.world = createWorld(0, 300);
			}
		}
	}	
}

function createBodyAt(x, y)
{
	// the player box definition
	var boxSd = new b2BoxDef();
	boxSd.density = 1.0;
	boxSd.friction = 1.5;
	boxSd.restitution = 0;
	boxSd.extents.Set(40, 20);
	boxSd.userData = document.getElementById('player');
	// the player body definition
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	var playerBody = superJumpGame.world.CreateBody(boxBd);
	return playerBody;
}

function restartGame(level, gravityx, gravityy)
{
	superJumpGame.currentLevel = level;
	// create the world
	superJumpGame.world = createWorld(gravityx, gravityy);
	// create a ground in our newly created world
	// load the ground info from level data
	for(var i=0;i<superJumpGame.levels[level].length;i++)
	{
		var obj = superJumpGame.levels[level][i];
		// create player
		if (obj.type == "player")
		{
			player = createBodyAt(obj.x,obj.y);
			continue;
		}
		var groundBody = createGround(obj.x, obj.y, obj.width,
			obj.height, obj.rotation, obj.type);
		if (obj.type == "win")
		{
			superJumpGame.gamewinWall = groundBody;
		}
		if (obj.type == "death")
		{
			superJumpGame.death[i] = groundBody;
		}
		if (obj.type == "rotateGravityToRight")
		{
			superJumpGame.world.m_gravity = new b2Vec2(300, 0);
		}
	}
	$("#level").html("Level " + (level+1));
	// change the background image to fit the level
	$('#game').removeClass().addClass('gamebg_level'+level);
}

function playMusic()
{
	superJumpGame.music.stop();
	superJumpGame.music.play();
}
