$(function () {
    let database = firebase.database();
    //sets a variable to the firebase database so that we don't have to keep retyping it
    
    database.ref("schedArr").orderByChild("dateAdded")
    .on("child_added", function (snapshot) {
        
        let currentSched = snapshot.val();
        //sets a variable to the data recorded on each child appended
        
        function nextArrival() {
            
        }
        
        function minutesAway() {
            
        }
        
        var newRow = $("<tr class='tableRow'>");
        //creates a newRow variable with a class tableRow
        var currentName = $("<td class='name'>").text(currentSched.name);
        //creates a new <td> for the name inputed
        var currentDestination = $("<td class='destination'>").text(currentSched.destination);
        //creates a new <td> for the role inputed
        var currentFrequency = $("<td class='freq'>").text(currentSched.freqency);
        //creates a new <td> for the start date inputed
        var currentNextArrival = $("<td class='arrival'>").text(nextArrival);
        //creates a new <td> for the nextArrival that was calculated
        var currentMinutesAway = $("<td class='billed'>").text(minutesAway);
        //creates a new <td> for the minutesAway that was calculated
        
        newRow.append(currentName)
            .append(currentDestination)
            .append(currentFrequency)
            .append(currentNextArrival)
            .append(currentMinutesAway)
        //adds the new td elements to the new tableRow
            console.log(newRow);
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