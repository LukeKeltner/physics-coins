var userID = -1;
var token = sessionStorage.getItem("userID");
var newUser = false;
var physicsTopicDisplay = $('#topic-display');
var gambleAmountDisplay = $('#gamble-display');
var choice = '';
var freeze = false;
var correct = new Audio('assets/sounds/correct.mp3');
var wrong = new Audio('assets/sounds/wrong.mp3');
var questionNumberCorrect = 0;

var shuffleArray = function(array)
{
	var result = []

	for (var i=0; i<array.length; i++)
	{
		var r = Math.floor(Math.random()*array.length)
		result.push(array[r])
		array.splice(r, 1)
		i = i - 1
	}		

	return result
}

var updateGambleButtons = function(coins)
{
	var gamble1 = Math.floor(coins/10);
	var gamble2 = Math.floor(coins/7)+1;
	var gamble3 = Math.floor(coins/3)+1;
	var gamble4 = Math.floor(coins/2);
	var gamble5 = coins;

	gamble1 = gamble1.toLocaleString()
	gamble2 = gamble2.toLocaleString()
	gamble3 = gamble3.toLocaleString()
	gamble4 = gamble4.toLocaleString()
	gamble5 = gamble5.toLocaleString()

	//Can't add with commas!

	$('#gamble1').html(gamble1)
	$('#gamble2').html(gamble2)
	$('#gamble3').html(gamble3)
	$('#gamble4').html(gamble4)
	$('#gamble5').html(gamble5)
}

var updateCoinsOverTime = function()
{
	var coinsOverTime = []
	var coins = 0;

	database.ref("users/"+userID).once("value", function(snap)
	{
		coinsOverTime = snap.val().coinsOverTime
		coins = snap.val().coins
	})

	coinsOverTime.push(coins)

	database.ref("users/"+userID).update(
	{
		coinsOverTime: coinsOverTime
	})
}


//There is an undefined element issue in the user object.  Also, this is garbage, use .then()!
var updateTopicChoices = function()
{
	var topics = []
	var user = []

	database.ref("users/"+userID).once("value").then(function(snap2)
	{
		user = snap2.val()

		database.ref("questions").once("value").then(function(snap)
		{
			topics = snap.val()

			for (var key in topics)
			{
				if (user[key]!==undefined)
				{
					var numberCorrect = 0;

					for (var question in user[key])
					{
						numberCorrect = numberCorrect + 1;
					}

					if (numberCorrect === topics[key].length)
					{
						key = key.replace(/\s+/g, '');
						key = key.replace("'", "")
						$('#'+key).attr('class', 'btn btn-success btn-lg btn-block')
						$('#'+key).prop('disabled', true);
					}
				}
			}
		})
	})
}

var getSomeHelp = function()
{
	$('#lowCoinsModal').modal('show')

	$('#get-10-help-coins').on('click', function(event)
	{
		database.ref("users/"+userID).update(
		{
			coins: 10
		})

		$('#lowCoinsModal').modal('hide')
	})

	$('#lowCoinsModal').modal('hide')
}

database.ref("users").once('value', function(snap)
{
	for (var i=0; i<snap.val().length; i++)
	{
		if (snap.val()[i].token === token)
		{
			userID = i;
			$("#welcome").html(snap.val()[i].name)
			newUser = snap.val()[i].new
			$('#coins-display').html(snap.val()[i].coins.toLocaleString())

			updateTopicChoices()

			if (snap.val()[i].refreshed)
			{
				var newCoins = snap.val()[i].coins - snap.val()[i].gamble;


				$('#refreshedModal').modal("show")
				$('#coins-lost').html(snap.val()[i].gamble.toLocaleString())

				$('#lose-coins').on('click', function(event)
				{	

					$('#refreshedModal').modal("hide")	
				})

					database.ref("users/"+userID).update(
					{
						refreshed: false,
						coins: newCoins
					})		
					
					updateGambleButtons(newCoins)
					updateCoinsOverTime()
			}

			else
			{
				var coins = snap.val()[userID].coins;
				updateGambleButtons(coins);		
			}

			console.log(snap.val()[i].bought.leaderboard.bought)

			if (snap.val()[i].bought.leaderboard.bought)
			{
				$('#leaderboard').show()
			}
		}
	}

	if (newUser)
	{
		$('#newUserModal').modal('show')
	}

	$('#get-10-coins').on('click', function(event)
	{
		database.ref("users/"+userID).update(
		{
			coins: 10,
			new: false
		})

		updateCoinsOverTime()

		$('#newUserModal').modal('hide')
	})
})

database.ref("users").on('value', function(snap)
{
	if (userID !== -1)
	{
		var coins = snap.val()[userID].coins
		var updateCoins = coins.toLocaleString()
		$('#coins-display').html(updateCoins)

		updateGambleButtons(coins);
		updateTopicChoices()

		if (coins < 10)
		{
			getSomeHelp()
		}
	}
})

$('.physics-topic-button').on('click', function(event)
{
	var gambleAmount = gambleAmountDisplay.html()
	var clicked = $(this).attr('clicked');

	$('.physics-topic-button').attr('class', 'btn btn-default btn-lg btn-block physics-topic-button');
	$('.physics-topic-button').attr('clicked', 'false');

	if (clicked === "false")
	{
		var text = $(this).html()
		$(this).attr('class', 'btn btn-warning btn-lg btn-block physics-topic-button');
		$(this).attr('clicked', 'true');
		physicsTopicDisplay.html(text)

		if (gambleAmount !== "Pick an Amount of Coins")
		{
			$('#go-for-it').prop('disabled', false);
		}
	}

	else if (clicked === "true")
	{
		$(this).attr('class', 'btn btn-default btn-lg btn-block physics-topic-button');
		$(this).attr('clicked', 'false');
		physicsTopicDisplay.html("Pick a Topic")
		$('#go-for-it').prop('disabled', true);
	}
})

$('.gamble-amount-button').on('click', function(event)
{
	var topic = physicsTopicDisplay.html();
	var clicked = $(this).attr('clicked');

	$('.gamble-amount-button').attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
	$('.gamble-amount-button').attr('clicked', 'false');

	if (clicked === "false")
	{
		var text = $(this).html()
		$(this).attr('class', 'btn btn-warning btn-lg btn-block gamble-amount-button');
		$(this).attr('clicked', 'true');
		gambleAmountDisplay.html(text)

		if (topic !== "Pick a Topic")
		{
			$('#go-for-it').prop('disabled', false);
		}
	}

	else if (clicked === "true")
	{
		$(this).attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
		$(this).attr('clicked', 'false');
		gambleAmountDisplay.html("Pick an Amount of Coins")
		$('#go-for-it').prop('disabled', true);
	}
})

$('#go-for-it').on('click', function(event)
{
	var topic = physicsTopicDisplay.html();
	var gambleAmount = gambleAmountDisplay.html()
	gambleAmount = gambleAmount.replace(/,/g, "");
	gambleAmount = parseInt(gambleAmount);

	database.ref("users/"+userID).update(
	{
		gamble: gambleAmount
	})

	$('#questionModal').modal('show');
	$('#question-topic').html(topic)
	$('#gamble-amount').html(gambleAmount.toLocaleString())

	database.ref("questions/"+topic).once("value").then(function(snap)
	{
		var questionBank = snap.val()
		console.log("Below this!")
		console.log(questionBank)

		database.ref("users/"+userID).once("value").then(function(snap2)
		{
			var user = snap2.val()
			var numberCorrect = 0;
			var seen = true;

			var r = Math.floor(Math.random() * questionBank.length);
			questionNumberCorrect = r;

			while (numberCorrect < questionBank.length && seen)
			{
				seen = false;

				for (var key in user[topic])
				{
					if (r === parseInt(key))
					{
						seen = true;
						$('#question-text').prepend("Hey, you already got this question correct!<br>")
						r = Math.floor(Math.random() * questionBank.length);
						questionNumberCorrect = r;
					}
				}
			}

			if (numberCorrect < questionBank.length)
			{
				$('#question-text').html(questionBank[r].question)

				if (questionBank[r].hard)
				{
					$('.modal-backdrop').css('background-color', 'red')
					$('#question-text').prepend("<span style='color:#dc3545'>HARD</span><br>") 
				}

				buttons = []
				var button1 = $("<button type='button' class='btn btn-default btn-block answer'></button>")
				button1.data("data-result", "correct")
				button1.html(questionBank[r].correct)
				buttons.push(button1)

				for (var i=0; i<3; i++)
				{
					var button = $("<button type='button' class='btn btn-default btn-block answer'></button>")
					button.data("data-result", "wrong")
					button.html(questionBank[r].wrong[i])
					buttons.push(button)
				}

				buttons = shuffleArray(buttons)

				$('#question1Div').html(buttons[0])
				$('#question2Div').html(buttons[1])
				$('#question3Div').html(buttons[2])
				$('#question4Div').html(buttons[3])
			}
		})
	})

	setTimeout(function()
	{
		window.onunload = function()
		{
			if($('#questionModal').hasClass('show'))
			{
				database.ref("users/"+userID).update(
				{
					refreshed: true
				})
			}
		}
	}, 1000)

})

$(document).on('click', '.answer', function(event)
{
	$('.answer').attr('class', 'btn btn-default btn-block answer')
	$('.answer').removeClass('clicked')
	$(this).attr('class', 'btn btn-primary btn-block answer')
	choice = $(this).data('data-result')
	$(this).addClass('clicked')
})

$('#submit').on('click', function(event)
{
	if (!freeze)
	{
		var gamble = 0;
		var coins = 0;
		var newCoins = 0;
		database.ref("users/"+userID).once("value", function(snap)
		{
			gamble = snap.val().gamble
			coins = snap.val().coins
		})

		if (choice === "correct")
		{
			var topic = $('#question-topic').html()

			database.ref("users/"+userID+"/"+topic+"/"+questionNumberCorrect).set(
			{
				correct: true
			})

			correct.play()
			var wonAmount = 2*gamble
			newCoins = coins + wonAmount
			$('.clicked').css("font-size", "200%")
			$('.clicked').html("+"+wonAmount.toLocaleString())
			$('.clicked').attr('class', 'btn btn-success btn-block answer')
		}

		else
		{
			//wrong.play()
			var lostAmount = 1*gamble
			newCoins = coins - lostAmount
			$('.clicked').css("font-size", "200%")
			$('.clicked').html("-"+lostAmount.toLocaleString())
			$('.clicked').attr('class', 'btn btn-danger btn-block answer')
		}

		database.ref("users/"+userID).update(
		{
			coins: newCoins
		})

		updateCoinsOverTime()
		freeze = true;

		setTimeout(function()
		{
			$('.answer').attr('class', 'btn btn-default btn-block answer')
			$('.gamble-amount-button').attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
			$('.gamble-amount-button').attr('clicked', 'false');
			gambleAmountDisplay.html("Pick an Amount of Coins")
			$('#go-for-it').prop('disabled', true);
			$('#questionModal').modal('hide')
			freeze = false;
		}, 2000)
	}
})