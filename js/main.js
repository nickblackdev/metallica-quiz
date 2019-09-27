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

    var questions = [{
        question: "Life it seems will fade away. Drifting further every day.",
        options: ["Fade To Black", "One", "Battery", "Master of Puppets", "Blackened", "Creeping Death"],
        correct: "Fade To Black"
    },
    {
        question: "I took all of his money. And it was a pretty penny. I took all of his money.",
        options: ["Whisky in the Jar", "Enter Sandman", "Master of Puppets", "One", "Of Wolf and Man", "Orion"],
        correct: "Whisky in the Jar"
    },
    {
        question: "Die by my hand. I creep across the land. Killing the firstborn man.",
        options: ["Ride the Lightning", "Damage Inc.", "Escape", "Fixxer", "Mama Said", "Creeping Death"],
        correct: "Creeping Death"
    },
    {
        question: "What I've felt, what I've known, turn the pages, turn the stone, behind the door, should I open it for you?",
        options: ["The Unforgiven", "Hit the Lights", "Until it Sleeps", "Fuel", "Call of Ktulu", "The Unforgiven II"],
        correct: "The Unforgiven II"
    },
    {
        question: "Running, on our way. Hiding, you will pay. Dying, one thousand deaths",
        options: ["Master of Puppets", "Hit the Lights", "Until it Sleeps", "The God That Failed", "Seek and Destroy", "The Four Horsemen"],
        correct: "Seek and Destroy"
    },
    {
        question: "Fortune, fame, mirror vain, gone insane",
        options: ["The Day That Never Comes", "Hit the Lights", "2 X 4", "The Memory Remains", "Enter Sandman", "The Unforgiven"],
        correct: "The Memory Remains"
    },
    {
        question: "Flash before my eyes, now it's time to die. Burning in my brain, I can feel the flame",
        options: ["Creeping Death", "Blackened", "The Four Horsemen", "Harvester of Sorrow", "Holier Than Thou", "Ride the Lightning"],
        correct: "Ride the Lightning"
    },
    {
        question: "Say your prayers, little one. Don't forget, my son, to include everyone",
        options: ["Enter Sandman", "The End of the Line", "Wherever I May Roam", "Harvester of Sorrow", "King Nothing", "Halo On Fire"],
        correct: "Enter Sandman"
    },
    {
        question: "Come unto me and you will feel perfection Come unto me and dedicate",
        options: ["Moth Into Flame", "Spit Out the Bone", "One", "Harvester of Sorrow", "That Was Just Your Life", "Sad but True"],
        correct: "Spit Out the Bone"
    },
    {
        question: "My eyes seek reality My fingers feel for faith",
        options: ["Low Man's Lyric", "Seek and Destroy", "Battery", "The Thing That Should Not Be", "Atlas, Rise!", "The Unforgiven"],
        correct: "Low Man's Lyric"
    }];
    
    return {
        loadQuestion: Question.prototype.loadQuestions,
        questions: questions,
        testing: function() {
            //console.log(questions);
        },
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
            
            if (score < 2) {
                document.querySelector('.results-header').textContent = 'What a disaster!';
            } else {
                document.querySelector('.results-header').textContent = 'You\'re metal!';
            }
        },
        startTimer: function() {
            // 10 minute countdown
            var time_in_minutes = 10;
            var current_time = Date.parse(new Date());
            var deadline = new Date(current_time + time_in_minutes*60*1000);

            function time_remaining(endtime){
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor( (t/1000) % 60 ).toLocaleString(undefined,{minimumIntegerDigits: 2});
                var minutes = Math.floor( (t/1000/60) % 60 ).toLocaleString(undefined,{minimumIntegerDigits: 2});
                var hours = Math.floor( (t/(1000*60*60)) % 24 );
                var days = Math.floor( t/(1000*60*60*24) );
                return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
            }

            function run_clock(id,endtime){
                var clock = document.getElementById(id);
                function update_clock(){
                    var t = time_remaining(endtime);
                    clock.innerHTML = t.minutes + ':' + t.seconds;
                    if(t.total<=0){ clearInterval(timeinterval); }
                }
                update_clock(); // run function once at first to avoid delay
                var timeinterval = setInterval(update_clock,1000);
            }
            run_clock(DOMstrings.timer,deadline);

            setInterval(function() {
                var time = document.getElementById(DOMstrings.timer).textContent;
                if(time == '0:00') {
                    document.getElementById(DOMstrings.quiz).style.display = 'none';
                    document.getElementById(DOMstrings.scoreBar).style.opacity = 0;
                    document.getElementById(DOMstrings.results).style.display = 'block';
                    document.querySelector('.results-header').textContent = 'You ran out of time!';
                    document.getElementById(DOMstrings.finalScore).style.display = 'none';
                }
            },1000);
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
            UICtrl.startTimer();
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