var userdata;

var orientationpoints = 0;
var orientationcounter = 0;
var questionsorientation;

var retentionpoints = 0;
var retentioncounter = 0;
var retentionobjects;

var mathpoints = 0;
var mathcounter = 0;
var newnumber;
var number = Math.round(Math.random() * (150 - 50) + 50);

var rememberpoints = 0;
var remembercounter = 0;

var speakpoints = 0;
var speakcounter = 0;
var questionsspeak;

var date = new Date();
var dateday = date.getDate() + "";
document.getElementById("auswertung").style.display = "none";
if (dateday.length == 1) {
  dateday = "0" + dateday;
}
else {
  dateday = date.getDate();
}
var datemonth = (date.getMonth() + 1) + "";
if (datemonth.length == 1) {
  datemonth = "0" + datemonth;
}
else {
  datemonth = date.getMonth() + 1;
}
var fulldatetext = dateday + "." + datemonth + "." + date.getFullYear();
var rightcolor;
var question;
var questiont;
var x;
var x1;
var x2;
var x3;
var x4;
var button;
var buttont;
var outputrange;
var anzeigetext;
var anzeige;
var month;
if (datemonth == "01") {
  month = "Januar";
}
if (datemonth == "02") {
  month = "Februar";
}
if (datemonth == "03") {
  month = "März";
}
if (datemonth == "04") {
  month = "April";
}
if (datemonth == "05") {
  month = "Mai";
}
if (datemonth == "06") {
  month = "Juni";
}
if (datemonth == "07") {
  month = "Juli";
}
if (datemonth == "08") {
  month = "August";
}
if (datemonth == "09") {
  month = "September";
}
if (datemonth == "10") {
  month = "Oktober";
}
if (datemonth == "11") {
  month = "November";
}
if (datemonth == "12") {
  month = "Dezember";
}
var age;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pages/js/service-worker.js')
    .then(function() { console.log('Service Worker Registered'); }).catch(function(err) {
      console.log("No it didn't Error", err)
    });
}
else {
  console.log("NO REGISTERED")
}

// Code to handle install prompt on desktop



let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', function(event) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("Installprompt");
});



// Installation must be done by a user gesture! Here, the button click
addBtn.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  addBtn.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      }
      else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

function asksession() {
  (async() => {
    const rawResponse = await fetch('/asksession', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    if (content.sessionmessage == "succes") {
      userdata = content.userdata;
      alter();
      starttest();
    }
    else if (content.sessionmessage == "nosession") {
      window.location.href = "/";
    }
  })();
}

asksession();

function logout() {
  var logoutdata = {
    SessionID: userdata.SessionID
  };
  (async() => {
    const rawResponse = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logoutdata)
    });
    const content = await rawResponse.json();
    if (content.logoutmessage == "succes") {
      window.location.href = "/";

    }
    else if (content.logoutmessage == "err") {
      console.log("Error");

    }
  })();
}

function starttest() {
  var usertestdata = {
    SessionID: userdata.SessionID
  };
  (async() => {
    const rawResponse = await fetch('/gettestorientation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usertestdata)
    });
    questionsorientation = await rawResponse.json();
    orientationtest(orientationcounter);
  })();

  (async() => {
    const rawResponse = await fetch('/gettestspeak', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usertestdata)
    });
    questionsspeak = await rawResponse.json();
  })();

}

function alter() {
  var G_tag = parseInt(userdata.dayob);
  var G_monat = parseInt(userdata.monthob);
  var G_jahr = parseInt(userdata.yearob);

  var G_datum = new Date(G_tag, G_monat, G_jahr);
  var H_datum = new Date();

  var H_tag = H_datum.getDate();
  var H_monat = H_datum.getMonth();
  var H_jahr = H_datum.getYear();

  age = H_datum.getFullYear() - G_jahr;

  if (G_monat > H_monat) {
    age = age - 1;
  }
  else if (G_monat == H_monat) {
    if (G_tag < G_monat) {
      age = age - 1;
    }
  }

}

function orientationtest(i) {

  document.getElementById("category").innerHTML = "Orientierung";
  if (questionsorientation.questions[i].answart == "date") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "dd.mm.yyyy");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }
  if (questionsorientation.questions[i].answart == "year") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "yyyy");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "season") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("fieldset");
    x.setAttribute("id", "fieldradio");

    x1 = document.createElement("INPUT");
    x1.setAttribute("type", "radio");
    x1.setAttribute("id", "x1");
    x1.setAttribute("name", "auswahl");
    x1.setAttribute("value", questionsorientation.questions[i].a1);
    x1.appendChild(document.createTextNode(x1.value));
    var x1text = document.createElement("label");
    var x1textNode = document.createTextNode(x1.value);
    x1text.setAttribute("for", "x1");
    x1text.appendChild(x1textNode);


    x2 = document.createElement("INPUT");
    x2.setAttribute("type", "radio");
    x2.setAttribute("id", "x2");
    x2.setAttribute("name", "auswahl");
    x2.setAttribute("value", questionsorientation.questions[i].a2);
    x2.appendChild(document.createTextNode(x2.value));
    var x2text = document.createElement("label");
    var x2textNode = document.createTextNode(x2.value);
    x2text.setAttribute("for", "x2");
    x2text.appendChild(x2textNode);

    x3 = document.createElement("INPUT");
    x3.setAttribute("type", "radio");
    x3.setAttribute("id", "x3");
    x3.setAttribute("name", "auswahl");
    x3.setAttribute("value", questionsorientation.questions[i].a3);
    x3.appendChild(document.createTextNode(x3.value));
    var x3text = document.createElement("label");
    var x3textNode = document.createTextNode(x3.value);
    x3text.setAttribute("for", "x3");
    x3text.appendChild(x3textNode);

    x4 = document.createElement("INPUT");
    x4.setAttribute("type", "radio");
    x4.setAttribute("id", "x4");
    x4.setAttribute("name", "auswahl");
    x4.setAttribute("value", questionsorientation.questions[i].a4);
    x4.appendChild(document.createTextNode(x4.value));
    var x4text = document.createElement("label");
    var x4textNode = document.createTextNode(x4.value);
    x4text.setAttribute("for", "x4");
    x4text.appendChild(x4textNode);
    x.appendChild(x1text);
    x.appendChild(x1);
    x.appendChild(document.createElement("p"));
    x.appendChild(x2text);
    x.appendChild(x2);
    x.appendChild(document.createElement("p"));
    x.appendChild(x3text);
    x.appendChild(x3);
    x.appendChild(document.createElement("p"));
    x.appendChild(x4text);
    x.appendChild(x4);
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "name") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Vorname");
    x.setAttribute("pattern", "^\S*$");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "birthplace") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Geburtsort");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "birthdate") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "dd.mm.yyyy");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "month") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Monat");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "age") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Alter");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsorientation.questions[i].answart == "chose") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsorientation.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("fieldset");
    x.setAttribute("id", "fieldradio");

    x1 = document.createElement("INPUT");
    x1.setAttribute("type", "radio");
    x1.setAttribute("id", "x1");
    x1.setAttribute("name", "auswahl");
    x1.setAttribute("value", questionsorientation.questions[i].a1);
    x1.appendChild(document.createTextNode(x1.value));
    var x1text = document.createElement("label");
    var x1textNode = document.createTextNode(x1.value);
    x1text.setAttribute("for", "x1");
    x1text.appendChild(x1textNode);


    x2 = document.createElement("INPUT");
    x2.setAttribute("type", "radio");
    x2.setAttribute("id", "x2");
    x2.setAttribute("name", "auswahl");
    x2.setAttribute("value", questionsorientation.questions[i].a2);
    x2.appendChild(document.createTextNode(x2.value));
    var x2text = document.createElement("label");
    var x2textNode = document.createTextNode(x2.value);
    x2text.setAttribute("for", "x2");
    x2text.appendChild(x2textNode);

    x3 = document.createElement("INPUT");
    x3.setAttribute("type", "radio");
    x3.setAttribute("id", "x3");
    x3.setAttribute("name", "auswahl");
    x3.setAttribute("value", questionsorientation.questions[i].a3);
    x3.appendChild(document.createTextNode(x3.value));
    var x3text = document.createElement("label");
    var x3textNode = document.createTextNode(x3.value);
    x3text.setAttribute("for", "x3");
    x3text.appendChild(x3textNode);

    x4 = document.createElement("INPUT");
    x4.setAttribute("type", "radio");
    x4.setAttribute("id", "x4");
    x4.setAttribute("name", "auswahl");
    x4.setAttribute("value", questionsorientation.questions[i].a4);
    x4.appendChild(document.createTextNode(x4.value));
    var x4text = document.createElement("label");
    var x4textNode = document.createTextNode(x4.value);
    x4text.setAttribute("for", "x4");
    x4text.appendChild(x4textNode);
    x.appendChild(x1text);
    x.appendChild(x1);
    x.appendChild(document.createElement("p"));
    x.appendChild(x2text);
    x.appendChild(x2);
    x.appendChild(document.createElement("p"));
    x.appendChild(x3text);
    x.appendChild(x3);
    x.appendChild(document.createElement("p"));
    x.appendChild(x4text);
    x.appendChild(x4);
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

}

function retentiontest(i) {
  if (i == 0) {
    anzeige = document.createElement("a");
    anzeigetext = document.createTextNode("Im folgenden werden Ihnen drei Begriffe gezeigt, diese müssen Sie sich merken und daraufhin nacheinander eingeben. Sollten Sie sich nicht an den Begriff erinnern können, lassen Sie das Textfeld leer.");
    anzeige.appendChild(anzeigetext);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);

    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode(retentionobjects.objects[0].name);
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      outputrange.appendChild(anzeige);
    }, 15000);


    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode(retentionobjects.objects[1].name);
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      outputrange.appendChild(anzeige);
    }, 25000);


    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode(retentionobjects.objects[2].name);
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      outputrange.appendChild(anzeige);
    }, 35000);
    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode("Begriff: " + (i + 1));
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      x = document.createElement("INPUT");
      x.setAttribute("id", "answertext");
      x.setAttribute("type", "text");
      x.setAttribute("class", "blackfont");
      x.setAttribute("placeholder", "Begriff");
      anzeige.appendChild(document.createElement("p"));
      button = document.createElement("a");
      buttont = document.createTextNode("Bestätigen");
      button.setAttribute("onclick", "submitanswer()");
      button.setAttribute("class", "btn btn-primary btn-outline btn-md");
      button.appendChild(buttont);
      outputrange = document.getElementById("question");
      outputrange.appendChild(anzeige);
      outputrange.appendChild(x);
      outputrange.appendChild(document.createElement("p"));
      outputrange.appendChild(button);
      retentioncounter += 1;
    }, 45000)
  }
  else {
    anzeige.remove();
    anzeige = document.createElement("h1");
    x = document.createElement("a");
    anzeigetext = document.createTextNode("Begriff: " + (i + 1));
    anzeige.appendChild(x);
    x.appendChild(anzeigetext);
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Begriff");
    anzeige.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);
    outputrange.appendChild(x);
    outputrange.appendChild(document.createElement("p"));
    outputrange.appendChild(button);
    retentioncounter += 1;
  }
}

function mathtest(i) {
  if (i == 0) {
    document.getElementById("category").innerHTML = "Rechnen";
    anzeige = document.createElement("a");
    anzeigetext = document.createTextNode("Im folgenden wird Ihnen eine Zahl angezeigt, von der Sie fünfmal hintereinander sieben abziehen müssen. Sollten Sie die falsche Zahl eingeben, machen Sie einfach mit der Zahl weiter, die Sie eingegeben haben.");
    anzeige.appendChild(anzeigetext);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);

    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode("Zahl: " + number);
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      x = document.createElement("INPUT");
      x.setAttribute("id", "answertext");
      x.setAttribute("type", "text");
      x.setAttribute("class", "blackfont");
      x.setAttribute("placeholder", "Bitte Zahl -7 eingeben");
      anzeige.appendChild(document.createElement("p"));
      button = document.createElement("a");
      buttont = document.createTextNode("Bestätigen");
      button.setAttribute("onclick", "submitanswer()");
      button.setAttribute("class", "btn btn-primary btn-outline btn-md");
      button.appendChild(buttont);
      outputrange = document.getElementById("question");
      outputrange.appendChild(anzeige);
      outputrange.appendChild(x);
      outputrange.appendChild(document.createElement("p"));
      outputrange.appendChild(button);
      mathcounter += 1;
    }, 15000);
  }
  else if (i < 5) {
    anzeige.remove();
    anzeige = document.createElement("h1");
    x = document.createElement("a");
    anzeigetext = document.createTextNode("Zahl: " + newnumber);
    anzeige.appendChild(x);
    x.appendChild(anzeigetext);
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Bitte Zahl -7 eingeben");
    anzeige.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);
    outputrange.appendChild(x);
    outputrange.appendChild(document.createElement("p"));
    outputrange.appendChild(button);
    mathcounter += 1;
  }
}

function remembertest(i) {
  if (i == 0) {
    document.getElementById("category").innerHTML = "Erinnerung";
    anzeige = document.createElement("a");
    anzeigetext = document.createTextNode("Im folgenden müssen Sie die drei Begriffe eingeben, die Sie sich in Aufgabe 2 merken mussten. Sollten Sie sich nicht an den Begriff erinnern können, lassen Sie das Textfeld leer.");
    anzeige.appendChild(anzeigetext);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);
    setTimeout(function() {
      anzeige.remove();
      anzeige = document.createElement("h1");
      x = document.createElement("a");
      anzeigetext = document.createTextNode("Begriff: " + (i + 1));
      anzeige.appendChild(x);
      x.appendChild(anzeigetext);
      x = document.createElement("INPUT");
      x.setAttribute("id", "answertext");
      x.setAttribute("type", "text");
      x.setAttribute("class", "blackfont");
      x.setAttribute("placeholder", "Begriff");
      anzeige.appendChild(document.createElement("p"));
      button = document.createElement("a");
      buttont = document.createTextNode("Bestätigen");
      button.setAttribute("onclick", "submitanswer()");
      button.setAttribute("class", "btn btn-primary btn-outline btn-md");
      button.appendChild(buttont);
      outputrange = document.getElementById("question");
      outputrange.appendChild(anzeige);
      outputrange.appendChild(x);
      outputrange.appendChild(document.createElement("p"));
      outputrange.appendChild(button);
      remembercounter += 1;
    }, 15000)
  }
  else {
    anzeige.remove();
    anzeige = document.createElement("h1");
    x = document.createElement("a");
    anzeigetext = document.createTextNode("Begriff: " + (i + 1));
    anzeige.appendChild(x);
    x.appendChild(anzeigetext);
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Begriff");
    anzeige.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    outputrange = document.getElementById("question");
    outputrange.appendChild(anzeige);
    outputrange.appendChild(x);
    outputrange.appendChild(document.createElement("p"));
    outputrange.appendChild(button);
    remembercounter += 1;
  }
}

function speaktest(i) {

  document.getElementById("category").innerHTML = "Sprache";
  if (questionsspeak.questions[i].answart == "write") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsspeak.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Bitte Text eingeben");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsspeak.questions[i].answart == "presscolor") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsspeak.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));

    x1 = document.createElement("img");
    x1.setAttribute("src", "pages/images/rot.png");
    x1.setAttribute("alt", "Rotes Viereck");
    x1.setAttribute("onclick", `checkcolor("red")`);

    x2 = document.createElement("img");
    x2.setAttribute("src", "pages/images/blau.png");
    x2.setAttribute("alt", "Blaues Viereck");
    x2.setAttribute("onclick", `checkcolor("blue")`);

    x3 = document.createElement("img");
    x3.setAttribute("src", "pages/images/grün.png");
    x3.setAttribute("alt", "Grünes Viereck");
    x3.setAttribute("onclick", `checkcolor("green")`);

    x4 = document.createElement("img");
    x4.setAttribute("src", "pages/images/weiß.png");
    x4.setAttribute("alt", "Weißes Viereck");
    x4.setAttribute("onclick", `checkcolor("white")`);
    question.appendChild(x1);
    question.appendChild(x2);
    question.appendChild(x3);
    question.appendChild(x4);
    question.appendChild(document.createElement("p"));
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsspeak.questions[i].answart == "pic") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsspeak.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));

    x1 = document.createElement("img");
    x1.setAttribute("src", "pages/images/" + questionsspeak.questions[i].src);
    x1.setAttribute("alt", "Bild");

    x2 = document.createElement("INPUT");
    x2.setAttribute("id", "answertext");
    x2.setAttribute("type", "text");
    x2.setAttribute("class", "blackfont");
    x2.setAttribute("placeholder", "Bitte Objekt benennen");
    question.appendChild(x1);
    question.appendChild(document.createElement("p"));
    question.appendChild(x2);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  if (questionsspeak.questions[i].answart == "text") {
    question = document.createElement("a");
    questiont = document.createTextNode(questionsspeak.questions[i].question);
    question.appendChild(questiont);
    question.appendChild(document.createElement("p"));
    x = document.createElement("INPUT");
    x.setAttribute("id", "answertext");
    x.setAttribute("type", "text");
    x.setAttribute("class", "blackfont");
    x.setAttribute("placeholder", "Bitte Text eingeben");
    question.appendChild(x);
    question.appendChild(document.createElement("p"));
    button = document.createElement("a");
    buttont = document.createTextNode("Bestätigen");
    button.setAttribute("onclick", "submitanswer()");
    button.setAttribute("class", "btn btn-primary btn-outline btn-md");
    button.appendChild(buttont);
    question.appendChild(button);
    outputrange = document.getElementById("question");
    outputrange.appendChild(question);

  }

  speakcounter += 1;

}

function submitanswer() {

  if (orientationcounter < 10) {
    if (questionsorientation.questions[orientationcounter].answart == "date") {
      if (document.getElementById("answertext").value == fulldatetext) {
        orientationpoints = orientationpoints + 1;
      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "year") {
      if (document.getElementById("answertext").value == date.getFullYear()) {
        orientationpoints = orientationpoints + 1;
      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "season") {
      var season;
      if ((date.getMonth() + 1) == 3 || (date.getMonth() + 1) == 4 || (date.getMonth() + 1) == 5) {
        season = "Frühling";
      }
      else if ((date.getMonth() + 1) == 6 || (date.getMonth() + 1) == 7 || (date.getMonth() + 1) == 8) {
        season = "Sommer";
      }
      else if ((date.getMonth() + 1) == 9 || (date.getMonth() + 1) == 10 || (date.getMonth() + 1) == 11) {
        season = "Herbst";
      }
      else if ((date.getMonth() + 1) == 12 || (date.getMonth() + 1) == 1 || (date.getMonth() + 1) == 2) {
        season = "Winter";
      }
      if (x1.checked == true) {
        if (x1.value == season) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x2.checked == true) {
        if (x2.value == season) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x3.checked == true) {
        if (x3.value == season) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x4.checked == true) {
        if (x4.value == season) {
          orientationpoints = orientationpoints + 1;
        }
      }
      x1.remove();
      x2.remove();
      x3.remove();
      x4.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "name") {
      if (document.getElementById("answertext").value.toUpperCase() == userdata.firstname.toUpperCase()) {
        orientationpoints = orientationpoints + 1;

      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "birthplace") {
      if (document.getElementById("answertext").value.toUpperCase() == userdata.placebirth.toUpperCase()) {
        orientationpoints = orientationpoints + 1;

      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "birthdate") {
      if (document.getElementById("answertext").value == userdata.dayob + "." + userdata.monthob + "." + userdata.yearob) {
        orientationpoints = orientationpoints + 1;

      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "month") {
      if (document.getElementById("answertext").value.toUpperCase() == month.toUpperCase()) {
        orientationpoints = orientationpoints + 1;

      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "age") {
      if (document.getElementById("answertext").value == age) {
        orientationpoints = orientationpoints + 1;

      }
      x.remove();
      console.log(orientationpoints);
    }

    if (questionsorientation.questions[orientationcounter].answart == "chose") {

      if (x1.checked == true) {
        if (x1.value == questionsorientation.questions[orientationcounter].ra) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x2.checked == true) {
        if (x2.value == questionsorientation.questions[orientationcounter].ra) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x3.checked == true) {
        if (x3.value == questionsorientation.questions[orientationcounter].ra) {
          orientationpoints = orientationpoints + 1;
        }
      }
      else if (x4.checked == true) {
        if (x4.value == questionsorientation.questions[orientationcounter].ra) {
          orientationpoints = orientationpoints + 1;
        }
      }
      x1.remove();
      x2.remove();
      x3.remove();
      x4.remove();
      console.log(orientationpoints);
    }

    question.remove();
    button.remove();
    orientationcounter = orientationcounter + 1;
    if (orientationcounter < 10) {
      orientationtest(orientationcounter);
    }
  }
  if (orientationcounter == 10 && retentioncounter < 3) {
    if (retentioncounter < 3) {
      if (retentioncounter == 0) {
        document.getElementById("category").innerHTML = "Merken";
        var usertestdata = {
          SessionID: userdata.SessionID
        };
        (async() => {
          const rawResponse = await fetch('/gettestobjects', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(usertestdata)
          });
          retentionobjects = await rawResponse.json();
          retentiontest(retentioncounter);
        })();
      }
      else {
        if (document.getElementById("answertext").value.toUpperCase() == retentionobjects.objects[retentioncounter - 1].name.toUpperCase()) {
          retentionpoints += 1;
          console.log(retentionpoints);
          x.remove();
          button.remove();
          retentiontest(retentioncounter);
        }
        else {
          console.log(retentionpoints);
          x.remove();
          button.remove();
          retentiontest(retentioncounter);
        }
      }
    }
  }
  else if (orientationcounter == 10 && retentioncounter == 3 && mathcounter < 5) {
    if (mathcounter == 0) {
      if (document.getElementById("answertext").value.toUpperCase() == retentionobjects.objects[retentioncounter - 1].name.toUpperCase()) {
        retentionpoints += 1;
        console.log(retentionpoints);
        anzeige.remove();
        x.remove();
        button.remove();
        mathtest(mathcounter);
      }
      else {
        console.log(retentionpoints);
        anzeige.remove();
        x.remove();
        button.remove();
        mathtest(mathcounter);
      }
    }
    else if (mathcounter < 5) {
      newnumber = document.getElementById("answertext").value;
      if (newnumber == number - 7) {
        mathpoints += 1;
        number = newnumber;
        console.log(mathpoints);
        anzeige.remove();
        x.remove();
        button.remove();
        mathtest(mathcounter);
      }
      else {
        number = newnumber;
        anzeige.remove();
        x.remove();
        button.remove();
        console.log(mathpoints);
        mathtest(mathcounter);
      }
    }
  }
  else if (orientationcounter == 10 && retentioncounter == 3 && mathcounter == 5 && remembercounter < 3) {
    if (remembercounter == 0) {
      newnumber = document.getElementById("answertext").value;
      if (newnumber == number - 7) {
        mathpoints += 1;
        console.log(mathpoints);
        anzeige.remove();
        x.remove();
        button.remove();
        remembertest(remembercounter);
      }
      else {
        console.log(mathpoints);
        anzeige.remove();
        x.remove();
        button.remove();
        remembertest(remembercounter);
      }
    }
    else if (remembercounter < 3) {
      if (document.getElementById("answertext").value.toUpperCase() == retentionobjects.objects[remembercounter - 1].name.toUpperCase()) {
        rememberpoints += 1;
        console.log(rememberpoints);
        x.remove();
        button.remove();
        remembertest(remembercounter);
      }
      else {
        console.log(rememberpoints);
        x.remove();
        button.remove();
        remembertest(remembercounter);
      }
    }
  }
  else if (orientationcounter == 10 && retentioncounter == 3 && mathcounter == 5 && remembercounter == 3 && speakcounter < 10) {
    if (speakcounter == 0) {


      if (document.getElementById("answertext").value.toUpperCase() == retentionobjects.objects[remembercounter - 1].name.toUpperCase()) {
        rememberpoints += 1;
        console.log(rememberpoints);
        anzeige.remove();
        x.remove();
        button.remove();
      }
      else {
        console.log(rememberpoints);
        anzeige.remove();
        x.remove();
        button.remove();
      }
      speaktest(speakcounter);
    }


    else {
      if (questionsspeak.questions[speakcounter - 1].answart == "write") {
        if (document.getElementById("answertext").value.toUpperCase() == questionsspeak.questions[speakcounter - 1].a.toUpperCase()) {
          speakpoints = speakpoints + 1;

        }
        x.remove();
        console.log(speakpoints);
      }

      if (questionsspeak.questions[speakcounter - 1].answart == "presscolor") {
        if (rightcolor == 1) {
          speakpoints = speakpoints + 1;
          rightcolor = 0;

        }
        x.remove();
        x1.remove();
        x2.remove();
        x3.remove();
        x4.remove();
        console.log(speakpoints);
      }

      if (questionsspeak.questions[speakcounter - 1].answart == "pic") {
        for (var i = 0; i < questionsspeak.questions[speakcounter - 1].ra.length; i++) {
          console.log(questionsspeak.questions[speakcounter - 1].ra[i]);
          if (document.getElementById("answertext").value.toUpperCase() == questionsspeak.questions[speakcounter - 1].ra[i].toUpperCase()) {
            speakpoints = speakpoints + 1;
          }
        }
        x1.remove();
        x2.remove();
        console.log(speakpoints);
      }

      if (questionsspeak.questions[speakcounter - 1].answart == "text") {
        if (questionsspeak.questions[speakcounter - 1].a == "birthplace") {
          if (document.getElementById("answertext").value.toUpperCase() == userdata.placebirth.toUpperCase()) {
            speakpoints += 1;
          }
        }
        else if (questionsspeak.questions[speakcounter - 1].a == "lastname") {
          if (document.getElementById("answertext").value.toUpperCase() == userdata.lastname.toUpperCase()) {
            speakpoints += 1;
          }
        }
        else if (document.getElementById("answertext").value.toUpperCase() == questionsspeak.questions[speakcounter - 1].a.toUpperCase()) {
          speakpoints = speakpoints + 1;

        }
        x1.remove();
        x2.remove();
        console.log(speakpoints);
      }

      question.remove();
      button.remove();
      if (speakcounter < 9) {
        speaktest(speakcounter);
      }
      else {
        var points = {
          userid: userdata.userid,
          date: fulldatetext,
          orientation: orientationpoints,
          retention: retentionpoints,
          math: mathpoints,
          remember: rememberpoints,
          speak: speakpoints,
          no: 0
        };
        (async() => {
          const rawResponse = await fetch('/writeusertest', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(points)
          });
          var message = await rawResponse.json();
          var gesamtpunkte = orientationpoints + retentionpoints + mathpoints + rememberpoints + speakpoints;
          document.getElementById("ausgabebereich").style.display = "none";
          document.getElementById("orientationpoints").innerHTML = orientationpoints;
          document.getElementById("retentionpoints").innerHTML = retentionpoints;
          document.getElementById("mathpoints").innerHTML = mathpoints;
          document.getElementById("rememberpoints").innerHTML = rememberpoints;
          document.getElementById("speakpoints").innerHTML = speakpoints;
          document.getElementById("fullpoints").innerHTML = gesamtpunkte;
          document.getElementById("auswertung").style.display = "";
        })();

      }
    }
  }
}

function checkcolor(color) {
  if (color == questionsspeak.questions[speakcounter - 1].ra) {
    rightcolor = 1;
  }
  else {
    rightcolor = 0;
  }
  submitanswer();
}
