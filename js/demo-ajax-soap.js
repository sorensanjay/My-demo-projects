<html>
<head>
<style type="text/css">
table.hovertable {
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #999999;
	border-collapse: collapse;
}
table.hovertable th {
	background-color:#c3dde0;
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #a9c6c9;
}
table.hovertable tr {
	background-color:#d4e3e5;
}
table.hovertable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #a9c6c9;
	text-align: center;
}

.hovertable .cellEditing {
    padding: 0;

}

.hovertable .cellEditing input[type=text]{
    width:100%;
    border:0;
    background-color:rgb(255,253,210);
}
</style>

<script src="https://secure-ausomxala.crmondemand.com:443/OnDemand/user/content/jQueryLatest">
	</script>

	<script>


		 $(document).ready(function() {
			 
		 $("#search").click(function(){

                       var account=$("#acc").val();
                        alert("Searching Contacts for Account : "+account);
                     $("#dc").html("  ");

$("#dc").append('<table id="Hover" class="hovertable"><tr><th>Contact ID</th><th>Contact Full Name</th><th>Owner</th><th>Edit</th><th>Save</th><th>Cancel</th></tr>');
                       $("#Hover").fadeOut("3000",function(){Search(account);});

			//alert(account);



		 });

		 });
		 var Search = function(account){



		 var soapMessage="<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" "+
"xmlns:con=\"urn:crmondemand/ws/contact/\" " + "xmlns:con1=\"urn:/crmondemand/xml/contact\">"+
 "<soapenv:Header>"+
"<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">"+
"<wsse:UsernameToken>"+
"<wsse:Username>bsoren/jbrown</wsse:Username>"+
"<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Quartz123</wsse:Password>"+
"</wsse:UsernameToken>"+
"</wsse:Security>"+
"</soapenv:Header>"+
"<soapenv:Body>"+
"<con:ContactWS_ContactQueryPage_Input>"+
"<con1:ListOfContact>"+
"<con1:Contact>"+
"<con1:ContactFullName></con1:ContactFullName>"+
"<ContactId/>"+
"<AccountName>='"+account+"'</AccountName>"+
"<Owner/>"+
"</con1:Contact>"+
"</con1:ListOfContact>"+
"</con:ContactWS_ContactQueryPage_Input>"+
"</soapenv:Body>"+
"</soapenv:Envelope>";

//alert(soapMessage);
            $.ajax({
                     url: "https://secure-ausomxala.crmondemand.com/Services/Integration",
					 type: "POST",
                     headers: {
        SOAPAction: '"document/urn:crmondemand/ws/contact/:ContactQueryPage"'
    },
                     data: soapMessage,
                     contentType: "text/xml",
                     dataType: "xml",
                     cache: false,

					 error: function(xmlhttp, textStatus, error) {

							alert("No data found.");
							//alert(xmlhttp.readyState);
							//alert(textStatus);

						    if(xmlhttp.readyState!=4){
								alert("ReadyState :  "+xmlhttp.readyState);
								alert("HTTP Status :"+xmlhttp.status)
							}

							},
                    success: function(xml) {
                                //alert("it works");


                        $(xml).find('Contact').each(function(){
	var a = $(this).find('ContactId').text();
	var b = $(this).find('ContactFullName').text();
                var c =$(this).find('Owner').text();
                var AccountName=$(this).find('AccountName').text();
        $("#Hover").append('<tr onmouseover="this.style.backgroundColor=\'#ffff66\';" onmouseout="this.style.backgroundColor=\'#d4e3e5\';"><td>'+a+'</td><td>'+b+'</td><td>'+c+'</td><td class="tdEdit">Edit</td><td class="tdSave">Save</td><td class="tdCancel">Cancel</td></tr>")');

});

	 $(".tdEdit").click(function () {
        //var OriginalContent = $(this).text();
		var allContent='';
        $(this).parent().children().not(".tdEdit,.tdSave,.tdCancel").each(function(){

				var OriginalContent = $(this).text();
				allContent= allContent+'|'+OriginalContent;
				$(this).addClass("cellEditing");
				$(this).html("<input type='text' value='" + OriginalContent + "' />");

				//$(this).focus();
		});
			var cont = allContent.split("|");
		 $(this).parent().children().last().click(function(){
				$(this).parent().children().eq(0).text(cont[1]);
				$(this).parent().children().eq(0).removeClass("cellEditing");

				$(this).parent().children().eq(1).text(cont[2]);
				$(this).parent().children().eq(1).removeClass("cellEditing");

				$(this).parent().children().eq(2).text(cont[3]);
				$(this).parent().children().eq(2).removeClass("cellEditing");
		 });

    });

	$(".tdSave").click(function () {
        //var OriginalContent = $(this).text();
		var allContent='';
        $(this).parent().children().not(".tdEdit,.tdSave,.tdCancel").children().each(function(){

				var OriginalContent = $(this).val();
				allContent= allContent+'|'+OriginalContent;
				console.log(OriginalContent);
				console.log($(this).parent());
				$(this).parent().text(OriginalContent)
				$(this).parent().removeClass("cellEditing");


				//$(this).focus();
		});
		console.log(allContent);
		var str = allContent.split('|');
		Update(str[1],str[2],str[3]);
    });

	var Update = function(cid,cfn,owner){



		 var soapMessage="<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" "+
"xmlns:con=\"urn:crmondemand/ws/contact/\" " + "xmlns:con1=\"urn:/crmondemand/xml/contact\">"+
 "<soapenv:Header>"+
"<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">"+
"<wsse:UsernameToken>"+
"<wsse:Username>bsoren/jbrown</wsse:Username>"+
"<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Quartz123</wsse:Password>"+
"</wsse:UsernameToken>"+
"</wsse:Security>"+
"</soapenv:Header>"+
"<soapenv:Body>"+
"<con:ContactWS_ContactUpdate_Input>"+
"<con1:ListOfContact>"+
"<con1:Contact>"+
"<con1:ContactFullName>"+cfn+"</con1:ContactFullName>"+
"<ContactId>"+cid+"</ContactId>"+
"<Owner>"+owner+"</Owner>"+
"</con1:Contact>"+
"</con1:ListOfContact>"+
"</con:ContactWS_ContactUpdate_Input>"+
"</soapenv:Body>"+
"</soapenv:Envelope>";

//alert(soapMessage);
            $.ajax({
                     url: "https://secure-ausomxala.crmondemand.com/Services/Integration",
					 type: "POST",
                     headers: {
        SOAPAction: '"document/urn:crmondemand/ws/contact/:ContactUpdate"'
    },
                     data: soapMessage,
                     contentType: "text/xml",
                     dataType: "xml",
                     cache: false,

					 error: function(xmlhttp, textStatus, error) {

							alert("Error!!");
							//alert(xmlhttp.readyState);
							//alert(textStatus);

						    if(xmlhttp.readyState!=4){
								alert("ReadyState :  "+xmlhttp.readyState);
								alert("HTTP Status :"+xmlhttp.status)
							}

							},
                    success: function(xml) {
                           alert("Updated");
                            }
            });
	};





                      $("#Hover").fadeIn(3000);
                            }
            });
	};



	</script>
</head>
</body>

Enter Account Name : <input id="acc" type="text"></input>
<input id="search" type="Button" value="Search">
<br/>
<br/>
<div id="dc"></div>

</body>
</html>
