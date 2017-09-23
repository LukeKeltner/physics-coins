var userID = -1;
var token = sessionStorage.getItem("userID");
var maxCoins = 0;
var initialMaxCoins = 100;
var coinsOverTime = [];
var chart;


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

			console.log("The questions "+user.name+" has gotten right in the catergory of "+key)

			var correct = []

			for (var questionNumber in user[key])
			{
				correct.push(parseInt(questionNumber))
			}

			console.log(correct)

			var th = $("<th>"+key+"</th>")
			var tr = $('<tr>')

			for (var i=0; i<snap.val()[key].length; i++)
			{
				if (i === correct[0])
				{
					console.log("hit!")
					var newIcon = '<i class="fa fa-check-square" style="color: #28a745; width:0px"></i>'
					td.append(newIcon)
					correct.shift()
				}

				else
				{
					var newIcon = '<i class="fa fa-window-close" style="width: 0px"></i>'
					td.append(newIcon)					
				}

			}

			tr.append(th)
			tr.append(td)
			$('#table-body').append(tr)
		}
	})
})

$('#switch-graph').on('click', function(event)
{
	var text = $('#switch-graph').html()
	console.log(text)

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