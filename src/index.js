import { ToDoObject, itemHolder, projectHolder, projectObject } from "./item";
import { itemCard } from "./domHandler";


const testToDo = ToDoObject('test','testdesc','testDue','testPrio','testProj');
const testToDo2 = ToDoObject('test2','testdesc','testDue','testPrio','testProj');
const testToDo3 = ToDoObject('test3','testdesc','testDue','testPrio','testProj');
const testToDo4 = ToDoObject('test4','testdesc','testDue','testPrio','testProj');



const newHolder = itemHolder();

newHolder.addItem(testToDo);
newHolder.addItem(testToDo3);
newHolder.addItem(testToDo2);
console.log(newHolder.getItem(testToDo).getTitle());
newHolder.getItem(testToDo2).setDesc('This is a test');
console.log(newHolder.getItem(testToDo2).getDesc());
console.log(newHolder.getAllItems());

const testProject = projectObject('Test Project', 'This is for Testing');
const projectHolderNew = projectHolder();

projectHolderNew.addProject(testProject);
console.log(projectHolderNew.getProject(testProject).getTitle())

const createToDOBtn = document.querySelector('#newItemBtn');

createToDOBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    const itemTitle = document.querySelector('#itemTitle').value;

    const toDoItem = ToDoObject(itemTitle,'testdesc','testDue','testPrio','testProj')
    newHolder.addItem(toDoItem);
    const itemHolderObject = itemCard()
    itemHolderObject.makeItemCard(newHolder.getItem(toDoItem));

});

const itemHolderObject = itemCard()
itemHolderObject.makeItemCard(newHolder.getItem(testToDo2));