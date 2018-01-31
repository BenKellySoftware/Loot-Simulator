var profilePanel = {
	visible: true,
	element: "#profile",
	direction: "right",
	closed: -260,
	open: 0,
	// direction: "width",
	// closed: 20,
	// open: 280
}

function panelSlide(panel) {
	var css = {};
	css[panel.direction] = panel.visible ? panel.closed : panel.open;
	console.log(css);
	$(panel.element).animate(css);
	panel.visible = !panel.visible;
}

$(document).ready(function() {
	$("#profile > .slider.horizontal i").click(function() {
		console.log("Test");
		panelSlide(profilePanel);
	});
});