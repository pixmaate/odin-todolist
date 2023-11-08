export {itemCard};


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
        itemCard.appendChild(createProj(toDoItem));

        

        

        itemCardWrapper.appendChild(itemCard);
        
    };

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