export {ToDoObject, itemHolder, projectObject, projectHolder};


function ToDoObject(title, description, dueDate, priority, project, existingID) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _project = project;
    let _id = createID();

    function createID() {
        console.log(existingID);
        if (existingID) {
            console.log('existing');
            return existingID;
        }
        else {
            console.log('new');
            return Math.floor(Math.random() * Date.now())
        }
    };

    function getID() {
        return _id;
    }

    function setTitle(input) {
        _title = input;
    };

    function getTitle() {
        return _title;
    };

    function setDesc(input) {
        _description = input;
    };

    function getDesc() {
        return _description;
    }

    function setDueDate(input) {
        _dueDate = input;
    }

    function getDueDate() {
        return _dueDate;
    }

    function setPrio(input) {
        _priority = input;
    }

    function getPrio() {
        return _priority;
    }

    function setProject(input) {
        _project = input;
    }

    function getProject() {
        return _project;
    }

    function getItemString() {
        const itemList = [];
        itemList.push(getID());
        itemList.push(getTitle());
        itemList.push(getDesc());
        itemList.push(getDueDate());
        itemList.push(getPrio());
        itemList.push(getProject());

        return itemList;
    }


    return{setTitle,getTitle,setDesc,getDesc,setDueDate,getDueDate,setPrio,getPrio,setProject,getProject,getID, getItemString};
};


function itemHolder(){
    const _itemArray = [];

    function addItem(item) {
        if (_itemArray[item.getID()]) {
            return;
        }
        else {
            _itemArray[item.getID()] = item;
        };        
    };

    function getItem(item) {
        return _itemArray[item.getID()];
    }

    function getAllItems() {
        return _itemArray;
    }

    
    function removeItem(toDoItem) {
        if (getItem(toDoItem)) {
            delete _itemArray[toDoItem.getID()];
        };
    }



    return {addItem,getItem,getAllItems, removeItem}
};

function projectObject(title,description) {
    let _title = title;
    let _description = description;
    let _projectID = createID();

    function getDesc() {
        return _description;
    }

    function getTitle() {
        return _title;
    }

    function createID() {
        return Math.floor(Math.random() * Date.now());
    }

    function getID() {
        return _projectID
    }

    return{getDesc,getTitle,getID}
};

function projectHolder() {
    const _projectArray = [];


    function addProject(project) {
        if (_projectArray[project.getID()]) {
            return;
        }
        else {
            _projectArray[project.getID()] = project;
        };        
    };

    function getProject(project) {
        return _projectArray[project.getID()];
    }


    function getAllProjects() {
        return _projectArray;
    }

    function removeProject(projectItem) {
        if (getProject(projectItem)) {
            delete _projectArray[projectItem.getID()];
        };
    }

    

    return{addProject,getProject,getAllProjects, removeProject}
}