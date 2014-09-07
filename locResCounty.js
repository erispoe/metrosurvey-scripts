$(document).ready(function() {
  var zip = {Loc_ResZip};
  var url = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zip;
  $.get(url).done(function(data){
    d = JSON.parse(data);
    console.log(d);
    var txt = "Is <strong>" + d.countynamefull + ", " + d.StateName + "</strong> the county of your main place of residence?";
    $("#countyR").html(txt);
  });
});