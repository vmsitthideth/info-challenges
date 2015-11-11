// Vichit Mike Sitthideth
// INFO 343B

'use strict';

// adds UI BOOTSTRAP module
angular.module('DawgCoffeeApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])
.config(function($stateProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html'
		})
		.state('order', {
			url: '/orders',
			templateUrl: 'partials/orders.html',
			controller: 'OrderCtrl'
		})
		.state('bean', {
			url: '/orders/bean-{id}',
			templateUrl: 'partials/bean.html',
			controller: 'BeanCtrl'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'partials/cart.html',
			controller: 'CartCtrl'
		})
})
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

//  Controller for Order page.  Lists all products.
.controller('OrderCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
		$http.get('data/products.json').then(function(response) {
			$scope.products = response.data;
		});	

}])

// Controller for bean detail page.  Adds new beans to cart.
.controller('BeanCtrl', ['$scope', '$http', '$stateParams', '$filter', 'cart', function($scope, $http, $stateParams, $filter, cart) {
	$http.get('data/products.json').then(function(response) {
	   	$scope.product = $filter('filter')(response.data, { 
	      id: $stateParams.id 
	   	}, true)[0]; 
 	});

 	$scope.addToCart = function(product) {
 		cart.saveCart(product);
 		cart.saveStorage(product);
 	};

}])

// Controller for Cart page.  Loads what's in the cart for the page.
.controller('CartCtrl', ['$scope', '$http', '$uibModal', 'cart', function($scope, $http, $uibModal, cart) {
	$scope.myCart = cart.cartList;

	// Calculates the final cost of the order
	$scope.totalCost = function() {
		var total = 0;
		angular.forEach(cart.cartList, function(product) {
			total += product.quantity * product.price;
		});
		return total;
	};

	// Submits the order and resets the cart to empty
	$scope.submit = function() {
		$scope.myCart.length = 0;
		cart.saveStorage();
	}
}])


// service for cart list
.factory('cart', function() {
	var service = {};
	service.cartList = [];

	if(localStorage.getItem("store")) {
		service.cartList = JSON.parse(localStorage.getItem("store"));
	}
	service.saveStorage = function() {
		localStorage.setItem("store", angular.toJson(service.cartList));
	}
	service.saveCart = function(product) {
		service.cartList.push(product);
		service.saveStorage();
	}
	return service;
})