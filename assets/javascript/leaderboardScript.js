var userID = -1;
var token = sessionStorage.getItem("userID");


$(function () 
{
  $('[data-toggle="tooltip"]').tooltip()
})

var sort = function(array1, array2, array3)
{
	var sorted = true

	while (sorted)
	{
		sorted = false

		for (var i=0; i<array1.length-1; i++)
		{
			if (parseInt(array1[i]) < parseInt(array1[i+1]))
			{
				var x1 = array1[i]
				var y1 = array1[i+1]
				array1[i] = y1
				array1[i+1] = x1

				var x2 = array2[i]
				var y2 = array2[i+1]
				array2[i] = y2
				array2[i+1] = x2

				var x3 = array3[i]
				var y3 = array3[i+1]
				array3[i] = y3
				array3[i+1] = x3

				sorted = true;
			}
		}
	}
}

database.ref("users").once("value", function(snap)
{
	console.log(snap.val())

	var names = []
	var scores = []
	var tokens = []

	for (var key in snap.val())
	{
		names.push(snap.val()[key].name)
		scores.push(snap.val()[key].coins)
		tokens.push(snap.val()[key].token)
	}

	sort(scores, names, tokens)

	for (var i=0; i<names.length; i++)
	{
		var place = i+1
		var number = $("<td>"+place+"</td>")
		var name = $("<td>"+names[i]+"</td>")
		var score = $("<td>"+scores[i]+"</td>")

		if (tokens[i] === token)
		{
			var tr = $('<tr style="background-color:#95edf4; border:1px solid black">')
		}

		else
		{
			var tr = $('<tr>')
		}

		tr.append(number)
		tr.append(name)
		tr.append(score)

		$('#table-body').append(tr)
	}

})

/*database.ref("users").once('value', function(snap)
{
	var coinsOverTime = []

	for (var i=0; i<snap.val().length; i++)
	{
		if (snap.val()[i].token === token)
		{
			userID = i;
			$("#name").html(snap.val()[i].name)
			newUser = snap.val()[i].new
			$('#coins-display').html(snap.val()[i].coins)
			coinsOverTime = snap.val()[i].coinsOverTime
			coinsOverTime.unshift('Coins Over Time')
		}
	}

	var chart = c3.generate({
	    bindto: '#chart',
	    data: {
	      columns: [
	        coinsOverTime,
	      ]
	    },
	});
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

			//console.log(key+" has "+snap.val()[key].length+" questions")
		}
	})
})*/