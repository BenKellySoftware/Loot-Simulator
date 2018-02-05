class Inventory {
	constructor(money = 0) {
		this.money = 0;
		this.items = [];
	}

	find(id) {
		let index = this.items.findIndex(function(item) {
			return item.id == id;
		});
		if (index == -1) {
			console.log("Item not found");
			return null;
		}

		return {
			index: index,
			object: this.items[index]
		};
	}

	lootDrop (level, rarityChance) {
		var random = Math.floor(Math.random() * 1000);
		var rarity = 0
		while (random >= rarityChance[rarity]) {
			rarity++;
		}
		var rarityName = RarityNames[rarity];
		var kind = Weapons.name[level - 1 + Math.floor(Math.random() * 6)];

		var item = new Item(
			Weapons[rarityName].sample() + kind,
			rarity,
			level,
			Math.floor((6.5 + (Math.random()/2) + rarity) * Math.pow(1.2, level-1)),
			Math.floor((10 + Math.random()/2) * (1 + rarity/2) * Math.pow(1.2, level-1)),
		);
		this.items.push(item);
		$("#inventory").append("<div class='item "+rarityName+"' data-id="+item.id+"><div class='itemName'><p>"+item.name+"</p></div></div>");
	}

	sell(id) {
		let item = this.find(id);
		if (item) {
			this.money += item.object.value;
			this.items.splice(item.index,1);

			// TODO: Knockout Bindings
			$("[data-id="+id+"]").remove();		
			$('#money').text("Money: $"+ this.money);
		}
	}

	sellAll() {
		// Need to work backwards to prevent edit while iterating problems
		for (var i = this.items.length - 1; i >= 0; i--) {
			this.sell(this.items[i].id);
		}
	}
}