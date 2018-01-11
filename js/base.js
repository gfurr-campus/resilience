// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJ9lD6y_-7slSPyVQ4fgHKhDVATirRXhw",
    authDomain: "gfurr-research.firebaseapp.com",
    databaseURL: "https://gfurr-research.firebaseio.com",
    projectId: "gfurr-research",
    storageBucket: "",
    messagingSenderId: "378454403916"
  };
  firebase.initializeApp(config);

var database = firebase.database();

function genID(string){
  var s = string; var c = 0;
  while(s.includes(".")){ 
    c = c + 1; // Fail check
    s = s.replace(".","");
    console.log(s);
    if(c > 100){
      console.log("Error occurred...");
    }
  }
  return s;
}

function createUser(firstname,lastname,email,password,role) {
  // Authenticate
  console.log("called");
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log("Success!");
      database.ref('users/' + genID(email)).set({
        FirstName: firstname,
        LastName: lastname,
        Password: password, // Maybe remove later?
        RoleRequested: role,
        Email: email,
      Role: "Guest (Read-Only)"
    }).then(function(){
      console.log("Successfully created account!");
      location.reload();
    });
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode+":"+errorMessage);
    // ...
  });
}

function signIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    location.reload();
  }).catch(function(error) {
    // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
    // ...
  });
}

function signOut(){
  firebase.auth().signOut().then(function() {
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}


// MORE ON https://firebase.google.com/docs/auth/web/manage-users

function updateUser(){/* * */}

function createFinancialEntry(){/* * */}

function createStructuralEntry(){/* * */}

function removeFinancialEntry(){/* * */}

function removeStructuralEntry(){/* * */}

