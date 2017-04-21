var ws_root = 'http://jsonplaceholder.typicode.com';


$(document).ready(function(){

var rand_user  = Math.floor((Math.random() * 10) + 1); // random number from 1 to 100
var rand_photo  = Math.floor((Math.random() * 200) + 1); // random number from 1 to 100

console.log(rand_user);
	// Usuario data
	$.ajax({
	  "url": ws_root + '/users/' + rand_user,
	  "method": "GET"
	}).done(function(data) {
		var user_data = null;
		if(typeof data != 'object') {
			user_data = JSON.parse(data);	
		} else {
			user_data = data;
		}

		var user_card = $('.content_us');
		$.each(user_card.find('.c_info').children('p'), function (k, v){
			var element = $(v);
			var user_data_key = element.data('form');
			if(typeof user_data[user_data_key] != 'undefined' ) {
				if(user_data_key == 'company'){
					element.html(user_data[user_data_key]['name']);
				}else{
					element.html(user_data[user_data_key]);
				}	
			}
		});
	});

// Usuario data


	$.ajax({
	  "url": ws_root + '/photos/' + rand_photo,
	  "method": "GET"
	}).done(function(data) {
		var photo_data = null;
		if(typeof data != 'object') {
			photo_data = JSON.parse(data);	
		} else {
			photo_data = data;
		}

		console.log(data);

		$('.c_img').find('img').attr('src', photo_data.url);
		$('.c_img').find('img').attr('data-img_id', photo_data.id);


	});

	$('.next, .back').click(function() {

		var this_button = $(this);
		var actual_photo = $('.c_img').find('img').attr('data-img_id');
		var photo_id = 1;
		if(this_button.hasClass("next")) {
			photo_id = parseInt(actual_photo)+1;
		}else{
			if(actual_photo >1){
				photo_id = parseInt(actual_photo)-1;
			}else{
				photo_id = actual_photo;
			}
			
		}


		$.ajax({
		  "url": ws_root + '/photos/' + photo_id,
		  "method": "GET"
		}).done(function(data) {
			var photo_data = null;
			if(typeof data != 'object') {
				photo_data = JSON.parse(data);	
			} else {
				photo_data = data;
			}

			console.log(data);
			$('.c_img').find('img').attr('src', photo_data.url);
			$('.c_img').find('img').attr('data-img_id', photo_data.id);


		});
	});

});
