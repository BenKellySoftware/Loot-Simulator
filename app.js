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
	character = new Character("Player");
	inventory = new Inventory();

	$("#questScreen").hide();
	for (var i = 0; i < availableLevels.length; i++) {
		$(".level:eq("+i+")").children(".levelName").text(QuestData[availableLevels[i].id].name);
		$(".level:eq("+i+")").children(".levelDifficulty").text(availableLevels[i].difficulty);
	};
});

function newQuest(slot) {
	if (slot < 3) {
		availableLevels[slot].id = 1 + Math.floor(Math.random()*15);
		availableLevels[slot].difficulty = character.level - Math.floor(Math.random()*3) + slot;
		if (availableLevels[slot].difficulty < 1) {
			availableLevels[slot].difficulty = 1;
		}
	}
	else {
		availableLevels[slot].id ++;
		if (availableLevels[slot].id > 25) {
			availableLevels[slot].id = 16;
		};
		availableLevels[slot].difficulty = character.level + 3;
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
	character.health -= Math.floor(enemy.damage * Math.pow(1.2,difficulty-1));
	enemy.health -= character.equiped.damage;
	if (character.health < 0) {
		character.health = character.maxHealth;
		$("#questScreen").hide();
		$("#levelSelect").show();
		inventory.money = 0;
		inventory.items = [];
		character.equiped = new Item("Broken Stick", 0, 1, Math.floor(6 * Math.pow(1.2, character.level-1)), 10, true);

		// TODO: Knockout Bindings
		$('#money').text("Money: $" + inventory.money);
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
		$("#enemyIcon").css({right: "0"});
		switch (enemy.type) {
			case 0:
				//Health Drop
				if (Math.random() > 0.7) {
					character.health += Math.round(character.maxHealth/4);
					if (character.health > character.maxHealth) {character.health = character.maxHealth};
				}
				if (Math.random() > 0.8){
					inventory.lootDrop(difficulty, [300, 900, 990, 1000]);
				}
			break;
			case 1:
				character.health = character.maxHealth;
				inventory.lootDrop(difficulty, [100, 750, 950, 995]);
			break;
			case 2:
				character.health = character.maxHealth;
				inventory.lootDrop(difficulty, [0, 300, 850, 970]); inventory.lootDrop(difficulty, [100, 750, 950, 995]);
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

function stats() {
	$("#pHealth").text("Health: " + character.health);
	$("#pDamage").text("Damage: " + character.equiped.damage);
	$("#pLevel").text("Level: " + character.level);
	$("#eName").text(enemy.name + ":");
	$("#eHealth").text("Health: " + enemy.health);
	$("#eDamage").text("Damage: " + Math.floor(enemy.damage * Math.pow(1.2,difficulty-1)));
}
