var Gateway = function(game, options) {
	this.game = game;
	this.pass = options.pass;
	this.size = {
		x: 30,
		y: this.pass.max
	};
	this.isTripped = false;
	this.center = {
		x: options.startX - (this.size.x / 2),
		y: game.groundY - (this.size.y / 2)
	};
};

Gateway.prototype = {
	update: function() {
		// nothing
	},
	getColor: function() {
		//see also: ScrollerGateway.prototype.getColor
		if (this.isTripped) {
			var r = Math.random;
			return "#" +
				(r() > 0.5 ? "F" : "5") +
				(r() > 0.5 ? "5" : "0") +
				(r() > 0.5 ? "5" : "0");
		} else {
			return "black";
		}
	},
	draw: function(ctx)  {
		ctx.fillStyle = this.getColor();
		//top
		ctx.fillRect(
			this.center.x - this.size.x / 2,
			0,
			this.size.x,
			this.game.height - this.pass.max - this.game.groundY
		);
		//bottom
		ctx.fillRect(
			this.center.x - this.size.x / 2,
			this.game.groundY - this.pass.min,
			this.size.x,
			this.game.groundY
		);
	},
	collision: function(other) {
		if (other instanceof Player) {
			if (other.height < this.pass.min ||
				other.height > this.pass.max
			) {
				this.isTripped = true;
				other.isAlive = false;
			}
		}
	}
};
