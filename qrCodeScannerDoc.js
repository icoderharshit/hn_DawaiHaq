const qr = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qr.callback = res => {
  if (res) {
   
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    var uid= qr.decode();
    verifyQr(uid);
    console.log(uid);
  } catch (e) {
    setTimeout(scan, 300);
  }
}

function verifyQr(uid){

  var userId;

      userId =uid;
      // firebase.database().ref('/Users/' + userId).set({
      //     FirstName: "Deepak",
      //     LastName: "Singh",
      //     Type: "Doctor",
      //     Phone: "Tel",
      //     Address: "Address",
      //     Gender: "Male",
      //     City: "city",
      //     State: "state",
      //     DOB: "dob",
      //     Presc: 0
      // });
      document.querySelector(".pop.btn.btn-success").style.display = "block";

      firebase.database().ref('Users/' + userId).on('value', function (snapshot) {

          var name = (snapshot.val() && snapshot.val().FirstName) + " " + (snapshot.val() && snapshot.val().LastName);
          var gender = (snapshot.val() && snapshot.val().data.Gender);
          outputData.innerText = name;

          var age = (snapshot.val() && snapshot.val().data.Age);
          var blood = (snapshot.val() && snapshot.val().data.Blood);

          //  var tele=(snapshot.val() && snapshot.val().Phone);
          //  var address=(snapshot.val() && snapshot.val().Address);
          //  var gender=(snapshot.val() && snapshot.val().Gender);
          //  var city=(snapshot.val() && snapshot.val().City);
          //  var state=(snapshot.val() && snapshot.val().State);
          //  var dob=(snapshot.val() && snapshot.val().DOB);
          document.getElementById('displayNameHolder').innerHTML = name;



          document.getElementById('age').innerHTML = age;
          document.getElementById('gender').innerHTML = gender;
          document.getElementById('blood').innerHTML = blood;

      });
      document.querySelector("#submit").addEventListener("click", function () {
      document.querySelector(".popup").style.display = "none";
      
 

  })
  document.querySelector("#subPrescription").addEventListener("click", function () {
    var medicine1 = document.querySelector("#medicine1").value;
    var medicine2 = document.querySelector("#medicine2").value;
    var medicine3 = document.querySelector("#medicine3").value;
    var medicine4 = document.querySelector("#medicine4").value;


    firebase.database().ref('/Users/' + userId).push({
        Medicine1: medicine1,
        Medicine2: medicine2,
        Medicine3: medicine3,
        Medicine4: medicine4
    });
    alert("Presciptions successfully uploaded !");
    firebase.database().ref('Users/' + userId).on('value', function (snapshot) {

        console.log(snapshot.val());

    });
})
}
