(function(){"use strict";var R,m,ie,T,se,ae,le,_e,q,V,J,A={},ce=[],De=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,U=Array.isArray;function C(e,n){for(var t in n)e[t]=n[t];return e}function K(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function ue(e,n,t){var o,i,r,a={};for(r in n)r=="key"?o=n[r]:r=="ref"?i=n[r]:a[r]=n[r];if(arguments.length>2&&(a.children=arguments.length>3?R.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)a[r]===void 0&&(a[r]=e.defaultProps[r]);return P(e,a,o,i,null)}function P(e,n,t,o,i){var r={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++ie,__i:-1,__u:0};return i==null&&m.vnode!=null&&m.vnode(r),r}function D(e){return e.children}function H(e,n){this.props=e,this.context=n}function $(e,n){if(n==null)return e.__?$(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?$(e):null}function de(e){var n,t;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null){e.__e=e.__c.base=t.__e;break}return de(e)}}function pe(e){(!e.__d&&(e.__d=!0)&&T.push(e)&&!B.__r++||se!=m.debounceRendering)&&((se=m.debounceRendering)||ae)(B)}function B(){for(var e,n,t,o,i,r,a,_=1;T.length;)T.length>_&&T.sort(le),e=T.shift(),_=T.length,e.__d&&(t=void 0,o=void 0,i=(o=(n=e).__v).__e,r=[],a=[],n.__P&&((t=C({},o)).__v=o.__v+1,m.vnode&&m.vnode(t),X(n.__P,t,o,n.__n,n.__P.namespaceURI,32&o.__u?[i]:null,r,i??$(o),!!(32&o.__u),a),t.__v=o.__v,t.__.__k[t.__i]=t,ve(r,t,a),o.__e=o.__=null,t.__e!=i&&de(t)));B.__r=0}function fe(e,n,t,o,i,r,a,_,u,l,c){var s,p,d,x,k,v,h,g=o&&o.__k||ce,w=n.length;for(u=He(t,n,g,u,w),s=0;s<w;s++)(d=t.__k[s])!=null&&(p=d.__i==-1?A:g[d.__i]||A,d.__i=s,v=X(e,d,p,i,r,a,_,u,l,c),x=d.__e,d.ref&&p.ref!=d.ref&&(p.ref&&Y(p.ref,null,d),c.push(d.ref,d.__c||x,d)),k==null&&x!=null&&(k=x),(h=!!(4&d.__u))||p.__k===d.__k?u=ge(d,u,e,h):typeof d.type=="function"&&v!==void 0?u=v:x&&(u=x.nextSibling),d.__u&=-7);return t.__e=k,u}function He(e,n,t,o,i){var r,a,_,u,l,c=t.length,s=c,p=0;for(e.__k=new Array(i),r=0;r<i;r++)(a=n[r])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=e.__k[r]=P(null,a,null,null,null):U(a)?a=e.__k[r]=P(D,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=e.__k[r]=P(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[r]=a,u=r+p,a.__=e,a.__b=e.__b+1,_=null,(l=a.__i=Be(a,t,u,s))!=-1&&(s--,(_=t[l])&&(_.__u|=2)),_==null||_.__v==null?(l==-1&&(i>c?p--:i<c&&p++),typeof a.type!="function"&&(a.__u|=4)):l!=u&&(l==u-1?p--:l==u+1?p++:(l>u?p--:p++,a.__u|=4))):e.__k[r]=null;if(s)for(r=0;r<c;r++)(_=t[r])!=null&&(2&_.__u)==0&&(_.__e==o&&(o=$(_)),ye(_,_));return o}function ge(e,n,t,o){var i,r;if(typeof e.type=="function"){for(i=e.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=e,n=ge(i[r],n,t,o));return n}e.__e!=n&&(o&&(n&&e.type&&!n.parentNode&&(n=$(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Be(e,n,t,o){var i,r,a,_=e.key,u=e.type,l=n[t],c=l!=null&&(2&l.__u)==0;if(l===null&&_==null||c&&_==l.key&&u==l.type)return t;if(o>(c?1:0)){for(i=t-1,r=t+1;i>=0||r<n.length;)if((l=n[a=i>=0?i--:r++])!=null&&(2&l.__u)==0&&_==l.key&&u==l.type)return a}return-1}function he(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||De.test(n)?t:t+"px"}function F(e,n,t,o,i){var r,a;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||he(e.style,n,"");if(t)for(n in t)o&&t[n]==o[n]||he(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")r=n!=(n=n.replace(_e,"$1")),a=n.toLowerCase(),n=a in e||n=="onFocusOut"||n=="onFocusIn"?a.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+r]=t,t?o?t.u=o.u:(t.u=q,e.addEventListener(n,r?J:V,r)):e.removeEventListener(n,r?J:V,r);else{if(i=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function me(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n.t==null)n.t=q++;else if(n.t<t.u)return;return t(m.event?m.event(n):n)}}}function X(e,n,t,o,i,r,a,_,u,l){var c,s,p,d,x,k,v,h,g,w,S,E,M,Pe,G,I,re,N=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(u=!!(32&t.__u),r=[_=n.__e=t.__e]),(c=m.__b)&&c(n);e:if(typeof N=="function")try{if(h=n.props,g="prototype"in N&&N.prototype.render,w=(c=N.contextType)&&o[c.__c],S=c?w?w.props.value:c.__:o,t.__c?v=(s=n.__c=t.__c).__=s.__E:(g?n.__c=s=new N(h,S):(n.__c=s=new H(h,S),s.constructor=N,s.render=je),w&&w.sub(s),s.state||(s.state={}),s.__n=o,p=s.__d=!0,s.__h=[],s._sb=[]),g&&s.__s==null&&(s.__s=s.state),g&&N.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=C({},s.__s)),C(s.__s,N.getDerivedStateFromProps(h,s.__s))),d=s.props,x=s.state,s.__v=n,p)g&&N.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),g&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(g&&N.getDerivedStateFromProps==null&&h!==d&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(h,S),n.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(h,s.__s,S)===!1){for(n.__v!=t.__v&&(s.props=h,s.state=s.__s,s.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(O){O&&(O.__=n)}),E=0;E<s._sb.length;E++)s.__h.push(s._sb[E]);s._sb=[],s.__h.length&&a.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(h,s.__s,S),g&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(d,x,k)})}if(s.context=S,s.props=h,s.__P=e,s.__e=!1,M=m.__r,Pe=0,g){for(s.state=s.__s,s.__d=!1,M&&M(n),c=s.render(s.props,s.state,s.context),G=0;G<s._sb.length;G++)s.__h.push(s._sb[G]);s._sb=[]}else do s.__d=!1,M&&M(n),c=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++Pe<25);s.state=s.__s,s.getChildContext!=null&&(o=C(C({},o),s.getChildContext())),g&&!p&&s.getSnapshotBeforeUpdate!=null&&(k=s.getSnapshotBeforeUpdate(d,x)),I=c,c!=null&&c.type===D&&c.key==null&&(I=be(c.props.children)),_=fe(e,U(I)?I:[I],n,t,o,i,r,a,_,u,l),s.base=n.__e,n.__u&=-161,s.__h.length&&a.push(s),v&&(s.__E=s.__=null)}catch(O){if(n.__v=null,u||r!=null)if(O.then){for(n.__u|=u?160:128;_&&_.nodeType==8&&_.nextSibling;)_=_.nextSibling;r[r.indexOf(_)]=null,n.__e=_}else{for(re=r.length;re--;)K(r[re]);Q(n)}else n.__e=t.__e,n.__k=t.__k,O.then||Q(n);m.__e(O,n,t)}else r==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):_=n.__e=Fe(t.__e,n,t,o,i,r,a,u,l);return(c=m.diffed)&&c(n),128&n.__u?void 0:_}function Q(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(Q)}function ve(e,n,t){for(var o=0;o<t.length;o++)Y(t[o],t[++o],t[++o]);m.__c&&m.__c(n,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){m.__e(r,i.__v)}})}function be(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:U(e)?e.map(be):C({},e)}function Fe(e,n,t,o,i,r,a,_,u){var l,c,s,p,d,x,k,v=t.props||A,h=n.props,g=n.type;if(g=="svg"?i="http://www.w3.org/2000/svg":g=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(l=0;l<r.length;l++)if((d=r[l])&&"setAttribute"in d==!!g&&(g?d.localName==g:d.nodeType==3)){e=d,r[l]=null;break}}if(e==null){if(g==null)return document.createTextNode(h);e=document.createElementNS(i,g,h.is&&h),_&&(m.__m&&m.__m(n,r),_=!1),r=null}if(g==null)v===h||_&&e.data==h||(e.data=h);else{if(r=r&&R.call(e.childNodes),!_&&r!=null)for(v={},l=0;l<e.attributes.length;l++)v[(d=e.attributes[l]).name]=d.value;for(l in v)if(d=v[l],l!="children"){if(l=="dangerouslySetInnerHTML")s=d;else if(!(l in h)){if(l=="value"&&"defaultValue"in h||l=="checked"&&"defaultChecked"in h)continue;F(e,l,null,d,i)}}for(l in h)d=h[l],l=="children"?p=d:l=="dangerouslySetInnerHTML"?c=d:l=="value"?x=d:l=="checked"?k=d:_&&typeof d!="function"||v[l]===d||F(e,l,d,v[l],i);if(c)_||s&&(c.__html==s.__html||c.__html==e.innerHTML)||(e.innerHTML=c.__html),n.__k=[];else if(s&&(e.innerHTML=""),fe(n.type=="template"?e.content:e,U(p)?p:[p],n,t,o,g=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,a,r?r[0]:t.__k&&$(t,0),_,u),r!=null)for(l=r.length;l--;)K(r[l]);_||(l="value",g=="progress"&&x==null?e.removeAttribute("value"):x!=null&&(x!==e[l]||g=="progress"&&!x||g=="option"&&x!=v[l])&&F(e,l,x,v[l],i),l="checked",k!=null&&k!=e[l]&&F(e,l,k,v[l],i))}return e}function Y(e,n,t){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&n==null||(e.__u=e(n))}else e.current=n}catch(i){m.__e(i,t)}}function ye(e,n,t){var o,i;if(m.unmount&&m.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||Y(o,null,n)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(r){m.__e(r,n)}o.base=o.__P=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&ye(o[i],n,t||typeof e.type!="function");t||K(e.__e),e.__c=e.__=e.__e=void 0}function je(e,n,t){return this.constructor(e,t)}function We(e,n,t){var o,i,r,a;n==document&&(n=document.documentElement),m.__&&m.__(e,n),i=(o=!1)?null:n.__k,r=[],a=[],X(n,e=n.__k=ue(D,null,[e]),i||A,A,n.namespaceURI,i?null:n.firstChild?R.call(n.childNodes):null,r,i?i.__e:n.firstChild,o,a),ve(r,e,a)}R=ce.slice,m={__e:function(e,n,t,o){for(var i,r,a;n=n.__;)if((i=n.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),a=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,o||{}),a=i.__d),a)return i.__E=i}catch(_){e=_}throw e}},ie=0,H.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=C({},this.state),typeof e=="function"&&(e=e(C({},t),this.props)),e&&C(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),pe(this))},H.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),pe(this))},H.prototype.render=D,T=[],ae=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,le=function(e,n){return e.__v.__b-n.__v.__b},B.__r=0,_e=/(PointerCapture)$|Capture$/i,q=0,V=me(!1),J=me(!0);var ze=0;function f(e,n,t,o,i,r){n||(n={});var a,_,u=n;if("ref"in u)for(_ in u={},n)_=="ref"?a=n[_]:u[_]=n[_];var l={type:e,props:u,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ze,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(a=e.defaultProps))for(_ in a)u[_]===void 0&&(u[_]=a[_]);return m.vnode&&m.vnode(l),l}var L,b,Z,xe,j=0,ke=[],y=m,we=y.__b,Se=y.__r,Ee=y.diffed,Ne=y.__c,Ce=y.unmount,Te=y.__;function ee(e,n){y.__h&&y.__h(b,e,j||n),j=0;var t=b.__H||(b.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function Ge(e,n,t){var o=ee(L++,2);if(o.t=e,!o.__c&&(o.__=[Ke(void 0,n),function(_){var u=o.__N?o.__N[0]:o.__[0],l=o.t(u,_);u!==l&&(o.__N=[l,o.__[1]],o.__c.setState({}))}],o.__c=b,!b.__f)){var i=function(_,u,l){if(!o.__c.__H)return!0;var c=o.__c.__H.__.filter(function(p){return!!p.__c});if(c.every(function(p){return!p.__N}))return!r||r.call(this,_,u,l);var s=o.__c.props!==_;return c.forEach(function(p){if(p.__N){var d=p.__[0];p.__=p.__N,p.__N=void 0,d!==p.__[0]&&(s=!0)}}),r&&r.call(this,_,u,l)||s};b.__f=!0;var r=b.shouldComponentUpdate,a=b.componentWillUpdate;b.componentWillUpdate=function(_,u,l){if(this.__e){var c=r;r=void 0,i(_,u,l),r=c}a&&a.call(this,_,u,l)},b.shouldComponentUpdate=i}return o.__N||o.__}function W(e,n){var t=ee(L++,3);!y.__s&&Le(t.__H,n)&&(t.__=e,t.u=n,b.__H.__h.push(t))}function $e(e){return j=5,Oe(function(){return{current:e}},[])}function Oe(e,n){var t=ee(L++,7);return Le(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function qe(e,n){return j=8,Oe(function(){return e},n)}function Ve(){for(var e;e=ke.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(z),e.__H.__h.forEach(ne),e.__H.__h=[]}catch(n){e.__H.__h=[],y.__e(n,e.__v)}}y.__b=function(e){b=null,we&&we(e)},y.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),Te&&Te(e,n)},y.__r=function(e){Se&&Se(e),L=0;var n=(b=e.__c).__H;n&&(Z===b?(n.__h=[],b.__h=[],n.__.forEach(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.forEach(z),n.__h.forEach(ne),n.__h=[],L=0)),Z=b},y.diffed=function(e){Ee&&Ee(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(ke.push(n)!==1&&xe===y.requestAnimationFrame||((xe=y.requestAnimationFrame)||Je)(Ve)),n.__H.__.forEach(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Z=b=null},y.__c=function(e,n){n.some(function(t){try{t.__h.forEach(z),t.__h=t.__h.filter(function(o){return!o.__||ne(o)})}catch(o){n.some(function(i){i.__h&&(i.__h=[])}),n=[],y.__e(o,t.__v)}}),Ne&&Ne(e,n)},y.unmount=function(e){Ce&&Ce(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.forEach(function(o){try{z(o)}catch(i){n=i}}),t.__H=void 0,n&&y.__e(n,t.__v))};var Ae=typeof requestAnimationFrame=="function";function Je(e){var n,t=function(){clearTimeout(o),Ae&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,35);Ae&&(n=requestAnimationFrame(t))}function z(e){var n=b,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),b=n}function ne(e){var n=b;e.__c=e.__(),b=n}function Le(e,n){return!e||e.length!==n.length||n.some(function(t,o){return t!==e[o]})}function Ke(e,n){return typeof n=="function"?n(e):n}const Xe={isOpen:!1,messages:[],isStreaming:!1,error:null};function Me(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function Qe(e,n){switch(n.type){case"OPEN":return{...e,isOpen:!0,error:null};case"CLOSE":return{...e,isOpen:!1};case"LOAD_MESSAGES":return{...e,messages:n.messages};case"ADD_USER_MESSAGE":return{...e,error:null,messages:[...e.messages,{id:n.id,role:"user",content:n.content}]};case"START_STREAMING":return{...e,isStreaming:!0,error:null,messages:[...e.messages,{id:n.id,role:"assistant",content:"",isStreaming:!0}]};case"APPEND_TEXT":{const t=[...e.messages],o=t[t.length-1];return o&&o.role==="assistant"&&o.isStreaming&&(t[t.length-1]={...o,content:o.content+n.text}),{...e,messages:t}}case"ADD_TOOL_CALL":{const t=[...e.messages],o=t[t.length-1];if(o&&o.role==="assistant"){const i=[...o.toolCalls??[],n.toolCall];t[t.length-1]={...o,toolCalls:i}}return{...e,messages:t}}case"SET_TOOL_RESULT":{const t=[...e.messages],o=t[t.length-1];if(o&&o.role==="assistant"&&o.toolCalls){const i=o.toolCalls.map(r=>r.id===n.toolCallId?{...r,result:n.result,status:"done"}:r);t[t.length-1]={...o,toolCalls:i}}return{...e,messages:t}}case"FINISH_STREAMING":{const t=[...e.messages],o=t[t.length-1];return o&&o.role==="assistant"&&o.isStreaming&&(t[t.length-1]={...o,isStreaming:!1}),{...e,isStreaming:!1,messages:t}}case"SET_ERROR":{const t=[...e.messages],o=t[t.length-1];return o&&o.role==="assistant"&&o.isStreaming&&(t[t.length-1]={...o,isStreaming:!1}),{...e,isStreaming:!1,error:n.error,messages:t}}case"CLEAR_MESSAGES":return{...e,messages:[],error:null};default:return e}}async function Ye(e,n,t,o){const i=await fetch(`${e}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify({productId:n,messages:t,endUserSessionId:o})});if(!i.ok){const r=await i.json().catch(()=>({error:"Request failed"}));throw new Error(r.error||`HTTP ${i.status}`)}if(!i.body)throw new Error("No response stream available");return i.body}async function Ze(e,n,t,o,i){const r=await fetch(`${e}/api/widget/identify`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify({productId:n,endUserSessionId:t,token:o,name:i})}),a=await r.json().catch(()=>({}));if(!r.ok)throw new Error(a.error||`HTTP ${r.status}`);return a}async function en(e,n,t){const o=await fetch(`${e}/api/widget/reset-user`,{method:"POST",headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true"},body:JSON.stringify({productId:n,endUserSessionId:t})}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i.error||`HTTP ${o.status}`);return i}async function nn(e,n){const t=e.getReader(),o=new TextDecoder;let i="";try{for(;;){const{done:r,value:a}=await t.read();if(r)break;i+=o.decode(a,{stream:!0});const _=i.split(`

`);i=_.pop()??"";for(const u of _)Ie(u.trim(),n)}i.trim()&&Ie(i.trim(),n),n.onFinish()}catch(r){const a=r instanceof Error?r.message:"Stream read failed";n.onError(a)}finally{t.releaseLock()}}function Ie(e,n){const t=e.split(`
`);for(const o of t){if(!o.startsWith("data: "))continue;const i=o.slice(6);if(i==="[DONE]")return;try{const r=JSON.parse(i);switch(r.type){case"text-delta":r.delta&&n.onTextDelta(r.delta);break;case"tool-input-available":r.toolCallId&&r.toolName&&n.onToolCall(r.toolCallId,r.toolName,r.input??{});break;case"tool-output-available":r.toolCallId&&n.onToolResult(r.toolCallId,r.output);break;case"tool-call":r.toolCallId&&r.toolName&&n.onToolCall(r.toolCallId,r.toolName,r.input??{});break;case"tool-result":r.toolCallId&&n.onToolResult(r.toolCallId,r.output);break;case"error":n.onError(r.errorText??r.reason??"Unknown error");break;case"abort":n.onError(r.reason??"Response aborted");break;default:break}}catch{}}}function tn(e,n){if(!n)return e;let t=e;for(const[o,i]of Object.entries(n))t=t.replace(`:${o}`,encodeURIComponent(i));return t}function on(e){var o;const n=e.replace(/\/$/,"")||"/",t=document.querySelectorAll("a[href]");for(const i of t){const r=i;if((((o=r.pathname)==null?void 0:o.replace(/\/$/,""))||"/")===n)return r.click(),console.log(`[Ourguide-B2B] Navigated via anchor click: ${e}`),!0}return!1}function rn(e){var i,r;const n=window,t=n.next;if((i=t==null?void 0:t.router)!=null&&i.push)return t.router.push(e),console.log(`[Ourguide-B2B] Navigated via Next.js router: ${e}`),!0;if(n.__NUXT__){const a=n.$nuxt;if((r=a==null?void 0:a.$router)!=null&&r.push)return a.$router.push(e),console.log(`[Ourguide-B2B] Navigated via Vue/Nuxt router: ${e}`),!0}return!1}function sn(e){try{return window.history.pushState({},"",e),window.dispatchEvent(new PopStateEvent("popstate",{state:{}})),console.log(`[Ourguide-B2B] Navigated via pushState: ${e}`),!0}catch{return!1}}async function an(e,n){const t=tn(e,n);return on(t)||rn(t)||sn(t)||(console.log(`[Ourguide-B2B] Navigated via hard navigation: ${t}`),window.location.href=t),!0}const ln="og2-chat-",_n="og2-enduser-session-";function te(e){return`${ln}${e}`}function Re(e){return`${_n}${e}`}function Ue(){var n,t;const e=(t=(n=globalThis.crypto)==null?void 0:n.randomUUID)==null?void 0:t.call(n);return e||`${Date.now()}-${Math.random().toString(16).slice(2)}`}function oe(e){const n=Re(e);try{const t=localStorage.getItem(n);if(t&&t.trim())return t;const o=`sess_${Ue()}`;return localStorage.setItem(n,o),o}catch{return`sess_${Ue()}`}}function cn(e){try{localStorage.removeItem(Re(e))}catch{}}function un(e,n){try{const t=n.map(({isStreaming:o,...i})=>i);sessionStorage.setItem(te(e),JSON.stringify(t))}catch{}}function dn(e){try{const n=sessionStorage.getItem(te(e));return n?JSON.parse(n):[]}catch{return[]}}function pn(e){try{sessionStorage.removeItem(te(e))}catch{}}function fn({productId:e,apiUrl:n,position:t}){const[o,i]=Ge(Qe,Xe),r=$e(null),a=$e(null);W(()=>{const c=dn(e);c.length>0&&i({type:"LOAD_MESSAGES",messages:c})},[e]),W(()=>{!o.isStreaming&&o.messages.length>0&&un(e,o.messages)},[o.messages,o.isStreaming,e]),W(()=>{o.isOpen&&!o.isStreaming&&setTimeout(()=>{var c;return(c=r.current)==null?void 0:c.focus()},50)},[o.isOpen,o.isStreaming]),W(()=>{var c;(c=a.current)==null||c.scrollIntoView({behavior:"smooth"})},[o.messages]);const _=qe(async c=>{const s=c.trim();if(!s||o.isStreaming)return;r.current&&(r.current.value="");const p=Me();i({type:"ADD_USER_MESSAGE",id:p,content:s});const d=[...o.messages.map(v=>({role:v.role,content:v.content})),{role:"user",content:s}],x=Me();i({type:"START_STREAMING",id:x});const k=new Map;try{const v=oe(e),h=await Ye(n,e,d,v);await nn(h,{onTextDelta:g=>{i({type:"APPEND_TEXT",text:g})},onToolCall:(g,w,S)=>{const E={id:g,name:w,args:S,status:"calling"};k.set(g,E),i({type:"ADD_TOOL_CALL",toolCall:E})},onToolResult:(g,w)=>{i({type:"SET_TOOL_RESULT",toolCallId:g,result:w});const S=k.get(g);if((S==null?void 0:S.name)==="navigate_to_page"){const E=w;E.route&&(E.confidence??0)>=.5&&an(E.route,E.params)}},onError:g=>{i({type:"SET_ERROR",error:g})},onFinish:()=>{i({type:"FINISH_STREAMING"})}})}catch(v){const h=v instanceof Error?v.message:"Something went wrong";i({type:"FINISH_STREAMING"}),i({type:"SET_ERROR",error:h})}},[o.messages,o.isStreaming,n,e]);function u(c){c.key==="Enter"&&!c.shiftKey&&r.current&&(c.preventDefault(),_(r.current.value))}function l(){pn(e),i({type:"CLEAR_MESSAGES"})}return f("div",{className:`og2-container og2-${t}`,children:[o.isOpen&&f("div",{className:"og2-panel",children:[f("div",{className:"og2-panel-header",children:[f("span",{className:"og2-panel-title",children:"Assistant"}),f("div",{className:"og2-header-actions",children:[o.messages.length>0&&f("button",{className:"og2-clear-btn",onClick:l,"aria-label":"Clear chat",title:"Clear chat",children:f("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:f("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"})})}),f("button",{className:"og2-close-btn",onClick:()=>i({type:"CLOSE"}),"aria-label":"Close",children:f("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:f("path",{d:"M4 4L12 12M12 4L4 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),f("div",{className:"og2-messages",children:[o.messages.length===0&&!o.error&&f("div",{className:"og2-empty-state",children:"Ask me anything or tell me where you'd like to go."}),o.messages.map(c=>f("div",{className:`og2-message og2-message-${c.role}`,children:f("div",{className:"og2-bubble",children:[c.content,c.isStreaming&&f("span",{className:"og2-cursor"}),gn(c.toolCalls)]})},c.id)),o.error&&f("div",{className:"og2-message og2-message-error",children:f("div",{className:"og2-bubble",children:o.error})}),f("div",{ref:a})]}),f("div",{className:"og2-input-area",children:[f("input",{ref:r,className:"og2-input",type:"text",placeholder:"Ask anything or navigate...",onKeyDown:u,disabled:o.isStreaming}),f("button",{className:"og2-send-btn",onClick:()=>r.current&&_(r.current.value),disabled:o.isStreaming,children:o.isStreaming?f("span",{className:"og2-spinner og2-spinner-sm"}):f("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:f("path",{d:"M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"})})})]})]}),f("button",{className:"og2-trigger",onClick:()=>i(o.isOpen?{type:"CLOSE"}:{type:"OPEN"}),"aria-label":o.isOpen?"Close assistant":"Open assistant",children:o.isOpen?f("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:f("path",{d:"M6 6L18 18M18 6L6 18"})}):f("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:f("path",{d:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"})})})]})}function gn(e){return!e||e.length===0?null:f("div",{className:"og2-tool-calls",children:e.map(n=>f("div",{className:"og2-tool-indicator",children:[n.status==="calling"&&f("span",{className:"og2-spinner og2-spinner-sm"}),n.status==="done"&&f("svg",{className:"og2-tool-check",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:f("path",{d:"M20 6L9 17L4 12"})}),f("span",{className:"og2-tool-label",children:hn(n)})]},n.id))})}function hn(e){if(e.name==="navigate_to_page"){if(e.status==="calling")return"Finding the right page...";const n=e.result;return n!=null&&n.route?`Navigated to ${n.route}`:"No matching page found"}return e.name}const mn=`/* Ourguide-B2B Widget - All classes prefixed with og2- */

.og2-container {
  position: fixed;
  z-index: 2147483647;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #1a1a1a;
}

.og2-container.og2-bottom-right {
  bottom: 20px;
  right: 20px;
}

.og2-container.og2-bottom-left {
  bottom: 20px;
  left: 20px;
}

/* Floating trigger button */
.og2-trigger {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #18181b;
  color: white;
  border: none;
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
  width: 24px;
  height: 24px;
}

/* Chat panel */
.og2-panel {
  position: absolute;
  bottom: 64px;
  right: 0;
  width: 380px;
  max-height: 520px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #e4e4e7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.og2-panel-header {
  padding: 14px 16px;
  border-bottom: 1px solid #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.og2-panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #18181b;
}

.og2-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.og2-clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #a1a1aa;
  padding: 4px;
  display: flex;
  border-radius: 4px;
}

.og2-clear-btn:hover {
  color: #18181b;
  background: #f4f4f5;
}

.og2-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #a1a1aa;
  padding: 4px;
  display: flex;
  border-radius: 4px;
}

.og2-close-btn:hover {
  color: #18181b;
  background: #f4f4f5;
}

/* Messages area */
.og2-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  min-height: 80px;
  scroll-behavior: smooth;
}

.og2-empty-state {
  text-align: center;
  color: #a1a1aa;
  font-size: 13px;
  padding: 24px 16px;
}

.og2-message {
  margin-bottom: 12px;
  font-size: 13px;
}

.og2-message:last-child {
  margin-bottom: 0;
}

/* User messages — right aligned, dark */
.og2-message-user {
  text-align: right;
}

.og2-message-user .og2-bubble {
  display: inline-block;
  background: #18181b;
  color: white;
  padding: 8px 12px;
  border-radius: 12px 12px 2px 12px;
  max-width: 85%;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Assistant messages — left aligned, light */
.og2-message-assistant .og2-bubble {
  display: inline-block;
  background: #f4f4f5;
  color: #3f3f46;
  padding: 8px 12px;
  border-radius: 12px 12px 12px 2px;
  max-width: 85%;
  white-space: pre-wrap;
  word-break: break-word;
}

.og2-message-error .og2-bubble {
  display: inline-block;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  padding: 8px 12px;
  border-radius: 12px 12px 12px 2px;
  max-width: 85%;
  font-size: 12px;
}

/* Streaming cursor */
.og2-cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: #3f3f46;
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: og2-blink 0.8s step-end infinite;
}

@keyframes og2-blink {
  50% { opacity: 0; }
}

/* Tool call indicators */
.og2-tool-calls {
  margin-top: 6px;
}

.og2-tool-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
  font-size: 11px;
  color: #71717a;
}

.og2-tool-check {
  color: #16a34a;
  flex-shrink: 0;
}

.og2-tool-label {
  line-height: 1.3;
}

/* Input area */
.og2-input-area {
  padding: 12px 16px;
  border-top: 1px solid #f4f4f5;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.og2-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  font-family: inherit;
  color: #18181b;
  background: white;
}

.og2-input:focus {
  border-color: #a1a1aa;
  box-shadow: 0 0 0 2px rgba(161, 161, 170, 0.2);
}

.og2-input::placeholder {
  color: #a1a1aa;
}

.og2-input:disabled {
  background: #fafafa;
  color: #a1a1aa;
}

.og2-send-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  background: #18181b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.og2-send-btn:hover {
  background: #27272a;
}

.og2-send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* Spinner */
.og2-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e4e4e7;
  border-top-color: #18181b;
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
`;(function(){const e=document.currentScript??document.querySelector('script[data-product-id][src*="ourguide-b2b-widget"]');if(!e){console.error("[Ourguide-B2B] Could not find script element");return}const n=e.dataset.productId,t=e.dataset.apiUrl??"http://localhost:3000",o=e.dataset.position??"bottom-right";if(!n){console.error("[Ourguide-B2B] data-product-id is required");return}async function i(l,c){try{if(l==="identify"){const s=c??{};if(!s.token||typeof s.token!="string"||!s.token.trim()){console.warn("[Ourguide-B2B] identify: token is required");return}const p=oe(n);await Ze(t,n,p,s.token,s.name);return}if(l==="resetUser"){const s=oe(n);await en(t,n,s),cn(n);return}}catch(s){const p=s instanceof Error?s.message:"Unknown error";console.warn(`[Ourguide-B2B] ${l} failed: ${p}`)}}const r=window,a=Array.isArray(r.ourguide)?r.ourguide:[];r.ourguide=(l,c)=>{i(l,c)};for(const l of a)Array.isArray(l)&&(l[0]==="identify"||l[0]==="resetUser")&&i(l[0],l[1]);const _=document.createElement("style");_.textContent=mn,document.head.appendChild(_);const u=document.createElement("div");u.id="og2-widget-root",document.body.appendChild(u),We(ue(fn,{productId:n,apiUrl:t,position:o}),u)})()})();
