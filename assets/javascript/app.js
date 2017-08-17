$(document).ready(function() {

//Questions, choices and correct answers.
var questionList = [{
	question: "What fuel can be produced by fermenting sugar cane, sawdust, corn, or wood chips?",
	answerArray: ["Peat", "Uranium", "Alcohol", "Kerosene"],
	correctAnswer: "C. Alcohol"
},{
	question: "All of these are examples of good soil conservation measures except:",
	answerArray: ["contour plowing", "cultivation of soil", "cover crops", "crop rotation"],
	correctAnswer: "B. cultivation of soil"
},{
	question: "Geographically, farming began in:",
	answerArray: ["North America", "China", "South America", "The fertile Crescent"],
	correctAnswer: "D. The fertile Crescent"
},{
	question: "Which of the following green manure crops contains highest amount of nitrogen?",
	answerArray: ["Dhaincha", "Sunhemp", "Cow Pea", "Guar"],
	correctAnswer: "A. Dhaincha"
},{
	question: "Soil factors are otherwise known as:",
	answerArray: ["Climatic factors", "Edaphic factors", "Biotic factors", "Physiographic factors"],
	correctAnswer: "B. Edaphic factors"
},{
	question: "How much of America's soil is still at risk of erosion?",
	answerArray: ["10%", "35%", "55%", "All of it"],
	correctAnswer: "B. 35%"
},{
	question: "How long does it take nature to build an inch of topsoil?",
	answerArray: ["Less than 10 years", "25 years", "50 to 100 years", "200 to 1,000 years"],
	correctAnswer: "D. 200 to 1,000 years"
},{
	question: "Today, how many more bushels of corn can be yielded from an acre of cropland than in 1935?",
	answerArray: ["It's the same amount", "10 more bushels", "100 more bushels", "200 more bushels"],
	correctAnswer: "C. 100 more bushels"
},{
	question: "How much of rain and snow first falls on private lands before it makes its way into our rivers and lakes?",
	answerArray: ["None of it, it soaks right in and doesn't run-off.", "55%", "68%", "88%"],
	correctAnswer: "D. 88%"
},{
	question: "What portion of most soils is organic matter?",
	answerArray: ["5%", "24%", "68%", "75%"],
	correctAnswer: "A. 5%"
}];

//Global Variables
var counter = 21;
var questionNumber = 0;
var selectedAnswer;
var timerDigits;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;
$("#time-remaining").hide();


//Sets up function of start button, generates first question and starts timer.
$('#startBtn').on('click', function(){
	$(this).hide();
	$("#instructions").hide();
	$("#time-remaining").show();
	$(".main-image").hide();
	$(".main-image-text").hide();

	generateText();
	stopwatch();
});

//Sets up the timer.
function stopwatch() {
	timerDigits = setInterval(seconds, 1000);
	function seconds() {
		if (counter === 0) {
			clearInterval(timerDigits);
			timeoutLoss();
		}
		if (counter > 0) {
			counter--;
		}

		$(".timer").html(counter);

		//test
		console.log("timer started");
	}
}

//Generates the question with its choices.
function generateText() {
	$("#display").html("<h3>" + questionList[questionNumber].question + "</h3><h4 class='choice'>A. " + questionList[questionNumber].answerArray[0] + "</h4><h4 class='choice'>B. "+questionList[questionNumber].answerArray[1]+"</h4><h4 class='choice'>C. "+questionList[questionNumber].answerArray[2]+"</h4><h4 class='choice'>D. "+questionList[questionNumber].answerArray[3]+"</h4>");

}

//Generates the next question and choices.
function nextQuestion() {
	if (questionNumber < 9) {
		questionNumber++;
		generateText();
		counter = 21;
		stopwatch();
	}
	else {
		finalScreen();
	}
}

//Links clicking on the correct/incorrect answer with the correct/incorrect function
$("#display").on("click", ".choice", function(){
	selectedAnswer = $(this).text();
	if(selectedAnswer === questionList[questionNumber].correctAnswer) {
		//correct
		clearInterval(timerDigits);
		addWin();
	}
	else {
		//incorrect
		clearInterval(timerDigits);
		addLoss();
	}
}); 

//When a player runs out of time.
function timeoutLoss() {
	totalUnanswered++;
	$("#display").html("<h3>Time's up!  The correct answer is: <h3 class='green'>" + questionList[questionNumber].correctAnswer + "</h3></h3>");
	setTimeout(nextQuestion, 3000); 

	//test
	console.log("Unanswered: " + totalUnanswered);
}

//When a player answers correctly.
function addWin() {
	totalCorrect++;
	$("#display").html("<h3>Correct! The answer is:  <h3 class='green'>" + questionList[questionNumber].correctAnswer + "</h3></h3>");
	setTimeout(nextQuestion, 3000); 

	//test
	console.log("Correct: " + totalCorrect);
}

//When a player guesses incorrectly.
function addLoss() {
	totalIncorrect++;
	$("#display").html("<h3>Wrong! The correct answer is: <h3 class='green'>"+ questionList[questionNumber].correctAnswer + "</h3></h3>");
	setTimeout(nextQuestion, 3000);

	//test
	console.log("Incorrect: " + totalIncorrect);
}

//Displays total correct, incorrect and unanswered scores. Button for player to restart the quiz.
function finalScreen() {
	$("#content").html("<h3>All done, here's how you did!" + "</h3>" + "Correct Answers: " + totalCorrect + "</p>" + "<p>Wrong Answers: " + totalIncorrect + "</p>" + "<p>Unanswered: " + totalUnanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg restart-button'>Reset The Quiz!</a></p>");
	$("#content").show();
	$("#time-remaining").hide();
	$("#display").hide();

	//test
	console.log("Unanswered: " + totalUnanswered);
	console.log("Correct: " + totalCorrect);
	console.log("Incorrect: " + totalIncorrect);

} 

//Resets the game and scores.
function resetGame() {
	$("#content").hide();
	questionNumber = 0;
	totalCorrect = 0;
	totalIncorrect = 0;
	totalUnanswered = 0;
	generateText();
	$("#time-remaining").show();
	$("#display").show();
	stopwatch();
}

//Reset button function at the end of the game.
$("#content").on("click", ".restart-button", function(){
	resetGame();
});

}); 