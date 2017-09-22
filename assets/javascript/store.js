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
	},
	{
		name:"Test Item 1",
		description:"This is just a test!",
		cost: 13000,
		id: "test-item-1"
	},
	{
		name:"Test Item 2",
		description:"This is just a test!",
		cost: 400,
		id: "test-item-2"
	}
]

database.ref("store").update(
{
	"items": storeItems
})
