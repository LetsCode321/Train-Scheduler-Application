// Initialize Firebase
var config = {
  apiKey: "AIzaSyDnMK3-dphnpqiFvkU_f57Hwvbbo0HCgFQ",
  authDomain: "trainscheduler-2140b.firebaseapp.com",
  databaseURL: "https://trainscheduler-2140b.firebaseio.com",
  projectId: "trainscheduler-2140b",
  storageBucket: "trainscheduler-2140b.appspot.com",
  messagingSenderId: "665297126549"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

  var name = childSnap.val().name;
  var destination = childSnap.val().destination;
  var firstTrain = childSnap.val().firstTrain;
  var frequency = childSnap.val().frequency;
  var min = childSnap.val().min;
  var next = childSnap.val().next;

  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
 

});

//grabs information from the form
$("#addTrainBtn").on("click", function() {

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = $("#firstInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();

  //ensures that each input has a value
  if (trainName == "") {
      alert('Enter a train name.');
      return false;
  }
  if (destination == "") {
      alert('Enter a destination.');
      return false;
  }
  if (firstTrain == "") {
      alert('Enter a first train time.');
      return false;
  }
  if (frequency == "") {
      alert('Enter a frequency');
      return false;
  }

  // THE MATH!
  //subtracts the first train time back a year to ensure it's before current time.
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
  // the time difference between current time and the first train
  var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
  var remainder = difference % frequency;
  var minUntilTrain = frequency - remainder;
  var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

  var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      min: minUntilTrain,
      next: nextTrain
  }

  console.log(newTrain);
  database.ref().push(newTrain);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstInput").val("");
  $("#frequencyInput").val("");

  return false;
});




// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyDnMK3-dphnpqiFvkU_f57Hwvbbo0HCgFQ",
//   authDomain: "trainscheduler-2140b.firebaseapp.com",
//   databaseURL: "https://trainscheduler-2140b.firebaseio.com",
//   projectId: "trainscheduler-2140b",
//   storageBucket: "trainscheduler-2140b.appspot.com",
//   messagingSenderId: "665297126549"
// };
// firebase.initializeApp(config);

// var database = firebase.database();
// var currentTime = moment();

// database.ref().on("child_added", function(childSnap) {

//   var name = childSnap.val().name;
//   var destination = childSnap.val().destination;
//   var firstTrain = childSnap.val().firstTrain;
//   var frequency = childSnap.val().frequency;
//   var min = childSnap.val().min;
//   var next = childSnap.val().next;

//   $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");

// });

// database.ref().on("value", function(snapshot) {


// });

// //Pull info from form 
// $("#addTrainBtn").on("click", function() {
//   var trainName = $("#trainNameInput").val().trim();
//   var destination = $("#destinationInput").val().trim();
//   var firstTrain = $("#firstTrain").val().trim();
//   var frequency = $("#frequency").val().trim();

// //make sure user enters value 
// if (trainName == "") {
//   alert('Enter name of train.');
//   return false;
// }
// if (destination == "") {
//   alert('Enter name of destination.');
//   return false;
// }
// if (firstTrain == "") {
//   alert('Enter First Train.');
//   return false;
// }
// if (frequency == "") {
//   alert('Enter name of train.');
//   return false;
// }

// //Math

// var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1,years");
// //difference between current and first train
// var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
// var remainder = difference % frequency;
// var minUntiltrain = frequency - remainder;
// var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mma");

// var newTrain = {
//   name: trainName,
//   destination: destination,
//   firstTrain: firstTrain,
//   frequency: frequency,
//   min: minUntilTrain,
//   next: nextTrain
// }

// console.log(newTrain);
// database.ref().push(newTrain);

// $("#trainNameInput").val("");
// $("#destinationInput").val("");
// $("#firstInput").val("");
// $("#frequencyInput").val("");

// return false;
// });

