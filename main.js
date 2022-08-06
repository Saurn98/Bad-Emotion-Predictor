prediction_1 = ""
prediction_2 = ""

var loading_icon = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 120
})

camera = document.querySelector("#camera")
console.log(camera)

Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML = "<img id='captured-image' src='"+data_uri+"'/>"
    })
}
  
console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zhhFJz_pK/model.json', hello)

function hello() {
    console.log("Ml5 is working brooo")
}

function speak() {
    var synth = window.speechSynthesis
    speakData1 = "You seem like you are " + prediction_1
    speakData2 = "Or maybe you are " + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}

function check() {
    loading_icon = document.getElementById("load")
    loading_icon.style.display = "block"
    var img = document.querySelector("#captured-image")
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if (error)
        console.error(error)
    else {
        console.log(results)
        prediction_1 = results[0].label
        prediction_2 = results[1].label
        document.getElementById('prediction-1').innerHTML = prediction_1
        document.getElementById('prediction-2').innerHTML = prediction_2
        
        var emoji_1 = document.getElementById("prediction-1-emoji")
        var emoji_2 = document.getElementById("prediction-2-emoji")
        
        if (prediction_1 == "Happy") {
            emoji_1.innerHTML = "😂"
        } else if (prediction_1 == "Sad") {
            emoji_1.innerHTML = "😟"
        } else if (prediction_1 == "Angry") {
            emoji_1.innerHTML = "🤬"
        }
        
        if (prediction_2 == "Happy") {
            emoji_2.innerHTML = "😂"
        } else if (prediction_2 == "Sad") {
            emoji_2.innerHTML = "😟"
        } else if (prediction_2 == "Angry") {
            emoji_2.innerHTML = "🤬"
        }
        loading_icon.style.display = "none"
        speak();
    }
}