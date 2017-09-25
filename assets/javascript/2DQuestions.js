var questionBank = 
[
	{
		type: "random",
		numberOfRandom: 3,
		rand0: 
		{
			min: 1,
			max: 10,
			decimal: 0
		},
		rand1: 
		{
			min: 1,
			max: 10,
			decimal: 0
		},
		rand2: 
		{
			min: 1,
			max: 10,
			decimal: 0
		},
		question:"2D Kinematics and Forces text question 1.  What is rand0 + rand1?",
		correct:"rand0 + rand1",
		wrong:["rand0 - rand1", "2*rand0 + rand1", "rand0 + 2*rand1"]
	},
]

database.ref("questions").update(
{
	"2D Kinematics and Forces": questionBank
})

