
//
// A variation on the game of war.
// Each player is dealt half of the deck. Each player then deals the top card on their deck. The player
// with the higher rank card wins the hand, and gets to put their card back in the deck. The loser has to discard
// their card. The game ends when one of the players has no more cards. Who ever wins the most hands, wins the game.
//
//



function Queue() {
	this.queue = [];
	this.enqueue = function(aCard) {
		return this.queue.push(aCard);
	}
	this.dequeue = function() {
		return this.queue.shift();
	}
	this.front = function() {
		return this.queue[0];
	}
	this.back = function() {
		return this.queue[this.queue.length - 1];
	}
	this.isEmpty = function() {
		if (this.queue.length == 0) {
			return true;
		} else {
			return false;
		}
	}
	this.count = function() {
		return this.queue.length;
	}
}

function Deck() {
	this.cards = [];
	this.count = function() {
		return this.cards.length;
	}
	this.init = function() {
		for (s = 1; s <= 4; s++) {
			for (r = 1; r <= 13; r++) {
			this.cards.push(new Card(r, s))
			}	
		}
	}
	this.deal = function(player1, player2) {
		var random_index;
		var removed_card;
		while (this.cards.length > 0) {
		//give player 1 half the deck
		random_index = Math.floor(Math.random() * this.cards.length);
		removed_card = this.cards.splice(random_index, 1)[0];
		player1.enqueue(removed_card);
		//give player 2 the other half
		random_index = Math.floor(Math.random() * this.cards.length);
		removed_card = this.cards.splice(random_index, 1)[0];
		player2.enqueue(removed_card);
		}
	}
}

function Card(rank, suit) {
	this.rank = rank;
	this.suit = suit;
	this.namesuit;
	this.namerank;
	this.show = function() {
		console.log(this.rank + " of " + this.suit);
	}
	this.showCard = function() {
		if (this.suit == 1) {
			this.namesuit = "Clubs";
		} else if (this.suit == 2) {
			this.namesuit = "Spades";
		} else if (this.suit == 3) {
			this.namesuit = "Diamonds";
		} else if (this.suit == 4) {
			this.namesuit = "Hearts";
		}
		if (this.rank == 11) {
			this.namerank = "Jack";
		} else if (this.rank == 12) {
			this.namerank = "Queen";
		} else if (this.rank == 13) {
			this.namerank = "King";
		} else if (this.rank == 1) {
			this.namerank = "Ace";
		} else if (this.rank == 2) {
			this.namerank = "Two";
		} else if (this.rank == 3) {
			this.namerank = "Three";
		} else if (this.rank == 4) {
			this.namerank = "Four";
		} else if (this.rank == 5) {
			this.namerank = "Five";
		} else if (this.rank == 6) {
			this.namerank = "Six";
		} else if (this.rank == 7) {
			this.namerank = "Seven";
		} else if (this.rank == 8) {
			this.namerank = "Eight";
		} else if (this.rank == 9) {
			this.namerank = "Nine";
		} else if (this.rank == 10) {
			this.namerank = "Ten"
		}
		console.log(this.namerank + " of " + this.namesuit);
		return this.namerank + " of " + this.namesuit;
	}
}


$(document).ready(function(){


	$("#button").click(function(){

	$("ul").empty(); //empty all unordered lists before game starts
	var player_1_name;
	var player_2_name;
	var score_1 = 0;
	var score_2 = 0;
	var tie = 0;
	var card_dealt;

	player_1_name = $("#player1").val();
	player_2_name = $("#player2").val();

	d = new Deck;
	d.init();
	p1 = new Queue;
	p2 = new Queue;

	//create 2 players and deal them each 26 cards

	d.deal(p1,p2);

	while (p1.count() > 0 && p2.count() > 0) {
		console.log("Player 1 Hand: ");
		$("#deck").append("<li>" + player_1_name + "'s Hand: " + p1.front().showCard() + "</li>");
		p1.front().showCard();
		console.log("Player 2 Hand: ");
		$("#deck").append("<li>" + player_2_name + "'s Hand: " + p2.front().showCard() + "</li>");
		p2.front().showCard();
		if (p1.front().rank > p2.front().rank) {
			card_dealt = p1.dequeue();
			p2.dequeue();
			score_1++;
			p1.enqueue(card_dealt);
			console.log("Player 1 Wins");
			$("#deck").append("<li>" + player_1_name + " Wins</li>");
			$("#deck").append("<li><hr></li>");
		} else if (p1.front().rank < p2.front().rank) {
			p1.dequeue();
			card_dealt = p2.dequeue();
			score_2++;
			p2.enqueue(card_dealt);
			console.log("Player 2 Wins");
			$("#deck").append("<li>" + player_2_name + " Wins</li>");
			$("#deck").append("<li><hr></li>")
		} else if (p1.front().rank == p2.front().rank) {
			p1.dequeue();
			p2.dequeue();
			tie++;
			console.log("It's a Tie!");
			$("#deck").append("<li>It's a Tie!</li>");
			$("#deck").append("<li><hr></li>");

		} else {
			console.log("I'm not sure what's going on. This is probably an error!");
		}
	}

	console.log("Player 1 Score: " + score_1 + ", Player 2 Score: " + score_2 + ", Tie: " + tie);
	console.log("Player 1 Card Count: " + p1.count() + " Player 2 Card Count: " + p2.count());
	$("#winner").append("<li>" + player_1_name + "'s Score: " + score_1 + "<br>" + player_2_name + "'s Score: " + score_2 + "<br> Tie: " + tie + "</li>");
	$("#winner").append("<li>" + player_1_name + "'s Card Count: " + p1.count() + "<br>" + player_2_name + "'s Card Count: " + p2.count() + "</li>");
	$("#winner").append("<li><hr></li>");

	if (score_1 > score_2) {
		console.log("Player 1 is the Winner");
		$("#winnerh3").text("And the winner is...")
		$("#winner").append("<li><strong>" + player_1_name + " is the winner!</strong></li>");
	} else if (score_1 < score_2) {
		console.log("Player 2 is the Winner");
		$("#winnerh3").text("And the winner is...")
		$("#winner").append("<li><strong>" + player_2_name + " is the winner!</strong></li>");
	} else if (score_1 == score_2) {
		console.log("It's a tie!");
		$("#winnerh3").text("And the winner is...")
		$("#winner").append("<li><strong>It's a tie!</strong></li>");
	}
	});
}); //on ready