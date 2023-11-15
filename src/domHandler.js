export {submitBtnHandler};

import { ToDoObject, itemHolder, projectHolder, projectObject } from "./item";



//////////////////////////////////////////
//// START of Webpage Functionality /////
////////////////////////////////////////


function submitBtnHandler() {

    function startFunctionality() {
        const createToDOBtn = document.querySelector('#newItemBtn');
        const itemHolderArray = itemHolder();


        const projectHolderArray = projectHolder();
        const defaultProject = projectObject('Default','Default');
        projectHolderArray.addProject(defaultProject);
        console.log(projectHolderArray.getAllProjects());

        const projectSelector = createProjectSelector().projectSelector(projectHolderArray.getAllProjects());


        createToDOBtn.addEventListener('click', (event) =>{
            event.preventDefault();
            

            const itemTitle = document.querySelector('#itemTitle').value;
            const itemDesc = document.querySelector('#descritpion').value;
            const itemDue = document.querySelector('#itemDue').value;
            const itemPrio = document.querySelector('#itemPrio').value;
            const itemProj = document.querySelector('#itemProject').value;


            const toDo = createOneItem(itemTitle,itemDesc,itemDue,itemPrio,itemProj);
            itemHolderArray.addItem(toDo);

            const itemHolderObject = itemCard(itemHolderArray).makeItemCard(itemHolderArray.getItem(toDo));
        
        });
    };

    function createOneItem(title,desc,due,prio,proj) {
        return ToDoObject(title,desc,due,prio,proj);
    };



    return {startFunctionality}
};



//////////////////////////////////////////
////   Creation of One Item Card    /////
////////////////////////////////////////


function itemCard(itemArray) {

    function makeItemCard(toDoItem) {
        const itemCard = createItemHeader(itemArray).itemHeader(toDoItem);
        
    };

   

    

    return{makeItemCard}
};


//////////////////////////////////////////
//// Item Header and Item Details   /////
////////////////////////////////////////

function createItemHeader(itemArray) {

    function itemHeader(toDoItem) {
        const itemCardWrapper = document.querySelector('#cardWrapper');
        const itemCard = document.createElement('div');
        
        itemCard.id = toDoItem.getID();
        itemCard.classList.add('itemCard');

        itemCard.appendChild(createTitle(toDoItem));
        itemCard.appendChild(expandButton().createExpandButton(toDoItem));
        itemCard.appendChild(createDeleteButton(itemCard.id,toDoItem));

        itemCardWrapper.appendChild(itemCard);     

    };

    function createTitle(itemObj) {
        const itemTitle = document.createElement('h3');
        itemTitle.classList.add('itemTitle');
        itemTitle.textContent = itemObj.getTitle();

        return itemTitle;
    };

    function deleteItemCard(itemID,toDoItem) {
        const divToDelete = document.getElementById(`${itemID}`);
        divToDelete.innerHTML = '';
        divToDelete.remove();
        itemArray.removeItem(toDoItem);
    };

    function createDeleteButton(itemID,toDoItem) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (event) =>{
            deleteItemCard(itemID,toDoItem); 
        });

        return deleteButton;
    }



    return{itemHeader}
};


function createItemDetails() {

    function itemDetails(toDoItem) {
        const myDetailsDiv = document.createElement('div');
        myDetailsDiv.classList.add('expand-detail');

        myDetailsDiv.appendChild(createDesc(toDoItem));
        myDetailsDiv.appendChild(createDueDate(toDoItem));
        myDetailsDiv.appendChild(createPrio(toDoItem));
        myDetailsDiv.appendChild(createProj(toDoItem));
            
        return myDetailsDiv;
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

    return{itemDetails}
};



//////////////////////////////////////////
//// Create the Expand Button Func  /////
////////////////////////////////////////

function expandButton() {

    function createExpandButton(toDoItem) {
        const expandButton = document.createElement('button');
        expandButton.textContent = 'Expand';

        expandButton.addEventListener('click', (event) => {
            expandDetails(toDoItem);
        })

        return expandButton;
    };

    function expandDetails(toDoItem) {
        const myItemCard = document.getElementById(toDoItem.getID());
        if (isExpanded(myItemCard)) {
            const divToDelete = myItemCard.querySelector('.expand-detail');
            divToDelete.innerHTML = '';
            divToDelete.remove();
        }
        else {
            myItemCard.appendChild(createItemDetails().itemDetails(toDoItem));
        }
        


    };

    function isExpanded(mainElement) {
        return (mainElement.querySelector('.expand-detail')) ? true : false;
    };



    return {createExpandButton}
};


/////////////////////////
///// Project Selector /
///////////////////////

function createProjectSelector() {

    function projectSelector(projectList) {
        const controlArea = document.querySelector('#controls');
        const dropDownArea = document.createElement('div');
        const dropDownButton = document.createElement('button');
        dropDownButton.textContent = 'Select';
        dropDownArea.appendChild(dropDownButton);



        dropDownButton.classList.add('dropdown');
        createDropdownElements(projectList, dropDownArea);
        dropDownButton.addEventListener('click', (event) =>{
            event.preventDefault();
            dropDownButton.classList.toggle('show');
            const dropDownElements = document.querySelectorAll('.dropdown-element');
            console.log(dropDownElements);
            for (let i=0;i<dropDownElements.length;i++) {
                
                const openDropDown = dropDownElements[i];
                openDropDown.classList.toggle('show');
            }

        }); 
        
        controlArea.after(dropDownArea);
        

    };

    function createDropdownElements(projectList,appendArea) {
        console.log(projectList);
        for (const [key] of Object.entries(projectList)) {
            const projectElement = document.createElement('p');
            projectElement.classList.add('dropdown-element');
            projectElement.textContent = projectList[key].getTitle();
            projectElement.addEventListener('click', (event) =>{
                console.log(dropDownSelect(event.target))    
                projectElement.classList.remove('show');
            });

            appendArea.appendChild(projectElement);
        };
    };

    function dropDownSelect(element) {
        return element.textContent;
    }

    return {projectSelector};
};