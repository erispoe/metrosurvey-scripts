$(document).ready(function() {

  var qId = $("[id^=javatbd]")[0].id.substring(0,21);

  var replace = function(dR) {
        // Insert state of residence
        state = dR.StateName;
        if(state == "District of Columbia") {
          state = "Maryland";
        }
        $("#ASTR").html(state);
  };


  // ZipAPI url to get infos for residential and work places

  if(zipR != 0) {
    var urlR = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipR;  
    $.get(urlR).done(function(dataR){
        var dR = JSON.parse(dataR);
        replace(dR);
        });
    };
});