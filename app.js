$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // the lines below are the questions that will come up. They are about songs/rap
    questions: {
      q1: 'Which rapper has won the most Grammys?',
      q2: 'How many Grammys did Tupac win?',
      q3: 'Which rapper has won "best rap album?',
      q4: 'What was Chance The Rappers first album?',
      q5: "Which rapper doesn't have their own lable",
    },
    options: {
      q1: ['Kanye West', 'Kendrick Lamar', 'Jay-Z', 'Eminem'],
      q2: ['2', '1', '0', '3'],
      q3: ['Chance The Rapper', 'Eminem', 'Kanye West', 'Drake'],
      q4: ['Acid Rap', '3', '10 Day'],
      q5: ['Drake','J. Cole','Chance The Rapper','Jay-Z'],
    },
    answers: {
      q1: 'Jay-Z',
      q2: '0',
      q3: 'Eminem',
      q4: '10 Day',
      q5: 'Chancer The Rapper',
    },
 
    startGame: function(){
      // the lines below will restart the game after the user/player is done
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);

      // the lines below are the guide lines for the the start of the game, what will happen when the start button is clicked and so on.
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      trivia.nextQuestion();
      
    },
  
    nextQuestion : function(){
      // when a new question pops up the player/user will only have 20 seconds to make a guess afte that the next question will appear
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // the line below is so that the timer doesn't speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
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
      // when the time has run out and the answer has not been answered run the lines below 
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Play again!</p>');
      }
    }
    // I could not figure out how to show a new start button once the game was finished.
    // I also had trouble when it caeme to fact checking the answer choosen with the correct answer. 
    // This was one of the harder assignments and i think i did most of the parts that i knew and understood,
    // but there was somethings that i had trouble with.
    