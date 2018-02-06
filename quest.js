class QuestsVM {
	constructor() {
		this.quests = ko.observableArray([]);
		this.quests.push(new Quest(1,1,1));
		this.quests.push(new Quest(3,2,2));
		this.quests.push(new Quest(5,3,3));
		this.quests.push(new Quest(16,4,4));
	}

	toList() {
		return this.quests();
	}
}

class Quest {
	constructor(id, difficulty, slot) {
		this.idKo = ko.observable(id);
		this.difficultyKo = ko.observable(difficulty);
		this.slot = slot;
		this.display = ko.computed(function() {
			if (this.difficulty - character.level < -1) {
				var challenge = "Easy";
			} else if (this.difficulty - character.level > 1) {
				var challenge = "Hard";
			} else {
				var challenge = "Normal"
			}
			return QuestData[this.id].name + ": Level " + this.difficulty + "(" + challenge + ")";
    	}, this);
	}

	get id() {
		return this.idKo();
	}

	set id(id) {
		this.idKo(id);
	}

	get difficulty() {
		return this.difficultyKo();
	}

	set difficulty(difficulty) {
		this.difficultyKo(difficulty);
	}

	start() {
		$("#questScreen").show();
		$("#questSelect").hide();
		character.health = character.maxHealth;
		let loop = this.combat();
		this.loop(this, loop);
	}

	loop(self, loop) {
		var done = loop.next().done;
		if (!done) {
			setTimeout(self.loop, 500, self, loop);
		} else {
			self.end();
		}
	}

	// Each call is one attack cycle
	* combat() {
		for (var enemyId of QuestData[this.id].enemies) {
			var enemy = $.extend( true, {}, Enemies[enemyId]);
			enemy.health = Math.floor(enemy.health * Math.pow(1.2,this.difficulty-1));
			enemy.difficulty = Math.floor(enemy.damage * Math.pow(1.2,this.difficulty-1));

			$("#enemyIcon").text(enemy.symbol);
			$("#enemyIcon").css({right: "0"});
			$("#enemyIcon").animate({right: "375px"}, {queue: false, duration: 500});
			$("#background").animate({"background-position": "-=375px"}, {duration: 500});
			
			while (enemy.health > 0) {
				character.health -= enemy.damage;
				enemy.health -= character.equiped.damage;
				stats(enemy);
				yield;
				if (character.health < 0) {
					character.defeat();
					break;
				}
			}

			switch (enemy.type) {
				case 0:
					//Health Drop
					if (Math.random() > 0.7) {
						character.health += Math.round(character.maxHealth/4);
						if (character.health > character.maxHealth) {character.health = character.maxHealth};
					}
					if (Math.random() > 0.8){
						inventory.lootDrop(this.difficulty, [300, 900, 990, 1000]);
					}
				break;
				case 1:
					character.health = character.maxHealth;
					inventory.lootDrop(this.difficulty, [100, 750, 950, 995]);
				break;
				case 2:
					character.health = character.maxHealth;
					inventory.lootDrop(this.difficulty, [0, 300, 850, 970]); inventory.lootDrop(this.difficulty, [100, 750, 950, 995]);
				break;
			}
		}
	}

	end() {
		$("#questScreen").hide();
		$("#questSelect").show();
		this.new();
	}

	new() {
		// Normal Levels for 1-3, boss for slot 4
		if (this.slot < 4) {
			this.id = 1 + Math.floor(Math.random()*15);
			this.difficulty = Math.max(character.level - Math.floor(Math.random()*4) + this.slot, 1);
		}
		else {
			if (this.id < 16 || this.id >= 25) {
				this.id = 16
			} else {
				this.id++;
			}
			this.difficulty = character.level + 3;
		}
	}
}