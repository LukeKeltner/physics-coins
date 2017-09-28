var questionBank = 
[
/*	{
		type: "random",
		numberOfRandom: 2,
		rand0:
		{
			min: 10,
			max: 80,
			decimal: 0
		},

		rand1:
		{
			min: 2,
			max: 8,
			decimal: 2
		},

		question:"Test Question.  A ball is lauched on level ground at an angle of rand0 degrees with an intitial velocity of rand1 m/s.  How much distance does the ball cover by the time it hits the ground?",
		correct:"Math.pow(rand1,2)*Math.sin(2*rand0*Math.PI/180)/10",
		wrong:["rand0*rand1", "rand0+rand1", "rand0/rand1"]
	},

	{
		type: "random",
		numberOfRandom: 3,
		rand0:
		{
			min: 6,
			max: 80,
			decimal: 2
		},

		rand1:
		{
			min: 2,
			max: 7,
			decimal: 2
		},

		rand2:
		{
			min: 2,
			max: 7,
			decimal: 2
		},

		question:"Test Question.  What is rand1 squared times sin(rand0) divided by rand2?",
		correct:"(Math.pow(rand1,2)*Math.sin(rand0*Math.PI/180))/rand2",
		wrong:["rand0", "rand1", "rand0+rand1"]
	},*/

	{
		type: "text",
		image: true,
		img: "<img src='assets/images/momentum.jpg' style='width:80%;'>",
		question: "This is a test image question. A is the correct answer",
		correct: "A",
		wrong:["B", "C", "D"]
	}
]

database.ref("questions").update(
{
	"Test Questions": questionBank
})
