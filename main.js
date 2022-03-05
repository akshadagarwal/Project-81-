var speechRecognition = window.webkitSpeechRecognition;
var recongnition = new speechRecognition();

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#camera');

function takepicture() {
    if (content == "picture activate") {
        Webcam.snap(function (data_uri) {
            document.getElementById("result1").innerHTML =
                '<img id="image1" src="' + data_uri + '"/>';
                document.getElementById("result2").innerHTML =
                '<img id="image2" src="' + data_uri + '"/>';
                document.getElementById("result3").innerHTML =
                '<img id="image3" src="' + data_uri + '"/>';

        });
        speak_data = "Done boss";
        speak();
    }
}

function speak() {
    var synthesis = window.speechSynthesis;
    // speak_data = document.getElementById("textbox").value;
    var speakthis = new SpeechSynthesisUtterance(speak_data);
    synthesis.speak(speakthis);

}


function start() {
    document.getElementById("textbox").innerHTML = "";
    recongnition.start();
}

recongnition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    content = content.toLowerCase();
    document.getElementById("textbox").innerHTML = content;
    if (content == "picture activate") {
        speak_data = "Boss system starting in 5 seconds";
    }
    else {
        speak_data = "Try again"
    }
    speak();
    setTimeout(
        function () {
            takepicture();
            save();
        }, 5000
    );
}

function save() {
    link = document.getElementById("link1");
    img = document.getElementById("image1").src;
    img = document.getElementById("image2").src;
    img = document.getElementById("image3").src;

    link.href = img;
    link.click();
}
