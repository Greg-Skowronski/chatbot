var lastMsg = "0";
var botMsg = "";
var weather = {};
var viewPopup = 0;
var getName = 0;

weather.temperature = {
    unit: "celsius"
}
const K = 273;
const key = "e14e79e4f2d7ea11225ebf69efab7dba";

function replyMsg() {
    botMsg = document.createElement("p");
    botMsg.className = "msg bot";

    var indexTEMP = lastMsg.search("temp");
    var indexHUMID = lastMsg.search("humid");
    var indexWIND = lastMsg.search("wind");
    var indexPRESS = lastMsg.search("press");
    var indexWEATHER = lastMsg.search("weather");
    var indexALL = [indexTEMP, indexHUMID, indexWIND, indexPRESS, indexWEATHER];
    var i, dispType = -1;
    for (i = 0; i < indexALL.length; i++) {
        if (indexALL[i] != -1) {
            dispType = i;
        }
    }
    if(getName == 1) {
        getName = 0;
        botMsg.innerText = "Nice to meet you " + document.getElementById("username").innerText + "!";
        document.getElementById("chat").appendChild(botMsg);
        updateScroll();
        speech(botMsg.innerText);
        botMsg = "";
        return;
    }
    switch (dispType) {
        case -1:
            botMsg.innerText = "Sorry " + document.getElementById("username").innerText + " but I don't get it...";
            break;
        case 0:
            botMsg.innerText = "The current temperature in " + weather.city + " is " + weather.temperature.value + String.fromCharCode(176) + "C.";
            break;
        case 1:
            botMsg.innerText = "The current humidity in " + weather.city + " is " + weather.humidity + "%.";
            break;
        case 2:
            botMsg.innerText = "The current wind speed in " + weather.city + " is " + weather.wind + " m/s.";
            break;
        case 3:
            botMsg.innerText = "The current pressure in " + weather.city + " is " + weather.pressure + " hPa.";
            break;
        case 4:
            botMsg.innerText = "In " + weather.city + " you can see " + weather.description;
            break;
    }
    document.getElementById("chat").appendChild(botMsg);
    updateScroll();
    updatePopup();
    speech(botMsg.innerText);
    setTimeout(randomInfo(), 500);
}

function instantReplyMsg(text) {
    botMsg = document.createElement("p");
    botMsg.className = "msg bot";
    botMsg.innerText = text;
    document.getElementById("chat").appendChild(botMsg);
    updateScroll();
    speech(botMsg.innerText);
}

function myMsg() {
    lastMsg = document.getElementById("textbox").value;
    if (lastMsg != "") {
        var newMsg = document.createElement("p");
        newMsg.innerText = lastMsg;
        newMsg.className = "msg self";
        document.getElementById("chat").appendChild(newMsg);
        document.getElementById("textbox").value = "";
        updateScroll();

        if (getName == 1) {
            var indexIS = lastMsg.search(" is ");
            var punctuation = 0;
            if (indexIS != -1) {
                var length = lastMsg.length;
                var lastChar = lastMsg[length - 1];
                if (lastChar == '?' || lastChar == '!' || lastChar == '.') {
                    punctuation = 1;
                }
                var username = lastMsg.slice(indexIS + 4, length - punctuation);
            } else {
                var length = lastMsg.length;
                var lastChar = lastMsg[length - 1];
                if (lastChar == '?' || lastChar == '!' || lastChar == '.') {
                    punctuation = 1;
                }
                var username = lastMsg.slice(0, length - punctuation);
            }
            saveUser(username);
            document.getElementById("username").innerText = username;
            replyMsg();
            return;
        }
        lastMsg = lastMsg.toLocaleLowerCase();
        var indexIN = lastMsg.search(" in ");
        var punctuation = 0;
        if (indexIN != -1) {
            var length = lastMsg.length;
            var lastChar = lastMsg[length - 1];
            if (lastChar == '?' || lastChar == '!' || lastChar == '.') {
                punctuation = 1;
            }
            var city = lastMsg.slice(indexIN + 4, length - punctuation);

            setTimeout(getWeather(city), 500);
            return;
        }
        updateScroll();
        if (lastMsg.search("detail") != -1 && botMsg != "") {
            document.getElementById("imgW").src = "icons/" + weather.iconId + ".svg";
            document.getElementById("temp").innerText = weather.temperature.value + String.fromCharCode(176) + "C";
            document.getElementById("city").innerText = weather.city + ", " + weather.country;
            document.getElementById("hum").innerText = "humidity: " + weather.humidity + "%";
            document.getElementById("prs").innerText = "pressure: " + weather.pressure + "hPa";
            document.getElementById("wind").innerText = "wind: " + weather.wind + "m/s";
            document.getElementById("popup").style.display = "block";
            viewPopup = 1;
        } else
        if (lastMsg.search("detail") != -1 && botMsg == "") {
            instantReplyMsg("You need to ask a question about a weather in specific city first.");
        } else
        if (lastMsg.search("music") != -1) {
            document.getElementById("yt").style.display = "block";
        } else
        if(lastMsg.search("reset") != -1) {
            saveUser("Guest");
            document.getElementById("username").innerText = "Guest";
            location.reload();
        } else {
            instantReplyMsg("Sorry " + document.getElementById("username").innerText + " but I don't get it...");
        }
    }
}
function updateScroll() {
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
    document.getElementById("textbox").focus();
}

document.onkeypress = keyPress;

function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        myMsg();
    }
}

function speech(sentence) {
    var utterance = new SpeechSynthesisUtterance(sentence);
    /*utterance.pitch = 1.2;
    utterance.rate = 1.1;
    utterance.volume = 0.7;*/
    window.speechSynthesis.speak(utterance);
}

function getWeather(city) {
    let api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    console.log(api);
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - K);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.humidity = data.main.humidity;
            weather.pressure = data.main.pressure;
            weather.wind = data.wind.speed;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            replyMsg();
            /*
            botMsg.innerText = "The current temperature in "+city+" is "+weather.temperature.value+String.fromCharCode(176)+"C. Click on the message to see more.";
            updateScroll();
            speech(botMsg.innerText);
            */
        });
}

function closePop() {
    const pop = document.getElementById("popup");
    pop.style.display = "none";
    viewPopup = 0;
}

function minYT() {
    const yt = document.getElementById("yt");
    yt.style.display = "none";
}

function closeYT() {
    var yt = document.getElementById("video");
    yt.src = yt.src;
    minYT();
}

function randomInfo() {
    var x = Math.floor(Math.random() * 2);
    console.log(x);
    if (x == 0 && viewPopup == 0) {
        botMsg = document.createElement("p");
        botMsg.className = "msg bot";
        botMsg.innerText = "Did you know that you can type 'details' to get detailed information about the current weather?";
        document.getElementById("chat").appendChild(botMsg);
        updateScroll();
        speech(botMsg.innerText);
    }
}

function updatePopup() {
    document.getElementById("imgW").src = "icons/" + weather.iconId + ".svg";
    document.getElementById("temp").innerText = weather.temperature.value + String.fromCharCode(176) + "C";
    document.getElementById("city").innerText = weather.city + ", " + weather.country;
    document.getElementById("hum").innerText = "humidity: " + weather.humidity + "%";
    document.getElementById("prs").innerText = "pressure: " + weather.pressure + "hPa";
    document.getElementById("wind").innerText = "wind: " + weather.wind + "m/s";
}

function saveUser(username) {
    $.post("saveuser.php", { usr: username });
}

function greeting() {
    if (document.getElementById("username").innerText != "Guest")
        document.getElementById("greeting").innerText = "Hello " + document.getElementById("username").innerHTML + "! My name is Rainy and I am your personal Weather Assistant. You can ask me questions about the current weather in every city in the world.";
    else {
        getName = 1;
        document.getElementById("greeting").innerText = "Hello! I see it's your first time here, right? Let me introduce myself first. My name is Rainy and I am your personal Weather Assistant. What's your name?";
    }
    document.getElementById("greeting").style.display = "block";
    speech(document.getElementById("greeting").innerText);
}

function runbot() {
    greeting();
    document.getElementById("start").style.display = "none";
    document.getElementById("textbox").disabled = false;
}