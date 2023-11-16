export {contentDraw};

import { ToDoObject, itemHolder, projectHolder, projectObject } from "./item";

//////////////////////////////
///// DRAW FUNCTIONS ////////
////////////////////////////


function contentDraw() {
    const itemHolderArray = itemHolder();


    function drawContent() {
        const buttonHandler = submitBtnHandler();
        buttonHandler.startFunctionality(itemHolderArray);
    }

////////////////////////
//// DRAW TODO ////////
//////////////////////

    function drawItemCards(itemHolderElement) {
        console.log(itemHolderElement.getAllItems());
        clearItemCards();
        const itemHolderObject = itemCard(itemHolderElement).makeItemCard(itemHolderElement.getAllItems());

    }

    function clearItemCards() {
        const clearScreen = clearDiv().clearDivID('cardWrapper');

    }

////////////////////////
//// DRAW PROJ ////////
//////////////////////

    function drawDropdown(listToDraw, appendArea) {
        if (document.getElementById('dropdown-div')) {
            const clearDropDown = clearDiv().clearDivID('dropdown-div', true);
        }
        else {
            const dropDownDiv = document.createElement('div');
            dropDownDiv.id = 'dropdown-div';
            for (const [key] of Object.entries(listToDraw)) {
                const dropDownElement = document.createElement('p');
                dropDownElement.textContent = listToDraw[key].getTitle();
                dropDownElement.addEventListener('click', (event) =>{
                    createProjectSelector().dropDownClick(event.target.textContent);      
                });
                dropDownDiv.appendChild(dropDownElement);
            }
            dropDownDiv.appendChild(drawAddButton());
            appendArea.appendChild(dropDownDiv);
        };
        
    }

    function drawAddButton() {
        const addButton = document.createElement('button');
        addButton.id = 'add-button';
        addButton.textContent = '+'; 


        return addButton
    }


    return {drawContent, drawItemCards, drawDropdown}
};

////////////////////////
//// CLEARDIV /////////
//////////////////////

function clearDiv() {

    function clearDivID(divID, isElementDelete) {
        const divToDelete = document.getElementById(divID);
        divToDelete.innerHTML = '';
        (isElementDelete) ? divToDelete.remove() : '';
    }

    function clearDivClass(divClass, isElementDelete) {
        const divToDelete = document.querySelector(divClass);
        divToDelete.innerHTML = ''
        (isElementDelete) ? divToDelete.remove() : '';
    }
 
    return {clearDivID, clearDivClass}
}


//////////////////////////////////////////
//// START of Webpage Functionality /////
////////////////////////////////////////


function submitBtnHandler() {

    function startFunctionality(itemHolderElement) {
        const createToDOBtn = document.querySelector('#newItemBtn');


        const projectHolderArray = projectHolder();
        const defaultProject = projectObject('Default','Default');
        projectHolderArray.addProject(defaultProject);
        console.log(projectHolderArray.getAllProjects());

        const projectSelector = createProjectSelector(projectHolderArray).projectSelector(projectHolderArray.getAllProjects());


        createToDOBtn.addEventListener('click', (event) =>{
            event.preventDefault();
            

            const itemTitle = document.querySelector('#itemTitle').value;
            const itemDesc = document.querySelector('#descritpion').value;
            const itemDue = document.querySelector('#itemDue').value;
            const itemPrio = document.querySelector('#itemPrio').value;
            const itemProj = document.querySelector('#itemProject').value;


            const toDo = createOneItem(itemTitle,itemDesc,itemDue,itemPrio,itemProj);
            itemHolderElement.addItem(toDo);
            const drawnItemCards = contentDraw().drawItemCards(itemHolderElement);
        
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
        for (const [key] of Object.entries(toDoItem)) {
            const itemCard = createItemHeader(itemArray).itemHeader(toDoItem[key]);
        }
        
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
        itemArray.removeItem(toDoItem);
        const drawnItemCards = contentDraw().drawItemCards(itemArray);


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

function createProjectSelector(projectHolder) {

    function projectSelector(projectList) {
        const controlArea = document.querySelector('#controls');
        const dropDownArea = document.createElement('div');
        dropDownArea.classList.add('dropdown-area');

        const dropDownButton = document.createElement('button');
        dropDownButton.textContent = 'Default';
        dropDownButton.id = 'dropdown-button';

        dropDownButton.addEventListener('click', (event) =>{
            contentDraw().drawDropdown(projectList, dropDownArea);
        });

        dropDownArea.appendChild(dropDownButton);
        controlArea.after(dropDownArea);

    }

    function dropDownClick(newText) {
        const dropDownButton = document.getElementById('dropdown-button');
        dropDownButton.textContent = newText;
    }


    return {projectSelector, dropDownClick}
};




/* 
function createProjectSelector(projectHolder) {

    function projectSelector(projectList) {
        const controlArea = document.querySelector('#controls');
        const dropDownArea = document.createElement('div');
        dropDownArea.classList.add('dropdown-area')
        const dropDownButton = document.createElement('button');
        dropDownButton.textContent = 'Default';
        dropDownArea.appendChild(dropDownButton);



        dropDownButton.classList.add('dropdown');
        const dropDownDetail = createDropdownElements(projectHolder.getAllProjects(), dropDownArea, projectHolder);
        createProjectAddButton(dropDownDetail, projectHolder, dropDownArea);


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

    function deleteDropdownElements() {
        const divToDelete = document.querySelector('.project-area-elements');
        divToDelete.innerHTML = '';
        divToDelete.remove();
    };

    function createProjectAddButton(appendArea, projectHolder, mainArea) {
        const projectAddButton = document.createElement('button');
        projectAddButton.textContent = '+';
        projectAddButton.classList.add('dropdown-element');
        projectAddButton.id = 'addbutton';
        projectAddButton.addEventListener('click', (event) => {
            event.preventDefault();
            const projectItem = projectObject('Test','Test');
            projectHolder.addProject(projectItem);
            deleteDropdownElements();
            console.log(projectHolder.getAllProjects());
            createDropdownElements(projectHolder.getAllProjects(), mainArea);

        })
        appendArea.appendChild(projectAddButton);
    }

    function createDropdownElements(projectList,appendArea, projectHolder) {
        const projectElements = document.createElement('div');
        projectElements.classList.add('project-area-elements');

        for (const [key] of Object.entries(projectList)) {
            const projectElement = document.createElement('p');
            projectElement.classList.add('dropdown-element');
            projectElement.textContent = projectList[key].getTitle();

            projectElement.addEventListener('click', (event) =>{
                console.log(dropDownSelect(event.target))    
                projectElement.classList.remove('show');
                const buttonValue = document.querySelector('.dropdown');
                buttonValue.textContent = projectElement.textContent;
            });

            projectElements.appendChild(projectElement);
        };

        appendArea.appendChild(projectElements);
        return projectElements;
    };

    function dropDownSelect(element) {
        return element.textContent;
    }

    return {projectSelector};
};
*/