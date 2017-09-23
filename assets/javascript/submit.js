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
			var wonAmount = 1*gamble
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
		starCheck()
		freeze = true;

		setTimeout(function()
		{
			$('.answer').attr('class', 'btn btn-default btn-block answer')
			$('.gamble-amount-button').attr('class', 'btn btn-default btn-lg btn-block gamble-amount-button');
			$('.gamble-amount-button').attr('clicked', 'false');
			gambleAmountDisplay.html("Pick an Amount of Coins");

			$('.physics-topic-button').attr('class', 'btn btn-default btn-lg btn-block physics-topic-button');
			$('.physics-topic-button').attr('clicked', 'false');
			physicsTopicDisplay.html("Pick a Topic")



			$('#go-for-it').prop('disabled', true);
			$('#questionModal').modal('hide')
			freeze = false;
		}, 2000)
	}
})