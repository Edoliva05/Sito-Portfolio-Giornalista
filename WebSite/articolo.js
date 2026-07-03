const PROJECT_ID = "qjrhcm46";
const DATASET = "production";

//Intercetto l'ID dall'URL 
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

if (!articleId) {
    window.location.href = 'index.html'; //Se non c'è l'ID, torna alla home
}

//Query GROQ per prendere un singolo documento tramite il suo ID
const QUERY = encodeURIComponent(`*[_type == "articolo" && _id == "${articleId}"][0]`);
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

async function loadSingleArticle() {
    try {
        const response = await fetch(URL);
        const json = await response.json();
        const art = json.result;

        if (!art) {
            document.getElementById('article-title').innerText = "Articolo non trovato.";
            return;
        }

        //Riempio l'html dinamicamente con i dati di Sanity
        document.title = art.title; // Cambia il titolo della scheda del browser
        document.getElementById('article-title').innerText = art.title;
        document.getElementById('article-date').innerText = `Pubblicato il: ${art.date}`;

        // Gestione Immagine
        if (art.coverImage) {
            const imageUrl = urlFor(art.coverImage); // Funzione per ricavare l'URL dell'immagine
            document.getElementById('article-image').innerHTML = `<img src="${imageUrl}" alt="${art.title}">`;
        }

        // Gestione Testo Cartaceo (andrebbe formattato, ma intanto lo stampiamo pulito)
        if (art.body) {
            // Sostituiamo gli a capo (\n) con dei tag <br> o <p> per formattarlo bene
            const formattedBody = art.body.split('\n').map(para => `<p>${para}</p>`).join('');
            document.getElementById('article-body').innerHTML = formattedBody;
        }

        // Se c'è anche il link alla Nazione online, mettiamo un bel bottone in fondo
        if (art.link) {
            document.getElementById('article-link-container').innerHTML = `
                <hr>
                <p>Questo articolo è disponibile anche sulla testata online:</p>
                <a href="${art.link}" target="_blank" class="btn">Leggi su La Nazione</a>
            `;
        }

    } catch (error) {
        console.error("Errore:", error);
    }
}

function urlFor(source) {
    // Estrae la stringa dell'asset e la trasforma in un URL funzionante di Sanity cdn
    const ref = source.asset._ref;
    const [ , id, dimensions, format ] = ref.split('-');
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
}

document.addEventListener("DOMContentLoaded", loadSingleArticle);