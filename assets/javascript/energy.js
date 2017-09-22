var questionBank = 
[
	{
		question:"Energy test question 1.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"]
	},

	{
		question:"Energy test question 2.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	},

	{
		question:"Energy test question 3.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"]
	},
	{
		question:"Energy test question 4.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"],
		hard: true
	},

	{
		question:"Energy test question 5.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	},

	{
		question:"Energy test question 6.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"],
		hard: true
	},
		{
		question:"Energy test question 7.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"]
	},

	{
		question:"Energy test question 8.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	},

	{
		question:"Energy test question 9.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"]
	},
	{
		question:"Energy test question 10.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"],
		hard: true
	},

	{
		question:"Energy test question 11.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"],
		hard: true
	},

	{
		question:"Energy test question 12.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"],
		hard: true
	}
]

database.ref("questions").update(
{
	"Energy": questionBank
})
