var itemId = 1;
class Item {
	constructor(name, rarity, level, damage, value, favourite = false) {
		this.id = itemId;
		itemId++;
		this.name = name;
		this.rarity = rarity;
		this.level = level;
		this.damage = damage;
		this.value = value;
		this.favourite = favourite;
	}

	get rarityName() {
		return RarityNames[this.rarity];
	}

	toggleFavourite(id) {
		this.favourite = !this.favourite
	}
}