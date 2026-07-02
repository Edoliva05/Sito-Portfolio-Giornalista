function renderArticles(articoli) {
    const grid = document.getElementById('articles-grid');
    grid.innerHTML = ""; //svuota il caricamento

    articoli.forEach(art => {
        const card = document.createElement('a'); // Trasformiamo la card in un link intero
        card.className = 'article-card';

        //passiamo l'id di Sanity (_id) nell'URL della pagina successiva
        card.href = `articolo.html?id=${art._id}`; 
        
        //estraiamo l'URL dell'immagine da Sanity se presente
        const imageUrl = art.coverImage ? urlFor(art.coverImage) : 'placeholder.jpg';

        card.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${art.title}">
            </div>
            <div class="card-content">
                <span class="card-date">${art.date}</span>
                <h3>${art.title}</h3>
                <p class="card-excerpt">${art.body ? art.body.substring(0, 120) + '...' : 'Leggi l\'articolo completo.'}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}