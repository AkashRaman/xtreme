(this["webpackJsonpstarter-bt5"]=this["webpackJsonpstarter-bt5"]||[]).push([[14],{44:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var c="https://xtreme-notes.onrender.com"},97:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return j}));var c=n(49),r=n(51),a=n(8),s=n(1),i=n(4),l=n(99),o=n(44),u=(n(57),n(14)),b=n(3);function j(){var e=JSON.parse(localStorage.getItem("user")),t=localStorage.getItem("index");t="null"!==t?JSON.parse(t):0;var n=e.contents[t],j=Object(i.f)(),d=Object(s.useState)(n.title),x=Object(a.a)(d,2),p=x[0],O=x[1],h=Object(s.useState)(n.subtitle),f=Object(a.a)(h,2),m=f[0],v=f[1],g=Object(s.useState)(n.description),S=Object(a.a)(g,2),y=S[0],N=S[1],T=function(){var n=Object(r.a)(Object(c.a)().mark((function n(r){var a,s,i;return Object(c.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),a={title:p,subtitle:m,description:y},n.prev=2,console.log(e),n.next=6,l.a.post("".concat(o.a,"/user/modify/").concat(e._id,"/").concat(t),{newContent:a},{headers:{"content-type":"application/json"}});case 6:s=n.sent,i=s.data,console.log("submitting...",i),localStorage.setItem("user",JSON.stringify(i)),j("/notes"),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(2),console.log(n.t0);case 16:case"end":return n.stop()}}),n,null,[[2,13]])})));return function(e){return n.apply(this,arguments)}}();return Object(b.jsx)(u.D,{className:"m-4",children:Object(b.jsx)(u.n,{children:Object(b.jsxs)(u.g,{children:[Object(b.jsxs)(u.m,{tag:"h6",className:"border-bottom p-3 mb-0",children:[Object(b.jsx)("i",{className:"bi bi-bell me-2",children:" "}),"Modify Your Note"]}),Object(b.jsx)(u.h,{children:Object(b.jsxs)(u.u,{children:[Object(b.jsxs)(u.v,{children:[Object(b.jsx)(u.y,{for:"title",children:"Title"}),Object(b.jsx)(u.x,{value:p,onChange:function(e){return O(e.target.value)},id:"title",name:"title",placeholder:"Add Title",type:"textarea"})]}),Object(b.jsxs)(u.v,{children:[Object(b.jsx)(u.y,{for:"subtitle",children:"Sub-title"}),Object(b.jsx)(u.x,{value:m,onChange:function(e){return v(e.target.value)},id:"subtitle",name:"subtitle",placeholder:"Add Sub-Title",type:"textarea"})]}),Object(b.jsxs)(u.v,{children:[Object(b.jsx)(u.y,{for:"exampleText",children:"Text Area"}),Object(b.jsx)(u.x,{id:"exampleText",value:y,onChange:function(e){return N(e.target.value)},name:"text",type:"textarea"})]}),Object(b.jsx)(u.e,{onClick:function(e){return T(e)},children:"Submit"})]})})]})})})}}}]);
//# sourceMappingURL=14.bd802508.chunk.js.map