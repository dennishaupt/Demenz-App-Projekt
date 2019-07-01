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
const loginfailtext = document.querySelector('.loginfail');
const loginsuccestext = document.querySelector('.loginsucces');
addBtn.style.display = 'none';
loginfailtext.style.display = 'none';
loginsuccestext.style.display = 'none';
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
    
    asksession();
    
    var logindata = {};
    function loginclient()
    {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      logindata = {
          user: username,
          pass: password
      };
      console.log(logindata.user + " " + logindata.pass);
      (async () => {
  const rawResponse = await fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logindata)
  });
  const content = await rawResponse.json();
  if(content.loginmessage=="loginfail"){
    console.log("Login Fehlgeschlagen!");
    loginfailtext.style.display = '';
    loginsuccestext.style.display = 'none';
  } else if(content.loginmessage=="loginsucces") {
    console.log("Login erfolgreich!");
    loginsuccestext.style.display = '';
    loginfailtext.style.display = 'none';
        setTimeout(function(){},2000);
    window.location.href = "/overview";
  }
})();
    }
    
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
    window.location.href = "/overview";
  } else if(content.sessionmessage=="nosession") {
    console.log("Keine Session vorhanden");
  }
})();
}