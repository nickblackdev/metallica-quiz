// Question Controller
var questionsController = (function() {
    // Create Question Data
    var Question = function(question, options, correct) {
        this.question = question;
        this.options = options;
        this.correct = correct;
    };

    Question.prototype.loadQuestions = function(questionIndex) {

        var questionContainer = document.querySelector('.question');
        var option1 = document.querySelector('.one');
        var option2 = document.querySelector('.two');
        var option3 = document.querySelector('.three');
        var option4 = document.querySelector('.four');
        var option5 = document.querySelector('.five');
        var option6 = document.querySelector('.six');

        questionContainer.textContent = questions[questionIndex].question;
        option1.textContent = questions[questionIndex].options[0];
        option2.textContent = questions[questionIndex].options[1];
        option3.textContent = questions[questionIndex].options[2];
        option4.textContent = questions[questionIndex].options[3];
        option5.textContent = questions[questionIndex].options[4];
        option6.textContent = questions[questionIndex].options[5];
  
    };

    var q1 = new Question('Life it seems will fade away. Drifting further every day.', ['Fade To Black', 'One', 'Battery', 'Master of Puppets', 'Blackened', 'Creeping Death'], 'Fade To Black');
    var q2 = new Question('I took all of his money. And it was a pretty penny. I took all of his money.', ['Whisky in the Jar', 'Enter Sandman', 'Master of Puppets', 'One', 'Of Wolf and Man', 'Orion'], 'Whisky in the Jar');
    var q3 = new Question('Die by my hand. I creep across the land. Killing the firstborn man.', ['Ride the Lightning', 'Damage Inc.', 'Escape', 'Fixxer', 'Mama Said', 'Creeping Death'], 'Creeping Death');

    var questions = [q1, q2, q3];

    return {
        testing: function() {
            //console.log(questions);
        },
        loadQuestion: Question.prototype.loadQuestions,
        questions: questions
    };
    


})();

// UI Controller
var UIController = (function() {
    // DOM variables
    var DOMstrings = {
        startBtn: '.start',
        scoreBar: 'scoreBar',
        score: 'score',
        currentQuestion: 'currentQuestion',
        timer: 'timer',
        quiz: 'quiz',
        options: 'options',
        option:'.option',
        results: 'results',
        finalScore: 'finalScore',
        resetBtn: 'reset'
    };


    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        updateScore: function(score) {
            document.getElementById(DOMstrings.score).textContent = score;
        },
        updateCurrentQuestion: function(currentQuestion, totalQuestions) {
            document.getElementById(DOMstrings.currentQuestion).textContent = currentQuestion + 1 + '/' + totalQuestions;
        },
        hideQuiz: function() {
            document.getElementById(DOMstrings.results).style.display = 'none';
            document.getElementById(DOMstrings.scoreBar).style.opacity = 0;
            document.getElementById(DOMstrings.quiz).style.display = 'none';
        },
        showQuiz: function() {
            document.getElementById(DOMstrings.scoreBar).style.opacity = 1;
            document.getElementById(DOMstrings.quiz).style.display = 'block';
        },
        showResults: function(score) {
            document.getElementById(DOMstrings.quiz).style.display = 'none';
            document.getElementById(DOMstrings.scoreBar).style.opacity = 0;
            document.getElementById(DOMstrings.results).style.display = 'block';
            document.getElementById(DOMstrings.finalScore).textContent = score;
        }
    };

})();

//Controller
var controller = (function(questionsCtrl, UICtrl) {
    // Get DOM variables
    var DOM = UICtrl.getDOMstrings();

    var questionNumber = 0;
    var currentQuestion = 1;
    var score = 0;
    var totalQuestions = questionsCtrl.questions.length;

    var setupEventListeners = function() {
        // Start the quiz when the start button is clicked
        document.querySelector(DOM.startBtn).addEventListener('click', function() {
            UICtrl.showQuiz();
            questionsCtrl.loadQuestion(questionNumber);
            document.getElementById('start').style.display = 'none';
        });

        // Check if selected option is correct and change questions
        document.getElementById(DOM.options).addEventListener('click', checkAnswer);
        
    };


    var checkAnswer = function(event) {

        var correctAnswer = questionsCtrl.questions[questionNumber].correct;

        if (event.target.textContent === correctAnswer) {
            score++;
            UICtrl.updateScore(score);
        } else {
           
        }

        questionNumber++;
        changeQuestion();
        
    }

    var changeQuestion = function() {

        UICtrl.updateCurrentQuestion(questionNumber, totalQuestions);
        
        if (questionNumber < questionsCtrl.questions.length) {
            questionsCtrl.loadQuestion(questionNumber);
            console.log(questionsCtrl.questions.length);
        } else {
            // Show results
            UICtrl.showResults(score);
        }
        
    }

    return {
        init: function() {
            // Hide initial elements
            UICtrl.hideQuiz();
            document.getElementById(DOM.currentQuestion).textContent = currentQuestion + '/' + totalQuestions;
            document.getElementById(DOM.score).textContent = 0;
            document.getElementById(DOM.timer).textContent = 0;
            // Setup Event Listeners
            setupEventListeners();
        }
    };

})(questionsController, UIController);

controller.init();

function reset() {
    location.reload();
}