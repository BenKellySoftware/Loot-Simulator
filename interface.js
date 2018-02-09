var profilePanel = {
	visible: true,
	element: "#profile",
	direction: "right",
	closed: -280,
	open: 0,
}

var charPanel = {
	visible: true,
	element: "#characterWrapper",
	direction: "height",
	closed: 0,
	open: 250,
}

function panelSlide(panel) {
	var css = {};
	css[panel.direction] = panel.visible ? panel.closed : panel.open;
	$(panel.element).animate(css, 500);
	panel.visible = !panel.visible;
}

$(document).ready(function() {
	$('#items').sortable({
		appendTo: '#game',
		helper: 'clone',
	});
	$('#inventory').disableSelection();

	$("#profile > .slider.horizontal i").click(function() {
		panelSlide(profilePanel);
		$(this).toggleClass("fa-chevron-right fa-chevron-left");
	});
	$("#profilePanel > .slider.vertical i").click(function() {
		panelSlide(charPanel);
		$(this).toggleClass("fa-chevron-up fa-chevron-down");
	});
});