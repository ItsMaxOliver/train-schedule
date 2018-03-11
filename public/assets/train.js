$(function () {
    let database = firebase.database();
    //sets a variable to the firebase database so that we don't have to keep retyping it
    
    database.ref("schedArr/").on("value", function (snapshot) {
        let currentSched = snapshot.val();
        console.log(currentSched);
        
        if (!currentSched) {
            currentSched = [];
        }
        //checks to make sure it is an array
        
        $("form").off("submit").on("submit", function (e) {
            e.preventDefault();

            let trainName = $("#train-name").val();
            let trainDestination = $("#train-destination").val();
            let trainTime = $("#first-train-time").val();
            let trainFreq = $("#train-frequency").val();
            //sets the variables to the user input

            $("#train-name").val("");
            $("#train-destination").val("");
            $("#first-train-time").val("");
            $("#train-frequency").val("");
            //clears the input field after each input

            currentSched.push({
                "Name": trainName, 
                "Destination": trainDestination, 
                "First-Train": trainTime, 
                "Frequency": trainFreq
            });
            //pushes the values inputed as an object into currentSched

            database.ref("schedArr/").set(currentSched);
            //appends latest train added to the schedArr firebase.ref
            
        })
        
    })

})