const blurBack = document.querySelector('.blurLarge');




document.body.addEventListener('click', (e) =>{
   if (e.target && e.target.classList.contains('back-detail_click')) {
      let blur = document.querySelector('.blurLarge');
      blur.classList.toggle('hidden')
      const target = e.target;
      const name = target.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.lastElementChild.textContent;
      const pokClick = devolverObj(arrayObjectAllPokemons, name)
      console.log(pokClick)
      crearCard(pokClick)
   }
})


document.body.addEventListener('click', (e) =>{
   if ((e.target && e.target.id === "x") || (e.target && e.target.id === "blur")) {
      const blur = document.querySelector('#blur');
      blur.classList.toggle('hidden');
      const cardPok = document.querySelector('.cardPokemon');
      cardPok.remove()
   }
})


function crearCard(obj) {
   let namePok = (obj.name).toUpperCase();
   let idPok = returnId(obj.id);
   let imgPok = obj.sprites.other["official-artwork"].front_default;
   let gifPok = obj.sprites.versions["generation-v"]["black-white"].animated.front_default;
   let tiposPok = returnType(obj)
   let alturaPok = obj.height
   let pesoPok = obj.weight;
   let textPok = allTextosDesc[(obj.id) - 1]
   let arrayStats = cargarStats(obj.id)
   console.log(arrayStats)

   document.body.innerHTML += `<div class="cardPokemon">
   <i class="bi bi-x-circle" id="x"></i>
   <div class="card-header ${tiposPok[0]}">
      <div class="wrap-stat">
         <p class="stat">${alturaPok}<br>M</p>
         <img src="img/heightIcon.webp" alt="">
      </div>
      <img src="${imgPok}" alt="">
      <div class="wrap-stat">
         <img src="img/weightIcon.webp" class="height" alt="">
         <p class="stat">${pesoPok}<br>KG</p>
      </div>
   </div>
   
   <div class="card-main">
      <div class="card-main__name">
         <h2 class="pokemon-nombre">${namePok}</h2>
         <p class="pokemon-id">#${idPok}</p>
      </div>
      <div class="card-main__tipos">
      <p class="${tiposPok[0]} tipo">${(tiposPok[0]).toUpperCase()}</p>
      </div>
   </div>

   <div class="card-section">
   <div class="card-section__text">
      <p>${textPok}</p>
      <div class="wrap-img">
         <img src="${gifPok}" alt="">
      </div>
   </div>
   <div class="card-section__stats">
       <div class="container-stats">
            <div class="div-stat">
              <p>HP</p>
             <div class="stat-bar"></div>
            </div>
            <div class="div-stat">
               <p>ATK</p>
               <div class="stat-bar"></div>
            </div>
            <div class="div-stat">
              <p>DEF</p>
              <div class="stat-bar"></div>            
            </div>
            <div class="div-stat">
             <p>ATK+</p>
             <div class="stat-bar"></div>
            </div>
            <div class="div-stat">
               <p>DEF+</p>
               <div class="stat-bar"></div>
            </div>
            <div class="div-stat">
               <p>SPD</p>
               <div class="stat-bar"></div>
            </div>

         </div>
      </div>
   </div>
   
</div>
`
   borderColor(tiposPok)
}




function devolverObj(array, nameCard) {
   const namePok = nameCard.toLowerCase();
   const objDetail = array.find(obj => obj.name === namePok);
   return objDetail;
}

function borderColor(type) {
   const card = document.querySelector('.cardPokemon');
   console.log(card)
   card.style.boxShadow = `0 0 20px 3px var(--type-${type[0]})`
}


/* CARGAR TEXTOS DESCRIPTIVOS DE LOS POKEMONES */
let URLtext = "https://pokeapi.co/api/v2/pokemon-species/"
let allTextosDesc = [];

async function cargarTextos() {
   for (let i = 1; i < 10; i++) {
      let url_flavor = `${URLtext}${i}`
      let response = await fetch(url_flavor)
      let data = await response.json()
      let textoDesc = data.flavor_text_entries[0].flavor_text.replaceAll("\n", " ") + " " + data.flavor_text_entries[2].flavor_text.replaceAll("\n", " ")
      allTextosDesc.push(textoDesc)
   }
}

cargarTextos()

/***************************************************************/

/* CARGAR LAS STATS */
function cargarStats(id) {
   const pok = arrayObjectAllPokemons[(id - 1)];
   const statsDefault = pok.stats;
   let arrayStats = [];
   statsDefault.forEach(stat => {
      arrayStats.push(stat.base_stat)
   });
   return arrayStats;
}
/***************************************************************/


//    <div class="cardPokemon">
//       <i class="bi bi-x-circle"></i>
//       <div class="card-header water">
//          <div class="wrap-stat">
//             <p class="stat">12 <br> M</p>
//             <img src="img/heightIcon.webp" alt="">
//          </div>
//          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" alt="">
//          <div class="wrap-stat">
//             <img src="img/weightIcon.webp" class="height" alt="">
//             <p class="stat">135 <br> KG</p>
//          </div>
//       </div>
//       <div class="card-main">
//          <div class="card-main__name">
//             <p class="pokemon-id">#007</p>
//             <h2 class="pokemon-nombre">SQUIRTLE</h2>
//          </div>

//       </div>
//    </div>
