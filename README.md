Chessenger
==========

A jQuery plugin that allows you to create a multiplayer (and single player) chess on your browser.

Currently it's just a chessboard on the browser. I'm still stuck at the client end. You can create a chessboard of your chosen size, side (black or white), and possibly configuration (what pieces go where), and voila: here's your chessboard.


Drag, and drop the pieces to move. Validating the moves is turned off, so you can move anything around, anywhere, and you can undo.
Usage
-----

Add a div with class `chess-board` in the markup. Will be changed in the future. You will be able to set any class, or any selector for that matter.

Add the following JavaScript, to create a chessboard with the default pieces (i.e. the starting orientation):

	$("chess-board").initBoard({
		animationTime: 100,
		size: 600,
		flip: false,
		validateMoves: false
	});


All options are, well <i>optional</i>. Here's what they all do:

<table>
 <tr>
  <th>Option</th>
  <th>What it does</th>
  <th>Default value</th>
 </tr>

 <tr>
  <td><code>animationTime</code></td>
  <td>Nothing (for now). In future, when your opponent moves, his move will be animated for this amount of duration.</td>
  <td>
  <code>100</code>
  </td>
 </tr>

 <tr>
  <td><code>flip</code></td>
  <td>If set to <code>true</code>, flips the board so the black side is your side, i.e. at the bottom.
  </td>
  <td>
  <code>false</code>
  </td>
 </tr>

 <tr>
  <td><code>size</code></td>
  <td>Width (and Height ('cause chessboard's a square!)) of the board in <code>px</code>.
  </td>
  <td>
  <code>650</code>
  </td>
 </tr>

 <tr>
  <td><code>validateMoves</code></td>
  <td>If set to true it, as the name suggests, validates the moves. So you can move anything around anywhere. I've only validated pawns' movement now (except the queening), so if you move anything else, your PC will burn down. I'm not kidding.
  </td>
  <td>
  <code>false</code>
  </td>
 </tr>
</table>

<h3>Add a piece</h3>


To add a piece, write: 

	$(".chess-board").add([color, code, position]);

`color`: String. `black` or `white`. Possible case-sensitive. I don't remember anymore. Just use lowercase, alright!

`code`: `p` for a pawn, `R` for a Rook, `Q` for a Queen (or <i>The</i> Queen, if you prefer) and so on. It's the standard notation.

`position`: String. 2 characters. File + Rank.

For example, 

	$(".chess-board").add(["black", "N", "D4"]);

would add a dark knight to D4.

<h3>Undo</h3>

To undo, simply type:

	$(".chess-board").undo();


<big>That's all folks.</big>
