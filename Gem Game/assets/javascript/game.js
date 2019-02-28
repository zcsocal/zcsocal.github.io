$(document).ready(function() {

    //Global variables
    var wins = 0;
    var losses = 0;
    $(".wins-display").text("Wins: " + wins);
    $(".losses-display").text("Losses: " + losses);
    
    //Array of different gem images
    var gemPics = ["assets/images/bluegem.jpg", "assets/images/yellowgem.jpg", "assets/images/greengem.jpg", "assets/images/pinkgem.jpg"] 
    
    //Display gems and assign a random number to each gem
    function gemValues() {

        for (var i = 0; i < gemPics.length; i++) {
        
            var image = $("<img>");
            image.addClass("gem-buttons gem gem-image");
            image.attr("src", gemPics[i]);
            image.attr("data-letter", Math.floor(Math.random() * 12) +1);
            $("#gemstones").append(image);
            
            
        }
       
    }

    function playGame() {

        
        var counter = 0;
        $(".user-guess").text("Your points: " + counter); 


        //Generates random number 
        var targetNumber = Math.floor(Math.random() * (120-19) + 19);
            

        //And displays it on the browser
        $(".number-to-guess").html("<h2>Number you must match: " + targetNumber + "</h2>");
            // console.log(targetNumber);


        //The following will run when the user clicks a gem
        $(".gem-buttons").on("click", function() {
            


        
            //If you click a gem pic, a random number between 1 - 12 will be assigned to it.
            gemIsClicked = true;

            var gemValue = Math.floor(Math.random() * (12-1) + 1);

            //Then, those points will be added to the point counter 
            counter += gemValue;

        
            
            // console.log(gemValue);
            // console.log(counter);
            
            $(".user-guess").text("Your points: " + counter);
            
            if (counter === targetNumber) {
            alert("Good job! You win!");
            wins++;
            $(".wins-display").text("Wins: " + wins);
            
            //Important! This empties out the gems ---//
            $("#gemstones").empty();
            gemValues();
            playGame();
            }
            
            else if (counter >= targetNumber) {
            alert("Oops! You lose! Try again.");
            losses++;
            $(".losses-display").text("Losses: " + losses);

        
            //Important! This empties out the gems ---//
            $("#gemstones").empty();
            gemValues();
            playGame();
            }
            
        });
    }
    

    //This will call the functions all over again. 
    //The gem values will be reset and the game will then be played

    gemValues();
    playGame();

});