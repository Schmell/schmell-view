import{s as z,T as I,e as h,H as k,a as C,c as g,b as p,z as y,f as u,g as U,o as d,i as V,h as b,U as w,V as N,W as S}from"./scheduler.60fdcb34.js";import{S as W,i as j,t as D,b as E,c as A,a as B,m as F,d as G}from"./index.c7b4b125.js";import{b as P}from"./index.b20a7130.js";const J=o=>({}),T=o=>({});function K(o){let t,n,r,s,l,i,f;const m=o[2].trailing,c=I(m,o,o[1],T);return{c(){t=h("div"),n=h("div"),r=h("div"),s=new k(!1),l=C(),i=h("div"),c&&c.c(),this.h()},l(a){t=g(a,"DIV",{class:!0});var e=p(t);n=g(e,"DIV",{class:!0,"data-tip":!0});var _=p(n);r=g(_,"DIV",{class:!0});var v=p(r);s=y(v,!1),v.forEach(u),_.forEach(u),l=U(e),i=g(e,"DIV",{class:!0});var $=p(i);c&&c.l($),$.forEach(u),e.forEach(u),this.h()},h(){s.a=null,d(r,"class","text-3xl font-semibold select-none line-clamp-1"),d(n,"class","h-full items-center tooltip tooltip-bottom"),d(n,"data-tip",o[0]),d(i,"class","mr-4"),d(t,"class","sub-nav svelte-2ac6ui")},m(a,e){V(a,t,e),b(t,n),b(n,r),s.m(o[0],r),b(t,l),b(t,i),c&&c.m(i,null),f=!0},p(a,[e]){(!f||e&1)&&s.p(a[0]),(!f||e&1)&&d(n,"data-tip",a[0]),c&&c.p&&(!f||e&2)&&w(c,m,a,a[1],f?S(m,a[1],e,J):N(a[1]),T)},i(a){f||(D(c,a),f=!0)},o(a){E(c,a),f=!1},d(a){a&&u(t),c&&c.d(a)}}}function L(o,t,n){let{$$slots:r={},$$scope:s}=t,{title:l}=t;return o.$$set=i=>{"title"in i&&n(0,l=i.title),"$$scope"in i&&n(1,s=i.$$scope)},[l,s,r]}class M extends W{constructor(t){super(),j(this,t,L,K,z,{title:0})}}const O=o=>({}),q=o=>({});function Q(o){let t,n;const r=o[2].trailing,s=I(r,o,o[3],q);return{c(){t=h("div"),s&&s.c(),this.h()},l(l){t=g(l,"DIV",{slot:!0});var i=p(t);s&&s.l(i),i.forEach(u),this.h()},h(){d(t,"slot","trailing")},m(l,i){V(l,t,i),s&&s.m(t,null),n=!0},p(l,i){s&&s.p&&(!n||i&8)&&w(s,r,l,l[3],n?S(r,l[3],i,O):N(l[3]),q)},i(l){n||(D(s,l),n=!0)},o(l){E(s,l),n=!1},d(l){l&&u(t),s&&s.d(l)}}}function R(o){let t,n,r,s,l,i,f,m;t=new M({props:{title:o[0],$$slots:{trailing:[Q]},$$scope:{ctx:o}}});const c=o[2].default,a=I(c,o,o[3],null);return{c(){A(t.$$.fragment),n=C(),r=h("div"),s=h("div"),l=h("div"),i=h("div"),a&&a.c(),this.h()},l(e){B(t.$$.fragment,e),n=U(e),r=g(e,"DIV",{});var _=p(r);s=g(_,"DIV",{class:!0});var v=p(s);l=g(v,"DIV",{class:!0});var $=p(l);i=g($,"DIV",{class:!0});var H=p(i);a&&a.l(H),H.forEach(u),$.forEach(u),v.forEach(u),_.forEach(u),this.h()},h(){d(i,"class","mx-4 mb-24"),d(l,"class","mt-36 relative"),d(s,"class",f=P(" w-full h-full fixed top-0 overflow-scroll",{className:o[1]}))},m(e,_){F(t,e,_),V(e,n,_),V(e,r,_),b(r,s),b(s,l),b(l,i),a&&a.m(i,null),m=!0},p(e,[_]){const v={};_&1&&(v.title=e[0]),_&8&&(v.$$scope={dirty:_,ctx:e}),t.$set(v),a&&a.p&&(!m||_&8)&&w(a,c,e,e[3],m?S(c,e[3],_,null):N(e[3]),null),(!m||_&2&&f!==(f=P(" w-full h-full fixed top-0 overflow-scroll",{className:e[1]})))&&d(s,"class",f)},i(e){m||(D(t.$$.fragment,e),D(a,e),m=!0)},o(e){E(t.$$.fragment,e),E(a,e),m=!1},d(e){e&&(u(n),u(r)),G(t,e),a&&a.d(e)}}}function X(o,t,n){let{$$slots:r={},$$scope:s}=t,{title:l=""}=t,{class:i=void 0}=t;return o.$$set=f=>{"title"in f&&n(0,l=f.title),"class"in f&&n(1,i=f.class),"$$scope"in f&&n(3,s=f.$$scope)},[l,i,r,s]}class tt extends W{constructor(t){super(),j(this,t,X,R,z,{title:0,class:1})}}export{tt as P};
