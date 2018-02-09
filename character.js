class Character {
	constructor(name, level = 1) {
		this.nameKo = ko.observable(name);
		this.levelKo = ko.observable(level);
		this.maxHealthKo = ko.computed(function() {
			return Math.floor(100 * Math.pow(1.2,this.level-1));			
		}, this);
		this.healthKo = ko.observable(this.maxHealth);
		this.levelUpCostKo = ko.computed(function() {
			return Math.floor(125 * Math.pow(1.2,this.level-1));			
		}, this);
		this.equiped = new Item("Broken Stick", 0, 1, 6, 10, true);
	}

	get name() { return this.nameKo(); }
	set name(name) { this.nameKo(name); }

	get level() { return this.levelKo(); }
	set level(level) { this.levelKo(level); }

	get maxHealth() { return this.maxHealthKo(); }
	set maxHealth(maxHealth) { this.maxHealthKo(maxHealth); }

	get health() { return this.healthKo(); }
	set health(health) { this.healthKo(health); }

	get levelUpCost() { return this.levelUpCostKo();}

	levelUp() {
		if (inventory.money >= this.levelUpCostKo()) {
			inventory.money -= this.levelUpCostKo();
			this.level ++;
		} else {
			console.log("Not enough money to level up")
		}
	}

	equip(id) {
		let item = inventory.find(id);
		if (item) {
			if (item.object.level > this.level) {
				console.log(this.name + " does not meet the level requirement for this weapon");
			} else {
				$("#inventory").append("<div class='item "+character.equiped.rarityName+"' data-id="+character.equiped.id+"><div class='itemName'><p>"+character.equiped.name+"</p></div></div>");
				$("[data-id="+id+"]").remove();
				inventory.items.push(character.equiped);
				this.equiped = item.object;
				inventory.items.splice(item.index,1);
			}
		}
	}

	defeat() {
		this.health = this.maxHealth;
		this.equiped = new Item("Broken Stick", 0, 1, Math.floor(6 * Math.pow(1.2, character.level-1)), 10, true);
		inventory.money = 0;
		inventory.items = [];
	}
}