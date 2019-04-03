var validators = {};
exports.validators = function() {
	return validators;
};



validators.RequiredFieldValidatorTextBox = function(txt) {
	var isValid = false;
	if (txt !== null && txt !== undefined) {
		if (txt.trim() !== '') {
			isValid = true;
		}
	}
	return isValid;
};

validators.RegularExpressionName = function(txt) {
	//console.log('inside RegularExpressionName '+txt);
	var isValid = false;
	var reg = /^[A-Za-z ]+$/g;
	//var reg = /^([A-Za-z ]+) {2,20}$/;

	if (txt !== '' && txt !== null) {
		if (txt.trim() !== '') {

			if (txt.length >= 2 && txt.length <= 20) {

				if (!txt.match(reg)) {
					isValid = false;

				} else {
					isValid = true;
				}

			} else {
				isValid = false;

			}

		}
	} else {

		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionNumber = function(txt) {
	var isValid = false;
	var reg = "^\+?\d*$";
	if (isNaN(txt.value) !== true && txt.value !== null ) {
		isValid = true;
	}
	console.log('here' + isValid);
	return isValid;
};




validators.CheckForSpecialChars = function(str) {
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
	for (var i = 0; i < str.length; i++) {
		if (iChars.indexOf(str.charAt(i)) != -1) {

			return false;
		}
	}
	return true;
};



validators.RegularExpressionEmail = function(txt) {
	var isValid = false;
	var reg = /\S+@\S+\.\S+/;
	//var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	if (txt !== '' && txt !== null) {
		if (reg.test(txt) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};


validators.RegularExpressionUserName = function(txt) {
	var isValid = false;
	var reg = /^[A-Za-z0-9 ]+$/g;
	if (txt.value !== '' && txt.value.trim() !== '') {
		if (reg.test(txt.value) == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionPassword = function(txt) {
	/*TODO need to make changes here*/
	var isValid = false;
	var str = txt.toString().trim();
	// var reg = /^([a-z0-9])|(?=.*[_$@.])+$/i;
	var letter =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;///[a-zA-Z]/;
	//var number = /[0-9]/;
	//var valid = number.test(str) && letter.test(str);
	if (str.length >= 6) {
		// isValid = false;
		var _valid = letter.test(str);
		//var _valid = number.test(str) && letter.test(str);
		
		// if (reg.test(str) == false) {
		if (_valid == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}

	return isValid;
};

validators.RegularExpressionPasswordLength = function(txt) {
	var isValid = false;
	//Ti.API.info(JSON.stringify(txt));
	if (txt.value !== null) {
		if (txt.value.length >= 6) {
			if (txt.value.trim() !== '') {
				isValid = true;
			}
		}
	}
	return isValid;
};

validators.RegularExpressionMobileNumber = function(txt) {
	var isValid = false;
	var reg = /^\+?\d*$/;
	if (isNaN(txt) === false && txt !== null) {
		//if (txt.length === 10) {
			if (txt.trim() !== '') {
				isValid = true;
			}
		//}
	}

	return isValid;
};