var questionBank = 
[
	{
		question:"Newton's Laws text question 1.  The correct answer is A",
		correct:"A",
		wrong:["C", "B", "D"]
	},

	{
		question:"Newton's Laws text question 2.  The correct answer is D",
		correct:"D",
		wrong:["A", "B", "C"]
	}
]

database.ref("questions").update(
{
	"Newton's Laws": questionBank
})

