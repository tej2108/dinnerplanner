$(function () {
	// We instantiate our model
	const model = new DinnerModel();

	// IMPORTANT: app.js is the only place where you are allowed to
	// use the $('someSelector') to search for elements in the whole HTML.
	// In other places you should limit the search only to the children
	// of the specific view you're working with (see exampleView.js).

	const start = $('#start-dinner');
	const startView = new StartView(start);

	const basket = $('#overview-nav');
	const basketView = new BasketView(basket, model);
	BasketController(basketView, model);

	const dishes = $('#dish-index-holder');
	const dishOverview = new DishOverviewView(dishes, model);
	DishOverviewController(dishOverview, model, this);

	const dish = $('#dish-info');
	const dishView = new DishView(dish, model);
	DishController(dishView, model);

	const preparation = $('#prep-info');
	const preparationView = new PreparationView(preparation, model);

	const summary = $('#summary-info');
	const summaryView = new SummaryView(summary, model);

	// GENERAL STATE CONTROLLER

	startView.startDinner.click(function () {
		startView.hide();
		basketView.show();
		dishOverview.show();
	});

	this.viewDishInfo = function (id) {
		dishOverview.hide();
		dishView.viewDishInfo(id);
		dishView.show();
	}

	dishView.backToIndex.click(function() {
		dishView.hide();
		dishOverview.show();
	});

	basketView.confirm.click(function() {
		basketView.hide();
		dishOverview.hide();
		dishView.hide();
		preparationView.show();
	});

	preparationView.editDinner.click(function() {
		basketView.show();
		dishOverview.show();
		preparationView.hide();
	});

	preparationView.printDinner.click(function () {
		preparationView.hide();
		summaryView.show();
	});

	summaryView.editDinner.click(function () {
		basketView.show();
		dishOverview.show();
		summaryView.hide();
	});
});
