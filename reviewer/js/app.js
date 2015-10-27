'use strict';


$(document).ready(function() {

	Parse.initialize("2qfsOTARU0KQTMTfqqVvaSuCxmB1sqEuDWbKQGee", "9zkkgo0emUFr2RZaqzm7UWbyiecdENYehaeTF427");

	var Review = Parse.Object.extend('Review');
	var myReview = new Review();
	var query = new Parse.Query(Review);

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
		var upVote = 0;
		var downVote = 0;

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

	query.find({
		success: function(results) {
			results.forEach(function(data) {
				var newTitle = data.get('title');
				var newReview = data.get('review');
				var newRating = data.get('rating');
				var userReview = '<br>' + newTitle + '<br>' + newRating + '<br>' + newReview + '<br>';
				
				$('#submittedReview').append(userReview);
			})
		}
	})
});
