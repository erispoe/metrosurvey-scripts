$(document).ready(function() {
  var zip = {Loc_WorkStudyZip};
  var url = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zip;
  $.get(url).done(function(data){
    d = JSON.parse(data);
    console.log(d);
    var txt = "Is <strong>" + d.countynamefull + ", " + d.StateName + "</strong> the county of your main place of work or study?";
    $("#countyW").html(txt);
  });
});