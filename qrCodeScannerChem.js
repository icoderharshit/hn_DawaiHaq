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

    var userId = uid;
    document.querySelector(".pop.btn.btn-success").style.display = "block";
    firebase.database().ref('Users/' + userId).on('value', function (snapshot) {
        var name = (snapshot.val() && snapshot.val().FirstName) + " " + (snapshot.val() && snapshot.val().LastName);
        var gender = (snapshot.val() && snapshot.val().data.Gender);
        outputData.innerText = name;

        var age = (snapshot.val() && snapshot.val().data.Age);

        var medicine1 = (snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 6]].Medicine1);
        var medicine2 = (snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 6]].Medicine2);
        var medicine3 = (snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 6]].Medicine3);
        var medicine4 = (snapshot.val()[Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 6]].Medicine4);

        //  var address=(snapshot.val() && snapshot.val().Address);
        //  var gender=(snapshot.val() && snapshot.val().Gender);
        //  var city=(snapshot.val() && snapshot.val().City);
        //  var state=(snapshot.val() && snapshot.val().State);
        //  var dob=(snapshot.val() && snapshot.val().DOB);
        document.getElementById('displayNameHolder').innerHTML = name;

        document.getElementById('age').innerHTML = age;
        document.getElementById('gender').innerHTML = gender;
        document.getElementById('med1').innerHTML = medicine1;
        document.getElementById('med2').innerHTML = medicine2;
        document.getElementById('med3').innerHTML = medicine3;
        document.getElementById('med4').innerHTML = medicine4;
        //  document.getElementById('lname').innerHTML=lname;
        //  document.getElementById('phone').innerHTML=tele;
        //  document.getElementById('address').innerHTML=address;
        //  document.getElementById('gender').innerHTML=gender;
        //  document.getElementById('city').innerHTML=city;
        //  document.getElementById('state').innerHTML=state;
        //  document.getElementById('dob').innerHTML=dob;
    });
    document.querySelector("#submit").addEventListener("click", function () {
       
      
        document.querySelector(".popup").style.display = "none";
       
        
    })

}
