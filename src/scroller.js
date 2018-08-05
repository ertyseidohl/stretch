var ScrollerDash = function(game, options) {
	this.game = game;
	this.parent = options.parent;
	this.index = options.index;
	this.size = this.parent.getDashSize(options.index);
	this.center = this.parent.getDashCenter(options.index);
	this.zindex = 4;
	
	//the player can tip this by this many pixels and still be ok
	this.playerFunBuffer = 5;
};

ScrollerDash.prototype = {
	update: function() {
		if (!this.parent.isTripped) {
			this.center.y += this.parent.scrollSpeed;
			if (this.center.y - (this.size.y / 2) > this.game.height) {
				this.center.y = this.parent.getNewDashCenterY(this.index);
			}
		}
	},
	draw: function(ctx) {
		ctx.fillStyle = this.parent.getColor(this.index);
		ctx.fillRect(
			this.center.x - (this.size.x / 2),
			this.center.y - (this.size.y / 2),
			this.size.x,
			this.size.y
		);
	},
	collision: function(other) {
		if (other instanceof Player) {
			pTop = other.center.y - (other.size.y / 2);
			pBot = other.center.y + (other.size.y / 2);
			tTop = this.center.y - (this.size.y / 2);
			tBot = this.center.y + (this.size.y / 2);
			if (tBot - pTop < this.playerFunBuffer) {
				return;
			}
			if (pBot - tTop < this.playerFunBuffer) {
				return;
			}
			this.parent.isTripped = true;
			other.isAlive = false;
		}
	}
};

var ScrollerGateway = function(game, options) {
	/*
		I would have made this extend gateway but it is so different that
		the overhead really isn't worth it. So we'll just copy a bit of code.
	*/
	this.game = game,
	this.dashInfo = options.dashInfo,
	this.dashes = [];
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
	this.scrollSpeed = options.scrollSpeed || 1;

	this.initDashes();
}


ScrollerGateway.prototype = {
	update: function() {

	},
	getColor: function(index) {
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
	getDashSize: function(dashIndex) {
		return {
			x: this.size.x,
			y: this.dashInfo.height
		};
	},
	getDashCenter: function(dashIndex) {
		return {
			x: this.center.x,
			y: (this.dashInfo.height) + ((this.dashInfo.height + this.dashInfo.spacing) * dashIndex)
		}
	},
	initDashes: function() {
		var getLastDashBottom = function(dashes) {
			var d = dashes[dashes.length - 1];
			if (!d) {
				return 0;
			}
			return d.center.y + (d.size.y / 2);
		}
		for (var i = 0; getLastDashBottom(this.dashes) < this.game.height; i++) {
			this.dashes.push(this.game.c.entities.create(ScrollerDash, {
				parent: this,
				index: i
			}));
		}
		//and then add one more so that we have one offscreen
		this.dashes.push(this.game.c.entities.create(ScrollerDash, {
			parent: this,
			index: i
		}));
	},
	getNewDashCenterY: function(dashIndex) {
		var dash = this.dashes[dashIndex];
		var nextDash = this.dashes[(dashIndex + 1) % this.dashes.length];
		if (dash === nextDash) {
			throw new Error("Only One Dash - needs at least two to work. Sorry.");
		}
		return nextDash.center.y - (nextDash.size.y) - this.dashInfo.spacing;
	}
	//This doesn't draw() or collide(), the DashBlocks do.
};
