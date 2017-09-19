var questionBank = 
[
	{
		question:"2D Kinematics and Forces text question 1.  The correct answer is 'Bugs Bunny'",
		correct:"Bugs Bunny",
		wrong:["Winnie and Pooh", "Fred Flintstone", "Stewie Griffin"]
	},

	{
		question:"2D Kinematics and Forces text question 2.  The correct answer is 'Tiger'",
		correct:"Tiger",
		wrong:["Lion", "Duck", "Turtle"]
	}
]

database.ref("questions").update(
{
	"2D Kinematics and Forces": questionBank
})

