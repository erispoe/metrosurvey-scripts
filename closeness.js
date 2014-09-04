$(document).ready(function() {
  var zipR = {Loc_ResZip} + "";
  var zipW = {Loc_WorkStudyZip} + "";

  var replace = function(dR, dW) {
    // Residential variables
    console.log(dR.StateName);
    $("#countyR").html(dR.countynamefull); // County of residence
    $("#stateR").html("The State of " + dR.StateName); // State of residence

    // Insert residential place name, as answered in a previous question
    placeR = '{INSERTANS:995335X29X1411}';
    if(placeR != '-oth-') {
        i = parseInt(placeR);
        $("#placeR").html(dR.cities[i-1]);
    } else {
        pRoth = '{INSERTANS:995335X29X1411other}';
        $("#placeR").html(pRoth);
    };

    // Insert metro area data, remove question if the respondent is not in a metro area
    if(dR.PSATitle != null) {
        $("#metroR").html(", " + dR.PSATitle);
        $("#centralR").html(dR.PSACentralCity);
    } else {
        $("#javatbd995335X26X1106SQ004").remove();
        $("#javatbd995335X26X1106SQ008").remove();
    }

    if(dW == 0) {
        $("#javatbd995335X26X1106SQ010").remove(); // Remove place of work
        $("#javatbd995335X26X1106SQ009").remove(); // Remove county of work
    } else {
        $("#countyW").html(dW.countynamefull); // Insert county of work

        // Insert place of work

        placeW = '{INSERTANS:995335X29X1413}';
        if(placeW != '-oth-') {
            i = parseInt(placeW);
            $("#placeW").html(dW.cities[i-1]);
        } else {
            pWoth = '{INSERTANS:995335X29X1413other}';
            $("#placeW").html(pWoth);
        };
    };


  }


  // ZipAPI url to get infos for residential and work places

  if(zipR != 0) {
    var urlR = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipR;  
    $.get(urlR).done(function(dataR){
        var dR = JSON.parse(dataR);
        var dW = 0;
        console.log(dR);


        if(zipW != 0) {
            var urlW = "http://swissmadearchitects.com/zipmetro-api/index.php?key=snickers&zip=" + zipW;
          
            $.get(urlW).done(function(dataW){
                dW = JSON.parse(dataW);
                console.log(dW);
                replace(dR, dW);
            });
        } else {
            replace(dR, dW);
        }

    

    });
  }
});