import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
