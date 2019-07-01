var userdata;

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
const userfailtextpass = document.querySelector('.userfailpass');
const userfailtextpassempty = document.querySelector('.userfailpassempty');
const usersuccestext = document.querySelector('.usersucces');
addBtn.style.display = 'none';
userfailtextpass.style.display = 'none';
userfailtextpassempty.style.display = 'none';
usersuccestext.style.display = 'none';
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
    var cuserdata = {};
    function changeuserdata()
    {
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var password = document.getElementById("password").value;
      var passwordsubmit = document.getElementById("passwordsubmit").value;
      var email = document.getElementById("email").value;
      var daybirth = document.getElementById("daybirth").value;
      var monthbirth = document.getElementById("monthbirth").value;
      var yearbirth = document.getElementById("yearbirth").value;
      var changepass;
      if(document.getElementById("genderm").checked == true) {
        var gender = "male";
      } else if(document.getElementById("genderfm").checked == true) {
        var gender = "female";
      } 
      var birthplace = document.getElementById("birthplace").value;
      if(password==passwordsubmit){
              if(password=="") {
      changepass = 0;
      } else {
        changepass = 1;
      }
      cuserdata = {
          username: userdata.username,
          userid: userdata.userid,
          fname: firstname,
          lname: lastname,
          pass: password,
          mail: email,
          dbirth: daybirth,
          mbirth: monthbirth,
          ybirth: yearbirth,
          gen: gender,
          pbirth: birthplace,
          changepassword: changepass
      };
      (async () => {
  const rawResponse = await fetch('/changeuserdata', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cuserdata)
  });
  const content = await rawResponse.json();
    if(content.usermessage=="usersucces") {
    usersuccestext.style.display = '';
    userfailtextpass.style.display = 'none';
    userfailtextpassempty.style.display = 'none';
    setTimeout(function(){},2000);
    window.location.href = "/user";
  }
})();}
else{
    userfailtextpass.style.display = '';
    userfailtextpassempty.style.display = 'none';
    usersuccestext.style.display = 'none';
}
    }
    
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
      document.getElementById("firstname").value = userdata.firstname;
      document.getElementById("lastname").value = userdata.lastname;
      document.getElementById("email").value = userdata.email;
      document.getElementById("daybirth").value = userdata.dayob;
      document.getElementById("monthbirth").value = userdata.monthob;
      document.getElementById("yearbirth").value = userdata.yearob;
      if(userdata.gend == "male") {
        document.getElementById("genderm").checked = true;
      } else if(userdata.gend == "female") {
        document.getElementById("genderfm").checked = true;
      }
      document.getElementById("birthplace").value = userdata.placebirth;
    }
    else if (content.sessionmessage == "nosession") {
      window.location.href = "/";
    }
  })();
}

asksession();