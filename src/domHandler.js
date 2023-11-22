export {contentDraw};

import { ToDoObject, itemHolder, projectHolder, projectObject } from "./item";

//////////////////////////////
///// DRAW FUNCTIONS ////////
////////////////////////////


function contentDraw() {
    const itemHolderArray = itemHolder();
    const projectHolderArray = projectHolder();
    const defaultProject = projectObject('Default','Default');
    projectHolderArray.addProject(defaultProject);
    drawProjectSelector();


    function drawProjectSelector() {
        if (document.getElementById('dropdown-button')) {
            '';
        }
        else {
            const projectSelector = createProjectSelector(projectHolderArray).projectSelector(projectHolderArray.getAllProjects());
        }
    }


    

    function drawContent() {
        const buttonHandler = submitBtnHandler();
        buttonHandler.startFunctionality(itemHolderArray);
    }

////////////////////////
//// DRAW TODO ////////
//////////////////////

    function drawItemCards(itemHolderElement) {
        clearItemCards();
        const itemHolderObject = itemCard(itemHolderElement).makeItemCard(itemHolderElement.getAllItems());

    }

    function clearItemCards() {
        const clearScreen = clearDiv().clearDivID('cardWrapper');

    }

////////////////////////
//// DRAW PROJ ////////
//////////////////////

    function drawDropdown(listToDraw, appendArea, projectObject, isProjAdd) {
        if (isProjAdd) {
            const clearDropDown = clearDiv().clearDivID('dropdown-div', true);
            const dropDownDiv = document.createElement('div');
            dropDownDiv.id = 'dropdown-div';
            for (const [key] of Object.entries(listToDraw)) {
                const dropDownElement = document.createElement('p');
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';

                const dropDownElementDiv = document.createElement('div');
                dropDownElementDiv.classList.add('dropdown-div-element');

                dropDownElement.textContent = listToDraw[key].getTitle();
                dropDownElement.addEventListener('click', (event) =>{
                    createProjectSelector().dropDownClick(event.target.textContent);      
                });

                removeButton.addEventListener('click', (event) =>{
                    createProjectSelector().deleteProject(projectObject,listToDraw[key])
                    //projectObject.removeProject(listToDraw[key]);
                    drawDropdown(listToDraw, appendArea, projectObject, isProjAdd);
                })
                
                dropDownElementDiv.appendChild(dropDownElement);
                (listToDraw[key].getTitle() == 'Default') ? '' : dropDownElementDiv.appendChild(removeButton);
                dropDownDiv.appendChild(dropDownElementDiv);

            }
            dropDownDiv.appendChild(drawAddButton(projectObject, listToDraw, appendArea));
            appendArea.appendChild(dropDownDiv);
        }
        else if (document.getElementById('dropdown-div')) {
            const clearDropDown = clearDiv().clearDivID('dropdown-div', true);
        }
        else {
            const dropDownDiv = document.createElement('div');
            dropDownDiv.id = 'dropdown-div';
            for (const [key] of Object.entries(listToDraw)) {
                const dropDownElementDiv = document.createElement('div');
                dropDownElementDiv.classList.add('dropdown-div-element');
                const dropDownElement = document.createElement('p');
                dropDownElement.textContent = listToDraw[key].getTitle();

                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';

                dropDownElement.addEventListener('click', (event) =>{
                    createProjectSelector().dropDownClick(event.target.textContent);      
                });
                removeButton.addEventListener('click', (event) =>{
                    createProjectSelector().deleteProject(projectObject,listToDraw[key])
                    //projectObject.removeProject(listToDraw[key]);
                    drawDropdown(listToDraw, appendArea, projectObject, isProjAdd);
                })
                
                dropDownElementDiv.appendChild(dropDownElement);
                (listToDraw[key].getTitle() == 'Default') ? '' : dropDownElementDiv.appendChild(removeButton);
                dropDownDiv.appendChild(dropDownElementDiv);
            }
            dropDownDiv.appendChild(drawAddButton(projectObject, listToDraw, appendArea));
            appendArea.appendChild(dropDownDiv);
        };
        
    }

    function drawAddButton(projectObject, listToDraw, appendArea) {
        const addButton = document.createElement('button');
        addButton.id = 'add-button';
        addButton.textContent = '+';
        addButton.addEventListener('click', (event) =>{
            createProjectSelector().addProjectButton(projectObject, listToDraw, appendArea);
        }) 


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
        const dropDownBtn = document.querySelector('#dropdown-button');

        dropDownBtn.addEventListener('click', (evnt) =>{
            const drawnItemCards = contentDraw().drawItemCards(itemHolderElement);
        }) 

        
        const loadedCards = getStorage().loadFromLocal();

        if (loadedCards != null) {
            for (let i=0;i<loadedCards.length;i++) {
                const existingItem = createOneItem(loadedCards[i][1],loadedCards[i][2],loadedCards[i][3],loadedCards[i][4],loadedCards[i][5], loadedCards[i][0]);
                itemHolderElement.addItem(existingItem, itemHolderElement);  
            };
            const drawnItemCards = contentDraw().drawItemCards(itemHolderElement);

        };


        createToDOBtn.addEventListener('click', (event) =>{
            event.preventDefault();
            

            const itemTitle = document.querySelector('#itemTitle').value;
            const itemDesc = document.querySelector('#descritpion').value;
            const itemDue = document.querySelector('#itemDue').value;
            const itemPrio = document.querySelector('#itemPrio').value;
            const itemProj = document.querySelector('#itemProject').value;


            const toDo = createOneItem(itemTitle,itemDesc,itemDue,itemPrio,itemProj);
            itemHolderElement.addItem(toDo, itemHolderElement);
            getStorage().saveToLocal(toDo);
            const drawnItemCards = contentDraw().drawItemCards(itemHolderElement);
        
        });
    };

    function createOneItem(title,desc,due,prio,proj,existingID) {
        return ToDoObject(title,desc,due,prio,proj, existingID);
    };



    return {startFunctionality}
};



//////////////////////////////////////////
////   Creation of One Item Card    /////
////////////////////////////////////////


function itemCard(itemArray) {

    function makeItemCard(toDoItem) {
        const selectedProject = document.querySelector('#dropdown-button').textContent;
        for (const [key] of Object.entries(toDoItem)) {
            if (selectedProject == 'Default') {
                const itemCard = createItemHeader(itemArray).itemHeader(toDoItem[key]);
            }
            else if (selectedProject == toDoItem[key].getProject()) {
                const itemCard = createItemHeader(itemArray).itemHeader(toDoItem[key]);
            }
                
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
        getStorage().deleteFromLocal(toDoItem);
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

function getStorage() {

    function saveToLocal(toDoSave) {
        const itemID = toDoSave.getID()
        const oneItem = toDoSave.getItemString();


        const existingList = [];
        if (localStorage.getItem("item_list") != null) {
            const currentItems = JSON.parse(localStorage.getItem("item_list"));
            for (let i=0;i<currentItems.length;i++) {
                existingList.push(currentItems[i]);
            }
            existingList.push(oneItem);
        }
        else {
            existingList.push(oneItem);
        }


        localStorage.setItem("item_list", JSON.stringify(existingList));
    }

    function loadFromLocal() {
        const loadedList = JSON.parse(localStorage.getItem("item_list"));
        if (loadedList != null) {
            return loadedList;
        }
        
    }

    function deleteFromLocal(toDoItem) {
        const loadedList = JSON.parse(localStorage.getItem("item_list"));
        if (loadedList != null) {
            for (let i=0;i<loadedList.length;i++) {
                if (loadedList[i][0] === toDoItem.getID()) {
                    loadedList.splice(i,1);
                    localStorage.setItem("item_list", JSON.stringify(loadedList));
                }
            }
        }
    }

    return {saveToLocal, loadFromLocal, deleteFromLocal}
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
            contentDraw().drawDropdown(projectList, dropDownArea, projectHolder);
        });

        dropDownArea.appendChild(dropDownButton);
        controlArea.after(dropDownArea);

    }

    function dropDownClick(newText) {
        const dropDownButton = document.getElementById('dropdown-button');
        dropDownButton.textContent = newText;
        
    }

    function deleteProject(projectObject, projectToRemove) {
        const dropDownButton = document.getElementById('dropdown-button');
        dropDownButton.textContent = 'Default';
        removeProjectToOptions(projectToRemove.getTitle());
        projectObject.removeProject(projectToRemove);
    };

    function addProjectToOptions(projectTitle) {
        const projectSelector = document.getElementById('itemProject');
        const newProjectOption = document.createElement('option');
        newProjectOption.value = projectTitle;
        newProjectOption.textContent = projectTitle;
        projectSelector.appendChild(newProjectOption);
    }

    function removeProjectToOptions(projectTitle) {
        const optionToDelete = document.querySelector(`#itemProject option[value='${projectTitle}']`)
        optionToDelete.remove();
    }

    function addProjectButton(_projectHolder, listToDraw, appendArea) {
        const addButton = document.getElementById('add-button');
        
        projectDetails(addButton, _projectHolder, listToDraw, appendArea);
        console.log(_projectHolder.getAllProjects());

    };

    function projectDetails(appendDiv, _projectHolder, listToDraw, appendArea) {
        const projectAddDiv = document.createElement('div');
        projectAddDiv.id = 'project-add-div';
        const projectName = document.createElement('input');
        const okButton = document.createElement('button');
        projectName.id = 'proj-name';
        okButton.textContent = 'Ok';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Back';
        cancelButton.addEventListener('click', (event) =>{
            event.preventDefault()
            const deleteSelf = clearDiv().clearDivID('project-add-div', true);
        });

        okButton.addEventListener('click', (event) =>{
            event.preventDefault();
            const projectTitle = document.querySelector('#proj-name').value;
            const deleteSelf = clearDiv().clearDivID('project-add-div', true);
            const newProject = projectObject(projectTitle,'Default');
            addProj(_projectHolder, newProject);
            addProjectToOptions(projectTitle);
            contentDraw().drawDropdown(listToDraw, appendArea, _projectHolder, true);
        });
        projectAddDiv.appendChild(projectName);
        projectAddDiv.appendChild(okButton);
        projectAddDiv.appendChild(cancelButton);
        appendDiv.after(projectAddDiv);
        
    }

    function addProj(_projectHolder, _projectObject) {
        _projectHolder.addProject(_projectObject);
    }


    return {projectSelector, dropDownClick, addProjectButton, deleteProject}
};



