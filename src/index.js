import { ToDoObject, itemHolder } from "./item";


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