const colours = [
	{type:'normal', color:'#A8A77A'}, {type:'fire', color:'#EE8130'}, {type:'water', color:'#6390F0'}, {type:'electric', color:'#F7D02C'}, {type:'grass', color:'#7AC74C'}, {type:'ice', color:'#96D9D6'}, {type:'fighting', color:'#C22E28'}, {type:'poison', color:'#A33EA1'}, {type:'ground', color:'#E2BF65'}, {type:'flying', color:'#A98FF3'}, {type:'psychic', color:'#F95587'}, {type:'bug', color:'#A6B91A'}, {type:'rock', color:'#B6A136'}, {type:'ghost', color:'#735797'}, {type:'dragon', color:'#6F35FC'}, {type:'dark', color:'#705746'}, {type:'steel', color:'#B7B7CE'}, {type:'fairy', color:'#D685AD'}, 
];// Dieses Array enthält Objekte, die jedem Pokemontyp eine Farbe zuweisen. Die Farben werden später verwendet, um die Hintergrundfarbe der Pokémon-Karten zu setzen.
let findedPokemon = [];
// let AUDIO_VOICE;
let pokedex = [];
let allPokemon = [];
let currentPokemon;
let pokemon = 40;
let filteredPokemon = false;

async function init(){
  await loadPokemon();
  await fetchAllPokemon(); //aufrufen der 1025 Pokemon im Hintergrund;
}

async function loadPokemon(){ //Diese Zeile definiert eine asynchrone Funktion namens loadPokemon, die später aufgerufen werden kann, um Pokemon-Daten zu laden.
  for (let i = pokedex.length; i < pokemon; i++) { //Diese Zeile startet eine Schleife, die durchlaufen wird, um Pokemon-Daten abzurufen. Die Schleife beginnt bei der aktuellen Länge des Arrays pokedex und läuft bis zum Wert der Variable pokemon. Der Index i wird bei jedem Schleifendurchlauf um 1 erhöht.
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;  // Diese Zeile erstellt eine URL für den API-Aufruf, um die Daten des aktuellen Pokemon mit dem Index i+1 abzurufen. Beachte, dass i+1 verwendet wird, weil die API-Indizierung bei 1 beginnt, während das JavaScript-Array-Indexing bei 0 beginnt.
    let response = await fetch(url); // Hier wird die fetch-Funktion verwendet, um die Daten von der bereitgestellten URL abzurufen. Das await-Schlüsselwort sorgt dafür, dass die Ausführung des Codes pausiert, bis die Antwort von der API erhalten wird.
    let lPokemon = await response.json();// Nachdem die Antwort von der API erhalten wurde, wird die Methode json() aufgerufen, um die JSON-Daten in ein JavaScript-Objekt zu konvertieren. Auch hier wird await verwendet, um auf die Verarbeitung der JSON-Daten zu warten.
    pokedex.push(lPokemon);//Die geladenen Pokemon-Daten (lPokemon) werden dem Array pokedex hinzugefügt.
    renderPokemon(i);//Hier wird eine Funktion namens renderPokemon aufgerufen, um das geladene Pokemon zu rendern. Der Index i wird übergeben, um das entsprechende Pokemon zu rendern.
    }
    if(pokedex.length === pokemon){
      document.getElementById("myBtn").disabled = false;
    }
}

async function morePokemon() {// Die Funktion erhöht die Variable Pokemon um 40, was bedeutet, dass weitere 40 Pokemon geladen werden sollen, und ruft dann die Funktion loadPokemon auf, um diese zusätzlichen Pokemon zu laden.
    pokemon = pokemon + 40;
    await loadPokemon();
} // 2te Option -> Button einfach verschwinden lassen.

function renderPokemon(i){ //Diese Funktion rendert die Mini-Karten für jedes geladene Pokemon. Sie nimmt einen Index als Parameter, um das entsprechende Pokemon im pokedex oder allPokemon Array zu erhalten und zu rendern.
  if(filteredPokemon){//Auswahl des aktuellen Pokemons: Zuerst wird überprüft, ob die Variable filteredPokemon gesetzt ist. Wenn ja, wird das aktuelle Pokemon aus dem allPokemon-Array genommen, andernfalls wird das aktuelle Pokemon aus dem pokedex-Array genommen. Das bedeutet, dass, wenn die Funktion im Suchmodus aufgerufen wird, das Pokemon aus dem allPokemon-Array genommen wird, ansonsten wird das Pokemon aus dem pokedex-Array verwendet.
    currentPokemon = allPokemon[i]; 
  }else {
    currentPokemon = pokedex[i];
  }
  document.getElementById('miniCards').innerHTML += showMiniCard(i);
  for (let j = 0; j < colours.length; j++) {
    const paint = colours[j];
    if(currentPokemon['types']['0']['type']['name'] == paint.type){
        document.getElementById(`pokeColor${i}`).style.background = paint.color;
        } 
    }
}                                          

function renderBigCard(i){//Diese Funktion rendert eine große Karte für ein ausgewähltes Pokemon mit detaillierten Informationen. Sie nimmt ebenfalls einen Index als Parameter, um das entsprechende Pokemon im pokedex Array zu erhalten und anzuzeigen.
  document.querySelector('.big-card').classList.remove('d-none');
  document.querySelector('body').classList.add('over');
  if(filteredPokemon){//Auswahl des aktuellen Pokemons: Zuerst wird überprüft, ob die Variable filteredPokemon gesetzt ist. Wenn ja, wird das aktuelle Pokemon aus dem allPokemon-Array genommen, andernfalls wird das aktuelle Pokemon aus dem pokedex-Array genommen. Das bedeutet, dass, wenn die Funktion im Suchmodus aufgerufen wird, das Pokemon aus dem allPokemon-Array genommen wird, ansonsten wird das Pokemon aus dem pokedex-Array verwendet.
    currentPokemon = allPokemon[i]; 
  }else {
    currentPokemon = pokedex[i];
  }
    document.getElementById('bigCard').innerHTML = cardTop();
    for (let j = 0; j < colours.length; j++) {
        const paint = colours[j];   
    if(currentPokemon['types']['0']['type']['name'] == paint.type){
        document.getElementById(`pokeColor${i}`).style.background = paint.color;
        } 
    }
    document.getElementById('bigCard').innerHTML += `
    <img onclick="previousPokemon(${i})" class="previous" src="./img/previousArrow.png"></img>
    <img onclick="nextPokemon(${i})" class="next" src="./img/nextArrow.png"></img>
    `;
    renderPokemonInfo();
    // playSound(i);
}

function renderPokemonInfo(){ //Diese Funktion rendert die grundlegenden Informationen eines Pokemons in der großen Karte, wie den Namen, die Nummer und das Bild.
    document.querySelector('.backArrow').src = "./img/whiteArrowLeft.png";
    document.querySelector('.heartEmpty').src = "./img/heartEmpty.png";
    document.getElementById('pokemonNumber').innerHTML = currentPokemon['id'];
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'].charAt(0).toUpperCase();
    document.getElementById('pokemonName').innerHTML += currentPokemon['name'].slice(1);
    document.getElementById('pokemonType').innerHTML = currentPokemon['types']['0']['type']['name'].charAt(0).toUpperCase();
    document.getElementById('pokemonType').innerHTML += currentPokemon['types']['0']['type']['name'].slice(1);
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    chart();
}

// function playSound(i) {
//   let AUDIO_VOICE = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${i + 1 }.ogg`);
//   AUDIO_VOICE.play();
// }

function back(){//versteckt die große Karte und stellt die Hintergrundaktivität wieder her(scrolle geht wieder)
  document.querySelector('.big-card').classList.add('d-none');
  document.querySelector('body').classList.remove('over');
}

function previousPokemon(i){// Diese Funktion zeigt das vorherige Pokemon in der großen Karte an.
  if(filteredPokemon){
    let index = findedPokemon.indexOf(i);
    if(index == 0){
      index = findedPokemon.length-1;
    } else{
      index = index-1;
    }
    let newIndex = findedPokemon[index];
    renderBigCard(newIndex);
  } else {
    if(i == 0){
      i = pokemon - 1; // in der if-Anweisung müssen 2 oder 3 Gleichzeichen sein für einen Vergleich und nur eins zum ersetzen
     } else {
       i--;
     }
     renderBigCard(i);
  }
}

function nextPokemon(i){//Diese Funktion zeigt das nächste Pokemon in der großen Karte an.
  if(filteredPokemon){
    let index = findedPokemon.indexOf(i);
    if(index == findedPokemon.length-1){
      index = 0;
    } else {
      index = index+1;
    }
    let newIndex = findedPokemon[index];
      renderBigCard(newIndex);
  } else {
    if(i == pokemon -1){
      i = 0 ;
     } else {
       i++;
     }
     renderBigCard(i);
  }
}

async function fetchAllPokemon(){//Diese Funktion lädt alle Pokemon-Daten im Hintergrund von der PokeAPI.
  for (let i = 0; i < 1025; i++) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
  let response = await fetch(url);
  let pokemonNames = await response.json();
  allPokemon.push(pokemonNames);
  }
}

function searchPokemon(){// Diese Funktion durchsucht die geladenen Pokemon-Daten nach einem eingegebenen Suchbegriff und rendert die entsprechenden Mini-Karten.
  const inputPokemon = document.getElementById('searchInput').value.toLowerCase(); // Zugriff auf die Eingabe aus dem Input-Feld, um nach dem Pokémon-Namen zu suchen
  document.getElementById('miniCards').innerHTML = ''; // Leeren des Containers mit Mini-Karten
  if (inputPokemon.length >= 3) { // Suche startet nur, wenn die Länge der Eingabe größer oder gleich 3 ist
    findedPokemon = [];
    for (let i = 0; i < allPokemon.length; i++) {
        const pokeName = allPokemon[i].name.toLowerCase(); // Pokemon-Namen in Kleinbuchstaben umwandeln
        if (pokeName.includes(inputPokemon)) {// Überprüfen, ob der eingegebene Pokémon-Name im aktuellen Pokemon-Namen enthalten ist
          filteredPokemon = true; //übernimmt oben weil die Variable global gesetzt ist
            renderPokemon(i); // Wenn gefunden, rendern der Mini-Karte für dieses Pokemon
            findedPokemon.push(i);
            // console.log(findedPokemon);
      } 
    }
  } else { 
    filteredPokemon = false;
    for (let j = 0; j < pokedex.length; j++) {//Beim löschen einzelner Buchstaben im Input-Feld werden die Mini-Karten wieder angezeigt.
    renderPokemon(j);
   } 
  }
}