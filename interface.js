var profilePanel = {
	visible: true,
	element: "#profile",
	direction: "right",
	closed: -280,
	open: 0,
	// direction: "width",
	// closed: 20,
	// open: 280
}

var charPanel = {
	visible: true,
	element: "#charScreen",
	direction: "height",
	closed: 20,
	open: 250,
}

function panelSlide(panel) {
	var css = {};
	css[panel.direction] = panel.visible ? panel.closed : panel.open;
	$(panel.element).animate(css);
	panel.visible = !panel.visible;
}

$(document).ready(function() {
	$('#inventory').sortable({
		appendTo: '#game',
		helper: 'clone',
	});
	$('#inventory').disableSelection();

	$("#profile > .slider.horizontal i").click(function() {
		panelSlide(profilePanel);
		$(this).toggleClass("fa-chevron-right fa-chevron-left");
	});
	$("#charScreen > .slider.vertical i").click(function() {
		panelSlide(charPanel);
		$(this).toggleClass("fa-chevron-up fa-chevron-down");
	});
});