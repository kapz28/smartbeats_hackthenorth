import document from "document";
import * as messaging from "messaging";
import { settingsStorage } from "settings";
var currentReading;
var readingArray = [];
var newArray = [];
var numberOfReadings = 100;
var initVar = 0;
var totalReadingVal = 0;
var totalNewVal = 0;
var readingAverage = 0;
var newAverage = 0;

messaging.peerSocket.onopen = function () {
}

messaging.peerSocket.onmessage = function (evt) {
    // Output readings into an array
    compareVals(evt);
  /*
    currentReading = evt.data;
    currentReading = currentReading.heartRate;
    newArray.push(currentReading);

    //when array fills up:
    if (newArray.length == numberOfReadings) {
        //first time that newArray fills up, there is no array to compare to, so we ignore the if statement below
        initVar++;

        //compare the old array values to new array values
        if (initVar != 1) {
            compareVals();
        }

        //move new array values to old array values, empty new array for new values
        readingArray = [];
        readingArray = newArray;
        newArray = [];
        console.log("start timer");
        //    sleep(10000000000);
        console.log("end timer");
    }
  */
}

function sleep(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


function compareVals(evt) {
    currentReading = evt.data;
    currentReading = currentReading.heartRate;
    newArray.push(currentReading);

    //when array fills up:
    if (newArray.length == numberOfReadings) {
        //first time that newArray fills up, there is no array to compare to, so we ignore the if statement below
        initVar++;

        //compare the old array values to new array values
        if (initVar != 1) {
            compareVals();
        }

        //move new array values to old array values, empty new array for new values
        readingArray = [];
        readingArray = newArray;
        newArray = [];
        console.log("start timer");
        //    sleep(10000000000);
        console.log("end timer");
    }
    //find the average of the new array
    var totalReadingVal = 0;
    var readingAverage = 0;
    for (var i = 0; i < numberOfReadings; i++) {
        totalReadingVal += (readingArray[i]);
    }
    readingAverage = totalReadingVal / numberOfReadings;

    //find the average of the old array
    var totalNewVal = 0;
    var newAverage = 0;
    for (var i = 0; i < numberOfReadings; i++) {
        totalNewVal += (newArray[i]);
    }
    newAverage = totalNewVal / numberOfReadings;

    //find difference between two averages: if greater than 10 bpm, change the song in queue
    if (((readingAverage - newAverage) >= 10 || (readingAverage - newAverage) <= -10) || true) {
      console.log("hello sending heartbeat to firebase");
      newAverage.toString();
      var send_hearate = "{\"bpm\":\"" +newAverage + "\"}";
        if (true) {
            let url = 'https://hackthenorth2018-95953.firebaseio.com/userSongs.json'
            fetch(url, {
              method: "POST",
              body: send_hearate
            }).then(response => response.json(), console.error).then(console.log);
        } else {
            console.log("You must configure the API key in Settings.")
        }
    } else {
        console.log("NO TRIGGER");
    }

    //housekeeping
    var totalReadingVal = 0;
    var totalNewVal = 0;
    var readingAverage = 0;
    var newAverage = 0;
}
  
