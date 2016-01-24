var TextLabel = function(game, options) {
	this.game = game;
	this.font = options.font || "30px Arial";
	this.color = options.color || "white";
	this.center = options.center || {x: game.width / 2, y : 380};
	this.size = options.size || {x: game.width, y: 60};
	this.text = options.text;
	this.condition = options.condition || function() { return true; };
	this.visible = false;
	this.textOffset = options.textOffset || 0;
	this.zindex = 10;
};

TextLabel.prototype = {
	update: function() {
		this.visible = this.condition();
	},
	draw: function(ctx) {
		if (this.visible) {
			ctx.fillStyle = "rgba(0,0,0,.5)";
			ctx.fillRect(
				this.center.x - this.size.x / 2,
				this.center.y - this.size.y / 2,
				this.size.x,
				this.size.y);
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.fillText(this.text, this.center.x + this.textOffset, this.center.y + 10);
		}
	}
};
