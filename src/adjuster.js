var Adjuster = function(game, options) {
	this.game = game;
	this.direction = 1;
	this.isGrower = options.isGrower || false;
	this.isShrinker = options.isShrinker || false;
	this.center = {
		x : options.startX,
		y : game.groundY - (options.startSize / 2)
	};
	this.size = {
		x : options.width || 100,
		y : options.startSize
	};
	this.maxY = options.maxY;
	this.minY = options.minY;
	this.activeCount = 0;
	this.zindex = 1;
};

Adjuster.prototype = {
	update: function() {
		this.size.y += this.direction;
		this.center.y -= this.direction / 2;
		if (this.size.y > this.maxY || this.size.y < this.minY) {
			this.direction *= -1;
		}
		if (this.activeCount > 0) {
			this.activeCount --;
		}
	},
	draw: function(ctx) {
		if (this.isGrower) {
			if (this.isShrinker) {
				//both, blue
				if (this.activeCount) {
					ctx.fillStyle = "#66F";
				} else {
					ctx.fillStyle = "#22C";
				}
			} else {
				//just grower, green
				if (this.activeCount) {
					ctx.fillStyle = "#6F6";
				} else {
					ctx.fillStyle = "#2C2";
				}
			}
		} else {
			//just shrinker, red
			if (this.activeCount) {
				ctx.fillStyle = "#F66";
			} else {
				ctx.fillStyle = "#C22";
			}
		}
		ctx.fillRect(this.center.x - this.size.x / 2,
			this.center.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
	},
	collision: function(other) {
		if (other instanceof Player) {
			//grow
			if (this.isGrower &&
				this.direction > 0 &&
				other.height <= this.size.y
			) {
				this.activeCount = 2;
				other.adjustHeight(this.direction);
			}
			//shrink
			if (this.isShrinker &&
				this.direction < 0 &&
				other.height >= this.size.y - 1 &&
				other.height <= this.size.y + 1
			) {
				this.activeCount = 2;
				other.adjustHeight(this.direction);
			}
			//update bottoms to be the same
			other.center.y = this.center.y +
				(this.size.y / 2) -
				(other.size.y / 2);
		}
	},
	getTop: getTop,
	getBottom: getBottom
};
