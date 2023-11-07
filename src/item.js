export {ToDoObject};


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