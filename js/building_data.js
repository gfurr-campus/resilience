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

    $scope.dt = 1;

    $scope.clearF = function(){
        $scope.univ = "";
        $scope.endow = "";
        $scope.stud = "";
        $scope.fees = "";
        $scope.grants = "";
        $scope.state = "";
        $scope.aux = "";
        $scope.tnet = "";
        $scope.rnet = "";
        $scope.cnet = "";
        $scope.lterm = "";
        $scope.exp = "";
        $scope.oprev = "";
        $scope.opex = "";
        //console.log("clearing financial data");
    }

    $scope.clearF();
    $scope.createData = function(){
        if($scope.dt == 1){
            //console.log("adding financial data");
            createFinancialEntry($scope.univ,$scope.endow,$scope.stud,$scope.fees,$scope.grants,$scope.state,$scope.aux,$scope.tnet,$scope.rnet,$scope.cnet,$scope.lterm,$scope.exp,$scope.oprev,$scope.opex);
        }
        $scope.clearF();
    }

    $scope.setDT = function(n){
        console.log("changed dt to "+n);
        $scope.dt = n;
    }

    $scope.fin_data = [];

    $scope.pullFinData = function(){
        return firebase.database().ref("financial_data").once('value').then(function(snapshot){
            var x = snapshot.val();
            var list = [];
            for(var school in x){
                //console.log(x[school]);
                list.push(x[school]);
            }
            $scope.fin_data = list;
        })
    }

    $scope.pullFinData();

});