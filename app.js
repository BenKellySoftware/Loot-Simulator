$(document).ready(function(){
	character = new Character("Player");
	inventory = new Inventory();
	quests = new QuestsVM();

	ko.applyBindings(quests, document.getElementById("questSelect"));
	ko.applyBindings(character, document.getElementById("player"));
	$("#questScreen").hide();
});

function stats(enemy) {
	$("#eName").text(enemy.name + ":");
	$("#eHealth").text("Health: " + enemy.health);
	$("#eDamage").text("Damage: " + enemy.damage);
}