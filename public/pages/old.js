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

var userdata;

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
      console.log("Session vorhanden");
      userdata = content.userdata;
      console.log(userdata.SessionID);
      getoldtests();


    }
    else if (content.sessionmessage == "nosession") {
      console.log("Keine Session vorhanden");
      window.location.href = "/";
    }
  })();
}

asksession();

function logout() {
  logoutdata = {
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
      console.log("Erfolgreich ausgeloggt");
      window.location.href = "/";

    }
    else if (content.logoutmessage == "err") {
      console.log("Error");

    }
  })();
}



function getoldtests() {
  userdata = {
    userid: userdata.userid
  };
  (async() => {
    const rawResponse = await fetch('/getoldtests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });
    const content = await rawResponse.json();
    document.getElementById("numberofoldtests").innerHTML = content.amountoldtests;

    for (var i = content.amountoldtests - 1; i > -1; i--) {
      var myH2 = document.createElement('li');
      myH2.className = "oldtest";
      myH2.appendChild(document.createTextNode("Nr. "));
      var nr = document.createElement("a");
      var nrt = document.createTextNode(content.oldtests[i].no);
      nr.appendChild(nrt);
      myH2.appendChild(nr);
      myH2.appendChild(document.createTextNode(" Datum: "));
      var date = document.createElement("a");
      var datet = document.createTextNode(content.oldtests[i].date);
      date.appendChild(datet);
      myH2.appendChild(date);
      myH2.appendChild(document.createTextNode(" Orientierung: "));
      var ori = document.createElement("a");
      var orit = document.createTextNode(content.oldtests[i].orientation);
      ori.appendChild(orit);
      myH2.appendChild(ori);
      myH2.appendChild(document.createTextNode(" Merken: "));
      var re = document.createElement("a");
      var ret = document.createTextNode(content.oldtests[i].retention);
      re.appendChild(ret);
      myH2.appendChild(re);
      myH2.appendChild(document.createTextNode(" Rechnen: "));
      var ma = document.createElement("a");
      var mat = document.createTextNode(content.oldtests[i].math);
      ma.appendChild(mat);
      myH2.appendChild(ma);
      myH2.appendChild(document.createTextNode(" Erinnerung: "));
      var er = document.createElement("a");
      var ert = document.createTextNode(content.oldtests[i].remember);
      er.appendChild(ert);
      myH2.appendChild(er);
      myH2.appendChild(document.createTextNode(" Sprache: "));
      var sp = document.createElement("a");
      var spt = document.createTextNode(content.oldtests[i].speak);
      sp.appendChild(spt);
      myH2.appendChild(sp);
      var ges = document.createElement("strong");
      var gest = document.createTextNode(" Gesamtpunkte: ");
      ges.appendChild(gest);
      ges.setAttribute("class","boldfont");
      myH2.appendChild(ges);
      var resu = document.createElement("a");
      var res = document.createTextNode(content.oldtests[i].orientation + content.oldtests[i].retention + content.oldtests[i].math + content.oldtests[i].remember + content.oldtests[i].speak);
      resu.appendChild(res);
      resu.setAttribute("class", "boldfont");
      myH2.appendChild(resu);
      var Ausgabebereich = document.getElementById('oldtests');
      Ausgabebereich.appendChild(myH2);
    }

  })();
}
