var questionBank = 
[
	{
		question:"Here is the first question.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"]
	},

	{
		question:"Here is the second question.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	}
]

database.ref("questions").set(
{
	"1D Kinemtics": questionBank
})

console.log(questionBank[0])