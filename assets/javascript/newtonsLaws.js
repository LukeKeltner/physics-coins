var questionBank = 
[
	{
		type: "text",
		question:"Newton's Laws text question 1.  The correct answer is A",
		correct:"A",
		wrong:["C", "B", "D"]
	},

	{
		type: "text",
		question:"Newton's Laws text question 2.  The correct answer is D",
		correct:"D",
		wrong:["A", "B", "C"]
	},

	{
		type: "random",
		question: "Larry the Elephant has a mass of rand0 kg.  How much does Larry weigh in Newtons? (Use g = 10 m/s/s)",
		correct: "10*rand0",
		wrong: ["rand0/10", "100*rand0", "rand0/100"],
		numberOfRandom: 1,
		rand0:
		{
			min:1500,
			max:2500,
			decimal: 0
		}
	},

	{
		type: "random",
		question: "A rand0 kg bucket in a well is being pulled upward at a constant velocity. What is the tension force in the rope in Newtons? (Use g = 10 m/s/s)",
		correct: "10*rand0",
		wrong: ["rand0/10", "100*rand0", "rand0/100"],
		numberOfRandom: 1,
		rand0:
		{
			min:1,
			max:2,
			decimal: 2
		}
	},

	{
		type: "random",
		question: "Justin needs to push a rand0 kg box across a level floor.  If the <a href='https://en.wikipedia.org/wiki/Friction#Coefficient_of_friction' target='_blank'>coefficient of friction</a> between the box and floor is rand1, how much force (in Newtons) does Justin need to push the box in order for it to move at a constant velocity? (Use g = 10 m/s/s)",
		correct: "rand0*rand1*10",
		wrong: ["10*rand1", "10*rand0", "rand1*10/rand0"],
		numberOfRandom: 2,
		rand0:
		{
			min:1,
			max:5,
			decimal: 2
		},

		rand1:
		{
			min:.2,
			max:.9,
			decimal: 2
		}
	},

	{
		type: "random",
		question: "Amanda needs to push a stationary rand0 kg box across a level floor.  If the <a href='https://en.wikipedia.org/wiki/Friction#Coefficient_of_friction' target='_blank'>coefficient of friction</a> between the box and floor is rand1, how much force (in Newtons) does Amanda need to push the box in order for it to move a distance of rand2 meters in rand3 seconds? (Use g = 10 m/s/s)",
		correct: "rand0*((2*rand2/Math.pow(rand3,2))+rand1*10)",
		wrong: ["10*rand1", "10*rand0", "rand1*10/rand0"],
		numberOfRandom: 4,
		rand0:
		{
			min:1,
			max:5,
			decimal: 2
		},

		rand1:
		{
			min:.2,
			max:.9,
			decimal: 2
		},

		rand2:
		{
			min:1,
			max:6,
			decimal: 1
		},

		rand3:
		{
			min:1,
			max:6,
			decimal: 1
		},

		hard: true
	}

]

database.ref("questions").update(
{
	"Newton's Laws": questionBank
})

