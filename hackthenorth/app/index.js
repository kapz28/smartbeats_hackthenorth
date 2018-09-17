import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

let hrmData = document.getElementById("hrm-data");
let myLabel;
let hrm = new HeartRateSensor();

const btn = document.getElementById("btn");
const eventName = "demo_trigger";

btn.addEventListener("click", () => {
  //console.log("clicked")
  //sendEventIfReady(eventName);
});

function compareVals() {
if (((readingAverage - newAverage) >= 10 || (readingAverage - newAverage) <= -10) || true) {
      formData.append('bpmsamp11', "70");
      formData.append('bpmsamp12', "75");
      formData.append('bpmsamp13', "80");
      formData.append('bpmsamp14', "85");
      formData.append('bpmsamp15', "95");
      formData.append('bpmsamp16', "65");
      formData.append('bpmsamp17', "75");
      formData.append('bpmsamp18', "80");
      formData.append('bpmsamp19', "70");
      formData.append('bpmsamp20', "100");
      console.log("hello sending heartbeat to firebase")
        if (true) {
            let url = 'https://hackthenorth2018-95953.firebaseio.com/userSongs/spotify:user:22fwr42iwonrph4uxcjpaupba.json'
            fetch(url, {
              method: "PUT",
              body: formData
            }).then(response => response.json());
        } else {
            console.log("You must configure the API key in Settings.")
        }
    } else {
        console.log("NO TRIGGER");
    }
}
//compareVals

hrm.start();

function refreshData() {
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };
  //console.log(data.hrm);
  hrmData.text = JSON.stringify(data.hrm);
}


messaging.peerSocket.onopen = function() {
    sendHR();
    setInterval(sendHR, 100);
}

messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

function sendHR() {
  //console.log(hrmData.text);
  var heartRate = hrmData.text;
  //console.log(heartRate);

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    //console.log("sending");
    console.log(heartRate);
    messaging.peerSocket.send(heartRate);
    myLabel = document.getElementById("myLabel");
    myLabel.text = `${heartRate}`;
    //sendEventIfReady(eventName);
  } else {
    console.log("Sending Error");
  }
  refreshData();
}

function sendEventIfReady(eventName) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({eventName: eventName});
    console.log(eventName)
  }
}
