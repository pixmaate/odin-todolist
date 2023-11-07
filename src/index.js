import { ToDoObject } from "./item";


const testToDo = ToDoObject('test','testdesc','testDue','testPrio','testProj');
const testToDo2 = ToDoObject('test2','testdesc','testDue','testPrio','testProj');
const testToDo3 = ToDoObject('test3','testdesc','testDue','testPrio','testProj');
const testToDo4 = ToDoObject('test4','testdesc','testDue','testPrio','testProj');



const testArray = [];
testArray[testToDo.getID()] = testToDo;
testArray[testToDo2.getID()] = testToDo2;
testArray[testToDo3.getID()] = testToDo3;
testArray[testToDo4.getID()] = testToDo4;
console.log(testArray[testToDo.getID()].getTitle());
console.log(testArray[testToDo2.getID()].getTitle());
console.log(testArray[testToDo3.getID()].getTitle());
console.log(testArray[testToDo4.getID()].getTitle());
console.log(testArray[testToDo4.getID()].setTitle('rokakoma'));
console.log(testArray[testToDo4.getID()].getTitle());