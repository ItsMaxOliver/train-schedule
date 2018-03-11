$(function () {
    let database = firebase.database();
    //sets a variable to the firebase database so that we don't have to keep retyping it
    
    database.ref("schedArr").orderByChild("dateAdded")
    .on("child_added", function (snapshot) {
        
        let currentSched = snapshot.val();
        //sets a variable to the data recorded on each child appended
        
        let freqTime = currentSched.frequency;
        //value inputed from user for frequency
        
        let timeNow = moment();
        //the current time in military format

        let firstTime = moment(currentSched.first, "hh:mm")
        .subtract(1, "years");
        //puts the inputed start date into military format a year ago so that we can get the difference later
        
        let diffTime = moment().diff(moment(firstTime), "minutes");
        //calculates the difference between the first train time and the current time in minutes
        
        let remainder = diffTime % freqTime;
        // finds the remainder
        
        let minutesAway = freqTime - remainder;
        //calculates the minutesAway
        
        var nextArrival = moment().add(minutesAway, "minutes", "HH:mm");
        //adds the minutes away value to the current time to calculate the nextArrival time
        
        var newRow = $("<tr class='tableRow'>");
        //creates a newRow variable with a class tableRow
        
        var currentName = $("<td class='name'>").text(currentSched.name);
        //creates a new <td> for the name inputed
        var currentDestination = $("<td class='destination'>").text(currentSched.destination);
        //creates a new <td> for the destination inputed
        var currentFirstTime = $("<td class='first-train'>").text(moment(firstTime).format("h:mm A"));
        //creates a new <td> for the first train time in an am/pm formant
        var currentFrequency = $("<td class='freq'>").text(currentSched.frequency + " minutes");
        //creates a new <td> for the frequency inputed
        var currentNextArrival = $("<td class='arrival'>").text(moment(nextArrival).format("h:mm A"));
        //creates a new <td> for the nextArrival that was calculated in an am/pm format
        var currentMinutesAway = $("<td class='billed'>").text(minutesAway);
        //creates a new <td> for the minutesAway that was calculated
        
        newRow.append(currentName)
            .append(currentDestination)
            .append(currentFirstTime)
            .append(currentFrequency)
            .append(currentNextArrival)
            .append(currentMinutesAway)
        //adds the new td elements to the new tableRow

        $("tbody").append(newRow);
        // dynamically creates new table rows with train data
        
    })
        
    $("form").off("submit").on("submit", function (e) {
        e.preventDefault();

        let trainName = $("#train-name").val().trim();
        let trainDestination = $("#train-destination").val().trim();
        let trainTime = $("#first-train-time").val().trim();
        let trainFreq = $("#train-frequency").val().trim();
        //sets the variables to the user input

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#first-train-time").val("");
        $("#train-frequency").val("");
        //clears the input field after each input

        database.ref("schedArr").push({
            "name": trainName, 
            "destination": trainDestination, 
            "first": trainTime, 
            "frequency": trainFreq
        });
        //pushes the values inputed as an object into currentSched
    })

})