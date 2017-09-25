var questionBank = 
[
	{
		type: "random",
		numberOfRandom: 2,
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
		question:"2D Kinematics and Forces text question 1 - Random Question.  What is rand0 + rand1?",
		correct:"rand0 + rand1",
		wrong:["rand0 - rand1", "2*rand0 + rand1", "rand0 + 2*rand1"]
	},
	{
		type: "text",
		question:"2D Kinematics and Forces text question 2 - Text Question.  The answer is Rock",
		correct:"Rock",
		wrong:["Paper", "Scissors", "Tie"]
	},
	{
		type: "random",
		numberOfRandom: 3,
		rand0:
		{
			min: 1,
			max: 5,
			decimal: 2
		},
		rand1:
		{
			min: 3,
			max: 14,
			decimal: 0
		},
		rand2:
		{
			min: 1,
			max: 10,
			decimal: 2
		},
		question:"A car with an intial velocity of rand0 accelerates uniformly at a rate of rand2 for rand1 seconds.  What is its final velocity?",
		correct:"rand0 + rand1*rand2",
		wrong:["rand0 - rand1*rand2", "rand0 + rand2", "rand0*rand1"]
	},
	{
		type: "random",
		numberOfRandom: 1,
		rand0:
		{
			min: 3,
			max: 83,
			decimal: 1
		},
		question: "This is a text quesiton to see if it can calculate the square root of rand0.",
		correct: "Math.pow(rand0,1/2)",
		wrong: ["rand0*1", "rand0*2", "rand0*3"]
	}
]

database.ref("questions").update(
{
	"2D Kinematics and Forces": questionBank
})

