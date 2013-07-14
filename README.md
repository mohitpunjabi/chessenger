Chessenger
==========

A jQuery plugin that allows you to create a multiplayer (and single player) chess on your browser.

Currently it's just a chessboard on the browser. I'm still stuck at the client end. You can create a chessboard of your chosen size, side (black or white), and possibly configuration, and voila: here's your chessboard.


Drag, and drop the pieces to move. Validating the moves is turned off, so you can move anything around, anywhere.
Usage
-----

Add a div with class chess-board in the markup.

Add the following JavaScript:

	chess.initBoard({
		animationTime: 100,
		size: 600,
		flip: false,
		validateMoves: false
	})



