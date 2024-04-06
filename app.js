const btnTipos = document.querySelectorAll('.btn-header');   
const listaPok = document.querySelector('#listaPokemon');


let URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

// fetch(URL)
//    .then(response => response.json())
//    .then(data => fetch(data.results[12].url))
//    .then(response => response.json())
//    .then(data => {
//       console.log(data)
//    })
//    .catch(error => console.log(error))




let arrayPromesas = [];
todosLosPokemones()



/*TODOS LOS POKEMONES */
function todosLosPokemones() {
   fetch(URL)
   .then(response => response.json())
   .then(data => {
      let arrayPokemones = data.results


      arrayPokemones.forEach(pokemon => {
         arrayPromesas.push(fetch(pokemon.url).then(response => response.json()));
      });
      return Promise.all(arrayPromesas)
   })
   .then(arrayDatos => arrayDatos.forEach(data => {
      crearPokemon(data)
   }))
   .catch(error => console.log(error))
}
/***************************************/




/* POKEMONES FILTRADOS */
function tipoPokemones(tipo) {
   listaPok.innerHTML = "";
   fetch(URL)
   .then(response => response.json())
   .then(data => {
      arrayPromesas = [];
      let allPokemons = data.results
      allPokemons.forEach(pok => {
         arrayPromesas.push(fetch(pok.url).then(res => res.json()))
      })
      return Promise.all(arrayPromesas)
   })
   .then(dataArr => {
      dataArr.forEach(objPokemon => {
         let tipos = returnType(objPokemon)
         tipos.forEach(type => {
            if (type === tipo) {
               crearPokemon(objPokemon)
            }else{
               todosLosPokemones()
            }
         });
      });
   })

   .catch(error => console.log("ERROR EN EL SISTEMA: " + error))
}

btnTipos.forEach(tipoBtn => {
   tipoBtn.addEventListener('click', () =>{
      let idTipo = tipoBtn.id
      tipoPokemones(idTipo)
   })
});
/********************************************/



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


