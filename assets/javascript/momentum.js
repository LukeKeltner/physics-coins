var questionBank = 
[
	{
		type: "text",
		question:"Momentum test question 1.  The correct answer is C",
		correct:"C",
		wrong:["A", "B", "D"]
	},

	{
		type: "text",
		question:"Momentum test question 2.  The correct answer is B",
		correct:"B",
		wrong:["A", "D", "C"]
	},

	{
		type: "text",
		question:"Momentum test question 3.  The correct answer is Boop",
		correct:"Boop",
		wrong:["Acid", "Dang", "Can"],
		hard: true
	},

	{
		type: "text",
		question:"Momentum test question 4.  The correct answer is Rocket",
		correct:"Rocket",
		wrong:["Light year", "Milky Way", "Stars"]
	},

	{
		type: "text",
		question:"Momentum test question 5.  The correct answer is ABC",
		correct:"ABC",
		wrong:["XYZ", "MNO", "DEF"],
		hard: true
	}
]

database.ref("questions").update(
{
	"Momentum": questionBank
})
