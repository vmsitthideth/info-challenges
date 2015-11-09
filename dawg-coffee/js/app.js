// Vichit Mike Sitthideth
// INFO 343B

'use strict';

// adds UI BOOTSTRAP module
angular.module('DawgCoffeeApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])
.config(function($stateProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateURL: 'partials/home.html',
		})
		.state('order', {
			url: '/orders',
			templateURL: 'partials/orders.html',
			controller: 'OrderCtrl'
		})
		.state('bean', {
			url: '/orders/bean-{id}',
			templateURL: 'partials/bean.html',
			controller: 'BeanCtrl'
		})
		// .state('cart', {
		// 	url: '/cart',
		// 	templateURL: 'partials/cart.html',
		// 	controller: 'CartCtrl'
		// })
})
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})

.controller('OrderCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
	$http.get('data/products.json').then(function(response) {
		$scope.products = response.data;
	});

}])

.controller('BeanCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
	$http.get('data/products.json').then(function(response) {
		$scope.products = response.data;

	});
}])

.controller('CartCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

}])