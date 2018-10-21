var StartView = function (container, model) {
	this.startDinner = container.find('#start-planning');
	
	this.hide = function () {
		container.hide();
	}

	this.show = function () {
		container.show();
	}
}
