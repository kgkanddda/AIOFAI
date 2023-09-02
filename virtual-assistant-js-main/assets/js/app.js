/* 
TODO:
- select all of important elements
- grab all of element from Speech web api 
- Alexa response function here
- toggle show command area
*/

/* STEP: 1 select all of important elements  */
const microphoneBtn = document.getElementById('microphone');
const voiceText = document.getElementById("voiceText");

/* STEP: 2 grab all of element from Speech web api  */
const speechRecognition = () => {
    let recognition = new webkitSpeechRecognition();

    recognition.onstart = () => {
        microphoneBtn.classList.add('pulse')
        voiceText.innerHTML = `<small class="text-muted"> listening.... </small>`;
    }
    recognition.onend = () => microphoneBtn.classList.remove('pulse');
    recognition.onerror = () => voiceText.innerHTML = `<small class="text-muted"> Not hear yet. </small>`;
    recognition.start();
    recognition.onresult = (event) => {
        let userVoiceText = event.results[0][0].transcript;
        voiceText.innerText = userVoiceText;
        alexResponse(userVoiceText);
    }
}

/* STEP: 3 Alexa response function here  */
const alexResponse = (text) => {
    let speech = new SpeechSynthesisUtterance(text);
    /* Command Put Here*/
    if (text == 'hey Alexa how are you doing' || text == 'how are you Alexa') {
        speech.text = 'Yeah! I am good how about you?';
    } else if (text == 'hey Alexa' || text == 'hi Alexa' || text == 'hello Alexa' || text == 'Alexa' || text=='hey bro') {
        speech.text = 'Yeah! how can i help you';
    } else if (text == 'hey Alexa please open the Google' || text == 'open the Gogle') {
        speech.text = 'ok bruh! opening google';
        let location = 'https://www.google.com/';
        window.open(location, '_blank')
    } else if (text == 'hey Alexa please open the YouTube' || text == 'open the YouTube') {
        speech.text = 'Okay opening!';
        let location = 'https://www.youtube.com/';
        window.open(location, '_blank')
    } else if (text == 'hey Alexa please open the YouTube and play a nice song' || text == 'play song on YouTube') {
        speech.text = 'oky this is my favorite one! hope you like it';
        let location = 'https://www.youtube.com/watch?v=Vqfy4ScRXFQ&list=RDMMHQooYn2OReE&index=2';;
        window.open(location, '_blank')
    } else if (text == "hey Alexa do you know what's the programming Hero") {
        speech.text = 'yeah i know them cool stuff they are one of the most biggest software production company in the world.';
    } else if (text == 'I am good' || text == 'yeah I am good') {
        speech.text = 'ohh thank you';
    } else if (text == 'hey Alexa what time is it now' || text == 'tell me the time') {
        speech.text = 'Now time is ' + new Date().toLocaleTimeString();
    } else if (text == "hey Alexa what's the date today" || text == 'tell me the date' || text == "what's today") {
        speech.text = 'Today is ' + new Date().toDateString();
    } else if (text == 'ok thank you') {
        speech.text = 'your most welcome broh';
    } else if (text == 'ok I am Aashiq Muhammad') {
        speech.text = 'yeah! now I know you by name of Ashiq Muhammad'
    } else if (text == 'hey Alexa do you know me') {
        speech.text = 'Noooo! Who are you?'
    } else if (text == 'hey Alexa search videos on YouTube' || text == 'search videos on YouTube') {
        speech.text = 'What do you want to search put here?'
        setTimeout(() => {
            let searchTerms = prompt('Search Your Videos');
            if (searchTerms) {
                let location = `https://www.youtube.com/results?search_query=${searchTerms}`;
                window.open(location, '_blank')
            }
        }, 1000)

    } else if (text == 'hey Alexa do you have a girlfriend') {
        speech.text = "nope broh! what are you talking about? I am machine I don't need girlfriend. I think you should need girlfriend that's why asked me. hahahah";
    } else if (text == 'hey Alexa please change the background colour') {
        speech.text = "ok changing temporary background color";
        document.querySelector('html').classList.add('theme');
    } else if (text == 'hey Alexa what kind of command do you accept' || text == 'open the supported command area' || text == 'how many commands do you have') {
        speech.text = "oh nice question these are the command which I accept.";
        document.querySelector(".command-area").classList.add('active');
    } else if (text == 'hey Alexa please set the default colour') {
        speech.text = "ok set a default background color";
        document.querySelector('html').classList.remove('theme');
    } else if (text == 'hey Alexa please go to the programming Hero website' || text == 'go to the programming Hero dashboard') {
        speech.text = "ok I am going. Programming Hero CEO Jhanker broh himself awesome & cool";
        let location = 'https://web.programming-hero.com/dashboard';
        window.open(location, '_blank')

    } else if (text == 'ok close yourself bro' || text == 'hey Alexa close now') {
        speech.text = "ok I am closing. Thanks for";
        window.close();
    } else if (text == 'hey Alexa who is your founder' || text == 'hey Alexa who made you') {
        speech.text = "Yeah! my founder name is Ashik Mahmud & He is student of programming Hero batch 5. He is so hard working man. I love him.";
    } else {
        speech.text = 'Speech Recognize Failed. please keep your microphone nearest as much as possible.';
    }


    document.getElementById("alexText").innerText = speech.text;
    window.speechSynthesis.speak(speech);
}

microphoneBtn.addEventListener('click', speechRecognition);

/* STEP: 4 toggle show command area  */
document.getElementById("question-btn").addEventListener('click', () => {
    document.querySelector(".command-area").classList.toggle('active');
})