$(document).ready(function(){
  
    
  
  // Event listeners 
  // 
    $("#remaining-time").hide(); //Called within the gameStart function after start button is clicked
    $("#start").on('click', trivia.gameStart); //On click calls the function gameStart
    $(document).on('click' , '.option', trivia.guessChecker);
    $('#question').hide();
    
  })

  // Game object
  //This create a variable called trivia which will contain game options, questions with coresponding options and correct answers for the browset to compare.

  
  
  var trivia = {
    
    //These are the options for the game
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',

    
    // This object holds the questions answer options, and the correct answers
    questions: {
      q1: 'The season one opening sequence refers to which artwork by Leonardo da Vinci?',
      q2: 'Who wrote and directed the 1973 version?',
      q3: 'Which actor did NOT have a role in the 1973 film?',
      q4: 'What are the androids that populate the park called?',
      q5: 'What is the name of the actress who plays this Deloris?',
      q6: "The discovery of what object causes Dolores' father to malfunction?",
      q7: "'These violent delights have violent ends' is from which Shakespeare play?",
      q8: "What book does Bernard ask Dolores to read a passage from in episode 3, The Stray?",
      q9: "Which of these Radiohead song played on the automatic piano? ",
      q10: "What's the name of the border town on the outskirts of Westworld?"
    },
    options: {
      q1: ['The Ventruvian Man', 'Mona Lisa', 'The Last Supper', 'Annunciation'],
      q2: ['Stephen Spielberg', 'Michael Crichton', 'Fred Karlin', 'Francis Ford Coppola'], 
      q3: ['Yul Brynner', 'Richard Benjamin', 'James Brolin', 'Betty White'],
      q4: ['Players', 'Guests', 'BuddyBots', 'Hosts'],
      q5: ['Alexandra Breckinridge','Ashley Benson','Blake Lively','Evan Rachel Wood'],
      q6: ['A Photograph','A Camera','A Credit Card','A Cell Phone'],
      q7: ['Romeo and Juliet', 'Macbeth', 'Hamelet','Othelo'],
      q8: ['The Marvelous Land of Oz', 'Metamorphosis', 'Adventures in Wonderland','Do Androids Dream of Electric Sheep?'],
      q9: ['Fake Plastic Trees', 'Motion Picture Soundtrack', 'No Surprises','Creep'],
      q10: ['Valencia', 'Las Cruces', 'Portales','Las Mudas'],
    },
    answers: {
      q1: 'The Ventruvian Man',
      q2: 'Michael Crichton',
      q3: 'Betty White',
      q4: 'Hosts',
      q5: 'Evan Rachel Wood',
      q6: 'A Photograph',
      q7: 'Romeo and Juliet',
      q8: 'Adventures in Wonderland',
      q9: 'Creep',
      q10: 'Las Mudas',
    },
  


    // Start Game
    //On start click the stats are set to 0, 
    //the game section opens op, 
    //old results are emptied 
    //and the timer starts
    //instructions are removed
    //start button is removed
    //first question is asked


    gameStart: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();

      $('#question').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#instructions').hide();

      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    // Each question is advanced using the following 
    nextQuestion : function(){
      
      // Timer is set 
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // Regulates spead of timer
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // The questions are pulled from the question value
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // The answer options are called
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // The options are put into the DOM in 
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button onmousedown="clicksound.play()" class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // If timer runs out before player answers 
      //unanswered is incremented
      //the result is set to false
      //timer is cleared
      //a sound is played
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        var clicksound = new Audio ('assets/sounds/wrong.mp3');
        clicksound.play();
        $('#results').html("<h3>Time's up! The correct answer is "+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }

      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // Results (correct, incorrect, unanswered) are added to the page
        $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unanswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // Show the start button again to give replay option
        $('#start').show();
      }
      
    },
    // Check the answer 
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct Answer!</h3>');
        var correct = new Audio ('assets/sounds/correct.mp3');
        correct.play();
      }

      
      // If choice is incorrect
      else{
        
        // Button is turned "danger" red
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Nope! The correct answer is '+ currentAnswer +'</h3>');
        var clicksound = new Audio ('assets/sounds/wrong.mp3');
        clicksound.play();
      }
      
    },



    // Remove previous questions/possbile answers
    guessResult : function(){
      
      // Go to next question
      trivia.currentSet++;
      
     
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }