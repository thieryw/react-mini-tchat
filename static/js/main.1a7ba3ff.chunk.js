(this["webpackJsonpreact-mini-tchat"]=this["webpackJsonpreact-mini-tchat"]||[]).push([[0],{32:function(e,t,n){e.exports=n(69)},37:function(e,t,n){},67:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(30),s=n.n(c),u=(n(37),n(4)),i=function(e){var t=e.message;return a.a.createElement("div",{className:t.direction},a.a.createElement("em",null,"incoming"===t.direction?"received":"sent"),a.a.createElement("p",null,t.description))},o=function(e){var t=e.user;return a.a.createElement("div",{className:"message-wrapper"},t.messages.map((function(e,t){return a.a.createElement(i,{key:t,message:e})})).reverse())},l=n(13),m=function(e){var t=e.store,n=e.receiver,c=e.emitter,s=Object(r.useState)(""),i=Object(u.a)(s,2),o=i[0],m=i[1],p=Object(l.b)(t.sendMessage),v=Object(r.useCallback)((function(e){e.preventDefault(),""!==o&&(p.execute({emitter:c,receiver:n,description:o}),m(""))}),[o,p,c,n]);return a.a.createElement("form",{onSubmit:v},a.a.createElement("input",{type:"text",value:o,onChange:Object(r.useCallback)((function(e){var t=e.target;return m(t.value)}),[])}),a.a.createElement("input",{type:"submit",value:"send message"}))},p=n(31),v=function(e){var t=e.user,n=e.store,c=Object(r.useReducer)((function(e){return e+1}),0),s=Object(u.a)(c,2)[1],i=Object(r.useMemo)((function(){var e=[];return n.users.forEach((function(n){n!==t&&e.push(n)})),e}),[n,t]);return Object(p.useEvt)((function(e){n.evtMessageSent.attach((function(e){return e.emitter.id===t.id||e.emitter.id===i[0].id}),e,(function(){return s()}))}),[n]),a.a.createElement("div",{className:"user"},a.a.createElement("h2",null,t.name),a.a.createElement(o,{user:t}),a.a.createElement(m,{emitter:t,receiver:i[0],store:n}))},f=(n(67),function(e){var t=e.store,n=Object(r.useState)(0),c=Object(u.a)(n,2),s=c[0],i=c[1],o=Object(r.useCallback)((function(){s!==t.users.length-1?i(s+1):i(0)}),[s,t.users.length]);return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"Tchat App"),a.a.createElement("input",{type:"button",value:"Toggle User",onClick:o}),t.users.map((function(e,n){return a.a.createElement("div",{key:n,className:n===s?"current":""},a.a.createElement(v,{store:t,user:e}))})))}),d=n(8),g=n.n(d),b=n(18),E=n(12);function h(){return j.apply(this,arguments)}function j(){return(j=Object(b.a)(g.a.mark((function e(){var t,n,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(e){return new Promise((function(t){return setTimeout(t,e)}))},n=[{messages:[],name:"User 1",id:0},{name:"User 2",messages:[],id:1}],r={evtMessageSent:new E.Evt,sendMessage:function(){var e=Object(b.a)(g.a.mark((function e(n){var a,c,s;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(300);case 2:a=n.emitter,c=n.receiver,s=n.description,a.messages.push({description:s,direction:"outgoing"}),c.messages.push({description:s,direction:"incoming"}),r.evtMessageSent.post(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),users:n},e.next=5,t(1500);case 5:return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=function(){var e=Object(l.a)(h,[]);return void 0===e.result?a.a.createElement("h1",null,"Loading..."):a.a.createElement(f,{store:e.result})};s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(O,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.1a7ba3ff.chunk.js.map