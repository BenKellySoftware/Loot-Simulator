const RarityNames = ["weak", "standard", "rare", "special", "legendary"];

const Enemies = [
	{name: "Training Dummy",symbol: "D", health: 0,  damage: 0, type: 0},
	
	//1 2 3 Animals
	{name: "Rat",			symbol: "R", health: 10, damage: 3, type: 0},
	{name: "Spider",		symbol: "S", health: 7,  damage: 4, type: 0},
	{name: "Rabid Wolf",	symbol: "W", health: 20, damage: 5, type: 1},
	
	//4 5 6 Bandits
	{name: "Madman",		symbol: "M", health: 6,  damage: 6, type: 0},
	{name: "Bandit",		symbol: "B", health: 10, damage: 4, type: 0},
	{name: "Bandit Leader",	symbol: "L", health: 40, damage: 5, type: 2},
	
	//7 8 9 Pirates
	{name: "Pirate",		symbol: "P", health: 10, damage: 4, type: 0},
	{name: "Parrot",		symbol: "P", health: 20, damage: 5, type: 1},
	{name: "Captain",		symbol: "C", health: 35, damage: 6, type: 2},

	// 10 11 12 Lizzard Cult
	{name: "Cultist",		symbol: "C", health: 8,  damage: 5, type: 0},
	{name: "Lizard",		symbol: "L", health: 15, damage: 3, type: 0},
	{name: "Lizard King",	symbol: "K", health: 45, damage: 4, type: 2},
	
	// 13 14 15 Barbarian
	{name: "Barbarian",		symbol: "B", health: 13, damage: 4, type: 0},
	{name: "Spearman",		symbol: "S", health: 7,  damage: 5, type: 0},
	{name: "War Chief",		symbol: "W", health: 25, damage: 8, type: 2},

	// 16 17 18 Army
	{name: "Cavalry",		symbol: "C", health: 9,  damage: 5, type: 0},
	{name: "Knight",		symbol: "K", health: 13, damage: 4, type: 0},
	{name: "General",		symbol: "G", health: 30, damage: 7, type: 2},
	
	// 19 20 21 Bar
	{name: "Drunk",			symbol: "D", health: 15, damage: 3, type: 0},
	{name: "Bounty Hunter",	symbol: "B", health: 10, damage: 5, type: 0},
	{name: "Fugitive",		symbol: "F", health: 20, damage: 9, type: 2},

	// 22 23 24 Wizard
	{name: "Zombie",		symbol: "Z", health: 3,  damage: 6, type: 0},
	{name: "Necromancer",	symbol: "N", health: 20, damage: 5, type: 1},
	{name: "Master Wizard",	symbol: "W", health: 30, damage: 8, type: 2},

	// 25 26 27 Vampire
	{name: "Skeleton",		symbol: "S", health: 3,  damage: 6, type: 0},
	{name: "Vampire",		symbol: "V", health: 16, damage: 5, type: 1},
	{name: "Dracula",		symbol: "D", health: 30, damage: 8, type: 2},

	// 28 29 30 Races
	{name: "Orc",			symbol: "O", health: 13, damage: 4, type: 0},
	{name: "Goblin",		symbol: "G", health: 10, damage: 5, type: 0},
	{name: "Troll",			symbol: "T", health: 16, damage: 8, type: 1},

	//31 - 36 Monsters
	{name: "Gryphion",		symbol: "G", health: 10, damage: 5, type: 0},
	{name: "Minotaur",		symbol: "M", health: 12, damage: 4, type: 0},
	{name: "Spirit",		symbol: "S", health: 16, damage: 3, type: 0},
	{name: "Cursed Fairy",	symbol: "F", health: 16, damage: 3, type: 0},
	{name: "Wicked Pegasus",symbol: "P", health: 10, damage: 5, type: 1},
	{name: "Dragon",		symbol: "D", health: 50, damage: 3, type: 2},

	// 37 38 39 Japan
	{name: "Ninja",			symbol: "N", health: 10, damage: 5, type: 0},
	{name: "Samurai",		symbol: "S", health: 16, damage: 3, type: 0},
	{name: "Shogun",		symbol: "S", health: 35, damage: 6, type: 2},
];

const QuestData = [
	//Tutorial 0
	{name: "Cleaning Attic",			enemies: [1 ,2 ,1 ,1 ,1 ,2 ,2 ,1 ,1 ,2 ,1 ,2 ,2 ,2 ,1 ,2 ,2 ,1 ,1 ,2 ]},
	//Main Levels 1-15
	{name: "Forest Walk",				enemies: [2 ,11,2 ,11,1 ,2 ,2 ,1 ,11,1 ,1 ,2 ,11,1 ,3]},
	{name: "Expose Cult",				enemies: [10,4 ,10,22,10,10,10,22,4 ,22,22,10,4 ,10,23]},
	{name: "Stop Zombie Apocalype",		enemies: [22,22,4 ,4 ,4 ,22,22,22,22,23,22,22,4 ,22,22]},
	{name: "Sink Pirate Ship",			enemies: [7 ,19,7 ,7 ,19,7 ,7 ,19,7 ,8 ,7 ,7 ,19,7 ,8 ]},
	{name: "Hunt in Troll Caves",		enemies: [28,29,30,28,29,28,28,28,29,30,28,29,28,30,30]},
	{name: "Purify Corrupted Beasts",	enemies: [33,33,34,34,33,33,34,33,34,35,34,33,33,34,33,34,33,35,34,35]},
	{name: "Uncover Ruins",				enemies: [2 ,2 ,1 ,1 ,4 ,11,4 ,11,2 ,11,1 ,1 ,11,4 ,1 ,4 ,11,2 ,2 ,4 ]},
	{name: "Destroy Bandit Camp",		enemies: [4 ,5 ,5 ,4 ,4 ,4 ,4 ,5 ,5 ,4 ,4 ,5 ,3 ,4 ,3 ,4 ,5 ,5 ,5 ,5 ]},
	{name: "Raid Barbarian Stronghold",	enemies: [13,14,13,13,13,13,14,3 ,14,13,13,13,14,13,13,13,14,14,13,13]},
	{name: "Bar Fight",					enemies: [19,20,7 ,19,19,20,19,19,7 ,19,19,20,19,20,19,7 ,19,19,20,19]},
	{name: "Fight in the Skeleton War",	enemies: [25,25,25,22,25,25,22,22,16,16,25,25,16,25,25,22,16,25,22,25]},
	{name: "Assault Vampire Coven",		enemies: [25,25,26,26,26,26,33,25,26,26,25,25,33,33,26,26,25,33,26,26]},
	{name: "Break Up Human/Orc Fight",	enemies: [16,29,28,28,17,28,17,30,16,17,17,16,16,29,28,16,29,30,29,29]},
	{name: "Explore Mythical Lands",	enemies: [31,32,33,31,32,34,35,33,33,35,35,33,31,32,34,34,35,34,31,32]},
	{name: "Defeat Ninja Clan",			enemies: [37,37,38,37,37,38,38,38,38,38,37,38,37,37,38,38,37,38,37,37]},
	//Bosses 16-25
	{name: "Assassinate Bandit Leader",	enemies: [4 ,5 ,5 ,4 ,4 ,4 ,4 ,5 ,5 ,6 ]},
	{name: "Kill Pirate Captain",		enemies: [7 ,7 ,7 ,8 ,7 ,7 ,7 ,7 ,8 ,9 ]},
	{name: "Hunt the Lizard King",		enemies: [10,11,11,10,11,11,11,10,10,12]},
	{name: "Eliminate Warlord",			enemies: [13,14,13,13,13,14,14,13,13,15]},
	{name: "Duel Army General",			enemies: [16,16,16,17,16,16,17,16,16,18]},
	{name: "Track Fugitive at Bar",		enemies: [19,20,19,19,20,20,20,19,19,21]},
	{name: "Battle Master Wizard",		enemies: [22,22,22,23,22,22,22,22,23,24]},
	{name: "Impale Lord of Vampires",	enemies: [25,25,26,33,25,26,26,33,26,27]},
	{name: "Slay the Dragon",			enemies: [17,17,34,17,34,17,17,34,17,36]},
	{name: "Battle Rogue Shogun",		enemies: [37,38,38,37,38,37,37,38,38,39]},
	//Other 26
	{name: "Training",					enemies: [0]},
];

const Weapons = {
	weak:		["Weak ",		"Broken ",		"Twisted ",		"Damaged ",		"Cracked ",		"Blunt ",		"Redundant ",	"Unlucky ",		"Forgotten "],
	standard:	["Standard ",	"Basic ",		"Stock ",		"Typical ",		"Common ",		"Regular ",		"Ordinary ", 	"", "", "", "", "", "", ""],
	rare:		["Rare ",		"Damaging ",	"Precious ",	"Razor Sharp ",	"Valuable ",	"Shiny ",		"Deadly ",		"Formidable ",	"Barbed ",		"Precise "],
	special:	["Flaming ",	"Serated ",		"Enchanted ",	"Vicious ",		"Electrified ",	"Energy ",		"Homicidal ",	"Gory ",		"Runic ",		"Stealty "],
	modifiers:	["Flaming ",	"Electrified ",	"Poisoned ",	"Corrosive", 	"Piercing"],
	legendary:	["Legendary ",	"Unequaled ",	"Miraculous ",	"Malicious ",	"Divine ",		"Fabled "],
	name:		[
		"Spoon",		"Stick",	"Plank with Nail", 	"Club", 			"Rock", 			"Bone",			"Bat",		"Gloves",			"Hoe",			"Glass Shard",
		"Dagger",		"Saw",		"Machete",			"Staff", 			"Hammer", 			"Cleaver",		"Knuckles",	"Gauntlets",		"Pickaxe",		"Hatchet",
		"Spear",		"Tessen",	"Short Sword",		"Sickle", 			"Cutlass",			"Darts",		"Mace",		"Sling Shot",		"Broad Sword", 	"Bolas",
		"War Hammer",	"Lance",	"Flail",			"Scimitar", 		"Crossbow",			"Sabre",		"Kunai",	"Throwing Knives",	"Great Sword",	"Boomerang", 
		"Battle Axe",	"Glaive",	"Épée",				"Whip",				"Nunchucks",		"Scythe",		"Khopesh",	"Chained Knife",	"Bō",			"Sling", 
		"Shuriken",		"Katana",	"Halberd", 			"Twin Hook Swords",	"Bow"
	]
};

const Armour = {
	weak:		["Weak ", "Broken ", "Damaged ", "Cracked ", "Unlucky ", "Forgotten", "Clunky"],
	standard:	["Basic ", "Stock ", "Typical ", "Common ", "Regular ", "Ordinary ", "", "", "", "", "", "", ""],
	rare:		["Rare ", "Protective ", "Reinforced ", "Solid ", "Valuable ", "Shiny ", "Resistant "],
	special:	["Flame Proof ", "Blazing ", "Enchanted ", "Virtuous ", "Camoflagued ", "Runic "],
	legendary:	["Unequaled ", "Legendary ", "Miraculous ", "Benevolent ", "Divine ", "Fabled "],
	name:		["Beard", "Cloth", "Robes", "Leather", "Chainmail", "Plates"]
};