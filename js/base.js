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

function createUser(firstname,lastname,email,password,role) {
  // Authenticate
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    database.ref('users/' + email).set({
      FirstName: firstname,
      LastName: lastname,
      Password: password, // Maybe remove later?
      RoleRequested: role,
      Email: email,
      Role: "Guest (Read-Only)"
    }).then(function(){
      // location.reload();
    });
  }).catch(function(error) {
    // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
    // ...
  });
}

function signIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    // location.reload();
  }).catch(function(error) {
    // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
    // ...
  });
}

function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    // location.reload();
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

