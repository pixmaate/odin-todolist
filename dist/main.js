(()=>{"use strict";(function(){const e=document.querySelector("#newItemBtn"),t=function(){const e=[];function t(t){return e[t.getID()]}function n(){return e}return{addItem:function(t){e[t.getID()]||(e[t.getID()]=t)},getItem:t,getAllItems:n,removeItem:function(c){t(c)&&(console.log(n()),delete e[c.getID()],console.log(n()))}}}();e.addEventListener("click",(e=>{e.preventDefault();const n=function(e,t,n,c,o){let r=e,i=t,u=n,d=c,a=o,l=Math.floor(Math.random()*Date.now());return{setTitle:function(e){r=e},getTitle:function(){return r},setDesc:function(e){i=e},getDesc:function(){return i},setDueDate:function(e){u=e},getDueDate:function(){return u},setPrio:function(e){d=e},getPrio:function(){return d},setProject:function(e){a=e},getProject:function(){return a},getID:function(){return l}}}(document.querySelector("#itemTitle").value,document.querySelector("#descritpion").value,document.querySelector("#itemDue").value,document.querySelector("#itemPrio").value,document.querySelector("#itemProject").value);var c;t.addItem(n),(c=t,{makeItemCard:function(e){(function(e){return{itemHeader:function(t){const n=document.querySelector("#cardWrapper"),c=document.createElement("div");c.id=t.getID(),c.classList.add("itemCard"),c.appendChild(function(e){const t=document.createElement("h3");return t.classList.add("itemTitle"),t.textContent=e.getTitle(),t}(t)),c.appendChild(function(e){const t=document.createElement("button");return t.textContent="Expand",t.addEventListener("click",(t=>{!function(e){const t=document.getElementById(e.getID());if(t.querySelector(".expand-detail")){const e=t.querySelector(".expand-detail");e.innerHTML="",e.remove()}else t.appendChild(function(){function e(e){const r=document.createElement("div");return r.classList.add("expand-detail"),r.appendChild(t(e)),r.appendChild(n(e)),r.appendChild(c(e)),r.appendChild(o(e)),r}function t(e){const t=document.createElement("p");return t.classList.add("itemText"),t.textContent=e.getDesc(),t}function n(e){const t=document.createElement("p");return t.classList.add("itemText"),t.textContent=e.getDueDate(),t}function c(e){const t=document.createElement("p");return t.classList.add("itemText"),t.textContent=e.getPrio(),t}function o(e){const t=document.createElement("p");return t.classList.add("itemText"),t.textContent=e.getProject(),t}return{itemDetails:e}}().itemDetails(e))}(e)})),t}(t)),c.appendChild(function(t,n){const c=document.createElement("button");return c.textContent="Delete",c.addEventListener("click",(c=>{!function(t,n){const c=document.getElementById(`${t}`);c.innerHTML="",c.remove(),e.removeItem(n)}(t,n)})),c}(c.id,t)),n.appendChild(c)}}})(c).itemHeader(e)}}).makeItemCard(t.getItem(n))}))})()})();