export {ToDoObject, itemHolder};


function ToDoObject(title, description, dueDate, priority, project) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _project = project;
    let _id = createID();

    function createID() {
        return Math.floor(Math.random() * Date.now())
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


    return{setTitle,getTitle,setDesc,getDesc,setDueDate,getDueDate,setPrio,getPrio,setProject,getProject,getID};
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



    return {addItem,getItem,getAllItems}
};