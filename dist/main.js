(()=>{"use strict";function t(t,e,n,o,r){let c=t,s=e,u=n,i=o,d=r,a=Math.floor(Math.random()*Date.now());return{setTitle:function(t){c=t},getTitle:function(){return c},setDesc:function(t){s=t},getDesc:function(){return s},setDueDate:function(t){u=t},getDueDate:function(){return u},setPrio:function(t){i=t},getPrio:function(){return i},setProject:function(t){d=t},getProject:function(){return d},getID:function(){return a}}}function e(){return{makeItemCard:function(t){const e=document.querySelector("#cardWrapper"),n=document.createElement("div");n.id=t.getID(),n.classList.add("itemCard"),n.appendChild(function(t){const e=document.createElement("h3");return e.classList.add("itemTitle"),e.textContent=t.getTitle(),e}(t)),n.appendChild(function(t){const e=document.createElement("p");return e.classList.add("itemText"),e.textContent=t.getDesc(),e}(t)),n.appendChild(function(t){const e=document.createElement("p");return e.classList.add("itemText"),e.textContent=t.getDueDate(),e}(t)),n.appendChild(function(t){const e=document.createElement("p");return e.classList.add("itemText"),e.textContent=t.getPrio(),e}(t)),n.appendChild(function(t){const e=document.createElement("p");return e.classList.add("itemText"),e.textContent=t.getProject(),e}(t)),e.appendChild(n)}}}const n=t("test","testdesc","testDue","testPrio","testProj"),o=t("test2","testdesc","testDue","testPrio","testProj"),r=t("test3","testdesc","testDue","testPrio","testProj"),c=(t("test4","testdesc","testDue","testPrio","testProj"),function(){const t=[];return{addItem:function(e){t[e.getID()]||(t[e.getID()]=e)},getItem:function(e){return t[e.getID()]},getAllItems:function(){return t}}}());c.addItem(n),c.addItem(r),c.addItem(o),console.log(c.getItem(n).getTitle()),c.getItem(o).setDesc("This is a test"),console.log(c.getItem(o).getDesc()),console.log(c.getAllItems());const s=function(t,e){let n=Math.floor(Math.random()*Date.now());return{getDesc:function(){return"This is for Testing"},getTitle:function(){return"Test Project"},getID:function(){return n}}}(),u=function(){const t=[];return{addProject:function(e){t[e.getID()]||(t[e.getID()]=e)},getProject:function(e){return t[e.getID()]},getAllProjects:function(){return t}}}();u.addProject(s),console.log(u.getProject(s).getTitle()),document.querySelector("#newItemBtn").addEventListener("click",(n=>{n.preventDefault();const o=t(document.querySelector("#itemTitle").value,"testdesc","testDue","testPrio","testProj");c.addItem(o),e().makeItemCard(c.getItem(o))})),e().makeItemCard(c.getItem(o))})();