var getNumber = function(string, randomBank)
{
	var operationStrings = ["+", "-", "*", "/"]

	for (var i=0; i<randomBank.length; i++)
	{
		string = string.replace("rand"+i, randomBank[i])
	}

	return eval(string).toFixed(2)

/*	string1 = string.split("+")

	console.log(string1)

	for (var i=0; i< string1.length; i++)
	{
		string1[i] = string1[i].split("*")
	}

	console.log(string1)


	result = []
	for (var i=0; i<string1.length; i++)
	{

		var number = 1;

		for (var j=0; j<string1[i].length; j++)
		{
			console.log(parseFloat(string1[i][j]))
			number = number * parseFloat(string1[i][j])
		}

		result.push(number)
	}

	console.log(result)*/

}





$('#go-for-it').on('click', function(event)
{
	var topic = physicsTopicDisplay.html();
	var subTopic = $('#subtopic-display').html()
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
	console.log(subTopic)

	database.ref("questions/"+topic+"/"+subTopic).once("value").then(function(snap)
	{
		var questionBank = snap.val()
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
				var questionText = questionBank[r].question;
				var correctText = "";
				var wrongText = [];
				var buttons = [];

				if (questionBank[r].type === "random")
				{
					var randomBank = []

					for (var i=0; i<questionBank[r].numberOfRandom; i++)
					{
						var n = (Math.random()*(questionBank[r]["rand"+i].max-questionBank[r]["rand"+i].min)+questionBank[r]["rand"+i].min).toFixed(questionBank[r]["rand"+i].decimal);
						questionText = questionText.replace("rand"+i, n)
						randomBank.push(n)
					}

					correctText = getNumber(questionBank[r].correct, randomBank)

					var button1 = $("<button type='button' class='btn btn-default btn-block answer'></button>")
					button1.data("data-result", "correct")
					button1.html(correctText)
					buttons.push(button1)

					for (var i=0; i<questionBank[r].wrong.length; i++)
					{
						var button = $("<button type='button' class='btn btn-default btn-block answer'></button>")
						button.data("data-result", "wrong")
						button.html(getNumber(questionBank[r].wrong[i], randomBank))
						buttons.push(button)
					}
				}

				else if (questionBank[r].type === "text")
				{
					console.log(questionBank[r].wrong.length)
					var button1 = $("<button type='button' class='btn btn-default btn-block answer'></button>")
					button1.data("data-result", "correct")
					button1.html(questionBank[r].correct)
					buttons.push(button1)

					for (var i=0; i<questionBank[r].wrong.length; i++)
					{
						var button = $("<button type='button' class='btn btn-default btn-block answer'></button>")
						button.data("data-result", "wrong")
						button.html(questionBank[r].wrong[i])
						buttons.push(button)
					}
				}

				if (questionBank[r].image)
				{
					$('#image-container').html(questionBank[r].img)
				}

				if (questionBank[r].hard)
				{
					$('.modal-backdrop').css('background-color', 'red')
					$('#question-text').prepend("<span style='color:#dc3545'>HARD</span><br>") 
				}

				buttons = shuffleArray(buttons)

				var questionNumber = r+1
				$('#question-number').html(questionNumber)
				$('#question-text').html(questionText)

				console.log(buttons.length)

				for (var i=0; i<4; i++)
				{
					var int = i+1
					$('#question'+int+'Div').html("")
				}

				for (var i=0; i<buttons.length; i++)
				{
					var int = i+1
					$('#question'+int+'Div').html(buttons[i])
				}
/*				$('#question1Div').html(buttons[0])
				$('#question2Div').html(buttons[1])
				$('#question3Div').html(buttons[2])
				$('#question4Div').html(buttons[3])*/
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