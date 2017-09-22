var userID = -1;
var token = sessionStorage.getItem("userID");


$(function () 
{
  $('[data-toggle="tooltip"]').tooltip()
})

var updateCoinsOverTime = function()
{
	var coinsOverTime = []
	var coins = 0;

	database.ref("users/"+userID).once("value", function(snap)
	{
		coinsOverTime = snap.val().coinsOverTime
		coins = snap.val().coins
	})

	coinsOverTime.push(coins)

	database.ref("users/"+userID).update(
	{
		coinsOverTime: coinsOverTime
	})
}

database.ref("users").once('value').then(function(snap)
{
	for (var i=0; i<snap.val().length; i++)
	{
		if (snap.val()[i].token === token)
		{
			userID = i;
			$('#coins-display').html(snap.val()[i].coins.toLocaleString())
		}
	}


	database.ref("store/items").once("value").then(function(snap)
	{
		console.log(snap.val())

		for (var key in snap.val())
		{
			var newItem = $('<button type="button" class="btn btn-outline-primary btn-lg btn-block item" style="width: 100%"><span class="pull-left">'+snap.val()[key].name+'</span><span class="pull-right">'+snap.val()[key].cost.toLocaleString()+'</span><br></button>')
			newItem.append('<span class="pull-left" style="font-size:15px">'+snap.val()[key].description+'</span>')
			newItem.data("data-id", snap.val()[key].id)
			newItem.data("data-cost", snap.val()[key].cost)
			$('#items-list').append(newItem)
		}

		database.ref("users/"+userID).on("value", function(snap)
		{
			$('#coins-display').html(snap.val().coins.toLocaleString())
		})

		$(".item").on("click", function(event)
		{
			var cost = $(this).data("data-cost")
			var id = $(this).data("data-id")

			var newCoins = 0;

			database.ref("users/"+userID).once("value").then(function(snap)
			{
				newCoins = snap.val().coins - cost

				console.log(snap.val().coins)
				console.log(cost)
				console.log(newCoins)

				database.ref("users/"+userID).update(
				{
					coins: newCoins
				})

				updateCoinsOverTime()

				database.ref("users/"+userID+"/bought/"+id).update(
				{
					bought: true
				})
			})


		})
	})
})
