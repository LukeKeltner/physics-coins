var userID = -1;
var token = sessionStorage.getItem("userID");
var newUser = false;
var physicsTopicDisplay = $('#topic-display');
var gambleAmountDisplay = $('#gamble-display');
var choice = '';
var freeze = false;
var correct = new Audio('assets/sounds/correct.mp3');
var wrong = new Audio('assets/sounds/wrong.mp3');

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
	var gamble2 = Math.floor(coins/7);
	var gamble3 = Math.floor(coins/3);
	var gamble4 = Math.floor(coins/2);
	var gamble5 = coins;

	$('#gamble1').html(gamble1)
	$('#gamble2').html(gamble2)
	$('#gamble3').html(gamble3)
	$('#gamble4').html(gamble4)
	$('#gamble5').html(gamble5)
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
			$('#coins-display').html(snap.val()[i].coins)

			if (snap.val()[i].refreshed)
			{
				alert("You just lost 10 coins!")
				var newCoins = snap.val()[i].coins - 10;
				database.ref("users/"+i).update(
				{
					refreshed: false,
					coins: newCoins
				})

				updateGambleButtons(newCoins)
			}

			else
			{
				var coins = snap.val()[userID].coins;
				updateGambleButtons(coins);		
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

		$('#newUserModal').modal('hide')
	})
})

database.ref("users").on('value', function(snap)
{
	if (userID !== -1)
	{
		$('#coins-display').html(snap.val()[userID].coins)

		var coins = snap.val()[userID].coins;
		updateGambleButtons(coins);
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

	database.ref("users/"+userID).update(
	{
		gamble: gambleAmount
	})

	$('#questionModal').modal('show');
	$('#question-topic').html(topic)
	$('#gamble-amount').html(gambleAmount)

	console.log($('#questionModal').hasClass('hide'))
	window.onunload = function()
	{
		database.ref("users/"+userID).update(
		{
			refreshed: true
		})
	}

	database.ref("questions/"+topic).once("value", function(snap)
	{
		var questionBank = snap.val()
		var r = Math.floor(Math.random() * questionBank.length);

		$('#question-text').html(questionBank[r].question)

		buttons = []
		var button1 = $("<button type='button' class='btn btn-default btn-block answer' id='correct'></button>")
		button1.html(questionBank[r].correct)
		buttons.push(button1)

		for (var i=0; i<3; i++)
		{
			var button = $("<button type='button' class='btn btn-default btn-block answer' id='wrong'></button>")
			button.html(questionBank[r].wrong[i])
			buttons.push(button)
		}

		buttons = shuffleArray(buttons)

		$('#question1Div').html(buttons[0])
		$('#question2Div').html(buttons[1])
		$('#question3Div').html(buttons[2])
		$('#question4Div').html(buttons[3])
	})
})

$(document).on('click', '.answer', function(event)
{
	$('.answer').attr('class', 'btn btn-default btn-block answer')
	$('.answer').removeClass('clicked')
	$(this).attr('class', 'btn btn-primary btn-block answer')
	choice = $(this).attr('id')
	$(this).addClass('clicked')
	console.log(choice)
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
			correct.play()
			newCoins = coins + 2*gamble
			console.log("You got it right!")
			$('.clicked').css("font-size", "80px")
			$('.clicked').html("+"+2*gamble)
			$('.clicked').attr('class', 'btn btn-success btn-block answer')
		}

		else
		{
			wrong.play()
			newCoins = coins - gamble
			console.log("You are wrong!")
			$('.clicked').css("font-size", "80px")
			$('.clicked').html("-"+gamble)
			$('.clicked').attr('class', 'btn btn-danger btn-block answer')
		}

		database.ref("users/"+userID).update(
		{
			coins: newCoins
		})

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