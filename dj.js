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

let fullList = []; // Liste complète des chansons
let isReduced = true; // Indicateur de l'état de la liste, réduite ou non
const MAX_DISPLAY = 5;

document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    const reduceListBtn = document.getElementById('reduce-list'); // Bouton pour réduire la liste
    const clearAllBtn = document.getElementById('clear-all'); // Bouton pour effacer tout

    // Référence à la collection Firestore
    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, orderBy("timestamp", "desc"));

    // Écoute des mises à jour en temps réel
    onSnapshot(q, (querySnapshot) => {
        songList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.textContent = `${data.artist} - ${data.song} (Table ${data.table})`;
            songList.appendChild(li);
        });
    });

    // Gestionnaire d'événement pour réduire la liste
    reduceListBtn.addEventListener('click', () => {
        reduceListBtn.addEventListener('click', () => {
            isReduced = !isReduced; // Basculez l'état de isReduced
            updateDisplay(); // Mettez à jour l'affichage
    
            // Changez le texte du bouton en fonction de l'état
            reduceListBtn.textContent = isReduced ? "Étendre la liste" : "Réduire la liste";
        });
    });

    // Gestionnaire d'événement pour effacer tout
    clearAllBtn.addEventListener('click', () => {
        // Avertissement : Ceci supprimera toutes les données de votre collection Firestore !
        // Implémentez une confirmation avant de supprimer
        if (window.confirm("Êtes-vous sûr de vouloir effacer toute la liste ?")) {
            // Supprimez chaque document de la collection
            querySnapshot.forEach((doc) => {
                submissionsRef.doc(doc.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            });
        }
    });
});
