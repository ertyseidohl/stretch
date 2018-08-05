
var Level = function(game) {
	this.game = game;
	this.levelNum = 0;
	this.isDirty = false;
};

Level.prototype = {
	restart: function() {
		this.clearLevel();
		this.startLevel();
	},
	playerWon: function() {
		return this.allLevels.length == this.levelNum;
	},
	startLevel: function() {
		this.isDirty = false;
		if (!this.playerWon()) {
			this.allLevels[this.levelNum].call(this);
			this.createRestartLabel();
		} else {
			this.game.c.entities.create(TextLabel, {
				text: "You Win!",
				textOffset: -40
			});
		}
	},
	clearLevel: function() {
		this.game.c.entities.destroyAll();
	},
	levelUp: function() {
		this.levelNum ++;
		this.clearLevel();
		this.startLevel();
	},
	createRestartLabel: function() {
		this.game.c.entities.create(TextLabel, {
			text: "Press r to restart",
			textOffset: -85,
			condition: function() {
				return this.game.c.entities.all(Gateway).filter(function(g) {
					return g.isTripped;
				}).length;
			}
		});
	}
};

Level.prototype.allLevels = [
	//level 0, learn to move
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 10
		});
		this.game.c.entities.create(TextLabel, {
			text: "Press x to move",
			textOffset: -80
		});
	},
	//level 1, learn grower
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 10
		});
		this.game.c.entities.create(Adjuster, {
			isGrower: true,
			startX : 250,
			startSize: 100,
			width: 150,
			maxY: 200,
			minY: 100
		});
		this.game.c.entities.create(Gateway, {
			startX: 400,
			pass: {
				min: 0,
				max: 80
			}
		});
	},
	//level 2, learn shrinker
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 180
		});
		this.game.c.entities.create(Adjuster, {
			isShrinker: true,
			startX : 300,
			startSize: 100,
			maxY: 200,
			minY: 100
		});
		this.game.c.entities.create(Gateway, {
			startX: 400,
			pass: {
				min: 0,
				max: 120
			}
		});
	},
	//level 3, grower/shrinker
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 180
		});
		this.game.c.entities.create(Adjuster, {
			isShrinker: true,
			startX : 300,
			startSize: 100,
			maxY: 200,
			minY: 100
		});
		this.game.c.entities.create(Adjuster, {
			isGrower: true,
			startX : 500,
			startSize: 100,
			maxY: 200,
			minY: 100
		});
		this.game.c.entities.create(Gateway, {
			startX: 400,
			pass: {
				min: 0,
				max: 120
			}
		});
		this.game.c.entities.create(Gateway, {
			startX: 685,
			pass: {
				min: 0,
				max: 120
			}
		});
	},
	//level 4, grower&shrinker
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 50
		});
		this.game.c.entities.create(Adjuster, {
			isGrower: true,
			isShrinker: true,
			startX : 300,
			startSize: 100,
			maxY: 200,
			minY: 10
		});
		this.game.c.entities.create(Gateway, {
			startX: 400,
			pass: {
				min: 0,
				max: 30
			}
		});
	},
	//level 5: hurdles
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 80
		});
		//first hurdle
		this.game.c.entities.create(Adjuster, {
			isShrinker: true,
			startX : 200,
			startSize: 100,
			maxY: 100,
			minY: 50
		});
		this.game.c.entities.create(Gateway, {
			startX: 300,
			pass: {
				min: 0,
				max: 55
			}
		});
		//second hurdle
		this.game.c.entities.create(Adjuster, {
			isGrower: true,
			startX : 400,
			startSize: 150,
			maxY: 150,
			minY: 100
		});
		//third hurdle
		this.game.c.entities.create(Adjuster, {
			isShrinker: true,
			startX : 590,
			startSize: 45,
			maxY: 55,
			minY: 10
		});
		this.game.c.entities.create(Gateway, {
			startX: 685,
			pass: {
				min: 0,
				max: 10
			}
		});
	},
	//level 6 : scroller
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 60
		});
		//scroller hurdle
		this.game.c.entities.create(ScrollerGateway, {
			startX: 400,
			dashInfo: {
				height: 40,
				spacing: 100
			}
		});
	},
	//level 7 : scroller dash
	function() {
		this.game.c.entities.create(Player, {
			startX: 100,
			height: 60
		});

      this.game.c.entities.create(ScrollerGateway, {
			startX: 200,
			dashInfo: {
				height: 40,
				spacing: 100
			}
		});

      this.game.c.entities.create(ScrollerGateway, {
			startX: 250,
			dashInfo: {
				height: 40,
				spacing: 110
			}
		});

      this.game.c.entities.create(ScrollerGateway, {
			startX: 300,
			dashInfo: {
				height: 40,
				spacing: 120
			}
		});

      this.game.c.entities.create(ScrollerGateway, {
			startX: 350,
			dashInfo: {
				height: 40,
				spacing: 130
			}
		});

      this.game.c.entities.create(ScrollerGateway, {
			startX: 400,
			dashInfo: {
				height: 40,
				spacing: 140
			}
		});

	}
];
