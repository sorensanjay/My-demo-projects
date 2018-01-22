/**
 *
 */

var populateValue = function(){


};

var TestDelayCounter = function(counter){

};

var testRun = function(){

	var buttonValue = $("#SrNumber-set").val();  // getting button value

	if(buttonValue == 'Set'){
		console.log("Set Button clicked");
		var srnumber = $("#SRNumber-id").val(); // getting service request number
		console.log("SR number is : "+srnumber);
		if(srnumber){
			if(srnumber.trim() != ""){

				ajaxSrQuery();
			}else{
				console.log("Invalid Service Request Number");
				alert("Invalid Service Request Number");
			}
		}else{
			console.log("Invalid Service Request Number");
			alert("Invalid Service Request Number");
		}



	}

	if(buttonValue == 'Reset'){

		console.log("Reset button Clicked");
		$("#SrNumber-set").val('Set');
		$("#SRNumber-id").val("");
		$("#SRNumber-id").removeAttr('readonly'); // remove attribute read only
		$("#SRNumber-id").css('background-color' , '#FFFFFF'); // change the background color


	}
};

var submitFunction=function(){

	var buttonStatus =  $("#SrNumber-set").val();
	if(buttonStatus != 'Reset'){
		console.log("Service Request Number Not Set");
		alert("Please enter valid Service Request Number!");
		return;
	}
	console.log("sending create Activity ajax Query...");
	var answer = confirm("Are you sure you want to submit this assessment?");

	if(answer){

	   retrieveRows();
	 }

};
var handleInput2 = function(subject,answer,description){

	//alert(" element ");
	var activity = new Object();
	activity.Activity = "Task";
	activity.Subject =subject;
	activity.CustomPickList0=answer;
	activity.Description=description;

	var Activities = new Array();
	Activities[0]=activity;

	var Test = new Object();
	Test.Activities = Activities;

	var json_data = JSON.stringify(Test);
	//alert(json_data);
	return json_data;
}

var retrieveRows = function(){

	var i;
	for(i=1;i<5;i++){
		var question = $("#Question-id-0"+i).text();
		var answer = $("#Answer-id-0"+i).val();
		var comment = $("#Comment-id-0"+i).val();
		console.log(question+ " # "+answer+"  # "+comment);

		var jsondata = handleInput2(question,answer,comment);
		console.log(jsondata);

		createActivitiesAjax(jsondata);
	}
	setTimeout(retrieveRows1,2000);

};

var retrieveRows1 = function(){

	var i;
	for(i=5;i<10;i++){
		var question = $("#Question-id-0"+i).text();
		var answer = $("#Answer-id-0"+i).val();
		var comment = $("#Comment-id-0"+i).val();
		console.log(question+ " # "+answer+"  # "+comment);

		var jsondata = handleInput2(question,answer,comment);
		console.log(jsondata);

		createActivitiesAjax(jsondata);
	}
	setTimeout(retrieveRows2,2000);


};

var retrieveRows2 = function(){

	var i;
	for(i=10;i<14;i++){
		var question = $("#Question-id-0"+i).text();
		var answer = $("#Answer-id-0"+i).val();
		var comment = $("#Comment-id-0"+i).val();
		console.log(question+ " # "+answer+"  # "+comment);

		var jsondata = handleInput2(question,answer,comment);
		console.log(jsondata);

		createActivitiesAjax(jsondata);
	}

	setTimeout(retrieveRows3,2000);
};

var retrieveRows3 = function(){

	var i;
	for(i=13;i<17;i++){
		var question = $("#Question-id-0"+i).text();
		var answer = $("#Answer-id-0"+i).val();
		var comment = $("#Comment-id-0"+i).val();
		console.log(question+ " # "+answer+"  # "+comment);

		var jsondata = handleInput2(question,answer,comment);
		console.log(jsondata);

		createActivitiesAjax(jsondata);
	}

	alert("All Call Finished....");
};


var createActivitiesAjax = function(jsondata){
	console.log("Calling create Activity ajax query..."+jsondata);
    var url = $("#activityCreateUrl").val();
    console.log("Activity Create URL : "+url);
	$.blockUI();
	console.log("Blocking ajax");
	$.ajax({
		url: url,
		type: 'POST',
		async:true,
		dataType: 'json',
		data: jsondata,
	    contentType : 'application/vnd.oracle.adf.resource+json',
		headers: { 'Accept-language':'en-us,en-gb'},
		error: function () { alert("Some Error While Creating activity")},
		success : function(response) {

			$.unblockUI();
			console.log("Created Activity : Unblocking");
		}
	});

};

var ajaxSrQuery = function(){

		console.log("Calling SR Ajax query...");
        $.blockUI();
		var srnumber = $("#SRNumber-id").val();
		var url = 'https://secure-ausomxala.crmondemand.com/OnDemand/user/Rest/026/ServiceRequests?fields=SRNumber,Id,CustomBoolean4&q=SRNumber="'+srnumber+'"';
		$("#srQueryUrl").val(url);  // setting service request query url

		console.log("srQueryUrl Set  "+$("#srQueryUrl").val());
	//async : false,
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				headers: { 'Accept-language':'en-us,en-gb'},
				error: function () { alert("Some Error in SR Call")},
				success : function(response) {

					var SRArray = response.ServiceRequests[0];
					if(SRArray){

					var SRNumber = response.ServiceRequests[0].SRNumber;
					var isRunAssessment = response.ServiceRequests[0].CustomBoolean4;

					if(SRNumber){

					    console.log("Valid Service Request Number!");

						if(isRunAssessment){
							var createActivityURL = "https://secure-ausomxala.crmondemand.com"+ response.ServiceRequests[0].links.Activities.href;

							$("#activityCreateUrl").val(createActivityURL);	// setting create Activities URL

							console.log("Activity create url set: "+$("#activityCreateUrl").val());

							$("#SrNumber-set").val("Reset");
							$("#SRNumber-id").attr('readonly', 'true'); // mark it as read only
							$("#SRNumber-id").css('background-color' , '#DEDEDE'); // change the background color

							console.log("Assessment Enabled!");

						}else{
							alert("Assessment Not Enabled on this Service Request");
						}
						 
						 //retrieveRows();
					}
					else{
						alert("Invalid Service Request Number");
					}

				  }else{
					alert("Invalid Service Request Number");
				  }

				  $.unblockUI();

				}
			});

};
