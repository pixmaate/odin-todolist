export {submitBtnHandler};

import { ToDoObject, itemHolder, projectHolder, projectObject } from "./item";

function submitBtnHandler() {

    function startFunctionality() {
        const createToDOBtn = document.querySelector('#newItemBtn');
        const itemHolderArray = itemHolder();

        createToDOBtn.addEventListener('click', (event) =>{
            event.preventDefault();
            

            const itemTitle = document.querySelector('#itemTitle').value;
            const itemDesc = document.querySelector('#descritpion').value;
            const itemDue = document.querySelector('#itemDue').value;
            const itemPrio = document.querySelector('#itemPrio').value;
            const itemProj = document.querySelector('#itemProject').value;


            const toDo = createOneItem(itemTitle,itemDesc,itemDue,itemPrio,itemProj);
            itemHolderArray.addItem(toDo);

            const itemHolderObject = itemCard().makeItemCard(itemHolderArray.getItem(toDo));
        
        });
    };

    function createOneItem(title,desc,due,prio,proj) {
        return ToDoObject(title,desc,due,prio,proj);
    };



    return {startFunctionality}
};





function itemCard() {

    function makeItemCard(toDoItem) {
        const itemCardWrapper = document.querySelector('#cardWrapper');
        const itemCard = document.createElement('div');
        itemCard.id = toDoItem.getID();
        itemCard.classList.add('itemCard');

        itemCard.appendChild(createTitle(toDoItem));
        itemCard.appendChild(createDesc(toDoItem));
        itemCard.appendChild(createDueDate(toDoItem));
        itemCard.appendChild(createPrio(toDoItem));
        itemCard.appendChild(createDeleteButton(itemCard.id));

        itemCardWrapper.appendChild(itemCard);       
        
    };

    function deleteItemCard(itemID) {
        const divToDelete = document.getElementById(`${itemID}`);
            divToDelete.innerHTML = '';
            divToDelete.remove();
    };

    function createDeleteButton(itemID) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (event) =>{
            deleteItemCard(itemID); 
        });

        return deleteButton;
    }

    function createTitle(itemObj) {
        const itemTitle = document.createElement('h3');
        itemTitle.classList.add('itemTitle');
        itemTitle.textContent = itemObj.getTitle();

        return itemTitle;
    };

    function createDesc(itemObj) {
        const itemDesc = document.createElement('p');
        itemDesc.classList.add('itemText');
        itemDesc.textContent = itemObj.getDesc();

        return itemDesc;
    };

    function createDueDate(itemObj) {
        const itemDue = document.createElement('p');
        itemDue.classList.add('itemText');
        itemDue.textContent = itemObj.getDueDate();
        
        return itemDue;
    };

    function createPrio(itemObj) {
        const itemPrio = document.createElement('p');
        itemPrio.classList.add('itemText');
        itemPrio.textContent = itemObj.getPrio();
        
        return itemPrio;
    };

    function createProj(itemObj) {
        const itemProj = document.createElement('p');
        itemProj.classList.add('itemText');
        itemProj.textContent = itemObj.getProject();
        
        return itemProj;
    };

    return{makeItemCard}
};