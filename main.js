(()=>{"use strict";function t(t,e,n,o,r){let s=t,c=e,u=n,i=o,g=r,f=Math.floor(Math.random()*Date.now());return{setTitle:function(t){s=t},getTitle:function(){return s},setDesc:function(t){c=t},getDesc:function(){return c},setDueDate:function(t){u=t},getDueDate:function(){return u},setPrio:function(t){i=t},getPrio:function(){return i},setProject:function(t){g=t},getProject:function(){return g},getID:function(){return f}}}const e=t("test","testdesc","testDue","testPrio","testProj"),n=t("test2","testdesc","testDue","testPrio","testProj"),o=t("test3","testdesc","testDue","testPrio","testProj"),r=(t("test4","testdesc","testDue","testPrio","testProj"),function(){const t=[];return{addItem:function(e){t[e.getID()]||(t[e.getID()]=e)},getItem:function(e){return t[e.getID()]},getAllItems:function(){return t}}}());r.addItem(e),r.addItem(o),r.addItem(n),console.log(r.getItem(e).getTitle()),r.getItem(n).setDesc("This is a test"),console.log(r.getItem(n).getDesc()),console.log(r.getAllItems());const s=function(t,e){let n=Math.floor(Math.random()*Date.now());return{getDesc:function(){return"This is for Testing"},getTitle:function(){return"Test Project"},getID:function(){return n}}}(),c=function(){const t=[];return{addProject:function(e){t[e.getID()]||(t[e.getID()]=e)},getProject:function(e){return t[e.getID()]},getAllProjects:function(){return t}}}();c.addProject(s),console.log(c.getProject(s).getTitle())})();