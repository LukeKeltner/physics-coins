var config = 
{
    apiKey: "AIzaSyA6mY_UPOCq2CQG_TBfh6TLthmQU_Hcnjs",
    authDomain: "physics-coins.firebaseapp.com",
    databaseURL: "https://physics-coins.firebaseio.com",
    projectId: "physics-coins",
    storageBucket: "physics-coins.appspot.com",
    messagingSenderId: "379351599749"
  };

  firebase.initializeApp(config);
var database = firebase.database()

database.ref("users").set(
{
    boop: 40
})