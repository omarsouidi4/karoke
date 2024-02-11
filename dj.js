document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    const clearAllBtn = document.getElementById('clear-all');

    // Fonction pour afficher les chansons
    function displaySongs() {
        songList.innerHTML = ''; // Nettoie la liste actuelle
        let submissions = JSON.parse(localStorage.getItem('submissions') || '[]'); // Gère le cas où rien n'est encore stocké

        submissions.forEach(submission => {
            const li = document.createElement('li');
            li.textContent = `${submission.artist} - ${submission.song} (Table ${submission.table})`;
            songList.appendChild(li);
        });
    }

    // Rafraîchit la liste des chansons au chargement et à intervalles réguliers
    displaySongs();
    setInterval(displaySongs, 5000); // Optionnel: rafraîchit la liste toutes les 5 secondes

    // Effacer toutes les chansons
    clearAllBtn.addEventListener('click', () => {
        localStorage.removeItem('submissions'); // Supprime les soumissions de localStorage
        displaySongs(); // Rafraîchit l'affichage immédiatement
    });
});
