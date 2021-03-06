$(document).ready(function() {

  var qId = $("[id^=javatbd]")[0].id.substring(0,21);

  var replace = function(dR) {
    // Insert residential place name, as answered in a previous question
    if(placeRpr != '-oth-') {
        i = parseInt(placeRpr);
        placeR = dR.cities[i-1];
    };
    
    $("#APLR").html(placeR);

    if(dR.PSATitle != null) {
        // If there is a PSA (metro area), insert the name of the first central city
        city = dR.PSACentralCities[0];
        if(city == "San Jose") {
          city = "San Francisco";
        }
        if(city != placeR) {
          $("#ACR1").html(city);
        } else {
          // If the place of residence is already the central city of the PSA (metro area), remove the question
          $('#' + qId + "ACR1").remove();
        }
        
      } else {
        // If there is no PSA (metro area), remove the question
        $('#' + qId + "ACR1").remove();
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