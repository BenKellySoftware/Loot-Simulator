var Player = {
	Level: 1,
	MaxHealth: 100,
	Health: 100,
	Money: 0,
	Equiped: {
		Id: 0,
		Name: "Broken Stick",
		Rarity: "Weak",
		Level: 1,
		Damage: 6,
		Value: 10,
		Favorite: true,
	},
	Inventory: [
	]
}

var AvailableLevels = [
	{
	Id: 1,
	Difficulty: 1},
	{
	Id: 3,
	Difficulty: 2},
	{
	Id: 5,
	Difficulty: 3},
	{
	Id: 16,
	Difficulty: 4}
];

//Current Quest Info
var EnemyProgress = 0;
var SelectedLevel = 0;
var Difficulty = 1;


$(document).ready(function(){
    $('#inventory').sortable();
    $('#inventory').disableSelection();
	for (var i = 0; i < AvailableLevels.length; i++) {
		$(".level:eq("+i+")").children(".levelName").text(QuestData[AvailableLevels[i].Id].Name);
		$(".level:eq("+i+")").children(".levelDifficulty").text(AvailableLevels[i].Difficulty);
	};
	$("#questScreen").hide();
});

function NewQuest(Slot) {
	if (Slot < 3) {
		AvailableLevels[Slot].Id = 1 + Math.floor(Math.random()*15);
		AvailableLevels[Slot].Difficulty = Player.Level - Math.floor(Math.random()*3) + Slot;
		if (AvailableLevels[Slot].Difficulty < 1) {
			AvailableLevels[Slot].Difficulty = 1;
		}
	}
	else {
		AvailableLevels[Slot].Id ++;
		if (AvailableLevels[Slot].Id > 25) {
			AvailableLevels[Slot].Id = 16;
		};
		AvailableLevels[Slot].Difficulty = Player.Level + 3;
	}
	$(".level:eq("+Slot+")").children(".levelName").text(QuestData[AvailableLevels[Slot].Id].Name);
	$(".level:eq("+Slot+")").children(".levelDifficulty").text(AvailableLevels[Slot].Difficulty);
}

function SelectLevel (e) {
 	SelectedLevel = e;
	$("#questScreen").show();
	$("#levelSelect").hide();
	Difficulty = AvailableLevels[e].Difficulty;
	EnemyProgress = 0;
	$("#playerIcon").animate({left: "375px"}, {queue: false, duration: 500});
	Battle();
}

function Battle() {
	// Clone enemy from level data
	Enemy = $.extend( true, {}, Enemies[QuestData[AvailableLevels[SelectedLevel].Id].Enemies[EnemyProgress]]);
	Enemy.Health = Math.floor(Enemy.Health * Math.pow(1.2,Difficulty-1));
	Stats();
	$("#enemyIcon").text(Enemy.Symbol);
	$("#enemyIcon").animate({right: "375px"}, {queue: false, duration: 500});
	$("#background").animate({"background-position": "-=375px"}, {duration: 500});
	setTimeout(function() {
		Attack();
	}, 750);
}

function Attack() {
	console.log(Player.Equiped.Damage, Enemy.Health);
	Player.Health -= Math.floor(Enemy.Damage * Math.pow(1.2,Difficulty-1));
	Enemy.Health -= Player.Equiped.Damage;
	if (Player.Health < 0) {
		Player.Health = Player.MaxHealth;
		$("#questScreen").hide();
		$("#levelSelect").show();
		Player.Money = 0;
		Player.Equiped = {
			Id: 0,
			Name: "Broken Stick",
			Rarity: "Weak",
			Level: Player.Level,
			Damage: Math.floor(6 * Math.pow(1.2, Player.Level-1)),
			Value: 0,
			Favorite: false,
		};
		Player.Inventory = [];
		$('#money').text("Money: $" + Player.Money);
		$("#inventory").empty();
		//FailQuest
		Stats();
		return;
	}
	if (Enemy.Health > 0) {
		Stats();
		setTimeout(function() {
			Attack();
		}, 750);
	}
	else {
		// console.log("Kill");
		$("#enemyIcon").css({right: "0"});
		switch (Enemy.Type) {
			case 0:
				//Health Drop
				if (Math.random() > 0.7) {
					Player.Health += Math.round(Player.MaxHealth/4);
					if (Player.Health > Player.MaxHealth) {Player.Health = Player.MaxHealth};
				}
				if (Math.random() > 0.8){
					LootDrop(Difficulty, [300, 900, 990, 1000]);
				}
			break;
			case 1:
				Player.Health = Player.MaxHealth;
				LootDrop(Difficulty, [100, 750, 950, 995]);
			break;
			case 2:
				Player.Health = Player.MaxHealth;

				LootDrop(Difficulty, [0, 300, 850, 970]); LootDrop(Difficulty, [100, 750, 950, 995]);
			break;
		}
		EnemyProgress++;
		if (EnemyProgress < QuestData[AvailableLevels[SelectedLevel].Id].Enemies.length) {
			Battle();
		}
		else {
			$("#questScreen").hide();
			$("#levelSelect").show();
			NewQuest(SelectedLevel);
			//EndQuest
		}
	}
}

var ItemID = 1;
function LootDrop (Level, RarityChance) {
	var RarityNames = ["Weak", "Standard", "Rare", "Special", "Legendary"];

	ItemID++;
	var Random = Math.floor(Math.random() * 1000);
	var Quality = 0
	while (Random >= RarityChance[Quality]) {
		Quality++;
	}
	var Rarity = RarityNames[Quality];
	var Kind = Weapons.Name[Level - 1 + Math.floor(Math.random() * 6)];

	var Item = {
		Id: ItemID,
		Name: Weapons[Rarity].sample() + Kind,
		Rarity: Rarity,
		Level: Level,
		Damage: Math.floor((6.5 + (Math.random()/2) + Quality) * Math.pow(1.2, Level-1)),
		Value: Math.floor((10 + Math.random()/2) * (1 + Quality/2) * Math.pow(1.2, Level-1)),
		Favorite: false
	};

	Player.Inventory.push(Item);
	$("#inventory").append("<li class='item "+Rarity+"' data="+Item.Id+"><div class='itemName' onclick='$(this).siblings().slideToggle();'>"+Item.Name+"</div><div class='details'><div class='itemDamage'>Damage: "+Item.Damage+"</div><div class='itemLevel'>Level: "+Item.Level+"</div><div class='itemValue'>Value: "+Item.Value+"</div><div class='itemFavorite'>Favorite<input onchange='Favorite(this)' type='checkbox'></div><button onclick='Equip(this)' class='itemEquip'>Equip</button><button onclick='Sell(this)' class='itemSell'>Sell</button></div></li>");
}

function Favorite(e) {
	for (var i = 0; i < Player.Inventory.length; i++) {
		if (Player.Inventory[i].Id == $(e).parent().parent().parent().attr("data")) {
			Player.Inventory[i].Favorite = !Player.Inventory[i].Favorite;
		}
	}
}

function Equip(e) {
	for (var i = 0; i < Player.Inventory.length; i++) {
		if (Player.Inventory[i].Id == $(e).parent().parent().attr("data")) {
			if (Player.Inventory[i].Level <= Player.Level) {
				Player.Inventory.push(Player.Equiped);
				$("#inventory").append("<div class='item "+Player.Equiped.Rarity+"' data="+Player.Equiped.Id+"><div onclick='$(this).siblings().slideToggle();' style='height: 50px' align='center'>"+Player.Equiped.Name+"</div><div class='details'><div class='itemDamage'>Damage: "+Player.Equiped.Damage+"</div><div class='itemLevel'>Level: "+Player.Equiped.Level+"</div><div class='itemValue'>Value: "+Player.Equiped.Value+"</div><div class='itemFavorite'>Favorite<input onchange='Favorite(this)' type='checkbox'></div><button onclick='Equip(this)' class='itemEquip'>Equip</button><button onclick='Sell(this)' class='itemSell'>Sell</button></div></div>");
				if (Player.Equiped.Favorite) {
					$(".item").last().children().children().children("input").attr("checked", "");
				}
				Player.Equiped = Player.Inventory[i];
				Player.Inventory.splice(i,1);
				$(e).parent().parent().remove();
			}
		}
	}
}

function Sell(e) {
	for (var i = 0; i < Player.Inventory.length; i++) {
		if (Player.Inventory[i].Id == $(e).parent().parent().attr("data")) {
			Player.Money += Player.Inventory[i].Value;
			Player.Inventory.splice(i,1);
			$(e).parent().parent().remove();
			$('#money').text("Money: $"+ Player.Money);
		}
	}
}

function SellAll() {
	$(".item").each(function(e) {
		for (var i = 0; i < Player.Inventory.length; i++) {
			if (Player.Inventory[i].Id == $(this).attr("data") && !($(this).children().children().children("input").is(':checked'))) {
				Player.Money += Player.Inventory[i].Value;
				Player.Inventory.splice(i,1);
				$(this).remove();
			}
		}
	});
	$('#money').text("Money: $"+ Player.Money);
}

function LevelUp () {
	if (Player.Money >= Math.floor(125 * Math.pow(1.2,Player.Level-1))) {
		Player.Money -= Math.floor(125 * Math.pow(1.2,Player.Level-1));
		Player.Level ++;
		Player.MaxHealth = Math.floor(100 * Math.pow(1.2,Player.Level-1));
		Player.Health = Player.MaxHealth;
		$('#money').text("Money: $" + Player.Money);
		$('#levelUpCost').text("Cost: $" + Math.floor(125 * Math.pow(1.2,Player.Level-1)));
		$('#pLevel').text("Level: " + Player.Level);
		$("#pHealth").text("Health: " + Player.Health);
	}
}

function Stats() {
	$("#pHealth").text("Health: " + Player.Health);
	$("#pDamage").text("Damage: " + Player.Equiped.Damage);
	$("#pLevel").text("Level: " + Player.Level);
	$("#eName").text(Enemy.Name + ":");
	$("#eHealth").text("Health: " + Enemy.Health);
	$("#eDamage").text("Damage: " + Math.floor(Enemy.Damage * Math.pow(1.2,Difficulty-1)));
}