import{s as F,e as $,c as h,b as T,f as m,i as g,t as D,a as A,d as N,g as E,o as d,h as _,p as M,j as O}from"../chunks/scheduler.60fdcb34.js";import{S as R,i as z,c as S,a as V,m as j,t as v,b as k,d as q,g as G,e as H}from"../chunks/index.c7b4b125.js";import{e as J}from"../chunks/forms.eea97056.js";import{B as K}from"../chunks/button.0888a59b.js";import{P as L}from"../chunks/Page.1107c6af.js";function C(s){let t,n=(s[1].boat??s[1].skipper??s[1].sailno)+"",e,o,a,i,b,P,p,I,U,f,c,y,w;return f=new K({props:{$$slots:{default:[Q]},$$scope:{ctx:s}}}),{c(){t=$("div"),e=D(n),o=A(),a=$("form"),i=$("input"),P=A(),p=$("input"),U=A(),S(f.$$.fragment),this.h()},l(r){t=h(r,"DIV",{});var l=T(t);e=N(l,n),l.forEach(m),o=E(r),a=h(r,"FORM",{method:!0,action:!0});var u=T(a);i=h(u,"INPUT",{name:!0,type:!0}),P=E(u),p=h(u,"INPUT",{name:!0,type:!0}),U=E(u),V(f.$$.fragment,u),u.forEach(m),this.h()},h(){var r;d(i,"name","compId"),i.value=b=s[1].id,d(i,"type","hidden"),d(p,"name","userId"),p.value=I=(r=s[0])==null?void 0:r.userId,d(p,"type","hidden"),d(a,"method","post"),d(a,"action","?/addCompToUser")},m(r,l){g(r,t,l),_(t,e),g(r,o,l),g(r,a,l),_(a,i),_(a,P),_(a,p),_(a,U),j(f,a,null),c=!0,y||(w=M(J.call(null,a)),y=!0)},p(r,l){var B;(!c||l&2)&&n!==(n=(r[1].boat??r[1].skipper??r[1].sailno)+"")&&O(e,n),(!c||l&2&&b!==(b=r[1].id))&&(i.value=b),(!c||l&1&&I!==(I=(B=r[0])==null?void 0:B.userId))&&(p.value=I);const u={};l&8&&(u.$$scope={dirty:l,ctx:r}),f.$set(u)},i(r){c||(v(f.$$.fragment,r),c=!0)},o(r){k(f.$$.fragment,r),c=!1},d(r){r&&(m(t),m(o),m(a)),q(f),y=!1,w()}}}function Q(s){let t;return{c(){t=D("Add to User")},l(n){t=N(n,"Add to User")},m(n,e){g(n,t,e)},d(n){n&&m(t)}}}function W(s){let t,n,e=s[1]&&C(s);return{c(){t=$("div"),e&&e.c()},l(o){t=h(o,"DIV",{});var a=T(t);e&&e.l(a),a.forEach(m)},m(o,a){g(o,t,a),e&&e.m(t,null),n=!0},p(o,a){o[1]?e?(e.p(o,a),a&2&&v(e,1)):(e=C(o),e.c(),v(e,1),e.m(t,null)):e&&(G(),k(e,1,1,()=>{e=null}),H())},i(o){n||(v(e),n=!0)},o(o){k(e),n=!1},d(o){o&&m(t),e&&e.d()}}}function X(s){let t,n;return t=new L({props:{title:"Add competitor",$$slots:{default:[W]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,o){j(t,e,o),n=!0},p(e,[o]){const a={};o&11&&(a.$$scope={dirty:o,ctx:e}),t.$set(a)},i(e){n||(v(t.$$.fragment,e),n=!0)},o(e){k(t.$$.fragment,e),n=!1},d(e){q(t,e)}}}function Y(s,t,n){let e,o,{data:a}=t;return s.$$set=i=>{"data"in i&&n(2,a=i.data)},s.$$.update=()=>{s.$$.dirty&4&&n(1,{comp:e,user:o}=a,e,(n(0,o),n(2,a)))},[o,e,a]}class ne extends R{constructor(t){super(),z(this,t,Y,X,F,{data:2})}}export{ne as component};
