var userID = -1;
var token = sessionStorage.getItem("userID");
var newUser = false;
var physicsTopicDisplay = $('#topic-display');
var gambleAmountDisplay = $('#gamble-display');
var choice = '';
var freeze = false;
var correct = new Audio('assets/sounds/correct.mp3');
var wrong = new Audio('assets/sounds/wrong.mp3');
var gotStar = new Audio('assets/sounds/star.mp3');
var questionNumberCorrect = 0;
var initialMaxCoins = 100


console.log(token)
if (token === null)
{
	$('#loginModal').modal("show")
}

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

	database.ref("users/"+userID).once("value").then(function(snap)
	{
		coinsOverTime = snap.val().coinsOverTime
		coins = snap.val().coins
		coinsOverTime.push(coins)

		database.ref("users/"+userID).update(
		{
			coinsOverTime: coinsOverTime
		})

		if (coins < 10)
		{
			console.log("twice here?")
			getSomeHelp()
		}	
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

var starCheck = function()
{
	database.ref("users/"+userID).once("value", function(snap)
	{
		var coins = snap.val().coins
		var stars = snap.val().stars
		var maxCoins = initialMaxCoins * Math.pow(10, stars)

		console.log("Amount of coins to next star: "+maxCoins)

		if (coins > maxCoins)
		{
			var width = $(window).width()
			var height = $(window).height()

			$('#you-got-a-star').css("width", width)
			$('#you-got-a-star').css("height", height)

			gotStar.play()
			$('#you-got-a-star').fadeIn()

			setTimeout(function()
			{
				$('#you-got-a-star').fadeOut()

			},2000)

			var newCoins = coins - maxCoins;
			var newStars = stars + 1;

			database.ref("users/"+userID).update(
			{
				coins: newCoins,
				stars: newStars
			})

			updateCoinsOverTime()
		}

	})
}

var displayStars = function()
{
	$('#stars-container').html("")
	database.ref("users/"+userID).once("value", function(snap)
	{
		var numberOfStars = snap.val().stars

		for (var i=0; i<numberOfStars; i++)
		{
			$('#stars-container').append('<i class="fa fa-star fa-2x" aria-hidden="true"></i>')
		}
	})
}

var nextStarDisplay = function()
{
	database.ref("users/"+userID).once("value", function(snap)
	{
		var stars = snap.val().stars;
		var nextStar = initialMaxCoins * Math.pow(10,stars)
		$('#next-star').html(nextStar.toLocaleString())
	})
}

var getSomeHelp = function()
{
	$('#lowCoinsModal').modal('show')

	$('#get-10-help-coins').on('click', function(event)
	{
		console.log("Boop")
		database.ref("users/"+userID).update(
		{
			coins: 10
		})

		console.log("About to add 10 to coinsOVerTime")
		updateCoinsOverTime()

		$('#lowCoinsModal').modal('hide')
	})
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
			displayStars()
			nextStarDisplay()

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

			if (snap.val()[i].bought !== undefined && snap.val()[i].bought.leaderboard.bought)
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
		console.log("User updated twice?")
		var coins = snap.val()[userID].coins
		var updateCoins = coins.toLocaleString()
		$('#coins-display').html(updateCoins)

		updateGambleButtons(coins);
		updateTopicChoices()
		displayStars()
		nextStarDisplay()		
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
