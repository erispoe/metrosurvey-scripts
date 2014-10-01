$(document).ready(function() {
  var url = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipR;
  $.get(url).done(function(data){
    if(data == ""){
    	// Automatically answer No if zip is not found
    	$("[id^=tick_img_answer]")[1].click();
    	$('#limesurvey').submit();
    }
    d = JSON.parse(data);
    console.log(d);
    var txt = "Is <strong>" + d.countynamefull + ", " + d.StateName + "</strong> the county of your main place of residence?";
    $("#countyR").html(txt);
  });
});