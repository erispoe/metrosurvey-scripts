$(document).ready(function() {

  var replace = function(dR) {
      if(dR.PSATitle != null) {
        // If there is a PSA (metro area), insert the name of the first central city
        city = dR.PSACentralCities[0];
        if(city == "San Jose") {
          city = "San Francisco";
        }
        $("#ACR1").html(city);
        // Remove the NoAnswer
        $(".noanswer-item").remove()
      } else {
        // If there is no PSA (metro area), pass the question
        $('#limesurvey').submit();
      }
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