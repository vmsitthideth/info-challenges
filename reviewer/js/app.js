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

	$('.userRating').raty({
  score: function() {
    return $(this).attr('data-score');
  }
});

	//	Function that sends given values to Parse
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
	});

	query.find({
		success: function(results) {
			results.forEach(function(data) {
				var newTitle = "<h2>" + data.get('title') + "</h2>";
				var newReview = data.get('review');
				var newRating = $("<div></div>").raty({
						readOnly: true,
						score: data.get('rating')
					});
				var userReview = "<div id='" + data.id + "'>" + newTitle + '<br>' + '<p>' + newReview + '</p></div>';

				var section = $("<div class='section'></div>");
				$('#submittedReview').append(section);
				$(section).append(newRating);
				$(section).append("<div id='userReview'>" + userReview + "</div>");
			})
		}
	})
});
