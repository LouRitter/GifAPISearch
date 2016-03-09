	var musicians = [];
	    $('.music').on('click', function(){
	    	//STEP ONE: study the html above. Look at all the data attributes. Run the file in the browser. Look at the images. After you fill in steps 1 and 2 you'll be able to pause gifs from giphy.
	    	//STEP TWO: make a variable named state and then reference the button's data-state into it. Do not use .data('state'). It won't work the way we expect.
	    	//---------------FILL IN CODE HERE FOR STEP TWO----------------------------
	        var state = $(this).attr('data-state'); 
	        //----------------------------------------------------
        	/*STEP THREE: 
        		* if variable state is equal to 'still' then 
        			* update the src attribute of this image that you clicked on to what data-animate is equal to for this image
        			* and update the data-state attribute to 'animate'
        		* if state does not equal 'still' then 
        			* update the src attribute of this image that you clicked on to what data-still is equal to for this image
        			* and update the data-state attribute to 'still'
			*/
        	//---------------FILL IN CODE HERE FOR STEP THREE----------------------------
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	    });


	function renderButtons(){ 

		$('#buttonsView').empty();
		for (var i = 0; i < musicians.length; i++){
		    var a = $('<button>')
		    a.addClass('music');
		    a.attr('data-music', musicians[i]);
		    a.text(musicians[i]);
		    $('#buttonsView').append(a);

		}
	}
	renderButtons();
	$('#addMusic').on('click', function(){

		var music = $('#music-input').val().trim();
		musicians.push(music);
		$("#music-input").val('');
		renderButtons();
		return false;
	});

	function appendNewButton(music){ 
	    var a = $('<button>')
	    a.addClass('music');
	    a.attr('data-music', music);
	    a.text(music);
	    $('#buttonsView').append(a);
	}
	$('#addMovie').on('click', function(){
		var music = $('#music-input').val().trim();
		musicians.push(music);
	});
	function musicGif () {
		$(".musicDiv").empty();
        var p = $(this).data('music');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(musicians);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                

            console.log(response)
            console.log(queryURL)

             
                var results= response.data
                

                for (var i = 0; i < results.length; i++) {

                    var musicDiv=$("<div class='musicDiv'>");
                    var rating= results[i].rating;
                    var p= $("<p>").text("Rating:" + rating);
                   	var musicImage = $('<img>');
                    musicImage.attr('src', results[i].images.fixed_height_still.url);
                    musicImage.attr('data-still', results[i].images.fixed_height_still.url);
                    musicImage.attr('data-animate', results[i].images.fixed_height.url);
                    musicImage.attr('data-state', "still");
                    musicImage.attr('class', "musicImage");
					
	function animateClick(){
		var state = $(this).attr('data-state');

		if (state == 'still'){
	        $(this).attr('src', $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    }else{
	        $(this).attr('src', $(this).data('still'));
	        $(this).attr('data-state', 'still');
	    }
	};
                    musicDiv.append(p);
                    musicDiv.append(musicImage)

                    $('#musicView').prepend(musicDiv); 
                };                   
              $(document).on('click','.musicImage',animateClick)
                 });	
};

$(document).on('click','.music', musicGif);
