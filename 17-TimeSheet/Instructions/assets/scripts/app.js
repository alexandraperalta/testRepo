

// Initialize Firebase
var config = {
    apiKey: "AIzaSyALixaz3CcbTix4zuY9pVtlJfb9zKfZ1oU",
    authDomain: "ap-gtcbc.firebaseapp.com",
    databaseURL: "https://ap-gtcbc.firebaseio.com",
    projectId: "ap-gtcbc",
    storageBucket: "ap-gtcbc.appspot.com",
    messagingSenderId: "531683095752"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    // $("#add").off("click");
    $('#add').on('click', function () {
        console.log("add click");
        // get the textbox values
        var name = $('#nameInput').val().trim();
        var role = $('#roleInput').val().trim();
        var startDate = $('#startDateInput').val().trim();
        var wage = $('#wageInput').val().trim();

        $('#nameInput').val("");
        $('#roleInput').val("");
        $('#startDateInput').val("");
        $('#wageInput').val("");

        database.ref("/employeeData").push({
            empName: name,
            empRole: role,
            empStartDate: startDate,
            empWage: wage
        });
        
    });
    // database.ref("/employeeData").off("child_added");
    database.ref("/employeeData").limitToLast(1).on("child_added", function (childSnapshot) {
        
        var newPost = childSnapshot.val();
        // create new row
        var newRow = $('<tr>')
        var nameCell = $('<td>').html(newPost.empName);
        var roleCell = $('<td>').html(newPost.empRole);
        var startCell = $('<td>').html(newPost.empStartDate);
        var wageCell = $('<td>').html(newPost.empWage);

        newRow.append(nameCell, roleCell, startCell, wageCell);
        $('#empGrid').append(newRow);
    });

});
