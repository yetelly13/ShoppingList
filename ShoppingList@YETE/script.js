const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const formBtn=itemForm.querySelector('button');
const itemFilter=document.getElementById('filter');

let isEditMode=false;

function displayItems(){
  const itemsFromStorage=getItemsFromStorage();
  itemsFromStorage.forEach((item)=>addItemToDOM(item));

  checkUI();
}


function OnAddItemSubmit(e){
  e.preventDefault();

  //validate input
  const newItem=itemInput.value;

  if(newItem===''){
    alert('Please add an item');
    return;
  }

  //check for edit mode

  if(isEditMode){
    const itemToEdit=itemList.querySelector('.edit-mode');//removind old and putting new
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();//remove from DOM
    isEditMode=false;
  }
  else{
    if(checkIfItemExists(newItem)){
      alert('Item already exists!');
      return;
    }
  }


  //create item DOM element

  addItemToDOM(newItem);

  //Add item to local Storage

  addItemToStorage(newItem);

  // console.log('success');

  //create list item
  
  // console.log(li);
  
  checkUI();
  itemInput.value='';


}

function addItemToDOM(item){
  const li=document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button=createButton('remove-item btn-link text-red');
  li.appendChild(button);
  //ADD li to the DOM
   itemList.appendChild(li);

}

function getItemsFromStorage(){
  let itemsFromStorage;

  if(localStorage.getItem('items')==null){
    itemsFromStorage=[];

  }
  else{
    itemsFromStorage= JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}




function addItemToStorage(item){
  const  itemsFromStorage=getItemsFromStorage();
  // if(localStorage.getItem('items')==null){
  //   itemsFromStorage=[];

  // }
  // else{
  //   itemsFromStorage= JSON.parse(localStorage.getItem('items'));
  // }

  //aDD NEW ITEM TO ARRAY
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local Storage
  localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}



function createButton(classes){
  const button=document.createElement('button');
  button.className=classes;
  const icon=createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes){
  const icon=document.createElement('i');
  icon.className=classes;
  return icon;
}


function onClickItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  }
  else{
    // console.log(1);
    setItemToEdit(e.target);
  }


}

function checkIfItemExists(item){
  const itemsFromStorage=getItemsFromStorage();
  return itemsFromStorage.includes(item);

  }


function setItemToEdit(item){
  isEditMode=true;

  itemList.querySelectorAll('li').forEach(i=>i.classList.remove('edit-mode'));

  // item.style.color='#ccc';
  item.classList.add('edit-mode');
  formBtn.innerHTML='<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor='#228B22';
  itemInput.value=item.textContent;
}

// function removeItem(e){
//   if(e.target.parentElement.classList.contains('remove-item')){
//     if(confirm('Are you sure?')){
//     e.target.parentElement.parentElement.remove();
//     checkUI();

//     console.log('click');
//     }
  
//   // e.target.remove();
//   }
// }

function removeItem(item){
  console.log(item);
 if(confirm('Are you sure?')){

  //Remove item from DOM
  item.remove();

  //Remove item from storage
  removeItemFromStorage(item.textContent);

  checkUI();
 }
}

function removeItemFromStorage(item){
  let itemsFromStorage=getItemsFromStorage();
  // console.log(itemsFromStorage);

  //Filter out item to be removed
  itemsFromStorage=itemsFromStorage.filter((i)=>i!==item);

  //Re-set to locaStorage

  localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function clearItems(){
  // itemList.innerHTML='';
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }

  //clear from localStorage

  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e){
  const items=itemList.querySelectorAll('li');
  const text=e.target.value.toLowerCase();
  items.forEach((item)=>{
    const itemName=item.firstChild.textContent.toLowerCase();

    //a-> 2trues 3 falses ,,becoz a is in apple and orange
    if(itemName.indexOf(text)!=-1){
      item.style.display='flex';
      // console.log(true);
    }
    else{
      item.style.display='none';

      // console.log(false);
    }
  // console.log(itemName);

  });


  // console.log(text);
}

function checkUI(){
  itemInput.value='';
  const items=itemList.querySelectorAll('li');
  if(items.length===0){
    clearBtn.style.display='none';
    itemFilter.style.display='none';

  }
  else{
    clearBtn.style.display='block';
    itemFilter.style.display='block';
  }
    formBtn.innerHTML='<i class="fa-solid fa-plus"></i>Add Item';
    formBtn.style.backgroundColor='#333';
    isEditMode=false;

}

//Initialize app
function init(){

  //Event Listeners
itemForm.addEventListener('submit',OnAddItemSubmit);
// itemList.addEventListener('click',removeItem);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();

// localStorage.setItem('name','Brad');
// localStorage.clear();

}

init();




