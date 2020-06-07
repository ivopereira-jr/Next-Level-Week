//funçao para adicionar estados e cidades criando options no select dinamicamente pegando os dados da api do ibge

populateUFs();
//akie e para adicionar a lista de estados ao select como options
function populateUFs() {
   const ufSelect = document.querySelector("select[name=uf]");
   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
   .then( res => res.json() )
   .then( states => {
      for( const state of states ) {
         ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
   });
}


function getCities(event) {
   const citySelect = document.querySelector("[name=city]");
   const stateInput = document.querySelector("[name=state]");

   const ufValue = event.target.value;
   const indexOfSelectedState = event.target.selectedIndex;// akie pega o index ou indice do elemento selecionado dentro do conjunto
   stateInput.value = event.target.options[indexOfSelectedState].text;
   const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

   //akie limpa os option da cidade para quando mudar o estado as cidades do estado anterior selecionado nao aparecer
   citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
   citySelect.disabled = true;

   //e akie pega a url com o estado escolhido e adiciona a lista de cidades daquela estado ao option
   fetch(url).then( res => res.json()).then( cities => {

      for( const city of cities ) {
         citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
   });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);


//items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");
itemsToCollect.forEach(item => item.addEventListener("click", handleSelectedItem));

const collectedItems = document.querySelector("[name=items]");

let selectedItems = []

function handleSelectedItem(event) {
   const itemLi = event.target;
   const itemId = itemLi.dataset.id;

   itemLi.classList.toggle("selected");

   //verificar se existem items selecionados se sim 
   //pegar os items selecionados
   const alreadySelected = selectedItems.findIndex(item => {
      const itemFound = item === itemId //akie sera true ou false
      return itemFound //akie retorno o resultado e adiciona na cost already
   });

   //se ja estiver selecionado, 
   if(alreadySelected >= 0) {
      //tirar da seleçao
      const filterdItems = selectedItems.filter(item => {
         const itemIsDifferent = item != itemId
         return itemIsDifferent;
      });

      selectedItems = filterdItems;
   } else {
      //se nao estiver selecionado
      //adicionar a seleçao
      selectedItems.push(itemId);
   }
   
   //atualizar o campo escondido com 
   collectedItems.value = selectedItems;
}