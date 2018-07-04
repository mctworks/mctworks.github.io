var playerScore = 0;
var cpuScore = 0;
var roundLimit = 0;
var currentRound = 1;
var repeatedMove = {type:"null", count:0};

function startGame(){
	roundLimit = document.forms["startmenu"]["roundoption"].value;
	document.getElementById("score").innerHTML = "Player: " + playerScore + "   CPU: " + cpuScore + "<br>Round " + currentRound + " of " + roundLimit;
}

function cpuChooses(){
	var userChoice = $("input[name=rpsoption]:checked").val() //getElementById isn't used to get the value because I had to use different IDs for the CSS to work.
	var computerChoice = Math.random();
	if (computerChoice < 0.11){
		computerChoice = "rock";
	}
	else if(computerChoice < 0.22){
		computerChoice = "paper";
	}
	else if(computerChoice < 0.33){
		computerChoice = "scissors";
	}
	else if(computerChoice < 0.44){
		computerChoice = "gun";
	}
	else if(computerChoice < 0.55){
		computerChoice = "water";
	}
	else if(computerChoice < 0.66){
		computerChoice = "air";
	}
	else if(computerChoice < 0.77){
		computerChoice = "sponge";
	}
	else if(computerChoice < 0.88){
		computerChoice = "human";
	}
	else if(computerChoice < 1){
		computerChoice = "fire";
	}
	getPlayerChoice(userChoice,computerChoice);
};

function getPlayerChoice(choice1,choice2){
	var playerChoice;
	/*The computer will not select a tie if repeatedMove count is more than 4. 
	Even if the computer selects a tie, checkWinner()'s punishment check will 
	change it to a losing condition before the score is tallied.*/
    if(choice1==choice2 && repeatedMove.count < 4){
        document.getElementById("results").innerHTML = "This round is a TIE!";
		//Ties don't affect the repeatedMove counter. This is intentional. Only the round updates.
		updateRound()
	}
	//The algorithm in checkWinner() looks for the position of playerChoice's 
	//attributes' arrays to determine round results and the proper adjective.
    else if(choice1=="rock"){
		playerChoice = {type: "rock", strong: ["sponge", "scissors", "fire", "human"], weak: ["gun", "paper", "water", "air"], winAdj: ["squishes", "breaks", "stomps out", "falls on"], loseAdj: ["targets", "covers", "erodes", "greatly erodes"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1=="paper"){
		playerChoice = {type: "paper", strong: ["water", "rock", "air", "gun"], weak: ["sponge", "scissors", "human", "fire"], winAdj: ["floats on", "covers", "fans", "outlaws"], loseAdj: ["soaks", "cuts", "writes", "sets ablaze"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "scissors"){
		playerChoice = {type: "scissors", strong: ["air", "paper", "human", "sponge"], weak: ["fire", "rock", "gun", "water"], winAdj: ["swishes through", "cuts", "slices the hand of", "slices through"], loseAdj: ["melts", "breaks", "outclasses", "greatly rusts"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "fire"){
		playerChoice = {type: "fire", strong: ["scissors", "human", "sponge", "paper"], weak: ["gun", "air", "rock", "water"], winAdj: ["melts", "burns", "scorches", "sets ablaze"], loseAdj: ["is powered by", "blows out", "stomps out", "extinguishes"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "water"){
		playerChoice = {type: "water", strong: ["gun", "scissors", "rock", "fire"], weak: ["paper", "human", "air", "sponge"], winAdj: ["rusts", "greatly rusts", "erodes", "extinguishes"], loseAdj: ["floats on", "drinks", "evaporates", "absorbs"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "human"){
		playerChoice = {type: "human", strong: ["air", "sponge", "water", "paper"], weak: ["gun", "fire", "scissors", "rock"], winAdj: ["breathes", "cleans with", "drinks", "writes"], loseAdj: ["shoots", "burns", "slices the hand of", "falls on"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "sponge"){
		playerChoice = {type: "sponge", strong: ["paper", "gun", "air", "water"], weak: ["rock", "human", "fire", "scissors"], winAdj: ["soaks", "cleans", "uses pockets of", "absorbs"], loseAdj: ["squishes", "cleans with", "scorches", "slices through"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "air"){
		playerChoice = {type: "air", strong: ["gun", "fire", "water", "rock"], weak: ["scissors", "sponge", "paper", "human"], winAdj: ["tarnishes", "blows out", "evaporates", "greatly erodes"], loseAdj: ["swishes through", "uses pockets of", "floats on", "breathes"]};
		checkWinner(playerChoice, choice2)
	}
	else if(choice1== "gun"){
		playerChoice = {type: "gun", strong: ["rock", "fire", "scissors", "human"], weak: ["sponge", "air", "water", "paper"], winAdj: ["targets", "is powered by", "outclasses", "shoots"], loseAdj: ["cleans", "tarnishes", "rusts", "outlaws"]};
		checkWinner(playerChoice, choice2)
	}
};

function countMoves(plyr){
	if (plyr.type != repeatedMove.type){
		repeatedMove.type = plyr.type;
		repeatedMove.count = 1;
	}
	else if (plyr.type == repeatedMove.type){
		repeatedMove.count++;
	}
}

function checkWinner(playerObj, cpuChoice){
	countMoves(playerObj)
	var scrCode;
	//Punishment condition: If a player uses the same type four or five times, the computer automatically wins
	if (playerObj.type == repeatedMove.type && repeatedMove.count > 3 && repeatedMove.count <= 5){
		var randomPunish = Math.floor(Math.random() * 3)
		cpuChoice = playerObj.weak[randomPunish];
	}
	else if (playerObj.type == repeatedMove.type && repeatedMove.count > 5){ //Using the same move more than 5 times yields the worst defeat
		cpuChoice = playerObj.weak[3];
	}
	
	for(i = 0; i < 4; i++){
		if(cpuChoice == playerObj.strong[i]){
			document.getElementById("results").innerHTML = "<b>" + playerObj.type + "</b> " + playerObj.winAdj[i] + " " + cpuChoice;
			i++
			scrCode = i + "p";
		}
		else if(cpuChoice == playerObj.weak[i]){
			document.getElementById("results").innerHTML = cpuChoice + " " + playerObj.loseAdj[i] + " <b>" + playerObj.type + "</b>";
			i++
			scrCode = i + "c";
		}
	}
	tallyScore(scrCode)
};

function tallyScore(scoreCode){
	if(scoreCode == "1p"){
		playerScore++;
	}
	else if(scoreCode == "2p"){
		playerScore+=2;
	}
	else if(scoreCode == "3p"){
		playerScore+=3;
	}
	else if(scoreCode == "4p"){
		playerScore+=5;
	}
	else if(scoreCode == "1c"){
		cpuScore++;
	}
	else if(scoreCode == "2c"){
		cpuScore+=2;
	}
	else if(scoreCode == "3c"){
		cpuScore+=3;
	}
	else if(scoreCode == "4c"){
		cpuScore+=5;
	}
	updateRound()
}

function updateRound(){
	currentRound++;
	document.getElementById("score").innerHTML = "Player: " + playerScore + "   CPU: " + cpuScore + "<br>Round " + currentRound + " out of " + roundLimit;
	if (currentRound > roundLimit){
		if (playerScore > cpuScore){
			document.getElementById("score").innerHTML = "You Win!<br>Player: " + playerScore + "   CPU: " + cpuScore;
		}
		else if (playerScore < cpuScore){
			document.getElementById("score").innerHTML = "WOW! YOU LOSE!<br>Player: " + playerScore + "   CPU: " + cpuScore;
		}
		else {
			document.getElementById("score").innerHTML = "Tie Game!!<br>Player: " + playerScore + "   CPU: " + cpuScore;
		}
		setTimeout(function(){
			window.location.reload(1);
		}, 4000);
	}
}

$(document).ready(function() {	
	
	var id = '#dialog';
	
	//Get the screen height and width
var maskHeight = $(document).height();
var maskWidth = $(window).width();

//Set height and width to mask to fill up the whole screen
$('#mask').css({'width':maskWidth,'height':maskHeight});

//transition effect
$('#mask').fadeIn(500);	
$('#mask').fadeTo("slow",0.9);	

//Get the window height and width
var winH = $(window).height();
var winW = $(window).width();

//Set the popup window to center
$(id).css('top',  winH/2-$(id).height()/2);
$(id).css('left', winW/2-$(id).width()/2);

//transition effect
$(id).fadeIn(2000); 	

//if close button is clicked
$('.window .close').click(function (e) {
	//Cancel the link behavior
	e.preventDefault();
	
	$('#mask').hide();
	$('.window').hide();
});

/* //if mask is clicked
	$('#mask').click(function () {
	$(this).hide();
	$('.window').hide();
}); */

});