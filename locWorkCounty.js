$(document).ready(function() {
  var url = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipW;
  $.get(url).done(function(data){
  	if(data == ""){
    	// Automatically answer No if zip is not found
    	$("[id^=tick_img_answer]")[1].click();
    	$('#limesurvey').submit();
    }
    d = JSON.parse(data);
    console.log(d);
    var txt = "Is <strong>" + d.countynamefull + ", " + d.StateName + "</strong> the county of your main place of work or study?";
    $("#countyW").html(txt);
  });
});