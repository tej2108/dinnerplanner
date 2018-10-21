var BasketController = function (view, model) {
	view.numberOfGuests.change(function () {
		model.setNumberOfGuests(view.numberOfGuests.val());
	});
}
