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
    if(c > 100){
      console.log("Error occurred...");
    }
  }
  return s;
}

function createUser(firstname,lastname,username,email,password,role) {
  // Authenticate
  console.log("called");
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log("Success!");
      database.ref('users/' + genID(email)).set({
        FirstName: firstname,
        LastName: lastname,
        Password: password,
        RoleRequested: role,
        Email: email,
        Username: username,
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

function createFinancialEntry(univ,endow,stud,fees,grants,state,aux,tnet,rnet,cnet,lterm,exp,oprev,opex){
  console.log("A");
  database.ref("financial_data/"+univ).set({
    universityName: define(univ),
    totalEndowment: define(endow),
    totalStudents: define(stud),
    tuitionFees: define(fees),
    grantsContracts: define(grants),
    stateAppropriations: define(state),
    auxiliaryEnterprises: define(aux),
    totalNetAssets: define(tnet),
    restrictedNetAssets: define(rnet),
    capitalAssestsNetForDepreciation: define(cnet),
    longTermDebtForPropertyPlantAndEquipment: define(lterm),
    totalExpenses: define(exp),
    operatingRevenues: define(oprev),
    operatingExpenses: define(opex),
    primaryReservesRatio: define((tnet-rnet+lterm)/(exp)),
    viabilityRatio: define((tnet-rnet+lterm)/(lterm)),
    endowmentPerStudent: define((endow/stud))
    /*_primaryReservesRatio: function(){
      this.primaryReservesRatio = define((this.totalNetAssets-this.restrictedNetAssets+this.longTermDebtForPropertyPlantAndEquipment)/(this.totalExpenses)); // Error?
    },
    _viabilityRatio: function(){
      this.viabilityRatio = define((this.totalNetAssets-this.restrictedNetAssets+this.longTermDebtForPropertyPlantAndEquipment)/(this.longTermDebtForPropertyPlantAndEquipment));
    },
    _endowmentPerStudent: function(){
      this.endowmentPerStudent = define((this.totalEndowment/this.totalStudents));
    },
    _update: function(){
      this._primaryReservesRatio();
      this._viabilityRatio();
      this._endowmentPerStudent();
    }*/}).then(function(){
    console.log("B");
  }).catch(function(error){
    console.log("C");
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode+":"+errorMessage);
  });
}

//console.log("???");
//createFinancialEntry("NC",4,3,2,1,2,3,4,3,2,1,2,3,4);

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

function define(val){
  if(val == undefined || val == null){
    return 0;
  }else{
    return val;
  }
}

function createStructuralEntry(){/* * */}

function removeFinancialEntry(){/* * */}

function removeStructuralEntry(){/* * */}

