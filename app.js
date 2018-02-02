var player = {
	level: 1,
	maxHealth: 100,
	health: 100,
	money: 0,
	equiped: {
		id: 0,
		name: "Broken Stick",
		rarity: "Weak",
		level: 1,
		damage: 6,
		value: 10,
		favourite: true,
	},
	inventory: [
	]
}

var availableLevels = [
	{
	id: 1,
	difficulty: 1},
	{
	id: 3,
	difficulty: 2},
	{
	id: 5,
	difficulty: 3},
	{
	id: 16,
	difficulty: 4}
];

//Current Quest Info
var enemyProgress = 0;
var selectedLevel = 0;
var difficulty = 1;


$(document).ready(function(){
	$("#questScreen").hide();
	for (var i = 0; i < availableLevels.length; i++) {
		$(".level:eq("+i+")").children(".levelName").text(QuestData[availableLevels[i].id].name);
		$(".level:eq("+i+")").children(".levelDifficulty").text(availableLevels[i].difficulty);
	};
});

function newQuest(slot) {
	if (slot < 3) {
		availableLevels[slot].id = 1 + Math.floor(Math.random()*15);
		availableLevels[slot].difficulty = player.Level - Math.floor(Math.random()*3) + slot;
		if (availableLevels[slot].difficulty < 1) {
			availableLevels[slot].difficulty = 1;
		}
	}
	else {
		availableLevels[slot].id ++;
		if (availableLevels[slot].id > 25) {
			availableLevels[slot].id = 16;
		};
		availableLevels[slot].difficulty = player.Level + 3;
	}
	$(".level:eq("+slot+")").children(".levelName").text(QuestData[availableLevels[slot].id].name);
	$(".level:eq("+slot+")").children(".levelDifficulty").text(availableLevels[slot].difficulty);
}

function selectLevel (e) {
 	selectedLevel = e;
	$("#questScreen").show();
	$("#levelSelect").hide();
	difficulty = availableLevels[e].difficulty;
	enemyProgress = 0;
	$("#playerIcon").animate({left: "375px"}, {queue: false, duration: 500});
	battle();
}

function battle() {
	// Clone enemy from level data
	enemy = $.extend( true, {}, Enemies[QuestData[availableLevels[selectedLevel].id].enemies[enemyProgress]]);
	enemy.health = Math.floor(enemy.health * Math.pow(1.2,difficulty-1));
	stats();
	$("#enemyIcon").text(enemy.symbol);
	$("#enemyIcon").animate({right: "375px"}, {queue: false, duration: 500});
	$("#background").animate({"background-position": "-=375px"}, {duration: 500});
	setTimeout(function() {
		attack();
	}, 750);
}

function attack() {
	console.log(player.equiped.damage, enemy.health);
	player.health -= Math.floor(enemy.damage * Math.pow(1.2,difficulty-1));
	enemy.health -= player.equiped.damage;
	if (player.health < 0) {
		player.health = player.maxHealth;
		$("#questScreen").hide();
		$("#levelSelect").show();
		player.money = 0;
		player.equiped = {
			id: 0,
			name: "Broken Stick",
			rarity: "Weak",
			level: player.level,
			damage: Math.floor(6 * Math.pow(1.2, player.level-1)),
			value: 0,
			favourite: false,
		};
		player.inventory = [];
		$('#money').text("Money: $" + player.money);
		$("#inventory").empty();
		//FailQuest
		stats();
		return;
	}
	if (enemy.health > 0) {
		stats();
		setTimeout(function() {
			attack();
		}, 750);
	}
	else {
		// console.log("Kill");
		$("#enemyIcon").css({right: "0"});
		switch (enemy.type) {
			case 0:
				//Health Drop
				if (Math.random() > 0.7) {
					player.health += Math.round(player.maxHealth/4);
					if (player.health > player.maxHealth) {player.health = player.maxHealth};
				}
				if (Math.random() > 0.8){
					lootDrop(difficulty, [300, 900, 990, 1000]);
				}
			break;
			case 1:
				player.health = player.maxHealth;
				lootDrop(difficulty, [100, 750, 950, 995]);
			break;
			case 2:
				player.health = player.maxHealth;

				lootDrop(difficulty, [0, 300, 850, 970]); lootDrop(difficulty, [100, 750, 950, 995]);
			break;
		}
		enemyProgress++;
		if (enemyProgress < QuestData[availableLevels[selectedLevel].id].enemies.length) {
			battle();
		}
		else {
			$("#questScreen").hide();
			$("#levelSelect").show();
			newQuest(selectedLevel);
			//EndQuest
		}
	}
}

var itemId = 1;
function lootDrop (level, rarityChance) {
	var random = Math.floor(Math.random() * 1000);
	var quality = 0
	while (random >= rarityChance[quality]) {
		quality++;
	}
	var rarity = RarityNames[quality];
	var kind = Weapons.name[level - 1 + Math.floor(Math.random() * 6)];

	var item = {
		id: itemId,
		name: Weapons[rarity].sample() + kind,
		rarity: rarity,
		level: level,
		damage: Math.floor((6.5 + (Math.random()/2) + quality) * Math.pow(1.2, level-1)),
		value: Math.floor((10 + Math.random()/2) * (1 + quality/2) * Math.pow(1.2, level-1)),
		favourite: false
	};

	player.inventory.push(item);
	$("#inventory").append("<div class='item "+rarity+"' data-id="+item.id+"><div class='itemName'><p>"+item.name+"</p></div></div>");
	itemId++;
}

function favourite(id) {
	item = player.inventory.find(function(item) {
			return item.id == id;
	});
	if (item) {
		item.favourite = !item.favourite
	}
}

function equip(id) {
	index = player.inventory.findIndex(function(item) {
			return item.id == id;
	});
	console.log(index);
	if (index != -1) {
		item = player.inventory[index];
		$("#inventory").append("<div class='item "+player.equiped.rarity+"' data-id="+player.equiped.id+"><div class='itemName'><p>"+player.equiped.name+"</p></div></div>");
		$("[data-id="+id+"]").remove();
		player.inventory.push(player.equiped);
		player.equiped = item;
		player.inventory.splice(index,1);
	}
}

function sell(id) {
	index = player.inventory.findIndex(function(item) {
			return item.id == id;
	});
	if (index != -1) {
		item = player.inventory[index];
		player.money += item.value;
		player.inventory.splice(index,1);
		$("[data-id="+id+"]").remove();		
		$('#money').text("Money: $"+ player.money);
	}
}

function sellAll() {
	// Need to work backwards to prevent edit while iterating problems
	for (var i = player.inventory.length - 1; i >= 0; i--) {
		sell(player.inventory[i].id);
	}
}

function levelUp () {
	if (player.money >= Math.floor(125 * Math.pow(1.2,player.level-1))) {
		player.money -= Math.floor(125 * Math.pow(1.2,player.level-1));
		player.level ++;
		player.maxHealth = Math.floor(100 * Math.pow(1.2,player.level-1));
		player.health = player.maxHealth;
		$('#money').text("Money: $" + player.money);
		$('#levelUpCost').text("Cost: $" + Math.floor(125 * Math.pow(1.2,player.level-1)));
		$('#pLevel').text("Level: " + player.level);
		$("#pHealth").text("Health: " + player.health);
	}
}

function stats() {
	$("#pHealth").text("Health: " + player.health);
	$("#pDamage").text("Damage: " + player.equiped.damage);
	$("#pLevel").text("Level: " + player.level);
	$("#eName").text(enemy.name + ":");
	$("#eHealth").text("Health: " + enemy.health);
	$("#eDamage").text("Damage: " + Math.floor(enemy.damage * Math.pow(1.2,difficulty-1)));
}