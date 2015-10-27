'use strict';


$(document).ready(function() {

	Parse.initialize("2qfsOTARU0KQTMTfqqVvaSuCxmB1sqEuDWbKQGee", "9zkkgo0emUFr2RZaqzm7UWbyiecdENYehaeTF427");

	var Review = Parse.Object.extend('Review');
	var myReview = new Review();

	$('.averageStar').raty({
	});

	$('.star').raty({	
	});


	$('#myForm').submit(function(event) {
		event.preventDefault();
		console.log("raklfksd");
		var rating = $('.star').raty('score');
		var title = $('#title').val();
		var review = $('#review').val();	

		myReview.set('rating', rating);
		myReview.set('title', title);
		myReview.set('review', review);
		myReview.save();

		// myReview.save({
		// 	Title: $('#title').val(),
		// 	Review: $('#review').val(),
		// 	Rating: $('.star').raty('score')
		// });
	});

	$('#submittedTitle').text("Place Holder for Reviews");
	$('#submittedScore').text("Place Holder for Reviews");
	$('#submittedDescription').text("Place Holder for Reviews");
});
