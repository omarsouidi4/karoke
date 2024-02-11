// Importez les fonctions nécessaires depuis les SDK Firebase
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const db = getFirestore(); // Obtenez une référence à la base de données Firestore

    const form = document.getElementById('song-form');
    form.addEventListener('submit', async event => {
        event.preventDefault(); // Empêche la soumission classique du formulaire

        // Récupération des valeurs du formulaire
        const artist = document.getElementById('artist').value;
        const song = document.getElementById('song').value;
        const table = document.getElementById('table').value;

        try {
            // Ajoutez une nouvelle soumission à la collection "submissions"
            const docRef = await addDoc(collection(db, "submissions"), {
                artist: artist,
                song: song,
                table: table,
                timestamp: new Date() // Ajoutez un horodatage pour le tri
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Chanson soumise avec succès !');
            form.reset(); // Réinitialise le formulaire après soumission
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Erreur lors de la soumission de la chanson.');
        }
    });
});
