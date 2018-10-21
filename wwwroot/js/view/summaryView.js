var SummaryView = function (container, model) {
	this.update = function () {
		let content = '';
		const dishes = model.getSelectedDishes();
		for (let i = 0; i < dishes.length; i++) {
			const dish = dishes[i];

			content += '<div class="row"><div class="col-md-6">';
			content += '<div class="card mb-3">';

			content += '<img class="bg-dark img-fit card-img-top img-fit img-dish" src="' + dish.image + '" alt="' + dish.name + '">';
			content += '<div class="card-body p-3">';

			content += '<h5 class="card-title mb-0">';
			content += dish.title + ' - ' + dish.pricePerServing + 'kr</h5>';

			content += '</div></div></div>';
			content += '<div class="col-md-6"><p>' + dish.instructions + '<p></div></div>';
		}

		container.find('#dishes-to-view').empty().append(content);
	}

	model.addObserver(this.update);

	this.editDinner = container.find('#btn-edit-dinner-summary');

	this.hide = function () {
		model.removeObserver(this.update);
		container.hide();
	}

	this.show = function () {
		model.addObserver(this.update);
		container.show();
	}
}
