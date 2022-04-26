// Consegna:
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
// Bonus:
// Aggiungere la possibilità di scegliere un livello di difficoltà in base al quale viene generata una griglia di uno dei seguenti range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

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

    console.log("difficoltà", difficulty, "grandezza griglia", gridSize, "lato griglia", gridSideLength);
    
    // 2.1) inserisco un'altra funzione all'interno della principale in modo che sia nello stesso blocco e possa leggere la variabile gridSize

    /**
     * Descrizione: la funzione appende i vari item della griglia e li colora se cliccati
     */
     function createGrid() {
        const grid = document.createElement("div");
        grid.className = "grid";
        // console.log(grid);
        for (let i = 1; i <= gridSize; i++) {
            const item = createGridItem(i);
            grid.appendChild(item);
            // console.log(item);
            // aggiungo la classe per colorare la casella al clic tramite il "this"
            item.addEventListener("click", cellClicked);
        }

        document.getElementsByTagName("main")[0].appendChild(grid);
    }

    // per non usare bind mettiamo la funzione dentro la funzione principale (callback)
    function cellClicked () {


        
        this.classList.add("selected");
        console.log(this);
    }

    // 2.2) inserisco un'altra funzione all'interno della principale in modo che sia nello stesso blocco e possa leggere la variabile gridSideLength

     /**
     * Descrizione: la funzione crea gli item e li dispone in base al livello di difficoltà selezionato
     * @param {number} number :riceve in ingresso i numeri generati dal ciclo della funzione 2.1 e gli costruisce gli item attorno 
     * @returns {any} item :vari blocchi con le classi css
     */
    function createGridItem(number) {
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
        // aggiungo sequenzialmente i vari item mettendo il numero dentro uno span
        item.innerHTML += `<span>${number}</span>`;
        // console.log(item);
        
        return item;
    }

    // 3) creo gli elementi della griglia!
    createGrid();
}