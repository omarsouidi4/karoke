import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
    const form = document.getElementById('song-form');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const artist = document.getElementById('artist').value;
        const song = document.getElementById('song').value;
        const table = document.getElementById('table').value;

        try {
            const docRef = await addDoc(collection(db, "submissions"), {
                artist: artist,
                song: song,
                table: table,
                timestamp: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Chanson soumise avec succès !');
            form.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Erreur lors de la soumission de la chanson.');
        }
    });
});
