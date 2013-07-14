(function($) {
	var options = {};
	
	var defaults = {
		pieces: {
			white: "",
			black: ""
		},
		size: 650,
		animationTime: 400,
		flip: false,
		validateMoves: true
	};
	
	var squares;
	var self;

	function Piece(color, code, position) {
		this.code = code;
		this.position = position;
		this.color = color;
		this.chess = null;
	}

	Piece.prototype.move = function(to) {
		if(this.position != to) {
			var takes = this.chess.pieces[to];
			var from = this.position;
			this.chess.pieces[to] = this;
			this.chess.pieces[from] = null;
			this.position = to;
			return [from, takes, to];
		}
		return null;
	};
	
	Piece.prototype.getPossibleMoves = function() {
		var nf = function(file) {
			var files = "abcdefgh";
			return files.charAt(files.indexOf(file)+1);
		};
		var pf = function(file) {
			var files = "abcdefgh";
			return files.charAt(files.indexOf(file)-1);
		};
		var moves = Array();
		var file = this.position.charAt(0);
		var rank = parseInt(this.position.charAt(1));

		if(this.code == "p" && this.color == "white") {
			if(!chess.pieceAt(file + (rank+1)))
				moves.push(file + (rank+1));
			if(rank == 2 && !chess.pieceAt(file + (rank+2)))
				moves.push(file + (rank+2));
			if(chess.pieceAt(nf(file) + (rank+1))
			&& chess.pieceAt(nf(file) + (rank+1)).color != this.color)
				moves.push(nf(file) + (rank+1));
			if(chess.pieceAt(pf(file) + (rank+1))
			&& chess.pieceAt(pf(file) + (rank+1)).color != this.color)
				moves.push(pf(file) + (rank+1));
			return moves;
		}

		if(this.code == "p" && this.color == "black") {
			if(!chess.pieceAt(file + (rank-1))) 
				moves.push(file + (rank-1));
			if(rank == 7 && !chess.pieceAt(file + (rank-2)))
				moves.push(file + (rank-2));
			if(chess.pieceAt(nf(file) + (rank-1))
			&& chess.pieceAt(nf(file) + (rank-1)).color != this.color)
				moves.push(nf(file) + (rank-1));
			if(chess.pieceAt(pf(file) + (rank-1))
			&& chess.pieceAt(pf(file) + (rank-1)).color != this.color)
				moves.push(pf(file) + (rank-1));
			return moves;
		}
		
		if(this.code == "K") {
			var m = Array();
			m.push(file + (rank-1));
			m.push(file + (rank+1));
			m.push(nf(file) + (rank));
			m.push(pf(file) + (rank));
			m.push(nf(file) + (rank-1));
			m.push(nf(file) + (rank+1));
			m.push(pf(file) + (rank+1));
			m.push(pf(file) + (rank-1));
		}
	};

	function Chess() {
		this.pieces = Array(64);
		this.movesMade = Array();
		this.reset();
		console.log(this.pieces);
	}
	
	Chess.prototype.pieceAt = function(position) {
		position.toLowerCase();
		return this.pieces[position];
	};
	
	Chess.prototype.addPiece = function(piece) {
		this.pieces[piece.position] = piece;
		piece.chess = this;
	};

	Chess.prototype.removePieceFrom = function(position) {
		var piece = this.pieces[position];
		this.pieces[position] = null;
		return piece;
	};

	Chess.prototype.reset = function() {
		var cols = "abcdefgh";
		for(var i = 0; i < cols.length; i++) {
			for(var j = 1; j <= 8; j++)
				this.pieces[cols.charAt(i) + j] = null;
		}
	};
	
	Chess.prototype.resetToDefault = function() {
		this.reset();
	};
	
	Chess.prototype.move = function(from, to) {
		if(from != to) {
			var pieceTo = this.pieces[to];
			var moveMade = this.pieces[from].move(to);
			if(moveMade) {
				this.movesMade.push(moveMade);
				console.log(this.movesMade);
				return moveMade;
			}
		}
		return null;
	};

	Chess.prototype.isValidMove = function(from, to) {
		var moves = Array();
		var files = "abcdefgh";
		var file = this.position.charAt(0);
		var rank = parseInt(this.position.charAt(1));
		var nextFile = files.charAt(files.indexOf(file)+1);
		var prevFile = files.charAt(files.indexOf(file)-1);
		if(this.code == "p" && this.color == "white") {
			if(!this.chess.pieceAt(file + (rank + 1))) moves.push(file + (rank + 1));
			if(rank == 2 && !this.chess.pieceAt(file + (rank + 2))) moves.push(file + (rank + 2));
		}
		return moves;
	};
	
	
	
	
	
	
	
	var chess;
	var selectedPiece = null;
	var drag = {
		enabled: false,
		from: null,
		fromSqr: null,
		to: null,
		dx: 0,
		dy: 0,
		lastRank: 0,
		lastFile: 0
	};
	var initPieces = function() {
		chess = new Chess();
		chess.addPiece(new Piece("black", "p", "a7"));
		chess.addPiece(new Piece("black", "p", "b7"));
		chess.addPiece(new Piece("black", "p", "c7"));
		chess.addPiece(new Piece("black", "p", "d7"));
		chess.addPiece(new Piece("black", "p", "e7"));
		chess.addPiece(new Piece("black", "p", "f7"));
		chess.addPiece(new Piece("black", "p", "g7"));
		chess.addPiece(new Piece("black", "p", "h7"));

		chess.addPiece(new Piece("black", "R", "a8"));
		chess.addPiece(new Piece("black", "N", "b8"));
		chess.addPiece(new Piece("black", "B", "c8"));
		chess.addPiece(new Piece("black", "Q", "d8"));
		chess.addPiece(new Piece("black", "K", "e8"));
		chess.addPiece(new Piece("black", "B", "f8"));
		chess.addPiece(new Piece("black", "N", "g8"));
		chess.addPiece(new Piece("black", "R", "h8"));
		
		chess.addPiece(new Piece("white", "p", "a2"));
		chess.addPiece(new Piece("white", "p", "b2"));
		chess.addPiece(new Piece("white", "p", "c2"));
		chess.addPiece(new Piece("white", "p", "d2"));
		chess.addPiece(new Piece("white", "p", "e2"));
		chess.addPiece(new Piece("white", "p", "f2"));
		chess.addPiece(new Piece("white", "p", "g2"));
		chess.addPiece(new Piece("white", "p", "h2"));

		chess.addPiece(new Piece("white", "R", "a1"));
		chess.addPiece(new Piece("white", "N", "b1"));
		chess.addPiece(new Piece("white", "B", "c1"));
		chess.addPiece(new Piece("white", "Q", "d1"));
		chess.addPiece(new Piece("white", "K", "e1"));
		chess.addPiece(new Piece("white", "B", "f1"));
		chess.addPiece(new Piece("white", "N", "g1"));
		chess.addPiece(new Piece("white", "R", "h1"));
	}
	
	var putPieces = function() {
		for(var piece in chess.pieces) {
			var pc = square(piece).removeClass("dragging selected").find("div");
			pc.css({
				"top": 0,
				"left": 0,
			});
			if(chess.pieceAt(piece))
				pc.attr("class", "piece " + chess.pieces[piece].code + " "  + chess.pieces[piece].color);
			else
				pc.attr("class", "");
		}
	}

	var putSquares = function() {
		var counter = 0;
		self.width(options.size);
		self.height(options.size);
		var files = "abcdefgh";
		for(var i = 8; i > 0; i--) {
			for(var j = (i-1)*8; j < i*8; j++) {
				var pId = j + 1;
				var sqId = files.charAt(counter%8) + (parseInt(counter/8) + 1);
				var pClass = "square " + ((pId%2 == i%2)? "light": "dark");
				var pieceWidth = options.size/8;				
				var squareDiv = "<div class=\"" + pClass + "\" id=\""+ sqId + "\"><div></div></div>";
				$(".chess-board").append(squareDiv);

				var top = (options.flip)? (8-i) :(i-1);
				var left = (options.flip)? (7-j%8) :(j%8);
				square(sqId).css({
					"top": top*pieceWidth + "px",
					"left": left*pieceWidth + "px",
					"width": pieceWidth + "px",
					"height": pieceWidth + "px"
				});
				counter++;
			}
		}
	}

	var movePieceTo = function(pieceAt, pieceTo) {
		chess.move(pieceAt, pieceTo);
		putPieces();
	};
	
	var getPositionFrom = function(of, from) {
		var pOf = square(of).position();
		var pFrom = square(from).position();
		return {
			top: (pFrom.top-pOf.top) + "px",
			left: (pFrom.left-pOf.left) + "px",
		};
	}
	
	var bindEvents = function() {
		$(".chess-board")
		.bind("mousedown", function(e) {
			if(chess.pieceAt(drag.from)) {
				drag.to = drag.from;
				drag.enabled = true;
				drag.fromSqr = square(drag.from);
				drag.fromSqr.addClass("dragging");
				var pos = drag.fromSqr.position();
				drag.dx = e.clientX - pos.left;
				drag.dy = e.clientY - pos.top;
			}
		})
		.bind("mouseup", function(e) {
			if(drag.enabled) {
				drag.enabled = false;
				drag.fromSqr.removeClass("dragging");
				requestMove(drag.from, drag.to);
			}
		})
		.bind("mousemove", function(e) {
			if(drag.enabled && chess.pieceAt(drag.from)) {
				var sqr = drag.fromSqr;
				var pos = drag.fromSqr.position();
				var w = drag.fromSqr.width();

				sqr.find("div").css({
					"top": (e.clientY - sqr.position().top - drag.dy) + "px", 
					"left": (e.clientX - sqr.position().left - drag.dx) + "px" 
				});
				var drank = Math.round((pos.top + drag.dy - e.clientY)/w);
				var dfile = Math.round((e.clientX - pos.left - drag.dx)/w);
				if(drank != drag.lastRank || dfile != drag.lastFile) {
					var files = "abcdefgh";
					var file = drag.from.charAt(0);
					var rank = parseInt(drag.from.charAt(1));
					var newPos = files.charAt(files.indexOf(file)+dfile) + (rank + drank);
					square(drag.to).removeClass("selected");
					drag.to = newPos;
					square(drag.to).addClass("selected");
					drag.lastRank = drank;
					drag.lastFile = dfile;
				}
			}
		});
		
		$(".square").bind("mouseenter", function(e) {
			if(!drag.enabled) {
				drag.from = $(this).attr("id");
			}
		});
	};
	
	var requestMove = function(from, to) {
		if(!options.validateMoves) {
			movePieceTo(from, to);
		}
		else {
			var pMoves = chess.pieceAt(from).getPossibleMoves();
			console.log(to);
			console.log(pMoves.indexOf(to));
			if(pMoves.indexOf(to) >= 0) {
				movePieceTo(from, to);
			}
			else {
				putPieces();
			}
		}
	};
	
	var squareClicked = function(sId) {
		console.log(sId);
		console.log(chess.pieceAt(sId));

	};

	var square = function(sId) {
		return $(".square#"+sId);
	};
	
	var undoMove = function() {
		if(chess.movesMade.length > 0) {
			var lastMove = chess.movesMade.pop();
			movePieceTo(lastMove[2], lastMove[0]);
			if(lastMove[1]) chess.addPiece(lastMove[1]);
			chess.movesMade.pop();
			putPieces();
			console.log(lastMove);
			console.log(chess.movesMade);
		}
	};

	$.fn.extend({
		initBoard: function(_options) {
			console.log("Initializing Chess...");
			self = this;
			var alphas = "abcdefgh";
	
			if(typeof _options != "undefined") options = $.extend({}, defaults, _options);
			else							   options = defaults;
			console.log(options);
			putSquares();
			initPieces();
			putPieces();
			bindEvents();
			squares = $(".squares");
			return this;
		},
		add: function(pieces) {
			for(var i = 0; i < pieces.length; i++) {
				chess.addPiece(new Piece(pieces[i][0], pieces[i][1], pieces[i][2]));
			}
			this.refresh();
		},
		refresh: function() {
			putPieces();
			return this;
		},
		undo: function() {
			undoMove();
		}
	});
})(jQuery);