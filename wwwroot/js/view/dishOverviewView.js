var DishOverviewView = function (container, model) {
	this.container = container;
	this.search = container.find('#search-dishes');

	// reference the dish-type selector
	this.dishTypes = container.find('#dish-type');

	// declare how to fill it
	this.setAvailableTypes = function () {
		var options = '';
		const types = model.getAllTypes();
		for (let i = 0; i < types.length; i++) {
			options += '<option id="type-' + types[i].replace(' ', '') + '" value="' + encodeURI(types[i]) + '">' + types[i] + '</option>';
		}
		this.dishTypes.html(options);
	}

	// actually fill it with types
	this.setAvailableTypes();
	this.holder = container.find('#dish-holder');

	// function that fills the available dishes depending on type
	this.fillDishes = function (data) {
		const last = data.results.length - 1;
		let render = '';

		for (let i = 0; i <= last; i++) {
			const dish = data.results[i];
			const template = container.find('#dish-index-template').clone();
			
			//fill template details
			template.find('.img-dish').attr('src', data.baseUri + dish.image);
			template.find('.view-dish-info').html(dish.title);

			template.find('.view-dish-info').attr('id', 'dish-' + dish.id);
			template.attr('id', 'dish-item-' + dish.id);
			template.show();

			if (i % 3 === 0) {
				if (i !== 0) render += '</div>';
				if (i !== last) render += '<div class="card-deck">';
			}

			render += template.html();
		}
		container.find('#dish-holder').empty().append(render);
	}

	this.errorViewingDishes = function(data) {
		container.find('#dish-holder').empty().append('<div class="text-center">There was an error displaying the dishes. Reason: ' + data.statusText + '.</div>');
	}

	this.filterBtn = container.find('#filter-btn');

	this.filterDishes = function () {
		this.holder.empty().append('<div class="m-auto" style="width:100px;"><div class="spinner"></div></div>');
		model.getAllDishes(this.dishTypes.val(), this.search.val(), this.fillDishes, this.errorViewingDishes);
	}

	this.viewDishInfoBtn = container.find('.view-dish-info');

	this.hide = function () {
		container.hide();
	}

	this.show = function () {
		container.show();
	}
}