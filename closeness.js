$(document).ready(function() {
  var zip = {zip};
  var url = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zip;
  $.get(url).done(function(data){
    d = JSON.parse(data);
    console.log(d);
    $("#county").html(d.countynamefull);
    $("#state").html("the state of " + d.StateName);
    
    // Insert metro area data, remove question if the respondent is not in a metro area
    if(d.PSATitle != null) {
   		$("#cbsa").html(d.PSATitle);
    	$("#cbsacentral").html("the city of " + d.PSACentralCity);
    } else {
    	$("#javatbd367231X21X1031SQ005").remove();
    	$("#javatbd367231X21X1031SQ006").remove();
    }

    // Insert place name, as answered in a previous question
    place = '{INSERTANS:367231X21X1042}';
    if(place != '-oth-') {
    	i = parseInt(place);
    	$("#city").html('the town/city of ' + d.cities[i-1]);
    } else {
    	poth = '{INSERTANS:367231X21X1042other}';
    	$("#city").html('the town/city of ' + poth);
    };

  });
});