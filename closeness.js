$(document).ready(function() {
  var zipR = {Loc_ResZip} + "";
  var zipW = {Loc_WorkStudyZip} + "";

  var replace = function(dR, dW) {
    var countyR = '';
    // Residential variables
    console.log(dR.StateName);

    // County of residence
    // Only if the county is not a consolidated city-county
    if(dR.countyConsolidated != 1) {
        countyR = dR.countynamefull;
        $("#countyR").html(countyR); // County of residence
    } else {
        // Otherwise remove the county field
        $("#javatbd995335X26X1106SQ007").remove();
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
        $("#placeR").html(placeR);
    };

    var placeW = '';
    var countyW = '';
    if(dW == 0) {
        $("#javatbd995335X26X1106SQ003").remove(); // Remove place of work
        $("#javatbd995335X26X1106SQ008").remove(); // Remove county of work
    } else {
            
        // County of work
        // Only if the county is not a consolidated city-county
        if(dW.countyConsolidated != 1) {
            countyW = dW.countynamefull;
            $("#countyW").html(countyW); // County of work
        } else {
            // Otherwise remove the county field
            $("#javatbd995335X26X1106SQ008").remove();
        }

        // Insert place of work

        placeWpr = '{INSERTANS:995335X29X1413}';
        if(placeWpr != '-oth-') {
            i = parseInt(placeWpr);
            placeW = dW.cities[i-1];
            $("#placeW").html(placeW);
        } else {
            placeW = '{INSERTANS:995335X29X1413other}';
            $("#placeW").html(placeW);
        };
    };

    // Insert metro area data (Primary statistical areas PSA), remove question if the respondent is not in a metro area
    if(dR.PSATitle != null) {
        var PSA = dR.PSATitle.split(', ');
        $("#metroR").html('The greater ' + PSA[0] + ' area (' + PSA[1] + ')');

        // Insert PSA central cities
        var j = 0;
        for (var i = 0; i < 3; i++) {
            if(i < dR.PSACentralCities.length) {
                city = dR.PSACentralCities[i];
                // Check if central city is not place of residence or work
                if(city != placeR & city != placeW) {
                    $("#centralR" + String(1 + j)).html(city);
                    j++;
                }
            }
        };
        // Remove empty slots
        for (var i = j; i < 3; i++) {
            $("#javatbd995335X26X1106SQ00" + String(4 + i)).remove()
        };

        // Insert PSA States
        var j = 0;
        for (var i = 0; i < 5; i++) {
            if(i < dR.PSAStates.length) {
                state = dR.PSAStates[i];
                // Check for DC
                if(state != countyR & state != countyW) {
                    $("#stateMetro" + String(1 + j)).html(state);
                    j++;
                }
            } 
        }

        // Remove empty slots
        for (var i = j; i < 5; i++) {
            $("#javatbd995335X26X1106SQ0" + String(10 + i)).remove();
        };

    } else {
        // If no metro area:
        // Remove field for metro area
        $("#javatbd995335X26X1106SQ009").remove(); 

        // Remove fields for centra cities of metro area
        for (var i = 0; i < 3; i++) {
            $("#javatbd995335X26X1106SQ00" + String(4 + i)).remove();
        };

        // Insert state of residence (and not states of metro area)
        state = dR.StateName;
        $("#stateMetro1").html(state);
        // Remove other state fields
        for (var i = 0; i < 4; i++) {
            $("#javatbd995335X26X1106SQ0" + String(11 + i)).remove()        
        };
    }

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