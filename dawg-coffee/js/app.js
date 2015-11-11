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
			url: '/orders/cart',
			templateUrl: 'partials/cart.html',
			controller: 'CartCtrl'
		})
})
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

// Controller for Order page
.controller('OrderCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
		$http.get('data/products.json').then(function(response) {
			$scope.products = response.data;
		});	

}])

.controller('BeanCtrl', ['$scope', '$http', '$stateParams', '$filter', 'cartList', function($scope, $http, $stateParams, $filter, cartList) {
	$http.get('data/products.json').then(function(response) {
	   	$scope.product = $filter('filter')(response.data, { 
	      id: $stateParams.id 
	   	}, true)[0]; 
 	});

 	$scope.addToCart = function(bean) {
 		cartList.saveCart(bean);
 		cartList.addToStorage(bean);
 	}
}])

.controller('CartCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
		$http.get('data/products.json').then(function(response) {
			$scope.products = response.data;
		});	
}])


// service for cart list
.factory('cartList', function() {
	var service = {};
	service.cartList = [];
	if (localStorage.getItem("basket")) {
		service.cartList = JSON.parse(localStorage.getItem("basket"));
	}
	service.saveCart = function(product) {
		service.cartList.push(product);
		service.addToStorage();
	};
	service.addToStorage = function() {
		localStorage.setItem("basket", angular.toJson(service.cardList));
	}

	return service;
})