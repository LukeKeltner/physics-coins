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