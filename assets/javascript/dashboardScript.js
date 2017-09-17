userID = -1;
var token = sessionStorage.getItem("userID");
var newUser = false;
var physicsTopicDisplay = $('#topic-display')
var gambleAmountDisplay = $('#gamble-display')

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
	}
})

$('#go-for-it').on('click', function(event)
{
	var topic = physicsTopicDisplay.html();
	var gambleAmount = gambleAmountDisplay.html()

	if (topic === "Pick a Topic" || gambleAmount === "Pick an Amount of Coins")
	{
		console.log("Not everything is specified. ")
	}

	var coins = 0;

	database.ref("users/"+userID).once('value', function(snap)
	{
		coins = snap.val().coins;
	})

	coins = coins + 1;

	database.ref("users/"+userID).update(
	{
		coins: coins
	})
})
















$('.physics-topic-button').on('click', function(event)
{
	var clicked = $(this).attr('clicked');
	$('.physics-topic-button').attr('class', 'btn btn-default btn-lg btn-block physics-topic-button');
	$('.physics-topic-button').attr('clicked', 'false');

	if (clicked === "false")
	{
		var text = $(this).html()
		$(this).attr('class', 'btn btn-success btn-lg btn-block physics-topic-button');
		$(this).attr('clicked', 'true');
		physicsTopicDisplay.html(text)
	}

	else if (clicked === "true")
	{
		$(this).attr('class', 'btn btn-default btn-lg btn-block physics-topic-button');
		$(this).attr('clicked', 'false');
		physicsTopicDisplay.html("Pick a Topic")
	}
})

$('.gamble-amount-button').on('click', function(event)
{
	var clicked = $(this).attr('clicked');
	$('.gamble-amount-button').attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
	$('.gamble-amount-button').attr('clicked', 'false');

	if (clicked === "false")
	{
		var text = $(this).html()
		$(this).attr('class', 'btn btn-success btn-lg btn-block gamble-amount-button');
		$(this).attr('clicked', 'true');
		gambleAmountDisplay.html(text)
	}

	else if (clicked === "true")
	{
		$(this).attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
		$(this).attr('clicked', 'false');
		gambleAmountDisplay.html("Pick an Amount of Coins")
	}
})