var ScrollerGateway = function(game, options) {
	/*
		I would have made this extend gateway but it is so different that
		the overhead really isn't worth it. So we'll just copy a bit of code.
	*/
	this.game = game,
	this.pass = options.pass,
	this.size = {
		//doesn't change
		x: 30,
		y: game.height
	},
	this.isTripped = false,
	this.center = {
		//doesn't change
		x: options.startX,
		y: this.size.y / 2
	},
	this.scroll = options.startY || 0 //changes
	this.passSize = this.pass.max - this.pass.min;
}


ScrollerGateway.prototype = {
	update: function() {
		this.scroll += 1;
		if (this.game.groundY + this.scroll > this.game.height) {
			this.scroll = -this.game.groundY;
		}
	},
	getColor: function() {
		//see also: Gateway.prototype.getColor
		if (this.isTripped) {
			var r = Math.random;
			return "#" +
				(r() > 0.5 ? "F" : "5") +
				(r() > 0.5 ? "5" : "0") +
				(r() > 0.5 ? "5" : "0");
		} else {
			return "#222";
		}
	},
	draw: function (ctx) {
		ctx.fillStyle = this.getColor();
		var blockSize = this.game.height - this.passSize;
		//top (min)
		ctx.fillRect(
			this.center.x - this.size.x / 2,
			this.game.groundY - this.pass.max - blockSize + this.scroll,
			this.size.x,
			blockSize
		);
		//bottom (max)
		ctx.fillRect(
			this.center.x - this.size.x / 2,
			this.game.groundY + this.scroll,
			this.size.x,
			blockSize
		)
	},
	collision: function(other) {

	}
};
