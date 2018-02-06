$(document).ready(function(){
	character = new Character("Player");
	inventory = new Inventory();
	quests = new QuestsVM();

	ko.applyBindings(quests, document.getElementById("questSelect"));
	$("#questScreen").hide();
});

function stats(enemy) {
	$("#pHealth").text("Health: " + character.health);
	$("#pDamage").text("Damage: " + character.equiped.damage);
	$("#pLevel").text("Level: " + character.level);
	$("#eName").text(enemy.name + ":");
	$("#eHealth").text("Health: " + enemy.health);
	$("#eDamage").text("Damage: " + enemy.damage);
}