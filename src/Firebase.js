import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

export function InitFirebase() {
  var firebaseConfig = {
    apiKey: 'AIzaSyDoCq0LXuv_HxUdAd2F-vcHSdifBGpr9Vg',
    authDomain: 'tm-ksa-7a673.firebaseapp.com',
    projectId: 'tm-ksa-7a673',
    storageBucket: 'tm-ksa-7a673.appspot.com',
    messagingSenderId: '245174734573',
    appId: '1:245174734573:web:78d811165c483b007a06e4',
    measurementId: 'G-GNHK1RD92Y',
  };

  // Project Settings => Add Firebase to your web app
  firebase.initializeApp(firebaseConfig);
  firebase.auth().useDeviceLanguage();
}
