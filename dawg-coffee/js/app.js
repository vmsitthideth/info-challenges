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
			templateURL: 'partials/cart.html',
			controller: 'CartCtrl'
		})
})
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

.controller('OrderCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
		$http.get('data/products.json').then(function(response) {
			$scope.products = response.data;
		});	

}])

.controller('BeanCtrl', ['$scope', '$http', '$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {
	$http.get('data/products.json').then(function(response) {
	   	$scope.product = $filter('filter')(response.data, { 
	      id: $stateParams.id 
	   	}, true)[0]; 
 	});
}])

// .controller('CartCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
// 	$scope.cart = 
// }])


// service for cart list
// .factory('cart', function() {
// 	var service = {};
// 	service.cart = [];

// 	service.saveCart = function(product) {
// 		service.cart.push(product);
// 	};

// 	return service;
// })