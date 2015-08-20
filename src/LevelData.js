var Enemies = [
	{Name: "Training Dummy",Symbol: "D", Health: 0,  Damage: 0, Type: 0},
	
	//1 2 3 Animals
	{Name: "Rat",			Symbol: "R", Health: 10, Damage: 3, Type: 0},
	{Name: "Spider",		Symbol: "S", Health: 7,  Damage: 4, Type: 0},
	{Name: "Rabid Wolf",	Symbol: "W", Health: 20, Damage: 5, Type: 1},
	
	//4 5 6 Bandits
	{Name: "Madman",		Symbol: "M", Health: 6,  Damage: 6, Type: 0},
	{Name: "Bandit",		Symbol: "B", Health: 10, Damage: 4, Type: 0},
	{Name: "Bandit Leader",	Symbol: "L", Health: 40, Damage: 5, Type: 2},
	
	//7 8 9 Pirates
	{Name: "Pirate",		Symbol: "P", Health: 10, Damage: 4, Type: 0},
	{Name: "Parrot",		Symbol: "P", Health: 20, Damage: 5, Type: 1},
	{Name: "Captain",		Symbol: "C", Health: 35, Damage: 6, Type: 2},

	// 10 11 12 Lizzard Cult
	{Name: "Cultist",		Symbol: "C", Health: 8,  Damage: 5, Type: 0},
	{Name: "Lizard",		Symbol: "L", Health: 15, Damage: 3, Type: 0},
	{Name: "Lizard King",	Symbol: "K", Health: 45, Damage: 4, Type: 2},
	
	// 13 14 15 Barbarian
	{Name: "Barbarian",		Symbol: "B", Health: 13, Damage: 4, Type: 0},
	{Name: "Spearman",		Symbol: "S", Health: 7,  Damage: 5, Type: 0},
	{Name: "War Chief",		Symbol: "W", Health: 25, Damage: 8, Type: 2},

	// 16 17 18 Army
	{Name: "Cavalry",		Symbol: "C", Health: 9,  Damage: 5, Type: 0},
	{Name: "Knight",		Symbol: "K", Health: 13, Damage: 4, Type: 0},
	{Name: "General",		Symbol: "G", Health: 30, Damage: 7, Type: 2},
	
	// 19 20 21 Bar
	{Name: "Drunk",			Symbol: "D", Health: 15, Damage: 3, Type: 0},
	{Name: "Bounty Hunter",	Symbol: "B", Health: 10, Damage: 5, Type: 0},
	{Name: "Fugitive",		Symbol: "F", Health: 20, Damage: 9, Type: 2},

	// 22 23 24 Wizard
	{Name: "Zombie",		Symbol: "Z", Health: 3,  Damage: 6, Type: 0},
	{Name: "Necromancer",	Symbol: "N", Health: 20, Damage: 5, Type: 1},
	{Name: "Master Wizard",	Symbol: "W", Health: 30, Damage: 8, Type: 2},

	// 25 26 27 Vampire
	{Name: "Skeleton",		Symbol: "S", Health: 3,  Damage: 6, Type: 0},
	{Name: "Vampire",		Symbol: "V", Health: 16, Damage: 5, Type: 1},
	{Name: "Dracula",		Symbol: "D", Health: 30, Damage: 8, Type: 2},

	// 28 29 30 Races
	{Name: "Orc",			Symbol: "O", Health: 13, Damage: 4, Type: 0},
	{Name: "Goblin",		Symbol: "G", Health: 10, Damage: 5, Type: 0},
	{Name: "Troll",			Symbol: "T", Health: 16, Damage: 8, Type: 1},

	//31 - 36 Monsters
	{Name: "Gryphion",		Symbol: "G", Health: 10, Damage: 5, Type: 0},
	{Name: "Minotaur",		Symbol: "M", Health: 12, Damage: 4, Type: 0},
	{Name: "Spirit",		Symbol: "S", Health: 16, Damage: 3, Type: 0},
	{Name: "Cursed Fairy",	Symbol: "F", Health: 16, Damage: 3, Type: 0},
	{Name: "Wicked Pegasus",Symbol: "P", Health: 10, Damage: 5, Type: 1},
	{Name: "Dragon",		Symbol: "D", Health: 50, Damage: 3, Type: 2},

	// 37 38 39 Japan
	{Name: "Ninja",			Symbol: "N", Health: 10, Damage: 5, Type: 0},
	{Name: "Samurai",		Symbol: "S", Health: 16, Damage: 3, Type: 0},
	{Name: "Shogun",		Symbol: "S", Health: 35, Damage: 6, Type: 2},
];

var QuestData = [
	//Tutorial 0
	{Name: "Cleaning Attic",			Enemies: [1 ,2 ,1 ,1 ,1 ,2 ,2 ,1 ,1 ,2 ,1 ,2 ,2 ,2 ,1 ,2 ,2 ,1 ,1 ,2 ]},
	//Main Levels 1-15
	{Name: "Forest Walk",				Enemies: [2 ,11,2 ,11,1 ,2 ,2 ,1 ,11,1 ,1 ,2 ,11,1 ,3]},
	{Name: "Expose Cult",				Enemies: [10,4 ,10,22,10,10,10,22,4 ,22,22,10,4 ,10,23]},
	{Name: "Stop Zombie Apocalype",		Enemies: [22,22,4 ,4 ,4 ,22,22,22,22,23,22,22,4 ,22,22]},
	{Name: "Sink Pirate Ship",			Enemies: [7 ,19,7 ,7 ,19,7 ,7 ,19,7 ,8 ,7 ,7 ,19,7 ,8 ]},
	{Name: "Hunt in Troll Caves",		Enemies: [28,29,30,28,29,28,28,28,29,30,28,29,28,30,30]},
	{Name: "Purify Corrupted Beasts",	Enemies: [33,33,34,34,33,33,34,33,34,35,34,33,33,34,33,34,33,35,34,35]},
	{Name: "Uncover Ruins",				Enemies: [2 ,2 ,1 ,1 ,4 ,11,4 ,11,2 ,11,1 ,1 ,11,4 ,1 ,4 ,11,2 ,2 ,4 ]},
	{Name: "Destroy Bandit Camp",		Enemies: [4 ,5 ,5 ,4 ,4 ,4 ,4 ,5 ,5 ,4 ,4 ,5 ,3 ,4 ,3 ,4 ,5 ,5 ,5 ,5 ]},
	{Name: "Raid Barbarian Stronghold",	Enemies: [13,14,13,13,13,13,14,3 ,14,13,13,13,14,13,13,13,14,14,13,13]},
	{Name: "Bar Fight",					Enemies: [19,20,7 ,19,19,20,19,19,7 ,19,19,20,19,20,19,7 ,19,19,20,19]},
	{Name: "Fight in the Skeleton War",	Enemies: [25,25,25,22,25,25,22,22,16,16,25,25,16,25,25,22,16,25,22,25]},
	{Name: "Assault Vampire Coven",		Enemies: [25,25,26,26,26,26,33,25,26,26,25,25,33,33,26,26,25,33,26,26]},
	{Name: "Break Up Human/Orc Fight",	Enemies: [16,29,28,28,17,28,17,30,16,17,17,16,16,29,28,16,29,30,29,29]},
	{Name: "Explore Mythical Lands",	Enemies: [31,32,33,31,32,34,35,33,33,35,35,33,31,32,34,34,35,34,31,32]},
	{Name: "Defeat Ninja Clan",			Enemies: [37,37,38,37,37,38,38,38,38,38,37,38,37,37,38,38,37,38,37,37]},
	//Bosses 16-25
	{Name: "Assassinate Bandit Leader",	Enemies: [4 ,5 ,5 ,4 ,4 ,4 ,4 ,5 ,5 ,6 ]},
	{Name: "Kill Pirate Captain",		Enemies: [7 ,7 ,7 ,8 ,7 ,7 ,7 ,7 ,8 ,9 ]},
	{Name: "Hunt the Lizard King",		Enemies: [10,11,11,10,11,11,11,10,10,12]},
	{Name: "Eliminate Warlord",			Enemies: [13,14,13,13,13,14,14,13,13,15]},
	{Name: "Duel Army General",			Enemies: [16,16,16,17,16,16,17,16,16,18]},
	{Name: "Track Fugitive at Bar",		Enemies: [19,20,19,19,20,20,20,19,19,21]},
	{Name: "Battle Master Wizard",		Enemies: [22,22,22,23,22,22,22,22,23,24]},
	{Name: "Impale Lord of Vampires",	Enemies: [25,25,26,33,25,26,26,33,26,27]},
	{Name: "Slay the Dragon",			Enemies: [17,17,34,17,34,17,17,34,17,36]},
	{Name: "Battle Rogue Shogun",		Enemies: [37,38,38,37,38,37,37,38,38,39]},
	//Other 26
	{Name: "Training",					Enemies: [0]},
];

var Weapons = {
	Poor: 		["Weak ",		"Broken ",		"Twisted ",		"Damaged ",		"Cracked ",		"Blunt ",		"Redundant ",	"Unlucky ",		"Forgotten "],
	Normal: 	["Basic ",		"Stock ",		"Typical ",		"Common ",		"Regular ",		"Ordinary ",	"", "", "", "", "", "", ""],
	Rare:		["Rare ",		"Damaging ",	"Precious ",	"Razor Sharp ",	"Valuable ",	"Shiny ",		"Deadly ",		"Formidable ",	"Barbed ",		"Precise "],
	Special: 	["Flaming ",	"Serated ",		"Enchanted ",	"Vicious ",		"Electrified ",	"Energy ",		"Homicidal ",	"Gory ",		"Runic ",		"Stealty "],
	Modifiers:	["Flaming ",	"Electrified ",	"Poisoned ",	"Corrosive", 	"Piercing"],
	Legendary:	["Unequaled ",	"Legendary ",	"Miraculous ",	"Malicious ",	"Divine ",		"Fabled "],
	Name: [
		"Spoon",		"Stick",	"Plank with Nail", 	"Club", 			"Rock", 			"Bone",			"Bat",		"Gloves",			"Hoe",			"Glass Shard",
		"Dagger",		"Saw",		"Machete",			"Staff", 			"Hammer", 			"Cleaver",		"Knuckles",	"Gauntlets",		"Pickaxe",		"Hatchet",
		"Spear",		"Tessen",	"Short Sword",		"Sickle", 			"Cutlass",			"Darts",		"Mace",		"Sling Shot",		"Broad Sword", 	"Bolas",
		"War Hammer",	"Lance",	"Flail",			"Scimitar", 		"Crossbow",			"Sabre",		"Kunai",	"Throwing Knives",	"Great Sword",	"Boomerang", 
		"Battle Axe",	"Glaive",	"Épée",				"Whip",				"Nunchucks",		"Scythe",		"Khopesh",	"Chained Knife",	"Bō",			"Sling", 
		"Shuriken",		"Katana",	"Halberd", 			"Twin Hook Swords",	"Bow"
	]
};

var Armour = {
	Poor: ["Weak ", "Broken ", "Damaged ", "Cracked ", "Unlucky ", "Forgotten"],
	Normal: ["Basic ", "Stock ", "Typical ", "Common ", "Regular ", "Ordinary ", "", "", "", "", "", "", ""],
	Rare: ["Rare ", "Protective ", "Reinforced ", "Solid ", "Valuable ", "Shiny ", "Resistant "],
	Special: ["Flame Proof ", "Blazing ", "Enchanted ", "Virtuous ", "Camoflagued ", "Runic "],
	Legendary: ["Unequaled ", "Legendary ", "Miraculous ", "Benevolent ", "Divine ", "Fabled "],
	Name: ["Beard", "Cloth", "Robes", "Leather", "Chainmail", "Plates"]
};