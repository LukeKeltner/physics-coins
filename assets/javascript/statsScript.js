var userID = -1;
var token = sessionStorage.getItem("userID");


var coinsOverTime = []

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

database.ref("users").once('value', function(snap)
{
	for (var i=0; i<snap.val().length; i++)
	{
		if (snap.val()[i].token === token)
		{
			userID = i;
			$("#name").html(snap.val()[i].name)
			newUser = snap.val()[i].new
			$('#coins-display').html(snap.val()[i].coins)
		}
	}
})

database.ref("questions").once("value", function(snap)
{
	var questions = snap.val();
	var user;

	database.ref("users/"+userID).once("value", function(snap2)
	{
		user = snap2.val()
	})

	setTimeout(function()
	{
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

			var th = $("<th class='row'>"+key+"</th>")
			var tr = $('<tr>')

			for (var i=0; i<snap.val()[key].length; i++)
			{
				if (i === correct[0])
				{
					console.log("hit!")
					var newIcon = '<i class="fa fa-check-square" style="color: #28a745;"></i>'
					td.append(newIcon)
					correct.shift()
				}

				else
				{
					var newIcon = '<i class="fa fa-window-close"></i>'
					td.append(newIcon)					
				}

			}

			tr.append(th)
			tr.append(td)
			$('#table-body').append(tr)

			//console.log(key+" has "+snap.val()[key].length+" questions")
		}
	},2000)
})