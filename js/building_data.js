var data = {
	school: "",
	buildName: "",
	buildNumber: "",
	abbreviation: "",
	campus: "",
	address: "",
	grossSquareFootage: "",
	leasingType: "",
	status: "",
	class: "",
	yearBuilt: "",
	age: "",
	leedLevel: "",
	leedCertificationYear: "",
	longitude: "",
	latitude: "",
	precint: "",
	city: "",
	floorPlan: "",
	FCI: "",
	resType: "",
	ownershipType: "",
	ERC: "",
	LRC: "",
	LRY: "",
	condition: 0, // complete later...
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
var submitNewData = function(school, bName, bNum, abbrev, campus, address, gsf,lType,status,cls,
	built, age, leedLvl, certYr, x, y, pre, city,plan, fci, res, own, erc, lrc, lry, cond, ac,
	access, assigns, bCost, nFloors, update, usage, nsf, asf){
	entry = data;
	entry.school = updateStringField(school);
	entry.buildName = updateStringField(bName);
	entry.buildNumber = updateStringField(bNum);
	entry.abbreviation = updateStringField(abbrev);
	entry.campus = updateStringField(campus);
	entry.address = updateStringField(address);
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
	// ...
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
	var s = string.replace(/\s/g.'');
	if(s.length == 0){
		return s;
	}else{
		return string;
	}
}