import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebase, firebaseDB } from './firebase'
import SimpleReactLightbox from 'simple-react-lightbox'

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const track = (xx) => {
  var userStatusDatabaseRef = firebaseDB.ref('/tempUser/' + xx);

  var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  firebaseDB.ref('.info/connected').on('value', function (snapshot) {
    if (snapshot.val() === false) {
      return;
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
      userStatusDatabaseRef.set(isOnlineForDatabase);
    });
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebaseDB.ref(`user_roles/${user.uid}`).once('value')
      .then((snapshot) => {
        user.role = snapshot.val()
      }).catch(e => {
        console.log(e)
      })
  } else {
    user = []
  }

  var tempUser = getCookie("tracking");
  if (tempUser !== "") {
    track(tempUser)
  } else {
    tempUser = Date.now().toString(16);
    if (tempUser !== "" && tempUser != null) {
      setCookie("tracking", tempUser, 365);
      track(tempUser)
    }
  }

  ReactDOM.render(
    <React.StrictMode>
      <SimpleReactLightbox>
        <App user={user} />
      </SimpleReactLightbox>
    </React.StrictMode>,
    document.getElementById('root')
  );
})

