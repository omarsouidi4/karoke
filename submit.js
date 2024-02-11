document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('song-form');

    form.addEventListener('submit', event => {
        event.preventDefault(); // Empêche la soumission classique du formulaire

        // Récupération des valeurs du formulaire
        const artist = document.getElementById('artist').value;
        const song = document.getElementById('song').value;
        const table = document.getElementById('table').value;

        // Création d'un objet pour la chanson
        const songSubmission = { artist, song, table };

        // Enregistrement de la soumission dans localStorage
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push(songSubmission);
        localStorage.setItem('submissions', JSON.stringify(submissions));

        // Optionnel : Affichage d'un message de confirmation ou réinitialisation du formulaire
        alert('Chanson soumise avec succès !');
        form.reset(); // Réinitialise le formulaire après soumission
    });
});
