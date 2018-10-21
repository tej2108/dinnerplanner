var DishView = function (container, model) {
	// function that is called on button-click
	this.renderDishInfo = function (data) {
		// set parameters
		container.find('#dish-image').attr('src', data.image);
		container.find('#dish-name').html(data.title);

		container.find('#dish-description').html(data.description);
		const ingredients = container.find('#dish-ingredients');

		for (let i = 0; i < data.extendedIngredients.length; i++) {
			ingredients.append('<li class="list-group-item">' + data.extendedIngredients[i].amount + ' ' + data.extendedIngredients[i].unit + ' ' + data.extendedIngredients[i].name + '</li>');
		}

		container.find('.btn-add-to-menu').attr('id', 'add-to-menu-' + data.id);
		container.find('#total-dish-price').html(model.getTotalDishPrice(data.pricePerServing) + ' kr');

		model.setActiveDish(data);

		container.find('#loading-info').hide();
		container.find('#selected-dish').show();
	}

	this.errorViewingDish = function() {
		container.find('#loading-info').empty().append('<div class="text-center">There was an error displaying the dishes. Reason: ' + data.statusText + '.</div>');
	}

	// back to index button
	this.backToIndex = container.find('#back-to-menu-from-dish');
	this.addDishToMenuBtn = container.find('.btn-add-to-menu');

	this.viewDishInfo = function(id) {
		container.find('#loading-info').show().empty().append('<div class="m-auto" style="width:100px;"><div class="spinner"></div></div>');
		model.getDish(id, this.renderDishInfo, this.errorViewingDish);
	} 

	this.hide = function () {
		model.setActiveDish(null);
		container.hide();
		container.find('#selected-dish').hide();
	}

	this.show = function () {
		container.show();
	}
}
