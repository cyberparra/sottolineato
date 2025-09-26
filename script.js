let citazioni = [];
let currentQuoteIndex = -1;

// Carica i dati dal file JSON esterno
async function caricaDati() {
    try {
        const response = await fetch('s8l.json');
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        citazioni = await response.json();
        return true;
    } catch (error) {
        console.error('Errore nel caricamento del file JSON:', error);
        // Mostra un messaggio di errore all'utente
        document.getElementById('quoteText').textContent = 'Errore nel caricamento delle citazioni. Controlla che il file s8l.json sia presente nella cartella del progetto.';
        document.getElementById('author').textContent = '';
        document.getElementById('title').textContent = '';
        document.getElementById('underliner').textContent = '';
        return false;
    }
}

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 15 + 's';
        element.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(element);
    }
}

function mostraCitazione() {
    // Se non ci sono citazioni caricate, non fare nulla
    if (citazioni.length === 0) {
        return;
    }

    const loading = document.getElementById('loading');
    const quoteCard = document.getElementById('quoteCard');
    const refreshBtn = document.getElementById('refreshBtn');

    // Nascondi la card e mostra loading
    quoteCard.classList.remove('show');
    loading.style.display = 'flex';
    refreshBtn.disabled = true;
    refreshBtn.textContent = '⏳ Caricamento...';

    setTimeout(() => {
        // Seleziona una citazione casuale diversa dalla precedente
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * citazioni.length);
        } while (randomIndex === currentQuoteIndex && citazioni.length > 1);
        
        currentQuoteIndex = randomIndex;
        const item = citazioni[randomIndex];

        // Aggiorna il contenuto
        document.getElementById('quoteText').textContent = item.TESTO;
        document.getElementById('author').textContent = item.AUTORE;
        document.getElementById('title').textContent = item.TITOLO;
        document.getElementById('underliner').textContent = `inserita da: ${item.SOTTOLINEATORE}`;

        // Nascondi loading e mostra la card
        loading.style.display = 'none';
        setTimeout(() => {
            quoteCard.classList.add('show');
            refreshBtn.disabled = false;
            refreshBtn.textContent = '✨ Nuova Sottolineatura';
        }, 100);

    }, 800); // Simula un piccolo ritardo per l'effetto
}

// Inizializza l'app
document.addEventListener('DOMContentLoaded', async function() {
    createFloatingElements();
    
    // Carica i dati e poi mostra la prima citazione
    const dataLoaded = await caricaDati();
    if (dataLoaded) {
        mostraCitazione(); // Carica una citazione iniziale
    } else {
        // Se il caricamento fallisce, mostra l'errore nella card
        const quoteCard = document.getElementById('quoteCard');
        quoteCard.classList.add('show');
    }
});