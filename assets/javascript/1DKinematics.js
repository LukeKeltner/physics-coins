var questionBank = 
[
	{
		question:"1D Kinematics test question 1.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"]
	},

	{
		question:"1D Kinematics test question 2.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	}
]

database.ref("questions").set(
{
	"1D Kinemtics": questionBank
})

console.log(questionBank[0])