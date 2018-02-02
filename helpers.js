Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

$.fn.hasScrollBar = function() {
	return this.get(0).scrollHeight > this.outerHeight();
}