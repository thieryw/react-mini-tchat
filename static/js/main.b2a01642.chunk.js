(this["webpackJsonpreact-mini-tchat"]=this["webpackJsonpreact-mini-tchat"]||[]).push([[0],{37:function(e,t,r){e.exports=r(78)},42:function(e,t,r){},76:function(e,t,r){},78:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(35),u=r.n(c),s=(r(42),r(3)),o=function(e){var t=e.message;return a.a.createElement("div",{className:t.direction},a.a.createElement("em",null,"incoming"===t.direction?"From ".concat(t.emitter.name):"to ".concat(t.receiver.name)),a.a.createElement("p",null,t.description))},i=r(14),l=function(e){var t=e.user,r=e.store,c=Object(n.useReducer)((function(e){return e+1}),0),u=Object(s.a)(c,2)[1];return Object(i.useEvt)((function(e){r.evtMessageSent.attach((function(e){var r;return e.user.id===t.id||(null===(r=e.user.interlocutor)||void 0===r?void 0:r.id)===t.id}),e,(function(){return u()}))}),[r]),a.a.createElement("div",{className:"message-wrapper"},a.a.createElement("h2",null,"Messages"),a.a.createElement("div",{className:"messages"},t.messages.map((function(e,t){return a.a.createElement(o,{key:t,message:e})})).reverse()))},m=r(15),v=function(e){var t=e.store,r=e.user,c=Object(n.useState)(""),u=Object(s.a)(c,2),o=u[0],i=u[1],l=Object(m.b)(t.sendMessage),v=Object(n.useCallback)((function(e){e.preventDefault(),""!==o&&(l.execute({user:r,description:o}),i(""))}),[o,l,r]);return a.a.createElement("form",{onSubmit:v},a.a.createElement("textarea",{value:o,onChange:Object(n.useCallback)((function(e){var t=e.target;return i(t.value)}),[])}),a.a.createElement("input",{disabled:void 0===r.interlocutor,type:"submit",value:"send message"}))},f=function(e){var t=e.contacts,r=e.user,n=e.store;return a.a.createElement("ul",null,t.map((function(e){return a.a.createElement("li",{key:e.id,onClick:function(){return n.changeInterlocutor({user:r,newInterlocutor:e})}},e.name)})))},d=r(36),p=function(e){var t=e.user,r=e.store,c=e.isCurrentUser,u=Object(n.useReducer)((function(e){return e+1}),0),o=Object(s.a)(u,2)[1],m=Object(n.useMemo)((function(){var e=[];return r.users.forEach((function(r){r!==t&&e.push(r)})),e}),[r,t]);return Object(i.useEvt)((function(e){r.evtInterlocutorChanged.attach((function(e){return Object(d.same)(t,e.user)}),e,(function(){return o()}))}),[r]),a.a.createElement("div",{className:"user ".concat(c?"current":"")},a.a.createElement("div",{className:"contacts"},void 0===t.interlocutor?"":a.a.createElement("h2",null,t.interlocutor.name),a.a.createElement(f,{contacts:m,user:t,store:r})),a.a.createElement("div",{className:"flex-message-and-form"},a.a.createElement(l,{user:t,store:r}),a.a.createElement(v,{user:t,store:r})))},E=(r(76),function(e){var t=e.store,r=Object(n.useState)(0),c=Object(s.a)(r,2),u=c[0],o=c[1],i=Object(n.useCallback)((function(){u!==t.users.length-1?o(u+1):o(0)}),[u,t.users.length]);return a.a.createElement("div",{className:"App"},a.a.createElement("header",null,a.a.createElement("h1",null,t.users[u].name),a.a.createElement("input",{type:"button",value:"Toggle User",onClick:i})),t.users.map((function(e,r){return a.a.createElement(p,{store:t,user:e,key:r,isCurrentUser:u===r})})))}),b=r(4),g=r.n(b),h=r(16),j=r(10);function O(){return k.apply(this,arguments)}function k(){return(k=Object(h.a)(g.a.mark((function e(){var t,r,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(e){return new Promise((function(t){return setTimeout(t,e)}))},r=function(){for(var e=[],t=0;t<3;t++)e.push({id:t,messages:[],name:"user ".concat(t+1),interlocutor:void 0});return e}(),n={evtMessageSent:new j.Evt,evtInterlocutorChanged:new j.Evt,sendMessage:function(){var e=Object(h.a)(g.a.mark((function e(r){var a,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(300);case 2:if(a=r.user,c=r.description,void 0!==a.interlocutor){e.next=5;break}return e.abrupt("return");case 5:a.messages.push({description:c,direction:"outgoing",receiver:a.interlocutor,emitter:a}),a.interlocutor.messages.push({description:c,direction:"incoming",receiver:a.interlocutor,emitter:a}),n.evtMessageSent.post(r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),changeInterlocutor:function(){var e=Object(h.a)(g.a.mark((function e(r){var a,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.user,c=r.newInterlocutor,e.next=3,t(300);case 3:a.interlocutor=c,n.evtInterlocutorChanged.post(r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),users:r},e.next=5,t(1500);case 5:return e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w=function(){var e=Object(m.a)(O,[]);return void 0===e.result?a.a.createElement("h1",null,"Loading..."):a.a.createElement(E,{store:e.result})};u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(w,null)),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.b2a01642.chunk.js.map