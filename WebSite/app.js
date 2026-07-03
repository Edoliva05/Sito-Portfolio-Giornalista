const PROJECT_ID = "qjrhcm46";
const DATASET = "production";
const QUERY = encodeURIComponent('*[_type == "articolo"] | order(date desc)');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

//Funzione che va a prendere i dati da Sanity
async function fetchArticles() {
    try {
        const response = await fetch(URL);
        const json = await response.json();
        const articoli = json.result;

        console.log("Articoli ricevuti:", articoli); 
        renderArticles(articoli);

    } catch (error) {
        console.error("Errore di connessione a Sanity:", error);
        document.getElementById('articles-grid').innerHTML = "<p>Errore nel caricamento degli articoli.</p>";
    }
}

//Funzione che disegna le card 
function renderArticles(articoli) {
    const grid = document.getElementById('articles-grid');
    grid.innerHTML = ""; 

    // Se non ci sono articoli (o se sono tutti bozze non pubblicate)
    if (!articoli || articoli.length === 0) {
        grid.innerHTML = "<p>Nessun articolo pubblicato trovato.</p>";
        return;
    }

    articoli.forEach(art => {
        const card = document.createElement('a'); 
        card.className = 'article-card';
        card.href = `articolo.html?id=${art._id}`; 
        
        // Usiamo urlFor per prendere l'immagine in modo sicuro
        const imageUrl = art.coverImage ? urlFor(art.coverImage) : 'placeholder.jpg';

        card.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${art.title}">
            </div>
            <div class="card-content">
                <span class="card-date">${art.date || ''}</span>
                <h3>${art.title}</h3>
                <p class="card-excerpt">${art.body ? art.body.substring(0, 120) + '...' : 'Leggi l\'articolo completo.'}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

//Funzione per generare il link delle immagini
function urlFor(source) {
    if (!source || !source.asset || !source.asset._ref) return 'placeholder.jpg';
    const ref = source.asset._ref;
    const [ , id, dimensions, format ] = ref.split('-');
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
}

//Lancia il tutto appena si apre la home
document.addEventListener("DOMContentLoaded", fetchArticles);