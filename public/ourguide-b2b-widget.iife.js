(function(){"use strict";var te,v,Le,U,Re,He,Pe,Be,pe,_e,he,J={},De=[],kn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,oe=Array.isArray;function P(e,n){for(var t in n)e[t]=n[t];return e}function be(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function ze(e,n,t){var o,r,i,a={};for(i in n)i=="key"?o=n[i]:i=="ref"?r=n[i]:a[i]=n[i];if(arguments.length>2&&(a.children=arguments.length>3?te.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)a[i]===void 0&&(a[i]=e.defaultProps[i]);return re(e,a,o,r,null)}function re(e,n,t,o,r){var i={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Le,__i:-1,__u:0};return r==null&&v.vnode!=null&&v.vnode(i),i}function ie(e){return e.children}function se(e,n){this.props=e,this.context=n}function W(e,n){if(n==null)return e.__?W(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?W(e):null}function Ue(e){var n,t;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null){e.__e=e.__c.base=t.__e;break}return Ue(e)}}function Fe(e){(!e.__d&&(e.__d=!0)&&U.push(e)&&!ae.__r++||Re!=v.debounceRendering)&&((Re=v.debounceRendering)||He)(ae)}function ae(){for(var e,n,t,o,r,i,a,c=1;U.length;)U.length>c&&U.sort(Pe),e=U.shift(),c=U.length,e.__d&&(t=void 0,o=void 0,r=(o=(n=e).__v).__e,i=[],a=[],n.__P&&((t=P({},o)).__v=o.__v+1,v.vnode&&v.vnode(t),me(n.__P,t,o,n.__n,n.__P.namespaceURI,32&o.__u?[r]:null,i,r??W(o),!!(32&o.__u),a),t.__v=o.__v,t.__.__k[t.__i]=t,qe(i,t,a),o.__e=o.__=null,t.__e!=r&&Ue(t)));ae.__r=0}function je(e,n,t,o,r,i,a,c,d,l,p){var s,f,_,b,E,S,m,y=o&&o.__k||De,O=n.length;for(d=Sn(t,n,y,d,O),s=0;s<O;s++)(_=t.__k[s])!=null&&(f=_.__i==-1?J:y[_.__i]||J,_.__i=s,S=me(e,_,f,r,i,a,c,d,l,p),b=_.__e,_.ref&&f.ref!=_.ref&&(f.ref&&ve(f.ref,null,_),p.push(_.ref,_.__c||b,_)),E==null&&b!=null&&(E=b),(m=!!(4&_.__u))||f.__k===_.__k?d=We(_,d,e,m):typeof _.type=="function"&&S!==void 0?d=S:b&&(d=b.nextSibling),_.__u&=-7);return t.__e=E,d}function Sn(e,n,t,o,r){var i,a,c,d,l,p=t.length,s=p,f=0;for(e.__k=new Array(r),i=0;i<r;i++)(a=n[i])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=e.__k[i]=re(null,a,null,null,null):oe(a)?a=e.__k[i]=re(ie,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=e.__k[i]=re(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[i]=a,d=i+f,a.__=e,a.__b=e.__b+1,c=null,(l=a.__i=En(a,t,d,s))!=-1&&(s--,(c=t[l])&&(c.__u|=2)),c==null||c.__v==null?(l==-1&&(r>p?f--:r<p&&f++),typeof a.type!="function"&&(a.__u|=4)):l!=d&&(l==d-1?f--:l==d+1?f++:(l>d?f--:f++,a.__u|=4))):e.__k[i]=null;if(s)for(i=0;i<p;i++)(c=t[i])!=null&&(2&c.__u)==0&&(c.__e==o&&(o=W(c)),Je(c,c));return o}function We(e,n,t,o){var r,i;if(typeof e.type=="function"){for(r=e.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=e,n=We(r[i],n,t,o));return n}e.__e!=n&&(o&&(n&&e.type&&!n.parentNode&&(n=W(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function En(e,n,t,o){var r,i,a,c=e.key,d=e.type,l=n[t],p=l!=null&&(2&l.__u)==0;if(l===null&&c==null||p&&c==l.key&&d==l.type)return t;if(o>(p?1:0)){for(r=t-1,i=t+1;r>=0||i<n.length;)if((l=n[a=r>=0?r--:i++])!=null&&(2&l.__u)==0&&c==l.key&&d==l.type)return a}return-1}function Ge(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||kn.test(n)?t:t+"px"}function le(e,n,t,o,r){var i,a;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||Ge(e.style,n,"");if(t)for(n in t)o&&t[n]==o[n]||Ge(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")i=n!=(n=n.replace(Be,"$1")),a=n.toLowerCase(),n=a in e||n=="onFocusOut"||n=="onFocusIn"?a.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+i]=t,t?o?t.u=o.u:(t.u=pe,e.addEventListener(n,i?he:_e,i)):e.removeEventListener(n,i?he:_e,i);else{if(r=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function Ve(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n.t==null)n.t=pe++;else if(n.t<t.u)return;return t(v.event?v.event(n):n)}}}function me(e,n,t,o,r,i,a,c,d,l){var p,s,f,_,b,E,S,m,y,O,I,V,j,ue,q,z,Q,$=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(d=!!(32&t.__u),i=[c=n.__e=t.__e]),(p=v.__b)&&p(n);e:if(typeof $=="function")try{if(m=n.props,y="prototype"in $&&$.prototype.render,O=(p=$.contextType)&&o[p.__c],I=p?O?O.props.value:p.__:o,t.__c?S=(s=n.__c=t.__c).__=s.__E:(y?n.__c=s=new $(m,I):(n.__c=s=new se(m,I),s.constructor=$,s.render=Tn),O&&O.sub(s),s.state||(s.state={}),s.__n=o,f=s.__d=!0,s.__h=[],s._sb=[]),y&&s.__s==null&&(s.__s=s.state),y&&$.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=P({},s.__s)),P(s.__s,$.getDerivedStateFromProps(m,s.__s))),_=s.props,b=s.state,s.__v=n,f)y&&$.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),y&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(y&&$.getDerivedStateFromProps==null&&m!==_&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(m,I),n.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(m,s.__s,I)===!1){for(n.__v!=t.__v&&(s.props=m,s.state=s.__s,s.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(L){L&&(L.__=n)}),V=0;V<s._sb.length;V++)s.__h.push(s._sb[V]);s._sb=[],s.__h.length&&a.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(m,s.__s,I),y&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(_,b,E)})}if(s.context=I,s.props=m,s.__P=e,s.__e=!1,j=v.__r,ue=0,y){for(s.state=s.__s,s.__d=!1,j&&j(n),p=s.render(s.props,s.state,s.context),q=0;q<s._sb.length;q++)s.__h.push(s._sb[q]);s._sb=[]}else do s.__d=!1,j&&j(n),p=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++ue<25);s.state=s.__s,s.getChildContext!=null&&(o=P(P({},o),s.getChildContext())),y&&!f&&s.getSnapshotBeforeUpdate!=null&&(E=s.getSnapshotBeforeUpdate(_,b)),z=p,p!=null&&p.type===ie&&p.key==null&&(z=Xe(p.props.children)),c=je(e,oe(z)?z:[z],n,t,o,r,i,a,c,d,l),s.base=n.__e,n.__u&=-161,s.__h.length&&a.push(s),S&&(s.__E=s.__=null)}catch(L){if(n.__v=null,d||i!=null)if(L.then){for(n.__u|=d?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;i[i.indexOf(c)]=null,n.__e=c}else{for(Q=i.length;Q--;)be(i[Q]);ye(n)}else n.__e=t.__e,n.__k=t.__k,L.then||ye(n);v.__e(L,n,t)}else i==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):c=n.__e=Nn(t.__e,n,t,o,r,i,a,d,l);return(p=v.diffed)&&p(n),128&n.__u?void 0:c}function ye(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(ye)}function qe(e,n,t){for(var o=0;o<t.length;o++)ve(t[o],t[++o],t[++o]);v.__c&&v.__c(n,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(i){i.call(r)})}catch(i){v.__e(i,r.__v)}})}function Xe(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:oe(e)?e.map(Xe):P({},e)}function Nn(e,n,t,o,r,i,a,c,d){var l,p,s,f,_,b,E,S=t.props||J,m=n.props,y=n.type;if(y=="svg"?r="http://www.w3.org/2000/svg":y=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),i!=null){for(l=0;l<i.length;l++)if((_=i[l])&&"setAttribute"in _==!!y&&(y?_.localName==y:_.nodeType==3)){e=_,i[l]=null;break}}if(e==null){if(y==null)return document.createTextNode(m);e=document.createElementNS(r,y,m.is&&m),c&&(v.__m&&v.__m(n,i),c=!1),i=null}if(y==null)S===m||c&&e.data==m||(e.data=m);else{if(i=i&&te.call(e.childNodes),!c&&i!=null)for(S={},l=0;l<e.attributes.length;l++)S[(_=e.attributes[l]).name]=_.value;for(l in S)if(_=S[l],l!="children"){if(l=="dangerouslySetInnerHTML")s=_;else if(!(l in m)){if(l=="value"&&"defaultValue"in m||l=="checked"&&"defaultChecked"in m)continue;le(e,l,null,_,r)}}for(l in m)_=m[l],l=="children"?f=_:l=="dangerouslySetInnerHTML"?p=_:l=="value"?b=_:l=="checked"?E=_:c&&typeof _!="function"||S[l]===_||le(e,l,_,S[l],r);if(p)c||s&&(p.__html==s.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),n.__k=[];else if(s&&(e.innerHTML=""),je(n.type=="template"?e.content:e,oe(f)?f:[f],n,t,o,y=="foreignObject"?"http://www.w3.org/1999/xhtml":r,i,a,i?i[0]:t.__k&&W(t,0),c,d),i!=null)for(l=i.length;l--;)be(i[l]);c||(l="value",y=="progress"&&b==null?e.removeAttribute("value"):b!=null&&(b!==e[l]||y=="progress"&&!b||y=="option"&&b!=S[l])&&le(e,l,b,S[l],r),l="checked",E!=null&&E!=e[l]&&le(e,l,E,S[l],r))}return e}function ve(e,n,t){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&n==null||(e.__u=e(n))}else e.current=n}catch(r){v.__e(r,t)}}function Je(e,n,t){var o,r;if(v.unmount&&v.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||ve(o,null,n)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){v.__e(i,n)}o.base=o.__P=null}if(o=e.__k)for(r=0;r<o.length;r++)o[r]&&Je(o[r],n,t||typeof e.type!="function");t||be(e.__e),e.__c=e.__=e.__e=void 0}function Tn(e,n,t){return this.constructor(e,t)}function Cn(e,n,t){var o,r,i,a;n==document&&(n=document.documentElement),v.__&&v.__(e,n),r=(o=!1)?null:n.__k,i=[],a=[],me(n,e=n.__k=ze(ie,null,[e]),r||J,J,n.namespaceURI,r?null:n.firstChild?te.call(n.childNodes):null,i,r?r.__e:n.firstChild,o,a),qe(i,e,a)}te=De.slice,v={__e:function(e,n,t,o){for(var r,i,a;n=n.__;)if((r=n.__c)&&!r.__)try{if((i=r.constructor)&&i.getDerivedStateFromError!=null&&(r.setState(i.getDerivedStateFromError(e)),a=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(e,o||{}),a=r.__d),a)return r.__E=r}catch(c){e=c}throw e}},Le=0,se.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=P({},this.state),typeof e=="function"&&(e=e(P({},t),this.props)),e&&P(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),Fe(this))},se.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Fe(this))},se.prototype.render=ie,U=[],He=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Pe=function(e,n){return e.__v.__b-n.__v.__b},ae.__r=0,Be=/(PointerCapture)$|Capture$/i,pe=0,_e=Ve(!1),he=Ve(!0);var On=0;function g(e,n,t,o,r,i){n||(n={});var a,c,d=n;if("ref"in d)for(c in d={},n)c=="ref"?a=n[c]:d[c]=n[c];var l={type:e,props:d,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--On,__i:-1,__u:0,__source:r,__self:i};if(typeof e=="function"&&(a=e.defaultProps))for(c in a)d[c]===void 0&&(d[c]=a[c]);return v.vnode&&v.vnode(l),l}var K,w,xe,Ke,Y=0,Ye=[],k=v,Qe=k.__b,Ze=k.__r,en=k.diffed,nn=k.__c,tn=k.unmount,on=k.__;function we(e,n){k.__h&&k.__h(w,e,Y||n),Y=0;var t=w.__H||(w.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function D(e){return Y=1,rn(un,e)}function rn(e,n,t){var o=we(K++,2);if(o.t=e,!o.__c&&(o.__=[un(void 0,n),function(c){var d=o.__N?o.__N[0]:o.__[0],l=o.t(d,c);d!==l&&(o.__N=[l,o.__[1]],o.__c.setState({}))}],o.__c=w,!w.__f)){var r=function(c,d,l){if(!o.__c.__H)return!0;var p=o.__c.__H.__.filter(function(f){return!!f.__c});if(p.every(function(f){return!f.__N}))return!i||i.call(this,c,d,l);var s=o.__c.props!==c;return p.forEach(function(f){if(f.__N){var _=f.__[0];f.__=f.__N,f.__N=void 0,_!==f.__[0]&&(s=!0)}}),i&&i.call(this,c,d,l)||s};w.__f=!0;var i=w.shouldComponentUpdate,a=w.componentWillUpdate;w.componentWillUpdate=function(c,d,l){if(this.__e){var p=i;i=void 0,r(c,d,l),i=p}a&&a.call(this,c,d,l)},w.shouldComponentUpdate=r}return o.__N||o.__}function G(e,n){var t=we(K++,3);!k.__s&&cn(t.__H,n)&&(t.__=e,t.u=n,w.__H.__h.push(t))}function F(e){return Y=5,sn(function(){return{current:e}},[])}function sn(e,n){var t=we(K++,7);return cn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function an(e,n){return Y=8,sn(function(){return e},n)}function $n(){for(var e;e=Ye.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ce),e.__H.__h.forEach(ke),e.__H.__h=[]}catch(n){e.__H.__h=[],k.__e(n,e.__v)}}k.__b=function(e){w=null,Qe&&Qe(e)},k.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),on&&on(e,n)},k.__r=function(e){Ze&&Ze(e),K=0;var n=(w=e.__c).__H;n&&(xe===w?(n.__h=[],w.__h=[],n.__.forEach(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.forEach(ce),n.__h.forEach(ke),n.__h=[],K=0)),xe=w},k.diffed=function(e){en&&en(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(Ye.push(n)!==1&&Ke===k.requestAnimationFrame||((Ke=k.requestAnimationFrame)||Mn)($n)),n.__H.__.forEach(function(t){t.u&&(t.__H=t.u),t.u=void 0})),xe=w=null},k.__c=function(e,n){n.some(function(t){try{t.__h.forEach(ce),t.__h=t.__h.filter(function(o){return!o.__||ke(o)})}catch(o){n.some(function(r){r.__h&&(r.__h=[])}),n=[],k.__e(o,t.__v)}}),nn&&nn(e,n)},k.unmount=function(e){tn&&tn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.forEach(function(o){try{ce(o)}catch(r){n=r}}),t.__H=void 0,n&&k.__e(n,t.__v))};var ln=typeof requestAnimationFrame=="function";function Mn(e){var n,t=function(){clearTimeout(o),ln&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,35);ln&&(n=requestAnimationFrame(t))}function ce(e){var n=w,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),w=n}function ke(e){var n=w;e.__c=e.__(),w=n}function cn(e,n){return!e||e.length!==n.length||n.some(function(t,o){return t!==e[o]})}function un(e,n){return typeof n=="function"?n(e):n}const An={isOpen:!1,messages:[],isStreaming:!1,error:null};function gn(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function In(e,n){var t;switch(n.type){case"OPEN":return{...e,isOpen:!0,error:null};case"CLOSE":return{...e,isOpen:!1};case"LOAD_MESSAGES":return{...e,messages:n.messages};case"ADD_USER_MESSAGE":return{...e,error:null,messages:[...e.messages,{id:n.id,role:"user",content:n.content}]};case"START_STREAMING":return{...e,isStreaming:!0,error:null,messages:[...e.messages,{id:n.id,role:"assistant",content:"",isStreaming:!0}]};case"APPEND_TEXT":{const o=[...e.messages],r=o[o.length-1];return r&&r.role==="assistant"&&r.isStreaming&&(o[o.length-1]={...r,content:r.content+n.text}),{...e,messages:o}}case"ADD_TOOL_CALL":{const o=[...e.messages],r=o[o.length-1];if(r&&r.role==="assistant"){const i=[...r.toolCalls??[],n.toolCall];o[o.length-1]={...r,toolCalls:i}}return{...e,messages:o}}case"SET_TOOL_RESULT":{const o=[...e.messages],r=o[o.length-1];if(r&&r.role==="assistant"&&r.toolCalls){const i=r.toolCalls.map(a=>a.id===n.toolCallId?{...a,result:n.result,status:"done"}:a);o[o.length-1]={...r,toolCalls:i}}return{...e,messages:o}}case"FINISH_STREAMING":{const o=[...e.messages],r=o[o.length-1];return r&&r.role==="assistant"&&r.isStreaming&&(!r.content&&((t=r.toolCalls)!=null&&t.length)?o.pop():o[o.length-1]={...r,isStreaming:!1}),{...e,isStreaming:!1,messages:o}}case"SET_ERROR":{const o=[...e.messages],r=o[o.length-1];return r&&r.role==="assistant"&&r.isStreaming&&(o[o.length-1]={...r,isStreaming:!1}),{...e,isStreaming:!1,error:n.error,messages:o}}case"CLEAR_MESSAGES":return{...e,messages:[],error:null};default:return e}}function Ln(e){return new Promise((n,t)=>{const o=new FileReader;o.onload=()=>{const r=o.result;n(r.split(",")[1])},o.onerror=()=>t(new Error("Failed to read file")),o.readAsDataURL(e)})}async function Rn(e,n){const t=`${e}/api/products/${n}/config`;console.log("[Ourguide] fetchConfig HTTP GET",t);try{const o=await fetch(t,{headers:{"ngrok-skip-browser-warning":"true"}});if(console.log("[Ourguide] fetchConfig HTTP status:",o.status,o.statusText),!o.ok)return console.warn("[Ourguide] fetchConfig non-OK response, returning {}"),{};const r=await o.json();return console.log("[Ourguide] fetchConfig raw JSON:",JSON.stringify(r,null,2)),r}catch(o){return console.error("[Ourguide] fetchConfig threw:",o),{}}}async function dn(e,n,t,o,r,i){const a={productId:n,messages:t,endUserSessionId:o};r&&(a.conversationId=r),i&&i.length>0&&(a.attachments=i);const c=await fetch(`${e}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify(a)});if(!c.ok){const d=await c.json().catch(()=>({error:"Request failed"}));throw new Error(d.error||`HTTP ${c.status}`)}if(!c.body)throw new Error("No response stream available");return{stream:c.body,conversationId:c.headers.get("X-Conversation-Id")}}async function Hn(e,n,t,o,r){const i=await fetch(`${e}/api/widget/identify`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify({productId:n,endUserSessionId:t,token:o,name:r})}),a=await i.json().catch(()=>({}));if(!i.ok)throw new Error(a.error||`HTTP ${i.status}`);return a}async function Pn(e,n,t){const o=await fetch(`${e}/api/widget/reset-user`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify({productId:n,endUserSessionId:t})}),r=await o.json().catch(()=>({}));if(!o.ok)throw new Error(r.error||`HTTP ${o.status}`);return r}const Se={};function fn(e){Object.assign(Se,e)}function Bn(e){return Se[e]}function Dn(e){return e in Se}async function pn(e,n){const t=e.getReader(),o=new TextDecoder;let r="";try{for(;;){const{done:i,value:a}=await t.read();if(i)break;r+=o.decode(a,{stream:!0});const c=r.split(`

`);r=c.pop()??"";for(const d of c)_n(d.trim(),n)}r.trim()&&_n(r.trim(),n),n.onFinish()}catch(i){const a=i instanceof Error?i.message:"Stream read failed";n.onError(a)}finally{t.releaseLock()}}function _n(e,n){const t=e.split(`
`);for(const o of t){if(!o.startsWith("data: "))continue;const r=o.slice(6);if(r==="[DONE]")return;try{const i=JSON.parse(r);switch(i.type){case"text-delta":i.delta&&n.onTextDelta(i.delta);break;case"tool-input-available":i.toolCallId&&i.toolName&&n.onToolCall(i.toolCallId,i.toolName,i.input??{},i.providerMetadata);break;case"tool-output-available":i.toolCallId&&n.onToolResult(i.toolCallId,i.output);break;case"tool-call":i.toolCallId&&i.toolName&&n.onToolCall(i.toolCallId,i.toolName,i.input??{});break;case"tool-result":i.toolCallId&&n.onToolResult(i.toolCallId,i.output);break;case"error":n.onError(i.errorText??i.reason??"Unknown error");break;case"abort":n.onError(i.reason??"Response aborted");break;default:break}}catch{}}}function zn(e,n){if(!n)return e;let t=e;for(const[o,r]of Object.entries(n))t=t.replace(`:${o}`,encodeURIComponent(r));return t}function Un(e){var o;const n=e.replace(/\/$/,"")||"/",t=document.querySelectorAll("a[href]");for(const r of t){const i=r;if((((o=i.pathname)==null?void 0:o.replace(/\/$/,""))||"/")===n)return i.click(),console.log(`[Ourguide-B2B] Navigated via anchor click: ${e}`),!0}return!1}function Fn(e){var r,i;const n=window,t=n.next;if((r=t==null?void 0:t.router)!=null&&r.push)return t.router.push(e),console.log(`[Ourguide-B2B] Navigated via Next.js router: ${e}`),!0;if(n.__NUXT__){const a=n.$nuxt;if((i=a==null?void 0:a.$router)!=null&&i.push)return a.$router.push(e),console.log(`[Ourguide-B2B] Navigated via Vue/Nuxt router: ${e}`),!0}return!1}function jn(e){try{return window.history.pushState({},"",e),window.dispatchEvent(new PopStateEvent("popstate",{state:{}})),console.log(`[Ourguide-B2B] Navigated via pushState: ${e}`),!0}catch{return!1}}async function Wn(e,n){const t=zn(e,n);return Un(t)||Fn(t)||jn(t)||(console.log(`[Ourguide-B2B] Navigated via hard navigation: ${t}`),window.location.href=t),!0}const Gn="og2-chat-",Vn="og2-enduser-session-",Ee="og2-conv-";function Ne(e){return`${Gn}${e}`}function hn(e){return`${Vn}${e}`}function bn(){var n,t;const e=(t=(n=globalThis.crypto)==null?void 0:n.randomUUID)==null?void 0:t.call(n);return e||`${Date.now()}-${Math.random().toString(16).slice(2)}`}function Te(e){const n=hn(e);try{const t=localStorage.getItem(n);if(t&&t.trim())return t;const o=`sess_${bn()}`;return localStorage.setItem(n,o),o}catch{return`sess_${bn()}`}}function qn(e){try{localStorage.removeItem(hn(e))}catch{}}function Xn(e,n){try{const t=n.map(({isStreaming:o,...r})=>r);sessionStorage.setItem(Ne(e),JSON.stringify(t))}catch{}}function Jn(e){try{const n=sessionStorage.getItem(Ne(e));return n?JSON.parse(n):[]}catch{return[]}}function Ce(e){try{sessionStorage.removeItem(Ne(e)),sessionStorage.removeItem(`${Ee}${e}`)}catch{}}function Kn(e,n){try{sessionStorage.setItem(`${Ee}${e}`,n)}catch{}}function Yn(e){try{return sessionStorage.getItem(`${Ee}${e}`)}catch{return null}}const Qn=10,Zn=30,Oe=500,et="og2-widget-root",nt=new Set(["SCRIPT","STYLE","NOSCRIPT","SVG","NAV","HEADER","FOOTER"]),tt="a[href], button, input, select, textarea";function $e(e){if(!(e instanceof HTMLElement)||e.hidden||e.getAttribute("aria-hidden")==="true")return!1;const n=getComputedStyle(e);return n.display!=="none"&&n.visibility!=="hidden"}function Me(e){return!!e.closest(`#${et}`)}function ot(e){var t,o;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){if(e.id){const r=document.querySelector(`label[for="${e.id}"]`);if((t=r==null?void 0:r.textContent)!=null&&t.trim())return r.textContent.trim()}return e.getAttribute("aria-label")||e.placeholder||e.getAttribute("name")||""}const n=(o=e.innerText)==null?void 0:o.trim();return n||e.getAttribute("aria-label")||e.getAttribute("title")||""}function mn(e,n){return e.length<=n?e:e.slice(0,n-3)+"..."}function rt(){var p;const e=window.location.pathname+window.location.search,n=document.title||"",t=document.querySelectorAll("h1, h2, h3"),o=[];for(const s of t){if(o.length>=Qn)break;if(Me(s)||!$e(s))continue;const f=(p=s.innerText)==null?void 0:p.trim();f&&!o.includes(f)&&o.push(f)}const r=document.querySelectorAll(tt),i=[],a=new Set;for(const s of r){if(i.length>=Zn)break;if(Me(s)||!$e(s))continue;const f=ot(s);if(!f)continue;const _=`${s.tagName}:${f}`;if(a.has(_))continue;a.add(_);const b={tag:s.tagName.toLowerCase(),text:mn(f,80)};if(s instanceof HTMLInputElement&&(b.type=s.type),s instanceof HTMLAnchorElement&&s.href)try{const E=new URL(s.href);b.href=E.pathname+E.search}catch{b.href=s.getAttribute("href")||void 0}i.push(b)}const c=document.querySelector("main")||document.body;let d="";function l(s){var _;if(d.length>=Oe)return;if(s.nodeType===Node.TEXT_NODE){const b=(_=s.textContent)==null?void 0:_.trim();b&&(d+=(d?" ":"")+b);return}if(s.nodeType!==Node.ELEMENT_NODE)return;const f=s;if(!nt.has(f.tagName)&&!Me(f)&&$e(f)){for(const b of f.childNodes)if(l(b),d.length>=Oe)return}}return l(c),d=mn(d.replace(/\s+/g," ").trim(),Oe),{url:e,title:n,headings:o,interactiveElements:i,visibleText:d}}fn({capture_screen:async()=>{console.log("[Ourguide] capture_screen tool invoked — capturing DOM snapshot");const e=rt();return console.log("[Ourguide] capture_screen result",{url:e.url,title:e.title}),e}});const Ae={none:"none",soft:"0 2px 8px rgba(0,0,0,0.08)",medium:"0 4px 16px rgba(0,0,0,0.12)",strong:"0 8px 32px rgba(0,0,0,0.18)","extra-strong":"0 16px 48px rgba(0,0,0,0.28)"};function it(e,n){if(console.log("[Ourguide] applyAppearance called",{el:!!e,appearance:n}),!e){console.warn("[Ourguide] applyAppearance skipped — el is null");return}if(!n){console.warn("[Ourguide] applyAppearance skipped — appearance is null/undefined");return}const t=(c,d)=>{d!=null&&d!==""?(console.log(`[Ourguide] setProperty ${c} =`,String(d)),e.style.setProperty(c,String(d))):console.log(`[Ourguide] skipping ${c} — value is`,d)},{colors:o,typography:r,dimensions:i,shadow:a}=n;o&&(t("--og2-bg",o.background),t("--og2-border",o.border),t("--og2-text",o.text),t("--og2-messages-bg",o.messagesBackground),t("--og2-agent-bubble",o.agentBubble),t("--og2-agent-bubble-text",o.agentBubbleText),t("--og2-user-bubble",o.userBubble),t("--og2-user-bubble-text",o.userBubbleText),t("--og2-user-bubble-border",o.userBubbleBorder)),r&&(t("--og2-font",r.fontFamily),t("--og2-font-weight",r.fontWeight),t("--og2-line-height",r.lineHeight),r.fontSize&&t("--og2-font-size",`${r.fontSize}px`),r.headerSize&&t("--og2-header-size",`${r.headerSize}px`),typeof r.letterSpacing=="number"&&t("--og2-letter-spacing",`${r.letterSpacing}px`)),i&&(i.width&&t("--og2-width",`${i.width}px`),i.maxHeight&&t("--og2-height",`${i.maxHeight}px`),i.borderRadius!==void 0&&t("--og2-radius",`${i.borderRadius}px`),i.padding!==void 0&&t("--og2-padding",`${i.padding}px`)),a&&(console.log("[Ourguide] shadow:",a,"→",Ae[a]??"(not in SHADOW_MAP, skipped)"),Ae[a]&&t("--og2-shadow",Ae[a])),console.log("[Ourguide] applyAppearance done. container inline styles:",e.style.cssText)}function st(e,n){if(console.log("[Ourguide] applyBubble called",{el:e,bubble:n}),!e||!n){console.warn("[Ourguide] applyBubble skipped — el or bubble is falsy",{el:e,bubble:n});return}const t=(o,r)=>{r!=null&&r!==""&&e.style.setProperty(o,String(r))};n.background?t("--og2-bubble-bg",n.background):console.log("[Ourguide] bubble.background falsy — skipping --og2-bubble-bg"),n.border?t("--og2-bubble-border",n.border):console.log("[Ourguide] bubble.border falsy — skipping --og2-bubble-border"),n.icon?t("--og2-bubble-icon",n.icon):console.log("[Ourguide] bubble.icon falsy — skipping --og2-bubble-icon"),n.buttonSize?t("--og2-bubble-size",`${n.buttonSize}px`):console.log("[Ourguide] bubble.buttonSize falsy — skipping --og2-bubble-size"),n.iconSize?t("--og2-bubble-icon-size",`${n.iconSize}px`):console.log("[Ourguide] bubble.iconSize falsy — skipping --og2-bubble-icon-size"),n.right!==void 0?t("--og2-bubble-right",`${n.right}px`):console.log("[Ourguide] bubble.right undefined — skipping --og2-bubble-right"),n.bottom!==void 0?t("--og2-bubble-bottom",`${n.bottom}px`):console.log("[Ourguide] bubble.bottom undefined — skipping --og2-bubble-bottom"),console.log("[Ourguide] applyBubble done. container inline styles:",e.style.cssText)}function at({productId:e,apiUrl:n}){const[t,o]=rn(In,An),r=F(null),i=F(null),a=F(null),c=F(null),d=F(null),l=F(null),[p,s]=D(""),[f,_]=D([]),[b,E]=D([]),[S,m]=D(!1),[y,O]=D(!1),I=F(null),[V,j]=D("Assistant"),[ue,q]=D("Hi! What can I do for you today?"),[z,Q]=D([]);G(()=>{console.log("[Ourguide] fetchConfig called",{apiUrl:n,productId:e}),Rn(n,e).then(u=>{var h,x,M,B;console.log("[Ourguide] ── full config received ──",JSON.stringify(u,null,2)),console.log("[Ourguide] config.appearance:",u.appearance),console.log("[Ourguide] config.bubble:",u.bubble),console.log("[Ourguide] config.identity:",u.identity),console.log("[Ourguide] config.suggestions:",u.suggestions),console.log("[Ourguide] containerRef.current:",c.current),it(c.current,u.appearance),st(c.current,u.bubble),(h=u.identity)!=null&&h.name?(console.log("[Ourguide] setting agentName →",u.identity.name),j(u.identity.name)):console.log("[Ourguide] config.identity?.name is falsy, keeping default. identity =",u.identity),(x=u.identity)!=null&&x.welcomeMessage?(console.log("[Ourguide] setting welcomeMsg →",u.identity.welcomeMessage),q(u.identity.welcomeMessage)):console.log("[Ourguide] config.identity?.welcomeMessage is falsy, keeping default."),(M=u.suggestions)!=null&&M.length?(console.log("[Ourguide] setting suggestions →",u.suggestions),Q(u.suggestions)):console.log("[Ourguide] no suggestions in config (length=",(B=u.suggestions)==null?void 0:B.length,")")}).catch(u=>{console.error("[Ourguide] fetchConfig FAILED:",u)})},[n,e]);const $=an(()=>{Ce(e),a.current=null,o({type:"FINISH_STREAMING"}),o({type:"CLEAR_MESSAGES"})},[e]);G(()=>{a.current=Yn(e);const u=Jn(e);u.length>0&&o({type:"LOAD_MESSAGES",messages:u})},[e]),G(()=>{const u=h=>{const x=h.detail;x!=null&&x.productId&&x.productId!==e||$()};return window.addEventListener("og2:resetUser",u),()=>{window.removeEventListener("og2:resetUser",u)}},[e,$]),G(()=>{!t.isStreaming&&t.messages.length>0&&Xn(e,t.messages)},[t.messages,t.isStreaming,e]),G(()=>{t.isOpen&&!t.isStreaming&&setTimeout(()=>{var u;return(u=r.current)==null?void 0:u.focus()},50)},[t.isOpen,t.isStreaming]),G(()=>{var u;(u=i.current)==null||u.scrollIntoView({behavior:"smooth"})},[t.messages]);const L=an(async u=>{const h=u.trim(),x=[...f];if(!h&&x.length===0||t.isStreaming)return;s(""),_([]),r.current&&(r.current.style.height="auto");const M=x.length>0?x.map(N=>`[${N.name}]`).join(" "):"",B=[h,M].filter(Boolean).join(" "),ge=gn();o({type:"ADD_USER_MESSAGE",id:ge,content:B});let Z=[];if(x.length>0)try{Z=await Promise.all(x.map(async N=>({name:N.name,type:N.type,data:await Ln(N)})))}catch{o({type:"SET_ERROR",error:"Failed to read attached files"});return}const ee=[...t.messages.map(N=>({role:N.role,content:N.content})),{role:"user",content:h||"Please review the attached file(s)."}],ne=gn();o({type:"START_STREAMING",id:ne});const X=new Map,Ie=new Map,yn=N=>({onTextDelta:T=>{o({type:"APPEND_TEXT",text:T})},onToolCall:(T,R,H,A)=>{const de={id:T,name:R,args:H,status:"calling",providerMetadata:A};X.set(T,de),o({type:"ADD_TOOL_CALL",toolCall:de}),N&&Dn(R)&&Ie.set(T,{name:R,args:H,providerMetadata:A})},onToolResult:(T,R)=>{o({type:"SET_TOOL_RESULT",toolCallId:T,result:R});const H=X.get(T);if((H==null?void 0:H.name)==="navigate_to_page"){const A=R;A.route&&(A.confidence??0)>=.5&&Wn(A.route,A.params)}},onError:T=>{o({type:"SET_ERROR",error:T})}});try{const N=Te(e),{stream:T,conversationId:R}=await dn(n,e,ee,N,a.current||void 0,Z);R&&!a.current&&(a.current=R,Kn(e,R));let H=!1;if(await pn(T,{...yn(!0),onError:C=>{H=!0,o({type:"SET_ERROR",error:C})},onFinish:()=>{}}),H||Ie.size===0){H||o({type:"FINISH_STREAMING"});return}const A=[];for(const[C,{name:vn,args:xn,providerMetadata:ht}]of Ie){const bt=Bn(vn);let fe;try{fe=await bt(xn)}catch(wn){fe={status:"error",error:wn instanceof Error?wn.message:"Handler failed"}}o({type:"SET_TOOL_RESULT",toolCallId:C,result:fe}),A.push({toolCallId:C,toolName:vn,args:xn,result:fe,providerMetadata:ht})}const de=[...ee,{role:"assistant",content:A.map(C=>({type:"tool-call",toolCallId:C.toolCallId,toolName:C.toolName,input:C.args,...C.providerMetadata?{providerOptions:C.providerMetadata}:{}}))},{role:"tool",content:A.map(C=>({type:"tool-result",toolCallId:C.toolCallId,toolName:C.toolName,output:{type:"json",value:C.result}}))}],{stream:_t}=await dn(n,e,de,void 0,a.current||void 0);await pn(_t,{...yn(!1),onFinish:()=>{o({type:"FINISH_STREAMING"})}})}catch(N){const T=N instanceof Error?N.message:"Something went wrong";o({type:"FINISH_STREAMING"}),o({type:"SET_ERROR",error:T})}},[t.messages,t.isStreaming,n,e,f]);function gt(u){u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),L(p))}function dt(){if(t.messages.length>0){const u=t.messages.find(M=>M.role==="user"),h=u?u.content.slice(0,30):"Conversation",x=t.messages[t.messages.length-1].content.slice(0,50);E(M=>[{id:Date.now(),title:h,preview:x,messages:[...t.messages]},...M])}Ce(e),a.current=null,o({type:"CLEAR_MESSAGES"}),m(!1)}function ft(u){o({type:"LOAD_MESSAGES",messages:u.messages}),E(h=>h.filter(x=>x.id!==u.id)),m(!1)}function pt(){var M;const u=window.SpeechRecognition||window.webkitSpeechRecognition;if(!u)return;if(y){(M=I.current)==null||M.stop(),O(!1);return}const h=new u;h.lang="en-US",h.interimResults=!0,h.continuous=!0;const x=p.trimEnd();h.onresult=B=>{let ge="",Z="";for(let ne=0;ne<B.results.length;ne++){const X=B.results[ne];X.isFinal?ge+=X[0].transcript:Z+=X[0].transcript}const ee=(ge+Z).trim();s(x?`${x} ${ee}`:ee)},h.onend=()=>O(!1),h.onerror=()=>O(!1),I.current=h,h.start(),O(!0)}return g("div",{className:"og2-container",ref:c,children:[t.isOpen&&g("div",{className:"og2-panel",children:[g("div",{className:"og2-panel-header",children:[g("span",{className:"og2-panel-title",children:V}),g("div",{className:"og2-header-actions",children:[g("button",{className:"og2-action-btn",onClick:dt,"aria-label":"New conversation",title:"New conversation",children:g("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:g("path",{d:"M12 5v14M5 12h14"})})}),g("button",{className:"og2-action-btn",onClick:()=>m(u=>!u),"aria-label":"Recent conversations",title:"Recent conversations",children:g("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[g("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),g("path",{d:"M3 3v5h5"}),g("path",{d:"M12 7v5l4 2"})]})}),g("button",{className:"og2-close-btn",onClick:()=>o({type:"CLOSE"}),"aria-label":"Close",children:g("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:g("path",{d:"M4 4L12 12M12 4L4 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),S&&g("div",{className:"og2-history-panel",children:[g("div",{className:"og2-history-header",children:[g("span",{className:"og2-history-title",children:"Recent Conversations"}),g("button",{className:"og2-action-btn",onClick:()=>m(!1),"aria-label":"Close history",children:g("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",children:g("path",{d:"M4 4L12 12M12 4L4 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),g("div",{className:"og2-history-list",children:b.length===0?g("p",{className:"og2-history-empty",children:"No conversations yet"}):b.map(u=>g("button",{className:"og2-history-item",onClick:()=>ft(u),children:[g("span",{className:"og2-history-item-title",children:u.title}),g("span",{className:"og2-history-item-preview",children:u.preview})]},u.id))})]}),g("div",{className:"og2-messages",children:g("div",{className:"og2-messages-inner",children:[g("div",{className:"og2-message og2-message-assistant",children:g("div",{className:"og2-bubble",children:ue})}),z.length>0&&t.messages.length===0&&g("div",{className:"og2-suggestions",children:z.map((u,h)=>g("button",{className:"og2-suggestion-chip",onClick:()=>L(u.message||u.buttonLabel),children:u.buttonLabel},h))}),t.messages.map(u=>{var h;return u.isStreaming&&!u.content&&!((h=u.toolCalls)!=null&&h.length)?g("div",{className:"og2-message og2-message-assistant",children:g("span",{className:"og2-shimmer-text",children:"Thinking"})},u.id):g("div",{className:`og2-message og2-message-${u.role}`,children:g("div",{className:"og2-bubble",children:[u.content,u.isStreaming&&g("span",{className:"og2-cursor"}),lt(u.toolCalls,u.isStreaming&&!u.content)]})},u.id)}),t.error&&g("div",{className:"og2-message og2-message-error",children:g("div",{className:"og2-bubble",children:t.error})}),g("div",{ref:i})]})}),g("div",{className:"og2-footer",children:[g("div",{className:"og2-powered-by",children:[g("svg",{className:"og2-powered-by-logo",width:"20",height:"20",viewBox:"0 0 40 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[g("circle",{cx:"20",cy:"20",r:"9",stroke:"#38bdf8",strokeWidth:"2.2",fill:"none"}),g("circle",{cx:"20",cy:"20",r:"11",stroke:"#38bdf8",strokeWidth:"0.6",fill:"none",opacity:"0.25"})]}),g("p",{className:"og2-powered-by-text",children:"Powered by Ourguide"})]}),g("div",{className:"og2-input-area",children:[f.length>0&&g("div",{className:"og2-file-chips",children:f.map((u,h)=>g("span",{className:"og2-file-chip",children:[g("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[g("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),g("polyline",{points:"13 2 13 9 20 9"})]}),u.name.length>18?`${u.name.slice(0,16)}…`:u.name,g("button",{className:"og2-file-chip-remove",onClick:()=>_(x=>x.filter((M,B)=>B!==h)),"aria-label":`Remove ${u.name}`,children:"×"})]},h))}),g("textarea",{ref:r,className:"og2-input",rows:1,value:p,onInput:u=>{s(u.target.value),u.target.style.height="auto",u.target.style.height=`${u.target.scrollHeight}px`},onKeyDown:gt,placeholder:"Message..."}),g("div",{className:"og2-input-toolbar",children:[g("div",{className:"og2-input-toolbar-left",children:[g("button",{className:"og2-upload-btn",onClick:()=>{var u;return(u=l.current)==null?void 0:u.click()},"aria-label":"Attach file",title:"Attach file",children:g("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:g("path",{d:"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.42 16.41a2 2 0 0 1-2.83-2.83l8.49-8.48"})})}),g("input",{ref:l,type:"file",multiple:!0,style:{display:"none"},onChange:u=>{const h=Array.from(u.target.files??[]);h.length>0&&_(x=>[...x,...h]),u.target.value=""}}),g("button",{className:`og2-mic-btn${y?" og2-mic-active":""}`,onClick:pt,"aria-label":"Voice input",title:"Voice input",children:g("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[g("rect",{x:"9",y:"2",width:"6",height:"11",rx:"3"}),g("path",{d:"M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8"})]})})]}),g("button",{className:`og2-send-btn${p.trim()||f.length>0?" og2-send-active":""}`,onClick:()=>L(p),children:g("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:g("path",{d:"M12 19V5M5 12l7-7 7 7"})})})]})]})]})]}),g("button",{ref:d,className:"og2-trigger",onClick:()=>o(t.isOpen?{type:"CLOSE"}:{type:"OPEN"}),"aria-label":t.isOpen?"Close assistant":"Open assistant",children:t.isOpen?g("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:g("path",{d:"M6 6L18 18M18 6L6 18"})}):g("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:g("path",{d:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"})})})]})}function lt(e,n){return!e||e.length===0?null:g("div",{className:"og2-tool-calls",children:e.map(t=>{const o=n&&t.name==="capture_screen"&&t.status==="done"?"calling":t.status;return g("div",{className:"og2-tool-indicator",children:[o==="calling"&&g("span",{className:"og2-spinner og2-spinner-sm"}),o==="done"&&g("svg",{className:"og2-tool-check",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:g("path",{d:"M20 6L9 17L4 12"})}),g("span",{className:"og2-tool-label",children:ct(t,n)})]},t.id)})})}function ct(e,n){if(e.name==="navigate_to_page"){if(e.status==="calling")return"Finding the right page...";const t=e.result;return t!=null&&t.route?`Navigated to ${t.route}`:"No matching page found"}return e.name==="capture_screen"?e.status==="calling"||n?"Looking at your screen...":"Screen captured":e.name}const ut=`/* Ourguide-B2B Widget - All classes prefixed with og2- */

.og2-container {
  position: fixed;
  z-index: 2147483647;
  font-family: var(--og2-font, 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  font-size: var(--og2-font-size, 14px);
  font-weight: var(--og2-font-weight, 400);
  line-height: var(--og2-line-height, 1.5);
  letter-spacing: var(--og2-letter-spacing, 0px);
  color: var(--og2-text, #18181b);
  bottom: var(--og2-bubble-bottom, 16px);
  right: var(--og2-bubble-right, 16px);
}

/* ── Floating trigger button ── */
.og2-trigger {
  width: var(--og2-bubble-size, 48px);
  height: var(--og2-bubble-size, 48px);
  border-radius: 50%;
  background: var(--og2-bubble-bg, var(--og2-agent-bubble, #18181b));
  color: var(--og2-bubble-icon, var(--og2-agent-bubble-text, #ffffff));
  border: 1px solid var(--og2-bubble-border, transparent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.og2-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.og2-trigger svg {
  width: var(--og2-bubble-icon-size, 20px);
  height: var(--og2-bubble-icon-size, 20px);
}

/* ── Chat panel ── */
.og2-panel {
  position: absolute;
  bottom: 64px;
  right: 0;
  width: var(--og2-width, 400px);
  height: var(--og2-height, 600px);
  background: var(--og2-bg, #ffffff);
  border-radius: var(--og2-radius, 24px);
  box-shadow: var(--og2-shadow, 0 4px 16px rgba(0, 0, 0, 0.12));
  border: 1px solid var(--og2-border, #e4e4e7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.og2-panel-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--og2-border, #e4e4e7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: var(--og2-bg, #ffffff);
}

.og2-panel-title {
  font-size: var(--og2-header-size, 16px);
  font-weight: 600;
  color: var(--og2-text, #18181b);
}

.og2-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.og2-action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--og2-text, #000000);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: opacity 0.15s ease;
}

.og2-action-btn:hover {
  opacity: 0.7;
}

.og2-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--og2-text, #000000);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: opacity 0.15s ease;
}

.og2-close-btn:hover {
  opacity: 0.7;
}

/* ── History panel ── */
.og2-history-panel {
  margin: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--og2-border, #e4e4e7);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.10);
  background: var(--og2-bg, #ffffff);
  max-height: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.og2-history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--og2-border, #e4e4e7);
  flex-shrink: 0;
}

.og2-history-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--og2-text, #18181b);
}

.og2-history-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.og2-history-empty {
  text-align: center;
  font-size: 12px;
  color: #a1a1aa;
  padding: 20px 12px;
  margin: 0;
}

.og2-history-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid var(--og2-border, #e4e4e7);
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.og2-history-item:last-child {
  border-bottom: none;
}

.og2-history-item:hover {
  opacity: 0.7;
}

.og2-history-item-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--og2-text, #18181b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.og2-history-item-preview {
  font-size: 11px;
  color: #a1a1aa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Messages outer wrapper ── */
.og2-messages {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--og2-bg, #ffffff);
}

/* ── Messages inner scrollable rounded container ── */
.og2-messages-inner {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  margin: 0 16px;
  border-radius: 16px;
  background: var(--og2-messages-bg, #ffffff);
  scroll-behavior: smooth;
  box-sizing: border-box;
}

/* ── Message rows ── */
.og2-message {
  font-size: var(--og2-font-size, 14px);
  display: flex;
  align-items: flex-end;
}

.og2-message-assistant {
  justify-content: flex-start;
}

.og2-message-user {
  justify-content: flex-end;
  align-items: flex-end;
}

/* ── Agent bubble: light bg, black text ── */
.og2-message-assistant .og2-bubble {
  display: inline-block;
  background: var(--og2-agent-bubble, #f4f4f5);
  color: var(--og2-agent-bubble-text, #18181b);
  padding: 10px 16px;
  border-radius: 24px;
  max-width: 88%;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ── User bubble: MongoDB dark green bg, white text ── */
.og2-message-user .og2-bubble {
  display: inline-block;
  background: var(--og2-user-bubble, #1e3a5f);
  color: var(--og2-user-bubble-text, #ffffff);
  border: 1px solid var(--og2-user-bubble-border, #1e3a5f);
  padding: 10px 16px;
  border-radius: 24px;
  max-width: 88%;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

.og2-message-error {
  justify-content: flex-start;
}

.og2-message-error .og2-bubble {
  display: inline-block;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  padding: 10px 16px;
  border-radius: 24px;
  max-width: 80%;
  font-size: 12px;
}

/* ── Shimmer "Thinking" text ── */
.og2-shimmer-text {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 0;
  background: linear-gradient(
    90deg,
    #71717a 0%,
    #71717a 40%,
    #d4d4d8 50%,
    #71717a 60%,
    #71717a 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: og2-shimmer 1.5s ease-in-out infinite;
}

@keyframes og2-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Streaming cursor ── */
.og2-cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: var(--og2-agent-bubble-text, #ffffff);
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: og2-blink 0.8s step-end infinite;
}

@keyframes og2-blink {
  50% { opacity: 0; }
}

/* ── Tool call indicators ── */
.og2-tool-calls {
  margin-top: 6px;
}

.og2-tool-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
  font-size: 11px;
  color: #a1a1aa;
}

.og2-tool-check {
  color: #16a34a;
  flex-shrink: 0;
}

.og2-tool-label {
  line-height: 1.3;
}

/* ── Footer ── */
.og2-footer {
  padding: 16px;
  background: var(--og2-bg, #ffffff);
  flex-shrink: 0;
}

/* ── Powered by ── */
.og2-powered-by {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
}

.og2-powered-by-logo {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.og2-powered-by-text {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-align: center;
}

/* ── Input wrapper: pill with border, two-row layout ── */
.og2-input-area {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 16px;
  padding: 10px 8px 8px 14px;
  border: 1px solid var(--og2-border, #e4e4e7);
  background: var(--og2-bg, #ffffff);
}

/* ── Bottom toolbar: icons left, send right ── */
.og2-input-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.og2-input-toolbar-left {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: -6px;
}

/* ── Grows to fill; stacks file chips above textarea ── */
.og2-input-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ── File chips row ── */
.og2-file-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-top: 4px;
}

.og2-file-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--og2-text, #18181b);
  background: var(--og2-messages-bg, #f4f4f5);
  border: 1px solid var(--og2-border, #e4e4e7);
  border-radius: 6px;
  padding: 2px 6px 2px 5px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.og2-file-chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #a1a1aa;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  margin-left: 2px;
  flex-shrink: 0;
  transition: color 0.15s ease;
}

.og2-file-chip-remove:hover {
  color: #ef4444;
}

/* ── Textarea ── */
.og2-input {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: var(--og2-font-size, 14px);
  font-family: var(--og2-font, inherit);
  font-weight: var(--og2-font-weight, 400);
  color: var(--og2-text, #18181b);
  background: transparent;
  max-height: 120px;
  overflow-y: auto;
  line-height: var(--og2-line-height, 1.5);
  padding: 0;
  box-sizing: border-box;
}

.og2-input::placeholder {
  color: #a1a1aa;
}

/* ── Icon-only action buttons (mic, upload) ── */
.og2-mic-btn,
.og2-upload-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: none;
  color: #52525b;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  transition: color 0.15s ease;
}

.og2-mic-btn:hover,
.og2-upload-btn:hover {
  color: var(--og2-text, #18181b);
}

.og2-mic-btn.og2-mic-active {
  color: #ef4444;
}

/* ── Send button: gray when empty, blue when has text ── */
.og2-send-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  background: #d1d5db;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.og2-send-btn:hover {
  transform: scale(1.06);
}

.og2-send-btn.og2-send-active {
  background: #2563eb;
  color: #ffffff;
}

/* ── Spinner ── */
.og2-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px 8px;
}

.og2-suggestion-chip {
  background: var(--og2-bg, #ffffff);
  border: 1px solid var(--og2-border, #e4e4e7);
  color: var(--og2-text, #18181b);
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.og2-suggestion-chip:hover {
  background: var(--og2-agent-bubble, #f4f4f5);
}

.og2-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--og2-border, #e4e4e7);
  border-top-color: var(--og2-agent-bubble, #18181b);
  border-radius: 50%;
  animation: og2-spin 0.6s linear infinite;
  vertical-align: middle;
  flex-shrink: 0;
}

.og2-spinner-sm {
  width: 12px;
  height: 12px;
  border-width: 1.5px;
}

.og2-send-btn .og2-spinner-sm {
  border-color: rgba(255, 255, 255, 0.3);
  border-top-color: white;
}

@keyframes og2-spin {
  to { transform: rotate(360deg); }
}
`;(function(){const e=document.currentScript??document.querySelector('script[data-product-id][src*="ourguide-b2b-widget"]');if(!e){console.error("[Ourguide-B2B] Could not find script element");return}const n=e.dataset.productId||"",t=e.dataset.apiUrl??"http://localhost:3000";if(!n){console.error("[Ourguide-B2B] data-product-id is required");return}async function o(l,p){try{if(l==="registerTools"){p&&typeof p=="object"&&fn(p);return}if(l==="identify"){const s=p??{};if(!s.token||typeof s.token!="string"||!s.token.trim()){console.warn("[Ourguide-B2B] identify: token is required");return}const f=Te(n);await Hn(t,n,f,s.token,s.name);return}if(l==="resetUser"){const s=Te(n);await Pn(t,n,s),qn(n),Ce(n),window.dispatchEvent(new CustomEvent("og2:resetUser",{detail:{productId:n}}));return}}catch(s){const f=s instanceof Error?s.message:"Unknown error";console.warn(`[Ourguide-B2B] ${l} failed: ${f}`)}}const r=window,i=Array.isArray(r.ourguide)?r.ourguide:[];r.ourguide=(l,p)=>{o(l,p)};for(const l of i)Array.isArray(l)&&(l[0]==="identify"||l[0]==="resetUser"||l[0]==="registerTools")&&o(l[0],l[1]);const a=document.createElement("link");a.rel="stylesheet",a.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",document.head.appendChild(a);const c=document.createElement("style");c.textContent=ut,document.head.appendChild(c);const d=document.createElement("div");d.id="og2-widget-root",document.body.appendChild(d),Cn(ze(at,{productId:n,apiUrl:t}),d)})()})();
