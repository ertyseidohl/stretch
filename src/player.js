var Player = function(game, options) {
	this.size = {
		x: options.height,
		y: options.height
	};
	this.center = {
		x : options.startX,
		y : game.groundY - (options.height / 2)
	};
	this.game = game;
	this.height = options.height;
	this.isAlive = true;
	this.velocity = 0;
};

Player.prototype = {
	update: function() {
		if (this.game.c.inputter.isDown(this.game.c.inputter.R) &&
			this.game.level.isDirty) {
			this.game.level.restart();
		}
		if (this.isAlive) {
			if (this.game.c.inputter.isDown(this.game.c.inputter.X)) {
				this.game.level.isDirty = true;
				this.velocity += 0.5;
				this.velocity = Math.min(this.velocity, 5);
			} else {
				this.velocity -= 0.5;
				this.velocity = Math.max(this.velocity, 0);
			}
		} else {
			this.velocity = 0;
		}
		this.center.x += this.velocity;
		if (this.isAlive && this.center.x > this.game.width - this.game.goal_width) {
			this.game.level.levelUp();
		}
		this.size = {
			x: this.height,
			y: this.height
		};
	},
	draw: function(ctx) {
		//box
		ctx.fillStyle = "#ff6600";
		ctx.fillRect(this.center.x - this.size.x / 2,
			this.center.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		//outline
		ctx.strokeStyle = "black";
		var lineWidth = 4;
		ctx.lineWidth = lineWidth;
		ctx.strokeRect(this.center.x - this.size.x / 2 + lineWidth / 2,
			this.center.y - this.size.y / 2 + lineWidth / 2,
			this.size.x - (lineWidth),
			this.size.y - (lineWidth));
	},
	adjustHeight: function(delta) {
		if (!this.isAlive) {
			return;
		}
		this.height += delta;
		this.y -= delta / 2;
		if (this.height < 1) {
			this.height = 1;
		}
	},
	getTop: getTop,
	getBottom: getBottom
};
