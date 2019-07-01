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
const registerfailtextpass = document.querySelector('.registerfailpass');
const registerfailtextuser = document.querySelector('.registerfailuser');
const registersuccestext = document.querySelector('.registersucces');
addBtn.style.display = 'none';
registerfailtextpass.style.display = 'none';
registerfailtextuser.style.display = 'none';
registersuccestext.style.display = 'none';
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
    var registerdata = {};
    function registerclient()
    {
      var username = document.getElementById("username").value;
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var password = document.getElementById("password").value;
      var passwordsubmit = document.getElementById("passwordsubmit").value;
      var email = document.getElementById("email").value;
      var daybirth = document.getElementById("daybirth").value;
      var monthbirth = document.getElementById("monthbirth").value;
      var yearbirth = document.getElementById("yearbirth").value;
      if(document.getElementById("genderm").checked == true) {
        var gender = "male";
      } else if(document.getElementById("genderfm").checked == true) {
        var gender = "female";
      } 
      var birthplace = document.getElementById("birthplace").value;
      if(password==passwordsubmit){
      registerdata = {
          user: username,
          fname: firstname,
          lname: lastname,
          pass: password,
          mail: email,
          dbirth: daybirth,
          mbirth: monthbirth,
          ybirth: yearbirth,
          gen: gender,
          pbirth: birthplace
      };
      console.log(registerdata.user + " " + registerdata.fname + " " + registerdata.lname + " " + registerdata.pass + " " + registerdata.mail + " " + registerdata.dbirth + " " + registerdata.mbirth + " " + registerdata.ybirth + " " + registerdata.gen + " " + registerdata.pbirth);
      (async () => {
  const rawResponse = await fetch('/registeruser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerdata)
  });
  const content = await rawResponse.json();
  if(content.registermessage=="registerfailuser"){
    console.log("Registrierung fehlgeschlagen, Benutzername vergeben!");
    registerfailtextuser.style.display = '';
    registersuccestext.style.display = 'none';
    registerfailtextpass.style.display = 'none';
  } else if(content.registermessage=="registersucces") {
    console.log("Registrierung erfolgreich!");
    registersuccestext.style.display = '';
    registerfailtextpass.style.display = 'none';
    registerfailtextuser.style.display = 'none';
    setTimeout(function(){},2000);
    window.location.href = "/";
  }
})();}
else{
    registerfailtextpass.style.display = '';
    registersuccestext.style.display = 'none';
    registerfailtextuser.style.display = 'none';
}
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

asksession();