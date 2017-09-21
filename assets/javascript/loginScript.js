var createToken = function()
{
    var chars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    var token = ""

    for (var i=0; i<10; i++)
    {
        var r = Math.floor(Math.random() * chars.length);
        token = token+chars[r]
    }

    return token;
}

var validateEmail = function(email)
{
	var validEmail = false;
	var atSymbol = false;
	var validAddress = false;

	var emailSplit = email.split("");
	var addressArray = emailSplit.slice(1).slice(-4);
	var address ="";

	for (var i=0; i<addressArray.length; i++)
	{
		address = address + addressArray[i];
	}

	for (var i=0; i<emailSplit.length; i++)
	{
		if (emailSplit[i] === "@")
		{
			atSymbol = true;
			break;
		}
	}

	if (address === ".com" || address === ".net" || address === ".edu" || address === ".org")
	{
		validAddress = true;
	}

	if (atSymbol && validAddress)
	{
		validEmail = true;
	}

	return validEmail;
}

$('#login').on('click', function(event)
{
	var email = $('#email-login').val().trim().toLowerCase();
	var password = $('#password-login').val().trim();
	var validEmail = validateEmail(email);
	var wrongEmail = true;
	var validPassword = false;
	var loggedIn = false;

	database.ref("users").once("value", function(snap)
	{
		for (var i=0; i<snap.val().length; i++)
        {
        	console.log(email+" and "+snap.val()[i].email)
        	console.log(snap.val()[i].email === email)

            if (snap.val()[i].email === email)
            {
            	wrongEmail = false;
            	var userSalt = snap.val()[i].salt;
                var userHash = snap.val()[i].hash;
                var createdHash = createHash(password, userSalt);

            	if (createdHash === userHash)
            	{
            		validPassword = true;
            		loggedIn = true;
					var token = createToken()
	                sessionStorage.setItem("userID", token);

	                database.ref("users/"+i).update(
	                {
	                    token: token
	                })

	                window.location.href = 'dashboard.html';
	                break;
            	}

            	else
	            {
	            	$('.login-alert').show()
	            	$('#error-login').html("This User has a different password");
	            	break;
	            }
            }
        }
        

        if (validEmail && wrongEmail)
        {
            	$('.login-alert').show()
            	$('#error-login').html("We don't have this email in our system.  Would you like to register?")            	
            }

        else if (!validEmail && wrongEmail)
        {
           	$('.login-alert').show()
            $('#error-login').html("We don't recognize this as an email.")             	
        }   
	})
})

$('#register').on('click', function(event)
{
	var name = $('#register-name').val();
	var email = $('#register-email').val().trim().toLowerCase();
	var password1 = $('#register-password1').val().trim();
	var password2 = $('#register-password2').val().trim();

	var emailSplit = email.split("");
	var address = emailSplit.slice(1).slice(-4)

	var validName = false;
	var validEmail = validateEmail(email)
	var validPassword = false;


	if (name !== "")
	{
		validName = true;
	}

	if (password1 === password2  && password1 !== "" && password2 !== "")
	{
		validPassword = true;
	}

	if (validName && validEmail && validPassword)
	{
		var salt = createSalt()
  		var hash = createHash(password1, salt)

		database.ref('users').once('value', function(snap)
		{
        	if (!snap.hasChild('0'))
            {
              var token = createToken()
              sessionStorage.setItem("userID", token);

              var coinsOverTime = [0]

              database.ref('users/0').set(
              {
                name: name,
                email: email,
                salt: salt,
                hash: hash,
                coins: 0,
                new: true,
                token: token,
                coinsOverTime: coinsOverTime
              })
              window.location.href = 'dashboard.html';
            }

            else
            {
              var newEmail = true;

              for (var i=0; i<snap.val().length; i++)
              {
                if (email === snap.val()[i].email)
                {
                  newEmail = false;
                  $('.register-alert').show()
                  $('#error').append("We already have this email in our system")
                }
              }

              if (newEmail)
              {
                  var userID = snap.val().length
                  var token = createToken()
                  sessionStorage.setItem("userID", token);

                  var coinsOverTime = [0]

                  database.ref('users/'+userID).set(
                  {
		                name: name,
		                email: email,
		                salt: salt,
		                hash: hash,
		                coins: 0,
		                new: true,
		                token: token,
		                coinsOverTime: coinsOverTime
                  })

                  window.location.href = 'dashboard.html';
              }
            } 
		})
	}

	else
	{
		$('.register-alert').show()

		if (!validName)
		{
			$('#error').append("You must input a name!<br>")
			$('#register-name').addClass('is-invalid')
		}

		else
		{
			$('#register-name').addClass('is-valid')
		}

		if (!validEmail)
		{
			$('#error').append("We only accept emails that end in .com .org .edu or .net<br>")
			$('#register-email').addClass('is-invalid')			
		}

		else
		{
			$('#register-email').addClass('is-valid')	
		}

		if (!validPassword)
		{
			$('#error').append("Your passwords don't match or are empty!")
			$('#register-password1').addClass('is-invalid')
			$('#register-password2').addClass('is-invalid')
		}

		else
		{
			$('#register-password1').addClass('is-valid')
			$('#register-password2').addClass('is-valid')
		}
	}
});

$("#close-register").on('click', function(event)
{
	$('#error').empty()
	$('.register-alert').hide()
	$('#register-name').removeClass('is-invalid')
	$('#register-email').removeClass('is-invalid')	
	$('#register-password1').removeClass('is-invalid')
	$('#register-password2').removeClass('is-invalid')
	$('#register-name').removeClass('is-valid')
	$('#register-email').removeClass('is-valid')	
	$('#register-password1').removeClass('is-valid')
	$('#register-password2').removeClass('is-valid')
	$('#register-name').val("")
	$('#register-email').val("")	
	$('#register-password1').val("")
	$('#register-password2').val("")
})

