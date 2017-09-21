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
	},

	{
		question:"1D Kinematics test question 3.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"]
	}
]

database.ref("questions").set(
{
	"1D Kinematics": questionBank
})
