var BasketView = function (container, model) {
	// reference the guest selector so that it
	// will be available to the controller
	this.numberOfGuests = container.find('#number-of-guests');

	this.confirm = container.find('#btn-confirm-dinner');

	// updates the total view for the basket
	this.update = function () {
		var content = '';
		const dishes = model.getSelectedDishes();
		for (let i = 0; i < dishes.length; i++) {
			const dish = dishes[i];
			let properties = '<li class="list-group-item">';

			properties += '<div class="row"><div class="col-6">';
			properties += '<strong>' + dish.title + '</strong>';
			properties += '</div><div class="col-6 text-right">';
			properties += '<span class="badge badge-primary">' + dish.pricePerServing + ' kr</span>';
			properties += '</div></div></li>';

			// add property to content
			content += properties;
		}

		// redraw and add content to view
		container.find('#dish-basket').empty().html(content);

		// Set total menu-price
		container.find('.total-price').html(model.getTotalMenuPrice());
	}

	model.addObserver(this.update);

	this.hide = function() {
		model.removeObserver(this.update);
		container.hide();
	}

	this.show = function () {
		model.addObserver(this.update);
		container.show();
	}
}
