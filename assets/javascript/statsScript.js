var userID = -1;
var token = sessionStorage.getItem("userID");


var coinsOverTime = []

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
	for (var key in snap.val())
	{
		var newIcon = '<i class="fa fa-check-square"></i>'
		var td = $('<td>')
		var th = $("<th class='row'>"+key+"</th>")
		var tr = $('<tr>')

		for (var i=0; i<snap.val()[key].length; i++)
		{
			td.append(newIcon)
		}
		tr.append(th)
		tr.append(td)
		$('#table-body').append(tr)

		console.log(key+" has "+snap.val()[key].length+" questions")
	}

})