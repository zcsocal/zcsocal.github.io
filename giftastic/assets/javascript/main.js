

//The standard JQUERY document ready
//Once page is loaded run the following function
$( document ).ready(function() {

    // This is our initial array of search items. Additional search items will be added to this by the user
    var snlGifTerms = ["Lunch Lady", "The Californians", "David S. Pumpkins", "Debbie Downer", "Land Shark", "Bass O Matic"];
 

    // This function displays the buttons using the snlGifTerms array items
    function displayGifButtons(){
        $("#buttonsView").empty(); // Empties the previous results
        //Starting at Lunch Lady and until we get to the end
        //we will loop through the array, creating a button tag, adding classes of skit and bootstrap btn btn-primary
        //the result is <button class="skit btn btn-primary" data-name="Lunch Lady">Lunch Lady</button>

        for (var i = 0; i < snlGifTerms.length; i++){
            var gifButton = $("<button>"); //no closing bracket is required
            gifButton.addClass("skit");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", snlGifTerms[i]);
            gifButton.text(snlGifTerms[i]); //pulls from the search term array with each loop and puts between button tags
            $("#buttonsView").append(gifButton); //sticks a button on the end of the last one.
        }
    }
    // Function to add a new skit button from user input
    function addButton(){
        $("#addGif").on("click", function(){ //When user clicks the submit button
        var skit = $("#skit-input").val().trim(); //Whitespace is removed
        if (skit == ""){
          return false; // If there isn't anything in the text area, the button isn't created.
        }
        snlGifTerms.push(skit); //Push the skit into the snlGifTerms
    
        displayGifButtons();
        return false;
        });
    }
    
    
    // Diaplay the GIFS

    function displayGifs(){
        var skit = $(this).attr("data-name"); //this will be inserted into the API query URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + skit + " saturday night live" + "&api_key=G9Nv9WdEWuShapfJYlVkeNhefqTQVMfv&limit=20";
        console.log(queryURL); //It works! The keywords show up as well
        $.ajax({  //GETS the query
            url: queryURL,
            method: 'GET'
        })

        //Once the query is successful
        
        .done(function(response) {
            console.log(response); //Works! We are pulling a reaponse with data

            $("#gifsView").empty(); //Any gifs already displayed are emptied
            var results = response.data; //We are takeing from the data portion of the response
            
            for (var i=0; i<results.length; i++){  //Loop through as before appying tags, attributes, etc
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifImage = $("<img>");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                //This is the specific parts of the query we will target to 
            
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of snlGifTerms already created
    addButton();
   


    // Document Event Listeners
    $(document).on("click", ".skit", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    