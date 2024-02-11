import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyC2uaxWDXMh2NqBuOfDtal-tGEuqEp_DYY",
    authDomain: "karaoke-1f4e6.firebaseapp.com",
    projectId: "karaoke-1f4e6",
    storageBucket: "karaoke-1f4e6.appspot.com",
    messagingSenderId: "732700787552",
    appId: "1:732700787552:web:d2f21e6334de13cb959405",
    measurementId: "G-564LSTD2Q4"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const db = getFirestore(); // Obtenez une référence à la base de données Firestore
    const songList = document.getElementById('song-list');

    const q = query(collection(db, "submissions"), orderBy("timestamp", "desc"));

    onSnapshot(q, (querySnapshot) => {
        songList.innerHTML = ''; // Vide la liste avant de la remplir à nouveau
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.textContent = `${data.artist} - ${data.song} (Table ${data.table})`;
            songList.appendChild(li);
        });
    });
});
