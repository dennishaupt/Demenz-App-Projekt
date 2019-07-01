if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/pages/js/service-worker.js')
           .then(function() { console.log('Service Worker Registered'); }).catch(function(err){console.log("No it didn't Error",err
           )});
}
else{
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
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
   
   var userdata;
   
function asksession() {
   (async () => {
  const rawResponse = await fetch('/asksession', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  if(content.sessionmessage=="succes"){
    console.log("Session vorhanden");
    userdata = content.userdata;
    console.log(userdata.SessionID);
    if(userdata.gend=="male") {
      document.getElementById("gendertext").innerHTML = "Männlich";
    } else if(userdata.gend=="female") {
      document.getElementById("gendertext").innerHTML = "Weiblich";
    }
    
    document.getElementById("lastnametext").innerHTML = userdata.lastname;
    document.getElementById("firstnametext").innerHTML = userdata.firstname;
    document.getElementById("usernametext").innerHTML = userdata.username;
    document.getElementById("birthdatetext").innerHTML = userdata.dayob + "." + userdata.monthob + "." + userdata.yearob;
    document.getElementById("birthplacetext").innerHTML = userdata.placebirth;
        
  } else if(content.sessionmessage=="nosession") {
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
    (async () => {
  const rawResponse = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logoutdata)
  });
  const content = await rawResponse.json();
  if(content.logoutmessage=="succes"){
    console.log("Erfolgreich ausgeloggt");
    window.location.href = "/";
        
  } else if(content.logoutmessage=="err") {
    console.log("Error");
    
  }
})();
}