window.firebase = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAbGujt04nDuVI4y3JPxNdZwshkKzGMXAc",
        authDomain: "mj-train-schedules.firebaseapp.com",
        databaseURL: "https://mj-train-schedules.firebaseio.com",
        projectId: "mj-train-schedules",
        storageBucket: "",
        messagingSenderId: "792144109056"
    };
    firebase.initializeApp(config);
    return firebase;
}()
