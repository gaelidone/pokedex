const blurBack = document.querySelector('.blurLarge');




document.body.addEventListener('click', (e) =>{
   if (e.target && e.target.classList.contains('back-detail_click')) {
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
      blur.classList.add('hidden');
      const cardPok = document.querySelector('.cardPokemon');
      cardPok.remove()
   }
})


function crearCard(obj) {
   let namePok = (obj.name).toUpperCase();
   let idPok = returnId(obj.id);
   let imgPok = obj.sprites.other["official-artwork"].front_default;
   let tiposPok = returnType(obj)
   let alturaPok = obj.height
   let pesoPok = obj.weight;

   document.body.innerHTML += `<div class="cardPokemon">
   <i class="bi bi-x-circle" id="x"></i>
   <div class="card-header ${tiposPok[0]}">
      <div class="wrap-stat">
         <p class="stat">${pesoPok}<br>M</p>
         <img src="img/heightIcon.webp" alt="">
      </div>
      <img src="${imgPok}" alt="">
      <div class="wrap-stat">
         <img src="img/weightIcon.webp" class="height" alt="">
         <p class="stat">${alturaPok}<br>KG</p>
      </div>
   </div>
   <div class="card-main">
      <div class="card-main__name">
         <p class="pokemon-id">#${idPok}</p>
         <h2 class="pokemon-nombre">${namePok}</h2>
      </div>

   </div>
</div>
`
}




function devolverObj(array, nameCard) {
   let namePok = nameCard.toLowerCase();
   const objDetail = array.find(obj => obj.name === namePok);
   return objDetail;
}
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
