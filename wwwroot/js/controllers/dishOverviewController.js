var DishOverviewController = function (view, model, app) {
	view.filterBtn.click(function () {
		view.filterDishes();
	});

	view.container.on('click', '.view-dish-info', function (e) {
		app.viewDishInfo(parseInt(e.target.id.replace('dish-', '')));
	});
}