var map =
{
    "q": 1,
    "w": 2,
    "1": 3,
    "e": 4,
    "r": 5,
    "2": 5,
    "t": 6,
    "y": 7,
    "3": 8,
    "u": 9,
    "i": 10,
    "4": 11,
    "o": 12,
    "p": 13,
    "5": 14,
    "a": 15,
    "s": 16,
    "6": 17,
    "d": 18,
    "f": 19,
    "7": 20,
    "g": 21,
    "h": 22,
    "8": 23,
    "j": 24,
    "k": 25,
    "9": 26,
    "l": 27,
    "z": 28,
    "0": 29,
    "x": 30,
    "c": 31,
    "!": 32,
    "v": 33,
    "b": 34,
    "@": 35,
    "n": 36,
    "m": 37,
    "#": 38,
    "Q": 39,
    "W": 40,
    "$": 41,
    "E": 42,
    "R": 43,
    "%": 44,
    "T": 45,
    "Y": 46,
    "^": 47,
    "U": 48,
    "I": 49,
    "&": 50,
    "O": 51, 
    "P": 52,
    "*": 53,
    "A": 54,
    "S": 55,
    "(": 56,
    "D": 57,
    "F": 58,
    ")": 59,
    "G": 60,
    "H": 61,
    "-": 62,
    "J": 63,
    "K": 64,
    "_": 65,
    "L": 66,
    "Z": 67,
    "X": 68,
    "C": 69,
    "=": 70,
    "V": 71,
    "B": 72,
    "+": 73,
    "N": 74,
    "M": 75
}

var createSalt = function()
{
    var chars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
    var salt = ""

    for (var i=0; i<10; i++)
    {
        var r = Math.floor(Math.random() * chars.length);
        salt = salt+chars[r]
    }

    return salt;
}

var createHash = function(password, salt)
{
    var splitSalt = salt.split('')
    var splitPassword = password.split('')
    var addSalt = []
    var hash = ""
    var insert = Math.floor(splitPassword.length/splitSalt.length)+1

    for (var i=0; i<splitPassword.length; i++)
    {
        addSalt.push(splitPassword[i])

        if (i%insert == 0 && splitSalt.length > 0)
        {
          addSalt.push(splitSalt[0])
          splitSalt.splice(0,1)
        }
    }

    for (var i=0; i<addSalt.length; i++)
    {
        var number = map[addSalt[i]]

        for (var key in map)
        {
            if (map[key] === number)
            {
              hash = hash + key
            }
        }
    }

    return hash;
}