class Character {
	constructor(name, level = 1) {
		this.name = name
		this.level = level;
		this.maxHealth = Math.floor(100 * Math.pow(1.2,level-1));
		this.health = this.maxHealth;
		this.equiped = new Item("Broken Stick", 0, 1, 6, 10, true);
	}

	levelUp() {
		if (inventory.money >= Math.floor(125 * Math.pow(1.2,this.level-1))) {
			inventory.money -= Math.floor(125 * Math.pow(1.2,this.level-1));
			this.level ++;
			this.maxHealth = Math.floor(100 * Math.pow(1.2,this.level-1));
			this.health = this.maxHealth;

			// TODO: Knockout Bindings
			$('#money').text("Money: $" + inventory.money);
			$('#levelUpCost').text("Cost: $" + Math.floor(125 * Math.pow(1.2,this.level-1)));
			$('#pLevel').text("Level: " + this.level);
			$("#pHealth").text("Health: " + this.health);
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
}