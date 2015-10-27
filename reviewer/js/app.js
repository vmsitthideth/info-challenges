'use strict';


$(document).ready(function() {

	Parse.initialize("2qfsOTARU0KQTMTfqqVvaSuCxmB1sqEuDWbKQGee", "9zkkgo0emUFr2RZaqzm7UWbyiecdENYehaeTF427");

	var Review = Parse.Object.extend('Review');
	var myReview = new Review();

	$('.star').raty({	
	});


	$('#myForm').submit(function() {
		
		var rating = $('.star').raty('score');
		var title = $('#title').val();
		var review = $('#review').val();	

		myReview.set('rating', rating);
		myReview.set('title', title);
		myReview.set('review', review);
		myReview.save();
	});
});
