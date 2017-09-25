var questionBank = 
[
	{
		type: "random",
		numberOfRandom: 3,
		rand0: 
		{
			min: -3,
			max: 3,
			decimal: 2
		},
		rand1: 
		{
			min: 5,
			max: 6,
			decimal: 2
		},
		rand2: 
		{
			min: 1,
			max: 10,
			decimal: 0
		},
		question:"2D Kinematics and Forces text question 1.  Random number 1 is rand0 m/s.  Random number 2 is rand1.  And random number 3 is rand2",
		correct:"Bugs Bunny",
		wrong:["Winnie and Pooh", "Fred Flintstone", "Stewie Griffin"]
	},
]

database.ref("questions").update(
{
	"2D Kinematics and Forces": questionBank
})

