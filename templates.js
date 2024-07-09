function cardTop(){
    return `
    <div class="centerCard">
        <div id="pokeCardTop">
            <div class="bigCardHeader">
                <img onclick="back()" class="backArrow">
                <img class="heartEmpty">
            </div>
            <h1 id="pokemonName">Name</h1>
            <span id="pokemonNumber"></span>
            <h2 id="pokemonType" class="type">Typ</h2>
        </div>

        <div class="pokeCardBottom">
            <img id="pokemonImage" class="sprite">

            <div>
                <canvas id="myChart"></canvas>
            </div>
        </div>
    </div>
    `
}

function showMiniCard(i){
    return `
    <div onclick="renderBigCard(${i})" class="pokeColor" id="pokeColor${i}">
        <h2>#${currentPokemon['id']}</h2>
        <h1>${currentPokemon['name'].charAt(0).toUpperCase()}${currentPokemon['name'].slice(1)}</h1>
      <div class="typeAndImg">
          <h2>${currentPokemon['types']['0']['type']['name'].charAt(0).toUpperCase()}${currentPokemon['types']['0']['type']['name'].slice(1)}</h2>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png"></img>
      </div>
    </div>
    `
}