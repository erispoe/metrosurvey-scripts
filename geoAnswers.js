$(document).ready(function() {

  var qId = $("[id^=javatbd]")[0].id.substring(0,21);

  var replace = function(dR, dW) {
    var countyR = '';
    // Residential variables
    console.log(dR.StateName);

    // County of residence
    // Only if the county is not a consolidated city-county
    if(dR.countyConsolidated != 1) {
        countyR = dR.countynamefull;
        $("#ACOR").html(countyR); // County of residence
    } else {
        // Otherwise remove the county field
        $("#" + qId + "ACOR").remove();
    }

    // Insert residential place name, as answered in a previous question
    if(placeRpr != '-oth-') {
        i = parseInt(placeRpr);
        placeR = dR.cities[i-1];
    };
    
    $("#APLR").html(placeR);

    var countyW = '';
    if(dW == 0) {
        $("#" + qId + "APLW").remove(); // Remove place of work
        $("#" + qId + "ACOW").remove(); // Remove county of work
    } else {
            
        // County of work
        // Only if the county is not a consolidated city-county and if different from county of residence
        if(dW.countyConsolidated != 1 & dW.countynamefull != dR.countynamefull) {
            countyW = dW.countynamefull;
            $("#ACOW").html(countyW); // County of work
        } else {
            // Otherwise remove the county field
            $("#" + qId + "ACOW").remove();
        }

        // Insert place of work
        // Only if different from place of residence

        if(placeWpr != '-oth-') {
            i = parseInt(placeWpr);
            placeW = dW.cities[i-1];  
        };

        if(placeW != placeR) {
            $("#APLW").html(placeW);
        } else {
            $("#" + qId + "APLW").remove();
        };
        
    };

    // Insert metro area data (Primary statistical areas PSA), remove question if the respondent is not in a metro area
    if(dR.PSATitle != null) {
        var PSA = dR.PSATitle.split(', ');
        $("#AMR").html('The greater ' + PSA[0] + ' area (' + PSA[1] + ')');

        // Insert PSA central cities
        var j = 0;
        for (var i = 0; i < 3; i++) {
            if(i < dR.PSACentralCities.length) {
                city = dR.PSACentralCities[i];
                // Check if central city is not place of residence or work
                if(city != placeR & city != placeW) {
                    $("#ACR" + String(1 + j)).html(city);
                    j++;
                }
            }
        };
        // Remove empty slots
        for (var i = j; i < 3; i++) {
            $("#" + qId + "ACR" + String(1 + i)).remove()
        };

        // Insert PSA States
        var j = 0;
        for (var i = 0; i < 5; i++) {
            if(i < dR.PSAStates.length) {
                state = dR.PSAStates[i];
                // Check for DC
                if(state != countyR & state != countyW) {
                    $("#ASMR" + String(1 + j)).html(state);
                    j++;
                }
            } 
        }

        // Remove empty slots
        for (var i = j; i < 5; i++) {
            $("#" + qId + "ASMR" + String(1 + i)).remove();
        };

    } else {
        // If no metro area:
        // Remove field for metro area
        $("#" + qId + "AMR").remove(); 

        // Remove fields for centra cities of metro area
        for (var i = 0; i < 3; i++) {
            $("#" + qId + "ACR" + String(1 + i)).remove();
        };

        // Insert state of residence (and not states of metro area)
        state = dR.StateName;
        $("#ASMR1").html(state);
        // Remove other state fields
        for (var i = 0; i < 4; i++) {
            $("#" + qId + "ASMR" + String(2 + i)).remove()        
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