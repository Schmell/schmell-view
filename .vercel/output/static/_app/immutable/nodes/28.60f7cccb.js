import{s as Be,k as ee,l as ce,i as j,f as _,a as T,g as O,w as ze,e as E,c as I,m as be,n as fe,B as de,t as G,b as D,d as J,o as v,C as te,h,u as we,p as me,j as se,A as Te,D as M,H as $e,z as ke,E as Oe}from"../chunks/scheduler.60fdcb34.js";import{S as Re,i as ye,c as W,a as X,m as Y,t as z,b as U,d as Z,g as he,e as ve}from"../chunks/index.c7b4b125.js";import{e as ge}from"../chunks/each.e5af29b3.js";import{g as pe}from"../chunks/spread.8a54911c.js";import{P as Ue}from"../chunks/Page.1107c6af.js";import{I as He}from"../chunks/ItemCard.b8ad2ed8.js";import{p as qe}from"../chunks/stores.b0332cd2.js";import{I as ie}from"../chunks/Icon.8be3835b.js";import"../chunks/action.9792744f.js";import{c as Le}from"../chunks/create.c861e22c.js";import{g as De}from"../chunks/navigation.82bf316a.js";function Ce(r,e,l){const t=r.slice();return t[22]=e[l],t[24]=l,t}function Ae(r,e,l){const t=r.slice();return t[25]=e[l],t}function Fe(r){let e,l,t,a=ge(r[1]),s=[];for(let n=0;n<a.length;n+=1)s[n]=Ne(Ae(r,a,n));const o=n=>U(s[n],1,1,()=>{s[n]=null});let i=r[0].count>Q&&je(r);return{c(){for(let n=0;n<s.length;n+=1)s[n].c();e=T(),i&&i.c(),l=ce()},l(n){for(let f=0;f<s.length;f+=1)s[f].l(n);e=O(n),i&&i.l(n),l=ce()},m(n,f){for(let u=0;u<s.length;u+=1)s[u]&&s[u].m(n,f);j(n,e,f),i&&i.m(n,f),j(n,l,f),t=!0},p(n,f){if(f&3){a=ge(n[1]);let u;for(u=0;u<a.length;u+=1){const $=Ae(n,a,u);s[u]?(s[u].p($,f),z(s[u],1)):(s[u]=Ne($),s[u].c(),z(s[u],1),s[u].m(e.parentNode,e))}for(he(),u=a.length;u<s.length;u+=1)o(u);ve()}n[0].count>Q?i?(i.p(n,f),f&1&&z(i,1)):(i=je(n),i.c(),z(i,1),i.m(l.parentNode,l)):i&&(he(),U(i,1,1,()=>{i=null}),ve())},i(n){if(!t){for(let f=0;f<a.length;f+=1)z(s[f]);z(i),t=!0}},o(n){s=s.filter(Boolean);for(let f=0;f<s.length;f+=1)U(s[f]);U(i),t=!1},d(n){n&&(_(e),_(l)),ze(s,n),i&&i.d(n)}}}function Ge(r){let e,l="No races";return{c(){e=E("div"),e.textContent=l},l(t){e=I(t,"DIV",{["data-svelte-h"]:!0}),be(e)!=="svelte-dvqaiz"&&(e.textContent=l)},m(t,a){j(t,e,a)},p:fe,i:fe,o:fe,d(t){t&&_(e)}}}function Je(r){let e,l="I";return{c(){e=E("div"),e.textContent=l,this.h()},l(t){e=I(t,"DIV",{class:!0,["data-svelte-h"]:!0}),be(e)!=="svelte-1j60o6r"&&(e.textContent=l),this.h()},h(){v(e,"class","opacity-0 select-none")},m(t,a){j(t,e,a)},p:fe,d(t){t&&_(e)}}}function Ke(r){let e,l="Notes:",t,a,s=r[25].notes+"",o;return{c(){e=E("div"),e.textContent=l,t=T(),a=E("div"),o=G(s),this.h()},l(i){e=I(i,"DIV",{class:!0,["data-svelte-h"]:!0}),be(e)!=="svelte-1h4idve"&&(e.textContent=l),t=O(i),a=I(i,"DIV",{class:!0});var n=D(a);o=J(n,s),n.forEach(_),this.h()},h(){v(e,"class","text-xs text-primary-focus underline"),v(a,"class","px-2 pb-4")},m(i,n){j(i,e,n),j(i,t,n),j(i,a,n),h(a,o)},p(i,n){n&2&&s!==(s=i[25].notes+"")&&se(o,s)},d(i){i&&(_(e),_(t),_(a))}}}function Me(r){let e,l,t,a=r[25].sailed==="1"?"Complete":"Un-Sailed",s,o,i,n=(r[25].date?r[25].date:"TBA")+"",f,u,$=(r[25].time?r[25].time:"")+"",d,A;function N(m,c){return m[25].notes?Ke:Je}let V=N(r),C=V(r);return{c(){C.c(),e=T(),l=E("div"),t=E("div"),s=G(a),o=T(),i=E("div"),f=G(n),u=G(" - "),d=G($),A=T(),this.h()},l(m){C.l(m),e=O(m),l=I(m,"DIV",{class:!0});var c=D(l);t=I(c,"DIV",{class:!0});var g=D(t);s=J(g,a),g.forEach(_),o=O(c),i=I(c,"DIV",{class:!0});var w=D(i);f=J(w,n),u=J(w," - "),d=J(w,$),w.forEach(_),c.forEach(_),A=O(m),this.h()},h(){v(t,"class","badge"),M(t,"badge-success",r[25].sailed==="1"),M(t,"text-success-content",r[25].sailed==="1"),M(t,"badge-error",r[25].sailed==="0"),M(t,"text-error-content",r[25].sailed==="0"),v(i,"class","p-2 text-sm pr-6"),v(l,"class","flex justify-between items-center")},m(m,c){C.m(m,c),j(m,e,c),j(m,l,c),h(l,t),h(t,s),h(l,o),h(l,i),h(i,f),h(i,u),h(i,d),j(m,A,c)},p(m,c){V===(V=N(m))&&C?C.p(m,c):(C.d(1),C=V(m),C&&(C.c(),C.m(e.parentNode,e))),c&2&&a!==(a=m[25].sailed==="1"?"Complete":"Un-Sailed")&&se(s,a),c&2&&M(t,"badge-success",m[25].sailed==="1"),c&2&&M(t,"text-success-content",m[25].sailed==="1"),c&2&&M(t,"badge-error",m[25].sailed==="0"),c&2&&M(t,"text-error-content",m[25].sailed==="0"),c&2&&n!==(n=(m[25].date?m[25].date:"TBA")+"")&&se(f,n),c&2&&$!==($=(m[25].time?m[25].time:"")+"")&&se(d,$)},d(m){m&&(_(e),_(l),_(A)),C.d(m)}}}function Qe(r){let e,l,t,a,s;return{c(){e=E("div"),l=E("a"),t=G("View Results"),s=T(),this.h()},l(o){e=I(o,"DIV",{slot:!0});var i=D(e);l=I(i,"A",{href:!0,class:!0});var n=D(l);t=J(n,"View Results"),n.forEach(_),s=O(i),i.forEach(_),this.h()},h(){v(l,"href",a="/results/"+r[25].id),v(l,"class","btn btn-accent btn-xs"),v(e,"slot","top-right")},m(o,i){j(o,e,i),h(e,l),h(l,t),h(e,s)},p(o,i){i&2&&a!==(a="/results/"+o[25].id)&&v(l,"href",a)},d(o){o&&_(e)}}}function Pe(r){let e,l,t,a,s;return t=new ie({props:{icon:"material-symbols:edit-outline",width:"24"}}),{c(){e=E("div"),l=E("a"),W(t.$$.fragment),this.h()},l(o){e=I(o,"DIV",{class:!0,"data-tip":!0});var i=D(e);l=I(i,"A",{href:!0,class:!0});var n=D(l);X(t.$$.fragment,n),n.forEach(_),i.forEach(_),this.h()},h(){var o;v(l,"href",a="/event/"+((o=r[25])==null?void 0:o.id)),v(l,"class","btn btn-ghost"),v(e,"class","tooltip tooltip-top"),v(e,"data-tip","Race Edit")},m(o,i){j(o,e,i),h(e,l),Y(t,l,null),s=!0},p(o,i){var n;(!s||i&2&&a!==(a="/event/"+((n=o[25])==null?void 0:n.id)))&&v(l,"href",a)},i(o){s||(z(t.$$.fragment,o),s=!0)},o(o){U(t.$$.fragment,o),s=!1},d(o){o&&_(e),Z(t)}}}function We(r){let e;return{c(){e=G("No time provided")},l(l){e=J(l,"No time provided")},m(l,t){j(l,e,t)},p:fe,d(l){l&&_(e)}}}function Xe(r){let e=r[25].createdAt.toLocaleDateString()+"",l;return{c(){l=G(e)},l(t){l=J(t,e)},m(t,a){j(t,l,a)},p(t,a){a&2&&e!==(e=t[25].createdAt.toLocaleDateString()+"")&&se(l,e)},d(t){t&&_(l)}}}function Ye(r){var C,m;let e,l,t,a,s,o,i,n,f,u,$;s=new ie({props:{icon:"material-symbols:groups-outline-rounded",width:"30"}});let d=((C=r[0].user)==null?void 0:C.userId)===((m=r[25])==null?void 0:m.publisherId)&&Pe(r);function A(c,g){return c[25].createdAt?Xe:We}let N=A(r),V=N(r);return{c(){e=E("div"),l=E("div"),t=E("div"),a=E("a"),W(s.$$.fragment),i=T(),d&&d.c(),n=T(),f=E("span"),V.c(),u=T(),this.h()},l(c){e=I(c,"DIV",{slot:!0,class:!0});var g=D(e);l=I(g,"DIV",{class:!0});var w=D(l);t=I(w,"DIV",{class:!0,"data-tip":!0});var L=D(t);a=I(L,"A",{href:!0,class:!0});var R=D(a);X(s.$$.fragment,R),R.forEach(_),L.forEach(_),i=O(w),d&&d.l(w),w.forEach(_),n=O(g),f=I(g,"SPAN",{class:!0});var k=D(f);V.l(k),k.forEach(_),u=O(g),g.forEach(_),this.h()},h(){var c;v(a,"href",o="/comps/"+((c=r[25])==null?void 0:c.id)),v(a,"class","btn btn-ghost p-1"),v(t,"class","tooltip tooltip-top"),v(t,"data-tip","View Competitors"),v(l,"class","flex justify-end"),v(f,"class","px-2 text-xs text-secondary"),v(e,"slot","bottom-right"),v(e,"class","text-primary")},m(c,g){j(c,e,g),h(e,l),h(l,t),h(t,a),Y(s,a,null),h(l,i),d&&d.m(l,null),h(e,n),h(e,f),V.m(f,null),h(e,u),$=!0},p(c,g){var w,L,R;(!$||g&2&&o!==(o="/comps/"+((w=c[25])==null?void 0:w.id)))&&v(a,"href",o),((L=c[0].user)==null?void 0:L.userId)===((R=c[25])==null?void 0:R.publisherId)?d?(d.p(c,g),g&3&&z(d,1)):(d=Pe(c),d.c(),z(d,1),d.m(l,null)):d&&(he(),U(d,1,1,()=>{d=null}),ve()),N===(N=A(c))&&V?V.p(c,g):(V.d(1),V=N(c),V&&(V.c(),V.m(f,null)))},i(c){$||(z(s.$$.fragment,c),z(d),$=!0)},o(c){U(s.$$.fragment,c),U(d),$=!1},d(c){c&&_(e),Z(s),d&&d.d(),V.d()}}}function Ze(r){var oe,ae,p,B,P;let e,l,t,a,s,o,i,n=((oe=r[25].Event)==null?void 0:oe.name)+"",f,u,$,d,A,N,V,C=((p=(ae=r[25].Event)==null?void 0:ae.Organization)==null?void 0:p.name)+"",m,c,g,w,L,R,k,K=((P=(B=r[25].Event)==null?void 0:B.Venue)==null?void 0:P.name)+"",S,le,H;return a=new ie({props:{icon:"mdi:calendar-blank"}}),d=new ie({props:{icon:"clarity:organization-solid"}}),w=new ie({props:{icon:"mdi:map-marker"}}),{c(){e=E("div"),l=E("div"),t=E("a"),W(a.$$.fragment),s=T(),o=E("div"),i=new $e(!1),u=T(),$=E("a"),W(d.$$.fragment),A=T(),N=E("div"),V=new $e(!1),c=T(),g=E("a"),W(w.$$.fragment),L=T(),R=E("div"),k=new $e(!1),le=T(),this.h()},l(b){e=I(b,"DIV",{slot:!0,class:!0});var y=D(e);l=I(y,"DIV",{class:!0});var q=D(l);t=I(q,"A",{href:!0,class:!0});var F=D(t);X(a.$$.fragment,F),s=O(F),o=I(F,"DIV",{class:!0});var x=D(o);i=ke(x,!1),x.forEach(_),F.forEach(_),u=O(q),$=I(q,"A",{href:!0,class:!0});var ne=D($);X(d.$$.fragment,ne),A=O(ne),N=I(ne,"DIV",{class:!0});var ue=D(N);V=ke(ue,!1),ue.forEach(_),ne.forEach(_),c=O(q),g=I(q,"A",{href:!0,class:!0});var re=D(g);X(w.$$.fragment,re),L=O(re),R=I(re,"DIV",{class:!0});var _e=D(R);k=ke(_e,!1),_e.forEach(_),re.forEach(_),q.forEach(_),le=O(y),y.forEach(_),this.h()},h(){var b,y,q,F,x;i.a=null,v(o,"class","line-clamp-1"),v(t,"href",f="/events/"+((b=r[25].Event)==null?void 0:b.id)),v(t,"class","flex gap-2 items-center"),V.a=null,v(N,"class","line-clamp-1"),v($,"href",m="/organization/"+((q=(y=r[25].Event)==null?void 0:y.Organization)==null?void 0:q.id)),v($,"class","flex gap-2 items-center"),k.a=null,v(R,"class","line-clamp-1"),v(g,"href",S="/venue/"+((x=(F=r[25].Event)==null?void 0:F.Venue)==null?void 0:x.id)),v(g,"class","flex gap-2 items-center"),v(l,"class","text-base-content px-4 text-sm"),v(e,"slot","bottom-left"),v(e,"class","relative")},m(b,y){j(b,e,y),h(e,l),h(l,t),Y(a,t,null),h(t,s),h(t,o),i.m(n,o),h(l,u),h(l,$),Y(d,$,null),h($,A),h($,N),V.m(C,N),h(l,c),h(l,g),Y(w,g,null),h(g,L),h(g,R),k.m(K,R),h(e,le),H=!0},p(b,y){var q,F,x,ne,ue,re,_e,Ee,Ie,Ve;(!H||y&2)&&n!==(n=((q=b[25].Event)==null?void 0:q.name)+"")&&i.p(n),(!H||y&2&&f!==(f="/events/"+((F=b[25].Event)==null?void 0:F.id)))&&v(t,"href",f),(!H||y&2)&&C!==(C=((ne=(x=b[25].Event)==null?void 0:x.Organization)==null?void 0:ne.name)+"")&&V.p(C),(!H||y&2&&m!==(m="/organization/"+((re=(ue=b[25].Event)==null?void 0:ue.Organization)==null?void 0:re.id)))&&v($,"href",m),(!H||y&2)&&K!==(K=((Ee=(_e=b[25].Event)==null?void 0:_e.Venue)==null?void 0:Ee.name)+"")&&k.p(K),(!H||y&2&&S!==(S="/venue/"+((Ve=(Ie=b[25].Event)==null?void 0:Ie.Venue)==null?void 0:Ve.id)))&&v(g,"href",S)},i(b){H||(z(a.$$.fragment,b),z(d.$$.fragment,b),z(w.$$.fragment,b),H=!0)},o(b){U(a.$$.fragment,b),U(d.$$.fragment,b),U(w.$$.fragment,b),H=!1},d(b){b&&_(e),Z(a),Z(d),Z(w)}}}function Ne(r){let e,l;return e=new He({props:{title:r[25].name,href:"",$$slots:{"bottom-left":[Ze],"bottom-right":[Ye],"top-right":[Qe],default:[Me]},$$scope:{ctx:r}}}),{c(){W(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,a){Y(e,t,a),l=!0},p(t,a){const s={};a&2&&(s.title=t[25].name),a&268435459&&(s.$$scope={dirty:a,ctx:t}),e.$set(s)},i(t){l||(z(e.$$.fragment,t),l=!0)},o(t){U(e.$$.fragment,t),l=!1},d(t){Z(e,t)}}}function je(r){let e,l,t,a,s,o=r[3].start+"",i,n,f=r[3].end+"",u,$,d,A,N,V,C,m,c,g,w,L;N=new ie({props:{icon:"mdi:chevron-left"}});let R=[r[4],{class:"join-item btn btn-xs"}],k={};for(let p=0;p<R.length;p+=1)k=de(k,R[p]);let K=ge(r[5]),S=[];for(let p=0;p<K.length;p+=1)S[p]=Se(Ce(r,K,p));c=new ie({props:{icon:"mdi:chevron-right"}});let le=[r[8],{class:"join-item btn btn-xs"}],H={};for(let p=0;p<le.length;p+=1)H=de(H,le[p]);let oe=[r[2],{class:""}],ae={};for(let p=0;p<oe.length;p+=1)ae=de(ae,oe[p]);return{c(){e=E("div"),l=T(),t=E("nav"),a=E("p"),s=G("Showing items "),i=G(o),n=G(" - "),u=G(f),$=T(),d=E("div"),A=E("button"),W(N.$$.fragment),V=T();for(let p=0;p<S.length;p+=1)S[p].c();C=T(),m=E("button"),W(c.$$.fragment),this.h()},l(p){e=I(p,"DIV",{class:!0}),D(e).forEach(_),l=O(p),t=I(p,"NAV",{class:!0});var B=D(t);a=I(B,"P",{class:!0});var P=D(a);s=J(P,"Showing items "),i=J(P,o),n=J(P," - "),u=J(P,f),P.forEach(_),$=O(B),d=I(B,"DIV",{class:!0});var b=D(d);A=I(b,"BUTTON",{class:!0});var y=D(A);X(N.$$.fragment,y),y.forEach(_),V=O(b);for(let F=0;F<S.length;F+=1)S[F].l(b);C=O(b),m=I(b,"BUTTON",{class:!0});var q=D(m);X(c.$$.fragment,q),q.forEach(_),b.forEach(_),B.forEach(_),this.h()},h(){v(e,"class","divider"),v(a,"class","flex justify-center text-sm"),te(A,k),te(m,H),v(d,"class","join flex justify-center"),te(t,ae)},m(p,B){j(p,e,B),j(p,l,B),j(p,t,B),h(t,a),h(a,s),h(a,i),h(a,n),h(a,u),h(t,$),h(t,d),h(d,A),Y(N,A,null),A.autofocus&&A.focus(),h(d,V);for(let P=0;P<S.length;P+=1)S[P]&&S[P].m(d,null);h(d,C),h(d,m),Y(c,m,null),m.autofocus&&m.focus(),g=!0,w||(L=[we(A,"click",r[17]),me(r[11].call(null,A)),we(m,"click",r[18]),me(r[12].call(null,m)),me(r[9].call(null,t))],w=!0)},p(p,B){if((!g||B&8)&&o!==(o=p[3].start+"")&&se(i,o),(!g||B&8)&&f!==(f=p[3].end+"")&&se(u,f),te(A,k=pe(R,[B&16&&p[4],{class:"join-item btn btn-xs"}])),B&65760){K=ge(p[5]);let P;for(P=0;P<K.length;P+=1){const b=Ce(p,K,P);S[P]?S[P].p(b,B):(S[P]=Se(b),S[P].c(),S[P].m(d,C))}for(;P<S.length;P+=1)S[P].d(1);S.length=K.length}te(m,H=pe(le,[B&256&&p[8],{class:"join-item btn btn-xs"}])),te(t,ae=pe(oe,[B&4&&p[2],{class:""}]))},i(p){g||(z(N.$$.fragment,p),z(c.$$.fragment,p),g=!0)},o(p){U(N.$$.fragment,p),U(c.$$.fragment,p),g=!1},d(p){p&&(_(e),_(l),_(t)),Z(N),ze(S,p),Z(c),w=!1,Te(L)}}}function xe(r){let e,l=r[22].value+"",t,a,s,o,i=[{href:a="/races?take="+Q+"&skip="+Q*r[24]+`\r
									&`+r[16]()},r[6](r[22]),{class:"join-item btn btn-xs"}],n={};for(let f=0;f<i.length;f+=1)n=de(n,i[f]);return{c(){e=E("a"),t=G(l),this.h()},l(f){e=I(f,"A",{href:!0,class:!0});var u=D(e);t=J(u,l),u.forEach(_),this.h()},h(){te(e,n),M(e,"btn-active",r[7]===r[24]+1)},m(f,u){j(f,e,u),h(e,t),s||(o=me(r[10].call(null,e)),s=!0)},p(f,u){u&32&&l!==(l=f[22].value+"")&&Oe(t,l,n.contenteditable),te(e,n=pe(i,[{href:a},u&96&&f[6](f[22]),{class:"join-item btn btn-xs"}])),M(e,"btn-active",f[7]===f[24]+1)},d(f){f&&_(e),s=!1,o()}}}function et(r){let e,l="...";return{c(){e=E("span"),e.textContent=l},l(t){e=I(t,"SPAN",{["data-svelte-h"]:!0}),be(e)!=="svelte-9cz974"&&(e.textContent=l)},m(t,a){j(t,e,a)},p:fe,d(t){t&&_(e)}}}function Se(r){let e;function l(s,o){return s[22].type==="ellipsis"?et:xe}let t=l(r),a=t(r);return{c(){a.c(),e=ce()},l(s){a.l(s),e=ce()},m(s,o){a.m(s,o),j(s,e,o)},p(s,o){t===(t=l(s))&&a?a.p(s,o):(a.d(1),a=t(s),a&&(a.c(),a.m(e.parentNode,e)))},d(s){s&&_(e),a.d(s)}}}function tt(r){let e,l,t,a;const s=[Ge,Fe],o=[];function i(n,f){return n[1]?1:0}return e=i(r),l=o[e]=s[e](r),{c(){l.c(),t=ce()},l(n){l.l(n),t=ce()},m(n,f){o[e].m(n,f),j(n,t,f),a=!0},p(n,f){let u=e;e=i(n),e===u?o[e].p(n,f):(he(),U(o[u],1,1,()=>{o[u]=null}),ve(),l=o[e],l?l.p(n,f):(l=o[e]=s[e](n),l.c()),z(l,1),l.m(t.parentNode,t))},i(n){a||(z(l),a=!0)},o(n){U(l),a=!1},d(n){n&&_(t),o[e].d(n)}}}function lt(r){let e,l;return e=new Ue({props:{title:r[0].title??"All Races",$$slots:{default:[tt]},$$scope:{ctx:r}}}),{c(){W(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,a){Y(e,t,a),l=!0},p(t,[a]){const s={};a&1&&(s.title=t[0].title??"All Races"),a&268435967&&(s.$$scope={dirty:a,ctx:t}),e.$set(s)},i(t){l||(z(e.$$.fragment,t),l=!0)},o(t){U(e.$$.fragment,t),l=!1},d(t){Z(e,t)}}}let Q=10;function at(r,e,l){let t,a,s,o,i,n,f,u,$;ee(r,qe,k=>l(19,a=k));let{data:d}=e;const{elements:{root:A,pageTrigger:N,prevButton:V,nextButton:C},states:{pages:m,range:c,page:g}}=Le({count:d.count,perPage:Q,defaultPage:1,siblingCount:1});ee(r,A,k=>l(2,s=k)),ee(r,N,k=>l(6,f=k)),ee(r,V,k=>l(4,i=k)),ee(r,C,k=>l(8,$=k)),ee(r,m,k=>l(5,n=k)),ee(r,c,k=>l(3,o=k)),ee(r,g,k=>l(7,u=k));function w(){return a.url.searchParams.delete("skip"),a.url.searchParams.delete("take"),a.url.searchParams.toString()}const L=()=>{De(`/races?take=${Q}&skip=${Q-o.start}
								&${w()}`)},R=()=>{De(`/races?take=${Q}&skip=${Q+o.start}
								&${w()}`)};return r.$$set=k=>{"data"in k&&l(0,d=k.data)},r.$$.update=()=>{r.$$.dirty&1&&l(1,{races:t}=d,t)},[d,t,s,o,i,n,f,u,$,A,N,V,C,m,c,g,w,L,R]}class pt extends Re{constructor(e){super(),ye(this,e,at,lt,Be,{data:0})}}export{pt as component};
