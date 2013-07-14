Chessenger
==========

A jQuery plugin that allows you to create a multiplayer (and single player) chess on your browser.

Currently it's just a chessboard on the browser. I'm still stuck at the client end. You can create a chessboard of your chosen size, side (black or white), and possibly configuration (what pieces go where), and voila: here's your chessboard.


Drag, and drop the pieces to move. Validating the moves is turned off, so you can move anything around, anywhere, and you can undo.
Usage
-----

Add a div with class `chess-board` in the markup. Gonna change that in the futer. You can add any class, or any selector for that matter.

Add the following JavaScript, to create a chessboard with the default pieces (i.e. the starting orientation):

	$("chess-board").initBoard({
		animationTime: 100,
		size: 600,
		flip: false,
		validateMoves: false
	});


All options are, well <i>optional<i>. Here's what they all do:

<table>
 <tr>
  <th>Option</th>
  <th>What it does</th>
 </tr>

 <tr>
  <td>`animationTime`</td>
  <td>Nothing (for now). In future, when your opponent moves, his move is gonna be animated for this amount of duration.</td>
 </tr>

 <tr>
  <td>`flip`</td>
  <td>If set to `true`, flips the board so the black side is your side, i.e. at the bottom.
  <br>
  Default: `false`
  </td>
 </tr>

 <tr>
  <td>`size`</td>
  <td>Width (and Height ('cause chessboard's a square!)) of the board in `px`.
  <br>
  Default: `650`
  </td>
 </tr>

 <tr>
  <td>`validateMoves`</td>
  <td>If set to `true` it, as the name suggests, validates the moves. So you can' move anything around anywhere. I've only validated pawns movement now, so if you move anything else your PC's gonna burn down. I'm not kidding.
  <br>
  Default: `false`
  </td>
 </tr>
</table>

To add a piece, write: 

	$(".chess-board").add([color, code, position]);

`color`: String. "black" or "white". Possible case-sensitive. I don't remember anymore. Just use lowercase, alright!
`code`: `p` for a pawn, `R` for a Rook, `Q` for a Queen (or <i>The</i> Queen, if you prefer) and so on. It's the standard notation.
`position`: String. 2 characters. <File> + <Rank>.

For example, 

	$(".chess-board").add(["black", "N", "D4"]);

would add a dark knight to D4.


To undo, simply type:

	$(".chess-board").undo();


That's all folks.
