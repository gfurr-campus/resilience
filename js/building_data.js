/*console.log("I'm here...");

var data = {
	school: "",
	buildName: "",
	buildNumber: "",
	abbreviation: "",
	campus: "",
	address: "",
	occupancyDate: "",
	constructType: "",
	grossSquareFootage: 0,
	leasingType: "",
	status: "",
	class: "",
	yearBuilt: 0,
	age: 0,
	leedLevel: "",
	leedCertificationYear: 0,
	longitude: 0,
	latitude: 0,
	precint: "",
	city: "",
	floorPlan: "",
	FCI: 0,
	resType: 0,
	ownershipType: 0,
	ERC: 0,
	LRC: 0,
	LRY: 0,
	condition: 0,
	AC: 0,
	accessibleArea: 0,
	assignableArea: 0,
	buildingCost: 0,
	numberOfFloors: 0,
	lastUpdate: 0,
	usage: "",
	NSF: 0,
	ASF: 0
}

var hasRequiredFields = function(data,fields){
	var success = true;
	for(var i = 0; i < fields.length; i++){
		if(!hasRequiredField(data,fields[i])){
			success = false;
		}
	}
	return success;
}

var hasRequiredField = function(data, field){
	if(data[field].length == 0 || parseInt(data[field]) == NaN){
		return false;
	}else{
		return true;
	}
}

// Incomplete
var submitNewData = function(school, bName, bNum, abbrev, campus, address, occupance, constr, gsf,lType,status,cls,
	built, age, leedLvl, certYr, x, y, pre, city,plan, fci, res, own, erc, lrc, lry, cond, ac,
	access, assigns, bCost, nFloors, update, usage, nsf, asf){
	entry = data;
	entry.school = updateStringField(school);
	entry.buildName = updateStringField(bName);
	entry.buildNumber = updateStringField(bNum);
	entry.abbreviation = updateStringField(abbrev);
	entry.campus = updateStringField(campus);
	entry.address = updateStringField(address);
	entry.occupancyDate = updateStringField(occupance);
	entry.constructType = updateStringField(constr);
	entry.grossSquareFootage = updateNumberField(gsf);
	entry.leasingType = updateStringField(lType);
	entry.status = updateStringField(status);
	entry.class = updateStringField(cls);
	entry.yearBuilt = updateNumberField(built);
	entry.age = updateNumberField(age);
	entry.leedLevel = updateStringField(leedLvl);
	entry.leedCertificationYear = updateNumberField(certYr);
	entry.longitude = updateNumberField(x);
	entry.latitude = updateNumberField(y);
	entry.precint = updateStringField(pre);
	entry.city = updateStringField(city);
	floorPlan = updateFileField(plan);
	FCI = updateNumberField(fci);
	resType = updateNumberField(res);
	ownershipType = updateNumberField(own);
	ERC = updateNumberField(erc);
	LRC = updateNumberField(lrc);
	LRY = updateNumberField(lry);
	condition = updateNumberField(cond);
	AC = updateNumberField(ac);
	accessibleArea = updateNumberField(access);
	assignableArea = updateNumberField(asign);
	buildingCost = updateNumberField(bCost);
	numberOfFloors = updateNumberField(nFloors);
	lastUpdate = updateNumberField(update);
	usage = updateStringField(usage);
	NSF = updateNumberField(nsf);
	ASF = updateNumberField(asf);
}

var updateFileField = function(file){
	var F = updateStringField(file);
	if(F.length > 0 && F.includes('.pdf')){
		return F;
	}else{
		return '';
	}
}

var updateNumberField = function(number){
	if(typeof(number) != "number"){
		return NaN;
	}else{
		return number;
	}
}

var updateStringField = function(string){
	var s = string.replace(/\s/g,'');
	if(s.length == 0){
		return s;
	}else{
		return string;
	}
}*/

function initMap() {
        var uluru = {lat: 37.2284, lng: -80.4234};
        if(page == "contact"){
        	uluru = {lat: 37.227695, lng: -80.413021};
        }
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	getCurrentUser();
    $scope.roles = ["Master (Full Access)","Administrator (Read/Write Access)","Guest (Read-Only)"];
    $scope.selectedRole = $scope.roles[$scope.roles.length-1]; 

    $scope.newUser = {
    	fn : "",
    	ln : "",
    	u : "",
    	e : "",
    	pw : "",
    	r : $scope.selectedRole
    }

   $scope.oldUser = {
    	e : "",
    	pw : ""
    }

    $scope.CurrentUser = null;

    $scope.signedInRole = {
    	isguest : false,
    	isadmin : false,
    	ismaster : false
    }

    $scope.users = [];

    $scope.ng_createUserValid = function(){
    	if($scope.newUser.fn.length > 1 && $scope.newUser.ln.length > 1 && $scope.newUser.e.includes("@") && $scope.newUser.e.includes(".") && $scope.newUser.pw.length >= 6){
    		return true;
    	}else{
    		return false;
    	}
    }

    $scope.ng_signInValid = function(){
    	if($scope.oldUser.e.includes("@") && $scope.oldUser.e.includes(".") && $scope.oldUser.pw.length >= 6){
    		return true;
    	}else{
    		return false;
    	}
    }

    $scope.ng_createUser = function(){
    	createUser($scope.newUser.fn,$scope.newUser.ln,$scope.newUser.u,$scope.newUser.e,$scope.newUser.pw,$scope.newUser.r);
    }

    $scope.ng_signIn = function(){
    	signIn($scope.oldUser.e,$scope.oldUser.pw);
    }

    $scope.ng_signOut = function(){
    	signOut();
    }

    function getUsrRole(obj,key){
    	if(obj.Role == "Guest (Read-Only)" && key == "isguest"){
    		return true;
    	}else if(obj.Role == "Administrator (Read/Write Access)" && key == "isadmin"){
    		return true;
    	}else if(obj.Role == "Master (Full Access)" && key == "ismaster"){
    		return true;
    	}else{
    		return false;
    	}
    }

    function getCurrentUser(){
		firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		return firebase.database().ref('/users/' + genID(user.email)).once('value').then(function(snapshot) {
      			var usr = snapshot.val();
      			$scope.$apply(function(){
      				$scope.signedInRole.ismaster = getUsrRole(usr,'ismaster');
      				$scope.signedInRole.isadmin = getUsrRole(usr,'isadmin');
      				$scope.signedInRole.isguest = getUsrRole(usr,'isguest');
      				$scope.CurrentUser = usr;
      			});
    			// ...
    		});
  		}});
	}

	$scope.userID = function(e){
		var ide = e.usr;
		return (ide.split("@"))[0];
	}

	function getUsers(){
		return firebase.database().ref('/users/').once('value').then(function(snapshot){
			var usrs = snapshot.val();
			for(var k in usrs){
				$scope.$apply(function(){
      				$scope.users.push({usr: k, name: usrs[k].FirstName+" "+usrs[k].LastName, currentRole: usrs[k].Role, requested: usrs[k].RoleRequested});
      			});
			}
			console.log($scope.users);
		});
	}

	function changeUserRole(){

	}

	function approveRoleChange(){

	}

	function declineRoleChange(){

	}

	//getCurrentUser();
	//getUsers();

	function calcReservesRatio(){
		/*
			The primary reserves ratio is calculated as follows:
			(Total Net Assets – Restricted Net Assets – Property, Plant, and Equipment + Long-term Debt) / (Total Expenses)
		*/
	}


	function calcViabilityRatio(){
		/*
			The Viability Ratio is calculated as calculated as:
			(Total Net Assets – Restricted Net Assets – Property, Plant, and Equipment + Long-term Debt) / Long-term Debt
		*/
	}

	function fadeEffect(iden){
		$(iden).mouseover(function(){
    	$(iden).css("opacity", "0.50");
		});
		$(iden).mouseout(function(){
    	$(iden).css("opacity", "1.00");
		});
	}

	fadeEffect(".fa-sign-in");
	fadeEffect(".fa-sign-out");
	fadeEffect(".fa-edit");
	fadeEffect(".fa-question-circle");
	fadeEffect("#home");
	fadeEffect("#about");
	fadeEffect("#data");
	fadeEffect("#charts");
	fadeEffect("#parts");
	fadeEffect("#settings");
	fadeEffect("#contact");


    $scope.leed = ["(none)","Bronze","Silver","Gold","Platinum"];
    $scope.selectedLEED = $scope.leed[0];

    $scope.help_request = "";

});