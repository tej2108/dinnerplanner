//DinnerModel Object constructor
var DinnerModel = function () {
	var numberOfGuests = 2;
	var selectedDishes = [];
	var observers = [];
	var activeDish;

	this.setActiveDish = function (dish) {
		activeDish = dish;
	}

	this.addObserver = function(observer) { observers.push(observer); }

	this.notifyObservers = function (details) {
		for (let i = 0; i < observers.length; i++)
			observers[i](this, details);
	}

	this.removeObserver = function(observer) {
		for (let i = 0; i < observers.length; i++) {
			if (observers[i] === observer) {
				observers.splice(i, 1);
			}
		}
	}

	this.setNumberOfGuests = function (num) {
		numberOfGuests = num;
		this.notifyObservers();
	}

	this.getNumberOfGuests = function () {
		return numberOfGuests;
	}

	// Returns the dish that is on the menu for selected type
	this.getSelectedDish = function (type) {
		return selectedDishes[type];
	}

	this.getSelectedDishes = function () {
		return selectedDishes;
	} 

	// Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function () {
		let total = 0;
		for (let i = 0; i < selectedDishes.length; i++) {
			total += selectedDishes[i].pricePerServing;
		}
		return total * this.getNumberOfGuests();
	}

	// Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalDishPrice = function (price) {
		return price * this.getNumberOfGuests();
	}

	// Adds the passed dish to the menu. If the dish of that type already exists on the menu
	// it is removed from the menu and the new one added.
	this.addActiveDishToMenu = function() {
		selectedDishes.push(activeDish);
		this.notifyObservers();
	}

	// function that returns a dish of specific ID
	this.getDish = function (id, callback, errorCallback) {
		$.ajax({
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=' + id + '&includeNutrition=false',
			headers: {
				'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			},
			success: function (data) {
				callback(data[0]);
			},
			error: function (error) {
				errorCallback(error);
			}
		});
	}

	// Removes dish from menu
	this.removeDishFromMenu = function (id) {
		for (let i = 0; i < selectedDishes.length; i++) {
			if (selectedDishes[i].id === id) {
				selectedDishes.splice(i, 1);
				this.notifyObservers();
				return;
			}
		}
	}

	// function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	// you can use the filter argument to filter out the dish by name or ingredient (use for search)
	// if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type, filter, callback, errorCallback) {
		let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?';
		if (type) url += 'type=' + type;
		if (filter) url += (type ? '&' : '') + 'query=' + filter.toLowerCase();

		$.ajax({
			url: url,
			headers: {
				'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			},
			success: function(data) {
				callback(data);
			},
			error: function(error) {
				errorCallback(error);
			}
		});
	}

	this.getAllTypes = function () {
		return [
			'main course',
			'side dish',
			'dessert',
			'appetizer',
			'salad',
			'bread',
			'breakfast',
			'soup',
			'beverage',
			'sauce',
			'drink'
		];
	}
}
