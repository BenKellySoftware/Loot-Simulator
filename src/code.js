var Player = {
	Level: 1,
	MaxHealth: 100,
	Health: 100,
	Money: 0,
	Equiped: {
		Id: 0,
		Name: "Broken Stick",
		Rarity: 0,
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
var RarityChance = [300, 900, 990, 1000];
var Enemy;

$(document).ready(function(){
	for (var i = 0; i < AvailableLevels.length; i++) {
		$(".Level:eq("+i+")").children(".LevelName").text(QuestData[AvailableLevels[i].Id].Name);
		$(".Level:eq("+i+")").children(".LevelDifficulty").text(AvailableLevels[i].Difficulty);
	};
	$("#QuestScreen").hide();
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
	$(".Level:eq("+Slot+")").children(".LevelName").text(QuestData[AvailableLevels[Slot].Id].Name);
	$(".Level:eq("+Slot+")").children(".LevelDifficulty").text(AvailableLevels[Slot].Difficulty);
}

function SelectLevel (e) {
	SelectedLevel = e;
	$("#QuestScreen").show();
	$("#LevelSelect").hide();
	Difficulty = AvailableLevels[e].Difficulty;
	EnemyProgress = 0;
	$("#PlayerIcon").animate({left: "375px"}, {queue: false, duration: 500});
	Battle();
}

function Battle() {
	Enemy = $.extend( true, {}, Enemies[QuestData[AvailableLevels[SelectedLevel].Id].Enemies[EnemyProgress]]);
	Enemy.Health = Math.floor(Enemy.Health * Math.pow(1.2,Difficulty-1));
	Stats();
	$("#EnemyIcon").text(Enemy.Symbol);
	$("#EnemyIcon").animate({right: "375px"}, {queue: false, duration: 500});
	$("#Background").animate({"background-position": "-=375px"}, {duration: 500});
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
		$("#QuestScreen").hide();
		$("#LevelSelect").show();
		Player.Money = 0;
		Player.Equiped = {
			Id: 0,
			Name: "Broken Stick",
			Rarity: 0,
			Level: Player.Level,
			Damage: Math.floor(6.5 * Math.pow(1.2, Item.Level-1)),
			Value: 0,
			Favorite: false,
		};
		Player.Inventory = [];
		$('#Money').text("Money: $" + Player.Money);
		$("#Inventory").clear();
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
		console.log("Kill");
		$("#EnemyIcon").css({right: "0"});
		switch (Enemy.Type) {
			case 0:
				RarityChance = [300, 900, 990, 1000];
				if (Math.random() > 0.7) {
					Player.Health += Math.round(Player.MaxHealth/4);
					if (Player.Health > Player.MaxHealth) {Player.Health = Player.MaxHealth};
				}
				if (Math.random() > 0.8){
					LootDrop();
				}
			break;
			case 1:
				Player.Health = Player.MaxHealth;
				RarityChance = [150, 750, 950, 995];
				LootDrop(); LootDrop();
			break;
			case 2:
				Player.Health = Player.MaxHealth;
				RarityChance = [0, 400, 900, 970];
				LootDrop(); LootDrop(); LootDrop();
			break;
		}
		EnemyProgress++;
		if (EnemyProgress < QuestData[AvailableLevels[SelectedLevel].Id].Enemies.length) {
			Battle();
		}
		else {
			$("#QuestScreen").hide();
			$("#LevelSelect").show();
			NewQuest(SelectedLevel);
			//EndQuest
		}
	}
}


var ItemID = 1;
function LootDrop () {
	var Item = {
		Id: ItemID,
		Name: "",
		Rarity: 0,
		Damage: 1,
		Level: 1,
		Value: 0,
		Favorite: false
	};
	ItemID++;
	var Random = Math.floor(Math.random() * 1000);
	for (var i = 0; i < RarityChance.length; i++) {
		if (Random >= RarityChance[i]) {
			Item.Rarity ++;
		}
		else {
			i = RarityChance.length;
		}
	}
	switch (Item.Rarity) {
		case 0:
			var Prefix = Weapons.Poor;
		break;
		case 1:
			var Prefix = Weapons.Normal;
		break;
		case 2:
			var Prefix = Weapons.Rare;
		break;
		case 3:
			var Prefix = Weapons.Special;
		break;
		case 4:
			var Prefix = Weapons.Legendary;
		break;
	}
	var Kind = Weapons.Name[Difficulty - 1 + Math.floor(Math.random() * 6)];
	Item.Name = Prefix[Math.floor(Math.random() * Prefix.length)] + Kind;
	Item.Level = Difficulty;
	Item.Damage = Math.floor((6.5 + (Math.random()/2) + Item.Rarity) * Math.pow(1.2, Item.Level-1));
	Item.Value = Math.floor((10 + Math.random()/2) * (1 + Item.Rarity/2) * Math.pow(1.2, Item.Level-1));
	Player.Inventory.push(Item);
	//Create item
		//Item
		$("#Inventory").append("<div class='Item Rarity"+Item.Rarity+"' data="+Item.Id+"><div onclick='$(this).siblings().slideToggle();' style='height: 50px' align='center'>"+Item.Name+"</div><div class='Details'><div class='ItemDamage'>Damage: "+Item.Damage+"</div><div class='ItemLevel'>Level: "+Item.Level+"</div><div class='ItemValue'>Value: "+Item.Value+"</div><div class='ItemFavorite'>Favorite<input onchange='Favorite(this)' type='checkbox'></div><button onclick='Equip(this)' class='ItemEquip'>Equip</button><button onclick='Sell(this)' class='ItemSell'>Sell</button></div></div>");
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
				$("#Inventory").append("<div class='Item Rarity"+Player.Equiped.Rarity+"' data="+Player.Equiped.Id+"><div onclick='$(this).siblings().slideToggle();' style='height: 50px' align='center'>"+Player.Equiped.Name+"</div><div class='Details'><div class='ItemDamage'>Damage: "+Player.Equiped.Damage+"</div><div class='ItemLevel'>Level: "+Player.Equiped.Level+"</div><div class='ItemValue'>Value: "+Player.Equiped.Value+"</div><div class='ItemFavorite'>Favorite<input onchange='Favorite(this)' type='checkbox'></div><button onclick='Equip(this)' class='ItemEquip'>Equip</button><button onclick='Sell(this)' class='ItemSell'>Sell</button></div></div>");
				if (Player.Equiped.Favorite) {
					$(".Item").last().children().children().children("input").attr("checked", "");
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
			$('#Money').text("Money: $"+ Player.Money);
		}
	}
}

function SellAll() {
	$(".Item").each(function(e) {
		for (var i = 0; i < Player.Inventory.length; i++) {
			if (Player.Inventory[i].Id == $(this).attr("data") && !($(this).children().children().children("input").is(':checked'))) {
				Player.Money += Player.Inventory[i].Value;
				Player.Inventory.splice(i,1);
				$(this).remove();
			}
		}
	});
	$('#Money').text("Money: $"+ Player.Money);
}

function LevelUp () {
	if (Player.Money >= Math.floor(125 * Math.pow(1.2,Player.Level-1))) {
		Player.Money -= Math.floor(125 * Math.pow(1.2,Player.Level-1));
		Player.Level ++;
		Player.MaxHealth = Math.floor(100 * Math.pow(1.2,Player.Level-1));
		Player.Health = Player.MaxHealth;
		$('#Money').text("Money: $" + Player.Money);
		$('#LevelUpCost').text("Cost: $" + Math.floor(125 * Math.pow(1.2,Player.Level-1)));
		$('#PLevel').text("Level: " + Player.Level);
		$("#PHealth").text("Health: " + Player.Health);
	}
}

function Stats() {
	$("#PHealth").text("Health: " + Player.Health);
	$("#PDamage").text("Damage: " + Player.Equiped.Damage);
	$("#PLevel").text("Level: " + Player.Level);
	$("#EName").text(Enemy.Name + ":");
	$("#EHealth").text("Health: " + Enemy.Health);
	$("#EDamage").text("Damage: " + Math.floor(Enemy.Damage * Math.pow(1.2,Difficulty-1)));
}