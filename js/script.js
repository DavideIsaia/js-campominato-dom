// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// creo la griglia cliccando sul bottone play
document.getElementById("play").addEventListener("click", function (event) {
    play();
});

//FUNZIONE PRINCIPALE
/**
 * Descrizione: la funzione crea una griglia 10x10, 9x9 o 7x7 in base alla selezione della difficoltà
 */
function play() {

    // 1) ripuliamo il contenuto del main a ogni clic del bottone play
    document.querySelector("main").innerHTML = "";

    // 2) definisco la grandezza della griglia in base al livello di difficoltà selezionato
    let gridSize;
    let gridSideLength;
    let difficulty = document.getElementById("difficulty").value;

    if (difficulty == "1") {          
        gridSize = 100;
        gridSideLength = 10;
    } else if (difficulty == "2") {           
        gridSize = 81;
        gridSideLength = 9;
    } else if (difficulty == "3") {
        gridSize = 49;
        gridSideLength = 7;
    }

    // geenero le bombe sulla griglia in modo random
    const bombsQuantity = 16;
    const bombsArray = generateRandomNumb(bombsQuantity,gridSize);
    // massimo numero di tentativi andati a segno (punteggio) 
    const safeItem = [];
    const maxPoints = gridSize - bombsQuantity;

    // console.log("difficoltà", difficulty, "grandezza griglia", gridSize, "lato griglia", gridSideLength);
    
    const grid = document.createElement("div");
    grid.className = "grid";
    // console.log(grid);

    // genero le celle da 1 a gridSize
    for (let i = 1; i <= gridSize; i++) {
        const item = createGridItem(i, gridSideLength);
        grid.appendChild(item);
        // console.log(item);
        // aggiungo la classe per colorare la casella al clic tramite il "this"
        item.addEventListener("click", cellClicked);
    }

    document.querySelector("main").appendChild(grid);    

    // per non usare metodo bind() metto questa funzione dentro la funzione principale (callback)
    function cellClicked () {
        // prendo la stringa dell'item cliccato e la converto in numero
        const clickedItem = parseInt(this.querySelector("span").textContent);

        // se l'item è presente nell'array allora ho perso
        if (bombsArray.includes(clickedItem)) {
            endGame();
        } else {
            // altrimenti non ci sono bombe e proseguo
            this.classList.add("selected");
            // console.log(this);
            // elimino la possibilità di poter ricliccare sugli item
            this.style.pointerEvents = "none";

            // riempio l'array di numeri giusti per poi avere il punteggio
            safeItem.push(clickedItem);
            console.log("numeri sicuri", safeItem);

            // se raggiungo il limite massimo allora ho vinto
            if (safeItem.length === maxPoints) {
                endGame();
            }
        }
    }
    
    /**
     * Descrizione: dichiara la fine del gioco per vittoria o dando il punteggio se si prende una bomba
     */
    function endGame() {
        const items = document.querySelectorAll(".square");
        for (let i = 1; i < items.length; i++) {
            // devo mettere i - 1 altrimenti l'array (che parte a contare da zero) punterà alla casella successiva
            const square = items[i - 1];
            // se l'array delle bombe include l'item cliccato allora finisci il gioco
            if (bombsArray.includes(i)) {
                square.classList.add("bomb");
            }
            // evito di poter continuare a cliccare dopo la fine del gioco
            square.style.pointerEvents = 'none';
        }
        
        // creo il messaggio di fine gioco
        const endResult = document.createElement("h2");
        endResult.className = "result";
        // se non clicco mai bombe , avrò il messaggio di vittoria
        let result = "Complimenti, hai vinto!";
        // se il numero di quadrati cliccabili sarà minore del punteggio massimo, mostro il punteggio raggiunto
        if (safeItem.length < maxPoints) {
            result = `Hai perso, il tuo punteggio è di ${safeItem.length}`;
        }
        endResult.textContent = result;
        console.log(result);
        document.querySelector("main").append(endResult);
    }
}

/**
 * Descrizione: la funzione crea gli item e li dispone in base al livello di difficoltà selezionato
 * @param {number} number :riceve in ingresso i numeri generati dal ciclo della funzione principale e gli costruisce gli item attorno 
 * @returns {any} item :vari blocchi con le classi css
 */
function createGridItem(number, gridSideLength) {
    // creo il div
    const item = document.createElement("div");
    // aggiungo la classe square
    item.classList.add("square");
    // calcolo l'altezza dei quadrati in base al lato della griglia
    const sideLength = `calc(100% / ${gridSideLength})`;
    // console.log(item);
    // console.log(sideLength);

    // aggiungo style inline in html e non nel CSS
    item.style.width = sideLength;
    item.style.height = sideLength;

    // aggiungo i vari item mettendo il numero dentro uno span
    item.innerHTML = `<span>${number}</span>`;
    // console.log(item);    
    return item;
}


/**
 * Descrizione: la funzione genera un array con la quantità di numeri random che voglio (senza ripetizioni) in base al range entro cui voglio trovarli
 * @param {any} bombsquantity numeri random da generare
 * @param {any} maxLimit range massimo
 * @returns {any} un array dove si trovano i numeri random
 */
function generateRandomNumb (bombsQuantity, maxLimit) {
    // creo l'array
    const numberArray = [];

    while (numberArray.length < bombsQuantity) {
        // genero il numero random 
        const randomNumber = randomInteger(1, maxLimit);

        // se il numero non è all'interno dell'array, lo pusho dentro
        if ( !numberArray.includes(randomNumber)) {
            numberArray.push(randomNumber);
        }
    }
    console.log("Le bombe si trovano in: ", numberArray);
    return numberArray; 
}

// genera numeri interi random entro un range
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}