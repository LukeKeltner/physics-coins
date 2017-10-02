var userID = -1;
var token = sessionStorage.getItem("userID");
var maxCoins = 0;
var initialMaxCoins = 100;
var coinsOverTime = [];
var chart;

if (token === null)
{
	$('#loginModal').modal("show")
}

$(function () 
{
  $('[data-toggle="tooltip"]').tooltip()
})

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

database.ref("users").once('value').then(function(snap)
{
	for (var i=0; i<snap.val().length; i++)
	{
		if (snap.val()[i].token === token)
		{
			userID = i;
			$("#name").html(snap.val()[i].name)
			newUser = snap.val()[i].new
			$('#coin-container').html('<h1>'+snap.val()[i].coins.toLocaleString()+'</h1>')
			displayStars()

			var stars = snap.val()[i].stars
			maxCoins = initialMaxCoins * Math.pow(10, stars)
			coinsOverTime = snap.val()[i].coinsOverTime
			coinsOverTime.unshift('Coins Over Time')

			chart = c3.generate(
			{
			    bindto: '#chart',
			    data: {
			      columns: [
			        coinsOverTime,
			      ]
			    },
			});
		}
	}
})

database.ref("questions").once("value").then(function(snap)
{
	var questions = snap.val();
	var user;

	database.ref("users/"+userID).once("value").then(function(snap2)
	{
		user = snap2.val()

		for (var key in snap.val())
		{
			var td = $('<td>')
			//console.log("The questions "+user.name+" has gotten right in the catergory of "+key)

			var correct = []
			var wrong = []
			var amountOfQuestions = 0;

			for (var questionNumber in user[key])
			{
				if (user[key][questionNumber].correct)
				{
					correct.push(parseInt(questionNumber))
				}

				else if (!user[key][questionNumber].correct)
				{
					wrong.push(parseInt(questionNumber))
				}
			}

			var percent = Math.round(correct.length/questions[key].length*100,0)

			var th = $("<th class='text-center'>"+key+"</th>")
			var tr = $('<tr>')

			for (var i=0; i<snap.val()[key].length; i++)
			{
				if (i === correct[0])
				{
					//console.log("hit!")
					var newIcon = '<i class="fa fa-check-square" style="color: #28a745; width:0px"></i>'
					td.append(newIcon)
					correct.shift()
				}

				else if (i === wrong[0])
				{
					var newIcon = '<i class="fa fa-minus-square" style="color: red; width: 0px"></i>'
					td.append(newIcon)	
					wrong.shift()				
				}

				else
				{
					var newIcon = '<i class="fa fa-square" style="width: 0px"></i>'
					td.append(newIcon)		
				}

			}


			tr.append(th)
			tr.append(td)
			tr.append("<td>"+percent+"%</td>")
			$('#table-body').append(tr)
		}
	})
})

$('#switch-graph').on('click', function(event)
{
	var text = $('#switch-graph').html()
	//console.log(text)

	if (text === "Show Next Star")
	{
		chart = c3.generate(
		{
			bindto: '#chart',
			data: 
			{
				columns: 
				[
				    coinsOverTime,
				]
			},
			grid: 
			{
				y: 
				{
					lines: 
					[
					    {value: maxCoins, text: 'Next Star', position: 'start', stroke: 'green'},
					]
				}
			},
			axis: 
			{
				y: 
				{
					max: maxCoins
				}
			},
		});	

		$('#switch-graph').html("Show Progress")
	}

	if (text === "Show Progress")
	{
		chart = c3.generate(
		{
			bindto: '#chart',
			data: 
			{
				columns: 
				[
				    coinsOverTime,
				]
			},
		});	

		$('#switch-graph').html("Show Next Star")
	}
})