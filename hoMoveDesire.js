$(document).ready(function() {
  var zipR = {Loc_ResZip} + "";
  
  var replace = function(dR) {

    // County of residence
    // Only if the county is not a consolidated city-county
    if(dR.countyConsolidated != 1) {
        countyR = dR.countynamefull;
        $("#countyR").html('in ' + countyR); // County of residence
    } else {
        // Otherwise remove the county field
        $("#javatbd995335X24X1089A4").remove();
    }

    // Insert residential place name, as answered in a previous question
    var placeRpr = '{INSERTANS:995335X29X1411}';
    var placeR = '';
    if(placeRpr != '-oth-') {
        i = parseInt(placeRpr);
        placeR = dR.cities[i-1];
        $("#placeR").html(placeR);
    } else {
        placeR = '{INSERTANS:995335X29X1411other}';
        $("#placeR").html('in ' + placeR);
    };

    // Insert metro area
    if(dR.PSATitle != null) {
        var PSA = dR.PSATitle.split(', ');
        $("#metroR").html('in the greater ' + PSA[0] + ' area (' + PSA[1] + ')');
    } else {
        $("#javatbd995335X24X1089A5").remove();
    }

    // Insert state
    $("#stateR").html(dR.StateName);

  };


  // ZipAPI url to get infos for residential and work places

  if(zipR != 0) {
    var urlR = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipR;  
    $.get(urlR).done(function(dataR){
        var dR = JSON.parse(dataR);
            replace(dR);
        }
    });
});