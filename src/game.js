var Game = function() {
	this.c = new Coquette(this, "canvas", 800, 600, "#000");

	this.groundY = 300;
	this.height = 600;
	this.width = 800;
	this.goal_width = 100;
	this.goal_flash = 0;

	this.level = new Level(this);
	this.level.startLevel();
};

Game.prototype = {
	update: function() {
		this.goal_flash += 0.01;

	},
	draw: function(ctx) {
		ctx.fillStyle = "#CCF";
		ctx.fillRect(0, 0, this.width, this.groundY);
		ctx.fillStyle = "#CFC";
		ctx.fillRect(0, this.groundY, this.width, this.height);
		ctx.fillStyle = this.getGoalFlashColor();
		ctx.fillRect(
			this.width - this.goal_width,
			0,
			this.goal_width,
			this.height
		);
	},
	getGoalFlashColor: function() {
		var i = parseInt((Math.sin(this.goal_flash) * 128) + 128);
		return ("rgba(" + Math.min(i,100) + "," + Math.max(i,200) + "," + Math.min(i,100) + ", .5)");
	}
};

function getTop() {
	return this.center.y - (this.size.y / 2);
}

function getBottom() {
	return this.center.y + (this.size.y / 2);
}
