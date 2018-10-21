var PreparationView = function (container, model) {
	this.editDinner = container.find('#btn-edit-dinner-overview');

	this.printDinner = container.find('#btn-confirm-dinner-summary');

	this.update = function () {
		let content = '<div class="row">';
		const dishes = model.getSelectedDishes();

		for (let i = 0; i < dishes.length; i++) {
			const dish = dishes[i];
			let dishContent = '<div class="col-md-3">';

			// check if its a new row
			if (i !== 0 && i % 3 === 0) {
				dishContent = '<div class="w-100"></div>';
			}

			dishContent += '<div class="card mb-3">';
			dishContent += '<img class="bg-dark img-fit card-img-top img-fit img-dish" src="' + dish.image + '" alt="' + dish.name + '">';

			dishContent += '<div class="card-body p-3">';
			dishContent += '<h5 class="card-title mb-0">';

			dishContent += dish.title + ' - ' + dish.pricePerServing + 'kr</h5>';
			dishContent += '</div></div>';

			// append dish to view
			content += dishContent + '</div>';
		}

		container.find('#dishes-to-print').empty().html(content);
	}

	model.addObserver(this.update);

	this.hide = function () {
		model.removeObserver(this.update);
		container.hide();
	}

	this.show = function () {
		model.addObserver(this.update);
		container.show();
	}
}
