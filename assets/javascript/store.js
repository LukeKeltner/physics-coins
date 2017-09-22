var storeItems = 
[
	{
		name:"Leaderboard Button",
		description:"Makes the Leaderboard button available to see how you compare to others!",
		cost: 1000,
		id: "leaderboard"
	},
	{
		name:"Reroll Button",
		description:"Don't like a question?  Hit the reroll button to roll another question for free!",
		cost: 12000000,
		id: "reroll"
	}
]

database.ref("store").update(
{
	"items": storeItems
})
