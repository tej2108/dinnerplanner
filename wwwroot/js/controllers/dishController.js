var DishController = function (view, model) {
	view.addDishToMenuBtn.click(function () {
		console.log(model.activeDish);
		model.addActiveDishToMenu();
	});
}
