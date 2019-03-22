/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

 //0 is first player, 1 is second player

var scores, roundScore, currPlayer, gamePlaying, prevRoll, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying){
		//Random Number

		var dice = Math.floor(Math.random()*6)+1;
		var dice2 = Math.floor(Math.random()*6)+1;
		var currTurn = true;
		console.log(dice);
		console.log(dice2);

		//Show Random Number
		var diceDOM = document.querySelector('.dice');
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-'+dice+'.png';
		diceDOM2.style.display = 'block';
		diceDOM2.src = 'dice-'+dice2+'.png';

		//If not 1, add Rumber Number current Round Score
		handleDice(dice);
		function handleDice(dice){
			if (dice !== 1){
				if (dice === 6 && prevRoll === 6){
					console.log('DOUBLE 6\'s');
					scores[currPlayer] = 0;
					roundScore = 0;
					document.getElementById('score-'+currPlayer).textContent = scores[currPlayer];
					switchPlayer();

				}
				else{
					roundScore += dice; 
					document.getElementById('current-'+currPlayer).textContent = roundScore;
					if (currTurn == true){
						currTurn = false;
						handleDice(dice2);
					}

				}

			}
			else if (dice === 1){
				roundScore = 0;
				switchPlayer();
			}
			prevRoll = dice;
		}
	}
});

//.btn-roll
document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying){
		scores[currPlayer]+=roundScore;
		roundScore = 0;

		var winScore = document.querySelector('.final-score').value ? document.querySelector('.final-score').value: 20;
		console.log(winScore);
		document.getElementById('current-'+currPlayer).textContent = 0;
		document.getElementById('score-'+currPlayer).textContent = scores[currPlayer];
		if (scores[currPlayer] >= winScore){
			document.getElementById("name-"+currPlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			document.querySelector('.player-'+currPlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+currPlayer+'-panel').classList.remove('active');
			gamePlaying = false;


			//player wins game
			//end game
		}
		else{
			switchPlayer();
		}
	}
});

function switchPlayer(){
	document.querySelector('.dice').style.display = 'none';
	if (document.querySelector('dice2') != undefined){
		document.querySelector('dice2').style.display = 'none';
	}
	document.getElementById('current-'+currPlayer).textContent = 0;
	document.querySelector('.player-'+currPlayer+'-panel').classList.toggle('active');
	currPlayer === 1 ? currPlayer = 0 : currPlayer = 1;
	document.querySelector('.player-'+currPlayer+'-panel').classList.toggle('active');
	prevRoll = null;

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	roundScore = 0;
	currPlayer = 0;
		winScore = 20;/*updateWinVal();*/ //parseInt(prompt("Enter the max score to play to!"));
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById("name-"+'0').textContent = 'PLAYER 1';
	document.getElementById("name-"+'1').textContent = 'PLAYER 2';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-'+'1'+'-panel').classList.remove('active');
	document.querySelector('.player-'+'0'+'-panel').classList.remove('active');
	document.querySelector('.player-'+'0'+'-panel').classList.add('active');
	document.querySelector('.player-'+'0'+'-panel').classList.remove('winner');
	document.querySelector('.player-'+'1'+'-panel').classList.remove('winner');


}
/*function updateWinVal(){
	console.log("this is executed");
	var temp1 = document.getElementById("form1")
	console.log(temp1.elements);
	var y;
	if (y == undefined){
		return 20;
	}
	else{
		return y;
	}
}*/