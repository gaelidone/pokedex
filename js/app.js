const btnTipos = document.querySelectorAll('.btn-header');   
const listaPok = document.querySelector('#listaPokemon');
let paginaCargada = false

let URL = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";
let arrayObjectAllPokemons = [];


/*TODOS LOS POKEMONES */
async function cargarPokemons() {
   try {
      const response = await fetch(URL)
      const data = await response.json()
      const arrayPok = data.results
      const arrayPromesas = arrayPok.map(Pok => {
         return fetch(Pok.url).then(res => res.json())
      });
      const arrayDatos = await Promise.all(arrayPromesas)
      arrayDatos.forEach(obj => {
         arrayObjectAllPokemons.push(obj);
         if (paginaCargada === false) {
            crearPokemon(obj)
         }
      });
      paginaCargada = true;


   } catch (error) {
      console.log(error)
   }
}
cargarPokemons()
/***************************************/



/* POKEMONES FILTRADOS */
function filtrarPokemons(tipo, array) {
   const pokemonsFiltrados = []
   array.forEach(pok => {
      let tiposPok = returnType(pok)
      if (tiposPok[0] === tipo || tiposPok[1] === tipo) {
         pokemonsFiltrados.push(pok)
      }
   });
   return pokemonsFiltrados
}

btnTipos.forEach(tipoBtn => {
   tipoBtn.addEventListener('click', () =>{
      let idTipo = tipoBtn.id;
      let verificacion = tipoBtn.classList.contains('active')

      if (verificacion === false) {
         borrarClassActive()
         tipoBtn.classList.add('active')

         if (idTipo === "ver-todos") {
            listaPok.innerHTML = ""
            arrayObjectAllPokemons.forEach(pok => crearPokemon(pok));

         }else{
            const pokFiltrados = filtrarPokemons(idTipo, arrayObjectAllPokemons)
            if (pokFiltrados.length !== 0) {
               listaPok.innerHTML = ""
               pokFiltrados.forEach(pok => crearPokemon(pok));
            }else{
               listaPok.innerHTML = ""
            }
         }
      }


   })
});

function borrarClassActive() {
   btnTipos.forEach(tipoBtn => tipoBtn.classList.remove('active'))
}
// /********************************************/



/* CREAR CARTAS DE POKEMONES EN EL HTML */
function crearPokemon(obj) {
   let namePok = (obj.name).toUpperCase();
   let idPok = returnId(obj.id);
   let imgPok = obj.sprites.other["official-artwork"].front_default;
   let tiposPok = returnType(obj)
   let alturaPok = obj.height
   let pesoPok = obj.weight;
   let cardPok
   if (tiposPok.length === 1) {
      cardPok = `<div class="pokemon">
      <p class="pokemon-id-back">#${idPok}</p>
      <div class="pokemon-img">
         <img src="${imgPok}" alt="">
      </div>
      <div class="pokemon-info">
         <div class="nombre-contenedor">
            <p class="pokemon-id">#${idPok}</p>
            <h2 class="pokemon-nombre">${namePok}</h2>
         </div>
         <div class="pokemon-tipos">
            <p class="${tiposPok[0]} tipo">${(tiposPok[0]).toUpperCase()}</p>
         </div>
         <div class="pokemon-stats">
            <p class="stat">${alturaPok}M</p>
            <p class="stat">${pesoPok}KG</p>
         </div>
      </div>
   </div>`
   }else{
      cardPok = `<div class="pokemon">
      <p class="pokemon-id-back">#${idPok}</p>
      <div class="pokemon-img">
         <img src="${imgPok}" alt="">
      </div>
      <div class="pokemon-info">
         <div class="nombre-contenedor">
            <p class="pokemon-id">#${idPok}</p>
            <h2 class="pokemon-nombre">${namePok}</h2>
         </div>
         <div class="pokemon-tipos">
            <p class="${tiposPok[0]} tipo">${(tiposPok[0]).toUpperCase()}</p>
            <p class="${tiposPok[1]} tipo">${(tiposPok[1]).toUpperCase()}</p>
         </div>
         <div class="pokemon-stats">
            <p class="stat">${alturaPok}M</p>
            <p class="stat">${pesoPok}KG</p>
         </div>
      </div>
   </div>`
   }

listaPok.innerHTML +=  cardPok
}
/********************************************************/



/* FUNCIONES QUE RETORNAN UN TIPO DE DATO */
function returnId(id) {
   let stringId = id.toString()
   if (stringId.length === 1) {
      return `00${stringId}`
   }else if (stringId.length === 2) {
      return `0${stringId}`
   }else{
      return stringId
   }
}

function returnType(obj) {
   let tipos = obj.types
   let tiposPok = []
   tipos.forEach(tipo => {
      let hability = tipo.type.name;
      tiposPok.push(hability);
   });
   return tiposPok;
}
/******************************************************/


