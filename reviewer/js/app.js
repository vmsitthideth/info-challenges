// Vichit Mike Sitthideth
// INFO 343 B

'use strict';

$(document).ready(function() {

	Parse.initialize("2qfsOTARU0KQTMTfqqVvaSuCxmB1sqEuDWbKQGee", "9zkkgo0emUFr2RZaqzm7UWbyiecdENYehaeTF427");
	var Review = Parse.Object.extend('Review');
	var myReview = new Review();
	var query = new Parse.Query(Review);

	$('.star').raty({	
	});

	//	Function that sends given values to Parse
	$('#myForm').submit(function(event) {
		event.preventDefault();
		var rating = $('.star').raty('score');
		var title = $('#title').val();
		var review = $('#review').val();
		var upVote = 0;
		var downVote = 0;

		myReview.set('rating', rating);
		myReview.set('title', title);
		myReview.set('review', review);
		myReview.set('upVote', upVote);
		myReview.set('downVote', downVote);
		myReview.save();

		location.reload();
		return false;
	});
	
	//  Loops through each ID, pulls categories, and displays each category
	var getData = function() {
		query.find({
			success: function(results) {
				var totalRating = 0;
				var userCount = 0;
				results.forEach(function(data) {
					var newTitle = "<h2>" + data.get('title') + "</h2>";
					var newReview = data.get('review');
					var newRating = $("<div></div>").raty({
							readOnly: true,
							score: data.get('rating')
					});
					var helpful = data.get('upVote');
					var unhelpful = data.get('downVote');

					var userReview = "<div id='" + data.objectID + "'>" + newTitle + '<br>' + '<p>' + newReview + '</p></div>';

					var voteTotal = helpful + unhelpful;

					var useful = "<p id ='votes'>" + helpful + " out of " + voteTotal + " people agree</p>";

					var section = $("<div class='section'></div>");

					var erase = "<button type='button' class='btn-default erase'><i class='fa fa-eraser'></i></button>";

					var thumbUp = "<button type='button' class='btn-default btn-vote thumbUp'><i class='fa fa-thumbs-up'></i></button>";

					var thumbDown = "<button type='button' class='btn-default btn-vote thumbDown'><i class='fa fa-thumbs-down'></i></button>";

					$('#submittedReview').append(section);
					$(section).append(newRating);
					$(section).append(thumbDown + thumbUp);
					$(section).append("<div id='userReview'>" + userReview + "</div>");
					totalRating += data.get('rating');
					userCount++;
					$(section).append(useful);
					$(section).append(erase);
				})
				$('.averageStar').raty({
					readOnly: true,
					score: totalRating / userCount
				});
			}
		})
	};

	//  Function that enables the deletion of a review upon clicking the delete icon
	$(document).on('click', '.erase', function() {
		var parent = $(this).parent();
		var id = $(parent).attr("id");
		var query = new Parse.Query(Review);
		query.equalTo("objectID", id);
		query.find({
			success: function(results) {
				results.forEach(function(data) {
					data.destroy();
					data.save();
					location.reload();
				})
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		})
	})

	//  Function that allows for thumbs up rating
	$(document).on('click', '.thumbUp', function() {
		var parent = $(this).parent();
		var id = $(parent).attr("id");
		var query = new Parse.Query(Review);
		query.equalTo("objectID", id);
		query.find({
			success: function(results) {
				results.forEach(function(data) {
					data.increment('upVote');
					data.save();
					location.reload();
				})
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		})
	})

	//  Function that allows for thumbs down rating
	$(document).on('click', '.thumbDown', function() {
		var parent = $(this).parent();
		var id = $(parent).attr("id");
		var query = new Parse.Query(Review);
		query.equalTo("objectID", id);
		query.find({
			success: function(results) {
				results.forEach(function(data) {
					data.increment('downVote');		
					data.save();
					location.reload();
				})
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		})
	})

	//	Calls getData to fetch all the reviews
	getData();
});
