import{o as Lr,E as Pe,l as he,a as ee,c as fe,b as M,e as B,w as H,F as rt,j as Ot,R as fu,g as ke,i as Xe,t as le,k as na,r as ve,z as Bt,m as ri,_ as hu,q as Fl,Z as cs,u as oi,$ as du,n as dr,h as Ue,f as we,a0 as Pl,a1 as Ml,a2 as Na,a3 as Ol,a4 as Pn,a5 as co,G as lo,P as Bl,a6 as Ll,a7 as Fa,a8 as Cr,y as Wl,X as Vl,a9 as Ul,aa as zl,ab as Yn,ac as Gl,ad as Hl,ae as ql,af as jl,ag as Kl,ah as Xl,ai as $l,L as Yl,N as Jl,T as Ql,aj as Zl}from"./index-bReWsRTZ.js";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var pu=function(r,t){return(pu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])})(r,t)};function Kt(r,t){function e(){this.constructor=r}pu(r,t),r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}function re(r,t,e,n){return new(e||(e=Promise))(function(o,a){function i(c){try{u(n.next(c))}catch(l){a(l)}}function s(c){try{u(n.throw(c))}catch(l){a(l)}}function u(c){c.done?o(c.value):new e(function(l){l(c.value)}).then(i,s)}u((n=n.apply(r,[])).next())})}function oe(r,t){var e,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(u){return function(c){return function(l){if(e)throw new TypeError("Generator is already executing.");for(;i;)try{if(e=1,n&&(o=2&l[0]?n.return:l[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,l[1])).done)return o;switch(n=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,n=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){i.label=l[1];break}if(l[0]===6&&i.label<o[1]){i.label=o[1],o=l;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(l);break}o[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(r,i)}catch(f){l=[6,f],n=0}finally{e=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([u,c])}}}var ef=function(){function r(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}return r.prototype.setPlatform=function(t,e){this.platform!=null&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+e+"."),this.platformName=t,this.platform=e},r.prototype.registerFlag=function(t,e,n){if(this.flagRegistry[t]={evaluationFn:e,setHook:n},this.urlFlags[t]!=null){var o=this.urlFlags[t];console.warn("Setting feature override from URL "+t+": "+o+"."),this.set(t,o)}},r.prototype.get=function(t){return t in this.flags?this.flags[t]:(this.flags[t]=this.evaluateFlag(t),this.flags[t])},r.prototype.getNumber=function(t){return this.get(t)},r.prototype.getBool=function(t){return this.get(t)},r.prototype.getFlags=function(){return this.flags},Object.defineProperty(r.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),r.prototype.set=function(t,e){if(this.flagRegistry[t]==null)throw new Error("Cannot set flag "+t+" as it has not been registered.");this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)},r.prototype.evaluateFlag=function(t){if(this.flagRegistry[t]==null)throw new Error("Cannot evaluate flag '"+t+"': no evaluation function found.");return this.flagRegistry[t].evaluationFn()},r.prototype.setFlags=function(t){this.flags=Object.assign({},t)},r.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},r.prototype.populateURLFlags=function(){var t=this;if(this.global!==void 0&&this.global.location!==void 0&&this.global.location.search!==void 0){var e,n,o=(e=this.global.location.search,n={},e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(a){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return tf(n,i[0],i[1]),i.join("=")}),n);"tfjsflags"in o&&o.tfjsflags.split(",").forEach(function(a){var i=a.split(":"),s=i[0],u=i[1];t.urlFlags[s]=function(c,l){if((l=l.toLowerCase())==="true"||l==="false")return l==="true";if(""+ +l===l)return+l;throw new Error("Could not parse value flag value "+l+" for flag "+c+".")}(s,u)})}},r}();function tf(r,t,e){r[decodeURIComponent(t)]=decodeURIComponent(e||"")}function G(){return vu}var vu=null,ho=new Map,Pa=new Map;function mu(r,t){var e=yu(r,t);return ho.get(e)}function nf(r){return Pa.get(r)}function ls(r){for(var t=ho.entries(),e=[];;){var n=t.next(),o=n.done,a=n.value;if(o)break;var i=a[0],s=a[1];i.split("_")[0]===r&&e.push(s)}return e}function gu(r){var t=r.kernelName,e=r.backendName,n=yu(t,e);if(ho.has(n))throw new Error("The kernel '"+t+"' for backend '"+e+"' is already registered");ho.set(n,r)}function rf(r){var t=r.kernelName;Pa.has(t)&&console.warn("Overriding the gradient for '"+t+"'"),Pa.set(t,r)}function yu(r,t){return t+"_"+r}function Ma(r,t,e){return Math.max(r,Math.min(t,e))}function bu(r){return r%2==0?r:r+1}function of(r){for(var t=0,e=0;e<r.length;e++)t+=r[e];return t}function R(r,t){if(!r)throw new Error(typeof t=="string"?t:t())}function Be(r,t,e){e===void 0&&(e=""),R(it(r,t),function(){return e+" Shapes "+r+" and "+t+" must match"})}function yr(r){R(r!=null,function(){return"The input to the tensor constructor must be a non-null value."})}function pr(r,t,e){if(t===void 0&&(t=[]),e===void 0&&(e=!1),t==null&&(t=[]),Array.isArray(r)||tn(r)&&!e)for(var n=0;n<r.length;++n)pr(r[n],t,e);else t.push(r);return t}function ae(r){if(r.length===0)return 1;for(var t=r[0],e=1;e<r.length;e++)t*=r[e];return t}function it(r,t){if(r===t)return!0;if(r==null||t==null||r.length!==t.length)return!1;for(var e=0;e<r.length;e++)if(r[e]!==t[e])return!1;return!0}function $e(r){return r%1==0}function af(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;var t=Math.exp(2*r);return(t-1)/(t+1)}function Oa(r){var t=Math.ceil(Math.sqrt(r));return[t,Math.ceil(r/t)]}function ar(r,t){return t<=r.length?r:r+" ".repeat(t-r.length)}function fs(r,t,e){return t===void 0&&(t=function(n){return 0}),new Promise(function(n,o){var a=0,i=function(){if(r())n();else{a++;var s=t(a);e!=null&&a>=e?o():setTimeout(i,s)}};i()})}function sf(r,t){for(var e=1,n=-1,o=0;o<r.length;++o)if(r[o]>=0)e*=r[o];else if(r[o]===-1){if(n!==-1)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+n+" and dim "+o);n=o}else if(r[o]<0)throw Error("Shapes can not be < 0. Found "+r[o]+" at dim "+o);if(n===-1){if(t>0&&t!==e)throw Error("Size("+t+") must match the product of shape "+r);return r}if(e===0)throw Error("Cannot infer the missing size in ["+r+"] when there are 0 elements");if(t%e!=0)throw Error("The implicit shape can't be a fractional number. Got "+t+" / "+e);var a=r.slice();return a[n]=t/e,a}function nt(r,t){var e=t.length;return R((r=r==null?t.map(function(n,o){return o}):[].concat(r)).every(function(n){return n>=-e&&n<e}),function(){return"All values in axis param must be in range [-"+e+", "+e+") but got axis "+r}),R(r.every(function(n){return $e(n)}),function(){return"All values in axis param must be integers but got axis "+r}),r.map(function(n){return n<0?e+n:n})}function Ln(r,t){for(var e=[],n=[],o=t!=null&&Array.isArray(t)&&t.length===0,a=t==null||o?null:nt(t,r).sort(),i=0,s=0;s<r.length;++s){if(a!=null){if(a[i]===s&&r[s]!==1)throw new Error("Can't squeeze axis "+s+" since its dim '"+r[s]+"' is not 1");(a[i]==null||a[i]>s)&&r[s]===1&&(e.push(r[s]),n.push(s)),a[i]<=s&&i++}r[s]!==1&&(e.push(r[s]),n.push(s))}return{newShape:e,keptDims:n}}function Tr(r,t){var e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else{if(r!=="bool")throw new Error("Unknown data type "+r);e=new Uint8Array(t)}return e}function po(r,t){var e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else if(r==="bool")e=new Uint8Array(t);else{if(r!=="string")throw new Error("Unknown data type "+r);e=new Array(t)}return e}function uf(r,t){for(var e=0;e<r.length;e++){var n=r[e];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type "+t+" being uploaded contains "+n+".")}}function cf(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function lf(r,t){return t!=="complex64"&&(t!=="float32"||r==="complex64")&&(t!=="int32"||r==="float32"||r==="complex64")&&(t!=="bool"||r!=="bool")}function tn(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array}function xu(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error("Unknown dtype "+r)}function ff(r){if(r==null)return 0;var t=0;return r.forEach(function(e){return t+=e.length}),t}function ai(r){return typeof r=="string"||r instanceof String}function hf(r){return typeof r=="boolean"}function df(r){return typeof r=="number"}function Wr(r){return Array.isArray(r)?Wr(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array?"int32":df(r)?"float32":ai(r)?"string":hf(r)?"bool":"float32"}function Ba(r){return!!(r&&r.constructor&&r.call&&r.apply)}function La(r,t){for(var e=t;e<r;++e)if(r%e==0)return e;return r}function nn(r){var t=r.length;if(t<2)return[];var e=new Array(t-1);e[t-2]=r[t-1];for(var n=t-3;n>=0;--n)e[n]=e[n+1]*r[n+1];return e}function wu(r,t,e){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=pr(r)),e&&uf(r,t),function(a,i){return a instanceof Float32Array&&i==="float32"||a instanceof Int32Array&&i==="int32"||a instanceof Uint8Array&&i==="bool"}(r,t))return r;if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool"){for(var n=new Uint8Array(r.length),o=0;o<n.length;++o)Math.round(r[o])!==0&&(n[o]=1);return n}throw new Error("Unknown data type "+t)}function hs(r,t){if(r.length===0)return t[0];var e=r.reduce(function(n,o){return n*o});if(e===0)return[];if(e!==t.length)throw new Error("["+r+"] does not match the input size.");return function n(o,a,i){var s=new Array;if(a.length===1)for(var u=a[0],c=0;c<u;c++)s[c]=i[o+c];else{u=a[0];var l=a.slice(1),f=l.reduce(function(h,d){return h*d});for(c=0;c<u;c++)s[c]=n(o+c*f,l,i)}return s}(0,r,t)}function _u(r,t){for(var e=Vr(r,t),n=0;n<e.length;n++)e[n]=1;return e}function Vr(r,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool")return new Uint8Array(r);throw new Error("Unknown data type "+t)}function Jt(){return G().platform.now()}function Cu(r){r.forEach(function(t){R(Number.isInteger(t)&&t>=0,function(){return"Tensor must have a shape comprised of positive integers but got shape ["+r+"]."})})}function pf(r,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",G().platform.encode(r,t)}function vo(r,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",G().platform.decode(r,t)}function ds(r,t,e){if(t===0)return 0;if(t===1)return r[0];for(var n=r[r.length-1],o=0;o<r.length-1;++o)n+=e[o]*r[o];return n}function vf(r,t,e){if(t===0)return[];if(t===1)return[r];for(var n=new Array(t),o=0;o<n.length-1;++o)n[o]=Math.floor(r/e[o]),r-=n[o]*e[o];return n[n.length-1]=r,n}var mf=function(){function r(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new gf)}return r.prototype.profileKernel=function(t,e,n){var o,a=this,i=this.backendTimer.time(function(){o=n()});return o.forEach(function(s){s.data().then(function(u){(function(c,l,f){if(l!=="float32")return!1;for(var h=0;h<c.length;h++){var d=c[h];if(isNaN(d)||!isFinite(d))return console.warn("Found "+d+" in the result of '"+f+"'"),!0}})(u,s.dtype,t),i.then(function(c){var l="";c.getExtraProfileInfo!=null&&(l=c.getExtraProfileInfo()),a.logger.logKernelProfile(t,s,u,c.kernelMs,e,l)})})}),o},r}(),gf=function(){function r(){}return r.prototype.logKernelProfile=function(t,e,n,o,a,i){var s=typeof o=="number"?ar(o+"ms",9):o.error,u=ar(t,25),c=e.rank,l=e.size,f=ar(e.shape.toString(),14),h="";for(var d in a){var p=a[d].shape||e.shape,m=p.length;h+=d+": "+m+"D "+(m>0?p:"")+" "}console.log("%c"+u+"	%c"+s+"	%c"+c+"D "+f+"	%c"+l+"	%c"+h+"	%c"+i,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},r}(),ps=20,Er=3,ra=7;function yf(r,t,e,n){var o=nn(t),a=function(c,l,f,h){var d=ae(l),p=h[h.length-1],m=new Array(p).fill(0),v=l.length,g=f==="complex64"?Rr(c):c;if(v>1)for(var b=0;b<d/p;b++)for(var x=b*p,y=0;y<p;y++)m[y]=Math.max(m[y],kr(g[x+y],0,f).length);return m}(r,t,e,o),i=t.length,s=function c(l,f,h,d,p,m){m===void 0&&(m=!0);var v=h==="complex64"?2:1,g=f[0],b=f.length;if(b===0)return h==="complex64"?[kr(Rr(l)[0],0,h)]:h==="bool"?[Eu(l[0])]:[l[0].toString()];if(b===1){if(g>ps){var x=Er*v,y=Array.from(l.slice(0,x)),w=Array.from(l.slice((g-Er)*v,g*v));return h==="complex64"&&(y=Rr(y),w=Rr(w)),["["+y.map(function(z,O){return kr(z,p[O],h)}).join(", ")+", ..., "+w.map(function(z,O){return kr(z,p[g-Er+O],h)}).join(", ")+"]"]}return["["+(h==="complex64"?Rr(l):Array.from(l)).map(function(z,O){return kr(z,p[O],h)}).join(", ")+"]"]}var _=f.slice(1),S=d.slice(1),E=d[0]*v,k=[];if(g>ps){for(var I=0;I<Er;I++){var T=(D=I*E)+E;k.push.apply(k,c(l.slice(D,T),_,h,S,p,!1))}for(k.push("..."),I=g-Er;I<g;I++)T=(D=I*E)+E,k.push.apply(k,c(l.slice(D,T),_,h,S,p,I===g-1))}else for(I=0;I<g;I++){var D;T=(D=I*E)+E,k.push.apply(k,c(l.slice(D,T),_,h,S,p,I===g-1))}var U=b===2?",":"";for(k[0]="["+k[0]+U,I=1;I<k.length-1;I++)k[I]=" "+k[I]+U;var V=`,
`;for(I=2;I<b;I++)V+=`
`;return k[k.length-1]=" "+k[k.length-1]+"]"+(m?"":V),k}(r,t,e,o,a),u=["Tensor"];return n&&(u.push("  dtype: "+e),u.push("  rank: "+i),u.push("  shape: ["+t+"]"),u.push("  values:")),u.push(s.map(function(c){return"    "+c}).join(`
`)),u.join(`
`)}function kr(r,t,e){return ar(Array.isArray(r)?parseFloat(r[0].toFixed(ra))+" + "+parseFloat(r[1].toFixed(ra))+"j":ai(r)?"'"+r+"'":e==="bool"?Eu(r):parseFloat(r.toFixed(ra)).toString(),t)}function Eu(r){return r===0?"false":"true"}function Rr(r){for(var t=[],e=0;e<r.length;e+=2)t.push([r[e],r[e+1]]);return t}var Nr=function(){function r(t,e,n){var o=this;if(this.dtype=e,this.shape=t.slice(),this.size=ae(t),n!=null){var a=n.length;R(a===this.size,function(){return"Length of values '"+a+"' does not match the size inferred by the shape '"+o.size+"'."})}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||po(e,this.size),this.strides=nn(t)}return r.prototype.set=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];n.length===0&&(n=[0]),R(n.length===this.rank,function(){return"The number of provided coordinates ("+n.length+") must match the rank ("+e.rank+")"});var a=this.locToIndex(n);this.values[a]=t},r.prototype.get=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t.length===0&&(t=[0]);for(var n=0,o=0,a=t;o<a.length;o++){var i=a[o];if(i<0||i>=this.shape[n]){var s="Requested out of range element at "+t+".   Buffer shape="+this.shape;throw new Error(s)}n++}for(var u=t[t.length-1],c=0;c<t.length-1;++c)u+=this.strides[c]*t[c];return this.values[u]},r.prototype.locToIndex=function(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];for(var e=t[t.length-1],n=0;n<t.length-1;++n)e+=this.strides[n]*t[n];return e},r.prototype.indexToLoc=function(t){if(this.rank===0)return[];if(this.rank===1)return[t];for(var e=new Array(this.shape.length),n=0;n<e.length-1;++n)e[n]=Math.floor(t/this.strides[n]),t-=e[n]*this.strides[n];return e[e.length-1]=t,e},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.toTensor=function(){return Qt().makeTensor(this.values,this.shape,this.dtype)},r}(),Qt=null,W=null,ku=null,He=function(){function r(t,e,n,o){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=ae(t),this.strides=nn(t),this.dataId=n,this.id=o,this.rankType=this.rank<5?this.rank.toString():"higher"}return r.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},r.prototype.asScalar=function(){return this.throwIfDisposed(),R(this.size===1,function(){return"The array must have only 1 element."}),this.reshape([])},r.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},r.prototype.as2D=function(t,e){return this.throwIfDisposed(),this.reshape([t,e])},r.prototype.as3D=function(t,e,n){return this.throwIfDisposed(),this.reshape([t,e,n])},r.prototype.as4D=function(t,e,n,o){return this.throwIfDisposed(),this.reshape([t,e,n,o])},r.prototype.as5D=function(t,e,n,o,a){return this.throwIfDisposed(),this.reshape([t,e,n,o,a])},r.prototype.asType=function(t){return this.throwIfDisposed(),W.cast(this,t)},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.buffer=function(){return re(this,void 0,void 0,function(){var t;return oe(this,function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,W.buffer(this.shape,this.dtype,t)]}})})},r.prototype.bufferSync=function(){return W.buffer(this.shape,this.dtype,this.dataSync())},r.prototype.array=function(){return re(this,void 0,void 0,function(){var t;return oe(this,function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,hs(this.shape,t)]}})})},r.prototype.arraySync=function(){return hs(this.shape,this.dataSync())},r.prototype.data=function(){return re(this,void 0,void 0,function(){var t,e;return oe(this,function(n){switch(n.label){case 0:return this.throwIfDisposed(),t=Qt().read(this.dataId),this.dtype!=="string"?[3,2]:[4,t];case 1:e=n.sent();try{return[2,e.map(function(o){return vo(o)})]}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}n.label=2;case 2:return[2,t]}})})},r.prototype.dataSync=function(){this.throwIfDisposed();var t=Qt().readSync(this.dataId);if(this.dtype==="string")try{return t.map(function(e){return vo(e)})}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t},r.prototype.bytes=function(){return re(this,void 0,void 0,function(){var t;return oe(this,function(e){switch(e.label){case 0:return this.throwIfDisposed(),[4,Qt().read(this.dataId)];case 1:return t=e.sent(),this.dtype==="string"?[2,t]:[2,new Uint8Array(t.buffer)]}})})},r.prototype.dispose=function(){this.isDisposed||(Qt().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(r.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),r.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},r.prototype.toFloat=function(){return this.asType("float32")},r.prototype.toInt=function(){return this.asType("int32")},r.prototype.toBool=function(){return this.asType("bool")},r.prototype.print=function(t){return t===void 0&&(t=!1),W.print(this,t)},r.prototype.reshape=function(t){return this.throwIfDisposed(),W.reshape(this,t)},r.prototype.reshapeAs=function(t){return this.throwIfDisposed(),this.reshape(t.shape)},r.prototype.expandDims=function(t){return t===void 0&&(t=0),W.expandDims(this,t)},r.prototype.cumsum=function(t,e,n){return t===void 0&&(t=0),e===void 0&&(e=!1),n===void 0&&(n=!1),W.cumsum(this,t,e,n)},r.prototype.squeeze=function(t){return this.throwIfDisposed(),W.squeeze(this,t)},r.prototype.clone=function(){return this.throwIfDisposed(),W.clone(this)},r.prototype.oneHot=function(t,e,n){return this.throwIfDisposed(),W.oneHot(this,t,e,n)},r.prototype.toString=function(t){return t===void 0&&(t=!1),yf(this.dataSync(),this.shape,this.dtype,t)},r.prototype.tile=function(t){return this.throwIfDisposed(),W.tile(this,t)},r.prototype.gather=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),W.gather(this,t,e)},r.prototype.matMul=function(t,e,n){return e===void 0&&(e=!1),n===void 0&&(n=!1),this.throwIfDisposed(),W.matMul(this,t,e,n)},r.prototype.dot=function(t){return this.throwIfDisposed(),W.dot(this,t)},r.prototype.norm=function(t,e,n){return t===void 0&&(t="euclidean"),e===void 0&&(e=null),n===void 0&&(n=!1),this.throwIfDisposed(),W.norm(this,t,e,n)},r.prototype.slice=function(t,e){return this.throwIfDisposed(),W.slice(this,t,e)},r.prototype.reverse=function(t){return this.throwIfDisposed(),W.reverse(this,t)},r.prototype.concat=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),t instanceof r&&(t=[t]),W.concat([this].concat(t),e)},r.prototype.split=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),W.split(this,t,e)},r.prototype.stack=function(t,e){return e===void 0&&(e=0),W.stack([this,t],e)},r.prototype.unstack=function(t){return t===void 0&&(t=0),W.unstack(this,t)},r.prototype.pad=function(t,e){return e===void 0&&(e=0),W.pad(this,t,e)},r.prototype.batchNormalization=function(t,e,n,o,a){return n===void 0&&(n=.001),ku("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(t,e,a,o,n)},r.prototype.batchNorm=function(t,e,n,o,a){return a===void 0&&(a=.001),this.throwIfDisposed(),W.batchNorm(this,t,e,n,o,a)},r.prototype.all=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.all(this,t,e)},r.prototype.any=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.any(this,t,e)},r.prototype.logSumExp=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.logSumExp(this,t,e)},r.prototype.sum=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.sum(this,t,e)},r.prototype.prod=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.prod(this,t,e)},r.prototype.mean=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.mean(this,t,e)},r.prototype.min=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.min(this,t,e)},r.prototype.max=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),W.max(this,t,e)},r.prototype.argMin=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),W.argMin(this,t)},r.prototype.argMax=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),W.argMax(this,t)},r.prototype.cast=function(t){return this.throwIfDisposed(),W.cast(this,t)},r.prototype.add=function(t){return this.throwIfDisposed(),W.add(this,t)},r.prototype.addStrict=function(t){return this.throwIfDisposed(),W.addStrict(this,t)},r.prototype.atan2=function(t){return this.throwIfDisposed(),W.atan2(this,t)},r.prototype.sub=function(t){return this.throwIfDisposed(),W.sub(this,t)},r.prototype.subStrict=function(t){return this.throwIfDisposed(),W.subStrict(this,t)},r.prototype.pow=function(t){return this.throwIfDisposed(),W.pow(this,t)},r.prototype.powStrict=function(t){return this.throwIfDisposed(),W.powStrict(this,t)},r.prototype.mul=function(t){return this.throwIfDisposed(),W.mul(this,t)},r.prototype.mulStrict=function(t){return this.throwIfDisposed(),W.mulStrict(this,t)},r.prototype.div=function(t){return this.throwIfDisposed(),W.div(this,t)},r.prototype.divNoNan=function(t){return this.throwIfDisposed(),W.divNoNan(this,t)},r.prototype.floorDiv=function(t){return this.throwIfDisposed(),W.floorDiv(this,t)},r.prototype.divStrict=function(t){return this.throwIfDisposed(),W.divStrict(this,t)},r.prototype.minimum=function(t){return this.throwIfDisposed(),W.minimum(this,t)},r.prototype.minimumStrict=function(t){return this.throwIfDisposed(),W.minimumStrict(this,t)},r.prototype.maximum=function(t){return this.throwIfDisposed(),W.maximum(this,t)},r.prototype.maximumStrict=function(t){return this.throwIfDisposed(),W.maximumStrict(this,t)},r.prototype.mod=function(t){return this.throwIfDisposed(),W.mod(this,t)},r.prototype.modStrict=function(t){return this.throwIfDisposed(),W.modStrict(this,t)},r.prototype.squaredDifferenceStrict=function(t){return this.throwIfDisposed(),W.squaredDifferenceStrict(this,t)},r.prototype.transpose=function(t){return this.throwIfDisposed(),W.transpose(this,t)},r.prototype.notEqual=function(t){return this.throwIfDisposed(),W.notEqual(this,t)},r.prototype.notEqualStrict=function(t){return this.throwIfDisposed(),W.notEqualStrict(this,t)},r.prototype.less=function(t){return this.throwIfDisposed(),W.less(this,t)},r.prototype.lessStrict=function(t){return this.throwIfDisposed(),W.lessStrict(this,t)},r.prototype.equal=function(t){return this.throwIfDisposed(),W.equal(this,t)},r.prototype.equalStrict=function(t){return this.throwIfDisposed(),W.equalStrict(this,t)},r.prototype.lessEqual=function(t){return this.throwIfDisposed(),W.lessEqual(this,t)},r.prototype.lessEqualStrict=function(t){return this.throwIfDisposed(),W.lessEqualStrict(this,t)},r.prototype.greater=function(t){return this.throwIfDisposed(),W.greater(this,t)},r.prototype.greaterStrict=function(t){return this.throwIfDisposed(),W.greaterStrict(this,t)},r.prototype.greaterEqual=function(t){return this.throwIfDisposed(),W.greaterEqual(this,t)},r.prototype.greaterEqualStrict=function(t){return this.throwIfDisposed(),W.greaterEqualStrict(this,t)},r.prototype.logicalAnd=function(t){return this.throwIfDisposed(),W.logicalAnd(this,t)},r.prototype.logicalOr=function(t){return this.throwIfDisposed(),W.logicalOr(this,t)},r.prototype.logicalNot=function(){return this.throwIfDisposed(),W.logicalNot(this)},r.prototype.logicalXor=function(t){return this.throwIfDisposed(),W.logicalXor(this,t)},r.prototype.where=function(t,e){return this.throwIfDisposed(),W.where(t,this,e)},r.prototype.neg=function(){return this.throwIfDisposed(),W.neg(this)},r.prototype.ceil=function(){return this.throwIfDisposed(),W.ceil(this)},r.prototype.floor=function(){return this.throwIfDisposed(),W.floor(this)},r.prototype.sign=function(){return this.throwIfDisposed(),W.sign(this)},r.prototype.isNaN=function(){return this.throwIfDisposed(),W.isNaN(this)},r.prototype.isInf=function(){return this.throwIfDisposed(),W.isInf(this)},r.prototype.isFinite=function(){return this.throwIfDisposed(),W.isFinite(this)},r.prototype.exp=function(){return this.throwIfDisposed(),W.exp(this)},r.prototype.expm1=function(){return this.throwIfDisposed(),W.expm1(this)},r.prototype.log=function(){return this.throwIfDisposed(),W.log(this)},r.prototype.log1p=function(){return this.throwIfDisposed(),W.log1p(this)},r.prototype.sqrt=function(){return this.throwIfDisposed(),W.sqrt(this)},r.prototype.rsqrt=function(){return this.throwIfDisposed(),W.rsqrt(this)},r.prototype.square=function(){return this.throwIfDisposed(),W.square(this)},r.prototype.reciprocal=function(){return this.throwIfDisposed(),W.reciprocal(this)},r.prototype.abs=function(){return this.throwIfDisposed(),W.abs(this)},r.prototype.clipByValue=function(t,e){return this.throwIfDisposed(),W.clipByValue(this,t,e)},r.prototype.relu=function(){return this.throwIfDisposed(),W.relu(this)},r.prototype.relu6=function(){return this.throwIfDisposed(),W.relu6(this)},r.prototype.elu=function(){return this.throwIfDisposed(),W.elu(this)},r.prototype.selu=function(){return this.throwIfDisposed(),W.selu(this)},r.prototype.leakyRelu=function(t){return t===void 0&&(t=.2),this.throwIfDisposed(),W.leakyRelu(this,t)},r.prototype.prelu=function(t){return this.throwIfDisposed(),W.prelu(this,t)},r.prototype.sigmoid=function(){return this.throwIfDisposed(),W.sigmoid(this)},r.prototype.logSigmoid=function(){return this.throwIfDisposed(),W.logSigmoid(this)},r.prototype.softplus=function(){return this.throwIfDisposed(),W.softplus(this)},r.prototype.zerosLike=function(){return this.throwIfDisposed(),W.zerosLike(this)},r.prototype.onesLike=function(){return this.throwIfDisposed(),W.onesLike(this)},r.prototype.sin=function(){return this.throwIfDisposed(),W.sin(this)},r.prototype.cos=function(){return this.throwIfDisposed(),W.cos(this)},r.prototype.tan=function(){return this.throwIfDisposed(),W.tan(this)},r.prototype.asin=function(){return this.throwIfDisposed(),W.asin(this)},r.prototype.acos=function(){return this.throwIfDisposed(),W.acos(this)},r.prototype.atan=function(){return this.throwIfDisposed(),W.atan(this)},r.prototype.sinh=function(){return this.throwIfDisposed(),W.sinh(this)},r.prototype.cosh=function(){return this.throwIfDisposed(),W.cosh(this)},r.prototype.tanh=function(){return this.throwIfDisposed(),W.tanh(this)},r.prototype.asinh=function(){return this.throwIfDisposed(),W.asinh(this)},r.prototype.acosh=function(){return this.throwIfDisposed(),W.acosh(this)},r.prototype.atanh=function(){return this.throwIfDisposed(),W.atanh(this)},r.prototype.erf=function(){return this.throwIfDisposed(),W.erf(this)},r.prototype.round=function(){return this.throwIfDisposed(),W.round(this)},r.prototype.step=function(t){return t===void 0&&(t=0),this.throwIfDisposed(),W.step(this,t)},r.prototype.softmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),W.softmax(this,t)},r.prototype.logSoftmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),W.logSoftmax(this,t)},r.prototype.resizeBilinear=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),W.image.resizeBilinear(this,t,e)},r.prototype.resizeNearestNeighbor=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),W.image.resizeNearestNeighbor(this,t,e)},r.prototype.conv1d=function(t,e,n,o,a,i){return o===void 0&&(o="NWC"),a===void 0&&(a=1),this.throwIfDisposed(),W.conv1d(this,t,e,n,o,a,i)},r.prototype.conv2d=function(t,e,n,o,a,i){return o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]),this.throwIfDisposed(),W.conv2d(this,t,e,n,o,a,i)},r.prototype.conv2dTranspose=function(t,e,n,o,a){return this.throwIfDisposed(),W.conv2dTranspose(this,t,e,n,o,a)},r.prototype.depthwiseConv2D=function(t,e,n,o,a,i){return o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]),this.throwIfDisposed(),W.depthwiseConv2d(this,t,e,n,o,a,i)},r.prototype.separableConv2d=function(t,e,n,o,a,i){return a===void 0&&(a=[1,1]),i===void 0&&(i="NHWC"),this.throwIfDisposed(),W.separableConv2d(this,t,e,n,o,a,i)},r.prototype.avgPool=function(t,e,n,o){return this.throwIfDisposed(),W.avgPool(this,t,e,n,o)},r.prototype.maxPool=function(t,e,n,o){return this.throwIfDisposed(),W.maxPool(this,t,e,n,o)},r.prototype.localResponseNormalization=function(t,e,n,o){return t===void 0&&(t=5),e===void 0&&(e=1),n===void 0&&(n=1),o===void 0&&(o=.5),W.localResponseNormalization(this,t,e,n,o)},r.prototype.pool=function(t,e,n,o,a){return this.throwIfDisposed(),W.pool(this,t,e,n,o,a)},r.prototype.variable=function(t,e,n){return t===void 0&&(t=!0),this.throwIfDisposed(),Qt().makeVariable(this,t,e,n)},r.prototype.unsortedSegmentSum=function(t,e){return this.throwIfDisposed(),W.unsortedSegmentSum(this,t,e)},r.prototype.batchToSpaceND=function(t,e){return this.throwIfDisposed(),W.batchToSpaceND(this,t,e)},r.prototype.spaceToBatchND=function(t,e){return this.throwIfDisposed(),W.spaceToBatchND(this,t,e)},r.prototype.topk=function(t,e){return t===void 0&&(t=1),e===void 0&&(e=!0),this.throwIfDisposed(),W.topk(this,t,e)},r.prototype.stridedSlice=function(t,e,n,o,a,i,s,u){return o===void 0&&(o=0),a===void 0&&(a=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),this.throwIfDisposed(),W.stridedSlice(this,t,e,n,o,a,i,s,u)},r.prototype.depthToSpace=function(t,e){return this.throwIfDisposed(),W.depthToSpace(this,t,e)},r.prototype.fft=function(){return this.throwIfDisposed(),W.spectral.fft(this)},r.prototype.ifft=function(){return this.throwIfDisposed(),W.spectral.ifft(this)},r.prototype.rfft=function(){return this.throwIfDisposed(),W.spectral.rfft(this)},r.prototype.irfft=function(){return this.throwIfDisposed(),W.spectral.irfft(this)},r}();Object.defineProperty(He,Symbol.hasInstance,{value:function(r){return!!r&&r.dataId!=null&&r.shape!=null&&r.dtype!=null}});var vs,Wa,Va,Ua,za,vr=function(r){function t(e,n,o,a){var i=r.call(this,e.shape,e.dtype,e.dataId,a)||this;return i.trainable=n,i.name=o,i}return Kt(t,r),t.prototype.assign=function(e){if(e.dtype!==this.dtype)throw new Error("dtype of the new value ("+e.dtype+") and previous value ("+this.dtype+") must match");if(!it(e.shape,this.shape))throw new Error("shape of the new value ("+e.shape+") and previous value ("+this.shape+") must match");Qt().disposeTensor(this),this.dataId=e.dataId,Qt().incRef(this,null)},t.prototype.dispose=function(){Qt().disposeVariable(this),this.isDisposedInternal=!0},t}(He);Object.defineProperty(vr,Symbol.hasInstance,{value:function(r){return r instanceof He&&r.assign!=null&&r.assign instanceof Function}}),function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"}(vs||(vs={})),function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"}(Wa||(Wa={})),function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"}(Va||(Va={})),function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"}(Ua||(Ua={})),function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"}(za||(za={}));var bf={float32:Ua,int32:Wa,bool:Va,complex64:za};function ct(r,t){if(r==="string"||t==="string"){if(r==="string"&&t==="string")return"string";throw new Error("Can not upcast "+r+" with "+t)}return bf[r][t]}function oa(r){return ct(r,"int32")}function je(r,t){if(r.dtype===t.dtype)return[r,t];var e=ct(r.dtype,t.dtype);return[r.cast(e),t.cast(e)]}function xf(r,t){R(r.dtype===t.dtype,function(){return"The dtypes of the first("+r.dtype+") and second("+t.dtype+") input must match"})}function Ru(r){var t=[];return function e(n,o,a){if(n!=null){if(n instanceof He)return void o.push(n);if(i=n,!(!Array.isArray(i)&&typeof i!="object")){var i,s=n;for(var u in s){var c=s[u];a.has(c)||(a.add(c),e(c,o,a))}}}}(r,t,new Set),t}var aa,ms=function(){function r(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}return r.prototype.dispose=function(){for(var t in this.registeredVariables)this.registeredVariables[t].dispose()},r}(),wf=function(){function r(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new ms}return r.prototype.ready=function(){return re(this,void 0,void 0,function(){var t,e,n;return oe(this,function(o){switch(o.label){case 0:if(this.pendingBackendInit!=null)return[2,this.pendingBackendInit.then(function(){})];if(this.backendInstance!=null)return[2];t=this.getSortedBackends(),e=0,o.label=1;case 1:return e<t.length?(n=t[e],[4,this.initializeBackend(n).success]):[3,5];case 2:return o.sent()?[4,this.setBackend(n)]:[3,4];case 3:return o.sent(),[2];case 4:return e++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(r.prototype,"backend",{get:function(){if(this.pendingBackendInit!=null)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");if(this.backendInstance==null){var t=this.initializeBackendsAndReturnBest(),e=t.name;if(t.asyncInit)throw new Error("The highest priority backend '"+e+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(e)}return this.backendInstance},enumerable:!0,configurable:!0}),r.prototype.backendNames=function(){return Object.keys(this.registryFactory)},r.prototype.findBackend=function(t){return!(t in this.registry)&&(!(t in this.registryFactory)||this.initializeBackend(t).asyncInit)?null:this.registry[t]},r.prototype.findBackendFactory=function(t){return t in this.registryFactory?this.registryFactory[t].factory:null},r.prototype.registerBackend=function(t,e,n){return n===void 0&&(n=1),t in this.registryFactory?(console.warn(t+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[t]={factory:e,priority:n},!0)},r.prototype.setBackend=function(t){return re(this,void 0,void 0,function(){var e,n,o;return oe(this,function(a){switch(a.label){case 0:if(this.registryFactory[t]==null)throw new Error("Backend name '"+t+"' not found in registry");return this.backendName=t,this.registry[t]!=null?[3,4]:(this.backendInstance=null,e=this.initializeBackend(t),n=e.success,e.asyncInit?[4,n]:[3,2]);case 1:return o=a.sent(),[3,3];case 2:o=n,a.label=3;case 3:if(!o)return[2,!1];a.label=4;case 4:return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new mf(this.backendInstance),[2,!0]}})})},r.prototype.setupRegisteredKernels=function(){var t=this;ls(this.backendName).forEach(function(e){e.setupFunc!=null&&e.setupFunc(t.backendInstance)})},r.prototype.disposeRegisteredKernels=function(t){var e=this;ls(t).forEach(function(n){n.disposeFunc!=null&&n.disposeFunc(e.registry[t])})},r.prototype.initializeBackend=function(t){var e=this,n=this.registryFactory[t];if(n==null)throw new Error("Cannot initialize backend "+t+", no registration found.");try{var o=n.factory();if(Promise.resolve(o)===o){var a=++this.pendingBackendInitId,i=o.then(function(s){return!(a<e.pendingBackendInitId)&&(e.registry[t]=s,e.pendingBackendInit=null,!0)}).catch(function(s){return!(a<e.pendingBackendInitId)&&(e.pendingBackendInit=null,console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),!1)});return this.pendingBackendInit=i,{success:i,asyncInit:!0}}return this.registry[t]=o,{success:!0,asyncInit:!1}}catch(s){return console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),{success:!1,asyncInit:!1}}},r.prototype.removeBackend=function(t){if(!(t in this.registryFactory))throw new Error(t+" backend not found in registry");this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},r.prototype.getSortedBackends=function(){var t=this;if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(e,n){return t.registryFactory[n].priority-t.registryFactory[e].priority})},r.prototype.initializeBackendsAndReturnBest=function(){for(var t=this.getSortedBackends(),e=0;e<t.length;e++){var n=t[e],o=this.initializeBackend(n),a=o.success,i=o.asyncInit;if(i||a)return{name:n,asyncInit:i}}throw new Error("Could not initialize any backends, all backend initializations failed.")},r.prototype.moveData=function(t,e){var n=this.state.tensorInfo.get(e),o=n.backend,a=this.readSync(e);o.disposeData(e),n.backend=t,t.move(e,a,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},r.prototype.tidy=function(t,e){var n,o=this,a=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a=t}return this.scopedRun(function(){return o.startScope(a)},function(){return o.endScope(n)},function(){return(n=e())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n})},r.prototype.scopedRun=function(t,e,n){t();try{var o=n();return e(),o}catch(a){throw e(),a}},r.prototype.nextTensorId=function(){return r.nextTensorId++},r.prototype.nextVariableId=function(){return r.nextVariableId++},r.prototype.clone=function(t){var e=this.makeTensorFromDataId(t.dataId,t.shape,t.dtype),n={x:t};return this.addTapeNode(this.state.activeScope.name,n,[e],function(o){return{x:function(){return o.toFloat()}}},[]),e},r.prototype.runKernel=function(t,e,n,o,a){return this.runKernelFunc(null,e,null,t,n,o,a)},r.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},r.prototype.checkKernelForMemLeak=function(t,e,n){var o=this.backend.numDataIds(),a=0;n.forEach(function(u){a+=u.dtype==="complex64"?3:1});var i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=o-e-a-i;if(s>0)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+s+" data ids) after running '"+t+"'")},r.prototype.runKernelFunc=function(t,e,n,o,a,i,s){var u,c=this;i===void 0&&(i=[]),s===void 0&&(s=[]);var l=[],f=this.isTapeOn();o==null&&(o=this.state.activeScope!=null?this.state.activeScope.name:"");var h,d=function(b){f&&(l=b.map(function(x){return c.keep(c.clone(x))}))},p=this.state.numBytes,m=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var v,g=mu(o,this.backendName);return h=g!=null?function(){var b=c.backend.numDataIds();v=g.kernelFunc({inputs:e,attrs:a,backend:c.backend});var x=Array.isArray(v)?v:[v];c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(o,b,x);var y=x.map(function(_){var S=_.dataId,E=_.shape,k=_.dtype;return c.makeTensorFromDataId(S,E,k)}),w=y.filter(function(_,S){return s[S]});return d((i||[]).slice().concat(w)),y}:function(){var b=c.backend.numDataIds();v=c.tidy(function(){return t(c.backend,d)});var x=Array.isArray(v)?v:[v];return c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(o,b,x),x},this.scopedRun(function(){return c.state.kernelDepth++},function(){return c.state.kernelDepth--},function(){u=c.ENV.getBool("DEBUG")?c.profiler.profileKernel(o,e,function(){return h()}):h()}),f&&this.addTapeNode(o,e,u,n,l),this.state.profiling&&this.state.activeProfile.kernels.push({name:o,bytesAdded:this.state.numBytes-p,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-m,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(e).map(function(b){return e[b].shape}),outputShapes:u.map(function(b){return b.shape})}),Array.isArray(v)?u:u[0]},r.prototype.makeTensor=function(t,e,n,o){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",o=o||this.backend;var a=t;n==="string"&&ai(t[0])&&(a=t.map(function(l){return pf(l)}));var i=o.write(a,e,n),s=new He(e,n,i,this.nextTensorId());if(this.incRef(s,o),n==="string"){var u=this.state.tensorInfo.get(i),c=ff(a);this.state.numBytes+=c-u.bytes,u.bytes=c}return s},r.prototype.makeTensorFromDataId=function(t,e,n,o){var a=new He(e,n=n||"float32",t,this.nextTensorId());return this.incRef(a,o),a},r.prototype.makeVariable=function(t,e,n,o){e===void 0&&(e=!0),n=n||this.nextVariableId().toString(),o!=null&&o!==t.dtype&&(t=t.asType(o));var a=new vr(t,e,n,this.nextTensorId());if(this.state.registeredVariables[a.name]!=null)throw new Error("Variable with name "+a.name+" was already registered");return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a},r.prototype.incRef=function(t,e){var n=this.state.tensorInfo.has(t.dataId)?this.state.tensorInfo.get(t.dataId).refCount:0;if(this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++,n===0){this.state.numDataBuffers++;var o=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(o=t.size*xu(t.dtype)),this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:o,refCount:0}),this.state.numBytes+=o}this.state.tensorInfo.get(t.dataId).refCount++,t instanceof vr||this.track(t)},r.prototype.disposeTensor=function(t){if(this.state.tensorInfo.has(t.dataId)){this.state.numTensors--,t.dtype==="string"&&this.state.numStringTensors--;var e=this.state.tensorInfo.get(t.dataId);e.refCount<=1?(t.dtype!=="complex64"&&(this.state.numBytes-=e.bytes),this.state.numDataBuffers--,e.backend.disposeData(t.dataId),this.state.tensorInfo.delete(t.dataId)):this.state.tensorInfo.get(t.dataId).refCount--}},r.prototype.disposeVariables=function(){for(var t in this.state.registeredVariables){var e=this.state.registeredVariables[t];this.disposeVariable(e)}},r.prototype.disposeVariable=function(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]},r.prototype.memory=function(){var t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t},r.prototype.profile=function(t){return re(this,void 0,void 0,function(){var e,n;return oe(this,function(o){return this.state.profiling=!0,e=this.state.numBytes,n=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map(function(a){return a.totalBytesSnapshot})),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-n,[2,this.state.activeProfile]})})},r.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&this.state.kernelDepth===0},r.prototype.addTapeNode=function(t,e,n,o,a){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:n,saved:a},u=nf(t);u!=null&&(o=u.gradFunc),o!=null&&(s.gradient=function(c){return c=c.map(function(l,f){if(l==null){var h=n[f],d=Vr(h.size,h.dtype);return i.makeTensor(d,h.shape,h.dtype)}return l}),o(c.length>1?c:c[0],a)}),this.state.activeTape.push(s)},r.prototype.keep=function(t){return t.kept=!0,t},r.prototype.startTape=function(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++},r.prototype.endTape=function(){this.state.gradientDepth--},r.prototype.startScope=function(t){var e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e},r.prototype.endScope=function(t){for(var e=this,n=Ru(t),o=new Set(n.map(function(u){return u.id})),a=0;a<this.state.activeScope.track.length;a++){var i=this.state.activeScope.track[a];i.kept||o.has(i.id)||i.dispose()}var s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(function(u){u.kept||u.scopeId!==s.id||e.track(u)})},r.prototype.gradients=function(t,e,n,o){var a=this;if(o===void 0&&(o=!1),R(e.length>0,function(){return"gradients() received an empty list of xs."}),n!=null&&n.dtype!=="float32")throw new Error("dy must have 'float32' dtype, but has '"+n.dtype+"'");var i=this.scopedRun(function(){return a.startTape()},function(){return a.endTape()},function(){return a.tidy("forward",t)});R(i instanceof He,function(){return"The result y returned by f() must be a tensor."});var s=function(u,c,l){for(var f={},h={},d=0;d<c.length;d++)f[c[d].id]=!0;for(d=0;d<u.length;d++){var p=(_=u[d]).inputs;for(var m in p){for(var v=p[m],g=!1,b=0;b<c.length;b++)if(f[v.id]){_.outputs.forEach(function(I){return f[I.id]=!0}),g=!0,h[_.id]=!0;break}if(g)break}}var x={};x[l.id]=!0;var y={};for(d=u.length-1;d>=0;d--)for(p=(_=u[d]).inputs,b=0;b<_.outputs.length;b++)if(x[_.outputs[b].id]){for(var m in p)x[p[m].id]=!0,y[_.id]=!0;break}var w=[];for(d=0;d<u.length;d++){var _;if(h[(_=u[d]).id]&&y[_.id]){var S={};for(var m in _.inputs){var E=_.inputs[m];f[E.id]&&(S[m]=E)}var k=Object.assign({},_);k.inputs=S,k.outputs=_.outputs,w.push(k)}}return w}(this.state.activeTape,e,i);if(!o&&s.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var u,c,l={};l[i.id]=n??(u=i.shape,c=_u(ae(u),"float32"),N.makeTensor(c,u,"float32")),function(h,d,p){for(var m=function(g){var b=d[g],x=[];if(b.outputs.forEach(function(S){var E=h[S.id];E!=null?x.push(E):x.push(null)}),b.gradient==null)throw new Error("Cannot compute gradient: gradient function not found for "+b.kernelName+".");var y=b.gradient(x),w=function(S){if(!(S in y))throw new Error("Cannot backprop through input "+S+". Available gradients found: "+Object.keys(y)+".");var E=p(function(){return y[S]()});if(E.dtype!=="float32")throw new Error("Error in gradient for op "+b.kernelName+". The gradient of input "+S+" must have 'float32' dtype, but has '"+E.dtype+"'");var k=b.inputs[S];if(!it(E.shape,k.shape))throw new Error("Error in gradient for op "+b.kernelName+". The gradient of input '"+S+"' has shape '"+E.shape+"', which does not match the shape of the input '"+k.shape+"'");if(h[k.id]==null)h[k.id]=E;else{var I=h[k.id];h[k.id]=I.add(E),I.dispose()}};for(var _ in b.inputs)w(_)},v=d.length-1;v>=0;v--)m(v)}(l,s,function(h){return a.tidy(h)});var f=e.map(function(h){return l[h.id]});return a.state.gradientDepth===0&&(a.state.activeTape.forEach(function(h){for(var d=0,p=h.saved;d<p.length;d++)p[d].dispose()}),a.state.activeTape=null),{value:i,grads:f}})},r.prototype.customGrad=function(t){var e=this;return R(Ba(t),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var n,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];R(o.every(function(s){return s instanceof He}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var i={};return o.forEach(function(s,u){i[u]=s}),e.runKernelFunc(function(s,u){return R((n=t.apply(void 0,o.concat([u]))).value instanceof He,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),R(Ba(n.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),n.value},i,function(s,u){var c=n.gradFunc(s,u),l=Array.isArray(c)?c:[c];R(l.length===o.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),R(l.every(function(h){return h instanceof He}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var f={};return l.forEach(function(h,d){f[d]=function(){return h}}),f})}},r.prototype.readSync=function(t){return this.state.tensorInfo.get(t).backend.readSync(t)},r.prototype.read=function(t){return this.state.tensorInfo.get(t).backend.read(t)},r.prototype.time=function(t){return re(this,void 0,void 0,function(){var e,n;return oe(this,function(o){switch(o.label){case 0:return e=Jt(),[4,this.backend.time(t)];case 1:return(n=o.sent()).wallMs=Jt()-e,[2,n]}})})},r.prototype.track=function(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t},Object.defineProperty(r.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),r.prototype.reset=function(){for(var t in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new ms,this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},r.nextTensorId=0,r.nextVariableId=0,r}(),N=function(){var r=function(){if(aa==null){var e=void 0;if(typeof window<"u")e=window;else if(typeof global<"u")e=global;else if(typeof process<"u")e=process;else{if(typeof self>"u")throw new Error("Could not find a global object");e=self}aa=e}return aa}();if(r._tfengine==null){var t=new ef(r);r._tfengine=new wf(t)}return function(e){vu=e}(r._tfengine.ENV),Qt=function(){return r._tfengine},r._tfengine}();function Iu(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var ln=G();ln.registerFlag("DEBUG",function(){return!1},function(r){r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),ln.registerFlag("IS_BROWSER",function(){return Iu()}),ln.registerFlag("IS_NODE",function(){return typeof process<"u"&&process.versions!==void 0&&process.versions.node!==void 0}),ln.registerFlag("IS_CHROME",function(){return typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),ln.registerFlag("PROD",function(){return!1}),ln.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return ln.getBool("DEBUG")}),ln.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),ln.registerFlag("IS_TEST",function(){return!1});var Fr,Nt,Tt,On={},ia={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function _f(r,t){On[r]=t}function an(r){r in On||(On[r]=function(e){if(e!==1&&e!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var n=function(o){if(typeof OffscreenCanvas<"u"&&o===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}(e);return n.addEventListener("webglcontextlost",function(o){o.preventDefault(),delete On[e]},!1),e===1?n.getContext("webgl",ia)||n.getContext("experimental-webgl",ia):n.getContext("webgl2",ia)}(r));var t=On[r];return t.isContextLost()?(delete On[r],an(r)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),On[r])}function Oo(r,t){return[t,r]}function Sr(r){var t=ae(r);return Oa(Math.ceil(t/4))}function Ur(r,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(r/2))]}function ii(r,t){var e,n,o,a,i,s,u,c,l,f=r;return G().getNumber("WEBGL_VERSION")===2?(e=f.R32F,n=f.R16F,o=f.RGBA16F,a=f.RGBA32F,i=f.RED,s=4,u=1,c=f.HALF_FLOAT,l=f.FLOAT):(e=r.RGBA,n=r.RGBA,o=r.RGBA,a=f.RGBA,i=r.RGBA,s=4,u=4,c=t!=null?t.HALF_FLOAT_OES:null,l=r.FLOAT),{internalFormatFloat:e,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:o,internalFormatPackedFloat:a,textureFormatFloat:i,downloadTextureFormat:r.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:l}}function ie(r,t,e){var n=e();return t&&function(o){var a=o.getError();if(a!==o.NO_ERROR)throw new Error("WebGL Error: "+Rf(o,a))}(r),n}(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(Fr||(Fr={})),function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"}(Nt||(Nt={})),function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"}(Tt||(Tt={}));var Cf=596e-10,Ef=65504;function kf(r){return!!(G().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||Cf<Math.abs(r)&&Math.abs(r)<Ef)}function Rf(r,t){switch(t){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}function $r(r,t,e){return dn(r,t,function(){return r.getExtension(e)},'Extension "'+e+'" not supported on this browser.')}function If(r,t,e){var n=dn(r,t,function(){return r.createShader(r.VERTEX_SHADER)},"Unable to create vertex WebGLShader.");if(ie(r,t,function(){return r.shaderSource(n,e)}),ie(r,t,function(){return r.compileShader(n)}),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(n)),new Error("Failed to compile vertex shader.");return n}function Sf(r,t,e){var n=dn(r,t,function(){return r.createShader(r.FRAGMENT_SHADER)},"Unable to create fragment WebGLShader.");if(ie(r,t,function(){return r.shaderSource(n,e)}),ie(r,t,function(){return r.compileShader(n)}),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw function(o,a){var i=Af.exec(a);if(i==null)return console.log("Couldn't parse line number in error: "+a),void console.log(o);for(var s=+i[1],u=o.split(`
`),c=u.length.toString().length+2,l=u.map(function(v,g){return ar((g+1).toString(),c)+v}),f=0,h=0;h<l.length;h++)f=Math.max(l[h].length,f);var d=l.slice(0,s-1),p=l.slice(s-1,s),m=l.slice(s);console.log(d.join(`
`)),console.log(a.split(`
`)[0]),console.log("%c "+ar(p[0],f),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(m.join(`
`))}(e,r.getShaderInfoLog(n)),new Error("Failed to compile fragment shader.");return n}var sa,ua,Af=/ERROR: [0-9]+:([0-9]+):/g;function Df(r,t){return dn(r,t,function(){return r.createProgram()},"Unable to create WebGLProgram.")}function Tf(r,t,e){if(ie(r,t,function(){return r.linkProgram(e)}),r.getProgramParameter(e,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function ca(r,t,e){if(ie(r,t,function(){return r.validateProgram(e)}),r.getProgramParameter(e,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function Nf(r,t,e){var n=dn(r,t,function(){return r.createBuffer()},"Unable to create WebGLBuffer");return ie(r,t,function(){return r.bindBuffer(r.ARRAY_BUFFER,n)}),ie(r,t,function(){return r.bufferData(r.ARRAY_BUFFER,e,r.STATIC_DRAW)}),n}function Ff(r,t,e){var n=dn(r,t,function(){return r.createBuffer()},"Unable to create WebGLBuffer");return ie(r,t,function(){return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n)}),ie(r,t,function(){return r.bufferData(r.ELEMENT_ARRAY_BUFFER,e,r.STATIC_DRAW)}),n}function Pf(r,t){return dn(r,t,function(){return r.createTexture()},"Unable to create WebGLTexture.")}function Mf(r,t){var e=G().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||t<=0){var n="["+r+"x"+t+"]";throw new Error("Requested texture size "+n+" is invalid.")}if(r>e||t>e)throw n="["+r+"x"+t+"]",new Error("Requested texture size "+n+" greater than WebGL maximum on this browser / GPU "+("["+e+"x"+e+"]")+".")}function Of(r,t){return dn(r,t,function(){return r.createFramebuffer()},"Unable to create WebGLFramebuffer.")}function gs(r,t,e,n,o,a,i,s){var u=r.getAttribLocation(e,n);return u!==-1&&(ie(r,t,function(){return r.bindBuffer(r.ARRAY_BUFFER,o)}),ie(r,t,function(){return r.vertexAttribPointer(u,a,r.FLOAT,!1,i,s)}),ie(r,t,function(){return r.enableVertexAttribArray(u)}),!0)}function Bf(r,t,e,n){zf(r,n),ie(r,t,function(){return r.activeTexture(r.TEXTURE0+n)}),ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,e)})}function Lf(r,t,e,n){return dn(r,t,function(){return r.getUniformLocation(e,n)},'uniform "'+n+'" not present in program.')}function Wf(r,t,e){return r.getUniformLocation(t,e)}function Vf(r,t,e,n,o,a){ie(r,t,function(){return Bf(r,t,n,a)}),ie(r,t,function(){return r.uniform1i(o,a)})}function la(r,t,e,n){ie(r,t,function(){return r.bindFramebuffer(r.FRAMEBUFFER,n)}),ie(r,t,function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0)})}function ys(r,t,e){ie(r,t,function(){return r.bindFramebuffer(r.FRAMEBUFFER,e)}),ie(r,t,function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0)})}function Yr(r){var t=r.checkFramebufferStatus(r.FRAMEBUFFER);if(t!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+Uf(r,t))}function Uf(r,t){switch(t){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}function dn(r,t,e,n){var o=ie(r,t,function(){return e()});if(o==null)throw new Error(n);return o}function zf(r,t){var e=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,n=t+r.TEXTURE0;if(n<r.TEXTURE0||n>e)throw new Error("textureUnit must be in "+("[gl.TEXTURE0, gl.TEXTURE"+e+"]")+".")}function mo(r,t){return t===void 0&&(t=2),ae(r.slice(0,r.length-t))}function go(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function fa(r){var t=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(t=[mo(r)].concat(go(r))),t}function Gf(r,t){var e;t===void 0&&(t=!1);var n=G().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(n*=2,(r=r.map(function(c,l){return l>=r.length-2?bu(r[l]):r[l]})).length===1&&(r=[2,r[0]])),r.length!==2){var o=Ln(r);r=o.newShape}var a=ae(r);if(r.length<=1&&a<=n)return[1,a];if(r.length===2&&r[0]<=n&&r[1]<=n)return r;if(r.length===3&&r[0]*r[1]<=n&&r[2]<=n)return[r[0]*r[1],r[2]];if(r.length===3&&r[0]<=n&&r[1]*r[2]<=n)return[r[0],r[1]*r[2]];if(r.length===4&&r[0]*r[1]*r[2]<=n&&r[3]<=n)return[r[0]*r[1]*r[2],r[3]];if(r.length===4&&r[0]<=n&&r[1]*r[2]*r[3]<=n)return[r[0],r[1]*r[2]*r[3]];if(t){var i=mo(r),s=2,u=2;return r.length&&(s=(e=go(r))[0],u=e[1]),Oa(a=i*(s/2)*(u/2)).map(function(c){return 2*c})}return Oa(a)}function Jr(r){return r%2==0}function Qr(r,t){if(it(r=r.slice(-2),t=t.slice(-2))||!r.length||!t.length||r[0]===0||r[1]===0||t[0]===0||t[1]===0)return!0;if(r.length!==t.length){var e=r.slice(-1)[0],n=t.slice(-1)[0];if(e===n||Jr(e)&&Jr(n)&&(r[0]===1||t[0]===1))return!0}return r[1]===t[1]&&Jr(r[0])&&Jr(t[0])}function Hf(r){if(sa==null){var t=an(r);sa=t.getParameter(t.MAX_TEXTURE_SIZE)}return sa}function qf(r){if(ua==null){var t=an(r);ua=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,ua)}function jf(r){if(r===0)return 0;var t=an(r);return Vt(t,"EXT_disjoint_timer_query_webgl2")&&r===2?2:Vt(t,"EXT_disjoint_timer_query")?1:0}function Vt(r,t){return r.getExtension(t)!=null}function bs(r){try{if(an(r)!=null)return!0}catch{return!1}return!1}function Kf(r){if(r===0)return!1;var t=an(r);if(r===1){if(!Vt(t,"OES_texture_float"))return!1}else if(!Vt(t,"EXT_color_buffer_float"))return!1;return Ga(t)}function Xf(r){if(r===0)return!1;var t=an(r);if(r!==1){if(Vt(t,"EXT_color_buffer_float"))return Ga(t);if(Vt(t,"EXT_color_buffer_half_float")){var e=t.getExtension("EXT_color_buffer_half_float");return function(n,o){var a=ii(n,o),i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texImage2D(n.TEXTURE_2D,0,a.internalFormatHalfFloat,1,1,0,a.textureFormatFloat,a.textureTypeHalfFloat,null);var s=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,s),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,i,0);var u=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(i),n.deleteFramebuffer(s),u}(t,e)}return!1}return!!Vt(t,"OES_texture_float")&&!!Vt(t,"WEBGL_color_buffer_float")&&Ga(t)}function Ga(r){var t=ii(r),e=r.createTexture();r.bindTexture(r.TEXTURE_2D,e),r.texImage2D(r.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);var n=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,n),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);var o=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e),r.deleteFramebuffer(n),o}function $f(r){return r===2&&an(r).fenceSync!=null}var pe=G();function Su(r){G().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function te(r,t){return N.tidy(r,t)}function Ct(r){Ru(r).forEach(function(t){return t.dispose()})}function Yf(r){return N.keep(r)}function yo(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];G().getBool("IS_TEST")||console.warn.apply(console,r)}function Dn(r,t){var e=r;if(tn(r))return t==="string"?[]:[r.length];if(!Array.isArray(r))return[];for(var n=[];Array.isArray(e)||tn(e)&&t!=="string";)n.push(e.length),e=e[0];return Array.isArray(r)&&G().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function o(a,i,s){if(s=s||[],!Array.isArray(a)&&!tn(a))return void R(i.length===0,function(){return"Element arr["+s.join("][")+"] is a primitive, but should be an array/TypedArray of "+i[0]+" elements"});R(i.length>0,function(){return"Element arr["+s.join("][")+"] should be a primitive, but is an array of "+a.length+" elements"}),R(a.length===i[0],function(){return"Element arr["+s.join("][")+"] should have "+i[0]+" elements, but has "+a.length+" elements"});for(var u=i.slice(1),c=0;c<a.length;++c)o(a[c],u,s.concat(c))}(r,n,[]),n}function xs(r,t,e,n){if(r!=null&&(r!=="numeric"&&r!==t||r==="numeric"&&t==="string"))throw new Error("Argument '"+e+"' passed to '"+n+"' must be "+r+" tensor, but got "+t+" tensor")}function C(r,t,e,n){if(n===void 0&&(n="numeric"),r instanceof He)return xs(n,r.dtype,t,e),r;var o=Wr(r);if(o!=="string"&&["bool","int32","float32"].indexOf(n)>=0&&(o=n),xs(n,o,t,e),r==null||!tn(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){var a=r==null?"null":r.constructor.name;throw new Error("Argument '"+t+"' passed to '"+e+"' must be a Tensor or TensorLike, but got '"+a+"'")}var i=Dn(r,o);tn(r)||Array.isArray(r)||(r=[r]);var s=o!=="string"?wu(r,o,G().getBool("DEBUG")):pr(r,[],!0);return N.makeTensor(s,i,o)}function bo(r,t,e,n){if(n===void 0&&(n="numeric"),!Array.isArray(r))throw new Error("Argument "+t+" passed to "+e+" must be a `Tensor[]` or `TensorLike[]`");return r.map(function(o,a){return C(o,t+"["+a+"]",e)},n)}function Au(r,t){for(var e=0;e<r.length;++e)if(r[r.length-e-1]!==t-1-e)return!1;return!0}function Jf(r,t,e){for(var n=r.length+t.length,o=[],a=0,i=0,s=0;s<n;s++)e.indexOf(s)===-1?o.push(r[a++]):o.push(t[i++]);return o}function ht(r,t){for(var e=[],n=r.length,o=0;o<n;o++)t.indexOf(o)===-1&&e.push(r[o]);return[e,t.map(function(a){return r[a]})]}function Et(r,t){return Jf(r,t.map(function(e){return 1}),t)}function Dt(r,t,e){R(Au(t,e),function(){return r+" supports only inner-most axes for now. Got axes "+t+" and rank-"+e+" input."})}function sn(r,t){if(Au(r,t))return null;for(var e=[],n=0;n<t;++n)r.indexOf(n)===-1&&e.push(n);return r.forEach(function(o){return e.push(o)}),e}function si(r){return r.map(function(t,e){return[e,t]}).sort(function(t,e){return t[1]-e[1]}).map(function(t){return t[0]})}function un(r,t){for(var e=[],n=t-r;n<t;++n)e.push(n);return e}function Qf(r,t){var e=r[0].length;r.forEach(function(o,a){R(o.length===e,function(){return"Error in concat"+e+"D: rank of tensors["+a+"] must be the same as the rank of the rest ("+e+")"})}),R(t>=0&&t<e,function(){return"Error in concat"+e+"D: axis must be between 0 and "+(e-1)+"."});var n=r[0];r.forEach(function(o,a){for(var i=0;i<e;i++)R(i===t||o[i]===n[i],function(){return"Error in concat"+e+"D: Shape of tensors["+a+"] ("+o+") does not match the shape of the rest ("+n+") along the non-concatenated axis "+a+"."})})}function mr(r,t){for(var e=r[0].slice(),n=1;n<r.length;n++)e[t]+=r[n][t];return e}function A(r){var t=Object.keys(r);if(t.length!==1)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");var e=t[0],n=r[e];e.endsWith("_")&&(e=e.substring(0,e.length-1));var o=function(){for(var a=[],i=0;i<arguments.length;i++)a[i]=arguments[i];N.startScope(e);try{var s=n.apply(void 0,a);return s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),N.endScope(s),s}catch(u){throw N.endScope(null),u}};return Object.defineProperty(o,"name",{value:e,configurable:!0}),o}pe.registerFlag("HAS_WEBGL",function(){return pe.getNumber("WEBGL_VERSION")>0}),pe.registerFlag("WEBGL_VERSION",function(){return bs(2)?2:bs(1)?1:0}),pe.registerFlag("WEBGL_BUFFER_SUPPORTED",function(){return pe.get("WEBGL_VERSION")===2}),pe.registerFlag("WEBGL_CPU_FORWARD",function(){return!0}),pe.registerFlag("WEBGL_FORCE_F16_TEXTURES",function(){return!1}),pe.registerFlag("WEBGL_PACK",function(){return pe.getBool("HAS_WEBGL")}),pe.registerFlag("WEBGL_PACK_NORMALIZATION",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_CLIP",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_DEPTHWISECONV",function(){return!1}),pe.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_PACK_REDUCE",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_LAZILY_UNPACK",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_CONV_IM2COL",function(){return pe.getBool("WEBGL_PACK")}),pe.registerFlag("WEBGL_MAX_TEXTURE_SIZE",function(){return Hf(pe.getNumber("WEBGL_VERSION"))}),pe.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",function(){return qf(pe.getNumber("WEBGL_VERSION"))}),pe.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",function(){var r=pe.getNumber("WEBGL_VERSION");return r===0?0:jf(r)}),pe.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",function(){return pe.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&(r=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4))));var r}),pe.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",function(){return Kf(pe.getNumber("WEBGL_VERSION"))}),pe.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",function(){return!pe.getBool("WEBGL_FORCE_F16_TEXTURES")&&pe.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")}),pe.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",function(){return Xf(pe.getNumber("WEBGL_VERSION"))}),pe.registerFlag("WEBGL_FENCE_API_ENABLED",function(){return $f(pe.getNumber("WEBGL_VERSION"))}),pe.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",function(){return pe.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0}),ku=Su;var ut=A({complex_:function(r,t){var e=C(r,"real","complex"),n=C(t,"imag","complex");return Be(e.shape,n.shape,"real and imag shapes, "+e.shape+" and "+n.shape+", must match in call to tf.complex()."),N.runKernelFunc(function(o){return o.complex(e,n)},{$real:e,$imag:n})}}),Wt=A({real_:function(r){var t=C(r,"input","real");return N.runKernelFunc(function(e){return e.real(t)},{$input:t})}}),Zt=A({imag_:function(r){var t=C(r,"input","imag");return N.runKernelFunc(function(e){return e.imag(t)},{$input:t})}});function lt(r,t,e){return Tn(r,t,Dn(r,e),e)}function Tn(r,t,e,n){if(n==null&&(n=Wr(r)),n==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!tn(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){Cu(t);var o=ae(t),a=ae(e);R(o===a,function(){return"Based on the provided shape, ["+t+"], the tensor should have "+o+" values but has "+a});for(var i=0;i<e.length;++i){var s=e[i],u=i!==e.length-1||s!==ae(t.slice(i));R(e[i]===t[i]||!u,function(){return"Error creating a new Tensor. Inferred shape ("+e+") does not match the provided shape ("+t+"). "})}}return tn(r)||Array.isArray(r)||(r=[r]),t=t||e,r=n!=="string"?wu(r,n,G().getBool("DEBUG")):pr(r,[],!0),N.makeTensor(r,t,n)}function Z(r,t){if((tn(r)&&t!=="string"||Array.isArray(r))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&tn(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Tn(r,[],[],t)}function Ye(r,t){yr(r);var e=Dn(r,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Tn(r,null,e,t)}function kn(r,t,e){if(yr(r),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");var n=Dn(r,e);if(n.length!==2&&n.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Tn(r,t,n,e)}function ui(r,t,e){if(yr(r),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");var n=Dn(r,e);if(n.length!==3&&n.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Tn(r,t,n,e)}function wt(r,t,e){if(yr(r),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");var n=Dn(r,e);if(n.length!==4&&n.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Tn(r,t,n,e)}function Zf(r,t,e){if(yr(r),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");var n=Dn(r,e);if(n.length!==5&&n.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Tn(r,t,n,e)}function eh(r,t,e){if(yr(r),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");var n=Dn(r,e);if(n.length!==6&&n.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return Tn(r,t=t||n,n,e)}function th(r,t,e,n){return t===void 0&&(t=!0),N.makeVariable(r,t,e,n)}function br(r,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=br(r,"float32"),n=Ge(r,"float32");return ut(e,n)}var o=_u(ae(r),t);return N.makeTensor(o,r,t)}function Ge(r,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=Ge(r,"float32"),n=Ge(r,"float32");return ut(e,n)}var o=Vr(ae(r),t);return N.makeTensor(o,r,t)}function rn(r,t,e){return N.runKernelFunc(function(n){return n.fill(r,t,e)},{})}function nh(r,t,e){if(e<=0)throw new Error("The number of values should be positive.");return N.runKernelFunc(function(n){return n.linspace(r,t,e)},{})}function xo(r,t,e,n){if(e===void 0&&(e=1),n===void 0&&(n="float32"),e===0)throw new Error("Cannot have a step of zero");if(r===t||r<t&&e<0||t<r&&e>1)return Ge([0],n);var o=Vr(Math.abs(Math.ceil((t-r)/e)),n);t<r&&e===1&&(e=-1),o[0]=r;for(var a=1;a<o.length;a++)o[a]=o[a-1]+e;return Ye(o,n)}var Du=A({onesLike_:function(r){var t=C(r,"x","onesLike");if(t.dtype==="complex64"){var e=Du(Wt(t)),n=Te(Zt(t));return ut(e,n)}return N.runKernelFunc(function(o){return o.onesLike(t)},{$x:t},function(o,a){return{$x:function(){return Te(o)}}})}}),Te=A({zerosLike_:function(r){var t=C(r,"x","zerosLike");return N.runKernelFunc(function(e){return e.zerosLike(t)},{$x:t},function(e,n){return{$x:function(){return Te(e)}}})}}),Qe=A({concat_:function(r,t){t===void 0&&(t=0),R(r.length>=1,function(){return"Pass at least one tensor to concat"});var e=bo(r,"tensors","concat");e[0].dtype==="complex64"&&e.forEach(function(s){if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype `+s.dtype+". ")}),t=nt(t,e[0].shape)[0];var n=mr(e.map(function(s){return s.shape}),t);if(ae(n)===0)return lt([],n);if((e=e.filter(function(s){return s.size>0})).length===1)return e[0];var o=e.map(function(s){return s.shape});Qf(o,t);var a=e,i={axis:t};return N.runKernelFunc(function(s){return s.concat(e,t)},a,function(s){var u=o.map(function(c){return c[t]});return ci(s,u,t).map(function(c){return function(){return c}})},"Concat",i)}}),rh=A({concat1d_:function(r){return Qe(r,0)}}),oh=A({concat2d_:function(r,t){return Qe(r,t)}}),ah=A({concat3d_:function(r,t){return Qe(r,t)}}),ih=A({concat4d_:function(r,t){return Qe(r,t)}}),ci=A({split_:function(r,t,e){e===void 0&&(e=0);var n,o=C(r,"x","split");return e=nt(e,o.shape)[0],typeof t=="number"?(R(o.shape[e]%t==0,function(){return"Number of splits must evenly divide the axis."}),n=new Array(t).fill(o.shape[e]/t)):(R(o.shape[e]===t.reduce(function(a,i){return a+i}),function(){return"The sum of sizes must match the size of the axis dimension."}),n=t),N.runKernelFunc(function(a){return a.split(o,n,e)},{$x:o},function(a){return{$x:function(){return Qe(a,e)}}})}});function Hn(r,t){return r(t={exports:{}},t.exports),t.exports}var sh=Hn(function(r){(function(t,e,n){function o(s){var u,c=this,l=(u=4022871197,function(f){f=f.toString();for(var h=0;h<f.length;h++){var d=.02519603282416938*(u+=f.charCodeAt(h));d-=u=d>>>0,u=(d*=u)>>>0,u+=4294967296*(d-=u)}return 23283064365386963e-26*(u>>>0)});c.next=function(){var f=2091639*c.s0+23283064365386963e-26*c.c;return c.s0=c.s1,c.s1=c.s2,c.s2=f-(c.c=0|f)},c.c=1,c.s0=l(" "),c.s1=l(" "),c.s2=l(" "),c.s0-=l(s),c.s0<0&&(c.s0+=1),c.s1-=l(s),c.s1<0&&(c.s1+=1),c.s2-=l(s),c.s2<0&&(c.s2+=1),l=null}function a(s,u){return u.c=s.c,u.s0=s.s0,u.s1=s.s1,u.s2=s.s2,u}function i(s,u){var c=new o(s),l=u&&u.state,f=c.next;return f.int32=function(){return 4294967296*c.next()|0},f.double=function(){return f()+11102230246251565e-32*(2097152*f()|0)},f.quick=f,l&&(typeof l=="object"&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.alea=i})(0,r)}),uh=Hn(function(r){(function(t,e,n){function o(s){var u=this,c="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var f=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^f^f>>>8},s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),u.next()}function a(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u}function i(s,u){var c=new o(s),l=u&&u.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},f.int32=c.next,f.quick=f,l&&(typeof l=="object"&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.xor128=i})(0,r)}),ch=Hn(function(r){(function(t,e,n){function o(s){var u=this,c="";u.next=function(){var f=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^f^f<<1)|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),l==c.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function a(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u.v=s.v,u.d=s.d,u}function i(s,u){var c=new o(s),l=u&&u.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},f.int32=c.next,f.quick=f,l&&(typeof l=="object"&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.xorwow=i})(0,r)}),lh=Hn(function(r){(function(t,e,n){function o(s){var u=this;u.next=function(){var c,l,f=u.x,h=u.i;return c=f[h],l=(c^=c>>>7)^c<<24,l^=(c=f[h+1&7])^c>>>10,l^=(c=f[h+3&7])^c>>>3,l^=(c=f[h+4&7])^c<<7,c=f[h+7&7],l^=(c^=c<<13)^c<<9,f[h]=l,u.i=h+1&7,l},function(c,l){var f,h=[];if(l===(0|l))h[0]=l;else for(l=""+l,f=0;f<l.length;++f)h[7&f]=h[7&f]<<15^l.charCodeAt(f)+h[f+1&7]<<13;for(;h.length<8;)h.push(0);for(f=0;f<8&&h[f]===0;++f);for(f==8?h[7]=-1:h[f],c.x=h,c.i=0,f=256;f>0;--f)c.next()}(u,s)}function a(s,u){return u.x=s.x.slice(),u.i=s.i,u}function i(s,u){s==null&&(s=+new Date);var c=new o(s),l=u&&u.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},f.int32=c.next,f.quick=f,l&&(l.x&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.xorshift7=i})(0,r)}),fh=Hn(function(r){(function(t,e,n){function o(s){var u=this;u.next=function(){var c,l,f=u.w,h=u.X,d=u.i;return u.w=f=f+1640531527|0,l=h[d+34&127],c=h[d=d+1&127],l^=l<<13,c^=c<<17,l^=l>>>15,c^=c>>>12,l=h[d]=l^c,u.i=d,l+(f^f>>>16)|0},function(c,l){var f,h,d,p,m,v=[],g=128;for(l===(0|l)?(h=l,l=null):(l+="\0",h=0,g=Math.max(g,l.length)),d=0,p=-32;p<g;++p)l&&(h^=l.charCodeAt((p+32)%l.length)),p===0&&(m=h),h^=h<<10,h^=h>>>15,h^=h<<4,h^=h>>>13,p>=0&&(m=m+1640531527|0,d=(f=v[127&p]^=h+m)==0?d+1:0);for(d>=128&&(v[127&(l&&l.length||0)]=-1),d=127,p=512;p>0;--p)h=v[d+34&127],f=v[d=d+1&127],h^=h<<13,f^=f<<17,h^=h>>>15,f^=f>>>12,v[d]=h^f;c.w=m,c.X=v,c.i=d}(u,s)}function a(s,u){return u.i=s.i,u.w=s.w,u.X=s.X.slice(),u}function i(s,u){s==null&&(s=+new Date);var c=new o(s),l=u&&u.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},f.int32=c.next,f.quick=f,l&&(l.X&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.xor4096=i})(0,r)}),hh=Hn(function(r){(function(t,e,n){function o(s){var u=this,c="";u.next=function(){var f=u.b,h=u.c,d=u.d,p=u.a;return f=f<<25^f>>>7^h,h=h-d|0,d=d<<24^d>>>8^p,p=p-f|0,u.b=f=f<<20^f>>>12^h,u.c=h=h-d|0,u.d=d<<16^h>>>16^p,u.a=p-f|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,s===Math.floor(s)?(u.a=s/4294967296|0,u.b=0|s):c+=s;for(var l=0;l<c.length+20;l++)u.b^=0|c.charCodeAt(l),u.next()}function a(s,u){return u.a=s.a,u.b=s.b,u.c=s.c,u.d=s.d,u}function i(s,u){var c=new o(s),l=u&&u.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(h===0);return h},f.int32=c.next,f.quick=f,l&&(typeof l=="object"&&a(l,c),f.state=function(){return a(c,{})}),f}e&&e.exports?e.exports=i:this.tychei=i})(0,r)}),Bn=Hn(function(r){(function(t,e){var n,o=this,a=256,i=6,s="random",u=e.pow(a,i),c=e.pow(2,52),l=2*c,f=a-1;function h(g,b,x){var y=[],w=m(function E(k,I){var T,D=[],U=typeof k;if(I&&U=="object")for(T in k)try{D.push(E(k[T],I-1))}catch{}return D.length?D:U=="string"?k:k+"\0"}((b=b==1?{entropy:!0}:b||{}).entropy?[g,v(t)]:g??function(){try{var E;return n&&(E=n.randomBytes)?E=E(a):(E=new Uint8Array(a),(o.crypto||o.msCrypto).getRandomValues(E)),v(E)}catch{var k=o.navigator,I=k&&k.plugins;return[+new Date,o,I,o.screen,v(t)]}}(),3),y),_=new d(y),S=function(){for(var E=_.g(i),k=u,I=0;E<c;)E=(E+I)*a,k*=a,I=_.g(1);for(;E>=l;)E/=2,k/=2,I>>>=1;return(E+I)/k};return S.int32=function(){return 0|_.g(4)},S.quick=function(){return _.g(4)/4294967296},S.double=S,m(v(_.S),t),(b.pass||x||function(E,k,I,T){return T&&(T.S&&p(T,_),E.state=function(){return p(_,{})}),I?(e[s]=E,k):E})(S,w,"global"in b?b.global:this==e,b.state)}function d(g){var b,x=g.length,y=this,w=0,_=y.i=y.j=0,S=y.S=[];for(x||(g=[x++]);w<a;)S[w]=w++;for(w=0;w<a;w++)S[w]=S[_=f&_+g[w%x]+(b=S[w])],S[_]=b;(y.g=function(E){for(var k,I=0,T=y.i,D=y.j,U=y.S;E--;)k=U[T=f&T+1],I=I*a+U[f&(U[T]=U[D=f&D+k])+(U[D]=k)];return y.i=T,y.j=D,I})(a)}function p(g,b){return b.i=g.i,b.j=g.j,b.S=g.S.slice(),b}function m(g,b){for(var x,y=g+"",w=0;w<y.length;)b[f&w]=f&(x^=19*b[f&w])+y.charCodeAt(w++);return v(b)}function v(g){return String.fromCharCode.apply(0,g)}if(e["seed"+s]=h,m(e.random(),t),r.exports){r.exports=h;try{n=require("crypto")}catch{}}})([],Math)});Bn.alea=sh,Bn.xor128=uh,Bn.xorwow=ch,Bn.xorshift7=lh,Bn.xor4096=fh,Bn.tychei=hh;var Bo=Bn.alea,li=function(){function r(t,e,n,o,a){this.mean=t,this.stdDev=e,this.dtype=n,this.nextVal=NaN,this.truncated=o,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var i=a||Math.random();this.random=Bo(i.toString())}return r.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var t=this.nextVal;return this.nextVal=NaN,t}for(var e,n,o=!1;!o;){var a=void 0,i=void 0,s=void 0;do s=(a=2*this.random()-1)*a+(i=2*this.random()-1)*i;while(s>=1||s===0);var u=Math.sqrt(-2*Math.log(s)/s);e=this.mean+this.stdDev*a*u,n=this.mean+this.stdDev*i*u,this.truncated&&!this.isValidTruncated(e)||(o=!0)}return this.truncated&&!this.isValidTruncated(n)||(this.nextVal=this.convertValue(n)),this.convertValue(e)},r.prototype.convertValue=function(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)},r.prototype.isValidTruncated=function(t){return t<=this.upper&&t>=this.lower},r}(),dh=function(){function r(t,e,n,o){this.alpha=t,this.beta=1/e,this.dtype=n;var a=o||Math.random();this.randu=Bo(a.toString()),this.randn=new li(0,1,n,!1,this.randu()),this.d=t<1?t+2/3:t-1/3,this.c=1/Math.sqrt(9*this.d)}return r.prototype.nextValue=function(){for(var t,e,n,o,a,i;;){do o=this.randn.nextValue(),i=1+this.c*o;while(i<=0);if(i*=i*i,e=1-.331*(t=o*o)*t,n=.5*t+this.d*(1-i+Math.log(i)),(a=this.randu())<e||Math.log(a)<n)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)},r.prototype.convertValue=function(t){return this.dtype==="float32"?t:Math.round(t)},r}(),ph=function(){function r(t,e,n,o){var a=this;if(t===void 0&&(t=0),e===void 0&&(e=1),this.canReturnFloat=function(){return a.dtype==null||a.dtype==="float32"},this.min=t,this.range=e-t,this.dtype=n,o==null&&(o=Math.random()),typeof o=="number"&&(o=o.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+t+" - "+e+" <= 1 and dtype is not float");this.random=Bo(o)}return r.prototype.convertValue=function(t){return this.canReturnFloat()?t:Math.round(t)},r.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},r}();function xe(r,t,e){return t===void 0&&(t="float32"),t=t||"float32",Cu(r),new Nr(r,t,e)}function vh(r,t){t===void 0&&(t=!1),console.log(r.toString(t))}var Tu=A({batchToSpaceND_:function(r,t,e){var n=C(r,"x","batchToSpaceND"),o=t.reduce(function(a,i){return a*i});return R(n.rank>=1+t.length,function(){return"input rank is "+n.rank+" but should be > than blockShape.length "+t.length}),R(e.length===t.length,function(){return"crops.length is "+e.length+" but should be equal to blockShape.length  "+t.length}),R(n.shape[0]%o==0,function(){return"input tensor batch is "+n.shape[0]+" but is not divisible by the product of the elements of blockShape "+t.join(" * ")+" === "+o}),N.runKernelFunc(function(a){return a.batchToSpaceND(n,t,e)},{$x:n},function(a){return{$x:function(){return a.spaceToBatchND(t,e)}}})}}),mh=A({broadcastTo_:function(r,t){var e=C(r,"broadcastTo","x"),n=e.shape;if(t.some(function(u){return!(u>0)||u%1!=0}))throw new Error("broadcastTo(): Invalid broadcast shape ["+t+"].");if(t.length<e.rank)throw new Error("broadcastTo(): shape.length="+t.length+" < input.rank="+e.rank+".");if(t.length>e.rank){for(var o=e.shape.slice();o.length<t.length;)o.unshift(1);e=e.reshape(o)}for(var a=Array.from(t),i=t.length-1;i>=0;i--)if(e.shape[i]===t[i])a[i]=1;else if(e.shape[i]!==1)throw new Error("broadcastTo(): ["+n+"] cannot be broadcast to ["+t+"].");var s=a.map(function(u,c){return u>1?c:-1}).filter(function(u){return u>=0});return s.length===0?e.clone():N.runKernelFunc(function(u){return u.tile(e,a)},{input:e},function(u){return{input:function(){return u.sum(s,!0)}}})}}),gh=A({cast_:function(r,t){var e=C(r,"x","cast");if(!cf(t))throw new Error("Failed to cast to unknown dtype "+t);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");var n={dtype:t};return N.runKernelFunc(function(o){return o.cast(e,t)},{x:e},function(o){return{x:function(){return o.clone()}}},"Cast",n)}}),yh=A({clone_:function(r){var t=C(r,"x","clone",null);return N.runKernelFunc(function(){return N.makeTensorFromDataId(t.dataId,t.shape,t.dtype)},{$x:t},function(e){return{$x:function(){return e.toFloat()}}})}}),bh=A({cumsum_:function(r,t,e,n){t===void 0&&(t=0),e===void 0&&(e=!1),n===void 0&&(n=!1);var o=C(r,"x","cumsum"),a=sn([t|=0],o.rank),i=o;a!=null&&(i=o.transpose(a));var s=un(1,o.rank)[0],u=N.runKernelFunc(function(c){return c.cumsum(i,s,e,n)},{permutedX:i},function(c){return{permutedX:function(){return c.cumsum(t,e,!n)}}});return a!=null&&(u=u.transpose(a)),u}}),xh=A({depthToSpace_:function(r,t,e){e===void 0&&(e="NHWC");var n=C(r,"x","depthToSpace"),o=e==="NHWC"?n.shape[1]:n.shape[2],a=e==="NHWC"?n.shape[2]:n.shape[3],i=e==="NHWC"?n.shape[3]:n.shape[1];return R(o*t>=0,function(){return`Negative dimension size caused by overflow when multiplying
      `+o+" and "+t+`  for depthToSpace with input shape
      `+n.shape}),R(a*t>=0,function(){return`Negative dimension size caused by overflow when multiplying
      `+a+" and "+t+` for depthToSpace with input shape
          `+n.shape}),R(i%(t*t)==0,function(){return"Dimension size must be evenly divisible by "+t*t+" but is "+i+" for depthToSpace with input shape "+n.shape}),N.runKernelFunc(function(s){return s.depthToSpace(n,t,e)},{$x:n})}}),Lt=A({expandDims_:function(r,t){t===void 0&&(t=0);var e=C(r,"x","expandDims",null);R(t<=e.rank,function(){return"Axis must be <= rank of the tensor"});var n=e.shape.slice();return t<0&&(R(-(e.rank+1)<=t,function(){return"Axis must be in the interval ["+-(e.rank+1)+", "+e.rank+"]"}),t=e.rank+t+1),n.splice(t,0,1),qt(e,n)}}),Nu=A({eye_:function(r,t,e,n){n===void 0&&(n="float32"),t==null&&(t=r);for(var o=xe([r,t],n),a=r<=t?r:t,i=0;i<a;++i)o.set(1,i,i);var s=o.toTensor().as2D(r,t);if(e==null)return s;if(e.length===1)return ir(Lt(s,0),[e[0],1,1]);if(e.length===2)return ir(Lt(Lt(s,0),0),[e[0],e[1],1,1]);if(e.length===3)return ir(Lt(Lt(Lt(s,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+e.length+"D.")}}),wh=A({multinomial_:function(r,t,e,n){n===void 0&&(n=!1);var o=C(r,"logits","multinomial"),a=o.size,i=o.rank;if(a<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+a+".");if(i>2)throw new Error("Rank of probabilities must be 1 or 2, but is "+i);e=e||Math.random();var s=i===1?o.as2D(1,-1):o,u=N.runKernelFunc(function(c){return c.multinomial(s,n,t,e)},{logits2D:s});return i===1?u.as1D():u}}),Ha=A({oneHot_:function(r,t,e,n){if(e===void 0&&(e=1),n===void 0&&(n=0),t<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+t);var o=C(r,"indices","oneHot","int32"),a=o.shape.concat([t]);return o=o.flatten(),N.runKernelFunc(function(i){return i.oneHot(o,t,e,n)},{$indices:o},function(i){return{$indices:function(){return Ge(o.shape,"float32")}}}).reshape(a)}}),qn=A({pad_:function(r,t,e){e===void 0&&(e=0);var n=C(r,"x","pad");if(n.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var o={paddings:t,constantValue:e};return N.runKernelFunc(function(a){return a.pad(n,t,e)},{x:n},function(a){var i=t.map(function(s){return s[0]});return{x:function(){return a.slice(i,n.shape)}}},"PadV2",o)}}),_h=A({pad1d_:function(r,t,e){return e===void 0&&(e=0),R(t.length===2,function(){return"Invalid number of paddings. Must be length of 2."}),qn(r,[t],e)}}),Ch=A({pad2d_:function(r,t,e){return e===void 0&&(e=0),R(t.length===2&&t[0].length===2&&t[1].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),qn(r,t,e)}}),Eh=A({pad3d_:function(r,t,e){return e===void 0&&(e=0),R(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),qn(r,t,e)}}),kh=A({pad4d_:function(r,t,e){return e===void 0&&(e=0),R(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),qn(r,t,e)}}),Rh=A({rand_:function(r,t,e){var n=ae(r),o=null;if(e==null||e==="float32")o=new Float32Array(n);else if(e==="int32")o=new Int32Array(n);else{if(e!=="bool")throw new Error("Unknown data type "+e);o=new Uint8Array(n)}for(var a=0;a<n;a++)o[a]=t();return N.makeTensor(o,r,e)}}),Ih=A({randomNormal_:function(r,t,e,n,o){if(t===void 0&&(t=0),e===void 0&&(e=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var a=new li(t,e,n,!1,o),i=xe(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Sh=A({randomGamma_:function(r,t,e,n,o){if(e===void 0&&(e=1),n===void 0&&(n="float32"),e==null&&(e=1),n==null&&(n="float32"),n!=="float32"&&n!=="int32")throw new Error("Unsupported data type "+n);for(var a=new dh(t,e,n,o),i=xe(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Fu=A({randomUniform_:function(r,t,e,n,o){t===void 0&&(t=0),e===void 0&&(e=1),n===void 0&&(n="float32");for(var a=xe(r,n),i=new ph(t,e,null,o),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),qt=A({reshape_:function(r,t){var e=C(r,"x","reshape",null);t=sf(t,e.size),R(e.size===ae(t),function(){return"new shape and old shape must have the same number of elements."});var n={shape:t};return N.runKernelFunc(function(o){return o.reshape(e,t)},{x:e},function(o){return{x:function(){return o.reshape(e.shape)}}},"Reshape",n)}}),Pu=A({spaceToBatchND_:function(r,t,e){var n=C(r,"x","spaceToBatchND");return R(n.rank>=1+t.length,function(){return"input rank "+n.rank+" should be > than [blockShape] "+t.length}),R(e.length===t.length,function(){return"paddings.shape[0] "+e.length+" must be equal to [blockShape] "+t.length}),R(n.shape.reduce(function(o,a,i){return i>0&&i<=t.length?o&&(a+e[i-1][0]+e[i-1][1])%t[i-1]==0:o},!0),function(){return"input spatial dimensions "+n.shape.slice(1)+" with paddings "+e.toString()+" must be divisible by blockShapes "+t.toString()}),N.runKernelFunc(function(o){return o.spaceToBatchND(n,t,e)},{$x:n},function(o){return{$x:function(){return o.batchToSpaceND(t,e)}}})}}),Mu=A({squeeze_:function(r,t){var e=C(r,"x","squeeze");return qt(e,Ln(e.shape,t).newShape)}}),Mt=A({stack_:function(r,t){t===void 0&&(t=0);var e=bo(r,"tensors","stack");if(R(e.length>=1,function(){return"Pass at least one tensor to tf.stack"}),e.length===1)return e[0].expandDims(t);var n=e[0].rank,o=e[0].shape,a=e[0].dtype;R(t<=n,function(){return"Axis must be <= rank of the tensor"}),e.forEach(function(s){Be(o,s.shape,"All tensors passed to stack must have matching shapes")}),e.forEach(function(s){R(a===s.dtype,function(){return"All tensors passed to stack must have matching dtypes"})});var i=e.map(function(s){return s.expandDims(t)});return Qe(i,t)}}),ir=A({tile_:function(r,t){var e=C(r,"x","tile",null);R(e.rank===t.length,function(){return"Error in transpose: rank of input "+e.rank+" must match length of reps "+t+"."});var n=[e],o={reps:t};return N.runKernelFunc(function(a,i){var s=a.tile(e,t);return i([e]),s},{x:e},function(a,i){var s=i[0];return{x:function(){var u=Te(s);if(s.rank===1)for(var c=0;c<t[0];++c)u=u.add(a.slice([c*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(c=0;c<t[0];++c)for(var l=0;l<t[1];++l)u=u.add(a.slice([c*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(var f=0;f<t[2];++f)u=u.add(a.slice([c*s.shape[0],l*s.shape[1],f*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else{if(s.rank!==4)throw new Error("Gradient for tile operation is not implemented for rank-"+s.rank+" tensors yet.");for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(f=0;f<t[2];++f)for(var h=0;h<t[3];++h)u=u.add(a.slice([c*s.shape[0],l*s.shape[1],f*s.shape[2],h*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]))}return u}}},"Tile",o,n)}}),Ah=A({truncatedNormal_:function(r,t,e,n,o){if(t===void 0&&(t=0),e===void 0&&(e=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var a=new li(t,e,n,!0,o),i=xe(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Ze=A({unstack_:function(r,t){t===void 0&&(t=0),t=t||0;var e=C(r,"x","unstack");R(t>=-e.shape.length&&t<e.shape.length,function(){return"Axis = "+t+" is not in [-"+e.shape.length+", "+e.shape.length+")"}),t<0&&(t+=e.shape.length);var n={axis:t};return N.runKernelFunc(function(o){return o.unstack(e,t)},{x:e},function(o){return{x:function(){return Mt(o,t)}}},"Unpack",n)}}),Dh=function(r,t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s,u,c,l,f;return oe(this,function(h){switch(h.label){case 0:return e=C(r,"x","setdiff1d"),n=C(t,"y","setdiff1d"),R(e.dtype===n.dtype,function(){return"x and y should have the same dtype, but got x ("+e.dtype+") and y ("+n.dtype+")."}),R(e.rank===1,function(){return"x should be 1D tensor, but got x ("+e.shape+")."}),R(n.rank===1,function(){return"y should be 1D tensor, but got y ("+n.shape+")."}),[4,e.data()];case 1:return o=h.sent(),[4,n.data()];case 2:for(a=h.sent(),i=new Set(a),s=0,l=0;l<o.length;l++)i.has(o[l])||s++;for(u=new Nr([s],e.dtype),c=new Nr([s],"int32"),l=0,f=0;l<o.length;l++)i.has(o[l])||(u.values[f]=o[l],c.values[f]=l,f++);return[2,[u.toTensor(),c.toTensor()]]}})})};function wo(r,t,e,n){n===void 0&&(n=!0);var o=[];if(n)(o=o.concat(t.slice(0))).push(r[0]/e),o=o.concat(r.slice(1));else{o=o.concat(r[0]);for(var a=t.length,i=0;i<a;++i)o=o.concat([r[i+1]/t[i],t[i]]);o=o.concat(r.slice(a+1))}return o}function _o(r,t,e){e===void 0&&(e=!0);var n=[];if(e){n.push(t);for(var o=t+1;o<r;++o)o<=2*t?(n.push(o),n.push(o-(t+1))):n.push(o)}else{var a=[],i=[];for(o=1;o<r;++o)o>=2*t+1||o%2==1?i.push(o):a.push(o);n.push.apply(n,a),n.push(0),n.push.apply(n,i)}return n}function Co(r,t,e,n){n===void 0&&(n=!0);var o=[];n?o.push(r[0]/e):o.push(r[0]*e);for(var a=1;a<r.length;++a)a<=t.length?n?o.push(t[a-1]*r[a]):o.push(r[a]/t[a-1]):o.push(r[a]);return o}function Ou(r,t){for(var e=[0],n=0;n<t;++n)e.push(r[n][0]);return e}function Bu(r,t,e){for(var n=r.slice(0,1),o=0;o<e;++o)n.push(r[o+1]-t[o][0]-t[o][1]);return n}function Lu(r,t){if(r.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+r.rank+".");if(t.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(t.dtype!=="int32")throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+t.dtype+".");if(t.shape[t.rank-1]>r.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+t.shape[t.rank-1]+" vs. "+r.rank);if(r.size===0)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+r.shape+".");for(var e=t.shape,n=e[e.length-1],o=1,a=0;a<e.length-1;++a)o*=e[a];var i=r.shape,s=e.slice();s.pop();var u=1;for(a=n;a<r.rank;++a)u*=i[a],s.push(i[a]);var c=nn(r.shape).map(function(l){return l/u}).concat([1]).slice(0,n);return[s,o,u,c]}var Wu=30;function ha(r){return r<=Wu?r:La(r,Math.floor(Math.sqrt(r)))}function Th(r,t,e){var n=t.rank>1?t.shape[t.rank-1]:1,o=t.rank>1?t.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+e.shape+", indices.shape: "+t.shape+", shape: "+r+", sliceDim: "+n+", and batchDim: "+o+".";if(e.rank<o)throw new Error(a+" update.rank < "+o+". ");if(r.length<n+(e.rank-o))throw new Error(a+" Output shape length < "+(n+(e.rank-o)));if(e.rank!==o+r.length-n)throw new Error(a+" update.rank != "+(o+r.length-n));for(var i=0;i<o;++i)if(e.shape[i]!==t.shape[i])throw new Error(a+" updates.shape["+i+"] ("+e.shape[i]+") != indices.shape["+i+"] ("+t.shape[i]+").");for(i=0;i<e.rank-o;++i)if(e.shape[i+o]!==r[i+n])throw new Error(a+" updates.shape["+(i+o)+"] ("+e.shape[i+o]+") != shape["+(i+o)+"] ("+r[i+o]+")")}function Nh(r,t,e){if(t.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(r.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+r.rank+".");if(t.dtype!=="int32")throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(e.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+e);if(e.length===0){if(t.size===0)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(r.size===0)throw new Error("Updates specified for empty output. updates shape: "+r.shape)}Th(e,t,r)}function Eo(r,t,e){for(var n=t.shape.length,o=n>1?t.shape[n-1]:1,a=e.length,i=1,s=o;s<a;++s)i*=e[s];var u=o<1?1:o;return{sliceRank:o,numUpdates:ae(t.shape)/u,sliceSize:i,strides:nn(e.slice(0,o)).concat([1]),outputSize:ae(e)}}function Fh(r,t,e){R(r.rank===t.length,function(){return"Error in slice"+r.rank+"D: Length of begin "+t+" must match the rank of the array ("+r.rank+")."}),R(r.rank===e.length,function(){return"Error in slice"+r.rank+"D: Length of size "+e+" must match the rank of the array ("+r.rank+")."});for(var n=function(a){R(t[a]+e[a]<=r.shape[a],function(){return"Error in slice"+r.rank+"D: begin["+a+"] + size["+a+"] ("+(t[a]+e[a])+") would overflow input.shape["+a+"] ("+r.shape[a]+")"})},o=0;o<r.rank;++o)n(o)}function ws(r){for(var t=[],e=0;r>0;)1&r&&t.push(e),r/=2,e++;return t}function fi(r,t,e){for(var n=[],o=0;o<r.length;o++)n[o]=Math.ceil((t[o]-r[o])/e[o]);return n}function Ph(r,t,e,n,o){var a=t[o],i=e[o]||1;(r&1<<o||a==null)&&(a=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var s=n[o];return a<0&&(a+=s),a=Ma(0,a,s-1)}function Mh(r,t,e,n,o){var a=t[o],i=e[o]||1;(r&1<<o||a==null)&&(a=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var s=n[o];return a<0&&(a+=s),a=i>0?Ma(0,a,s):Ma(-1,a,s-1)}function Vu(r,t,e){for(var n=e.length,o=0;o<e.length;o++)if(e[o]>1){n=o;break}for(o=n+1;o<e.length;o++)if(t[o]>0||e[o]!==r[o])return!1;return!0}function Uu(r,t){for(var e=r.length>0?r[r.length-1]:1,n=0;n<r.length-1;n++)e+=r[n]*t[n];return e}function Oh(r,t){R(Ba(r),function(){return"The f passed in variableGrads(f) must be a function"}),R(t==null||Array.isArray(t)&&t.every(function(l){return l instanceof vr}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var e=t!=null;if(!e)for(var n in t=[],N.registeredVariables)t.push(N.registeredVariables[n]);var o=e?t.filter(function(l){return!l.trainable}):null,a=t.length;R((t=t.filter(function(l){return l.trainable})).length>0,function(){return"variableGrads() expects at least one of the input variables to be trainable, but none of the "+a+" variables is trainable."});var i=N.gradients(r,t,null,!0),s=i.value,u=i.grads;R(u.some(function(l){return l!=null}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),R(s.rank===0,function(){return"The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+s.rank+" tensor"});var c={};return t.forEach(function(l,f){u[f]!=null&&(c[l.name]=u[f])}),o!=null&&o.forEach(function(l){return c[l.name]=null}),{value:s,grads:c}}function Lo(r){return N.customGrad(r)}var pn=A({softmax_:function(r,t){t===void 0&&(t=-1);var e=C(r,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and dim was "+t);return N.runKernelFunc(function(n,o){var a=n.softmax(e,t);return o([a]),a},{logits:e},function(n,o){var a=o[0],i=n.mul(a);return{logits:function(){return i.sub(i.sum([t],!0).mul(a))}}},"Softmax",{dim:t},[],[!0])}}),Bh=A({logSoftmax_:function(r,t){t===void 0&&(t=-1);var e=C(r,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and axis was "+t);return Lo(function(n,o){var a=n.max(t,!0),i=n.sub(a),s=i.toFloat().sub(i.exp().sum(t,!0).log());return o([s]),{value:s,gradFunc:function(u,c){var l=c[0].exp();return u.sub(u.sum(t,!0).mul(l))}}})(e)}}),zu=function(){function r(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}return r.prototype.get=function(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)},r.prototype.set=function(t,e){this.dataIdsCount++,this.data.set(t,e)},r.prototype.has=function(t){return this.data.has(t)},r.prototype.delete=function(t){return this.dataIdsCount--,this.data.delete(t)},r.prototype.numDataIds=function(){return this.dataIdsCount},r}(),Gu=function(){function r(){}return r.prototype.time=function(t){return L("time")},r.prototype.read=function(t){return L("read")},r.prototype.readSync=function(t){return L("readSync")},r.prototype.numDataIds=function(){return L("numDataIds")},r.prototype.disposeData=function(t){return L("disposeData")},r.prototype.write=function(t,e,n){return L("write")},r.prototype.move=function(t,e,n,o){return L("move")},r.prototype.memory=function(){return L("memory")},r.prototype.floatPrecision=function(){return L("floatPrecision")},r.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},r.prototype.batchMatMul=function(t,e,n,o){return L("batchMatMul")},r.prototype.fusedBatchMatMul=function(t){return t.a,t.b,t.transposeA,t.transposeB,t.bias,t.activation,t.preluActivationWeights,L("fusedBatchMatMul")},r.prototype.slice=function(t,e,n){return L("slice")},r.prototype.stridedSlice=function(t,e,n,o){return L("stridedSlice")},r.prototype.unstack=function(t,e){return L("unstack")},r.prototype.reverse=function(t,e){return L("reverse")},r.prototype.concat=function(t,e){return L("concat")},r.prototype.neg=function(t){return L("neg")},r.prototype.add=function(t,e){return L("add")},r.prototype.addN=function(t){return L("addN")},r.prototype.subtract=function(t,e){return L("subtract")},r.prototype.multiply=function(t,e){return L("multiply")},r.prototype.realDivide=function(t,e){return L("realDivide")},r.prototype.floorDiv=function(t,e){return L("floorDiv")},r.prototype.sum=function(t,e){return L("sum")},r.prototype.prod=function(t,e){return L("prod")},r.prototype.unsortedSegmentSum=function(t,e,n){return L("unsortedSegmentSum")},r.prototype.argMin=function(t,e){return L("argMin")},r.prototype.argMax=function(t,e){return L("argMax")},r.prototype.equal=function(t,e){return L("equal")},r.prototype.notEqual=function(t,e){return L("notEqual")},r.prototype.less=function(t,e){return L("less")},r.prototype.lessEqual=function(t,e){return L("lessEqual")},r.prototype.greater=function(t,e){return L("greater")},r.prototype.greaterEqual=function(t,e){return L("greaterEqual")},r.prototype.logicalNot=function(t){return L("logicalNot")},r.prototype.logicalAnd=function(t,e){return L("logicalAnd")},r.prototype.logicalOr=function(t,e){return L("logicalOr")},r.prototype.where=function(t){return L("where")},r.prototype.select=function(t,e,n){return L("select")},r.prototype.topk=function(t,e,n){return L("topk")},r.prototype.min=function(t,e){return L("min")},r.prototype.minimum=function(t,e){return L("minimum")},r.prototype.mod=function(t,e){return L("mod")},r.prototype.max=function(t,e){return L("max")},r.prototype.maximum=function(t,e){return L("maximum")},r.prototype.all=function(t,e){return L("all")},r.prototype.any=function(t,e){return L("any")},r.prototype.squaredDifference=function(t,e){return L("squaredDifference")},r.prototype.ceil=function(t){return L("ceil")},r.prototype.floor=function(t){return L("floor")},r.prototype.round=function(t){return L("round")},r.prototype.sign=function(t){return L("sign")},r.prototype.isNaN=function(t){return L("isNaN")},r.prototype.isInf=function(t){return L("isInf")},r.prototype.isFinite=function(t){return L("isFinite")},r.prototype.pow=function(t,e){return L("pow")},r.prototype.exp=function(t){return L("exp")},r.prototype.expm1=function(t){return L("expm1")},r.prototype.softmax=function(t,e){return L("softmax")},r.prototype.log=function(t){return L("log")},r.prototype.log1p=function(t){return L("log1p")},r.prototype.sqrt=function(t){return L("sqrt")},r.prototype.rsqrt=function(t){return L("rsqrt")},r.prototype.square=function(t){return L("square")},r.prototype.reciprocal=function(t){return L("reciprocal")},r.prototype.relu=function(t){return L("relu")},r.prototype.relu6=function(t){return L("relu6")},r.prototype.prelu=function(t,e){return L("prelu")},r.prototype.elu=function(t){return L("elu")},r.prototype.eluDer=function(t,e){return L("eluDer")},r.prototype.selu=function(t){return L("selu")},r.prototype.int=function(t){return L("int")},r.prototype.clip=function(t,e,n){return L("clip")},r.prototype.abs=function(t){return L("abs")},r.prototype.complexAbs=function(t){return L("complexAbs")},r.prototype.sigmoid=function(t){return L("sigmoid")},r.prototype.softplus=function(t){return L("softplus")},r.prototype.sin=function(t){return L("sin")},r.prototype.cos=function(t){return L("cos")},r.prototype.tan=function(t){return L("tan")},r.prototype.asin=function(t){return L("asin")},r.prototype.acos=function(t){return L("acos")},r.prototype.atan=function(t){return L("atan")},r.prototype.atan2=function(t,e){return L("atan2")},r.prototype.sinh=function(t){return L("sinh")},r.prototype.cosh=function(t){return L("cosh")},r.prototype.tanh=function(t){return L("tanh")},r.prototype.asinh=function(t){return L("asinh")},r.prototype.acosh=function(t){return L("acosh")},r.prototype.atanh=function(t){return L("atanh")},r.prototype.erf=function(t){return L("erf")},r.prototype.step=function(t,e){return L("step")},r.prototype.fusedConv2d=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,L("fusedConv2d")},r.prototype.conv2d=function(t,e,n){return L("conv2d")},r.prototype.conv2dDerInput=function(t,e,n){return L("conv2dDerInput")},r.prototype.conv2dDerFilter=function(t,e,n){return L("conv2dDerFilter")},r.prototype.fusedDepthwiseConv2D=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,L("fusedDepthwiseConv2D")},r.prototype.depthwiseConv2D=function(t,e,n){return L("depthwiseConv2D")},r.prototype.depthwiseConv2DDerInput=function(t,e,n){return L("depthwiseConv2DDerInput")},r.prototype.depthwiseConv2DDerFilter=function(t,e,n){return L("depthwiseConv2DDerFilter")},r.prototype.conv3d=function(t,e,n){return L("conv3d")},r.prototype.conv3dDerInput=function(t,e,n){return L("conv3dDerInput")},r.prototype.conv3dDerFilter=function(t,e,n){return L("conv3dDerFilter")},r.prototype.maxPool=function(t,e){return L("maxPool")},r.prototype.maxPoolBackprop=function(t,e,n,o){return L("maxPoolBackprop")},r.prototype.avgPool=function(t,e){return L("avgPool")},r.prototype.avgPoolBackprop=function(t,e,n){return L("avgPoolBackprop")},r.prototype.avgPool3d=function(t,e){return L("avgPool3d")},r.prototype.avgPool3dBackprop=function(t,e,n){return L("avgPool3dBackprop")},r.prototype.maxPool3d=function(t,e){return L("maxPool3d")},r.prototype.maxPool3dBackprop=function(t,e,n,o){return L("maxPool3dBackprop")},r.prototype.reshape=function(t,e){return L("reshape")},r.prototype.cast=function(t,e){return L("cast")},r.prototype.tile=function(t,e){return L("tile")},r.prototype.pad=function(t,e,n){return L("pad")},r.prototype.transpose=function(t,e){return L("transpose")},r.prototype.gather=function(t,e,n){return L("gather")},r.prototype.gatherND=function(t,e){return L("gatherND")},r.prototype.scatterND=function(t,e,n){return L("scatterND")},r.prototype.batchToSpaceND=function(t,e,n){return L("batchToSpaceND")},r.prototype.spaceToBatchND=function(t,e,n){return L("spaceToBatchND")},r.prototype.resizeBilinear=function(t,e,n,o){return L("resizeBilinear")},r.prototype.resizeBilinearBackprop=function(t,e,n){return L("resizeBilinearBackprop")},r.prototype.resizeNearestNeighbor=function(t,e,n,o){return L("resizeNearestNeighbor")},r.prototype.resizeNearestNeighborBackprop=function(t,e,n){return L("resizeNearestNeighborBackprop")},r.prototype.batchNormalization=function(t,e,n,o,a,i){return L("batchNormalization")},r.prototype.localResponseNormalization4D=function(t,e,n,o,a){return L("localResponseNormalization4D")},r.prototype.LRNGrad=function(t,e,n,o,a,i,s){return L("LRNGrad")},r.prototype.multinomial=function(t,e,n,o){return L("multinomial")},r.prototype.oneHot=function(t,e,n,o){return L("oneHot")},r.prototype.cumsum=function(t,e,n,o){return L("cumsum")},r.prototype.nonMaxSuppression=function(t,e,n,o,a){return L("nonMaxSuppression")},r.prototype.fft=function(t){return L("fft")},r.prototype.ifft=function(t){return L("ifft")},r.prototype.complex=function(t,e){return L("complex")},r.prototype.real=function(t){return L("real")},r.prototype.imag=function(t){return L("imag")},r.prototype.cropAndResize=function(t,e,n,o,a,i){return L("cropAndResize")},r.prototype.depthToSpace=function(t,e,n){return L("depthToSpace")},r.prototype.split=function(t,e,n){return L("split")},r.prototype.sparseToDense=function(t,e,n,o){return L("sparseToDense")},r.prototype.diag=function(t){return L("diag")},r.prototype.fill=function(t,e,n){return L("fill")},r.prototype.onesLike=function(t){return L("onesLike")},r.prototype.zerosLike=function(t){return L("zerosLike")},r.prototype.linspace=function(t,e,n){return L("linspace")},r.prototype.dispose=function(){return L("dispose")},r}();function L(r){throw new Error("'"+r+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function Cn(r,t){for(var e=r.length,n=[],o=0;o<e;o++){var a=e-1-o,i=r[a]||1;(t[t.length-1-o]||1)>1&&i===1&&n.unshift(a)}return n}function et(r,t){for(var e=[],n=0;n<t.length;n++){var o=r[r.length-n-1],a=t.length-n-1,i=t[a];(o==null||o===1&&i>1)&&e.unshift(a)}return e}function Ae(r,t){for(var e=[],n=Math.max(r.length,t.length),o=0;o<n;o++){var a=r[r.length-o-1];a==null&&(a=1);var i=t[t.length-o-1];if(i==null&&(i=1),a===1)e.unshift(i);else if(i===1)e.unshift(a);else{if(a!==i)throw Error("Operands could not be broadcast together with shapes "+r+" and "+t+".");e.unshift(a)}}return e}function Pr(r,t,e,n,o,a,i){i===void 0&&(i="channelsLast");var s,u=Io(t),c=u[0],l=u[1];if(i==="channelsLast")s=[c,l,r[3],r[3]];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);s=[c,l,r[1],r[1]]}return jn(r,s,e,n,o,a,!1,i)}function ko(r,t,e,n,o,a,i){i===void 0&&(i="NDHWC");var s,u,c=qa(t),l=c[0],f=c[1],h=c[2];if(i==="NDHWC")u="channelsLast",s=[l,f,h,r[4],r[4]];else{if(i!=="NCDHW")throw new Error("Unknown dataFormat "+i);u="channelsFirst",s=[l,f,h,r[1],r[1]]}return Ro(r,s,e,n,o,!1,u,a)}function jn(r,t,e,n,o,a,i,s){i===void 0&&(i=!1),s===void 0&&(s="channelsLast");var u=[-1,-1,-1,-1],c=u[0],l=u[1],f=u[2],h=u[3];if(s==="channelsLast")c=r[0],l=r[1],f=r[2],h=r[3];else{if(s!=="channelsFirst")throw new Error("Unknown dataFormat "+s);c=r[0],h=r[1],l=r[2],f=r[3]}var d,p=t[0],m=t[1],v=t[3],g=Io(e),b=g[0],x=g[1],y=Io(n),w=y[0],_=y[1],S=sr(p,w),E=sr(m,_),k=function(V,z,O,P,q,j,K,J){var ne,ce,de;if(typeof V=="number"){ne={top:V,bottom:V,left:V,right:V,type:V===0?"VALID":"NUMBER"};var ge=function(Ee,Ne,De,Le,Q){Le==null&&(Le=Hu(Ee,Ne,De));var We=Ee[0],Rt=Ee[1],It=Ar((We-Ne+2*Le)/De+1,Q);R($e(It),function(){return"The output # of rows ("+It+") must be an integer. Change the stride and/or zero pad parameters"});var ft=Ar((Rt-Ne+2*Le)/De+1,Q);return R($e(ft),function(){return"The output # of columns ("+ft+") must be an integer. Change the stride and/or zero pad parameters"}),[It,ft]}([z,O],j,P,V,J);ce=ge[0],de=ge[1]}else if(V==="same"){ce=Math.ceil(z/P),de=Math.ceil(O/q);var ye=Math.max(0,(ce-1)*P+j-z),Ie=Math.max(0,(de-1)*q+K-O),_e=Math.floor(ye/2),Re=ye-_e,Fe=Math.floor(Ie/2);ne={top:_e,bottom:Re,left:Fe,right:Ie-Fe,type:"SAME"}}else{if(V!=="valid")throw Error("Unknown padding parameter: "+V);ne={top:0,bottom:0,left:0,right:0,type:"VALID"},ce=Math.ceil((z-j+1)/P),de=Math.ceil((O-K+1)/q)}return{padInfo:ne,outHeight:ce,outWidth:de}}(o,l,f,b,x,S,E,a),I=k.padInfo,T=k.outHeight,D=k.outWidth,U=i?v*h:v;return s==="channelsFirst"?d=[c,U,T,D]:s==="channelsLast"&&(d=[c,T,D,U]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:f,inChannels:h,outHeight:T,outWidth:D,outChannels:U,padInfo:I,strideHeight:b,strideWidth:x,filterHeight:p,filterWidth:m,effectiveFilterHeight:S,effectiveFilterWidth:E,dilationHeight:w,dilationWidth:_,inShape:r,outShape:d,filterShape:t}}function Ro(r,t,e,n,o,a,i,s){a===void 0&&(a=!1),i===void 0&&(i="channelsLast");var u=[-1,-1,-1,-1,-1],c=u[0],l=u[1],f=u[2],h=u[3],d=u[4];if(i==="channelsLast")c=r[0],l=r[1],f=r[2],h=r[3],d=r[4];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);c=r[0],d=r[1],l=r[2],f=r[3],h=r[4]}var p,m=t[0],v=t[1],g=t[2],b=t[4],x=qa(e),y=x[0],w=x[1],_=x[2],S=qa(n),E=S[0],k=S[1],I=S[2],T=sr(m,E),D=sr(v,k),U=sr(g,I),V=function(K,J,ne,ce,de,ge,ye,Ie,_e,Re,Fe){var Ee,Ne,De,Le;if(typeof K=="number"){Ee={top:K,bottom:K,left:K,right:K,front:K,back:K,type:K===0?"VALID":"NUMBER"};var Q=function(F,me,St,Ve,bt,At){bt==null&&(bt=Hu(F,me,Ve));var Fn=F[0],xt=F[1],xr=F[2],$n=Ar((Fn-me+2*bt)/Ve+1,At);R($e($n),function(){return"The output # of depths ("+$n+") must be an integer. Change the stride and/or zero pad parameters"});var wr=Ar((xt-me+2*bt)/Ve+1,At);R($e(wr),function(){return"The output # of rows ("+wr+") must be an integer. Change the stride and/or zero pad parameters"});var _r=Ar((xr-me+2*bt)/Ve+1,At);return R($e(_r),function(){return"The output # of columns ("+_r+") must be an integer. Change the stride and/or zero pad parameters"}),[$n,wr,_r,St]}([J,ne,ce,1],Ie,1,de,K,Fe);Ne=Q[0],De=Q[1],Le=Q[2]}else if(K==="same"){Ne=Math.ceil(J/de),De=Math.ceil(ne/ge),Le=Math.ceil(ce/ye);var We=(Ne-1)*de+Ie-J,Rt=(De-1)*ge+_e-ne,It=(Le-1)*ye+Re-ce,ft=Math.floor(We/2),bn=We-ft,zt=Math.floor(Rt/2),yt=Rt-zt,Y=Math.floor(It/2);Ee={top:zt,bottom:yt,left:Y,right:It-Y,front:ft,back:bn,type:"SAME"}}else{if(K!=="valid")throw Error("Unknown padding parameter: "+K);Ee={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},Ne=Math.ceil((J-Ie+1)/de),De=Math.ceil((ne-_e+1)/ge),Le=Math.ceil((ce-Re+1)/ye)}return{padInfo:Ee,outDepth:Ne,outHeight:De,outWidth:Le}}(o,l,f,h,y,w,_,T,D,U,s),z=V.padInfo,O=V.outDepth,P=V.outHeight,q=V.outWidth,j=a?b*d:b;return i==="channelsFirst"?p=[c,j,O,P,q]:i==="channelsLast"&&(p=[c,O,P,q,j]),{batchSize:c,dataFormat:i,inDepth:l,inHeight:f,inWidth:h,inChannels:d,outDepth:O,outHeight:P,outWidth:q,outChannels:j,padInfo:z,strideDepth:y,strideHeight:w,strideWidth:_,filterDepth:m,filterHeight:v,filterWidth:g,effectiveFilterDepth:T,effectiveFilterHeight:D,effectiveFilterWidth:U,dilationDepth:E,dilationHeight:k,dilationWidth:I,inShape:r,outShape:p,filterShape:t}}function Hu(r,t,e,n){n===void 0&&(n=1);var o=sr(t,n);return Math.floor((r[0]*(e-1)-e+o)/2)}function Io(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function qa(r){return typeof r=="number"?[r,r,r]:r}function sr(r,t){return t<=1?r:r+(r-1)*(t-1)}function Ar(r,t){if(!t)return r;switch(t){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error("Unknown roundingMode "+t)}}function gr(r){var t=Io(r),e=t[0],n=t[1],o=t[2];return e===1&&n===1&&o===1}function kt(r,t){return gr(r)||gr(t)}function hi(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error("Unknown dataFormat "+r)}function qu(r,t,e){if(t==="complex64"){if(r.dtype==="complex64")return r.clone();var n=Ge(r.shape),o=r.toFloat(),a=e.complex(o,n);return n.dispose(),o.dispose(),a}if(!lf(r.dtype,t))return N.makeTensorFromDataId(r.dataId,r.shape,t);if(r.dtype==="complex64"){var i=e.real(r);return a=i.cast(t),i.dispose(),a}if(t==="int32")return e.int(r);if(t==="bool"){var s=Z(0,r.dtype);return a=e.notEqual(r,s),s.dispose(),a}throw new Error("Error in Cast: failed to cast "+r.dtype+" to "+t)}function ja(r,t){return N.makeTensorFromDataId(r.dataId,t,r.dtype)}function ju(r,t,e){var n=(t-r)/(e-1),o=Vr(e,"float32");o[0]=r;for(var a=1;a<o.length;a++)o[a]=o[a-1]+n;return Ye(o,"float32")}function Ka(r,t){if(r.length!==t.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+r.length+", imag: "+t.length+".");for(var e=new Float32Array(2*r.length),n=0;n<e.length;n+=2)e[n]=r[n/2],e[n+1]=t[n/2];return e}function _s(r,t){return{real:r[2*t],imag:r[2*t+1]}}function Lh(r,t,e,n){r[2*n]=t,r[2*n+1]=e}function Wh(r,t,e){var n=(e?2:-2)*Math.PI*(r/t);return{real:Math.cos(n),imag:Math.sin(n)}}function Vh(r,t,e){var n=function(a,i,s){return function(u,c,l){for(var f=0,h=u.length,d=0,p=!1;f<h;){var m=l(c,u[d=f+(h-f>>>1)]);m>0?f=d+1:(h=d,p=!m)}return p?f:-f-1}(a,i,s||Uh)}(r,t,e),o=n<0?-(n+1):n;r.splice(o,0,t)}function Uh(r,t){return r>t?1:r<t?-1:0}function di(r,t,e,n,o){return Ku(r,t,e,n,o,0).selectedIndices}function pi(r,t,e,n,o,a){var i=Ku(r,t,e,n,o,a);return i.numValidOutputs.dispose(),{selectedIndices:i.selectedIndices,selectedScores:i.selectedScores}}function Ku(r,t,e,n,o,a,i,s){s===void 0&&(s=!1);for(var u=Array.from(t).map(function(y,w){return{score:y,boxIndex:w,suppressBeginIndex:0}}).filter(function(y){return y.score>o}).sort(Cs),c=a>0?-.5/a:0,l=[],f=[];l.length<e&&u.length>0;){var h=u.pop(),d=h.score,p=h.boxIndex,m=h.suppressBeginIndex;if(d<o)break;for(var v=!1,g=l.length-1;g>=m;--g){var b=zh(r,p,l[g]);if(b>=n){v=!0;break}if(h.score=h.score*Gh(n,c,b),h.score<=o)break}h.suppressBeginIndex=l.length,v||(h.score===d?(l.push(p),f.push(h.score)):h.score>o&&Vh(u,h,Cs))}var x=l.length;return s&&(l.fill(0,x),f.fill(0,x)),{selectedIndices:Ye(l,"int32"),selectedScores:Ye(f,"float32"),numValidOutputs:Z(x,"int32")}}function zh(r,t,e){var n=r.subarray(4*t,4*t+4),o=r.subarray(4*e,4*e+4),a=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),f=Math.max(o[0],o[2]),h=Math.max(o[1],o[3]),d=(s-a)*(u-i),p=(f-c)*(h-l);if(d<=0||p<=0)return 0;var m=Math.max(a,c),v=Math.max(i,l),g=Math.min(s,f),b=Math.min(u,h),x=Math.max(g-m,0)*Math.max(b-v,0);return x/(d+p-x)}function Gh(r,t,e){var n=Math.exp(t*e*e);return e<=r?n:0}function Cs(r,t){return r.score-t.score||r.score===t.score&&t.boxIndex-r.boxIndex}function Xu(r,t,e){var n=new Array(r.rank).fill(0),o=r.shape.slice();return t.map(function(a){o[e]=a;var i=r.slice(n,o);return n[e]+=a,i})}function $u(r,t){for(var e=new Array(r.rank),n=0;n<e.length;n++)e[n]=r.shape[n]*t[n];var o=xe(e,r.dtype);for(n=0;n<o.values.length;++n){for(var a=o.indexToLoc(n),i=new Array(r.rank),s=0;s<i.length;s++)i[s]=a[s]%r.shape[s];var u=r.locToIndex(i);o.values[n]=r.values[u]}return o.toTensor()}function Yu(r,t,e,n,o){for(var a=t[t.length-1],i=[r.length/a,a],s=i[0],u=i[1],c=Tr(e,s*n),l=Tr("int32",s*n),f=0;f<s;f++){for(var h=f*u,d=r.subarray(h,h+u),p=[],m=0;m<d.length;m++)p.push({value:d[m],index:m});p.sort(function(y,w){return w.value-y.value});var v=f*n,g=c.subarray(v,v+n),b=l.subarray(v,v+n);for(m=0;m<n;m++)g[m]=p[m].value,b[m]=p[m].index}var x=t.slice();return x[x.length-1]=n,[lt(c,x,e),lt(l,x,"int32")]}function vi(r,t){for(var e=[],n=0;n<t.length;n++)t[n]&&e.push(n);var o=xe(r,"int32"),a=xe([e.length,r.length],"int32");for(n=0;n<e.length;n++){var i=o.indexToLoc(e[n]),s=n*r.length;a.values.set(i,s)}return a.toTensor()}var Hh=function(r,t){this.outputShape=[],this.outputShape=r,this.variableNames=t.map(function(o,a){return"T"+a});var e=[];this.variableNames.forEach(function(o){e.push("float v"+o+" = get"+o+"AtOutCoords();")});var n=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        float result = `+n+`;
        setOutput(result);
      }
    `},qh=function(r,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.variableNames=t.map(function(o,a){return"T"+a});var e=[];this.variableNames.forEach(function(o){e.push("vec4 v"+o+" = get"+o+"AtOutCoords();")});var n=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        vec4 result = `+n+`;
        setOutput(result);
      }
    `},jh=function(r,t,e){this.variableNames=["A"];var n=r.windowSize,o=r.batchSize,a=r.inSize,i=Math.ceil(a/n);e||this.variableNames.push("bestIndicesA"),this.outputShape=[o,i];var s=t==="max"?">":"<",u=e?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+n+`;

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < `+n+`; i++) {
          int inIdx = `+u+`;
          float candidate = getA(batch, inIdx);
          if (candidate `+s+` bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `};function Ju(r,t){return["x","y","z","w","u","v"].slice(0,t).map(function(e){return r+"."+e})}function _t(r,t){return t===1?[r]:Ju(r,t)}function pt(){var r,t,e,n,o,a,i,s,u,c;return G().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",t="in",e="out",n="in",o="texture",a="outputColor",i="out vec4 outputColor;",s=`
      bool isnan_custom(float val) {
        return (val > 0.0 || val < 0.0) ? false : val != 0.0;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `,u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(r="",t="attribute",e="varying",n="varying",o="texture2D",a="gl_FragColor",i="",s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:r,attribute:t,varyingVs:e,varyingFs:n,texture2D:o,output:a,defineOutput:i,defineSpecialNaN:s,defineSpecialInf:u,defineRound:c}}function Wn(r,t,e){e===void 0&&(e="index");var n=nn(t);return n.map(function(o,a){return"int "+r[a]+" = "+e+" / "+o+"; "+(a===n.length-1?"int "+r[a+1]+" = "+e+" - "+r[a]+" * "+o:"index -= "+r[a]+" * "+o)+";"}).join("")}function mi(r){var t=nn(r).map(function(e){return e.toString()});return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * `+t[0]+" + coords.y * "+t[1]+` + coords.z;
  }
`}var Qu=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;function Kh(r,t,e,n){var o=[];r.forEach(function(d){var p=ae(d.shapeInfo.logicalShape);d.shapeInfo.isUniform?o.push("uniform float "+d.name+(p>1?"["+p+"]":"")+";"):(o.push("uniform sampler2D "+d.name+";"),o.push("uniform int offset"+d.name+";"))});var a,i,s=o.join(`
`),u=r.map(function(d){return function(p,m,v){v===void 0&&(v=!1);var g="";g+=v?Zu(p):tr(p);var b=p.shapeInfo.logicalShape,x=m.logicalShape;return b.length<=x.length&&(g+=v?function(y,w){var _,S=y.name,E=S.charAt(0).toUpperCase()+S.slice(1),k="get"+E+"AtOutCoords",I=y.shapeInfo.logicalShape.length,T=w.logicalShape.length,D=Cn(y.shapeInfo.logicalShape,w.logicalShape),U=ze(T),V=T-I,z=["x","y","z","w","u","v"];_=I===0?"":T<2&&D.length>=1?"coords = 0;":D.map(function(ne){return"coords."+z[ne+V]+" = 0;"}).join(`
`);var O="";O=T<2&&I>0?"coords":y.shapeInfo.logicalShape.map(function(ne,ce){return"coords."+z[ce+V]}).join(", ");var P="return outputValue;",q=ae(y.shapeInfo.logicalShape)===1,j=ae(w.logicalShape)===1;if(I!==1||q||j){if(q&&!j)P=T===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(D.length){var K=I-2,J=I-1;D.indexOf(K)>-1&&D.indexOf(J)>-1?P="return vec4(outputValue.x);":D.indexOf(K)>-1?P="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":D.indexOf(J)>-1&&(P="return vec4(outputValue.xx, outputValue.zz);")}}else P=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 `+k+`() {
      `+U+` coords = getOutputCoords();
      `+_+`
      vec4 outputValue = get`+E+"("+O+`);
      `+P+`
    }
  `}(p,m):function(y,w){var _=y.name,S=_.charAt(0).toUpperCase()+_.slice(1),E="get"+S+"AtOutCoords",k=w.texShape,I=y.shapeInfo.texShape,T=y.shapeInfo.logicalShape.length,D=w.logicalShape.length;if(!y.shapeInfo.isUniform&&T===D&&y.shapeInfo.flatOffset==null&&it(I,k))return`
      float `+E+`() {
        return sampleTexture(`+_+`, resultUV);
      }
    `;var U,V=ze(D),z=Cn(y.shapeInfo.logicalShape,w.logicalShape),O=D-T,P=["x","y","z","w","u","v"];U=T===0?"":D<2&&z.length>=1?"coords = 0;":z.map(function(j){return"coords."+P[j+O]+" = 0;"}).join(`
`);var q="";return q=D<2&&T>0?"coords":y.shapeInfo.logicalShape.map(function(j,K){return"coords."+P[K+O]}).join(", "),`
    float `+E+`() {
      `+V+` coords = getOutputCoords();
      `+U+`
      return get`+S+"("+q+`);
    }
  `}(p,m)),g}(d,t,n)}).join(`
`),c=t.texShape,l=pt(),f=function(d){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return `+d.texture2D+`(textureSampler, uv).r;
    }
  `}(l),h=function(d){return d.version+`
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    `+d.varyingFs+` vec2 resultUV;
    `+d.defineOutput+`
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    `+d.defineSpecialNaN+`
    `+d.defineSpecialInf+`
    `+d.defineRound+`

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    `+Xh+`
    `+$h+`
    `+Yh+`
  `}(l);return t.isPacked?(a=function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return function(y,w){var _=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];return _[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * `+_[1]+`.0);
      }
    `:_[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * `+_[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+_[0]+", "+_[1]+`));
      return 2 * (resTexRC.x * `+_[1]+` + resTexRC.y);
    }
  `}(0,p);case 2:return function(y,w){var _=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];if(it(y,w))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(`+_[0]+", "+_[1]+`));
      }
    `;var S=Math.ceil(y[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+_[0]+", "+_[1]+`));

      int index = resTexRC.x * `+_[1]+` + resTexRC.y;
      int r = 2 * (index / `+S+`);
      int c = imod(index, `+S+`) * 2;

      return ivec2(r, c);
    }
  `}(d,p);case 3:return m=d,v=p,g=[Math.ceil(v[0]/2),Math.ceil(v[1]/2)],b=Math.ceil(m[2]/2),x=b*Math.ceil(m[1]/2),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+g[0]+", "+g[1]+`));
      int index = resTexRC.x * `+g[1]+` + resTexRC.y;

      int b = index / `+x+`;
      index -= b * `+x+`;

      int r = 2 * (index / `+b+`);
      int c = imod(index, `+b+`) * 2;

      return ivec3(b, r, c);
    }
  `;default:return function(y,w){for(var _=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)],S=Math.ceil(y[y.length-1]/2),E=S*Math.ceil(y[y.length-2]/2),k=E,I="",T="b, r, c",D=2;D<y.length-1;D++)k*=y[y.length-D-1],I=`
      int b`+D+" = index / "+k+`;
      index -= b`+D+" * "+k+`;
    `+I,T="b"+D+", "+T;return`
    ivec`+y.length+` getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+_[0]+", "+_[1]+`));
      int index = resTexRC.x * `+_[1]+` + resTexRC.y;

      `+I+`

      int b = index / `+E+`;
      index -= b * `+E+`;

      int r = 2 * (index / `+S+`);
      int c = imod(index, `+S+`) * 2;

      return ivec`+y.length+"("+T+`);
    }
  `}(d,p)}var m,v,g,b,x}(t.logicalShape,c),i=function(d){return`
    void setOutput(vec4 val) {
      `+d.output+` = val;
    }
  `}(l)):(a=function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return function(g,b){return b[0]===1?`
      int getOutputCoords() {
        return int(resultUV.x * `+b[1]+`.0);
      }
    `:b[1]===1?`
      int getOutputCoords() {
        return int(resultUV.y * `+b[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+b[0]+", "+b[1]+`));
      return resTexRC.x * `+b[1]+` + resTexRC.y;
    }
  `}(0,p);case 2:return function(g,b){return it(g,b)?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(`+b[0]+", "+b[1]+`));
      }
    `:g[1]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+b[0]+", "+b[1]+`));
        int index = resTexRC.x * `+b[1]+` + resTexRC.y;
        return ivec2(index, 0);
      }
    `:g[0]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+b[0]+", "+b[1]+`));
        int index = resTexRC.x * `+b[1]+` + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+b[0]+", "+b[1]+`));
      int index = resTexRC.x * `+b[1]+` + resTexRC.y;
      int r = index / `+g[1]+`;
      int c = index - r * `+g[1]+`;
      return ivec2(r, c);
    }
  `}(d,p);case 3:return m=p,v=Wn(["r","c","d"],d),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+m[0]+", "+m[1]+`));
      int index = resTexRC.x * `+m[1]+` + resTexRC.y;
      `+v+`
      return ivec3(r, c, d);
    }
  `;case 4:return function(g,b){var x=Wn(["r","c","d","d2"],g);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+b[0]+", "+b[1]+`));
      int index = resTexRC.x * `+b[1]+` + resTexRC.y;
      `+x+`
      return ivec4(r, c, d, d2);
    }
  `}(d,p);case 5:return function(g,b){var x=Wn(["r","c","d","d2","d3"],g);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(`+b[0]+`,
                             `+b[1]+`));

      int index = resTexRC.x * `+b[1]+` + resTexRC.y;

      `+x+`

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}(d,p);case 6:return function(g,b){var x=Wn(["r","c","d","d2","d3","d4"],g);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+b[0]+", "+b[1]+`));
      int index = resTexRC.x * `+b[1]+` + resTexRC.y;

      `+x+`

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}(d,p);default:throw new Error(d.length+"-D output sampling is not yet supported")}var m,v}(t.logicalShape,c),i=function(d){return`
    void setOutput(float val) {
      `+d.output+` = vec4(val, 0, 0, 0);
    }
  `}(l)),n&&(h+=Jh),[h,f,i,s,a,u,e].join(`
`)}function tr(r){var t=r.shapeInfo.logicalShape;switch(t.length){case 0:return function(e){var n=e.name,o="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return"float "+o+"() {return "+n+";}";var a=e.shapeInfo.texShape,i=a[0],s=a[1];if(i===1&&s===1)return`
      float `+o+`() {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=e.shapeInfo.texShape,c=u[0],l=u[1],f=Mn(n);return`
    float `+o+`() {
      vec2 uv = uvFromFlat(`+c+", "+l+", "+f+`);
      return sampleTexture(`+n+`, uv);
    }
  `}(r);case 1:return function(e){var n=e.name,o="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float `+o+`(int index) {
        `+Jn(e)+`
      }
    `;var a=e.shapeInfo.texShape,i=a[0],s=a[1];if(s===1&&i===1)return`
      float `+o+`(int index) {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=Mn(n);return s===1?`
      float `+o+`(int index) {
        vec2 uv = vec2(0.5, (float(index + `+u+") + 0.5) / "+i+`.0);
        return sampleTexture(`+n+`, uv);
      }
    `:i===1?`
      float `+o+`(int index) {
        vec2 uv = vec2((float(index + `+u+") + 0.5) / "+s+`.0, 0.5);
        return sampleTexture(`+n+`, uv);
      }
    `:`
    float `+o+`(int index) {
      vec2 uv = uvFromFlat(`+i+", "+s+", index + "+u+`);
      return sampleTexture(`+n+`, uv);
    }
  `}(r);case 2:return function(e){var n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=e.shapeInfo.texShape;if(i!=null&&it(n,i)){var s=i[0],u=i[1];return`
    float `+a+`(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(`+u+".0, "+s+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `}var c=Ln(n),l=c.newShape,f=c.keptDims,h=l;if(h.length<n.length){var d=nr(e,h);return`
      `+tr(d)+`
      float `+a+`(int row, int col) {
        return `+a+"("+rr(["row","col"],f)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+a+`(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(`+n[1]+`, 1)));
        `+Jn(e)+`
      }
    `;var p=i[0],m=i[1],v=Mn(o);return m===1?`
    float `+a+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / `+p+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `:p===1?`
    float `+a+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2((index + 0.5) / `+m+`.0, 0.5);
      return sampleTexture(`+o+`, uv);
    }
  `:`
  float `+a+`(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * `+n[1]+" + col + "+v+`;
    vec2 uv = uvFromFlat(`+p+", "+m+`, index);
    return sampleTexture(`+o+`, uv);
  }
`}(r);case 3:return function(e){var n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[1]*n[2],s=n[2],u=Ln(n),c=u.newShape,l=u.keptDims,f=c;if(f.length<n.length){var h=nr(e,f);return`
        `+tr(h)+`
        float `+a+`(int row, int col, int depth) {
          return `+a+"("+rr(["row","col","depth"],l)+`);
        }
      `}if(e.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(`+i+", "+s+`, 1)));
        `+Jn(e)+`
      }
    `;var d=e.shapeInfo.texShape,p=d[0],m=d[1],v=e.shapeInfo.flatOffset;if(m===i&&v==null)return`
        float `+a+`(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(`+s+`, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(`+m+".0, "+p+`.0);
          return sampleTexture(`+o+`, uv);
        }
      `;if(m===s&&v==null)return`
    float `+a+`(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(`+n[1]+`, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+m+".0, "+p+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `;var g=Mn(o);return`
      float `+a+`(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * `+i+" + col * "+s+" + depth + "+g+`;
        vec2 uv = uvFromFlat(`+p+", "+m+`, index);
        return sampleTexture(`+o+`, uv);
      }
  `}(r);case 4:return function(e){var n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[3],s=n[2]*i,u=n[1]*s,c=Ln(n),l=c.newShape,f=c.keptDims;if(l.length<n.length){var h=nr(e,l);return`
      `+tr(h)+`
      float `+a+`(int row, int col, int depth, int depth2) {
        return `+a+"("+rr(["row","col","depth","depth2"],f)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(`+u+", "+s+", "+i+`, 1)));
        `+Jn(e)+`
      }
    `;var d=e.shapeInfo.flatOffset,p=e.shapeInfo.texShape,m=p[0],v=p[1];if(v===u&&d==null)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(`+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(v===i&&d==null)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(`+n[1]*n[2]+", "+n[2]+`, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var g=Mn(o);return`
    float `+a+`(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+u+" + col * "+s+` +
          depth * `+i+` + depth2;
      vec2 uv = uvFromFlat(`+m+", "+v+", index + "+g+`);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);case 5:return function(e){var n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[4],s=n[3]*i,u=n[2]*s,c=n[1]*u,l=Ln(n),f=l.newShape,h=l.keptDims;if(f.length<n.length){var d=nr(e,f);return`
      `+tr(d)+`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        return `+a+"("+rr(["row","col","depth","depth2","depth3"],h)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(`+c+", "+u+", "+s+", "+i+`)) +
          depth3;
        `+Jn(e)+`
      }
    `;var p=e.shapeInfo.flatOffset,m=e.shapeInfo.texShape,v=m[0],g=m[1];if(g===c&&p==null)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(`+u+", "+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(g===i&&p==null)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]+`,
               `+n[2]*n[3]+", "+n[3]+`, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var b=Mn(o);return`
    float `+a+`(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+c+" + col * "+u+" + depth * "+s+` +
          depth2 * `+i+" + depth3 + "+b+`;
      vec2 uv = uvFromFlat(`+v+", "+g+`, index);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);case 6:return function(e){var n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=Ln(n),s=i.newShape,u=i.keptDims;if(s.length<n.length){var c=nr(e,s);return`
      `+tr(c)+`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return `+a+"("+rr(["row","col","depth","depth2","depth3","depth4"],u)+`);
      }
    `}var l=n[5],f=n[4]*l,h=n[3]*f,d=n[2]*h,p=n[1]*d;if(e.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(`+p+", "+d+", "+h+", "+f+`)) +
          dot(
            vec2(depth3, depth4),
            vec2(`+l+`, 1)));
        `+Jn(e)+`
      }
    `;var m=e.shapeInfo.flatOffset,v=e.shapeInfo.texShape,g=v[0],b=v[1];if(b===p&&m==null)return`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(`+d+", "+h+", "+f+", "+l+`)) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+b+".0, "+g+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(b===l&&m==null)return`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]*n[4]+`,
               `+n[2]*n[3]*n[4]+`,
               `+n[3]*n[4]+`,
               `+n[4]+`)) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+b+".0, "+g+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var x=Mn(o);return`
    float `+a+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+p+" + col * "+d+" + depth * "+h+` +
          depth2 * `+f+" + depth3 * "+l+" + depth4 + "+x+`;
      vec2 uv = uvFromFlat(`+g+", "+b+`, index);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);default:throw new Error(t.length+"-D input sampling is not yet supported")}}function Zu(r){var t,e,n;switch(r.shapeInfo.logicalShape.length){case 0:return t=r.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),n=pt(),`
    vec4 `+e+`() {
      return `+n.texture2D+"("+t+`, halfCR);
    }
  `;case 1:return function(o){var a=o.name,i="get"+a.charAt(0).toUpperCase()+a.slice(1),s=o.shapeInfo.texShape,u=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],c=pt();return`
    vec4 `+i+`(int index) {
      vec2 uv = packedUVfrom1D(
        `+u[0]+", "+u[1]+`, index);
      return `+c.texture2D+"("+a+`, uv);
    }
  `}(r);case 2:return function(o){var a=o.shapeInfo.logicalShape,i=o.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=o.shapeInfo.texShape,c=u[0],l=u[1],f=pt();if(u!=null&&it(a,u))return`
      vec4 `+s+`(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(`+l+".0, "+c+`.0);

        return `+f.texture2D+"("+i+`, uv);
      }
    `;var h=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],d=Math.ceil(a[1]/2);return`
    vec4 `+s+`(int row, int col) {
      vec2 uv = packedUVfrom2D(`+d+", "+h[0]+", "+h[1]+`, row, col);
      return `+f.texture2D+"("+i+`, uv);
    }
  `}(r);case 3:return function(o){var a=o.shapeInfo.logicalShape,i=o.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=o.shapeInfo.texShape,c=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];if(a[0]===1){var l=a.slice(1),f=nr(o,l);return`
        `+Zu(f)+`
        vec4 `+s+`(int b, int row, int col) {
          return `+s+"("+rr(["b","row","col"],[1,2])+`);
        }
      `}var h=c[0],d=c[1],p=Math.ceil(a[2]/2),m=p*Math.ceil(a[1]/2),v=pt();return`
    vec4 `+s+`(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        `+h+", "+d+", "+m+", "+p+`, b, row, col);
      return `+v.texture2D+"("+i+`, uv);
    }
  `}(r);default:return function(o){for(var a=o.shapeInfo.logicalShape,i=a.length,s=o.name,u="get"+s.charAt(0).toUpperCase()+s.slice(1),c=o.shapeInfo.texShape,l=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],f=l[0],h=l[1],d=Math.ceil(a[i-1]/2),p=d*Math.ceil(a[i-2]/2),m="int b, int row, int col",v="b * "+p+" + (row / 2) * "+d+" + (col / 2)",g=2;g<i-1;g++)m="int b"+g+", "+m,p*=a[i-g-1],v="b"+g+" * "+p+" + "+v;var b=pt();return`
    vec4 `+u+"("+m+`) {
      int index = `+v+`;
      int texR = index / `+h+`;
      int texC = index - texR * `+h+`;
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+h+", "+f+`);
      return `+b.texture2D+"("+s+`, uv);
    }
  `}(r)}}var Xh=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,$h=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Yh=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Jh=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function Mn(r){return"offset"+r}function Jn(r){var t=r.name,e=ae(r.shapeInfo.logicalShape);return e<2?"return "+t+";":`
    for (int i = 0; i < `+e+`; i++) {
      if (i == index) {
        return `+t+`[i];
      }
    }
  `}function ze(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error("GPU for rank "+r+" is not yet supported")}function nr(r,t){var e=JSON.parse(JSON.stringify(r));return e.shapeInfo.logicalShape=t,e}function rr(r,t){return t.map(function(e){return r[e]}).join(", ")}var Qh=function(r,t,e,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,R(r.length>2,function(){return"Packed arg"+(e.charAt(0).toUpperCase()+e.slice(1))+" supports only inputs with rank above 2."});var o=r[r.length-1],a=Math.ceil(o/t);this.outputShape=r.slice(0,-1),a>1&&this.outputShape.push(a),n||this.variableNames.push("bestIndicesA");var i,s,u=this.outputShape,c=u.length,l=ze(c),f=_t("coords",c);if(a===1){var h=ze(s=c+1);i=`
        `+h+" sourceLocR = "+h+"("+f.join()+`, 0);
        ++`+f[c-1]+`;
        `+h+" sourceLocG = "+h+"("+f.join()+`, 0);
        ++`+f[c-2]+`;
        `+h+" sourceLocA = "+h+"("+f.join()+`, 0);
        --`+f[c-1]+`;
        `+h+" sourceLocB = "+h+"("+f.join()+`, 0);
        --`+f[c-2]+";"}else s=c,i=`
        `+l+` sourceLocR = coords;
        ++`+f[c-1]+`;
        `+l+` sourceLocG = coords;
        ++`+f[c-2]+`;
        `+l+` sourceLocA = coords;
        --`+f[c-1]+`;
        `+l+` sourceLocB = coords;
        --`+f[c-2]+";";var d=["x","y","z","w","u","v"].slice(0,s),p="."+d[s-1],m=d.map(function(E){return"int "+E}),v=_t("sourceLocR",s-1).concat("inIdx.r"),g=_t("sourceLocG",s-1).concat("inIdx.g"),b=_t("sourceLocB",s-1).concat("inIdx.b"),x=_t("sourceLocA",s-1).concat("inIdx.a"),y=e==="max"?"greaterThan":"lessThan",w=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(`+v.join()+`),
                             getBestIndicesAChannel(`+g.join()+`),
                             getBestIndicesAChannel(`+b.join()+`),
                             getBestIndicesAChannel(`+x.join()+")));",_=`vec4(
            getAChannel(`+v.join()+`),
            hasNextCol ? getAChannel(`+g.join()+`) : 0.,
            hasNextRow ? getAChannel(`+b.join()+`) : 0.,
            hasNextRow && hasNextCol ? getAChannel(`+x.join()+") : 0.)",S=n?"":`
      float getBestIndicesAChannel(`+m.join()+`) {
        return getChannel(getBestIndicesA(`+d.join()+`),
                                          vec2(`+d.slice(-2).join()+`));
      }`;this.userCode=`
      float getAChannel(`+m.join()+`) {
        return getChannel(getA(`+d.join()+`),
                               vec2(`+d.slice(-2).join()+`));
      }
      `+S+`
      void main() {
        `+l+` coords = getOutputCoords();
        bool hasNextCol = `+f[c-1]+" < "+(u[c-1]-1)+`;
        bool hasNextRow = `+f[c-2]+" < "+(u[c-2]-1)+`;
        `+i+`
        ivec4 srcIdx = ivec4(sourceLocR`+p+", sourceLocG"+p+`,
          sourceLocB`+p+", sourceLocA"+p+") * "+t+`;
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = `+_+`;

        for (int i = 0; i < `+t+`; i++) {
          inIdx = srcIdx;
          `+w+`
          vec4 candidate = `+_+`;
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(`+y+`(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `},Zh=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterHeight,u=r.effectiveFilterWidth,c=s-1-r.padInfo.top,l=u-1-r.padInfo.left,f=1/(t*e);this.userCode=`
      const ivec2 pads = ivec2(`+c+", "+l+`);
      const float avgMultiplier = float(`+f+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+s+`;
            wR += `+a+`) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+u+`;
            wC+= `+i+`) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `},ed=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var t=r.filterDepth,e=r.filterHeight,n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,f=r.effectiveFilterHeight,h=r.effectiveFilterWidth,d=l-1-r.padInfo.front,p=f-1-r.padInfo.top,m=h-1-r.padInfo.left,v=1/(t*e*n);this.userCode=`
      const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);
      const float avgMultiplier = float(`+v+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          float dyD = float(dyDCorner + wD) / `+o+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+f+`;
              wR += `+u+`) {
            float dyR = float(dyRCorner + wR) / `+a+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+h+`;
                wC += `+c+`) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `},td=function(r,t,e,n,o,a){this.outputShape=[],this.variableNames=["x","mean","variance"],Ae(r,t),Ae(r,e);var i="0.0";n!=null&&(Ae(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="1.0";o!=null&&(Ae(r,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = `+i+`;
        float scale = `+s+`;
        float inv = scale * inversesqrt(variance + float(`+a+`));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `},nd=function(r,t,e,n,o,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],Ae(r,t),Ae(r,e);var i="vec4(0.0)";n!=null&&(Ae(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="vec4(1.0)";o!=null&&(Ae(r,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        vec4 offset = `+i+`;
        vec4 scale = `+s+`;

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(`+a+`));

        setOutput((x - mean) * inv + offset);
      }
    `},rd="return areal * breal - aimag * bimag;",od="return areal * bimag + aimag * breal;",Es=function(r,t,e){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=Ae(t,e),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        `+r+`
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `},da="return a + b;",pa="return a - b;",ks="return a * b;",ec="return (a < 0.) ? b * a : a;",Ke=function(r,t,e){this.variableNames=["A","B"],this.outputShape=Ae(t,e),this.userCode=`
      float binaryOperation(float a, float b) {
        `+r+`
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `},tc=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,fn=function(r,t,e,n){n===void 0&&(n=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=Ae(t,e);var o=this.outputShape.length,a="";if(n)if(o===0||ae(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          `+ze(o)+` coords = getOutputCoords();
        `,o===1)a+=`
            result.y = (coords + 1) >= `+this.outputShape[0]+` ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{var i=_t("coords",o);a+=`
            bool nextRowOutOfBounds =
              (`+i[o-2]+" + 1) >= "+this.outputShape[o-2]+`;
            bool nextColOutOfBounds =
              (`+i[o-1]+" + 1) >= "+this.outputShape[o-1]+`;
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        `+r+`
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        `+a+`

        setOutput(result);
      }
    `},ad=function(){function r(t){this.variableNames=["A"],this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}return r.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(o,a){n.minLoc==null&&(n.minLoc=o.getUniformLocationNoThrow(a,"minVal"),n.maxLoc=o.getUniformLocationNoThrow(a,"maxVal")),o.gl.uniform1f(n.minLoc,t),o.gl.uniform1f(n.maxLoc,e)}},r}(),id=function(){function r(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}return r.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(o,a){n.minLoc==null&&(n.minLoc=o.getUniformLocationNoThrow(a,"minVal"),n.maxLoc=o.getUniformLocationNoThrow(a,"maxVal")),o.gl.uniform1f(n.minLoc,t),o.gl.uniform1f(n.maxLoc,e)}},r}(),sd=function(r){this.variableNames=["real","imag"],this.outputShape=r,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `},ud=function(r){this.outputShape=[],this.outputShape=mr(r,1),this.variableNames=r.map(function(s,u){return"T"+u});var t=new Array(r.length-1);t[0]=r[0][1];for(var e=1;e<t.length;e++)t[e]=t[e-1]+r[e][1];var n=["if (yC < "+t[0]+") setOutput(getT0(yR, yC));"];for(e=1;e<t.length;e++){var o=t[e-1];n.push("else if (yC < "+t[e]+") setOutput(getT"+e+"(yR, yC-"+o+"));")}var a=t.length,i=t[t.length-1];n.push("else setOutput(getT"+a+"(yR, yC-"+i+"));"),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        `+n.join(`
        `)+`
      }
    `},cd=function(r,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=mr(r,t);var e=this.outputShape,n=e.length,o=ze(n),a=_t("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=r.map(function(v,g){return"T"+g});var s=new Array(r.length-1);s[0]=r[0][t];for(var u=1;u<s.length;u++)s[u]=s[u-1]+r[u][t];var c=i[t],l=i.slice(-2),f=i.join(),h="if ("+c+" < "+s[0]+`) {
        return getChannel(
            getT0(`+f+"), vec2("+l.join()+`));
        }`;for(u=1;u<s.length;u++){var d=s[u-1];h+=`
        if (`+c+" < "+s[u]+"  && "+c+" >= "+s[u-1]+`) {
          return getChannel(
            getT`+u+"("+Zr(i,c,d)+`),
            vec2(`+Zr(l,c,d)+`));
        }`}var p=s.length,m=s[s.length-1];h+=`
        return getChannel(
          getT`+p+"("+Zr(i,c,m)+`),
          vec2(`+Zr(l,c,m)+"));",this.userCode=`
      float getValue(`+i.map(function(v){return"int "+v})+`) {
        `+h+`
      }

      void main() {
        `+o+` coords = getOutputCoords();
        vec4 result = vec4(getValue(`+a+`), 0., 0., 0.);

        `+a[n-1]+" = "+a[n-1]+` + 1;
        if (`+a[n-1]+" < "+e[n-1]+`) {
          result.g = getValue(`+a+`);
        }

        `+a[n-2]+" = "+a[n-2]+` + 1;
        if (`+a[n-2]+" < "+e[n-2]+`) {
          result.a = getValue(`+a+`);
        }

        `+a[n-1]+" = "+a[n-1]+` - 1;
        if (`+a[n-2]+" < "+e[n-2]+` &&
            `+a[n-1]+" < "+e[n-1]+`) {
          result.b = getValue(`+a+`);
        }
        setOutput(result);
      }
    `};function Zr(r,t,e){var n=r.indexOf(t);return r.map(function(o,a){return a===n?o+" - "+e:o}).join()}var ld=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideHeight,e=r.strideWidth,n=r.padInfo.top,o=r.padInfo.left,a=r.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+o+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              if (`+a+`) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},fd=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=r.dataFormat==="channelsLast",i=t-1-r.padInfo.top,s=e-1-r.padInfo.left,u=a?1:2,c=a?2:3,l=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[`+l+`];

        ivec2 dyCorner = ivec2(coords[`+u+"], coords["+c+`]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {

              if (`+a+`) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},hd=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideDepth,e=r.strideHeight,n=r.strideWidth,o=r.padInfo.front,a=r.padInfo.top,i=r.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yF = 0; yF < `+r.outDepth+`; yF++) {
            int xF = wF + yF * `+t+" - "+o+`;

            if (xF < 0 || xF >= `+r.inDepth+`) {
              continue;
            }

            for (int yR = 0; yR < `+r.outHeight+`; yR++) {
              int xR = wR + yR * `+e+" - "+a+`;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int yC = 0; yC < `+r.outWidth+`; yC++) {
                int xC = wC + yC * `+n+" - "+i+`;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},dd=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterDepth,e=r.filterHeight,n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=t-1-r.padInfo.front,u=e-1-r.padInfo.top,c=n-1-r.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(`+s+", "+u+", "+c+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < `+t+`; wF++) {
          float dyF = float(dyFCorner + wF) / `+o+`.0;

          if (dyF < 0.0 || dyF >= `+r.outDepth+`.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = `+t+` - 1 - wF;

          for (int wR = 0; wR < `+e+`; wR++) {
            float dyR = float(dyRCorner + wR) / `+a+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = `+e+` - 1 - wR;

            for (int wC = 0; wC < `+n+`; wC++) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = `+n+` - 1 - wC;

              for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},pd=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideHeight,e=r.strideWidth,n=r.padInfo.top,o=r.padInfo.left,a=r.outChannels/r.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * `+a+` + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+o+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `},vd=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=t-1-r.padInfo.top,i=e-1-r.padInfo.left,s=r.outChannels/r.inChannels;this.userCode=`
      const ivec2 pads = ivec2(`+a+", "+i+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < `+s+`; dm++) {
              int d2 = d1 * `+s+` + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `},Rs=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var o=r.padInfo.top,a=r.padInfo.left,i=r.strideHeight,s=r.strideWidth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterHeight,f=r.filterWidth,h=4*Math.floor(r.inChannels/4),d=r.inChannels%4,p=r.dataFormat==="channelsLast",m=p?1:2,v=p?2:3,g=p?3:1,b="",x="";e&&(b=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,x="result = activation(result);");var y=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+b+`

      const ivec2 strides = ivec2(`+i+", "+s+`);
      const ivec2 pads = ivec2(`+o+", "+a+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[`+g+`];

        ivec2 xRCCorner =
            ivec2(coords[`+m+"], coords["+v+`]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+l+`; wR++) {
          int xR = xRCorner + wR * `+u+`;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+f+`; wC++) {
            int xC = xCCorner + wC * `+c+`;

            if (xC < 0 || xC >= `+r.inWidth+`) {
              continue;
            }

            for (int d1 = 0; d1 < `+h+`; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (`+p+`) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (`+(d===1)+`) {

              if (`+p+`) {
                dotProd +=
                    getX(batch, xR, xC, `+h+`) *
                    getW(wR, wC, `+h+`, d2);
              } else {
                dotProd +=
                    getX(batch, `+h+`, xR, xC) *
                    getW(wR, wC, `+h+`, d2);
              }

            } else if (`+(d===2)+`) {
              vec2 wValues = vec2(
                getW(wR, wC, `+h+`, d2),
                getW(wR, wC, `+h+` + 1, d2)
              );

              if (`+p+`) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, `+h+`),
                  getX(batch, xR, xC, `+h+` + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, `+h+`, xR, xC),
                  getX(batch, `+h+` + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (`+(d===3)+`) {
              vec3 wValues = vec3(
                getW(wR, wC, `+h+`, d2),
                getW(wR, wC, `+h+` + 1, d2),
                getW(wR, wC, `+h+` + 2, d2)
              );

              if (`+p+`) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, `+h+`),
                  getX(batch, xR, xC, `+h+` + 1),
                  getX(batch, xR, xC, `+h+` + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, `+h+`, xR, xC),
                  getX(batch, `+h+` + 1, xR, xC),
                  getX(batch, `+h+` + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        `+y+`
        `+x+`
        setOutput(result);
      }
    `},md=function(r){this.variableNames=["x","W"],this.outputShape=r.outShape;var t=r.padInfo.front,e=r.padInfo.top,n=r.padInfo.left,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterDepth,f=r.filterHeight,h=r.filterWidth,d=4*Math.floor(r.inChannels/4),p=r.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(`+o+", "+a+", "+i+`);
      const ivec3 pads = ivec3(`+t+", "+e+", "+n+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < `+l+`; wF++) {
          int xF = xFCorner + wF * `+s+`;

          if (xF < 0 || xF >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+f+`; wR++) {
            int xR = xRCorner + wR * `+u+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+h+`; wC++) {
              int xC = xCCorner + wC * `+c+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              for (int d1 = 0; d1 < `+d+`; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (`+(p===1)+`) {
                dotProd +=
                  getX(batch, xF, xR, xC, `+d+`) *
                  getW(wF, wR, wC, `+d+`, d2);
              } else if (`+(p===2)+`) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (`+(p===3)+`) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1),
                  getX(batch, xF, xR, xC, `+d+` + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2),
                  getW(wF, wR, wC, `+d+` + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},Is=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var o=r.inHeight,a=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,f=r.dilationWidth,h=r.filterHeight,d=r.filterWidth,p=r.outChannels/r.inChannels,m="",v="";e&&(m=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,v="result = activation(result);");var g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+m+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / `+p+`;
        int q = d2 - d1 * `+p+`;

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < `+h+`; wR++) {
          int xR = xRCorner + wR * `+l+`;

          if (xR < 0 || xR >= `+o+`) {
            continue;
          }

          for (int wC = 0; wC < `+d+`; wC++) {
            int xC = xCCorner + wC * `+f+`;

            if (xC < 0 || xC >= `+a+`) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        `+g+`
        `+v+`
        setOutput(result);
      }
    `},Ss=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r.outShape;for(var o=r.inHeight,a=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,f=r.dilationWidth,h=r.filterHeight,d=r.filterWidth,p=d,m="int xR; int xC; int xCOffset;",v=0;v<h;v++)for(var g=0;g<d;g++)m+=`
          vec4 xTexelR`+v+"C"+2*g+` = vec4(0.);
          vec4 wR`+v+"C"+g+` = vec4(0.);
          vec4 xR`+v+"C"+g+" = vec4(0.);";for(v=0;v<h;v++)for(var b=0;b<p;b++){if(m+=`
          xR = xRCorner + `+v*l+`;
          xC = xCCorner + `+(g=2*b)*f+`;
        `,c===1){if(g<d&&(m+=s%2==1?`
                xCOffset = xC + 1;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+a+`) {
                    xTexelR`+v+"C"+g+`.zw = vec2(0.);
                  }
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + 1 - 2;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+a+`) {
                  vec4 previous = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+a+`) {
                    previous.zw = vec2(0.);
                  }

                  xR`+v+"C"+g+" = vec4(previous.zw, xTexelR"+v+"C"+g+`.xy);
                } else {
                  xR`+v+"C"+g+" = vec4(0, 0, xTexelR"+v+"C"+g+`.xy);
                }
              `:`
                if(xR >= 0 && xR < `+o+" && xC >= 0 && xC < "+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xR`+v+"C"+g+" = xTexelR"+v+"C"+g+`;
              `,g+1<d)){var x=s%2==0?bu(f):f;f%2==0&&s%2==1||f%2!=0&&s%2!=1?(m+=`
                  xCOffset = xC + `+s%2+" + "+x+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+a+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }
                `,f>1&&(m+=`
                    xCOffset -= 2;
                    if(xR >= 0 && xR < `+o+` &&
                      xCOffset >= 0 && xCOffset < `+a+`) {
                      xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                    } else {
                      xTexelR`+v+"C"+g+` = vec4(0.);
                    }
                  `),m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.xy);
                `):m+=`
                  xCOffset = xC + `+x+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+a+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }

                  xR`+v+"C"+(g+1)+" = xTexelR"+v+"C"+(g+2)+`;
                `}}else g<d&&(m+=`
              if(xR >= 0 && xR < `+o+`) {
            `,s%2==1?(m+=`
                xCOffset = xC + 1 - `+c+`;
                if(xCOffset >= 0 && xCOffset < `+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                if(xC + 1 >= 0 && xC + 1 < `+a+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xC + 1, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
              `,g+1<d&&(m+=`
                  vec4 final = vec4(0.);
                  xCOffset = xC + 1 + `+c+`;
                  if(xCOffset >= 0 && xCOffset < `+a+`) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xR`+v+"C"+(g+1)+" = vec4(xTexelR"+v+"C"+(g+2)+`.xy, final.xy);
                `)):(m+=`
                if(xC >= 0 && xC < `+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + `+c+`;
                if(xCOffset >= 0 && xCOffset < `+a+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".xy, xTexelR"+v+"C"+(g+2)+`.xy);
              `,g+1<d&&(m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
                `)),m+="}");g<d&&(m+=`
            vec4 wTexelR`+v+"C"+g+" = getW("+v+", "+g+`, d1, q);
            wR`+v+"C"+g+" = vec4(wTexelR"+v+"C"+g+".xz, wTexelR"+v+"C"+g+`.xz);
          `,g+1<d&&(m+=`
              vec4 wTexelR`+v+"C"+(g+1)+" = getW("+v+", "+(g+1)+`, d1, q);
              wR`+v+"C"+(g+1)+` =
                vec4(wTexelR`+v+"C"+(g+1)+".xz, wTexelR"+v+"C"+(g+1)+".xz);"))}for(v=0;v<h;v++)for(g=0;g<d;g++)m+="dotProd += xR"+v+"C"+g+" * wR"+v+"C"+g+";";var y="",w="";e&&(y=n?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`vec4 activation(vec4 x) {
          `+e+`
        }`,w="result = activation(result);");var _=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+y+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {

        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2;
        int q = 0;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        vec4 dotProd = vec4(0.);

        `+m+`

        vec4 result = dotProd;
        `+_+`
        `+w+`
        setOutput(result);
      }
    `},gd=function(r,t,e,n,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var a=r[0],i=r[1],s=r[2],u=r[3],c=t[0],l=e[0],f=e[1];this.outputShape=[c,l,f,u];var h=n==="bilinear"?1:0,d=[i-1+".0",s-1+".0"],p=d[0],m=d[1],v=l>1?[""+(i-1)/(l-1),"(y2-y1) * height_ratio","y1*"+p+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+p],g=v[0],b=v[1],x=v[2],y=f>1?[""+(s-1)/(f-1),"(x2-x1) * width_ratio","x1*"+m+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+m],w=y[0],_=y[1],S=y[2];this.userCode=`
      const float height_ratio = float(`+g+`);
      const float width_ratio = float(`+w+`);
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= `+a+`) {
          return;
        }

        float height_scale = `+b+`;
        float width_scale = `+_+`;

        float in_y = `+x+`;
        if( in_y < 0.0 || in_y > `+p+` ) {
          setOutput(float(`+o+`));
          return;
        }
        float in_x = `+S+`;
        if( in_x < 0.0 || in_x > `+m+` ) {
          setOutput(float(`+o+`));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(`+h+` == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `},yd=function(r,t,e){this.variableNames=["x"],this.outputShape=r;var n=r.length,o=r[r.length-1],a=e?"<":">";this.userCode=`
      int getIndex(int i) {
        `+(e?"return "+o+" -i - 1;":"return i;")+`
      }

      void main() {
        `+ze(n)+` coords = getOutputCoords();
        int end = `+As(n,"coords")+`;
        float val = 0.0;
        for (int i = `+o+` - 1; i >= 0; i -= 1) {
          int idx = getIndex(i);
          if (idx `+a+` end) {
            continue;
          }
          if (idx == end && `+t+`) {
            continue;
          }
          `+As(n,"coords")+` = idx;
          val += getX(`+function(i,s){if(i===1)return""+s;if(i===2)return s+".x, "+s+".y";if(i===3)return s+".x, "+s+".y, "+s+".z";if(i===4)return s+".x, "+s+".y, "+s+".z, "+s+".w";throw Error("Cumulative sum for rank "+i+" is not yet supported")}(n,"coords")+`);
        }
        setOutput(val);
      }
    `};function As(r,t){if(r===1)return""+t;if(r===2)return t+".y";if(r===3)return t+".z";if(r===4)return t+".w";throw Error("Cumulative sum for rank "+r+" is not yet supported")}var bd=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Fr.DENSE;var t=Sr(r),e=pt();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+Wn(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        `+e.output+` = result;
      }
    `},xd=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Fr.DENSE;var t=Sr(r),e=pt();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+Wn(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        `+e.output+` = result;
      }
    `},wd=function(){function r(t,e,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = `+this.getHeightCoordString()+`;
      int w = `+this.getWidthCoordString()+`;
      int d = `+this.getDepthCoordString()+`;

      int in_h = h / `+e+`;
      int offset_h = imod(h, `+e+`);
      int in_w = w / `+e+`;
      int offset_w = imod(w, `+e+`);
      int offset_d = (offset_h * `+e+` + offset_w) *
        `+this.getOutputDepthSize()+`;
      int in_d = d + offset_d;

      float result = `+this.getInputSamplingString()+`;
      setOutput(result);
    }
  `}return r.prototype.getHeightCoordString=function(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"},r.prototype.getWidthCoordString=function(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"},r.prototype.getDepthCoordString=function(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"},r.prototype.getOutputDepthSize=function(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]},r.prototype.getInputSamplingString=function(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},r}(),_d=function(r){this.variableNames=["X"],this.outputShape=[r,r],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `},Cd=function(r){this.variableNames=["A"],this.outTexUsage=Nt.DOWNLOAD;var t=pt();this.outputShape=r,this.userCode=`
      `+Qu+`

      void main() {
        float x = getAAtOutCoords();
        `+t.output+` = encode_float(x);
      }
    `},Ed=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Nt.DOWNLOAD;var t=pt();this.outputShape=r,this.userCode=`
      `+Qu+`

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        `+t.output+` = encode_float(x);
      }
    `},kd=function(r,t,e){e===void 0&&(e=!1),this.variableNames=["A"];var n=pt(),o=t[0],a=t[1];this.outputShape=r;var i="result";e&&(i="floor(result * 255. + 0.5)"),this.userCode=`
      `+mi(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);
        
        int r = flatIndex / `+a+`;
        int c = imod(flatIndex, `+a+`);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(`+a+".0, "+o+`.0);
        vec4 values = `+n.texture2D+`(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        `+n.output+" = vec4("+i+`, 0., 0., 0.);
      }
    `},Rd=function(r,t,e){e===void 0&&(e=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var n=pt(),o=t[0],a=t[1];this.outputShape=r;var i="",s="result";e&&(s="floor(result * 255. + 0.5)");for(var u=0;u<=1;u++)for(var c=0;c<=1;c++){var l=2*u+c;i+=`
          localCoords = coords;
          if(localCoords[2] + `+c+" < "+r[2]+`) {
            localCoords[2] += `+c+`;
            if(localCoords[1] + `+u+" < "+r[1]+`) {
              localCoords[1] += `+u+`;

              flatIndex = getFlatIndex(localCoords);
              offset = imod(flatIndex, 4);

              flatIndex = idiv(flatIndex, 4, 1.);

              r = flatIndex / `+a+`;
              c = imod(flatIndex, `+a+`);
              uv = (vec2(c, r) + halfCR) / vec2(`+a+".0, "+o+`.0);
              values = `+n.texture2D+`(A, uv);

              if(offset == 0) {
                result[`+l+`] = values[0];
              } else if(offset == 1) {
                result[`+l+`] = values[1];
              } else if(offset == 2) {
                result[`+l+`] = values[2];
              } else {
                result[`+l+`] = values[3];
              }
            }
          }
        `}this.userCode=`
      `+mi(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        vec4 result = vec4(0.);
        int flatIndex, r, c, offset;
        ivec3 localCoords;
        vec2 uv;
        vec4 values;

        `+i+`

        `+n.output+" = "+s+`;
      }
    `},Id="return real * expR - imag * expI;",Sd="return real * expI + imag * expR;",Ds=function(r,t,e){this.variableNames=["real","imag"];var n=t[1];this.outputShape=t;var o=e?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,a=e?n+".0":"1.0";this.userCode=`
      const float exponentMultiplier = `+o+`;

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        `+r+`
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(`+n+`);
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < `+n+`; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / `+a+`;
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `},Ad=function(){function r(t,e){this.outputShape=[],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      uniform float value;
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,o){e.valueLoc==null&&(e.valueLoc=n.getUniformLocationNoThrow(o,"value")),n.gl.uniform1f(e.valueLoc,t)}},r}(),Dd=function(r,t,e){this.variableNames=["A","indices"];var n=r.slice();n[e]=t,this.outputShape=n,this.rank=n.length;var o=ze(this.rank),a=function(i,s){var u=i.length;if(u>4)throw Error("Gather for rank "+u+" is not yet supported");if(u===1)return"int(getIndices(resRC))";for(var c=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],f=0;f<i.length;f++)f===s?l.push("int(getIndices("+c[f]+"))"):l.push(""+c[f]);return l.join()}(r,e);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+a+`));
      }
    `},Td=function(r,t,e){this.sliceDim=r,this.strides=t,this.variableNames=["x","indices"],this.outputShape=e;var n=ze(t.length),o=ze(e.length),a=this.sliceDim>1?"strides[j]":"strides";this.userCode=`
        `+n+" strides = "+n+"("+this.strides+`);
         void main() {
          `+o+` coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < `+this.sliceDim+`; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * `+a+`;
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `};function Nd(r,t){var e=pt();return If(r,t,e.version+`
    precision highp float;
    `+e.attribute+` vec3 clipSpacePos;
    `+e.attribute+` vec2 uv;
    `+e.varyingVs+` vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function Fd(r,t){return Nf(r,t,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Pd(r,t){return Ff(r,t,new Uint16Array([0,1,2,2,1,3]))}function zr(r,t,e,n,o,a,i){Mf(e,n);var s=Pf(r,t),u=r.TEXTURE_2D;return ie(r,t,function(){return r.bindTexture(u,s)}),ie(r,t,function(){return r.texParameteri(u,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)}),ie(r,t,function(){return r.texParameteri(u,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}),ie(r,t,function(){return r.texParameteri(u,r.TEXTURE_MIN_FILTER,r.NEAREST)}),ie(r,t,function(){return r.texParameteri(u,r.TEXTURE_MAG_FILTER,r.NEAREST)}),ie(r,t,function(){return r.texImage2D(u,0,o,e,n,0,a,i,null)}),ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,null)}),s}function Md(r,t,e,n,o){var a=Oo(e,n);return zr(r,t,a[0],a[1],o.internalFormatFloat,o.textureFormatFloat,r.FLOAT)}function Od(r,t,e,n,o){var a=Oo(e,n);return zr(r,t,a[0],a[1],o.internalFormatHalfFloat,o.textureFormatFloat,o.textureTypeHalfFloat)}function Bd(r,t,e,n,o){var a=Oo(e,n);return zr(r,t,a[0],a[1],r.RGBA,r.RGBA,r.UNSIGNED_BYTE)}function Ld(r,t,e,n,o){var a=Ur(e,n);return zr(r,t,a[0],a[1],o.internalFormatPackedFloat,r.RGBA,r.FLOAT)}function Wd(r,t,e,n,o){var a=Ur(e,n);return zr(r,t,a[0],a[1],o.internalFormatPackedHalfFloat,r.RGBA,o.textureTypeHalfFloat)}function Vd(r,t,e,n){return ie(r,t,function(){return r.bindBuffer(r.ARRAY_BUFFER,n)}),gs(r,t,e,"clipSpacePos",n,3,20,0)&&gs(r,t,e,"uv",n,2,20,12)}function Ud(r,t,e,n,o,a,i){var s,u,c;ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,e)}),a instanceof Uint8Array?(s=new Uint8Array(n*o*4),u=r.UNSIGNED_BYTE,c=r.RGBA):(s=new Float32Array(n*o*4),u=r.FLOAT,c=i.internalFormatPackedFloat),s.set(a),ie(r,t,function(){return r.texImage2D(r.TEXTURE_2D,0,c,n,o,0,r.RGBA,u,s)}),ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,null)})}function zd(r,t,e,n){ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,e)}),n.data instanceof Uint8Array?ie(r,t,function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,n.width,n.height,0,r.RGBA,r.UNSIGNED_BYTE,n.data)}):ie(r,t,function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,n)}),ie(r,t,function(){return r.bindTexture(r.TEXTURE_2D,null)})}function Gd(r,t,e,n,o){var a=r.createBuffer();ie(r,t,function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,a)});var i=16*e*n;return ie(r,t,function(){return r.bufferData(r.PIXEL_PACK_BUFFER,i,r.STREAM_READ)}),ie(r,t,function(){return r.readPixels(0,0,n,e,r.RGBA,r.FLOAT,0)}),ie(r,t,function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,null)}),a}function Hd(r,t,e){var n=r,o=new Float32Array(e);return n.bindBuffer(n.PIXEL_PACK_BUFFER,t),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,o),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),o}function qd(r,t,e,n,o){var a=Oo(e,n),i=a[0],s=a[1],u=new Uint8Array(e*n*4);return ie(r,t,function(){return r.readPixels(0,0,i,s,o.downloadTextureFormat,r.UNSIGNED_BYTE,u)}),new Float32Array(u.buffer)}function jd(r,t,e,n,o,a,i,s){var u=r,c=new Float32Array(function(l,f){var h=Ur(l,f);return h[0]*h[1]*4}(a,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}function Kd(r,t,e,n){var o=new Float32Array(e*n*4);return ie(r,t,function(){return r.readPixels(0,0,n,e,r.RGBA,r.FLOAT,o)}),o}var Xd=function(){function r(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var e=G().getNumber("WEBGL_VERSION");t!=null?(this.gl=t,_f(e,t)):this.gl=an(e);var n="WEBGL_color_buffer_float";if(G().getNumber("WEBGL_VERSION")===1){if(this.textureFloatExtension=$r(this.gl,this.debug,"OES_texture_float"),Vt(this.gl,"OES_texture_half_float"))this.textureHalfFloatExtension=$r(this.gl,this.debug,"OES_texture_half_float");else if(G().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),Vt(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=$r(this.gl,this.debug,"EXT_color_buffer_half_float");else if(G().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",Vt(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!Vt(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=Fd(this.gl,this.debug),this.indexBuffer=Pd(this.gl,this.debug),this.framebuffer=Of(this.gl,this.debug),this.textureConfig=ii(this.gl,this.textureHalfFloatExtension)}return Object.defineProperty(r.prototype,"debug",{get:function(){return G().getBool("DEBUG")},enumerable:!0,configurable:!0}),r.prototype.dispose=function(){var t=this;if(!this.disposed){this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var e=this.gl;ie(e,this.debug,function(){return e.finish()}),ie(e,this.debug,function(){return e.bindFramebuffer(e.FRAMEBUFFER,null)}),ie(e,this.debug,function(){return e.deleteFramebuffer(t.framebuffer)}),ie(e,this.debug,function(){return e.bindBuffer(e.ARRAY_BUFFER,null)}),ie(e,this.debug,function(){return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)}),ie(e,this.debug,function(){return e.deleteBuffer(t.indexBuffer)}),this.disposed=!0}},r.prototype.createFloat32MatrixTexture=function(t,e){return this.throwIfDisposed(),Md(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createFloat16MatrixTexture=function(t,e){return this.throwIfDisposed(),Od(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createUnsignedBytesMatrixTexture=function(t,e){return this.throwIfDisposed(),Bd(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.uploadPixelDataToTexture=function(t,e){this.throwIfDisposed(),zd(this.gl,this.debug,t,e)},r.prototype.uploadDenseMatrixToTexture=function(t,e,n,o){this.throwIfDisposed(),Ud(this.gl,this.debug,t,e,n,o,this.textureConfig)},r.prototype.createFloat16PackedMatrixTexture=function(t,e){return this.throwIfDisposed(),Wd(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createPackedMatrixTexture=function(t,e){return this.throwIfDisposed(),Ld(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.deleteMatrixTexture=function(t){var e=this;this.throwIfDisposed(),this.outputTexture===t&&(ys(this.gl,this.debug,this.framebuffer),this.outputTexture=null),ie(this.gl,this.debug,function(){return e.gl.deleteTexture(t)})},r.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(t,e,n){var o=this;return this.downloadMatrixDriver(t,function(){return qd(o.gl,o.debug,e,n,o.textureConfig)})},r.prototype.downloadPackedMatrixFromBuffer=function(t,e,n,o,a,i){return jd(this.gl,t,0,0,0,a,i,this.textureConfig)},r.prototype.downloadFloat32MatrixFromBuffer=function(t,e){return Hd(this.gl,t,e)},r.prototype.createBufferFromTexture=function(t,e,n){this.bindTextureToFrameBuffer(t);var o=Gd(this.gl,this.debug,e,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),o},r.prototype.createAndWaitForFence=function(){var t=this.createFence(this.gl);return this.pollFence(t)},r.prototype.createFence=function(t){var e,n,o=this;if(G().getBool("WEBGL_FENCE_API_ENABLED")){var a=t,i=a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),n=function(){var s=a.clientWaitSync(i,0,0);return s===a.ALREADY_SIGNALED||s===a.CONDITION_SATISFIED},e=i}else G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),n=function(){return o.isQueryAvailable(e,G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):n=function(){return!0};return{query:e,isFencePassed:n}},r.prototype.downloadMatrixFromPackedTexture=function(t,e,n){var o=this;return this.downloadMatrixDriver(t,function(){return Kd(o.gl,o.debug,e,n)})},r.prototype.createProgram=function(t){this.throwIfDisposed();var e=this.gl,n=Sf(e,this.debug,t),o=Nd(e,this.debug),a=Df(e,this.debug);return ie(e,this.debug,function(){return e.attachShader(a,o)}),ie(e,this.debug,function(){return e.attachShader(a,n)}),Tf(e,this.debug,a),this.debug&&ca(e,this.debug,a),this.vertexAttrsAreBound||(this.setProgram(a),this.vertexAttrsAreBound=Vd(e,this.debug,this.program,this.vertexBuffer)),a},r.prototype.deleteProgram=function(t){var e=this;this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&ie(this.gl,this.debug,function(){return e.gl.deleteProgram(t)})},r.prototype.setProgram=function(t){var e=this;this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&ca(this.gl,this.debug,this.program),ie(this.gl,this.debug,function(){return e.gl.useProgram(t)})},r.prototype.getUniformLocation=function(t,e,n){return n===void 0&&(n=!0),this.throwIfDisposed(),n?Lf(this.gl,this.debug,t,e):Wf(this.gl,t,e)},r.prototype.getAttributeLocation=function(t,e){var n=this;return this.throwIfDisposed(),ie(this.gl,this.debug,function(){return n.gl.getAttribLocation(t,e)})},r.prototype.getUniformLocationNoThrow=function(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)},r.prototype.setInputMatrixTexture=function(t,e,n){this.throwIfDisposed(),this.throwIfNoProgram(),Vf(this.gl,this.debug,this.program,t,e,n)},r.prototype.setOutputMatrixTexture=function(t,e,n){this.setOutputMatrixTextureDriver(t,n,e)},r.prototype.setOutputPackedMatrixTexture=function(t,e,n){this.throwIfDisposed();var o=Ur(e,n),a=o[0],i=o[1];this.setOutputMatrixTextureDriver(t,a,i)},r.prototype.setOutputMatrixWriteRegion=function(t,e,n,o){this.setOutputMatrixWriteRegionDriver(n,t,o,e)},r.prototype.setOutputPackedMatrixWriteRegion=function(t,e,n,o){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},r.prototype.debugValidate=function(){this.program!=null&&ca(this.gl,this.debug,this.program),Yr(this.gl)},r.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var t=this.gl;this.debug&&this.debugValidate(),ie(t,this.debug,function(){return t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)})},r.prototype.blockUntilAllProgramsCompleted=function(){var t=this;this.throwIfDisposed(),ie(this.gl,this.debug,function(){return t.gl.finish()})},r.prototype.getQueryTimerExtension=function(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=$r(this.gl,this.debug,G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},r.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},r.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},r.prototype.beginQuery=function(){if(G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){var t=this.gl,e=this.getQueryTimerExtensionWebGL2(),n=t.createQuery();return t.beginQuery(e.TIME_ELAPSED_EXT,n),n}var o=this.getQueryTimerExtensionWebGL1(),a=o.createQueryEXT();return o.beginQueryEXT(o.TIME_ELAPSED_EXT,a),a},r.prototype.endQuery=function(){if(G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")!==2){var t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}else{var e=this.gl,n=this.getQueryTimerExtensionWebGL2();e.endQuery(n.TIME_ELAPSED_EXT)}},r.prototype.waitForQueryAndGetTime=function(t){return re(this,void 0,void 0,function(){var e=this;return oe(this,function(n){switch(n.label){case 0:return[4,fs(function(){return e.disposed||e.isQueryAvailable(t,G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})];case 1:return n.sent(),[2,this.getQueryTime(t,G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}})})},r.prototype.getQueryTime=function(t,e){if(e===0)return null;if(e===2){var n=this.gl;return n.getQueryParameter(t,n.QUERY_RESULT)/1e6}var o=this.getQueryTimerExtensionWebGL1();return o.getQueryObjectEXT(t,o.QUERY_RESULT_EXT)/1e6},r.prototype.isQueryAvailable=function(t,e){if(e===0)return!0;if(e===2){var n=this.gl,o=this.getQueryTimerExtensionWebGL2(),a=n.getQueryParameter(t,n.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),a&&!this.disjoint}return a=(o=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(t,o.QUERY_RESULT_AVAILABLE_EXT),this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),a&&!this.disjoint},r.prototype.pollFence=function(t){var e=this;return new Promise(function(n){e.addItemToPoll(function(){return t.isFencePassed()},function(){return n()})})},r.prototype.pollItems=function(){for(var t=function(n){for(var o=0;o<n.length&&n[o]();++o);return o-1}(this.itemsToPoll.map(function(n){return n.isDoneFn})),e=0;e<=t;++e)(0,this.itemsToPoll[e].resolveFn)();this.itemsToPoll=this.itemsToPoll.slice(t+1)},r.prototype.addItemToPoll=function(t,e){var n=this;this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1||fs(function(){return n.pollItems(),n.itemsToPoll.length===0})},r.prototype.bindTextureToFrameBuffer=function(t){this.throwIfDisposed(),la(this.gl,this.debug,t,this.framebuffer),this.debug&&Yr(this.gl)},r.prototype.unbindTextureToFrameBuffer=function(){this.outputTexture!=null?(la(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&Yr(this.gl)):ys(this.gl,this.debug,this.framebuffer)},r.prototype.downloadMatrixDriver=function(t,e){this.bindTextureToFrameBuffer(t);var n=e();return this.unbindTextureToFrameBuffer(),n},r.prototype.setOutputMatrixTextureDriver=function(t,e,n){this.throwIfDisposed();var o=this.gl;la(o,this.debug,t,this.framebuffer),this.debug&&Yr(o),this.outputTexture=t,ie(o,this.debug,function(){return o.viewport(0,0,e,n)}),ie(o,this.debug,function(){return o.scissor(0,0,e,n)})},r.prototype.setOutputMatrixWriteRegionDriver=function(t,e,n,o){var a=this;this.throwIfDisposed(),ie(this.gl,this.debug,function(){return a.gl.scissor(t,e,n,o)})},r.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},r.prototype.throwIfNoProgram=function(){if(this.program==null)throw new Error("No GPU program is currently set.")},r}();function Ts(r,t){if(r.length!==t.length)throw Error("Binary was compiled with "+r.length+" inputs, but was executed with "+t.length+" inputs");r.forEach(function(e,n){var o=e.logicalShape,a=t[n],i=a.shape;if(!it(o,i))throw Error("Binary was compiled with different shapes than the current args. Shapes "+o+" and "+i+" must match");if(!e.isUniform||!a.isUniform){var s=e.texShape,u=a.isUniform?null:a.texData.texShape;if(!it(s,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+s+" and "+u+" must match")}})}var $d=function(r,t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var n=e.filterWidth,o=e.inChannels,a=e.strideWidth,i=e.strideHeight,s=e.padInfo,u=e.outWidth,c=e.dilationWidth,l=e.dilationHeight,f=e.dataFormat,h=s.left,d=s.top,p=o*n,m=pt(),v=f==="channelsLast",g=v?0:1,b=v?1:2,x="",y=0;y<=1;y++)for(var w=0;w<=1;w++)x+=`
          blockIndex = rc.y + `+w+`;
          pos = rc.x + `+y+`;

          if(blockIndex < `+r[1]+" && pos < "+r[0]+`) {
            offsetY = int(blockIndex / (`+u+")) * "+i+" - "+d+`;
            d0 = offsetY + `+l+" * (pos / "+p+`);

            if(d0 < `+t[g]+` && d0 >= 0) {

              offsetX = int(mod(float(blockIndex), `+u+".) * "+a+". - "+h+`.);
              d1 = offsetX + `+c+" * (int(mod(float(pos), "+p+".) / "+o+`.));

              if(d1 < `+t[b]+` && d1 >= 0) {

                ch = int(mod(float(pos), `+o+`.));

                if (`+v+`) {
                  innerDims = vec2(d1, ch);
                  result[`+(2*y+w)+`] = getChannel(
                    getA(d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[`+(2*y+w)+`] = getChannel(
                    getA(ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec2 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        `+x+`

        `+m.output+` = result;
      }
    `},Yd=function(r,t,e,n,o){this.variableNames=["x"],this.outputShape=[];var a,i=t,s=r[3]-1;this.outputShape=r;var u="float("+e+") + float("+n+") * sum";a=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -`+i+"; j <= "+i+`; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  `+s+`) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * `+a+`;
        setOutput(val);
      }
    `},Jd=function(r,t,e,n,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=r,this.depth=r[3],this.depthRadius=t,this.bias=e,this.alpha=n,this.beta=o,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < `+this.depth+`; ++d) {
          int depthBegin = int(max(0.0, float(d - `+t+`)));
          int depthEnd = int(min(float(`+this.depth+`),
              float(d + `+t+` + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = `+this.depth+`;

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(`+n+") * norm + float("+e+`);

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(`+n+`)
                * float(`+o+`)
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * `+o+`);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `},Qd=function(r,t,e,n,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var a,i=t,s=r[3]-1;this.outputShape=r;var u="float("+e+") + float("+n+") * sum";a=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < `+this.outputShape[3]+`;
        bool hasNextRow = c < `+this.outputShape[2]+`;

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - `+i+`;
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - `+i+"; j <= "+i+`; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(`+s+`));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * `+a+`;
        setOutput(result);
      }
    `},Zd=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var t=r.strideHeight,e=r.strideWidth,n=r.dilationHeight,o=r.effectiveFilterHeight,a=r.effectiveFilterWidth,i=o-1-r.padInfo.top,s=a-1-r.padInfo.left,u=o*a-1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+o+`;
          wR += `+n+`) {
          float dyR = float(dyRCorner + wR) / `+t+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+a+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+e+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = `+u+` - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * `+a+` + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `},ep=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var t=r.strideDepth,e=r.strideHeight,n=r.strideWidth,o=r.dilationDepth,a=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterDepth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=s-1-r.padInfo.front,f=u-1-r.padInfo.top,h=c-1-r.padInfo.left,d=s*u*c-1;this.userCode=`
      const ivec3 pads = ivec3(`+l+", "+f+", "+h+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+s+`;
           wD += `+o+`) {
          float dyD = float(dyDCorner + wD) / `+t+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+u+`;
              wR += `+a+`) {
            float dyR = float(dyRCorner + wR) / `+e+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+c+`;
                wC += `+i+`) {
              float dyC = float(dyCCorner + wC) / `+n+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = `+d+` -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * `+u+" * "+c+` +
                  wR * `+c+` + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `},va=function(r,t,e,n,o,a,i){e===void 0&&(e=!1),n===void 0&&(n=!1),o===void 0&&(o=!1),a===void 0&&(a=null),i===void 0&&(i=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;var s=e?r[1]:r[2],u=Math.ceil(s/2),c=e?"i * 2, rc.y":"rc.y, i * 2",l=n?"rc.z, i * 2":"i * 2, rc.z",f=e?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],h=n?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],d="",p="";a&&(d=i?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+a+`
        }`:`vec4 activation(vec4 x) {
          `+a+`
        }`,p="result = activation(result);");var m=o?"result += getBiasAtOutCoords();":"";o&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+d+`

      const float sharedDimension = `+u+`.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < `+u+`; i++) {
          vec4 a = getMatrixA(rc.x, `+c+`);
          vec4 b = getMatrixB(rc.x, `+l+`);

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (`+f[0]+" * "+h[0]+`);
          result += (`+f[1]+" * "+h[1]+`);
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        `+m+`

        `+p+`

        setOutput(result);
      }
    `},tp=function(){function r(t,e,n){this.variableNames=["probs"],this.outputShape=[t,n],this.userCode=`
      uniform float seed;

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < `+(e-1)+`; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(`+(e-1)+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,o){e.seedLoc==null&&(e.seedLoc=n.getUniformLocation(o,"seed")),n.gl.uniform1f(e.seedLoc,t)}},r}(),np=function(r,t,e,n){this.variableNames=["indices"],this.outputShape=[r,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(`+n+"), float("+e+`),
                      float(index == coords.y)));
      }
    `},rp=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=r;var t=r.length;if(t===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{var e=_t("rc",t),n=ze(t),o=function(s,u,c){if(s===1)return"rc > "+u[0];for(var l="",f=s-2;f<s;f++)l+=c[f]+" >= "+u[f],f<s-1&&(l+="||");return l}(t,r,e),a=function(s,u,c,l){if(s===1)return"";var f=l.slice(-2);return`
    int r = `+f[0]+`;
    int c = `+f[1]+`;
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= `+u+`;
    bool rEdge = rp1 >= `+c+`;
  `}(t,r[r.length-1],r[r.length-2],e),i=function(s,u){var c=s.length,l=function(f,h){for(var d=[],p=0;p<=1;p++)for(var m=0;m<=1;m++){for(var v=(p===0?"r":"rp1")+", "+(m===0?"c":"cp1"),g=2;g<f;g++)v=h[h.length-1-g]+","+v;d.push(v)}return d}(c,u);return c===1?`getA(rc),
            rc + 1 >= `+s[0]+` ? 0. : getA(rc + 1),
            0, 0`:"getA("+l[0]+`),
          cEdge ? 0. : getA(`+l[1]+`),
          rEdge ? 0. : getA(`+l[2]+`),
          rEdge || cEdge ? 0. : getA(`+l[3]+")"}(r,e);this.userCode=`
        void main() {
          `+n+` rc = getOutputCoords();

          if(`+o+`) {
            setOutput(vec4(0));
          } else {
            `+a+`

            setOutput(vec4(`+i+`));
          }
        }
      `}},op=function(r,t,e){this.variableNames=["x"],this.outputShape=t.map(function(u,c){return u[0]+r[c]+u[1]});var n=r.length,o=ze(n),a=t.map(function(u){return u[0]}).join(","),i=t.map(function(u,c){return u[0]+r[c]}).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);this.userCode=n!==1?`
      `+o+" start = "+o+"("+a+`);
      `+o+" end = "+o+"("+i+`);

      void main() {
        `+o+` outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(float(`+e+`));
        } else {
          `+o+` coords = outC - start;
          setOutput(getX(`+s+`));
        }
      }
    `:`
        int start = `+a+`;
        int end = `+i+`;

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(float(`+e+`));
          } else {
            setOutput(getX(outC - start));
          }
        }
      `},ap=function(r,t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map(function(v,g){return v[0]+r[g]+v[1]});for(var n=r.length,o=ze(n),a=t.map(function(v){return v[0]}).join(","),i=t.map(function(v,g){return v[0]+r[g]}).join(","),s=_t("rc",n),u=_t("source",n),c=s[n-1]+" < "+this.outputShape[n-1],l=n===1?"source":"vec2("+u.slice(-2).join()+")",f=[o+" rc = outputLoc;",s[n-1]+` += 1;
       if(`+c+`) {
      `,n===1?"":`}
       rc = outputLoc;
       `+s[n-2]+` += 1;
       if(`+s[n-2]+" < "+this.outputShape[n-2]+") {",n===1?"":"  "+s[n-1]+` += 1;
         if(`+c+") {"],h=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",d="",p=0,m=n===1?2:4;p<m;p++)d+=`
        `+f[p]+`
        if (`+h+`) {
          result[`+p+"] = float("+e+`);
        } else {
          `+o+` source = rc - start;
          result[`+p+"] = getChannel(getX("+u.join()+"), "+l+`);
        }
      `;d+=n===1?"} ":"}}",this.userCode=`
      const `+o+" start = "+o+"("+a+`);
      const `+o+" end = "+o+"("+i+`);

      void main() {
        `+o+` outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        `+d+`
        setOutput(result);
      }
    `},ma=function(r,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,o=r.strideHeight,a=r.strideWidth,i=r.dilationHeight,s=r.dilationWidth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=r.padInfo.top,f=r.padInfo.left;this.outputShape=r.outShape;var h=t==="avg",d="0.0";if(h||(d="-1.0 / 1e-20"),e)this.userCode=`
        const ivec2 strides = ivec2(`+o+", "+a+`);
        const ivec2 pads = ivec2(`+l+", "+f+`);

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < `+u+`;
              wR += `+i+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+c+`;
                wC += `+s+`) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = wR * `+c+` + wC;
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var p=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(p="avgValue / count");var m=4*Math.floor(n/4),v=n%4,g=`
      if (`+h+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(`+o+", "+a+`);
      const ivec2 pads = ivec2(`+l+", "+f+`);
      const float initializationValue = `+d+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+d+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < `+u+`;
            wR += `+i+`) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+m+`; wC += 4) {
            int xC = xCCorner + wC * `+s+`;

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              getValue(batch, xR, xC + 3 * `+s+`, d)
            );

            `+g+`
          }

          int xC = xCCorner + `+m+`;
          if (`+(v===1)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===2)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===3)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              initializationValue
            );

            `+g+`
          }
        }
        setOutput(`+p+`);
      }
    `}},ga=function(r,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,f=r.effectiveFilterHeight,h=r.effectiveFilterWidth,d=r.padInfo.front,p=r.padInfo.top,m=r.padInfo.left;this.outputShape=r.outShape;var v=t==="avg",g="0.0";if(v||(g="-1.0 / 1e-20"),e)this.userCode=`
        const ivec3 strides =
            ivec3(`+o+", "+a+", "+i+`);
        const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < `+l+`;
              wD += `+s+`) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= `+r.inDepth+`) {
              continue;
            }

            for (int wR = 0; wR < `+f+`;
                wR += `+u+`) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int wC = 0; wC < `+h+`;
                  wC += `+c+`) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition =
                      wD * `+f+" * "+h+` +
                      wR * `+h+` + wC;;
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var b=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(b="avgValue / count");var x=4*Math.floor(n/4),y=n%4,w=`
      if (`+v+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(`+o+", "+a+", "+i+`);
      const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);
      const float initializationValue = `+g+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+g+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+f+`;
            wR += `+u+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+x+`; wC += 4) {
              int xC = xCCorner + wC * `+c+`;

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                getValue(batch, xD, xR, xC + 3 * `+c+`, ch)
              );

              `+w+`
            }

            int xC = xCCorner + `+x+`;
            if (`+(y===1)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(y===2)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(y===3)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                initializationValue
              );

              `+w+`
            }
          }
          setOutput(`+b+`);
        }
      }
    `}},ip=function(r,t){this.variableNames=["x"];var e=r.windowSize,n=r.batchSize,o=r.inSize,a=Math.ceil(o/e);this.outputShape=[n,a];var i="0.0",s="";t==="prod"?i="1.0":t==="min"?(i="1.0 / 1e-20",s="min"):t==="max"&&(i="-1.0 / 1e-20",s="max");var u=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="sum"?u="sumValue":t==="prod"?u="prodValue":t==="all"?u="allValue":t==="any"&&(u="anyValue");var c=4*Math.floor(e/4),l=e%4,f=`
      if (`+(t==="sum")+`) {
        sumValue += dot(values, ones);
      } else if (`+(t==="prod")+`) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = `+s+`(values, minMaxValue);
      }
    `,h="vec4";t==="all"?(i="1.0",f=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,h="bvec4"):t==="any"&&(i="0.0",f=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,h="bvec4");var d="";o%e>0&&(d=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = `+i+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        `+d+`
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+e+`;

        vec4 minMaxValue = vec4(`+i+`);
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < `+c+`; i += 4) {
          int inIdx = inOffset + i;
          `+h+" values = "+h+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          `+f+`
        }

        int inIdx = inOffset + `+c+`;
        if (`+(l===1)+`) {
          `+h+" values = "+h+`(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          `+f+`
        } else if (`+(l===2)+`) {
          `+h+" values = "+h+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          `+f+`
        } else if (`+(l===3)+`) {
          `+h+" values = "+h+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          `+f+`
        }
        setOutput(`+u+`);
      }
    `},sp=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var e="",n=0;n<4;n++){var o="thisRC = rc;";n%2==1&&(o+="thisRC.z += 1;"),n>1&&(o+="thisRC.y += 1;"),e+=`
        `+o+`
        `+(n>0?"if(thisRC.y < rows && thisRC.z < cols){":"")+`
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[`+n+`] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        `+(n>0?"}":"")+`
      `}this.userCode=`
      
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      `+Wn(["r","c","d"],t)+`
      return ivec3(r, c, d);
    }
  
      `+mi(r)+`

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = `+r[1]+`;
        int cols = `+r[2]+`;

        `+e+`

        setOutput(result);
      }
    `},up=function(r,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var n=t.shape,o=n[1],a=n[2],i=r.shape,s=i[1],u=i[2],c=[e&&s>1?o-1:o,e&&u>1?a-1:a],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],f=c[0]/l[0],h=c[1]/l[1],d=1/f,p=1/h,m=2*Math.ceil(d)+2,v=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+f+`);
        const float widthScale = float(`+h+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), `+(o-1)+`.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), `+(a-1)+`.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},cp=function(r,t,e,n){this.variableNames=["A"],this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,t,e,s];var u=[n&&t>1?a-1:a,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+a+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `},lp=function(r,t,e,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,t,e,s];var u=[n&&t>1?a-1:a,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`,
          `+u[1]/c[1]+`);
      const vec3 inputShapeRC = vec3(`+a+".0, "+i+`.0,
                                     `+i+`.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < `+(s-1)+`;
        bool hasNextRow = coords.z < `+(e-1)+`;

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `},fp=function(r,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var n=t.shape,o=n[1],a=n[2],i=r.shape,s=i[1],u=i[2],c=[e&&s>1?o-1:o,e&&u>1?a-1:a],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],f=c[0]/l[0],h=c[1]/l[1],d=1/f,p=1/h,m=2*Math.ceil(d)+2,v=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+f+`);
        const float widthScale = float(`+h+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float sourceFracRow =
              float(`+c[0]+`) *
                (float(dyR) / float(`+l[0]+`));

            float sourceFracCol =
                float(`+c[1]+`) *
                  (float(dyC) / float(`+l[1]+`));

            int sourceNearestRow = int(min(
                float(int(`+o+`) - 1),
                `+e+` ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(`+a+`) - 1),
                `+e+` ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},hp=function(r,t,e,n){this.variableNames=["A"],this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,t,e,s];var u=[n&&t>1?a-1:a,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e],l=n?"0.5":"0.0";this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+a+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + `+l+`)));

        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `},dp=function(r,t){this.variableNames=["x"];var e=r.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");if(this.outputShape=r,e!==1){var n=r.map(function(a,i){return function(s){return t.indexOf(s)!==-1&&r[s]!==1?r[s]+" - coords["+s+"] - 1":"coords["+s+"]"}(i)}).join(","),o=ze(e);this.userCode=`
      void main() {
        `+o+` coords = getOutputCoords();
        setOutput(getX(`+n+`));
      }
    `}else this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(`+r[0]+` - coord - 1));
        }
      `},pp=function(r,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var e=r.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");this.outputShape=r;var n=_t("rc",e),o=n[e-1]+" + 1 < "+this.outputShape[e-1],a=n[e-2]+" + 1 < "+this.outputShape[e-2],i=ze(e);function s(u){var c=r.map(function(l,f){return function(h,d){return t.indexOf(h)!==-1&&r[h]!==1?r[h]+" - "+d[h]+" - 1":""+d[h]}(f,u)});return"getChannel(getX("+c.join(",")+"), vec2("+c.slice(-2).join(",")+"))"}this.userCode=e===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(`+r[0]+` - rc - 1),
            `+r[0]+` - rc - 1);
          if(`+o+`){
              result.g = getChannel(getX(`+r[0]+` - (rc  + 1) - 1),
                `+r[0]+` - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          `+i+` rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = `+function(u){return s(u)}(n.slice())+`;
          if(`+o+`){
            result.g = `+function(u){return u[e-1]="("+u[e-1]+" + 1)",s(u)}(n.slice())+`;
          }
          if(`+a+`) {
            result.b = `+function(u){return u[e-2]="("+u[e-2]+" + 1)",s(u)}(n.slice())+`;
            if(`+o+`) {
              result.a = `+function(u){return u[e-1]="("+u[e-1]+" + 1)",u[e-2]="("+u[e-2]+" + 1)",s(u)}(n.slice())+`;
            }
          }
          setOutput(result);
        }
    `},Ns=function(r,t,e,n,o,a,i){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;var s=ze(o.length),u=ze(a.length),c="";e===1?c="i":e===2&&(c="i, j");var l="getIndices("+c+")",f="";n===1?f="i":n===2&&(f="i, coords[1]");var h="getUpdates("+f+")",d=t>1?"strides[j]":"strides";this.userCode=`
        `+s+" strides = "+s+"("+o+`);

        void main() {
          `+u+` coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < `+r+`; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < `+t+`; j++) {
              int index = round(`+l+`);
              flattenedIndex += index * `+d+`;
            }
            if (flattenedIndex == coords[0]) {
              sum += `+h+`;
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `},vp=function(r,t){this.variableNames=["x","segmentIds"];var e=r.windowSize,n=r.batchSize,o=r.inSize,a=r.numSegments,i=a*Math.ceil(o/e);this.outputShape=[n,i];var s=4*Math.floor(e/4),u=e%4,c=`
        sumValue += dot(values, segFilter);
    `,l="";o%e>0&&(l=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `);var f="";o%e>0&&(f=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        `+l+`
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        `+f+`
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          `+a+")) * float("+e+`));
        int currentSeg = int(mod(float(outIdx), float(`+a+`)));

        float sumValue = 0.0;

        for (int i = 0; i < `+s+`; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          `+c+`
        }

        int inIdx = inOffset + `+s+`;
        if (`+(u===1)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          `+c+`
        } else if (`+(u===2)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          `+c+`
        } else if (`+(u===3)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          `+c+`
        }
        setOutput(sumValue);
      }
    `},mp=function(r,t,e){var n,o;if(this.variableNames=["c","a","b"],this.outputShape=t,e>4)throw Error("Where for rank "+e+" is not yet supported");if(e===1)o="resRC",n="resRC";else{for(var a=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],s=[],u=0;u<t.length;u++)s.push(""+a[u]),u<r&&i.push(""+a[u]);n=i.join(),o=s.join()}var c=ze(e);this.userCode=`
      void main() {
        `+c+` resRC = getOutputCoords();
        float cVal = getC(`+n+`);
        if (cVal >= 1.0) {
          setOutput(getA(`+o+`));
        } else {
          setOutput(getB(`+o+`));
        }
      }
    `},gp=function(){function r(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;var e,n=ze(this.rank),o="uniform int start["+this.rank+"];",a=function(i){if(i===1)return"sourceLoc";if(i<=6)return ya.slice(0,i).map(function(s){return"sourceLoc."+s}).join(",");throw Error("Slicing for rank "+i+" is not yet supported")}(this.rank);e=`
        `+n+` sourceLoc;
        `+n+` coords = getOutputCoords();
        `+t.map(function(i,s){return"sourceLoc."+ya[s]+" = start["+s+"] + coords."+ya[s]+";"}).join(`
`)+`
      `,this.userCode=`
      `+o+`
      void main() {
        `+e+`
        setOutput(getSource(`+a+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,o){e.startLoc==null&&(e.startLoc=n.getUniformLocationNoThrow(o,"start"),e.startLoc==null)||n.gl.uniform1iv(e.startLoc,t)}},r}(),ya=["x","y","z","w","u","v"],yp=function(){function r(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length;var e=ze(this.rank),n=_t("coords",this.rank),o=_t("sourceLoc",this.rank),a=this.rank===1?"sourceLoc":"vec2("+o.slice(-2).join()+")",i="getChannel(getSource("+o.join()+"), "+a+")",s=`
      result.x = `+i+`;
      if (++`+n[this.rank-1]+" < "+t[this.rank-1]+`) {
        ++`+o[this.rank-1]+`;
        result.y = `+i+`;
        --`+o[this.rank-1]+`;
      }
    `,u=this.rank===1?"":`
      --`+n[this.rank-1]+`;
      if (++`+n[this.rank-2]+" < "+t[this.rank-2]+`) {
        ++`+o[this.rank-2]+`;
        result.z = `+i+`;
        if (++`+n[this.rank-1]+" < "+t[this.rank-1]+`) {
          ++`+o[this.rank-1]+`;
          result.w = `+i+`;
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            `+e+"("+t.map(function(l,f){return"start["+f+"]"}).join()+");":t.map(function(l,f){return o[f]+" = "+n[f]+" + start["+f+"];"}).join(`
`);this.userCode=`
      uniform int start[`+this.rank+`];
      void main() {
        `+e+` coords = getOutputCoords();
        `+e+` sourceLoc;
        `+c+`
        vec4 result = vec4(0.);
        `+s+`
        `+u+`
        setOutput(result);
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,o){e.startLoc==null&&(e.startLoc=n.getUniformLocationNoThrow(o,"start"),e.startLoc==null)||n.gl.uniform1iv(e.startLoc,t)}},r}(),bp=function(r,t,e){this.variableNames=["x"],this.outputShape=e;var n=e.length,o=ze(e.length),a=ze(e.length),i="";if(n===1)i="coords * strides + begin";else{var s=0;i=e.map(function(u,c){return s++,e.length===1?"coords * strides["+c+"] + begin["+c+"]":"coords["+(s-1)+"] * strides["+c+"] + begin["+c+"]"}).join(",")}this.userCode=`
      `+o+" begin = "+o+"("+r+`);
      `+o+" strides = "+o+"("+t+`);

      void main() {
        `+a+` coords = getOutputCoords();
        setOutput(getX(`+i+`));
      }
    `},xp=function(){function r(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}return r.prototype.acquireTexture=function(t,e,n){var o,a=Fs(e,n),i=Ps(t,a,n);if(i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]),this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this.log();var s=this.freeTextures[i].shift();return this.usedTextures[i].push(s),s}return this.numUsedTextures++,this.log(),a===Tt.PACKED_2X2_FLOAT32?o=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):a===Tt.PACKED_2X2_FLOAT16?o=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):a===Tt.UNPACKED_FLOAT32?o=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):a===Tt.UNPACKED_FLOAT16?o=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):a===Tt.PACKED_4X1_UNSIGNED_BYTE&&(o=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[i].push(o),o},r.prototype.releaseTexture=function(t,e,n,o){if(this.freeTextures!=null){var a=Ps(e,Fs(n,o),o);a in this.freeTextures||(this.freeTextures[a]=[]),this.freeTextures[a].push(t),this.numFreeTextures++,this.numUsedTextures--;var i=this.usedTextures[a],s=i.indexOf(t);if(s<0)throw new Error("Cannot release a texture that was never provided by this texture manager");i.splice(s,1),this.log()}},r.prototype.log=function(){if(this.logEnabled){var t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+t+")")}},r.prototype.getNumUsedTextures=function(){return this.numUsedTextures},r.prototype.getNumFreeTextures=function(){return this.numFreeTextures},r.prototype.dispose=function(){var t=this;if(this.freeTextures!=null){for(var e in this.freeTextures)this.freeTextures[e].forEach(function(n){t.gpgpu.deleteMatrixTexture(n)});for(var e in this.usedTextures)this.usedTextures[e].forEach(function(o){t.gpgpu.deleteMatrixTexture(o)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0}},r}();function Fs(r,t){if(r===Nt.UPLOAD)return Tt.PACKED_2X2_FLOAT32;if(r===Nt.RENDER||r==null)return function(e){return G().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?e?Tt.PACKED_2X2_FLOAT32:Tt.UNPACKED_FLOAT32:e?Tt.PACKED_2X2_FLOAT16:Tt.UNPACKED_FLOAT16}(t);if(r===Nt.DOWNLOAD||r===Nt.PIXELS)return Tt.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+r)}function Ps(r,t,e){return r[0]+"_"+r[1]+"_"+t+"_"+e}var wp=function(r,t){this.variableNames=["A"];for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[n]*t[n];this.outputShape=e,this.rank=e.length;var o=ze(this.rank),a=function(i){var s=i.length;if(s>5)throw Error("Tile for rank "+s+" is not yet supported");if(s===1)return"imod(resRC, "+i[0]+")";for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],c=[],l=0;l<i.length;l++)c.push("imod("+u[l]+", "+i[l]+")");return c.join()}(r);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+a+`));
      }
    `},_p=function(r,t){this.variableNames=["A"];for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[t[n]];this.outputShape=e,this.rank=e.length;var o=ze(this.rank),a=function(i){var s=i.length;if(s>6)throw Error("Transpose for rank "+s+" is not yet supported");for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],c=new Array(s),l=0;l<i.length;l++)c[i[l]]=u[l];return c.join()}(t);this.userCode=`
    void main() {
      `+o+` resRC = getOutputCoords();
      setOutput(getA(`+a+`));
    }
    `},Cp=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[t[n]];if(this.outputShape=e,this.rank=e.length,this.rank>6)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var o=ze(this.rank),a=Ju("rc",this.rank),i=new Array(this.rank);for(n=0;n<t.length;n++)i[t[n]]=a[n];var s="vec2("+i.slice(-2).join()+")",u="++"+a[this.rank-1]+" < "+e[this.rank-1],c="getChannel(getA("+i.join()+"), "+s+")";this.userCode=`
    void main() {
      `+o+` rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = `+c+`;
      if(`+u+`) {
        result[1] = `+c+`;
      }
      --`+a[this.rank-1]+`;
      if(++`+a[this.rank-2]+" < "+e[this.rank-2]+`) {
        result[2] = `+c+`;
        if(`+u+`) {
          result[3] = `+c+`;
        }
      }
      setOutput(result);
    }
    `},gi=1.7580993408473768,yi=1.0507009873554805,Ce=function(r,t){this.variableNames=["A"],this.outputShape=r,this.userCode=`
      float unaryOperation(float x) {
        `+t+`
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `},Xt="if (isnan(x)) return x;",Ep="return x;",Ms="return abs(x);",nc=Xt+`
  return (x < 0.0) ? 0.0 : x;
`,rc=Xt+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,oc="return (x >= 0.0) ? x : (exp(x) - 1.0);",kp=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = `+gi+`;
  float scale = `+yi+`;
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,Os="return -x;",Bs="return ceil(x);",Ls="return floor(x);",Ws="return exp(x);",Vs="return exp(x) - 1.0;",Rp=Xt+`
  return sin(x);
`,Ip=Xt+`
  return cos(x);
`,Sp=Xt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,Ap=Xt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,Dp=Xt+`
  return atan(x);
`,Tp=Xt+"return log(x + sqrt(x * x + 1.0));",Np=Xt+`
  if (x < 1.0) return NAN;
  return log(x + sqrt(x * x - 1.0));`,Fp=Xt+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
  return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,eo="return x;",Pp="return x;",ac=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,ic=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,sc=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,Ir=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.userCode=`
      vec4 unaryOperation(vec4 x) {
        `+t+`
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `},Mp=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=r;var t=r.length,e=_t("rc",t),n=ze(t),o=function(s,u){if(s===1)return"rc";for(var c="",l=0;l<s;l++)c+=u[l],l<s-1&&(c+=",");return c}(t,e),a=e.slice(-2),i=t<=1?"rc":"vec2("+a.join(",")+")";this.userCode=`
      void main() {
        `+n+` rc = getOutputCoords();
        vec4 packedInput = getA(`+o+`);

        setOutput(getChannel(packedInput, `+i+`));
      }
    `},to={};function no(r,t){if(t===void 0&&(t=!1),r==="linear")return t?Pp:Ep;if(r==="relu")return t?ac:nc;if(r==="elu")return t?sc:oc;if(r==="relu6")return t?ic:rc;if(r==="prelu")return t?tc:ec;throw new Error("Activation "+r+" has not been implemented for the WebGL backend.")}var Op=600,Bp=function(r){function t(e){var n,o=r.call(this)||this;if(o.pendingRead=new WeakMap,o.pendingDisposal=new WeakSet,o.dataRefCount=new WeakMap,o.numBytesInGPU=0,o.uploadWaitMs=0,o.downloadWaitMs=0,o.warnedAboutMemory=!1,o.pendingDeletes=0,o.disposed=!1,!G().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(e==null){var a=an(G().getNumber("WEBGL_VERSION"));o.binaryCache=((n=G().getNumber("WEBGL_VERSION"))in to||(to[n]={}),to[n]),o.gpgpu=new Xd(a),o.canvas=a.canvas,o.gpgpuCreatedLocally=!0}else o.gpgpu=e,o.binaryCache={},o.gpgpuCreatedLocally=!1,o.canvas=e.gl.canvas;return o.textureManager=new xp(o.gpgpu),o.numMBBeforeWarning=G().global.screen==null?1024:G().global.screen.height*G().global.screen.width*window.devicePixelRatio*Op/1024/1024,o.texData=new zu(o,N),o}return Kt(t,r),t.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},t.prototype.write=function(e,n,o){if(G().getBool("DEBUG")&&this.checkNumericalProblems(e),o==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var a={};return this.texData.set(a,{shape:n,dtype:o,values:e,usage:Nt.UPLOAD}),a},t.prototype.move=function(e,n,o,a){if(G().getBool("DEBUG")&&this.checkNumericalProblems(n),a==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:o,dtype:a,values:n,usage:Nt.UPLOAD})},t.prototype.readSync=function(e){var n=this.texData.get(e),o=n.values,a=n.dtype,i=n.complexTensors,s=n.slice,u=n.shape,c=n.isPacked;if(s!=null){var l=void 0;l=c?new Ir(u,eo):new Ce(u,eo);var f=this.runWebGLProgram(l,[{dataId:e,shape:u,dtype:a}],a),h=this.readSync(f.dataId);return this.disposeData(f.dataId),h}if(o!=null)return this.convertAndCacheOnCPU(e);if(a==="string")return o;var d,p,m=this.activeTimers!=null;return m&&(d=Jt()),a==="complex64"?p=Ka(i.real.dataSync(),i.imag.dataSync()):p=this.getValuesFromTexture(e),m&&(this.downloadWaitMs+=Jt()-d),this.convertAndCacheOnCPU(e,p)},t.prototype.read=function(e){return re(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,f,h,d,p,m,v,g,b,x,y,w,_,S,E;return oe(this,function(k){switch(k.label){case 0:if(this.pendingRead.has(e))return n=this.pendingRead.get(e),[2,new Promise(function(I){return n.push(I)})];if(o=this.texData.get(e),a=o.values,i=o.shape,s=o.slice,u=o.dtype,c=o.complexTensors,l=o.isPacked,s!=null)return f=void 0,f=l?new Ir(i,eo):new Ce(i,eo),h=this.runWebGLProgram(f,[{dataId:e,shape:i,dtype:u}],u),d=this.read(h.dataId),this.disposeData(h.dataId),[2,d];if(a!=null)return[2,this.convertAndCacheOnCPU(e)];if(!G().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&G().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return p=null,u!=="complex64"&&G().get("WEBGL_BUFFER_SUPPORTED")&&(m=this.decode(e),v=this.texData.get(m.dataId),p=(E=this.gpgpu).createBufferFromTexture.apply(E,[v.texture].concat(Sr(i)))),this.pendingRead.set(e,[]),u==="complex64"?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:k.sent(),k.label=2;case 2:return u!=="complex64"?[3,4]:[4,Promise.all([c.real.data(),c.imag.data()])];case 3:return b=k.sent(),x=b[0],y=b[1],g=Ka(x,y),[3,5];case 4:p==null?g=this.getValuesFromTexture(e):(w=ae(i),g=this.gpgpu.downloadFloat32MatrixFromBuffer(p,w)),k.label=5;case 5:return m!=null&&this.disposeData(m.dataId),_=this.convertAndCacheOnCPU(e,g),S=this.pendingRead.get(e),this.pendingRead.delete(e),S.forEach(function(I){return I(_)}),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e),this.pendingDeletes--),[2,_]}})})},t.prototype.checkNumericalProblems=function(e){if(e!=null)for(var n=0;n<e.length;n++){var o=e[n];if(!kf(o))throw G().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error("The value "+o+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'"):Error("The value "+o+" cannot be represented on this device.")}},t.prototype.getValuesFromTexture=function(e){var n,o=this.texData.get(e),a=o.shape,i=o.dtype,s=o.isPacked,u=ae(a);if(G().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var c=this.decode(e),l=this.texData.get(c.dataId),f=(n=this.gpgpu).downloadMatrixFromPackedTexture.apply(n,[l.texture].concat(Sr(a))).subarray(0,u);return this.disposeData(c.dataId),f}var h=G().getBool("WEBGL_PACK")&&s===!0,d=h?fa(a):a,p=h?new Ed(d):new Cd(d),m=this.runWebGLProgram(p,[{shape:d,dtype:i,dataId:e}],"float32"),v=this.texData.get(m.dataId),g=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(v.texture,v.texShape[0],v.texShape[1]).subarray(0,u);return this.disposeData(m.dataId),g},t.prototype.time=function(e){return re(this,void 0,void 0,function(){var n,o,a,i,s,u,c;return oe(this,function(l){switch(l.label){case 0:return n=this.activeTimers,o=[],a=!1,this.programTimersStack==null?(this.programTimersStack=o,a=!0):this.activeTimers.push(o),this.activeTimers=o,e(),i=pr(this.activeTimers.map(function(f){return f.query})).filter(function(f){return f!=null}),s=pr(this.activeTimers.map(function(f){return f.name})).filter(function(f){return f!=null}),this.activeTimers=n,a&&(this.programTimersStack=null),u={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[4,Promise.all(i)]:[3,2];case 1:return c=l.sent(),u.kernelMs=of(c),u.getExtraProfileInfo=function(){return c.map(function(f,h){return{name:s[h],ms:f}}).map(function(f){return f.name+": "+f.ms}).join(", ")},[3,3];case 2:u.kernelMs={error:"WebGL query timers are not supported in this environment."},l.label=3;case 3:return this.uploadWaitMs=0,this.downloadWaitMs=0,[2,u]}})})},t.prototype.memory=function(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU}},t.prototype.startTimer=function(){return G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:Jt(),endMs:null}},t.prototype.endTimer=function(e){return G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=Jt(),e)},t.prototype.getQueryTime=function(e){return re(this,void 0,void 0,function(){var n;return oe(this,function(o){return G().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[2,this.gpgpu.waitForQueryAndGetTime(e)]:[2,(n=e).endMs-n.startMs]})})},t.prototype.disposeData=function(e){if(!this.pendingDisposal.has(e)){if(this.pendingRead.has(e))return this.pendingDisposal.add(e),void this.pendingDeletes++;if(this.texData.has(e)){this.releaseGPUData(e);var n=this.texData.get(e).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.texData.delete(e)}}},t.prototype.releaseGPUData=function(e){var n=this.texData.get(e),o=n.texture,a=n.dtype,i=n.texShape,s=n.usage,u=n.isPacked,c=n.slice,l=c&&c.origDataId||e,f=this.dataRefCount.get(l);f>1?this.dataRefCount.set(l,f-1):(this.dataRefCount.delete(l),o!=null&&(this.numBytesInGPU-=this.computeBytes(i,a),this.textureManager.releaseTexture(o,i,s,u)));var h=this.texData.get(e);h.texture=null,h.texShape=null,h.isPacked=!1,h.slice=null},t.prototype.getTexture=function(e){return this.uploadToGPU(e),this.texData.get(e).texture},t.prototype.getDataInfo=function(e){return this.texData.get(e)},t.prototype.getCPUBackend=function(){return G().getBool("WEBGL_CPU_FORWARD")?(this.cpuBackend==null&&(this.cpuBackend=N.findBackend("cpu")),this.cpuBackend):null},t.prototype.shouldExecuteOnCPU=function(e,n){var o=this;return n===void 0&&(n=128),this.getCPUBackend()!=null&&e.every(function(a){return o.texData.get(a.dataId).texture==null&&a.size<n})},t.prototype.getGPGPUContext=function(){return this.gpgpu},t.prototype.complex=function(e,n){var o=this.makeOutput(e.shape,"complex64");return this.texData.get(o.dataId).complexTensors={real:N.keep(e.clone()),imag:N.keep(n.clone())},o},t.prototype.real=function(e){return this.texData.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.texData.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,n,o){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.slice(e,n,o);if(ae(o)===0)return lt([],o,e.dtype);var a=this.texData.get(e.dataId).isPacked,i=Vu(e.shape,n,o);if(a||!i){var s=G().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new yp(o):new gp(o),u=s.getCustomSetupFunc(n);return this.compileAndRun(s,[e],null,u)}return this.uploadToGPU(e.dataId),this.shallowSlice(e,n,o)},t.prototype.shallowSlice=function(e,n,o){var a=this.texData.get(e.dataId),i=this.makeOutput(o,e.dtype),s=this.texData.get(i.dataId);Object.assign(s,a),s.shape=o,s.dtype=e.dtype;var u=Uu(n,e.strides);a.slice&&(u+=a.slice.flatOffset),s.slice={flatOffset:u,origDataId:a.slice&&a.slice.origDataId||e.dataId};var c=this.dataRefCount.get(s.slice.origDataId)||1;return this.dataRefCount.set(s.slice.origDataId,c+1),i},t.prototype.stridedSlice=function(e,n,o,a){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.stridedSlice(e,n,o,a);var i=fi(n,o,a);if(i.some(function(u){return u===0}))return lt([],i);var s=new bp(n,a,i);return this.compileAndRun(s,[e])},t.prototype.reverse=function(e,n){var o=G().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new pp(e.shape,n):new dp(e.shape,n);return this.compileAndRun(o,[e])},t.prototype.concat=function(e,n){if(e[0].dtype==="complex64"){var o=e.map(function(d){return Wt(d)}),a=e.map(function(d){return Zt(d)});return ut(this.concat(o,n),this.concat(a,n))}if(this.shouldExecuteOnCPU(e))return this.cpuBackend.concat(e,n);if(e.length===1)return e[0];if(e.length>G().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var i=Math.floor(e.length/2),s=this.concat(e.slice(0,i),n),u=this.concat(e.slice(i),n);return this.concat([s,u],n)}if(G().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&e[0].rank>1){var c=new cd(e.map(function(d){return d.shape}),n);return this.compileAndRun(c,e)}var l=mr(e.map(function(d){return d.shape}),n),f=e.map(function(d){return d.as2D(-1,ae(d.shape.slice(n)))}),h=new ud(f.map(function(d){return d.shape}));return this.compileAndRun(h,f).reshape(l)},t.prototype.neg=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.neg(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Os,e.dtype);var n=new Ce(e.shape,Os);return this.compileAndRun(n,[e])},t.prototype.batchMatMul=function(e,n,o,a){var i=o?e.shape[2]:e.shape[1],s=a?n.shape[1]:n.shape[2],u=o?e.shape[1]:e.shape[2],c=e.shape[0];if((i===1||s===1)&&u>1e3){o&&(e=e.transpose([0,2,1])),a&&(n=n.transpose([0,2,1]));var l=s===1?e:e.as3D(c,u,1),f=s===1?2:1,h=s===1?n.as3D(c,1,u):n;return this.multiply(l,h).sum(f,!0)}var d=ct(e.dtype,n.dtype),p=new va(e.shape,[c,i,s],o,a);return this.compileAndRun(p,[e,n],d)},t.prototype.fusedBatchMatMul=function(e){var n=e.a,o=e.b,a=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=a?n.shape[2]:n.shape[1],f=i?o.shape[1]:o.shape[2],h=n.shape[0],d=ct(n.dtype,o.dtype),p=s!=null,m=c!=null,v=u?no(u,!0):null,g=new va(n.shape,[h,l,f],a,i,p,v,m),b=[n,o];return s&&b.push(s),c&&b.push(c),this.compileAndRun(g,b,d)},t.prototype.multiply=function(e,n){if(e.dtype==="complex64"){var o=this.texData.get(e.dataId),a=this.texData.get(n.dataId),i=new Es(rd,e.shape,n.shape),s=new Es(od,e.shape,n.shape),u=[this.makeComplexComponentTensorInfo(e,o.complexTensors.real),this.makeComplexComponentTensorInfo(e,o.complexTensors.imag),this.makeComplexComponentTensorInfo(n,a.complexTensors.real),this.makeComplexComponentTensorInfo(n,a.complexTensors.imag)],c=this.compileAndRun(i,u),l=this.compileAndRun(s,u),f=this.complex(c,l);return c.dispose(),l.dispose(),f}if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.multiply(e,n);if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,ks,e.dtype);var h=new Ke(ks,e.shape,n.shape);return this.compileAndRun(h,[e,n],e.dtype)},t.prototype.batchNormalization=function(e,n,o,a,i,s){var u=[e,n,o],c=null;s!=null&&(c=s.shape,u.push(s));var l=null;if(i!=null&&(l=i.shape,u.push(i)),G().getBool("WEBGL_PACK_NORMALIZATION")){var f=new nd(e.shape,n.shape,o.shape,c,l,a);return this.compileAndRun(f,u)}var h=new td(e.shape,n.shape,o.shape,c,l,a);return this.compileAndRun(h,u)},t.prototype.localResponseNormalization4D=function(e,n,o,a,i){var s=G().getBool("WEBGL_PACK_NORMALIZATION")?new Qd(e.shape,n,o,a,i):new Yd(e.shape,n,o,a,i);return this.compileAndRun(s,[e])},t.prototype.LRNGrad=function(e,n,o,a,i,s,u){var c=new Jd(n.shape,a,i,s,u);return this.compileAndRun(c,[n,o,e])},t.prototype.tile=function(e,n){if(e.dtype==="string"){var o=this.readSync(e.dataId).map(function(i){return vo(i)});return $u(xe(e.shape,e.dtype,o),n)}var a=new wp(e.shape,n);return this.compileAndRun(a,[e])},t.prototype.pad=function(e,n,o){var a=G().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ap(e.shape,n,o):new op(e.shape,n,o);return this.compileAndRun(a,[e])},t.prototype.transpose=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.transpose(e,n);var o=G().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Cp(e.shape,n):new _p(e.shape,n);return this.compileAndRun(o,[e])},t.prototype.gather=function(e,n,o){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.gather(e,n,o);var a=new Dd(e.shape,n.size,o);return this.compileAndRun(a,[e,n])},t.prototype.batchToSpaceND=function(e,n,o){R(e.rank<=4,function(){return"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"});var a=n.reduce(function(f,h){return f*h}),i=wo(e.shape,n,a),s=_o(i.length,n.length),u=Co(e.shape,n,a),c=Ou(o,n.length),l=Bu(u,o,n.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,n,o){R(e.rank<=4,function(){return"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"});var a=n.reduce(function(h,d){return h*d}),i=[[0,0]];i.push.apply(i,o);for(var s=1+n.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=wo(u.shape,n,a,!1),l=_o(c.length,n.length,!1),f=Co(u.shape,n,a,!1);return u.reshape(c).transpose(l).reshape(f)},t.prototype.reduce=function(e,n,o){var a=e.shape[0],i=e.shape[1],s=ha(i),u=new ip({windowSize:s,inSize:i,batchSize:a},n),c=this.compileAndRun(u,[e],o);return c.shape[1]===1?c:this.reduce(c,n,o)},t.prototype.argReduce=function(e,n,o){o===void 0&&(o=null);var a=e.shape[0],i=e.shape[1];o!=null&&(a=o.shape[0],i=o.shape[1]);var s=ha(i),u=new jh({windowSize:s,inSize:i,batchSize:a},n,o==null),c=[e];o!=null&&c.push(o);var l=this.compileAndRun(u,c,"int32");return l.shape[1]===1?l:this.argReduce(e,n,l)},t.prototype.argReducePacked=function(e,n,o){o===void 0&&(o=null);var a=o!=null?o.shape:e.shape,i=ha(a[a.length-1]),s=new Qh(a,i,n,o==null),u=o==null?[e]:[e,o],c=this.compileAndRun(s,u,"int32");return c.rank===e.rank?this.argReducePacked(e,n,c):c},t.prototype.sum=function(e,n){Dt("sum",n,e.rank);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i),u=oa(e.dtype);return this.reduce(s,"sum",u).reshape(a)},t.prototype.prod=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.prod(e,n);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i),u=oa(e.dtype);return this.reduce(s,"prod",u).reshape(a)},t.prototype.unsortedSegmentSum=function(e,n,o){var a=0,i=sn([a],e.rank),s=e;i!=null&&(s=e.transpose(i),a=un(1,e.rank)[0]);var u=function(d,p,m){for(var v=[],g=d.length,b=0;b<g;b++)b!==p?v.push(d[b]):v.push(m);return v}(s.shape,a,o),c=ae([s.shape[a]]),l=s.as2D(-1,c),f=oa(e.dtype),h=this.segOpCompute(l,"unsortedSegmentSum",n,f,o).reshape(u);return i!=null&&(h=h.transpose(si(i))),h},t.prototype.segOpCompute=function(e,n,o,a,i){var s=e.shape[0],u=e.shape[1],c=function(h,d){var p,m=!1;for(h<=Wu?(p=h,m=!0):p=La(h,Math.floor(Math.sqrt(h)));!m;)p>d||p===h?m=!0:p=La(h,p+1);return p}(u,i),l=new vp({windowSize:c,inSize:u,batchSize:s,numSegments:i}),f=this.compileAndRun(l,[e,o],a);return f.shape[1]===i?f:(o=xo(0,i).tile([u/c]),this.segOpCompute(f,n,o,a,i))},t.prototype.argMinMaxReduce=function(e,n,o){var a=[n];if(Dt("arg"+o.charAt(0).toUpperCase()+o.slice(1),a,e.rank),!G().getBool("WEBGL_PACK_REDUCE")||e.rank<=2){var i=ht(e.shape,a),s=i[0],u=ae(i[1]),c=e.as2D(-1,u);return this.argReduce(c,o).reshape(s)}return this.argReducePacked(e,o)},t.prototype.argMin=function(e,n){return this.argMinMaxReduce(e,n,"min")},t.prototype.argMax=function(e,n){return this.argMinMaxReduce(e,n,"max")},t.prototype.cumsum=function(e,n,o,a){if(n!==e.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(e.rank-1)+" but got axis="+n);var i=new yd(e.shape,o,a);return this.compileAndRun(i,[e])},t.prototype.equal=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(equal(a, b));
`,"bool");var o=new Ke("return float(a == b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.notEqual=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(notEqual(a, b));
`,"bool");var o=new Ke("return float(a != b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.less=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.less(e,n);if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(lessThan(a, b));
`,"bool");var o=new Ke("return float(a < b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.lessEqual=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(lessThanEqual(a, b));
`,"bool");var o=new Ke("return float(a <= b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.greater=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.greater(e,n);if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(greaterThan(a, b));
`,"bool");var o=new Ke("return float(a > b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.greaterEqual=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(greaterThanEqual(a, b));
`,"bool");var o=new Ke("return float(a >= b);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.logicalNot=function(e){var n=new Ce(e.shape,"return float(!(x >= 1.0));");return this.compileAndRun(n,[e])},t.prototype.logicalAnd=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,"bool");var o=new Ke("return float(a >= 1.0 && b >= 1.0);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.logicalOr=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,"bool");var o=new Ke("return float(a >= 1.0 || b >= 1.0);",e.shape,n.shape);return this.compileAndRun(o,[e,n],"bool")},t.prototype.select=function(e,n,o){var a=new mp(e.rank,n.shape,n.rank);return this.compileAndRun(a,[e,n,o],ct(n.dtype,o.dtype))},t.prototype.where=function(e){yo("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var n=e.dataSync();return vi(e.shape,n)},t.prototype.topk=function(e,n,o){return Yu(e.dataSync(),e.shape,e.dtype,n)},t.prototype.min=function(e,n){Dt("min",n,e.rank);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i);return this.reduce(s,"min",s.dtype).reshape(a)},t.prototype.minimum=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.minimum(e,n);var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = vec4(min(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Ke(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return min(a, b);
`,e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.mod=function(e,n){var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = mod(a, b);
  vec4 isNaN = vec4(equal(b, vec4(0.0)));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Ke(`if (b == 0.0) return NAN;
  return mod(a, b);`,e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.max=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.max(e,n);Dt("max",n,e.rank);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i);return this.reduce(s,"max",s.dtype).reshape(a)},t.prototype.maximum=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.maximum(e,n);var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = vec4(max(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Ke(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return max(a, b);
`,e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.all=function(e,n){Dt("all",n,e.rank);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i);return this.reduce(s,"all",s.dtype).reshape(a)},t.prototype.any=function(e,n){Dt("any",n,e.rank);var o=ht(e.shape,n),a=o[0],i=ae(o[1]),s=e.as2D(-1,i);return this.reduce(s,"any",s.dtype).reshape(a)},t.prototype.realDivide=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,"float32",!0);var o=new Ke(`
if (a == b) {
  return 1.0;
};
return a / b;`,e.shape,n.shape);return this.compileAndRun(o,[e,n],"float32")},t.prototype.floorDiv=function(e,n){if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,"int32");var o=new Ke(`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,e.shape,n.shape);return this.compileAndRun(o,[e,n],"int32")},t.prototype.add=function(e,n){if(e.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(e,n,da);if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.add(e,n);var o=ct(e.dtype,n.dtype);if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,da,o);var a=new Ke(da,e.shape,n.shape);return this.compileAndRun(a,[e,n],o)},t.prototype.packedUnaryOp=function(e,n,o){var a=new Ir(e.shape,n);return this.compileAndRun(a,[e],o)},t.prototype.packedBinaryOp=function(e,n,o,a,i){i===void 0&&(i=!1);var s=new fn(o,e.shape,n.shape,i);return this.compileAndRun(s,[e,n],a)},t.prototype.complexSeparableBinaryOp=function(e,n,o){var a=this,i=this.texData.get(e.dataId),s=this.texData.get(n.dataId),u=[[i.complexTensors.real,s.complexTensors.real],[i.complexTensors.imag,s.complexTensors.imag]].map(function(h){var d=h[0],p=h[1],m=a.makeComplexComponentTensorInfo(e,d),v=a.makeComplexComponentTensorInfo(n,p),g=new Ke(o,e.shape,n.shape);return a.compileAndRun(g,[m,v],ct(d.dtype,p.dtype))}),c=u[0],l=u[1],f=this.complex(c,l);return c.dispose(),l.dispose(),f},t.prototype.makeComplexComponentTensorInfo=function(e,n){return{dataId:n.dataId,dtype:n.dtype,shape:e.shape}},t.prototype.addN=function(e){if(e.length===1)return e[0];if(e.length>G().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var n=Math.floor(e.length/2),o=this.addN(e.slice(0,n)),a=this.addN(e.slice(n));return this.addN([o,a])}var i=e.map(function(c){return c.dtype}).reduce(function(c,l){return ct(c,l)}),s=e.map(function(c){return c.shape}),u=G().getBool("WEBGL_PACK")?new qh(e[0].shape,s):new Hh(e[0].shape,s);return this.compileAndRun(u,e,i)},t.prototype.subtract=function(e,n){if(e.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(e,n,pa);if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.subtract(e,n);var o=ct(e.dtype,n.dtype);if(G().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,pa,e.dtype);var a=new Ke(pa,e.shape,n.shape);return this.compileAndRun(a,[e,n],o)},t.prototype.pow=function(e,n){var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Ke(`
if(a < 0.0 && floor(b) < b){
  return NAN;
}
if (b == 0.0) {
  return 1.0;
}
return (round(mod(b, 2.0)) != 1) ?
    pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,e.shape,n.shape),a=ct(e.dtype,n.dtype);return this.compileAndRun(o,[e,n],a)},t.prototype.ceil=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.ceil(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Bs,e.dtype);var n=new Ce(e.shape,Bs);return this.compileAndRun(n,[e])},t.prototype.floor=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.floor(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ls,e.dtype);var n=new Ce(e.shape,Ls);return this.compileAndRun(n,[e])},t.prototype.sign=function(e){var n=new Ce(e.shape,`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`);return this.compileAndRun(n,[e])},t.prototype.isNaN=function(e){var n=new Ce(e.shape,"return float(isnan(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.isInf=function(e){var n=new Ce(e.shape,"return float(isinf(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.isFinite=function(e){var n=new Ce(e.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.round=function(e){var n=new Ce(e.shape,`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`);return this.compileAndRun(n,[e])},t.prototype.exp=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.exp(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ws,e.dtype);var n=new Ce(e.shape,Ws);return this.compileAndRun(n,[e])},t.prototype.expm1=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.expm1(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Vs,e.dtype);var n=new Ce(e.shape,Vs);return this.compileAndRun(n,[e])},t.prototype.softmax=function(e,n){var o=nt([n],e.shape),a=this.max(e,o),i=Et(a.shape,o),s=this.subtract(e,a.reshape(i)),u=this.exp(s),c=this.sum(u,o).reshape(i);return this.realDivide(u,c)},t.prototype.log=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.log(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,`
  vec4 result = log(x);
  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));
  result.r = isNaN.r == 1.0 ? NAN : result.r;
  result.g = isNaN.g == 1.0 ? NAN : result.g;
  result.b = isNaN.b == 1.0 ? NAN : result.b;
  result.a = isNaN.a == 1.0 ? NAN : result.a;

  return result;
`,e.dtype);var n=new Ce(e.shape,`if (x < 0.0) return NAN;
  return log(x);`);return this.compileAndRun(n,[e])},t.prototype.log1p=function(e){var n=new Ce(e.shape,"return log(1.0 + x);");return this.compileAndRun(n,[e])},t.prototype.sqrt=function(e){var n=new Ce(e.shape,"return sqrt(x);");return this.compileAndRun(n,[e])},t.prototype.rsqrt=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.rsqrt(e);var n=new Ce(e.shape,"return inversesqrt(x);");return this.compileAndRun(n,[e])},t.prototype.reciprocal=function(e){var n=new Ce(e.shape,"return 1.0 / x;");return this.compileAndRun(n,[e])},t.prototype.relu=function(e){var n;return n=G().getBool("WEBGL_PACK")?new Ir(e.shape,ac):new Ce(e.shape,nc),this.compileAndRun(n,[e])},t.prototype.relu6=function(e){var n;return n=G().getBool("WEBGL_PACK")?new Ir(e.shape,ic):new Ce(e.shape,rc),this.compileAndRun(n,[e])},t.prototype.prelu=function(e,n){var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(tc,e.shape,n.shape):new Ke(ec,e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.elu=function(e){if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,sc,e.dtype);var n=new Ce(e.shape,oc);return this.compileAndRun(n,[e])},t.prototype.eluDer=function(e,n){var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,e.shape,n.shape):new Ke("return (b >= 1.0) ? a : a * (b + 1.0);",e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.selu=function(e){var n=new Ce(e.shape,kp);return this.compileAndRun(n,[e])},t.prototype.int=function(e){var n=new Ce(e.shape,"return float(int(x));");return this.compileAndRun(n,[e],"int32")},t.prototype.clip=function(e,n,o){var a,i=(a=G().getBool("WEBGL_PACK_CLIP")?new id(e.shape):new ad(e.shape)).getCustomSetupFunc(n,o);return this.compileAndRun(a,[e],null,i)},t.prototype.abs=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.abs(e);if(G().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ms,e.dtype);var n=new Ce(e.shape,Ms);return this.compileAndRun(n,[e])},t.prototype.complexAbs=function(e){var n=this.texData.get(e.dataId),o=new sd(e.shape),a=[this.makeComplexComponentTensorInfo(e,n.complexTensors.real),this.makeComplexComponentTensorInfo(e,n.complexTensors.imag)];return this.compileAndRun(o,a)},t.prototype.sigmoid=function(e){var n=new Ce(e.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(n,[e])},t.prototype.softplus=function(e){var n=new Ce(e.shape,`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`);return this.compileAndRun(n,[e])},t.prototype.sin=function(e){var n=new Ce(e.shape,Rp);return this.compileAndRun(n,[e])},t.prototype.cos=function(e){var n=new Ce(e.shape,Ip);return this.compileAndRun(n,[e])},t.prototype.tan=function(e){var n=new Ce(e.shape,"return tan(x);");return this.compileAndRun(n,[e])},t.prototype.asin=function(e){var n=new Ce(e.shape,Sp);return this.compileAndRun(n,[e])},t.prototype.acos=function(e){var n=new Ce(e.shape,Ap);return this.compileAndRun(n,[e])},t.prototype.atan=function(e){var n=new Ce(e.shape,Dp);return this.compileAndRun(n,[e])},t.prototype.atan2=function(e,n){var o=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn(`
  vec4 result = atan(a, b);
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Ke(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return atan(a, b);
`,e.shape,n.shape);return this.compileAndRun(o,[e,n])},t.prototype.sinh=function(e){var n=new Ce(e.shape,`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[e])},t.prototype.cosh=function(e){var n=new Ce(e.shape,`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[e])},t.prototype.tanh=function(e){var n=new Ce(e.shape,`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`);return this.compileAndRun(n,[e])},t.prototype.asinh=function(e){var n=new Ce(e.shape,Tp);return this.compileAndRun(n,[e])},t.prototype.acosh=function(e){var n=new Ce(e.shape,Np);return this.compileAndRun(n,[e])},t.prototype.atanh=function(e){var n=new Ce(e.shape,Fp);return this.compileAndRun(n,[e])},t.prototype.erf=function(e){var n=new Ce(e.shape,`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = 0.3275911;
  float a1 = 0.254829592;
  float a2 = -0.284496736;
  float a3 = 1.421413741;
  float a4 = -1.453152027;
  float a5 = 1.061405429;

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`);return this.compileAndRun(n,[e])},t.prototype.step=function(e,n){var o=new Ce(e.shape,function(a){return a===void 0&&(a=0),Xt+`
    return x > 0.0 ? 1.0 : float(`+a+`);
  `}(n));return this.compileAndRun(o,[e])},t.prototype.conv2dByMatMul=function(e,n,o,a,i,s){var u=e.shape,c=this.texData.get(e.dataId),l=o.inChannels,f=u[0]*u[1]*u[2],h=o.outChannels,d=o.dataFormat==="channelsLast",p=(f===1||h===1)&&l>1e3,m=u[2]%2!=0&&!!c.isPacked;if(p||!G().getBool("WEBGL_LAZILY_UNPACK")||!G().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!m){var v=d?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],g=this.reshape(e,[1,v,o.inChannels]),b=this.reshape(n,[1,o.inChannels,o.outChannels]);return this.reshape(this.fusedBatchMatMul({a:g,b,transposeA:!1,transposeB:!1,bias:a,activation:i,preluActivationWeights:s}),o.outShape)}var x=d?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),y={dataId:e.dataId,shape:[1,x,o.inChannels],dtype:e.dtype},w=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,R(Qr(c.shape,y.shape),function(){return"packed reshape "+c.shape+" to "+y.shape+" isn't free"});var _=this.reshape(n,[1,o.inChannels,o.outChannels]),S=this.fusedBatchMatMul({a:y,b:_,transposeA:!1,transposeB:!1,bias:a,activation:i,preluActivationWeights:s}),E=this.texData.get(S.dataId);return R(E.isPacked,function(){return"batchMatMul result is expected to be packed"}),c.shape=w,E.shape=o.outShape,N.makeTensorFromDataId(S.dataId,o.outShape,S.dtype)},t.prototype.conv2dWithIm2Row=function(e,n,o,a,i,s){var u=o.filterWidth,c=o.filterHeight,l=o.inChannels,f=o.outWidth,h=o.outHeight,d=o.dataFormat==="channelsLast",p=u*c*l,m=h*f,v=[p,m],g=e.squeeze([0]),b=n.reshape([1,p,-1]),x=new $d(v,g.shape,o),y=this.compileAndRun(x,[g]).reshape([1,v[0],v[1]]),w=a!=null,_=s!=null,S=i?no(i,!0):null,E=new va(y.shape,[1,m,o.outChannels],!0,!1,w,S,_),k=[y,b];a&&k.push(a),_&&k.push(s);var I=this.compileAndRun(E,k);return d?I.reshape([1,h,f,o.outChannels]):I.reshape([1,o.outChannels,h,f])},t.prototype.fusedConv2d=function(e){var n=e.input,o=e.filter,a=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights;if(a.filterHeight===1&&a.filterWidth===1&&a.dilationHeight===1&&a.dilationWidth===1&&a.strideHeight===1&&a.strideWidth===1&&(a.padInfo.type==="SAME"||a.padInfo.type==="VALID"))return this.conv2dByMatMul(n,o,a,i,s,u);if(G().getBool("WEBGL_CONV_IM2COL")&&n.shape[0]===1)return this.conv2dWithIm2Row(n,o,a,i,s,u);var c=i!=null,l=u!=null,f=s?no(s,!1):null,h=new Rs(a,c,f,l),d=[n,o];return i&&d.push(i),u&&d.push(u),this.compileAndRun(h,d)},t.prototype.conv2d=function(e,n,o){if(o.filterHeight===1&&o.filterWidth===1&&o.dilationHeight===1&&o.dilationWidth===1&&o.strideHeight===1&&o.strideWidth===1&&(o.padInfo.type==="SAME"||o.padInfo.type==="VALID"))return this.conv2dByMatMul(e,n,o);if(G().getBool("WEBGL_CONV_IM2COL")&&e.shape[0]===1)return this.conv2dWithIm2Row(e,n,o);var a=new Rs(o);return this.compileAndRun(a,[e,n])},t.prototype.conv2dDerInput=function(e,n,o){var a=new fd(o);return this.compileAndRun(a,[e,n])},t.prototype.conv2dDerFilter=function(e,n,o){var a=new ld(o);return this.compileAndRun(a,[e,n])},t.prototype.fusedDepthwiseConv2D=function(e){var n,o=e.input,a=e.filter,i=e.convInfo,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=G().getBool("WEBGL_PACK_DEPTHWISECONV")&&i.strideWidth<=2&&i.outChannels/i.inChannels==1,f=u?no(u,l):null,h=[o,a],d=s!=null,p=c!=null;return d&&h.push(s),p&&h.push(c),l?(n=new Ss(i,d,f,p),this.compileAndRun(n,h)):(n=new Is(i,d,f,p),this.compileAndRun(n,h))},t.prototype.depthwiseConv2D=function(e,n,o){var a;return G().getBool("WEBGL_PACK_DEPTHWISECONV")&&o.strideWidth<=2&&o.outChannels/o.inChannels==1?(a=new Ss(o),this.compileAndRun(a,[e,n])):(a=new Is(o),this.compileAndRun(a,[e,n]))},t.prototype.depthwiseConv2DDerInput=function(e,n,o){var a=new vd(o);return this.compileAndRun(a,[e,n])},t.prototype.depthwiseConv2DDerFilter=function(e,n,o){var a=new pd(o);return this.compileAndRun(a,[e,n])},t.prototype.conv3d=function(e,n,o){var a=new md(o);return this.compileAndRun(a,[e,n])},t.prototype.conv3dDerInput=function(e,n,o){var a=new dd(o);return this.compileAndRun(a,[e,n])},t.prototype.conv3dDerFilter=function(e,n,o){var a=new hd(o);return this.compileAndRun(a,[e,n])},t.prototype.maxPool=function(e,n){var o=new ma(n,"max",!1);return this.compileAndRun(o,[e])},t.prototype.avgPool=function(e,n){var o=new ma(n,"avg",!1);return this.compileAndRun(o,[e],"float32")},t.prototype.maxPoolBackprop=function(e,n,o,a){var i=new ma(a,"max",!0),s=this.compileAndRun(i,[n]),u=new Zd(a),c=this.compileAndRun(u,[e,s],n.dtype);return s.dispose(),c},t.prototype.avgPoolBackprop=function(e,n,o){var a=new Zh(o);return this.compileAndRun(a,[e],n.dtype)},t.prototype.cast=function(e,n){return qu(e,n,this)},t.prototype.unstack=function(e,n){for(var o=e.shape[n],a=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==n&&(a[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[n]=1;var l=new Array(o);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(e,u,c).reshape(a);return l},t.prototype.avgPool3d=function(e,n){var o=new ga(n,"avg",!1);return this.compileAndRun(o,[e],"float32")},t.prototype.avgPool3dBackprop=function(e,n,o){var a=new ed(o);return this.compileAndRun(a,[e],n.dtype)},t.prototype.maxPool3d=function(e,n){var o=new ga(n,"max",!1);return this.compileAndRun(o,[e],"float32")},t.prototype.maxPool3dBackprop=function(e,n,o,a){var i=new ga(a,"max",!0),s=this.compileAndRun(i,[n]),u=new ep(a),c=this.compileAndRun(u,[e,s],n.dtype);return s.dispose(),c},t.prototype.reshape=function(e,n){var o=this.texData.get(e.dataId);if(o.isPacked&&!Qr(e.shape,n)&&(o.texture===null||!Qr(o.shape,n))){var a=this.packedReshape(e,n);return N.makeTensorFromDataId(a.dataId,a.shape,a.dtype)}return ja(e,n)},t.prototype.resizeBilinear=function(e,n,o,a){var i=G().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new lp(e.shape,n,o,a):new cp(e.shape,n,o,a);return this.compileAndRun(i,[e],"float32")},t.prototype.resizeBilinearBackprop=function(e,n,o){var a=new up(e,n,o);return this.compileAndRun(a,[e])},t.prototype.resizeNearestNeighbor=function(e,n,o,a){var i=new hp(e.shape,n,o,a);return this.compileAndRun(i,[e])},t.prototype.resizeNearestNeighborBackprop=function(e,n,o){var a=new fp(e,n,o);return this.compileAndRun(a,[e])},t.prototype.multinomial=function(e,n,o,a){var i=n?e:pn(e),s=i.shape[0],u=i.shape[1],c=new tp(s,u,o),l=c.getCustomSetupFunc(a);return this.compileAndRun(c,[i],"int32",l)},t.prototype.oneHot=function(e,n,o,a){var i=new np(e.size,n,o,a);return this.compileAndRun(i,[e])},t.prototype.diag=function(e){var n=new _d(e.size);return this.compileAndRun(n,[e])},t.prototype.nonMaxSuppression=function(e,n,o,a,i){return yo("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),di(e.dataSync(),n.dataSync(),o,a,i)},t.prototype.cropAndResize=function(e,n,o,a,i,s){var u=new gd(e.shape,n.shape,a,i,s);return this.compileAndRun(u,[e,n,o],"float32")},t.prototype.depthToSpace=function(e,n,o){R(n>1,function(){return"blockSize should be > 1 for depthToSpace, but was: "+n});var a=e.shape[0],i=o==="NHWC"?e.shape[1]:e.shape[2],s=o==="NHWC"?e.shape[2]:e.shape[3],u=o==="NHWC"?e.shape[3]:e.shape[1],c=i*n,l=s*n,f=u/(n*n),h=new wd(o==="NHWC"?[a,c,l,f]:[a,f,c,l],n,o);return this.compileAndRun(h,[e])},t.prototype.split=function(e,n,o){return Xu(e,n,o)},t.prototype.scatterND=function(e,n,o){var a=Eo(0,e,o),i=a.sliceRank,s=a.numUpdates,u=a.sliceSize,c=a.strides,l=a.outputSize,f=[l/u,u],h=e.reshape([s,i]),d=n.reshape([s,u]);if(l===0)return ja(lt([]),o);var p=Z(0),m=new Ns(s,i,h.rank,d.rank,c,f);return this.compileAndRun(m,[d,h,p]).reshape(o)},t.prototype.sparseToDense=function(e,n,o,a){var i=Eo(0,e,o),s=i.sliceRank,u=i.numUpdates,c=i.strides,l=i.outputSize,f=new Ns(u,s,e.rank,n.rank,c,[l,1]);return this.compileAndRun(f,[n,e,a]).reshape(o)},t.prototype.fft=function(e){return this.fftImpl(e,!1)},t.prototype.ifft=function(e){return this.fftImpl(e,!0)},t.prototype.fftImpl=function(e,n){var o=this.texData.get(e.dataId),a=new Ds(Id,e.shape,n),i=new Ds(Sd,e.shape,n),s=[this.makeComplexComponentTensorInfo(e,o.complexTensors.real),this.makeComplexComponentTensorInfo(e,o.complexTensors.imag)],u=this.compileAndRun(a,s),c=this.compileAndRun(i,s),l=this.complex(u,c).as2D(e.shape[0],e.shape[1]);return u.dispose(),c.dispose(),l},t.prototype.gatherND=function(e,n){var o=n.shape,a=o[o.length-1],i=Lu(e,n),s=i[0],u=i[1],c=i[2],l=i[3],f=n.reshape([u,a]),h=e.reshape([e.size/c,c]),d=new Td(a,l,[u,c]);return this.compileAndRun(d,[h,f]).reshape(s)},t.prototype.fill=function(e,n,o){if((o=o||Wr(n))==="string"){var a=po(o,ae(e));return a.fill(n),N.makeTensor(a,e,o,this)}var i=new Ad(e,n),s=i.getCustomSetupFunc(n);return this.compileAndRun(i,[],o,s)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported under string dtype");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){return this.fill(e.shape,e.dtype==="string"?"":0,e.dtype)},t.prototype.linspace=function(e,n,o){return ju(e,n,o)},t.prototype.makeTensorInfo=function(e,n){var o=this.write(null,e,n);return this.texData.get(o).usage=null,{dataId:o,shape:e,dtype:n}},t.prototype.makeOutput=function(e,n){var o=this.makeTensorInfo(e,n).dataId;return N.makeTensorFromDataId(o,e,n,this)},t.prototype.unpackTensor=function(e){var n=new Mp(e.shape);return this.runWebGLProgram(n,[e],e.dtype)},t.prototype.packTensor=function(e){var n=new rp(e.shape);return this.runWebGLProgram(n,[e],e.dtype,null,!0)},t.prototype.packedReshape=function(e,n){var o=[mo(e.shape)].concat(go(e.shape)),a={dtype:e.dtype,shape:o,dataId:e.dataId},i=[mo(n)].concat(go(n)),s=new sp(i,o),u=this.runWebGLProgram(s,[a],e.dtype,null,!0);return{dataId:u.dataId,shape:n,dtype:u.dtype}},t.prototype.decode=function(e){var n,o=this.texData.get(e),a=o.isPacked,i=o.shape,s=o.dtype,u=fa(i);return n=a?new xd(u):new bd(u),{dtype:s,shape:i,dataId:this.runWebGLProgram(n,[{shape:u,dtype:s,dataId:e}],s,null,!0).dataId}},t.prototype.runWebGLProgram=function(e,n,o,a,i){var s=this;i===void 0&&(i=!1);var u=this.makeTensorInfo(e.outputShape,o),c=this.texData.get(u.dataId);if(e.packedOutput&&(c.isPacked=!0),e.outPackingScheme===Fr.DENSE){var l=Sr(e.outputShape);c.texShape=l.map(function(x){return 2*x})}if(e.outTexUsage!=null&&(c.usage=e.outTexUsage),ae(u.shape)===0)return c.values=Tr(u.dtype,0),u;var f=[],h=n.map(function(x){if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var y=s.texData.get(x.dataId);if(y.texture==null){if(!e.packedInputs&&ae(x.shape)<=G().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:y.values};e.packedInputs&&(y.isPacked=!0,y.shape=x.shape)}else if(!!y.isPacked!=!!e.packedInputs)x=y.isPacked?s.unpackTensor(x):s.packTensor(x),f.push(x),y=s.texData.get(x.dataId);else if(y.isPacked&&!Qr(y.shape,x.shape)){var w=x,_=x.shape;x.shape=y.shape,x=s.packedReshape(x,_),f.push(x),y=s.texData.get(x.dataId),w.shape=_}return s.uploadToGPU(x.dataId),{shape:x.shape,texData:y,isUniform:!1}});this.uploadToGPU(u.dataId);var d,p={shape:u.shape,texData:c,isUniform:!1},m=function(x,y,w){var _="";y.concat(w).forEach(function(k){var I=k.texData!=null&&k.texData.slice!=null&&k.texData.slice.flatOffset>0,T=k.isUniform?"uniform":k.texData.texShape;_+=k.shape+"_"+T+"_"+I});var S=x.userCode,E=x.constructor.name;return E+="_"+_+"_"+S}(e,h,p),v=this.getAndSaveBinary(m,function(){return function(x,y,w,_){var S=y.userCode,E=w.map(function(q,j){var K={logicalShape:q.shape,texShape:q.isUniform?null:q.texData.texShape,isUniform:q.isUniform,isPacked:!q.isUniform&&q.texData.isPacked,flatOffset:null};return q.texData!=null&&q.texData.slice!=null&&q.texData.slice.flatOffset>0&&(K.flatOffset=q.texData.slice.flatOffset),{name:y.variableNames[j],shapeInfo:K}}),k=E.map(function(q){return q.shapeInfo}),I={logicalShape:_.shape,texShape:_.texData.texShape,isUniform:!1,isPacked:_.texData.isPacked,flatOffset:null},T=Kh(E,I,S,y.packedInputs),D=x.createProgram(T),U=null,V=x.getUniformLocation(D,"NAN",!1);G().getNumber("WEBGL_VERSION")===1&&(U=x.getUniformLocation(D,"INFINITY",!1));for(var z={},O=0;O<y.variableNames.length;O++){var P=y.variableNames[O];z[P]=x.getUniformLocation(D,P,!1),z["offset"+P]=x.getUniformLocation(D,"offset"+P,!1)}return{program:y,source:T,webGLProgram:D,uniformLocations:z,inShapeInfos:k,outShapeInfo:I,infLoc:U,nanLoc:V}}(s.gpgpu,e,h,p)}),g=this.activeTimers!=null;if(g&&(d=this.startTimer()),function(x,y,w,_,S){Ts(y.inShapeInfos,w),Ts([y.outShapeInfo],[_]);var E=_.texData.texture,k=_.texData.texShape;_.texData.isPacked?x.setOutputPackedMatrixTexture(E,k[0],k[1]):x.setOutputMatrixTexture(E,k[0],k[1]),x.setProgram(y.webGLProgram),G().getNumber("WEBGL_VERSION")===1&&y.infLoc!==null&&x.gl.uniform1f(y.infLoc,1/0),y.nanLoc!==null&&x.gl.uniform1f(y.nanLoc,NaN),w.forEach(function(I,T){var D=y.program.variableNames[T],U=y.uniformLocations[D],V=y.uniformLocations["offset"+D];if(U!=null)if(I.isUniform)if(ae(I.shape)<2)x.gl.uniform1f(U,I.uniformValues[0]);else{var z=I.uniformValues;z instanceof Float32Array||(z=new Float32Array(z)),x.gl.uniform1fv(U,z)}else I.texData.slice!=null&&V!=null&&x.gl.uniform1i(V,I.texData.slice.flatOffset),x.setInputMatrixTexture(I.texData.texture,U,T)}),S!=null&&S(x,y.webGLProgram),x.executeProgram()}(this.gpgpu,v,h,p,a),f.forEach(function(x){return s.disposeData(x.dataId)}),g&&(d=this.endTimer(d),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(d)})),!G().getBool("WEBGL_LAZILY_UNPACK")&&c.isPacked&&i===!1){var b=this.unpackTensor(u);return this.disposeData(u.dataId),b}return u},t.prototype.compileAndRun=function(e,n,o,a,i){i===void 0&&(i=!1),o=o||n[0].dtype;var s=this.runWebGLProgram(e,n,o,a,i);return N.makeTensorFromDataId(s.dataId,s.shape,s.dtype)},t.prototype.getAndSaveBinary=function(e,n){return e in this.binaryCache||(this.binaryCache[e]=n()),this.binaryCache[e]},t.prototype.getTextureManager=function(){return this.textureManager},t.prototype.dispose=function(){var e=this;this.disposed||(G().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(function(n){e.gpgpu.deleteProgram(e.binaryCache[n].webGLProgram),delete e.binaryCache[n]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)},t.prototype.floatPrecision=function(){var e=this;return this.floatPrecisionValue==null&&(this.floatPrecisionValue=te(function(){if(!G().get("WEBGL_RENDER_FLOAT32_ENABLED")){var n=G().getBool("DEBUG");G().set("DEBUG",!1);var o=e.abs(Z(1e-8)).dataSync()[0];if(G().set("DEBUG",n),o>0)return 32}return 16})),this.floatPrecisionValue},t.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},t.prototype.uploadToGPU=function(e){var n,o=this.texData.get(e),a=o.shape,i=o.dtype,s=o.values,u=o.texture,c=o.usage,l=o.isPacked;if(u==null){var f,h=this.activeTimers!=null;h&&(f=Jt());var d=o.texShape;if(d==null&&(d=Gf(a,l),o.texShape=d),s!=null){var p=fa(a),m=void 0,v=d[1],g=d[0],b=s instanceof Uint8Array;l?(v=(n=Ur(d[0],d[1]))[0],g=n[1],m=new Rd(p,[g,v],b)):m=new kd(p,[g,v],b);var x=this.makeTensorInfo([g,v],i);this.texData.get(x.dataId).usage=b?Nt.PIXELS:Nt.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(x.dataId),v,g,s);var y=this.runWebGLProgram(m,[x],i,null,!0),w=this.texData.get(y.dataId);o.texture=w.texture,o.texShape=w.texShape,o.isPacked=w.isPacked,o.usage=w.usage,this.disposeData(x.dataId),this.texData.delete(y.dataId),o.values=null,h&&(this.uploadWaitMs+=Jt()-f)}else{var _=this.acquireTexture(d,c,i,l);o.texture=_}}},t.prototype.convertAndCacheOnCPU=function(e,n){var o=this.texData.get(e),a=o.dtype;return this.releaseGPUData(e),n!=null&&(o.values=function(i,s){if(s==="float32"||s==="complex64")return i;if(s==="int32"||s==="bool"){for(var u=s==="int32"?new Int32Array(i.length):new Uint8Array(i.length),c=0;c<u.length;++c)u[c]=Math.round(i[c]);return u}throw new Error("Unknown dtype "+s)}(n,a)),o.values},t.prototype.acquireTexture=function(e,n,o,a){if(this.numBytesInGPU+=this.computeBytes(e,o),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var i=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+i+" MB, most likely due to a memory leak")}return this.textureManager.acquireTexture(e,n,a)},t.prototype.computeBytes=function(e,n){return e[0]*e[1]*xu(n)},t}(Gu);Iu()&&N.registerBackend("webgl",function(){return new Bp},2);var Lp=A({square_:function(r){var t=C(r,"x","square"),e=[t];return N.runKernelFunc(function(n,o){return o([t]),n.square(t)},{x:t},null,"Square",{},e,[])}}),Mr="SquaredDifference",uc=A({squaredDifference_:function(r,t){var e,n=C(r,"a","squaredDifference"),o=C(t,"b","squaredDifference");e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape);var a={a:n,b:o},i=[n,o];return N.runKernelFunc(function(s,u){var c=s.squaredDifference(n,o);return u([n,o]),c},a,function(s,u){var c=u[0],l=u[1],f=Z(2);return{a:function(){return s.mul(c.sub(l).mul(f))},b:function(){return s.mul(l.sub(c).mul(f))}}},Mr,{},i,[])}}),Wp=A({abs_:function(r){var t=C(r,"x","abs");return t.dtype==="complex64"?N.runKernelFunc(function(e){return e.complexAbs(t)},{$x:t}):N.runKernelFunc(function(e,n){var o=e.abs(t);return n([t]),o},{x:t},function(e,n){var o=n[0];return{x:function(){return e.mul(o.toFloat().step(-1))}}},"Abs")}}),Vp=A({acos_:function(r){var t=C(r,"x","acos");return N.runKernelFunc(function(e,n){var o=e.acos(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.divStrict(Z(1).sub(o.toFloat().square()).sqrt()).neg()}}})}}),Up=A({acosh_:function(r){var t=C(r,"x","acosh");return N.runKernelFunc(function(e,n){var o=e.acosh(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.divStrict(o.toFloat().square().sub(1).sqrt())}}})}}),zp=A({asin_:function(r){var t=C(r,"x","asin");return N.runKernelFunc(function(e,n){var o=e.asin(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.divStrict(Z(1).sub(o.toFloat().square()).sqrt())}}})}}),Gp=A({asinh_:function(r){var t=C(r,"x","asinh");return N.runKernelFunc(function(e,n){var o=e.asinh(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.divStrict(Z(1).add(o.toFloat().square()).sqrt())}}})}}),Hp=A({atan_:function(r){var t=C(r,"x","atan");return N.runKernelFunc(function(e,n){var o=e.atan(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(o.toFloat().square().add(1))}}})}}),qp=A({atanh_:function(r){var t=C(r,"x","atanh");return N.runKernelFunc(function(e,n){var o=e.atanh(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(Z(1).sub(o.toFloat().square()))}}})}}),jp=A({ceil_:function(r){var t=C(r,"x","ceil");return N.runKernelFunc(function(e){return e.ceil(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),bi=A({clipByValue_:function(r,t,e){var n=C(r,"x","clipByValue");R(t<=e,function(){return"Error in clip: min ("+t+") must be less than or equal to max ("+e+")."});var o=[n],a={min:t,max:e};return N.runKernelFunc(function(i,s){var u=i.clip(n,t,e);return s([n]),u},{x:n},function(i,s){var u=s[0];return{x:function(){return i.where(u.greaterEqual(t).logicalAnd(u.lessEqual(e)),Te(i))}}},"ClipByValue",a,o)}}),Kp=A({cos_:function(r){var t=C(r,"x","cos"),e=[t];return N.runKernelFunc(function(n,o){var a=n.cos(t);return o([t]),a},{x:t},function(n,o){var a=o[0];return{x:function(){return a.toFloat().sin().neg().mul(n)}}},"Cos",{},e)}}),Xp=A({cosh_:function(r){var t=C(r,"x","cosh");return N.runKernelFunc(function(e,n){var o=e.cosh(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return o.toFloat().sinh().mulStrict(e)}}})}}),$p=A({erf_:function(r){var t=C(r,"x","erf");return R(t.dtype==="int32"||t.dtype==="float32",function(){return"Input dtype must be `int32` or `float32`."}),t.dtype==="int32"&&(t=t.toFloat()),N.runKernelFunc(function(e,n){var o=e.erf(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.mul(o.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}})}}),Xa=A({exp_:function(r){var t=C(r,"x","exp");return N.runKernelFunc(function(e,n){var o=e.exp(t);return n([o]),o},{x:t},function(e,n){return{x:function(){return e.mulStrict(n[0])}}},"Exp",{},[],[!0])}}),Yp=A({expm1_:function(r){var t=C(r,"x","expm1");return N.runKernelFunc(function(e,n){var o=e.expm1(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.mul(o.exp())}}})}}),Jp=A({floor_:function(r){var t=C(r,"x","floor");return N.runKernelFunc(function(e){return e.floor(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),Qp=A({log_:function(r){var t=C(r,"x","log"),e=[t];return N.runKernelFunc(function(n,o){var a=n.log(t);return o([t]),a},{x:t},function(n,o){var a=o[0];return{x:function(){return n.div(a.toFloat())}}},"Log",{},e)}}),Zp=A({log1p_:function(r){var t=C(r,"x","log1p");return N.runKernelFunc(function(e,n){var o=e.log1p(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(o.add(1))}}})}}),ev=A({logSigmoid_:function(r){var t=C(r,"x","logSigmoid");return N.runKernelFunc(function(e,n){var o=e.softplus(t.neg()).neg();return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.mul(o.neg().sigmoid())}}})}}),So=A({neg_:function(r){var t=C(r,"x","neg"),e=[t];return N.runKernelFunc(function(n){return n.neg(t)},{x:t},function(n){return{x:function(){return n.neg()}}},"Neg",{},e)}}),tv=A({reciprocal_:function(r){var t=C(r,"x","reciprocal");return N.runKernelFunc(function(e,n){var o=e.reciprocal(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(o.square().neg())}}})}}),nv=A({round_:function(r){var t=C(r,"x","round");return N.runKernelFunc(function(e){return e.round(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),cc=A({rsqrt_:function(r){var t=C(r,"x","rsqrt"),e=[t];return N.runKernelFunc(function(n,o){var a=n.rsqrt(t);return o([t]),a},{x:t},function(n,o){var a=o[0];return{x:function(){return n.div(a.pow(1.5).mul(2)).neg()}}},"Rsqrt",{},e)}}),lc=A({sigmoid_:function(r){var t=C(r,"x","sigmoid");return N.runKernelFunc(function(e,n){var o=e.sigmoid(t);return n([o]),o},{x:t},function(e,n){var o=n[0];return{x:function(){return e.mul(o.mul(Z(1).sub(o)))}}},"Sigmoid")}}),rv=A({sign_:function(r){var t=C(r,"x","sign");return N.runKernelFunc(function(e){return e.sign(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),ov=A({isNaN_:function(r){var t=C(r,"x","isNaN");return N.runKernelFunc(function(e){return e.isNaN(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),av=A({isInf_:function(r){var t=C(r,"x","isInf");return N.runKernelFunc(function(e){return e.isInf(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),iv=A({isFinite_:function(r){var t=C(r,"x","isFinite");return N.runKernelFunc(function(e){return e.isFinite(t)},{$x:t},function(e){return{$x:function(){return Te(e)}}})}}),sv=A({sin_:function(r){var t=C(r,"x","sin"),e=[t];return N.runKernelFunc(function(n,o){var a=n.sin(t);return o([t]),a},{x:t},function(n,o){var a=o[0];return{x:function(){return a.toFloat().cos().mul(n)}}},"Sin",{},e)}}),uv=A({sinh_:function(r){var t=C(r,"x","sinh");return N.runKernelFunc(function(e,n){var o=e.sinh(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return o.toFloat().cosh().mulStrict(e)}}})}}),cv=A({softplus_:function(r){var t=C(r,"x","softplus");return N.runKernelFunc(function(e,n){var o=e.softplus(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.mul(o.sigmoid())}}})}}),lv=A({sqrt_:function(r){var t=C(r,"x","sqrt");return N.runKernelFunc(function(e,n){var o=e.sqrt(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(o.toFloat().sqrt().mul(2))}}})}}),fv=A({step_:function(r,t){t===void 0&&(t=0);var e=C(r,"x","step");return N.runKernelFunc(function(n){return n.step(e,t)},{$x:e},function(n){return{$x:function(){return Te(n)}}})}}),hv=A({tan_:function(r){var t=C(r,"x","tan");return N.runKernelFunc(function(e,n){var o=e.tan(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return e.div(o.cos().square())}}})}}),dv=A({tanh_:function(r){var t=C(r,"x","tanh");return N.runKernelFunc(function(e,n){var o=e.tanh(t);return n([o]),o},{x:t},function(e,n){var o=n[0];return{x:function(){return Z(1).sub(o.square()).mulStrict(e)}}},"Tanh",{},null,[!0])}});function fc(r,t,e,n,o,a){var i,s,u=C(r,"x","batchNorm"),c=C(t,"mean","batchNorm"),l=C(e,"variance","batchNorm");return o!=null&&(i=C(o,"scale","batchNorm")),n!=null&&(s=C(n,"offset","batchNorm")),R(u.rank===2,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),R(c.rank===2||c.rank===1,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."}),R(l.rank===2||l.rank===1,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."}),i!=null&&R(i.rank===2||i.rank===1,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+i.rank+"."}),s!=null&&R(s.rank===2||s.rank===1,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+s.rank+"."}),Gr(u,c,l,s,i,a)}function hc(r,t,e,n,o,a){var i,s,u=C(r,"x","batchNorm"),c=C(t,"mean","batchNorm"),l=C(e,"variance","batchNorm");return o!=null&&(i=C(o,"scale","batchNorm")),n!=null&&(s=C(n,"offset","batchNorm")),R(u.rank===3,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),R(c.rank===3||c.rank===1,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."}),R(l.rank===3||l.rank===1,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."}),i!=null&&R(i.rank===3||i.rank===1,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+i.rank+"."}),s!=null&&R(s.rank===3||s.rank===1,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+s.rank+"."}),Gr(u,c,l,s,i,a)}function dc(r,t,e,n,o,a){var i,s,u=C(r,"x","batchNorm"),c=C(t,"mean","batchNorm"),l=C(e,"variance","batchNorm");return o!=null&&(i=C(o,"scale","batchNorm")),n!=null&&(s=C(n,"offset","batchNorm")),R(u.rank===4,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+u.rank+"."}),R(c.rank===4||c.rank===1,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."}),R(l.rank===4||l.rank===1,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."}),i!=null&&R(i.rank===4||i.rank===1,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+i.rank+"."}),s!=null&&R(s.rank===4||s.rank===1,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+s.rank+"."}),Gr(u,c,l,s,i,a)}function Gr(r,t,e,n,o,a){a==null&&(a=.001);var i,s,u,c=C(r,"x","batchNorm"),l=C(t,"mean","batchNorm"),f=C(e,"variance","batchNorm");o!=null&&(i=C(o,"scale","batchNorm")),n!=null&&(s=C(n,"offset","batchNorm")),R(l.rank===f.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),R(s==null||l.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),R(i==null||l.rank===i.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."}),u=c.rank===0||c.rank===1?c.as4D(1,1,1,c.size):c.rank===2?c.as4D(1,1,c.shape[0],c.shape[1]):c.rank===3?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var h=[c,l,f,i];return N.runKernelFunc(function(d,p){var m=d.batchNormalization(u,ro(l),ro(f),a,ro(i),ro(s));return p([c,l,f,i]),m},{x:c,mean:l,variance:f,scale:i,offset:s},function(d,p){var m=p,v=m[0],g=m[1],b=m[2],x=m[3],y=x??Z(1),w=et(g.shape,u.shape),_=[];if(g.rank===1){for(var S=0;S<u.shape.length-1;++S)_.push(u.shape[S]);_.push(1)}var E=v.sub(g),k=d.mul(y),I=cc(b.add(Z(a))),T=I.mul(I).mul(I).mul(Z(-.5));return{x:function(){return g.rank===1?d.mul(ir(I.as4D(1,1,1,g.shape[0]),_)).mul(y).reshape(v.shape):d.mul(I).mul(y).reshape(v.shape)},mean:function(){var D=I.mul(Z(-1)).mul(k);return g.rank===1&&(D=D.sum(w)),D.reshape(g.shape)},variance:function(){var D=T.mul(E).mul(k);return g.rank===1&&(D=D.sum(w)),D.reshape(g.shape)},scale:function(){var D=E.mul(I),U=d.mul(D);return g.rank===1&&(U=U.sum(w)),U.reshape(g.shape)},offset:function(){var D=d;return g.rank===1&&(D=D.sum(w)),D.reshape(g.shape)}}},"BatchNormalization",{varianceEpsilon:a},h).reshape(c.shape)}function ro(r){return r==null?null:r.rank===0?r.as1D():r.rank===1?r:r.rank===2?r.as4D(1,1,r.shape[0],r.shape[1]):r.rank===3?r.as4D(1,r.shape[0],r.shape[1],r.shape[2]):r}function Wo(){Su("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon")}var pv=A({batchNormalization2d_:function(r,t,e,n,o,a){return n===void 0&&(n=.001),Wo(),fc(r,t,e,a,o,n)}}),vv=A({batchNormalization3d_:function(r,t,e,n,o,a){return n===void 0&&(n=.001),Wo(),hc(r,t,e,a,o,n)}}),mv=A({batchNormalization4d_:function(r,t,e,n,o,a){return n===void 0&&(n=.001),Wo(),dc(r,t,e,a,o,n)}}),gv=A({batchNormalization_:function(r,t,e,n,o,a){return n===void 0&&(n=.001),Wo(),Gr(r,t,e,a,o,n)}}),pc=A({batchNorm_:Gr}),yv=A({batchNorm2d_:fc}),bv=A({batchNorm3d_:hc}),xv=A({batchNorm4d_:dc}),Vo=A({logicalAnd_:function(r,t){var e=C(r,"a","logicalAnd","bool"),n=C(t,"b","logicalAnd","bool");return Ae(e.shape,n.shape),N.runKernelFunc(function(o){return o.logicalAnd(e,n)},{a:e,b:n},null,"LogicalAnd")}}),wv=A({logicalNot_:function(r){var t=C(r,"x","logicalNot","bool");return N.runKernelFunc(function(e){return e.logicalNot(t)},{$x:t})}}),vc=A({logicalOr_:function(r,t){var e=C(r,"a","logicalOr","bool"),n=C(t,"b","logicalOr","bool");return Ae(e.shape,n.shape),N.runKernelFunc(function(o){return o.logicalOr(e,n)},{$a:e,$b:n})}}),_v=A({logicalXor_:function(r,t){var e=C(r,"a","logicalXor","bool"),n=C(t,"b","logicalXor","bool");return Ae(e.shape,n.shape),vc(r,t).logicalAnd(Vo(r,t).logicalNot())}}),zn=A({where_:function(r,t,e){var n=C(t,"a","where"),o=C(e,"b","where"),a=C(r,"condition","where","bool");return Be(n.shape,o.shape,"Error in where: "),a.rank===1?R(a.shape[0]===n.shape[0],function(){return"The first dimension of `a` must match the size of `condition`."}):Be(a.shape,o.shape,"Error in where: "),N.runKernelFunc(function(i,s){var u=i.select(a,n,o);return s([a]),u},{$condition:a,$a:n,$b:o},function(i,s){var u=s[0];return{$condition:function(){return Te(u).toFloat()},$a:function(){return i.mul(u.cast(i.dtype))},$b:function(){return i.mul(u.logicalNot().cast(i.dtype))}}})}}),mc=function(r){return re(this,void 0,void 0,function(){var t,e,n;return oe(this,function(o){switch(o.label){case 0:return[4,(t=C(r,"condition","whereAsync","bool")).data()];case 1:return e=o.sent(),n=vi(t.shape,e),r!==t&&t.dispose(),[2,n]}})})},Se=A({add_:function(r,t){var e,n=C(r,"a","add"),o=C(t,"b","add");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i){return i.add(n,o)},{a:n,b:o},function(i){return{a:function(){var s=i,u=et(n.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=et(o.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(o.shape)}}},"Add")}}),Cv=A({addN_:function(r){R(Array.isArray(r),function(){return"The argument passed to tf.addN() must be a list of tensors"}),R(r.length>=1,function(){return"Must pass at least one tensor to tf.addN(), but got "+r.length});var t=r.map(function(o,a){return C(o,"tensors"+a,"addN")}),e=t[0];t.forEach(function(o){if(o.dtype!==e.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(function(o){if(!it(o.shape,e.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});var n=t;return N.runKernelFunc(function(o){return o.addN(t)},n,function(o){var a={};return t.forEach(function(i,s){a[s]=function(){return o.clone()}}),a},"AddN")}}),Ev=A({addStrict_:function(r,t){var e=C(r,"a","addStrict"),n=C(t,"b","addStrict");return Be(e.shape,n.shape,"Error in addStrict: "),e.add(n)}}),kv=A({atan2_:function(r,t){var e,n=C(r,"a","atan2"),o=C(t,"b","atan2");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i,s){var u=i.atan2(n,o);return s([n,o]),u},{$a:n,$b:o},function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=Se(u.square(),c.square()),f=i.mul(c.div(l)),h=et(u.shape,a);return h.length>0&&(f=f.sum(h)),f.reshape(u.shape)},$b:function(){var l=Se(u.square(),c.square()),f=So(i.mul(u.div(l))),h=et(c.shape,a);return h.length>0&&(f=f.sum(h)),f.reshape(c.shape)}}})}}),Ht=A({div_:function(r,t){var e,n=C(r,"a","div"),o=C(t,"b","div");if(e=je(n,o),n=e[0],o=e[1],n.dtype==="int32"&&o.dtype==="int32")return gc(n,o);var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i,s){var u=i.realDivide(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),f=et(u.shape,a);return f.length>0?l.sum(f).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),f=et(c.shape,a);f.length>0&&(l=l.sum(f).reshape(c.shape));var h=c.square();return l.div(h.toFloat()).neg()}}},"Div")}}),Rv=A({divNoNan_:function(r,t){var e,n=C(r,"a","div"),o=C(t,"b","div");n=(e=je(n,o))[0],o=e[1];var a=Ht(n,o),i=Te(a),s=o.equal(i);return zn(s,i,a)}}),Iv=A({divStrict_:function(r,t){var e=C(r,"a","div"),n=C(t,"b","div");return Be(e.shape,n.shape,"Error in divideStrict: "),e.div(n)}}),gc=A({floorDiv_:function(r,t){var e,n=C(r,"a","floorDiv"),o=C(t,"b","floorDiv");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i,s){var u=i.floorDiv(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),f=et(u.shape,a);return f.length>0?l.sum(f).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),f=et(c.shape,a);f.length>0&&(l=l.sum(f).reshape(c.shape));var h=c.square();return l.div(h.toFloat()).neg()}}},"FloorDiv")}}),xi=A({maximum_:function(r,t){var e,n=C(r,"a","maximum"),o=C(t,"b","maximum");return e=je(n,o),n=e[0],o=e[1],n.dtype==="bool"&&(n=n.toInt(),o=o.toInt()),Ae(n.shape,o.shape),N.runKernelFunc(function(a,i){var s=a.maximum(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return a.mul(s.greaterEqual(u).toFloat())},b:function(){return a.mul(s.less(u).toFloat())}}},"Maximum")}}),Sv=A({maximumStrict_:function(r,t){var e=C(r,"a","maximumStrict"),n=C(t,"b","maximumStrict");return Be(e.shape,n.shape,"Error in maximumStrict: "),e.maximum(n)}}),yc=A({minimum_:function(r,t){var e,n=C(r,"a","minimum"),o=C(t,"b","minimum");return e=je(n,o),n=e[0],o=e[1],n.dtype==="bool"&&(n=n.toInt(),o=o.toInt()),Ae(n.shape,o.shape),N.runKernelFunc(function(a,i){var s=a.minimum(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return a.mul(s.lessEqual(u).toFloat())},b:function(){return a.mul(s.greater(u).toFloat())}}},"Minimum")}}),Av=A({minimumStrict_:function(r,t){var e=C(r,"a","minimumStrict"),n=C(t,"b","minimumStrict");return Be(e.shape,n.shape,"Error in minimumStrict: "),e.minimum(n)}}),Dv=A({mod_:function(r,t){var e,n=C(r,"a","mod"),o=C(t,"b","mod");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i,s){var u=i.mod(n,o);return s([n,o]),u},{$a:n,$b:o},function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=et(u.shape,a);return l.length>0?i.sum(l).reshape(u.shape):i},$b:function(){var l=i.mul(u.div(c).floor().neg()),f=et(c.shape,a);return f.length>0?l.sum(f).reshape(c.shape):l}}})}}),Tv=A({modStrict_:function(r,t){var e=C(r,"a","modStrict"),n=C(t,"b","modStrict");return Be(e.shape,n.shape,"Error in modStrict: "),e.mod(n)}}),mt=A({mul_:function(r,t){var e,n=C(r,"a","mul"),o=C(t,"b","mul");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i,s){var u=i.multiply(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.mul(c.toFloat()),f=et(u.shape,a);return f.length>0?l.sum(f).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),f=et(c.shape,a);return f.length>0?l.sum(f).reshape(c.shape):l}}},"Mul")}}),Nv=A({mulStrict_:function(r,t){var e=C(r,"a","mul"),n=C(t,"b","mul");return Be(e.shape,n.shape,"Error in multiplyStrict: "),e.mul(n)}}),Ao=A({pow_:function(r,t){var e,n=C(r,"base","pow"),o=C(t,"exp","pow");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape),i=[n,o];return N.runKernelFunc(function(s,u){var c=s.pow(n,o);return u([n,o,c]),c},{a:n,b:o},function(s,u){var c=u[0],l=u[1],f=u[2];return{a:function(){var h=l.toFloat(),d=s.mul(h.mul(c.pow(h.sub(Z(1))))),p=et(c.shape,a);return p.length>0&&(d=d.sum(p)),d.reshape(c.shape)},b:function(){var h=c.greater(0),d=c.log().where(h,Te(c)),p=s.mul(f.mul(d)),m=et(l.shape,a);return m.length>0&&(p=p.sum(m)),p.reshape(l.shape)}}},"Pow",{},i,[!0])}}),Fv=A({powStrict_:function(r,t){return Be(r.shape,t.shape,"Error in powStrict: "),r.pow(t)}}),Pv=A({squaredDifferenceStrict_:function(r,t){var e=C(r,"a","squaredDifferenceStrict"),n=C(t,"b","squaredDifferenceStrict");return Be(e.shape,n.shape,"Error in squaredDifferenceStrict: "),e.squaredDifference(n)}}),tt=A({sub_:function(r,t){var e,n=C(r,"a","sub"),o=C(t,"b","sub");e=je(n,o),n=e[0],o=e[1];var a=Ae(n.shape,o.shape);return N.runKernelFunc(function(i){return i.subtract(n,o)},{a:n,b:o},function(i){return{a:function(){var s=i,u=et(n.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=et(o.shape,a);return u.length>0&&(s=s.sum(u)),s.neg().reshape(o.shape)}}},"Sub")}}),Mv=A({subStrict_:function(r,t){var e=C(r,"a","subStrict"),n=C(t,"b","subStrict");return Be(e.shape,n.shape,"Error in subStrict: "),e.sub(n)}}),bc=A({equal_:function(r,t){var e,n=C(r,"a","equal"),o=C(t,"b","equal");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a){return a.equal(n,o)},{$a:n,$b:o})}}),Ov=A({equalStrict_:function(r,t){var e=C(r,"a","equalStrict"),n=C(t,"b","equalStrict");return Be(e.shape,n.shape,"Error in equalStrict: "),e.equal(n)}}),Bv=A({greater_:function(r,t){var e,n=C(r,"a","greater"),o=C(t,"b","greater");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a){return a.greater(n,o)},{a:n,b:o},null,"Greater")}}),xc=A({greaterEqual_:function(r,t){var e,n=C(r,"a","greaterEqual"),o=C(t,"b","greaterEqual");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a,i){var s=a.greaterEqual(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return Te(s)},b:function(){return Te(u)}}},"GreaterEqual")}}),Lv=A({greaterEqualStrict_:function(r,t){var e=C(r,"a","greaterEqualStrict"),n=C(t,"b","greaterEqualStrict");return Be(e.shape,n.shape,"Error in greaterEqualStrict: "),e.greaterEqual(n)}}),Wv=A({greaterStrict_:function(r,t){var e=C(r,"a","greaterStrict"),n=C(t,"b","greaterStrict");return Be(e.shape,n.shape,"Error in greaterStrict: "),e.greater(n)}}),Vv=A({less_:function(r,t){var e,n=C(r,"a","less"),o=C(t,"b","less");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a){return a.less(n,o)},{a:n,b:o},null,"Less")}}),Uv=A({lessEqual_:function(r,t){var e,n=C(r,"a","lessEqual"),o=C(t,"b","lessEqual");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a,i){var s=a.lessEqual(n,o);return i([n,o]),s},{a:n,b:o},null,"LessEqual")}}),zv=A({lessEqualStrict_:function(r,t){var e=C(r,"a","lessEqualStrict"),n=C(t,"b","lessEqualStrict");return Be(e.shape,n.shape,"Error in lessEqualStrict: "),e.lessEqual(n)}}),Gv=A({lessStrict_:function(r,t){var e=C(r,"a","lessStrict"),n=C(t,"b","lessStrict");return Be(e.shape,n.shape,"Error in lessStrict: "),e.less(n)}}),Hv=A({notEqual_:function(r,t){var e,n=C(r,"a","notEqual"),o=C(t,"b","notEqual");return e=je(n,o),n=e[0],o=e[1],Ae(n.shape,o.shape),N.runKernelFunc(function(a){return a.notEqual(n,o)},{a:n,b:o},null,"NotEqual")}}),qv=A({notEqualStrict_:function(r,t){var e=C(r,"a","notEqualStrict"),n=C(t,"b","notEqualStrict");return Be(e.shape,n.shape,"Error in notEqualStrict: "),e.notEqual(n)}});function Us(r,t){for(var e=[],n=r;n<t;++n)e.push(n);return e}function zs(r){for(var t=[],e=0;e<r.length;++e)for(var n=0;n<r[e].length;++n)t.push(r[e][n]);return t}var wi=A({gather_:function(r,t,e){e===void 0&&(e=0);var n=C(r,"x","gather"),o=C(t,"indices","gather","int32");e=nt(e,n.shape)[0];var a=function(i,s,u){for(var c=i.shape[u],l=[],f=1,h=1,d=0;d<u;d++)l.push(i.shape[d]),f*=i.shape[d];for(d=0;d<s.rank;d++)l.push(s.shape[d]);for(d=u+1;d<i.rank;d++)l.push(i.shape[d]),h*=i.shape[d];return{batchSize:f,sliceSize:h,dimSize:c,outputShape:l}}(n,o,e);return N.runKernelFunc(function(i,s){var u=i.gather(n,o.flatten(),e);return s([o]),u},{x:n,indices:o},function(i,s){var u=s[0];return{x:function(){var c=n.shape,l=u.size,f=c.slice(0,e),h=f.length,d=c.slice(e,c.length).slice(1),p=d.length,m=Us(0,h),v=Us(h+1,h+1+p),g=zs([f,[l],d]),b=i.reshape(g),x=u.reshape([l]),y=zs([[h],m,v]),w=b.transpose(y),_=wc(w,x,n.shape[e]),S=si(y);return _=_.transpose(S)},indices:function(){return u}}},"Gather",{axis:e}).reshape(a.outputShape)}}),wc=A({unsortedSegmentSum_:function(r,t,e){var n=C(r,"x","unsortedSegmentSum"),o=C(t,"segmentIds","unsortedSegmentSum","int32");return R($e(e),function(){return"numSegments must be of dtype int"}),N.runKernelFunc(function(a,i){var s=a.unsortedSegmentSum(n,o,e);return i([o]),s},{$x:n},function(a,i){var s=i[0];return{$x:function(){return function(u,c){for(var l=xi(c,Te(c)),f=wi(u,l),h=xc(c,Z(0,"int32")),d=f.rank-h.rank,p=0;p<d;++p)h=Lt(h,p+1);h=Vo(h,br(f.shape,"bool"));var m=Te(f);return zn(h,f,m)}(a,s)}}})}}),jv=function(r,t,e){return re(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,f,h,d,p,m;return oe(this,function(v){switch(v.label){case 0:for(n=C(r,"tensor","boolMask"),o=C(t,"mask","boolMask","bool"),a=e??0,i=o.rank,s=n.shape,R(i>0,function(){return"mask cannot be scalar"}),Be(s.slice(a,a+i),o.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=a;c<a+i;c++)u*=s[c];return l=s.slice(0,a).concat([u],s.slice(a+i)),f=n.reshape(l),h=o.reshape([-1]),[4,mc(h)];case 1:return d=v.sent(),p=d.squeeze([1]),m=wi(f,p,a),r!==n&&n.dispose(),t!==o&&o.dispose(),p.dispose(),f.dispose(),h.dispose(),d.dispose(),[2,m]}})})};function _c(r,t,e,n,o,a,i){a===void 0&&(a="NHWC"),R(r.length===t.rank,function(){return"Length of inShape ("+r.length+") and rank of dy ("+t.rank+") must match"});var s=r,u=t,c=!1;t.rank===3&&(c=!0,u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]),s=[1,r[0],r[1],r[2]]),R(s.length===4,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+s.length+"."}),R(u.rank===4,function(){return"Error in conv2dDerInput: dy must be rank 4, but got rank "+u.rank}),R(e.rank===4,function(){return"Error in conv2dDerInput: filter must be rank 4, but got rank "+e.rank});var l=a==="NHWC"?s[3]:s[1],f=a==="NHWC"?u.shape[3]:u.shape[1];R(l===e.shape[2],function(){return"Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+e.shape[2]+"."}),R(f===e.shape[3],function(){return"Error in conv2dDerInput: depth of output ("+f+") must match output depth for filter "+e.shape[3]+"."}),i!=null&&R($e(o),function(){return"Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var h=hi(a),d=jn(s,e.shape,n,1,o,i,!1,h),p=N.runKernelFunc(function(m,v){var g=m.conv2dDerInput(u,e,d);return v([e,u]),g},{dy4D:u,filter:e},function(m,v){var g=v[0],b=v[1];return{dy4D:function(){return Ut(m,g,n,o,a,1,i)},filter:function(){return _i(m,b,g.shape,n,o,a,i)}}});return c?p.as3D(p.shape[1],p.shape[2],p.shape[3]):p}function ba(r){var t=function(a){return typeof a=="number"?[a,a,a]:a.length===2?[a[0],a[1],1]:a}(r),e=t[0],n=t[1],o=t[2];return e===1&&n===1&&o===1}function Cc(r,t,e,n,o){R(r.length===t.rank,function(){return"Length of inShape ("+r.length+") and rank of dy ("+t.rank+") must match"});var a=r,i=t,s=!1;t.rank===4&&(s=!0,i=t.as5D(1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]),a=[1,r[0],r[1],r[2],r[3]]);var u=a[4],c=i.shape[4];R(a.length===5,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+a.length+"."}),R(i.rank===5,function(){return"Error in conv3dDerInput: dy must be rank 5, but got rank "+i.rank}),R(e.rank===5,function(){return"Error in conv3dDerInput: filter must be rank 5, but got rank "+e.rank}),R(u===e.shape[3],function(){return"Error in conv3dDerInput: depth of input ("+u+") must match input depth for filter "+e.shape[3]+"."}),R(c===e.shape[4],function(){return"Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+e.shape[4]+"."});var l=Ro(a,e.shape,n,1,o),f=N.runKernelFunc(function(h){return h.conv3dDerInput(i,e,l)},{dy5D:i});return s?f.as4D(f.shape[1],f.shape[2],f.shape[3],f.shape[4]):f}var Kv=A({conv1d_:function(r,t,e,n,o,a,i){o===void 0&&(o="NWC"),a===void 0&&(a=1);var s=C(r,"x","conv1d"),u=C(t,"filter","conv1d"),c=s,l=!1;s.rank===2&&(l=!0,c=s.as3D(1,s.shape[0],s.shape[1])),R(c.rank===3,function(){return"Error in conv1d: input must be rank 3, but got rank "+c.rank+"."}),R(u.rank===3,function(){return"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."}),i!=null&&R($e(n),function(){return"Error in conv1d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."}),R(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+u.shape[1]+"."}),R(kt(e,a),function(){return"Error in conv1D: Either stride or dilation must be 1. Got stride "+e+" and dilation '"+a+"'"}),R(o==="NWC",function(){return"Error in conv1d: got dataFormat of "+o+" but only NWC is currently supported."});var f=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),h=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),d=Ut(h,f,[1,e],n,"NHWC",[1,a],i);return l?d.as2D(d.shape[2],d.shape[3]):d.as3D(d.shape[0],d.shape[2],d.shape[3])}}),Ut=A({conv2d_:function(r,t,e,n,o,a,i){o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]);var s=C(r,"x","conv2d"),u=C(t,"filter","conv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),R(c.rank===4,function(){return"Error in conv2d: input must be rank 4, but got rank "+c.rank+"."}),R(u.rank===4,function(){return"Error in conv2d: filter must be rank 4, but got rank "+u.rank+"."}),i!=null&&R($e(n),function(){return"Error in conv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."});var f=o==="NHWC"?c.shape[3]:c.shape[1];R(f===u.shape[2],function(){return"Error in conv2d: depth of input ("+f+") must match input depth for filter "+u.shape[2]+"."}),R(kt(e,a),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+a+"'"});var h=hi(o),d=jn(c.shape,u.shape,e,a,n,i,!1,h),p=[u,c],m=N.runKernelFunc(function(v,g){var b=v.conv2d(c,u,d);return g([u,c]),b},{x:c,filter:u},function(v,g){var b=g,x=b[0],y=b[1];return R(gr(a),function(){return"Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"}),{x:function(){return Ec(y.shape,v,x,e,n,o)},filter:function(){return _i(y,v,x.shape,e,n,o)}}},"Conv2D",d,p);return l?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),Xv=A({conv3d_:function(r,t,e,n,o,a){o===void 0&&(o="NDHWC"),a===void 0&&(a=[1,1,1]);var i=C(r,"x","conv3d"),s=C(t,"filter","conv3d"),u=i,c=!1;i.rank===4&&(c=!0,u=i.as5D(1,i.shape[0],i.shape[1],i.shape[2],i.shape[3])),R(u.rank===5,function(){return"Error in conv3d: input must be rank 5, but got rank "+u.rank+"."}),R(s.rank===5,function(){return"Error in conv3d: filter must be rank 5, but got rank "+s.rank+"."}),R(u.shape[4]===s.shape[3],function(){return"Error in conv3d: depth of input ("+u.shape[4]+") must match input depth for filter "+s.shape[3]+"."}),R(function(h,d){return ba(h)||ba(d)}(e,a),function(){return"Error in conv3D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+a+"'"}),R(o==="NDHWC",function(){return"Error in conv3d: got dataFormat of "+o+" but only NDHWC is currently supported."});var l=Ro(u.shape,s.shape,e,a,n),f=N.runKernelFunc(function(h,d){var p=h.conv3d(u,s,l);return d([u,s]),p},{x:u,$filter:s},function(h,d){R(ba(a),function(){return"Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"});var p=d[0],m=d[1];return{x:function(){return Cc(p.shape,h,m,e,n)},$filter:function(){return function(v,g,b,x,y){var w=v;v.rank===4&&(w=v.as5D(1,v.shape[0],v.shape[1],v.shape[2],v.shape[3]));var _=g;_.rank===4&&(_=g.as5D(1,g.shape[0],g.shape[1],g.shape[2],g.shape[3])),R(w.rank===5,function(){return"Error in conv3dDerFilter: input must be rank 5, but got shape "+w.shape+"."}),R(_.rank===5,function(){return"Error in conv3dDerFilter: dy must be rank 5, but got shape "+_.shape+"."}),R(b.length===5,function(){return"Error in conv3dDerFilter: filterShape must be length 5, but got "+b+"."}),R(w.shape[4]===b[3],function(){return"Error in conv3dDerFilter: depth of input "+w.shape[4]+") must match input depth in filter ("+b[3]+"."}),R(_.shape[4]===b[4],function(){return"Error in conv3dDerFilter: depth of dy ("+_.shape[4]+") must match output depth for filter ("+b[4]+")."});var S=Ro(w.shape,b,x,1,y);return N.runKernelFunc(function(E){return E.conv3dDerFilter(w,_,S)},{x5D:w,dy5D:_})}(p,h,m.shape,e,n)}}});return c?f.as4D(f.shape[1],f.shape[2],f.shape[3],f.shape[4]):f}}),_i=A({conv2dDerFilter_:function(r,t,e,n,o,a,i){a===void 0&&(a="NHWC");var s=r;r.rank===3&&(s=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var u=t;u.rank===3&&(u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),R(s.rank===4,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+s.shape+"."}),R(u.rank===4,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+u.shape+"."}),R(e.length===4,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+e+"."});var c=a==="NHWC"?s.shape[3]:s.shape[1],l=a==="NHWC"?u.shape[3]:u.shape[1];R(c===e[2],function(){return"Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+e[2]+"."}),R(l===e[3],function(){return"Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+e[3]+")."}),i!=null&&R($e(o),function(){return"Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var f=hi(a),h=jn(s.shape,e,n,1,o,i,!1,f);return N.runKernelFunc(function(d){return d.conv2dDerFilter(s,u,h)},{x4D:s,dy4D:u})}}),Ec=A({conv2dDerInput_:_c}),Uo=A({depthwiseConv2d_:function(r,t,e,n,o,a,i){a===void 0&&(a=[1,1]);var s=C(r,"x","depthwiseConv2d"),u=C(t,"filter","depthwiseConv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),R(c.rank===4,function(){return"Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."}),R(u.rank===4,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+u.rank+"."}),R(c.shape[3]===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+u.shape[2]+"."}),a==null&&(a=[1,1]),R(kt(e,a),function(){return"Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+a+"'"}),i!=null&&R($e(n),function(){return"Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."});var f=jn(c.shape,u.shape,e,a,n,i,!0),h=[c,u],d=N.runKernelFunc(function(p,m){var v=p.depthwiseConv2D(c,u,f);return m([c,u]),v},{x:c,filter:u},function(p,m){R(gr(a),function(){return"Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+a+"'"});var v=m[0],g=m[1];return{x:function(){return kc(v.shape,p,g,f)},filter:function(){return Rc(v,p,g.shape,f)}}},"DepthwiseConv2dNative",f,h);return l?d.as3D(d.shape[1],d.shape[2],d.shape[3]):d}}),kc=A({depthwiseConv2dDerInput_:function(r,t,e,n){var o=t,a=!1;t.rank===3&&(a=!0,o=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var i=N.runKernelFunc(function(s){return s.depthwiseConv2DDerInput(o,e,n)},{dy4D:o});return a?i.as3D(i.shape[1],i.shape[2],i.shape[3]):i}}),Rc=A({depthwiseConv2dDerFilter_:function(r,t,e,n){var o=r;r.rank===3&&(o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var a=t;return a.rank===3&&(a=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),N.runKernelFunc(function(i){return i.depthwiseConv2DDerFilter(o,a,n)},{x4D:o,dy4D:a})}}),Ci=A({separableConv2d_:function(r,t,e,n,o,a,i){a===void 0&&(a=[1,1]),i===void 0&&(i="NHWC");var s=C(r,"x","separableConv2d"),u=C(t,"depthwiseFilter","separableConv2d"),c=C(e,"pointwiseFilter","separableConv2d"),l=s,f=!1;if(s.rank===3&&(f=!0,l=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");R(l.rank===4,function(){return"Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."}),R(u.rank===4,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but got rank "+u.rank+"."}),R(c.rank===4,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but got rank "+u.rank+"."}),R(c.shape[0]===1,function(){return"Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."}),R(c.shape[1]===1,function(){return"Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."});var h=u.shape[2],d=u.shape[3];R(c.shape[2]===h*d,function(){return"Error in separableConv2d: the third dimension of pointwise filter must be "+h*d+", but got "+c.shape[2]+"."});var p=Uo(l,u,n,o,i,a),m=Ut(p,c,1,"valid",i);return f?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),$v=A({conv2dTranspose_:function(r,t,e,n,o,a){return _c(e,C(r,"x","conv2dTranspose"),C(t,"filter","conv2dTranspose"),n,o,"NHWC",a)}}),Yv=A({conv3dTranspose_:function(r,t,e,n,o){return Cc(e,C(r,"x","conv3dTranspose"),C(t,"filter","conv3dTranspose"),n,o)}}),zo=A({matMul_:function(r,t,e,n){var o;e===void 0&&(e=!1),n===void 0&&(n=!1);var a=C(r,"a","matMul"),i=C(t,"b","matMul");o=je(a,i),a=o[0],i=o[1];var s=e?a.shape[a.rank-2]:a.shape[a.rank-1],u=n?i.shape[i.rank-1]:i.shape[i.rank-2],c=e?a.shape[a.rank-1]:a.shape[a.rank-2],l=n?i.shape[i.rank-2]:i.shape[i.rank-1],f=a.shape.slice(0,-2),h=i.shape.slice(0,-2),d=ae(f),p=ae(h);R(a.rank>=2&&i.rank>=2&&a.rank===i.rank,function(){return"Error in matMul: inputs must have the same rank of at least 2, got ranks "+a.rank+" and "+i.rank+"."}),R(it(f,h),function(){return"Error in matMul: outer dimensions ("+f+") and ("+h+") of Tensors with shapes "+a.shape+" and "+i.shape+" must match."}),R(s===u,function(){return"Error in matMul: inner shapes ("+s+") and ("+u+") of Tensors with shapes "+a.shape+" and "+i.shape+" and transposeA="+e+" and transposeB="+n+" must match."});var m=a.shape.slice(0,-2).concat([c,l]),v=e?a.as3D(d,s,c):a.as3D(d,c,s),g=n?i.as3D(p,l,u):i.as3D(p,u,l),b={transposeA:e,transposeB:n};return N.runKernelFunc(function(x,y){var w=x.batchMatMul(v,g,e,n);return y([v,g]),w},{a:v,b:g},function(x,y){var w=y,_=w[0],S=w[1];return e||n?!e&&n?{a:function(){return x.matMul(S,!1,!1)},b:function(){return x.matMul(_,!0,!1)}}:e&&!n?{a:function(){return S.matMul(x,!1,!0)},b:function(){return _.matMul(x,!1,!1)}}:{a:function(){return S.matMul(x,!0,!0)},b:function(){return x.matMul(_,!0,!0)}}:{a:function(){return x.matMul(S,!1,!0)},b:function(){return _.matMul(x,!0,!1)}}},"BatchMatMul",b).reshape(m)}}),Jv=A({dot_:function(r,t){var e=C(r,"t1","dot"),n=C(t,"t2","dot");R(!(e.rank!==1&&e.rank!==2||n.rank!==1&&n.rank!==2),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+e.rank+" and "+n.rank+"."});var o=e.rank===1?e.size:e.shape[1],a=n.rank===1?n.size:n.shape[0];return R(o===a,function(){return"Error in dot: inner dimensions of inputs must match, but got "+o+" and "+a+"."}),e.rank===1&&n.rank===1?e.as2D(1,-1).matMul(n.as2D(-1,1)).asScalar():e.rank===1&&n.rank===2?e.as2D(1,-1).matMul(n.as2D(n.shape[0],n.shape[1])).as1D():e.rank===2&&n.rank===1?e.matMul(n.as2D(-1,1)).as1D():e.matMul(n.as2D(n.shape[0],n.shape[1]))}}),Qv=A({outerProduct_:function(r,t){var e=C(r,"v1","outerProduct"),n=C(t,"v2","outerProduct");return R(e.rank===1&&n.rank===1,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+e.rank+" and "+n.rank+"."}),e.as2D(-1,1).matMul(n.as2D(1,-1))}}),Hr=A({reverse_:function(r,t){var e=C(r,"x","reverse");if(e.rank===0)return e.clone();var n=nt(t,e.shape);return N.runKernelFunc(function(o){return o.reverse(e,n)},{$x:e},function(o){return{$x:function(){return o.reverse(n)}}}).reshapeAs(e)}}),Zv=A({reverse1d_:function(r){var t=C(r,"x","reverse");return R(t.rank===1,function(){return"Error in reverse1D: x must be rank 1 but got rank "+t.rank+"."}),Hr(t,0)}}),em=A({reverse2d_:function(r,t){var e=C(r,"x","reverse");return R(e.rank===2,function(){return"Error in reverse2D: x must be rank 2 but got rank "+e.rank+"."}),Hr(e,t)}}),tm=A({reverse3d_:function(r,t){var e=C(r,"x","reverse");return R(e.rank===3,function(){return"Error in reverse3D: x must be rank 3 but got rank "+e.rank+"."}),Hr(e,t)}}),nm=A({reverse4d_:function(r,t){var e=C(r,"x","reverse");return R(e.rank===4,function(){return"Error in reverse4D: x must be rank 4 but got rank "+e.rank+"."}),Hr(e,t)}});function Ic(r,t,e,n,o,a){var i=C(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),R(s.rank===4,function(){return"Error in maxPool: input must be rank 4 but got rank "+s.rank+"."}),R(kt(e,n),function(){return"Error in maxPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+n+"'"}),a!=null&&R($e(o),function(){return"Error in maxPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=Pr(s.shape,t,e,n,o,a);if(c.filterWidth===1&&c.filterHeight===1&&it(c.inShape,c.outShape))return i.clone();var l=[s],f=N.runKernelFunc(function(h,d){var p=h.maxPool(s,c);return d([s,p]),p},{x:s},function(h,d){var p=d[0],m=d[1];return{x:function(){return function(v,g,b,x,y,w,_,S){var E=C(v,"dy","maxPoolBackprop"),k=C(g,"input","maxPoolBackprop"),I=C(b,"output","maxPoolBackprop");R(k.rank===E.rank,function(){return"Rank of input ("+k.rank+") does not match rank of dy ("+E.rank+")"}),R(kt(y,w),function(){return"Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+y+" and dilations '"+w+"'"}),R(E.rank===4,function(){return"Error in maxPoolBackprop: dy must be rank 4 but got rank "+E.rank+"."}),R(k.rank===4,function(){return"Error in maxPoolBackprop: input must be rank 4 but got rank "+k.rank+"."});var T=Pr(k.shape,x,y,w,_,S);return N.runKernelFunc(function(D){return D.maxPoolBackprop(E,k,I,T)},{$dy:E,$input:k})}(h,p,m,t,e,n,o)}}},"MaxPool",c,l);return u?f.as3D(f.shape[1],f.shape[2],f.shape[3]):f}function Sc(r,t,e,n,o,a){var i=C(r,"x","avgPool","float32");R(kt(e,n),function(){return"Error in avgPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+n+"'"});var s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),R(s.rank===4,function(){return"Error in avgPool: x must be rank 4 but got rank "+s.rank+"."}),a!=null&&R($e(o),function(){return"Error in avgPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=Pr(s.shape,t,e,n,o,a);if(c.filterWidth===1&&c.filterHeight===1&&it(c.inShape,c.outShape))return i.clone();var l=N.runKernelFunc(function(f){return f.avgPool(s,c)},{x:s},function(f){return{x:function(){return function(h,d,p,m,v,g){var b=C(h,"dy","avgPoolBackprop"),x=C(d,"input","avgPoolBackprop");R(x.rank===b.rank,function(){return"Rank of input ("+x.rank+") does not match rank of dy ("+b.rank+")"}),R(kt(m,v),function(){return"Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+m+" and dilations '"+v+"'"});var y=x,w=b,_=!1;x.rank===3&&(_=!0,y=x.as4D(1,x.shape[0],x.shape[1],x.shape[2]),w=b.as4D(1,b.shape[0],b.shape[1],b.shape[2])),R(w.rank===4,function(){return"Error in avgPoolBackprop: dy must be rank 4 but got rank "+w.rank+"."}),R(y.rank===4,function(){return"Error in avgPoolBackprop: input must be rank 4 but got rank "+y.rank+"."});var S=Pr(y.shape,p,m,v,g),E=N.runKernelFunc(function(k){return k.avgPoolBackprop(w,y,S)},{dy4D:w,input4D:y});return _?E.as3D(E.shape[1],E.shape[2],E.shape[3]):E}(f,s,t,e,n,o)}}},"AvgPool",c);return l=l.cast(i.dtype),u?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var ot=A({maxPool_:function(r,t,e,n,o){return Ic(r,t,e,1,n,o)}}),qr=A({avgPool_:function(r,t,e,n,o){return Sc(r,t,e,1,n,o)}}),rm=A({pool_:function(r,t,e,n,o,a){o==null&&(o=[1,1]),a==null&&(a=1),n===0&&(n="valid");var i=C(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),R(kt(a,o),function(){return"Error in pool: Either strides or dilations must be 1. Got strides "+a+" and dilations '"+o+"'"});var c,l=Pr(s.shape,t,a,o,n),f=[l.dilationHeight,l.dilationWidth];c=n==="same"?function(y,w){var _=y.map(function(k,I){return k+(k-1)*(w[I]-1)}).map(function(k){return k-1}),S=_.map(function(k){return Math.floor(k/2)}),E=_.map(function(k,I){return k-S[I]});return _.map(function(k,I){return[S[I],E[I]]})}([l.filterHeight,l.filterWidth],f):[[0,0],[0,0]];var h=f[0]===1&&f[1]===1,d=function(y,w,_){var S=_.map(function(V){return V[0]}),E=_.map(function(V){return V[1]}),k=y.concat(S,E),I=w.map(function(V,z){return(V-k[z]%V)%V}),T=E.map(function(V,z){return V+I[z]}),D=w.map(function(V,z){return[S[z],T[z]]}),U=w.map(function(V,z){return[0,I[z]]});return[D,U]}([l.inHeight,l.inWidth],f,c),p=d[0],m=d[1],v=h?n:"valid",g=h?s:Pu(s,f,p),b=(e==="avg"?function(){return Sc(g,t,a,1,v)}:function(){return Ic(g,t,a,1,v)})(),x=h?b:Tu(b,f,m);return u?x.as3D(x.shape[1],x.shape[2],x.shape[3]):x}}),om=A({maxPool3d_:function(r,t,e,n,o,a,i){a===void 0&&(a="NDHWC");var s=C(r,"x","maxPool3d"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),R(u.rank===5,function(){return"Error in maxPool3d: x must be rank 5 but got rank "+u.rank+"."}),R(a==="NDHWC",function(){return"Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),R(kt(e,i),function(){return"Error in maxPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"}),o!=null&&R($e(n),function(){return"Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+n+"."});var l=ko(u.shape,t,e,i,n,o,a),f=N.runKernelFunc(function(h,d){var p=h.maxPool3d(u,l);return d([u,p]),p},{x:u},function(h,d){var p=d[0],m=d[1];return{x:function(){return function(v,g,b,x,y,w,_,S){var E=C(v,"dy","maxPool3dBackprop"),k=C(g,"input","maxPool3dBackprop"),I=C(b,"output","maxPool3dBackprop"),T=E,D=k,U=I,V=!1;k.rank===4&&(V=!0,T=E.as5D(1,E.shape[0],E.shape[1],E.shape[2],E.shape[3]),D=k.as5D(1,k.shape[0],k.shape[1],k.shape[2],k.shape[3]),U=I.as5D(1,I.shape[0],I.shape[1],I.shape[2],I.shape[3])),R(T.rank===5,function(){return"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+T.rank+"."}),R(D.rank===5,function(){return"Error in maxPool3dBackprop: input must be rank 5 but got rank "+D.rank+"."}),R(U.rank===5,function(){return"Error in maxPool3dBackprop: output must be rank 5 but got rank "+U.rank+"."}),w==null&&(w=[1,1,1]),R(kt(y,w),function(){return"Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+y+" and dilations '"+w+"'"}),S!=null&&R($e(_),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+S+" but got pad "+_+"."});var z=ko(D.shape,x,y,w,_,S),O=N.runKernelFunc(function(P){return P.maxPool3dBackprop(T,D,U,z)},{dy5D:T,input5D:D});return V?O.as4D(O.shape[1],O.shape[2],O.shape[3],O.shape[4]):O}(h,p,m,t,e,i,n,o)}}});return c?f.as4D(f.shape[1],f.shape[2],f.shape[3],f.shape[4]):f}}),am=A({avgPool3d_:function(r,t,e,n,o,a,i){a===void 0&&(a="NDHWC");var s=C(r,"x","avgPool3d","float32"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),R(u.rank===5,function(){return"Error in avgPool3d: x must be rank 5 but got rank "+u.rank+"."}),R(a==="NDHWC",function(){return"Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),R(kt(e,i),function(){return"Error in avgPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"}),o!=null&&R($e(n),function(){return"Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+n+"."});var l=ko(u.shape,t,e,i,n,o,a),f=N.runKernelFunc(function(h){return h.avgPool3d(u,l)},{x:u},function(h){return{x:function(){return function(d,p,m,v,g,b,x){var y=C(d,"dy","avgPool3dBackprop"),w=C(p,"input","avgPool3dBackprop"),_=y,S=w,E=!1;w.rank===4&&(E=!0,_=y.as5D(1,y.shape[0],y.shape[1],y.shape[2],y.shape[3]),S=w.as5D(1,w.shape[0],w.shape[1],w.shape[2],w.shape[3])),R(_.rank===5,function(){return"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+_.rank+"."}),R(S.rank===5,function(){return"Error in avgPool3dBackprop: input must be rank 5 but got rank "+S.rank+"."}),g==null&&(g=[1,1,1]),R(kt(v,g),function(){return"Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+v+" and dilations '"+g+"'"}),x!=null&&R($e(b),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+x+" but got pad "+b+"."});var k=ko(S.shape,m,v,g,b,x),I=N.runKernelFunc(function(T){return T.avgPool3dBackprop(_,S,k)},{dy5D:_,input5D:S});return E?I.as4D(I.shape[1],I.shape[2],I.shape[3],I.shape[4]):I}(h,u,t,e,i,n,o)}}});return f=f.cast(u.dtype),c?f.as4D(f.shape[1],f.shape[2],f.shape[3],f.shape[4]):f}}),on=A({slice_:function(r,t,e){var n,o,a=C(r,"x","slice");if(a.rank===0)throw new Error("Slicing scalar is not possible");(n=typeof t=="number"?[t].concat(new Array(a.rank-1).fill(0)):t.length<a.rank?t.concat(new Array(a.rank-t.length).fill(0)):t.slice()).forEach(function(u){R(u!==-1,function(){return"slice() does not support negative begin indexing."})}),o=(o=e==null?new Array(a.rank).fill(-1):typeof e=="number"?[e].concat(new Array(a.rank-1).fill(-1)):e.length<a.rank?e.concat(new Array(a.rank-e.length).fill(-1)):e).map(function(u,c){return u>=0?u:(R(u===-1,function(){return"Negative size values should be exactly -1 but got "+u+" for the slice() size at index "+c+"."}),a.shape[c]-n[c])}),Fh(a,n,o);var i=a.shape,s={begin:n,size:o};return N.runKernelFunc(function(u){return u.slice(a,n,o)},{x:a},function(u){for(var c=[],l=0;l<u.rank;l++)c.push([n[l],i[l]-n[l]-o[l]]);return{x:function(){return u.pad(c)}}},"Slice",s)}}),im=A({slice1d_:function(r,t,e){var n=C(r,"x","slice1d");return R(n.rank===1,function(){return"slice1d expects a rank-1 tensor, but got a rank-"+n.rank+" tensor"}),on(n,[t],[e])}}),sm=A({slice2d_:function(r,t,e){var n=C(r,"x","slice2d");return R(n.rank===2,function(){return"slice2d expects a rank-2 tensor, but got a rank-"+n.rank+" tensor"}),on(n,t,e)}}),Ac=A({slice3d_:function(r,t,e){var n=C(r,"x","slice3d");return R(n.rank===3,function(){return"slice3d expects a rank-3 tensor, but got a rank-"+n.rank+" tensor"}),on(n,t,e)}}),um=A({slice4d_:function(r,t,e){var n=C(r,"x","slice4d");return R(n.rank===4,function(){return"slice4d expects a rank-4 tensor, but got a rank-"+n.rank+" tensor"}),on(n,t,e)}});function Dc(r,t,e,n,o){return t.rank<e.rank&&(t=t.reshape(Et(t.shape,n))),r.rank<e.rank&&(r=r.reshape(Et(r.shape,n))),{x:function(){var a=r.mul(e.equal(t).cast(r.dtype));return o==null?a:a.transpose(o)}}}var cm=A({all_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","all","bool"),o=nt(t,n.shape),a=o,i=sn(a,n.rank);i!=null&&(n=n.transpose(i),a=un(a.length,n.rank));var s=N.runKernelFunc(function(c){return c.all(n,a)},{$x:n});if(e){var u=Et(s.shape,o);return s.reshape(u)}return s}}),lm=A({any_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","any","bool"),o=nt(t,n.shape),a=o,i=sn(a,n.rank);i!=null&&(n=n.transpose(i),a=un(a.length,n.rank));var s=N.runKernelFunc(function(c){return c.any(n,a)},{$x:n});if(e){var u=Et(s.shape,o);return s.reshape(u)}return s}}),fm=A({argMax_:function(r,t){t===void 0&&(t=0);var e=C(r,"x","argMax");t==null&&(t=0);var n=nt(t,e.shape),o=sn(n,e.rank);o!=null&&(e=e.transpose(o),n=un(n.length,e.rank));var a={axis:n[0]},i=[e];return N.runKernelFunc(function(s,u){var c=s.argMax(e,n[0]);return u([e]),c},{x:e},function(s,u){var c=u[0];return{x:function(){return Te(c)}}},"ArgMax",a,i)}}),hm=A({argMin_:function(r,t){t===void 0&&(t=0);var e=C(r,"x","argMin");t==null&&(t=0);var n=nt(t,e.shape),o=sn(n,e.rank);return o!=null&&(e=e.transpose(o),n=un(n.length,e.rank)),N.runKernelFunc(function(a,i){var s=a.argMin(e,n[0]);return i([e]),s},{$x:e},function(a,i){var s=i[0];return{$x:function(){return Te(s)}}})}}),dm=A({logSumExp_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","logSumExp"),o=nt(t,n.shape),a=n.max(o,!0),i=n.sub(a).exp().sum(o).log(),s=a.reshape(i.shape).add(i);if(e){var u=Et(s.shape,o);return s.reshape(u)}return s}}),Go=A({max_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","max"),o=n,a=nt(t,n.shape),i=a,s=sn(i,n.rank);s!=null&&(n=n.transpose(s),i=un(i.length,n.rank));var u=[n],c=N.runKernelFunc(function(f,h){var d=f.max(n,i);return h([o,d]),d},{x:n},function(f,h){return Dc(f,h[1],h[0],a,s)},"Max",{axes:i},u,[!0]);if(e){var l=Et(c.shape,a);c=c.reshape(l)}return c}}),pm=A({mean_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","mean"),o=nt(t,n.shape),a=ae(ht(n.shape,o)[1]);return Lo(function(i){var s=Z(a);return{value:(s.dtype===i.dtype?i:i.cast(s.dtype)).div(s).sum(t,e),gradFunc:function(u){var c=i.shape.slice();return o.forEach(function(l){c[l]=1}),u.reshape(c).mul(br(i.shape,"float32")).div(a)}}})(n)}}),vm=A({min_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","min"),o=n,a=nt(t,n.shape),i=a,s=sn(i,n.rank);s!=null&&(n=n.transpose(s),i=un(i.length,n.rank));var u=[n],c=N.runKernelFunc(function(f,h){var d=f.min(n,i);return h([o,d]),d},{x:n},function(f,h){return Dc(f,h[1],h[0],a,s)},"Min",{axes:i},u,[!0]);if(e){var l=Et(c.shape,a);c=c.reshape(l)}return c}}),mm=A({moments_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=nt(t,(r=C(r,"x","moments")).shape),o=r.mean(n,e),a=o.shape;e||(a=Et(o.shape,n));var i=r.toFloat().sub(o.reshape(a)).square();return{mean:o,variance:i.mean(n,e)}}}),Tc=A({sum_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","sum");n.dtype==="bool"&&(n=n.toInt());var o=nt(t,n.shape);return Lo(function(a){var i=sn(o,a.rank),s=o,u=a;i!=null&&(u=a.transpose(i),s=un(s.length,a.rank));var c=function(d){var p=a.shape.slice();return o.forEach(function(m){p[m]=1}),d.reshape(p).mul(br(a.shape,"float32"))},l={axes:s},f=N.runKernelFunc(function(d){return d.sum(u,s)},{x:u},function(d){return{x:function(){return c(d)}}},"Sum",l);if(e){var h=Et(f.shape,o);f=f.reshape(h)}return{value:f,gradFunc:c}})(n)}}),gm=A({prod_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=C(r,"x","prod");n.dtype==="bool"&&(n=n.toInt());var o=nt(t,n.shape),a=sn(o,n.rank),i=o,s=n;a!=null&&(s=n.transpose(a),i=un(i.length,n.rank));var u=N.runKernelFunc(function(l){return l.prod(s,i)},{permutedX:s});if(e){var c=Et(u.shape,o);u=u.reshape(c)}return u}}),Nc=A({elu_:function(r){var t=C(r,"x","elu");return N.runKernelFunc(function(e,n){var o=e.elu(t);return n([o]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){return N.runKernelFunc(function(a){return a.eluDer(e,o)},{dy:e,y:o})}}})}}),ym=A({leakyRelu_:function(r,t){t===void 0&&(t=.2);var e=C(r,"x","leakyRelu");return xi(Z(t).mul(e),e)}}),Fc=A({prelu_:function(r,t){var e=C(r,"x","prelu"),n=C(t,"alpha","prelu");return N.runKernelFunc(function(o,a){var i=o.prelu(e,n);return a([e,n]),i},{x:e,alpha:n},function(o,a){var i=a[0],s=a[1],u=i.greater(0);return{x:function(){return zn(u,o,o.mul(s))},alpha:function(){var c=zn(u,Te(o),o.mul(i)),l=et(s.shape,o.shape);return l.length>0&&(c=c.sum(l)),c.reshape(s.shape)}}},"Prelu")}}),qe=A({relu_:function(r){var t=C(r,"x","relu");return t.dtype==="bool"?t.toInt():N.runKernelFunc(function(e,n){var o=e.relu(t);return n([t]),o},{x:t},function(e,n){var o=n[0];return{x:function(){return e.mulStrict(o.step().toFloat())}}},"Relu")}}),Pc=A({relu6_:function(r){var t=C(r,"x","relu6");return t.dtype==="bool"?t.toInt():N.runKernelFunc(function(e,n){var o=e.relu6(t);return n([t]),o},{x:t},function(e,n){var o=n[0],a=o.lessEqual(6).mul(o.step());return{x:function(){return e.mulStrict(a.toFloat())}}},"Relu6")}}),bm=A({selu_:function(r){var t=C(r,"x","selu");return N.runKernelFunc(function(e,n){var o=e.selu(t);return n([t]),o},{$x:t},function(e,n){var o=n[0];return{$x:function(){var a=o.greater(Z(0)),i=Z(gi),s=Z(yi),u=e.mul(s),c=e.mul(i).mul(o.toFloat().exp());return zn(a,u,c)}}})}}),Sn=A({transpose_:function(r,t){var e=C(r,"x","transpose");if(t==null&&(t=e.shape.map(function(o,a){return a}).reverse()),R(e.rank===t.length,function(){return"Error in transpose: rank of input "+e.rank+" must match length of perm "+t+"."}),t.forEach(function(o){R(o>=0&&o<e.rank,function(){return"All entries in 'perm' must be between 0 and "+(e.rank-1)+" but got "+t})}),e.rank<=1)return e.clone();var n={perm:t};return N.runKernelFunc(function(o){return o.transpose(e,t)},{x:e},function(o){var a=si(t);return{x:function(){return o.transpose(a)}}},"Transpose",n)}}),xm=A({localResponseNormalization_:function(r,t,e,n,o){t===void 0&&(t=5),e===void 0&&(e=1),n===void 0&&(n=1),o===void 0&&(o=.5);var a=C(r,"x","localResponseNormalization");R(a.rank===4||a.rank===3,function(){return`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank `+a.rank+"."}),R($e(t),function(){return"Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+t+"."});var i=a,s=!1;a.rank===3&&(s=!0,i=a.as4D(1,a.shape[0],a.shape[1],a.shape[2]));var u=N.runKernelFunc(function(c,l){var f=c.localResponseNormalization4D(i,t,e,n,o);return l([i,f]),f},{x4D:i},function(c,l){var f=l[0],h=l[1];return{x4D:function(){return N.runKernelFunc(function(d){return d.LRNGrad(c,f,h,t,e,n,o)},{})}}});return s?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Mc=A({norm_:function(r,t,e,n){t===void 0&&(t="euclidean"),e===void 0&&(e=null),n===void 0&&(n=!1);var o=function s(u,c,l){if(l===void 0&&(l=null),u.rank===0)return u.abs();if(u.rank!==1&&l===null)return s(u.reshape([-1]),c,l);if(u.rank===1||typeof l=="number"||Array.isArray(l)&&l.length===1){if(c===1)return u.abs().sum(l);if(c===1/0)return u.abs().max(l);if(c===-1/0)return u.abs().min(l);if(c==="euclidean"||c===2)return u.abs().pow(Z(2,"int32")).sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}if(Array.isArray(l)&&l.length===2){if(c===1)return u.abs().sum(l[0]).max(l[1]-1);if(c===1/0)return u.abs().sum(l[1]).max(l[0]);if(c===-1/0)return u.abs().sum(l[1]).min(l[0]);if(c==="fro"||c==="euclidean")return u.square().sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}throw new Error("Error in norm: invalid axis: "+l)}(r=C(r,"x","norm"),t,e),a=o.shape;if(n){var i=nt(e,r.shape);a=Et(o.shape,i)}return o.reshape(a)}}),wm=A({basicLSTMCell_:function(r,t,e,n,o,a){var i=C(r,"forgetBias","basicLSTMCell"),s=C(t,"lstmKernel","basicLSTMCell"),u=C(e,"lstmBias","basicLSTMCell"),c=C(n,"data","basicLSTMCell"),l=C(o,"c","basicLSTMCell"),f=C(a,"h","basicLSTMCell"),h=c.concat(f,1).matMul(s).add(u),d=h.shape[0],p=h.shape[1]/4,m=[d,p],v=h.slice([0,0],m),g=h.slice([0,p],m),b=h.slice([0,2*p],m),x=h.slice([0,3*p],m),y=v.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(i.add(b).sigmoid())),w=y.tanh().mulStrict(x.sigmoid());return[y,w]}}),_m=A({multiRNNCell_:function(r,t,e,n){for(var o=C(t,"data","multiRNNCell"),a=bo(e,"c","multiRNNCell"),i=bo(n,"h","multiRNNCell"),s=o,u=[],c=0;c<r.length;c++){var l=r[c](s,a[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}var f=[],h=[];for(c=0;c<u.length;c+=2)f.push(u[c]),h.push(u[c+1]);return[f,h]}}),Cm=A({movingAverage_:function(r,t,e,n,o){o===void 0&&(o=!0);var a=C(r,"v","movingAverage"),i=C(t,"x","movingAverage"),s=C(e,"decay","movingAverage");xf(a,i),R(it(a.shape,i.shape),function(){return"Shape mismatch in v and x"});var u=Z(1),c=u.sub(s),l=i.sub(a).mul(c);if(o){R(n!=null,function(){return"When using zeroDebias: true, step is required."});var f=C(n,"step","movingAverage");l=l.div(u.sub(Ao(s,f)))}return a.add(l)}}),Em=A({stridedSlice_:function(r,t,e,n,o,a,i,s,u){if(o===void 0&&(o=0),a===void 0&&(a=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),n==null&&(n=new Array(t.length)),i!==0)throw new Error("ellipsis mask is not yet supported");var c=C(r,"x","stridedSlice"),l=ws(s),f=c.shape.slice();l.forEach(function(v){t[v]=0,e[v]=1,f.splice(v,0,1)}),c=c.reshape(f);for(var h=0;h<c.rank;h++)t[h]=Ph(o,t,n,c.shape,h),e[h]=Mh(a,e,n,c.shape,h),n[h]=n[h]||1;var d=ws(u);d.forEach(function(v){e[v]=t[v]+1,n[v]=1});var p=fi(t,e,n),m=p.filter(function(v,g){return d.indexOf(g)===-1});return n.every(function(v){return v===1})?on(c,t,p).reshape(m):N.runKernelFunc(function(v){return v.stridedSlice(c,t,e,n)},{$x:c}).reshape(m)}}),km=A({topk_:function(r,t,e){t===void 0&&(t=1),e===void 0&&(e=!0);var n=C(r,"x","topk");if(n.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");var o=n.shape[n.shape.length-1];if(t>o)throw new Error("'k' passed to topk() must be <= the last dimension ("+o+") but got "+t);var a=N.runKernelFunc(function(i){return i.topk(n,t,e)},{$x:n});return{values:a[0],indices:a[1]}}}),Rm=A({scatterND_:function(r,t,e){var n=C(r,"indices","scatterND","int32"),o=C(t,"updates","scatterND");return Nh(o,n,e),N.runKernelFunc(function(a){return a.scatterND(n,o,e)},{indices:n,updates:o},null,"ScatterNd",{shape:e})}}),Ei=A({fft_:function(r){R(r.dtype==="complex64",function(){return"The dtype for tf.spectral.fft() must be complex64 but got "+r.dtype+"."});var t=r.shape[r.shape.length-1],e=r.size/t,n=r.as2D(e,t);return N.runKernelFunc(function(o){return o.fft(n)},{input:r}).reshape(r.shape)}}),Do=A({ifft_:function(r){R(r.dtype==="complex64",function(){return"The dtype for tf.spectral.ifft() must be complex64 but got "+r.dtype+"."});var t=r.shape[r.shape.length-1],e=r.size/t,n=r.as2D(e,t);return N.runKernelFunc(function(o){return o.ifft(n)},{input:r}).reshape(r.shape)}}),ki=A({rfft_:function(r,t){R(r.dtype==="float32",function(){return"The dtype for rfft() must be real value but got "+r.dtype});var e,n=r.shape[r.shape.length-1],o=r.size/n;if(t!=null&&t<n){var a=r.shape.map(function(g){return 0}),i=r.shape.map(function(g){return g});i[r.shape.length-1]=t,e=r.slice(a,i),n=t}else if(t!=null&&t>n){var s=r.shape.map(function(g){return g});s[r.shape.length-1]=t-n,e=r.concat(Ge(s),r.shape.length-1),n=t}else e=r;var u=e.zerosLike(),c=ut(e,u).as2D(o,n),l=Ei(c),f=Math.floor(n/2)+1,h=Wt(l),d=Zt(l),p=h.split([f,n-f],h.shape.length-1),m=d.split([f,n-f],d.shape.length-1),v=e.shape.slice();return v[e.shape.length-1]=f,ut(p[0],m[0]).reshape(v)}}),Oc=A({irfft_:function(r){var t=r.shape[r.shape.length-1],e=r.size/t;if(t<=2){var n=r.as2D(e,t),o=Do(n);return Wt(o)}var a=[e,2*(t-1)],i=Wt(r).as2D(e,t),s=Zt(r).as2D(e,t),u=i.slice([0,1],[e,t-2]).reverse(1),c=s.slice([0,1],[e,t-2]).reverse(1).mul(Z(-1)),l=i.concat(u,1),f=s.concat(c,1);return n=ut(l,f).as2D(a[0],a[1]),o=Do(n),Wt(o)}}),Im=Object.freeze({fft:Ei,ifft:Do,rfft:ki,irfft:Oc}),Sm=A({sparseToDense_:function(r,t,e,n){n===void 0&&(n=0);var o=C(r,"sparseIndices","sparseToDense","int32"),a=C(t,"sparseValues","sparseToDense"),i=C(n,"defaultValue","sparseToDense",a.dtype);return function(s,u,c,l){if(s.dtype!=="int32")throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+s.dtype+".");if(s.rank>2)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+s.shape+".");var f=s.rank>0?s.shape[0]:1,h=s.rank>1?s.shape[1]:1;if(c.length!==h)throw new Error("outputShape has incorrect number of elements:, "+c.length+", should be: "+h+".");var d=u.size;if(u.rank!==0&&(u.rank!==1||d!==f))throw new Error("sparseValues has incorrect shape "+u.shape+", should be [] or ["+f+"]");if(u.dtype!==l.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(o,a,e,i),N.runKernelFunc(function(s){return s.sparseToDense(o,a,e,i)},{$sparseIndices:o,$sparseValues:a,$defaultValue:i})}}),Am=A({gatherND_:function(r,t){var e=C(t,"indices","gatherND","int32"),n=C(r,"x","gatherND");return N.runKernelFunc(function(o){return o.gatherND(n,e)},{x:n,indices:e},null,"GatherNd")}}),Dm=A({diag_:function(r){var t=C(r,"x","diag").flatten(),e=r.shape.concat(r.shape);return N.runKernelFunc(function(n){return n.diag(t)},{$x:t}).reshape(e)}}),Tm=A({dropout_:function(r,t,e,n){var o=C(r,"x","dropout");if(R(o.dtype==="float32",function(){return"x has to be a floating point tensor since it's going to be scaled, but got a "+o.dtype+" tensor instead."}),R(t>=0&&t<1,function(){return"rate must be a float in the range [0, 1), but got "+t+"."}),t===0)return r instanceof He?o.clone():o;var a=function(u,c){if(c==null)return u.shape.slice();if(it(u.shape,c))return c;if(u.shape.length===c.length){for(var l=[],f=0;f<u.shape.length;f++)c[f]==null&&u.shape[f]!=null?l.push(u.shape[f]):l.push(c[f]);return l}return c}(o,e),i=1-t,s=Fu(a,0,1,"float32",n).add(i).floor().div(i);return o.mul(s)}});function Bc(r,t,e){for(var n=1-r%2,o=new Float32Array(r),a=0;a<r;++a){var i=2*Math.PI*a/(r+n-1);o[a]=t-e*Math.cos(i)}return Ye(o,"float32")}var Ri=A({hannWindow_:function(r){return Bc(r,.5,.5)}}),Lc=A({hammingWindow_:function(r){return Bc(r,.54,.46)}}),Ii=A({frame_:function(r,t,e,n,o){n===void 0&&(n=!1),o===void 0&&(o=0);for(var a=0,i=[];a+t<=r.size;)i.push(on(r,a,t)),a+=e;if(n)for(;a<r.size;){var s=a+t-r.size,u=Qe([on(r,a,t-s),rn([s],o)]);i.push(u),a+=e}return i.length===0?kn([],[0,t]):Qe(i).as2D(i.length,t)}}),Wc=A({stft_:function(r,t,e,n,o){var a;o===void 0&&(o=Ri),n==null&&(a=t,n=Math.floor(Math.pow(2,Math.ceil(Math.log(a)/Math.log(2)))));for(var i=Ii(r,t,e),s=mt(i,o(t)),u=[],c=0;c<i.shape[0];c++)u.push(ki(s.slice([c,0],[1,t]),n));return Qe(u)}}),Nm=Object.freeze({hannWindow:Ri,hammingWindow:Lc,frame:Ii,stft:Wc}),vt,Fm=function(r,t,e){return e===void 0&&(e=1),re(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,f,h,d,p,m,v;return oe(this,function(g){switch(g.label){case 0:return n=C(r,"predictions","inTopK"),o=C(t,"targets","inTopK"),R(n.rank>1,function(){return"inTopK() expects the predictions to be of rank 2 or higher, but got "+n.rank}),R(n.rank-1===o.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+n.rank+" and targets rank "+o.rank}),Be(n.shape.slice(0,n.shape.length-1),o.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),a=n.shape[n.shape.length-1],R(e>0&&e<=a,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+a+"), but got "+e}),[4,n.data()];case 1:return i=g.sent(),[4,o.data()];case 2:for(s=g.sent(),u=[i.length/a,a],l=u[1],f=Tr("bool",c=u[0]),h=0;h<c;h++){for(d=h*l,p=i.subarray(d,d+l),m=[],v=0;v<p.length;v++)m.push({value:p[v],index:v});for(m.sort(function(b,x){return x.value-b.value}),f[h]=0,v=0;v<e;v++)if(m[v].index===s[h]){f[h]=1;break}}return r!==n&&n.dispose(),t!==o&&o.dispose(),[2,lt(f,o.shape,"bool")]}})})};(function(r){r[r.NONE=0]="NONE",r[r.MEAN=1]="MEAN",r[r.SUM=2]="SUM",r[r.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(vt||(vt={}));var Pm=A({absoluteDifference_:function(r,t,e,n){n===void 0&&(n=vt.SUM_BY_NONZERO_WEIGHTS);var o=C(r,"labels","absoluteDifference"),a=C(t,"predictions","absoluteDifference"),i=null;e!=null&&(i=C(e,"weights","absoluteDifference")),Be(o.shape,a.shape,"Error in absoluteDifference: ");var s=o.sub(a).abs();return vn(s,i,n)}}),vn=A({computeWeightedLoss_:function(r,t,e){e===void 0&&(e=vt.SUM_BY_NONZERO_WEIGHTS);var n=C(r,"losses","computeWeightedLoss"),o=null;t!=null&&(o=C(t,"weights","computeWeightedLoss"));var a=o==null?n:n.mul(o);if(e===vt.NONE)return a;if(e===vt.SUM)return a.sum();if(e===vt.MEAN){if(o==null)return a.mean();var i=n.size/o.size,s=a.sum().div(o.sum());return i>1?s.div(Z(i)):s}if(e===vt.SUM_BY_NONZERO_WEIGHTS){if(o==null)return a.sum().div(Z(n.size));var u=o.mul(br(n.shape)).notEqual(Z(0)).sum().toFloat();return a.sum().div(u)}throw Error("Unknown reduction: "+e)}}),Mm=A({cosineDistance_:function(r,t,e,n,o){o===void 0&&(o=vt.SUM_BY_NONZERO_WEIGHTS);var a=C(r,"labels","cosineDistance"),i=C(t,"predictions","cosineDistance"),s=null;n!=null&&(s=C(n,"weights","cosineDistance")),Be(a.shape,i.shape,"Error in cosineDistance: ");var u=Z(1).sub(a.mul(i).sum(e,!0));return vn(u,s,o)}}),Om=A({hingeLoss_:function(r,t,e,n){n===void 0&&(n=vt.SUM_BY_NONZERO_WEIGHTS);var o=C(r,"labels","hingeLoss"),a=C(t,"predictions","hingeLoss"),i=null;e!=null&&(i=C(e,"weights","hingeLoss")),Be(o.shape,a.shape,"Error in hingeLoss: ");var s=Z(1);o=Z(2).mul(o).sub(s);var u=s.sub(o.mul(a)).relu();return vn(u,i,n)}}),Bm=A({huberLoss_:function(r,t,e,n,o){n===void 0&&(n=1),o===void 0&&(o=vt.SUM_BY_NONZERO_WEIGHTS);var a=C(r,"labels","huberLoss"),i=C(t,"predictions","huberLoss"),s=null;e!=null&&(s=C(e,"weights","huberLoss")),Be(a.shape,i.shape,"Error in huberLoss: ");var u=Z(n),c=i.sub(a).abs(),l=yc(c,u),f=c.sub(l),h=Z(.5).mul(l.square()).add(u.mul(f));return vn(h,s,o)}}),Lm=A({logLoss_:function(r,t,e,n,o){n===void 0&&(n=1e-7),o===void 0&&(o=vt.SUM_BY_NONZERO_WEIGHTS);var a=C(r,"labels","logLoss"),i=C(t,"predictions","logLoss"),s=null;e!=null&&(s=C(e,"weights","logLoss")),Be(a.shape,i.shape,"Error in logLoss: ");var u=Z(1),c=Z(n),l=a.mul(i.add(c).log()).neg().sub(u.sub(a).mul(u.sub(i).add(c).log()));return vn(l,s,o)}}),Wm=A({meanSquaredError_:function(r,t,e,n){n===void 0&&(n=vt.SUM_BY_NONZERO_WEIGHTS);var o=C(r,"labels","meanSquaredError"),a=C(t,"predictions","meanSquaredError"),i=null;e!=null&&(i=C(e,"weights","meanSquaredError")),Be(o.shape,a.shape,"Error in meanSquaredError: ");var s=o.squaredDifference(a);return vn(s,i,n)}}),Vm=A({sigmoidCrossEntropy_:function(r,t,e,n,o){n===void 0&&(n=0),o===void 0&&(o=vt.SUM_BY_NONZERO_WEIGHTS);var a=C(r,"multiClassLabels","sigmoidCrossEntropy"),i=C(t,"logits","sigmoidCrossEntropy"),s=null;if(e!=null&&(s=C(e,"weights","sigmoidCrossEntropy")),Be(a.shape,i.shape,"Error in sigmoidCrossEntropy: "),n>0){var u=Z(n),c=Z(1),l=Z(.5);a=a.mul(c.sub(u)).add(l.mul(u))}var f=function(h,d){var p=C(h,"labels","sigmoidCrossEntropyWithLogits"),m=C(d,"logits","sigmoidCrossEntropyWithLogits");Be(p.shape,m.shape,"Error in sigmoidCrossEntropyWithLogits: ");var v=m.relu(),g=m.mul(p),b=m.abs().neg().exp().log1p();return v.sub(g).add(b)}(a,i);return vn(f,s,o)}}),Um=A({softmaxCrossEntropy_:function(r,t,e,n,o){n===void 0&&(n=0),o===void 0&&(o=vt.SUM_BY_NONZERO_WEIGHTS);var a=C(r,"onehotLabels","softmaxCrossEntropy"),i=C(t,"logits","softmaxCrossEntropy"),s=null;if(e!=null&&(s=C(e,"weights","softmaxCrossEntropy")),Be(a.shape,i.shape,"Error in softmaxCrossEntropy: "),n>0){var u=Z(n),c=Z(1),l=Z(a.shape[1]);a=a.mul(c.sub(u)).add(u.div(l))}var f=function(h,d,p){if(p===void 0&&(p=-1),p===-1&&(p=d.rank-1),p!==d.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+d.rank+" and dim was "+p);return Lo(function(m,v,g){var b=v.logSumExp([p],!0),x=v.toFloat().sub(b);return g([m,x]),{value:x.mul(m).neg().sum([p]),gradFunc:function(y,w){var _=w[0],S=w[1],E=Et(y.shape,[p]);return[y.reshape(E).mul(_.toFloat().sub(S.exp())),y.reshape(E).mul(S.exp().sub(_.toFloat()))]}}})(h,d)}(a,i);return vn(f,s,o)}}),zm=Object.freeze({get Reduction(){return vt},absoluteDifference:Pm,computeWeightedLoss:vn,cosineDistance:Mm,hingeLoss:Om,huberLoss:Bm,logLoss:Lm,meanSquaredError:Wm,sigmoidCrossEntropy:Vm,softmaxCrossEntropy:Um});function Gs(r,t){return t===void 0&&(t=!1),N.tidy(function(){if(r.shape.length!==2)throw new Error("qr2d() requires a 2D Tensor, but got a "+r.shape.length+"D Tensor.");for(var e=r.shape[0],n=r.shape[1],o=Nu(e),a=r.clone(),i=kn([[1]],[1,1]),s=i.clone(),u=e>=n?n:e,c=function(f){var h,d=a,p=s,m=o;h=N.tidy(function(){var v=a.slice([f,f],[e-f,1]),g=v.norm(),b=a.slice([f,f],[1,1]),x=kn([[-1]]).where(b.greater(0),kn([[1]])),y=b.sub(x.mul(g)),w=v.div(y);s=w.shape[0]===1?i.clone():i.concat(w.slice([1,0],[w.shape[0]-1,w.shape[1]]),0);var _=x.matMul(y).div(g).neg(),S=a.slice([f,0],[e-f,n]),E=_.mul(s);if(f===0)a=S.sub(E.matMul(s.transpose().matMul(S)));else{var k=S.sub(E.matMul(s.transpose().matMul(S)));a=a.slice([0,0],[f,n]).concat(k,0)}var I=o.slice([0,f],[e,o.shape[1]-f]);if(f===0)o=I.sub(I.matMul(s).matMul(E.transpose()));else{var T=I.sub(I.matMul(s).matMul(E.transpose()));o=o.slice([0,0],[e,f]).concat(T,1)}return[s,a,o]}),s=h[0],a=h[1],o=h[2],Ct([d,p,m])},l=0;l<u;++l)c(l);return!t&&e>n&&(o=o.slice([0,0],[e,n]),a=a.slice([0,0],[n,n])),[o,a]})}var Gm=A({bandPart_:function(r,t,e){if(t%1!=0)throw new Error("bandPart(): numLower must be an integer, got "+t+".");if(e%1!=0)throw new Error("bandPart(): numUpper must be an integer, got "+e+".");var n=C(r,"a","bandPart");if(n.rank<2)throw new Error("bandPart(): Rank must be at least 2, got "+n.rank+".");var o=n.shape,a=n.shape.slice(-2),i=a[0],s=a[1];if(!(t<=i))throw new Error("bandPart(): numLower ("+t+") must not be greater than the number of rows ("+i+").");if(!(e<=s))throw new Error("bandPart(): numUpper ("+e+") must not be greater than the number of columns ("+s+").");t<0&&(t=i),e<0&&(e=s);var u=xo(0,i,1,"int32").reshape([-1,1]),c=xo(0,s,1,"int32"),l=tt(u,c),f=Vo(l.lessEqual(Z(+t,"int32")),l.greaterEqual(Z(-e,"int32"))),h=Ge([i,s],n.dtype);return Mt(Ze(n.reshape([-1,i,s])).map(function(d){return zn(f,d,h)})).reshape(o)}}),Hm=A({gramSchmidt_:function(r){var t;if(Array.isArray(r)){t=!1,R(r!=null&&r.length>0,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var e=r[0].shape[0],n=function(u){R(r[u].shape[0]===e,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: ("+r[u].shape[0]+" vs. "+e+")"})},o=1;o<r.length;++o)n(o)}else t=!0,r=ci(r,r.shape[0],0).map(function(u){return Mu(u,[0])});R(r.length<=r[0].shape[0],function(){return"Gram-Schmidt: Number of vectors ("+r.length+") exceeds number of dimensions ("+r[0].shape[0]+")."});var a=[],i=r,s=function(u){a.push(N.tidy(function(){var c=i[u];if(u>0)for(var l=0;l<u;++l){var f=Tc(a[l].mulStrict(c)).mul(a[l]);c=c.sub(f)}return c.div(Mc(c,"euclidean"))}))};for(o=0;o<r.length;++o)s(o);return t?Mt(a,0):a}}),qm=A({qr_:function(r,t){if(t===void 0&&(t=!1),r.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+r.rank);if(r.rank===2)return Gs(r,t);var e=r.shape.slice(0,r.shape.length-2).reduce(function(i,s){return i*s}),n=Ze(r.reshape([e,r.shape[r.shape.length-2],r.shape[r.shape.length-1]]),0),o=[],a=[];return n.forEach(function(i){var s=Gs(i,t),u=s[0],c=s[1];o.push(u),a.push(c)}),[Mt(o,0).reshape(r.shape),Mt(a,0).reshape(r.shape)]}}),jm=Object.freeze({bandPart:Gm,gramSchmidt:Hm,qr:qm});function Ho(r,t,e,n,o,a){n==null&&(n=.5),o==null&&(o=Number.NEGATIVE_INFINITY),a==null&&(a=0);var i=r.shape[0];return e=Math.min(e,i),R(0<=n&&n<=1,function(){return"iouThreshold must be in [0, 1], but was '"+n+"'"}),R(r.rank===2,function(){return"boxes must be a 2D tensor, but was of rank '"+r.rank+"'"}),R(r.shape[1]===4,function(){return"boxes must have 4 columns, but 2nd dimension was "+r.shape[1]}),R(t.rank===1,function(){return"scores must be a 1D tensor"}),R(t.shape[0]===i,function(){return"scores has incompatible shape with boxes. Expected "+i+", but was "+t.shape[0]}),R(0<=a&&a<=1,function(){return"softNmsSigma must be in [0, 1], but was '"+a+"'"}),{maxOutputSize:e,iouThreshold:n,scoreThreshold:o,softNmsSigma:a}}var Km=A({resizeBilinear_:function(r,t,e){e===void 0&&(e=!1);var n=C(r,"images","resizeBilinear");R(n.rank===3||n.rank===4,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got rank "+n.rank+"."}),R(t.length===2,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+t+"."});var o=n,a=!1;n.rank===3&&(a=!0,o=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=t[0],s=t[1],u=N.runKernelFunc(function(c,l){return l([o]),c.resizeBilinear(o,i,s,e)},{x:o},function(c,l){return{x:function(){return N.runKernelFunc(function(f){return f.resizeBilinearBackprop(c,l[0],e)},{})}}},"ResizeBilinear",{alignCorners:e,newHeight:i,newWidth:s});return a?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Xm=A({resizeNearestNeighbor_:function(r,t,e){e===void 0&&(e=!1);var n=C(r,"images","resizeNearestNeighbor");R(n.rank===3||n.rank===4,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+n.rank+"."}),R(t.length===2,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."}),R(n.dtype==="float32"||n.dtype==="int32",function(){return"`images` must have `int32` or `float32` as dtype"});var o=n,a=!1;n.rank===3&&(a=!0,o=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=t[0],s=t[1],u=N.runKernelFunc(function(c,l){return l([o]),c.resizeNearestNeighbor(o,i,s,e)},{batchImages:o},function(c,l){return{batchImages:function(){return N.runKernelFunc(function(f){return f.resizeNearestNeighborBackprop(c,l[0],e)},{})}}});return a?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),$m=A({nonMaxSuppression_:function(r,t,e,n,o){n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY);var a=C(r,"boxes","nonMaxSuppression"),i=C(t,"scores","nonMaxSuppression"),s=Ho(a,i,e,n,o);e=s.maxOutputSize,n=s.iouThreshold,o=s.scoreThreshold;var u={maxOutputSize:e,iouThreshold:n,scoreThreshold:o};return N.runKernelFunc(function(c){return c.nonMaxSuppression(a,i,e,n,o)},{boxes:a,scores:i},null,"NonMaxSuppressionV3",u)}}),Ym=function(r,t,e,n,o){return n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),re(this,void 0,void 0,function(){var a,i,s,u,c,l,f;return oe(this,function(h){switch(h.label){case 0:return a=C(r,"boxes","nonMaxSuppressionAsync"),i=C(t,"scores","nonMaxSuppressionAsync"),s=Ho(a,i,e,n,o),e=s.maxOutputSize,n=s.iouThreshold,o=s.scoreThreshold,[4,Promise.all([a.data(),i.data()])];case 1:return u=h.sent(),c=u[0],l=u[1],f=di(c,l,e,n,o),a!==r&&a.dispose(),i!==t&&i.dispose(),[2,f]}})})},Jm=A({nonMaxSuppressionWithScore_:function(r,t,e,n,o,a){n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),a===void 0&&(a=0);var i=C(r,"boxes","nonMaxSuppression"),s=C(t,"scores","nonMaxSuppression"),u=Ho(i,s,e,n,o,a),c={maxOutputSize:e=u.maxOutputSize,iouThreshold:n=u.iouThreshold,scoreThreshold:o=u.scoreThreshold,softNmsSigma:a=u.softNmsSigma},l=N.runKernel("NonMaxSuppressionV5",{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),Qm=function(r,t,e,n,o,a){return n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),a===void 0&&(a=0),re(this,void 0,void 0,function(){var i,s,u,c,l,f,h;return oe(this,function(d){switch(d.label){case 0:return i=C(r,"boxes","nonMaxSuppressionAsync"),s=C(t,"scores","nonMaxSuppressionAsync"),u=Ho(i,s,e,n,o,a),e=u.maxOutputSize,n=u.iouThreshold,o=u.scoreThreshold,a=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return c=d.sent(),l=c[0],f=c[1],h=pi(l,f,e,n,o,a),i!==r&&i.dispose(),s!==t&&s.dispose(),[2,h]}})})},Zm=A({cropAndResize_:function(r,t,e,n,o,a){var i=C(r,"image","cropAndResize"),s=C(t,"boxes","cropAndResize","float32"),u=C(e,"boxInd","cropAndResize","int32");o=o||"bilinear",a=a||0;var c=s.shape[0];return R(i.rank===4,function(){return"Error in cropAndResize: image must be rank 4,but got rank "+i.rank+"."}),R(s.rank===2&&s.shape[1]===4,function(){return"Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+s.shape+"."}),R(u.rank===1&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+s.shape+"."}),R(n.length===2,function(){return"Error in cropAndResize: cropSize must be of length 2, but got length "+n.length+"."}),R(n[0]>=1&&n[1]>=1,function(){return"cropSize must be atleast [1,1], but was "+n}),R(o==="bilinear"||o==="nearest",function(){return"method must be bilinear or nearest, but was "+o}),N.runKernelFunc(function(l,f){return l.cropAndResize(i,s,u,n,o,a)},{images:i,boxes:s,boxInd:u},null,"CropAndResize",{method:o,extrapolationValue:a,cropSize:n})}}),Si=Object.freeze({resizeBilinear:Km,resizeNearestNeighbor:Xm,nonMaxSuppression:$m,nonMaxSuppressionAsync:Ym,nonMaxSuppressionWithScore:Jm,nonMaxSuppressionWithScoreAsync:Qm,cropAndResize:Zm}),Ai=function(r,t){return!(r>0)||t==="linear"},Di=function(r,t,e){if(e==null||e==="linear")return r;if(e==="relu")return r.mul(t.step());throw new Error("Gradient for activation "+e+" has not been implemented yet.")},Ti=function(r,t){var e=t,n=et(r.shape,t.shape);return n.length>0&&(e=e.sum(n)),e.reshape(r.shape)},Ni=function(r,t,e){if(t==="linear")return r;if(t==="relu")return qe(r);if(t==="elu")return Nc(r);if(t==="relu6")return Pc(r);if(t==="prelu")return Fc(r,e);throw new Error("Unknown fused activation "+t+".")},eg=A({fusedMatMul_:function(r){var t,e=r.a,n=r.b,o=r.transposeA,a=o!==void 0&&o,i=r.transposeB,s=i!==void 0&&i,u=r.bias,c=r.activation,l=c===void 0?"linear":c,f=r.preluActivationWeights;if(Ai(N.state.gradientDepth,l)===!1){var h=zo(e,n,a,s);return u!=null&&(h=Se(h,u)),Ni(h,l,f)}var d=C(e,"a","fused matMul"),p=C(n,"b","fused matMul");t=je(d,p),d=t[0],p=t[1];var m=a?d.shape[d.rank-2]:d.shape[d.rank-1],v=s?p.shape[p.rank-1]:p.shape[p.rank-2],g=a?d.shape[d.rank-1]:d.shape[d.rank-2],b=s?p.shape[p.rank-2]:p.shape[p.rank-1],x=d.shape.slice(0,-2),y=p.shape.slice(0,-2),w=ae(x),_=ae(y);R(d.rank>=2&&p.rank>=2&&d.rank===p.rank,function(){return"Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+d.rank+" and "+p.rank+"."}),R(it(x,y),function(){return"Error in fused matMul: outer dimensions ("+x+") and ("+y+") of Tensors with shapes "+d.shape+" and "+p.shape+" must match."}),R(m===v,function(){return"Error in fused matMul: inner shapes ("+m+") and ("+v+") of Tensors with shapes "+d.shape+" and "+p.shape+" and transposeA="+a+" and transposeB="+s+" must match."});var S,E,k=d.shape.slice(0,-2).concat([g,b]),I=a?d.as3D(w,m,g):d.as3D(w,g,m),T=s?p.as3D(_,b,v):p.as3D(_,v,b);u!=null&&Ae(k,(S=je(S=C(u,"bias","fused matMul"),d)[0]).shape),f!=null&&(E=C(f,"prelu weights","fused matMul"));var D={a:I,b:T};u!=null&&(D.bias=S),f!=null&&(D.preluActivationWeights=E);var U=[I,T];return N.runKernelFunc(function(V,z){var O=V.fusedBatchMatMul({a:I,b:T,transposeA:a,transposeB:s,bias:S,activation:l,preluActivationWeights:E});return z([I,T,O]),O},D,function(V,z){var O=z[0],P=z[1],q=z[2],j=Di(V,q,l),K={};return u!=null&&(K={bias:function(){return Ti(S,j)}}),Object.assign(a||s?!a&&s?{a:function(){return j.matMul(P,!1,!1)},b:function(){return j.matMul(O,!0,!1)}}:a&&!s?{a:function(){return P.matMul(j,!1,!0)},b:function(){return O.matMul(j,!1,!1)}}:{a:function(){return P.matMul(j,!0,!0)},b:function(){return j.matMul(O,!0,!0)}}:{a:function(){return j.matMul(P,!1,!0)},b:function(){return O.matMul(j,!0,!1)}},K)},"_FusedMatMul",{transposeA:a,transposeB:s,activation:l},U,[!0]).reshape(k)}}),tg=A({fusedConv2d_:function(r){var t=r.x,e=r.filter,n=r.strides,o=r.pad,a=r.dataFormat,i=a===void 0?"NHWC":a,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,f=r.activation,h=f===void 0?"linear":f,d=r.preluActivationWeights;if(h=h||"linear",Ai(N.state.gradientDepth,h)===!1){var p=Ut(t,e,n,o,i,u,c);return l!=null&&(p=Se(p,l)),Ni(p,h,d)}var m=C(t,"x","conv2d"),v=C(e,"filter","conv2d"),g=m,b=!1;m.rank===3&&(b=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),R(g.rank===4,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+g.rank+"."}),R(v.rank===4,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+v.rank+"."}),c!=null&&R($e(o),function(){return"Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+o+"."}),R(g.shape[3]===v.shape[2],function(){return"Error in conv2d: depth of input ("+g.shape[3]+") must match input depth for filter "+v.shape[2]+"."}),R(kt(n,u),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"}),R(i==="NHWC",function(){return"Error in conv2d: got dataFormat of "+i+" but only NHWC is currently supported."});var x,y,w=jn(g.shape,v.shape,n,u,o,c);l!=null&&(x=je(x=C(l,"bias","fused conv2d"),m)[0],Ae(w.outShape,x.shape)),d!=null&&(y=C(d,"prelu weights","fused conv2d"));var _={x:g,filter:v};l!=null&&(_.bias=x),d!=null&&(_.preluActivationWeights=y);var S=[v,g],E=N.runKernelFunc(function(k,I){var T=k.fusedConv2d({input:g,filter:v,convInfo:w,bias:x,activation:h,preluActivationWeights:y});return I([v,g,T]),T},_,function(k,I){var T=I,D=T[0],U=T[1],V=T[2],z=Di(k,V,h);R(gr(u),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+u+"'"});var O={};return l!=null&&(O={bias:function(){return Ti(x,z)}}),Object.assign({x:function(){return Ec(U.shape,z,D,n,o)},filter:function(){return _i(U,z,D.shape,n,o)}},O)},"FusedConv2D",{convInfo:w,activation:h},S,[!0]);return b?E.as3D(E.shape[1],E.shape[2],E.shape[3]):E}}),ng=A({fusedDepthwiseConv2d_:function(r){var t=r.x,e=r.filter,n=r.strides,o=r.pad,a=r.dataFormat,i=a===void 0?"NHWC":a,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,f=r.activation,h=f===void 0?"linear":f,d=r.preluActivationWeights;if(Ai(N.state.gradientDepth,h)===!1){var p=Uo(t,e,n,o,i,u,c);return l!=null&&(p=Se(p,l)),Ni(p,h,d)}var m=C(t,"x","depthwiseConv2d"),v=C(e,"filter","depthwiseConv2d"),g=m,b=!1;m.rank===3&&(b=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),R(g.rank===4,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got rank "+g.rank+"."}),R(v.rank===4,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+v.rank+"."}),R(g.shape[3]===v.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels ("+g.shape[3]+") must match the inChannels dimension in filter "+v.shape[2]+"."}),u==null&&(u=[1,1]),R(kt(n,u),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"}),c!=null&&R($e(o),function(){return"Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+o+"."});var x,y,w=jn(g.shape,v.shape,n,u,o,c,!0);l!=null&&(x=je(x=C(l,"bias","fused conv2d"),m)[0],Ae(w.outShape,x.shape)),d!=null&&(y=C(d,"prelu weights","fused depthwiseConv2d"));var _={x:g,filter:v};l!=null&&(_.bias=x),d!=null&&(_.preluActivationWeights=y);var S=[v,g],E=N.runKernelFunc(function(k,I){var T=k.fusedDepthwiseConv2D({input:g,filter:v,convInfo:w,bias:x,activation:h,preluActivationWeights:y});return I([v,g,T]),T},_,function(k,I){R(gr(u),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+u+"'"});var T=I[0],D=I[1],U=I[2],V=Di(k,U,h),z={};return l!=null&&(z={bias:function(){return Ti(x,V)}}),Object.assign({x:function(){return kc(D.shape,V,T,w)},filter:function(){return Rc(D,V,T.shape,w)}},z)},"FusedDepthwiseConv2D",{convInfo:w,activation:h},S,[!0]);return b?E.as3D(E.shape[1],E.shape[2],E.shape[3]):E}}),rg=Object.freeze({matMul:eg,conv2d:tg,depthwiseConv2d:ng}),og=Object.freeze({image:Si,linalg:jm,losses:zm,spectral:Im,fused:rg,signal:Nm,square:Lp,squaredDifference:uc,conv1d:Kv,conv2d:Ut,conv3d:Xv,depthwiseConv2d:Uo,separableConv2d:Ci,conv2dTranspose:$v,conv3dTranspose:Yv,op:A,batchNormalization2d:pv,batchNormalization3d:vv,batchNormalization4d:mv,batchNormalization:gv,batchNorm:pc,batchNorm2d:yv,batchNorm3d:bv,batchNorm4d:xv,booleanMaskAsync:jv,complex:ut,real:Wt,imag:Zt,concat:Qe,concat1d:rh,concat2d:oh,concat3d:ah,concat4d:ih,split:ci,matMul:zo,dot:Jv,outerProduct:Qv,reverse:Hr,reverse1d:Zv,reverse2d:em,reverse3d:tm,reverse4d:nm,maxPool:ot,avgPool:qr,pool:rm,maxPool3d:om,avgPool3d:am,slice:on,slice1d:im,slice2d:sm,slice3d:Ac,slice4d:um,abs:Wp,acos:Vp,acosh:Up,asin:zp,asinh:Gp,atan:Hp,atanh:qp,ceil:jp,clipByValue:bi,cos:Kp,cosh:Xp,erf:$p,exp:Xa,expm1:Yp,floor:Jp,log:Qp,log1p:Zp,logSigmoid:ev,neg:So,reciprocal:tv,round:nv,rsqrt:cc,sigmoid:lc,sign:rv,isNaN:ov,isInf:av,isFinite:iv,sin:sv,sinh:uv,softplus:cv,sqrt:lv,step:fv,tan:hv,tanh:dv,all:cm,any:lm,argMax:fm,argMin:hm,logSumExp:dm,max:Go,mean:pm,min:vm,moments:mm,sum:Tc,prod:gm,equal:bc,equalStrict:Ov,greater:Bv,greaterEqual:xc,greaterEqualStrict:Lv,greaterStrict:Wv,less:Vv,lessEqual:Uv,lessEqualStrict:zv,lessStrict:Gv,notEqual:Hv,notEqualStrict:qv,add:Se,addN:Cv,addStrict:Ev,atan2:kv,div:Ht,divNoNan:Rv,divStrict:Iv,floorDiv:gc,maximum:xi,maximumStrict:Sv,minimum:yc,minimumStrict:Av,mod:Dv,modStrict:Tv,mul:mt,mulStrict:Nv,pow:Ao,powStrict:Fv,squaredDifferenceStrict:Pv,sub:tt,subStrict:Mv,elu:Nc,leakyRelu:ym,prelu:Fc,relu:qe,relu6:Pc,selu:bm,logicalAnd:Vo,logicalNot:wv,logicalOr:vc,logicalXor:_v,where:zn,whereAsync:mc,buffer:xe,print:vh,batchToSpaceND:Tu,broadcastTo:mh,cast:gh,clone:yh,cumsum:bh,depthToSpace:xh,expandDims:Lt,eye:Nu,multinomial:wh,oneHot:Ha,pad:qn,pad1d:_h,pad2d:Ch,pad3d:Eh,pad4d:kh,rand:Rh,randomNormal:Ih,randomGamma:Sh,randomUniform:Fu,reshape:qt,spaceToBatchND:Pu,squeeze:Mu,stack:Mt,tile:ir,truncatedNormal:Ah,unstack:Ze,setdiff1dAsync:Dh,fill:rn,linspace:nh,ones:br,range:xo,scalar:Z,tensor:lt,tensor1d:Ye,tensor2d:kn,tensor3d:ui,tensor4d:wt,tensor5d:Zf,tensor6d:eh,variable:th,zeros:Ge,onesLike:Du,zerosLike:Te,transpose:Sn,softmax:pn,logSoftmax:Bh,localResponseNormalization:xm,norm:Mc,gather:wi,unsortedSegmentSum:wc,basicLSTMCell:wm,multiRNNCell:_m,movingAverage:Cm,stridedSlice:Em,topk:km,scatterND:Rm,fft:Ei,ifft:Do,rfft:ki,irfft:Oc,sparseToDense:Sm,gatherND:Am,diag:Dm,dropout:Tm,hannWindow:Ri,hammingWindow:Lc,frame:Ii,stft:Wc,inTopKAsync:Fm});function X(r,t){Array.isArray(r)||(r=[r]),r.forEach(function(e){e!=null&&R(e.dtype!=="complex64",function(){return t+" does not support complex64 tensors."})})}function xa(r,t,e,n){if(e==="linear")return r.linear(t);if(e==="relu")return r.relu(t);if(e==="elu")return r.elu(t);if(e==="relu6")return r.relu6(t);if(e==="prelu")return r.prelu(t,n);throw new Error("Activation "+e+" has not been implemented for the CPU backend.")}var ag=function(r){function t(){var e=r.call(this)||this;return e.blockSize=48,e.firstUse=!0,e.data=new zu(e,N),e}return Kt(t,r),t.prototype.write=function(e,n,o){this.firstUse&&(this.firstUse=!1,G().get("IS_NODE")&&yo(`
============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================`));var a={};return this.data.set(a,{values:e,dtype:o}),a},t.prototype.move=function(e,n,o,a){this.data.set(e,{values:n,dtype:a})},t.prototype.numDataIds=function(){return this.data.numDataIds()},t.prototype.read=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){return[2,this.readSync(e)]})})},t.prototype.readSync=function(e){var n=this.data.get(e),o=n.dtype,a=n.complexTensors;return o==="complex64"?Ka(this.readSync(a.real.dataId),this.readSync(a.imag.dataId)):this.data.get(e).values},t.prototype.bufferSync=function(e){var n=this.readSync(e.dataId),o=n;if(e.dtype==="string")try{o=n.map(function(a){return vo(a)})}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return xe(e.shape,e.dtype,o)},t.prototype.makeOutput=function(e,n,o){var a=this.write(e,n,o);return N.makeTensorFromDataId(a,n,o,this)},t.prototype.disposeData=function(e){if(this.data.has(e)){var n=this.data.get(e).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.data.delete(e)}},t.prototype.time=function(e){return re(this,void 0,void 0,function(){var n;return oe(this,function(o){return n=Jt(),e(),[2,{kernelMs:Jt()-n}]})})},t.prototype.memory=function(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},t.prototype.complex=function(e,n){var o=this.makeOutput(null,e.shape,"complex64");return this.data.get(o.dataId).complexTensors={real:N.keep(e.clone()),imag:N.keep(n.clone())},o},t.prototype.real=function(e){return this.data.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.data.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,n,o){if(X(e,"slice"),Vu(e.shape,n,o)){var a=Uu(n,e.strides),i=ae(o);return lt(this.readSync(e.dataId).subarray(a,a+i),o,e.dtype)}for(var s=xe(o,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c).map(function(f,h){return f+n[h]});s.values[c]=u.get.apply(u,l)}return s.toTensor()},t.prototype.stridedSlice=function(e,n,o,a){X(e,"stridedSlice");var i=fi(n,o,a);if(i.some(function(d){return d===0}))return lt([],i);for(var s=xe(i,e.dtype),u=this.bufferSync(e),c=0;c<s.size;c++){for(var l=s.indexToLoc(c),f=new Array(l.length),h=0;h<f.length;h++)f[h]=l[h]*a[h]+n[h];s.set.apply(s,[u.get.apply(u,f)].concat(l))}return s.toTensor()},t.prototype.diag=function(e){for(var n=this.readSync(e.dataId),o=xe([e.size,e.size],e.dtype),a=o.values,i=0;i<n.length;i++)a[i*e.size+i]=n[i];return o.toTensor()},t.prototype.unstack=function(e,n){for(var o=e.shape[n],a=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==n&&(a[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[n]=1;var l=new Array(o);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(e,u,c).reshape(a);return l},t.prototype.reverse=function(e,n){X(e,"reverse");for(var o=xe(e.shape,e.dtype),a=this.bufferSync(e),i=function(u){var c=o.indexToLoc(u),l=c.slice();n.forEach(function(f){return l[f]=e.shape[f]-1-l[f]}),o.set.apply(o,[a.get.apply(a,l)].concat(c))},s=0;s<o.size;s++)i(s);return o.toTensor()},t.prototype.concat=function(e,n){var o=this;if(e[0].dtype==="complex64"){var a=e.map(function(d){return Wt(d)}),i=e.map(function(d){return Zt(d)});return ut(this.concat(a,n),this.concat(i,n))}var s=e.map(function(d){var p=ae(d.shape.slice(n));return d.as2D(-1,p)}),u=mr(s.map(function(d){return d.shape}),1),c=xe(u,e[0].dtype).values;if(s[0].shape[0]===1){var l=0;s.forEach(function(d){c.set(o.readSync(d.dataId),l),l+=d.size})}else{var f=0;s.forEach(function(d){for(var p=o.readSync(d.dataId),m=0,v=0;v<d.shape[0];++v)for(var g=v*u[1]+f,b=0;b<d.shape[1];++b)c[g+b]=p[m++];f+=d.shape[1]})}var h=mr(e.map(function(d){return d.shape}),n);return lt(c,h,e[0].dtype)},t.prototype.neg=function(e){return X(e,"neg"),this.multiply(Z(-1),e)},t.prototype.add=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o+i,imag:a+s}}):this.broadcastedBinaryOp(e,n,ct(e.dtype,n.dtype),function(o,a){return o+a})},t.prototype.addN=function(e){var n=this;X(e,"addN");for(var o=e.map(function(l){return n.readSync(l.dataId)}),a=xe(e[0].shape,e[0].dtype),i=a.values,s=0;s<e.length;s++)for(var u=o[s],c=0;c<i.length;c++)i[c]+=u[c];return a.toTensor()},t.prototype.softmax=function(e,n){var o=nt([n],e.shape),a=this.max(e,o),i=Et(a.shape,o),s=this.subtract(e,a.reshape(i)),u=this.exp(s),c=this.sum(u,o).reshape(i);return this.realDivide(u,c)},t.prototype.subtract=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o-i,imag:a-s}}):this.broadcastedBinaryOp(e,n,ct(e.dtype,n.dtype),function(o,a){return o-a})},t.prototype.pow=function(e,n){return X([e,n],"pow"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){return Math.pow(o,a)})},t.prototype.batchMatMul=function(e,n,o,a){X([e,n],"matMul");for(var i=o?e.shape[1]:e.shape[2],s=o?e.shape[2]:e.shape[1],u=a?n.shape[1]:n.shape[2],c=e.shape[0],l=this.readSync(e.dataId),f=this.readSync(n.dataId),h=o?[e.strides[0],1,e.strides[1]]:[e.strides[0],e.strides[1],1],d=h[0],p=h[1],m=h[2],v=a?[1,n.strides[1],n.strides[0]]:[n.strides[1],1,n.strides[0]],g=v[0],b=v[1],x=v[2],y=s*u,w=xe([c,s,u],e.dtype),_=w.values,S=this.blockSize,E=0;E<c;E++)for(var k=0;k<s;k+=S)for(var I=0;I<u;I+=S)for(var T=0;T<i;T+=S)for(var D=Math.min(k+S,s),U=Math.min(I+S,u),V=Math.min(T+S,i),z=k;z<D;z++)for(var O=I;O<U;O++){for(var P=0,q=T;q<V;q++)P+=l[E*d+z*p+q*m]*f[q*g+O*b+E*x];_[E*y+(z*u+O)]+=P}return w.toTensor()},t.prototype.fusedBatchMatMul=function(e){var n=e.a,o=e.b,a=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=this.batchMatMul(n,o,a,i);return s&&(l=this.add(l,s)),u&&(l=xa(this,l,u,c)),l},t.prototype.multiply=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o*i-a*s,imag:o*s+a*i}}):this.broadcastedBinaryOp(e,n,ct(e.dtype,n.dtype),function(o,a){return o*a})},t.prototype.realDivide=function(e,n){return X([e,n],"realDivide"),this.broadcastedBinaryOp(e,n,"float32",function(o,a){return o/a})},t.prototype.floorDiv=function(e,n){return X([e,n],"floorDiv"),this.broadcastedBinaryOp(e,n,"int32",function(o,a){return Math.floor(o/a)})},t.prototype.sum=function(e,n){X(e,"sum"),Dt("sum",n,e.rank);for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,ct(e.dtype,"int32")),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=0,p=0;p<u;++p)d+=l[h+p];c[f]=d}return s},t.prototype.prod=function(e,n){X(e,"sum");for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,ct(e.dtype,"int32")),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=1,p=0;p<u;++p)d*=l[h+p];c[f]=d}return s},t.prototype.unsortedSegmentSum=function(e,n,o){X(e,"unsortedSegmentSum");for(var a=[],i=e.rank-n.rank,s=0;s<i;++s)n=n.expandDims(s+1);for(s=0;s<o;++s){var u=Z(s,"int32"),c=bc(u,n).asType("float32").mul(e).sum(0);a.push(c)}return Mt(a)},t.prototype.argMin=function(e,n){X(e,"argMin");var o=[n];Dt("argMin",o,e.rank);for(var a=ht(e.shape,o),i=a[0],s=a[1],u=Ge(i,"int32"),c=ae(s),l=this.readSync(u.dataId),f=this.readSync(e.dataId),h=0;h<l.length;++h){for(var d=h*c,p=f[d],m=0,v=0;v<c;++v){var g=f[d+v];g<p&&(p=g,m=v)}l[h]=m}return u},t.prototype.argMax=function(e,n){X(e,"argMax");var o=[n];Dt("argMax",o,e.rank);for(var a=ht(e.shape,o),i=a[0],s=a[1],u=Ge(i,"int32"),c=ae(s),l=this.readSync(u.dataId),f=this.readSync(e.dataId),h=0;h<l.length;++h){for(var d=h*c,p=f[d],m=0,v=0;v<c;++v){var g=f[d+v];g>p&&(p=g,m=v)}l[h]=m}return u},t.prototype.cumsum=function(e,n,o,a){if(X(e,"cumsum"),n!==e.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(e.rank-1)+" but got axis="+n);for(var i=ct(e.dtype,"int32"),s=Ge(e.shape,i),u=this.readSync(s.dataId),c=this.readSync(e.dataId),l=e.shape[e.rank-1],f=a?function(v,g){return v+l-g-1}:function(v,g){return v+g},h=0;h<c.length;h+=l)for(var d=0;d<l;d++){var p=f(h,d);if(d===0)u[p]=o?0:c[p];else{var m=f(h,d-1);u[p]=o?c[m]+u[m]:c[p]+u[m]}}return s},t.prototype.equal=function(e,n){return X([e,n],"equal"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o===a?1:0})},t.prototype.notEqual=function(e,n){return X([e,n],"notEqual"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o!==a?1:0})},t.prototype.less=function(e,n){return X([e,n],"less"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o<a?1:0})},t.prototype.lessEqual=function(e,n){return X([e,n],"lessEqual"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o<=a?1:0})},t.prototype.greater=function(e,n){return X([e,n],"greater"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o>a?1:0})},t.prototype.greaterEqual=function(e,n){return X([e,n],"greaterEqual"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o>=a?1:0})},t.prototype.logicalNot=function(e){X(e,"logicalNot");for(var n=this.readSync(e.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)o[a]=n[a]?0:1;return this.makeOutput(o,e.shape,"bool")},t.prototype.logicalAnd=function(e,n){return X([e,n],"logicalAnd"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o&&a})},t.prototype.logicalOr=function(e,n){return X([e,n],"logicalOr"),this.broadcastedBinaryOp(e,n,"bool",function(o,a){return o||a})},t.prototype.select=function(e,n,o){X([e,n,o],"select");for(var a=this.readSync(e.dataId),i=this.readSync(n.dataId),s=this.readSync(o.dataId),u=Ge(n.shape,ct(n.dtype,o.dtype)),c=this.readSync(u.dataId),l=0,f=e.rank===0||e.rank>1||n.rank===1?1:ae(n.shape.slice(1)),h=0;h<a.length;h++)for(var d=0;d<f;d++)a[h]===1?c[l++]=i[h]:c[l++]=s[h];return u},t.prototype.where=function(e){X([e],"where");var n=this.readSync(e.dataId);return vi(e.shape,n)},t.prototype.topk=function(e,n,o){return X(e,"topk"),Yu(this.readSync(e.dataId),e.shape,e.dtype,n)},t.prototype.min=function(e,n){X(e,"min"),Dt("min",n,e.rank);for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,e.dtype),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=l[h],p=0;p<u;++p){var m=l[h+p];m<d&&(d=m)}c[f]=d}return s},t.prototype.minimum=function(e,n){return X([e,n],"minimum"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){return Math.min(o,a)})},t.prototype.mod=function(e,n){return X([e,n],"mod"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){var i=o%a;return o<0&&a<0||o>=0&&a>=0?i:(i+a)%a})},t.prototype.max=function(e,n){X(e,"max"),Dt("max",n,e.rank);for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,e.dtype),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=l[h],p=0;p<u;++p){var m=l[h+p];m>d&&(d=m)}c[f]=d}return s},t.prototype.maximum=function(e,n){return X([e,n],"maximum"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){return Math.max(o,a)})},t.prototype.all=function(e,n){X(e,"all"),Dt("all",n,e.rank);for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,e.dtype),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=l[h],p=0;p<u;++p){var m=l[h+p];d=d&&m}c[f]=d}return s},t.prototype.any=function(e,n){X(e,"any"),Dt("any",n,e.rank);for(var o=ht(e.shape,n),a=o[0],i=o[1],s=Ge(a,e.dtype),u=ae(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),f=0;f<c.length;++f){for(var h=f*u,d=l[h],p=0;p<u;++p){var m=l[h+p];d=d||m}c[f]=d}return s},t.prototype.squaredDifference=function(e,n){return X([e,n],"squaredDifference"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){var i=o-a;return i*i})},t.prototype.ceil=function(e){X(e,"ceil");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.ceil(n[a]);return this.makeOutput(o,e.shape,"float32")},t.prototype.floor=function(e){X(e,"floor");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.floor(n[a]);return this.makeOutput(o,e.shape,"float32")},t.prototype.sign=function(e){X(e,"x");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)n[a]<0?o[a]=-1:n[a]>0?o[a]=1:o[a]=0;return this.makeOutput(o,e.shape,"float32")},t.prototype.isNaN=function(e){X(e,"x");for(var n=this.readSync(e.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Number.isNaN(n[a])&&(o[a]=1);return this.makeOutput(o,e.shape,"bool")},t.prototype.isInf=function(e){X(e,"x");for(var n=this.readSync(e.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Math.abs(n[a])===1/0&&(o[a]=1);return this.makeOutput(o,e.shape,"bool")},t.prototype.isFinite=function(e){X(e,"x");for(var n=this.readSync(e.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Number.isFinite(n[a])&&(o[a]=1);return this.makeOutput(o,e.shape,"bool")},t.prototype.round=function(e){X(e,"round");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=Math.floor(n[a]);n[a]-i<.5?o[a]=Math.floor(n[a]):n[a]-i>.5?o[a]=Math.ceil(n[a]):o[a]=i%2==0?i:i+1}return this.makeOutput(o,e.shape,"float32")},t.prototype.exp=function(e){X(e,"exp");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.exp(n[a]);return this.makeOutput(o,e.shape,"float32")},t.prototype.expm1=function(e){X(e,"expm1");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.expm1(n[a]);return this.makeOutput(o,e.shape,"float32")},t.prototype.log=function(e){X(e,"log");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.log(i)}return this.makeOutput(o,e.shape,"float32")},t.prototype.log1p=function(e){X(e,"log1p");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.log1p(i)}return this.makeOutput(o,e.shape,"float32")},t.prototype.sqrt=function(e){X(e,"sqrt");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.sqrt(i)}return this.makeOutput(o,e.shape,"float32")},t.prototype.rsqrt=function(e){X(e,"rsqrt");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=1/Math.sqrt(i)}return this.makeOutput(o,e.shape,"float32")},t.prototype.reciprocal=function(e){X(e,"reciprocal");for(var n=this.readSync(e.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=1/n[a];return this.makeOutput(o,e.shape,"float32")},t.prototype.linear=function(e){return e},t.prototype.relu=function(e){X(e,"relu");for(var n=Ge(e.shape,e.dtype),o=this.readSync(n.dataId),a=this.readSync(e.dataId),i=0;i<a.length;++i)o[i]=Math.max(0,a[i]);return n},t.prototype.relu6=function(e){X(e,"relu");for(var n=Ge(e.shape,e.dtype),o=this.readSync(n.dataId),a=this.readSync(e.dataId),i=0;i<a.length;++i)o[i]=Math.min(Math.max(0,a[i]),6);return n},t.prototype.prelu=function(e,n){return X([e,n],"prelu"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){return o<0?a*o:o})},t.prototype.elu=function(e){X(e,"elu");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a){var i=o[a];n[a]=i>=0?i:Math.exp(i)-1}return this.makeOutput(n,e.shape,"float32")},t.prototype.eluDer=function(e,n){X([e,n],"eluDer");for(var o=new Float32Array(n.size),a=this.readSync(n.dataId),i=this.readSync(e.dataId),s=0;s<a.length;++s){var u=a[s];o[s]=u>=1?i[s]:i[s]*(u+1)}return this.makeOutput(o,n.shape,"float32")},t.prototype.selu=function(e){X(e,"selu");for(var n=gi,o=yi,a=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];a[s]=u>=0?o*u:n*(Math.exp(u)-1)}return this.makeOutput(a,e.shape,"float32")},t.prototype.clip=function(e,n,o){X(e,"clip");for(var a=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];a[s]=u>o?o:u<n?n:u}return this.makeOutput(a,e.shape,"float32")},t.prototype.abs=function(e){for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.abs(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.complexAbs=function(e){for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<e.size;++a){var i=o[2*a],s=o[2*a+1];n[a]=Math.hypot(i,s)}return this.makeOutput(n,e.shape,"float32")},t.prototype.int=function(e){X(e,"int");for(var n=new Int32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=o[a];return this.makeOutput(n,e.shape,"int32")},t.prototype.sigmoid=function(e){X(e,"sigmoid");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=1/(1+Math.exp(-o[a]));return this.makeOutput(n,e.shape,"float32")},t.prototype.softplus=function(e){X(e,"softplus");for(var n=Math.log(11920928955078125e-23)+2,o=new Float32Array(e.size),a=this.readSync(e.dataId),i=0;i<a.length;++i){var s=a[i]>-n,u=a[i]<n,c=Math.exp(a[i]),l=void 0;l=u?c:s?a[i]:Math.log(1+c),o[i]=l}return this.makeOutput(o,e.shape,"float32")},t.prototype.sin=function(e){X(e,"sin");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.sin(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.cos=function(e){X(e,"cos");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.cos(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.tan=function(e){X(e,"tan");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.tan(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.asin=function(e){X(e,"asin");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.asin(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.acos=function(e){X(e,"acos");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.acos(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atan=function(e){X(e,"atan");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.atan(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atan2=function(e,n){return X([e,n],"atan2"),this.broadcastedBinaryOp(e,n,e.dtype,function(o,a){return Math.atan2(o,a)})},t.prototype.sinh=function(e){X(e,"sinh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.sinh(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.cosh=function(e){X(e,"cosh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.cosh(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.tanh=function(e){X(e,"tanh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=af(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.asinh=function(e){X(e,"asinh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.asinh(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.acosh=function(e){X(e,"acosh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.acosh(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atanh=function(e){X(e,"atanh");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a)n[a]=Math.atanh(o[a]);return this.makeOutput(n,e.shape,"float32")},t.prototype.erf=function(e){X(e,"erf");for(var n=new Float32Array(e.size),o=this.readSync(e.dataId),a=0;a<o.length;++a){var i=Math.sign(o[a]),s=Math.abs(o[a]),u=1/(1+.3275911*s);n[a]=i*(1-((((1.061405429*u-1.453152027)*u+1.421413741)*u-.284496736)*u+.254829592)*u*Math.exp(-s*s))}return this.makeOutput(n,e.shape,"float32")},t.prototype.step=function(e,n){n===void 0&&(n=0),X(e,"step");for(var o=new Float32Array(e.size),a=this.readSync(e.dataId),i=0;i<a.length;++i){var s=a[i];isNaN(s)?o[i]=NaN:o[i]=s>0?1:n}return this.makeOutput(o,e.shape,"float32")},t.prototype.fusedConv2d=function(e){var n=e.input,o=e.filter,a=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.conv2d(n,o,a);return i&&(c=this.add(c,i)),s&&(c=xa(this,c,s,u)),c},t.prototype.conv2d=function(e,n,o){X([e,n],"conv2d");for(var a=o.filterHeight,i=o.filterWidth,s=o.dilationHeight,u=o.dilationWidth,c=o.padInfo.left,l=o.padInfo.top,f=o.dataFormat==="channelsLast",h=xe(o.outShape,e.dtype),d=e.strides[0],p=f?e.strides[1]:e.strides[2],m=f?e.strides[2]:1,v=f?1:e.strides[1],g=h.strides[0],b=f?h.strides[1]:h.strides[2],x=f?h.strides[2]:1,y=f?1:h.strides[1],w=this.readSync(e.dataId),_=this.readSync(n.dataId),S=h.values,E=0;E<o.batchSize;++E)for(var k=E*d,I=E*g,T=0;T<o.outHeight;++T)for(var D=I+T*b,U=T*o.strideHeight-l,V=0;V<a;V++){var z=U+V*s;if(!(z<0||z>=o.inHeight))for(var O=V*n.strides[0],P=k+z*p,q=0;q<o.outWidth;++q)for(var j=D+q*x,K=q*o.strideWidth-c,J=0;J<i;J++){var ne=K+J*u;if(!(ne<0||ne>=o.inWidth))for(var ce=P+ne*m,de=O+J*n.strides[1],ge=0;ge<o.inChannels;++ge){for(var ye=w[ce+ge*v],Ie=0;Ie<o.outChannels;++Ie)S[j+Ie*y]+=ye*_[de+Ie];de+=o.outChannels}}}return h.toTensor()},t.prototype.conv3d=function(e,n,o){for(var a=o.filterDepth,i=o.filterHeight,s=o.filterWidth,u=o.dilationDepth,c=o.dilationHeight,l=o.dilationWidth,f=o.padInfo.front,h=o.padInfo.left,d=o.padInfo.top,p=xe(o.outShape,e.dtype),m=this.readSync(e.dataId),v=this.readSync(n.dataId),g=p.values,b=0;b<o.batchSize;++b)for(var x=b*e.strides[0],y=b*p.strides[0],w=0;w<o.outDepth;++w)for(var _=y+w*p.strides[1],S=w*o.strideDepth-f,E=0;E<a;E++){var k=S+E*u;if(!(k<0||k>=o.inDepth))for(var I=E*n.strides[0],T=x+k*e.strides[1],D=0;D<o.outHeight;++D)for(var U=_+D*p.strides[2],V=D*o.strideHeight-d,z=0;z<i;z++){var O=V+z*c;if(!(O<0||O>=o.inHeight))for(var P=I+z*n.strides[1],q=T+O*e.strides[2],j=0;j<o.outWidth;++j)for(var K=U+j*o.outChannels,J=j*o.strideWidth-h,ne=0;ne<s;ne++){var ce=J+ne*l;if(!(ce<0||ce>=o.inWidth))for(var de=P+ne*n.strides[2],ge=q+ce*o.inChannels,ye=de,Ie=0;Ie<o.inChannels;++Ie){for(var _e=m[ge+Ie],Re=0;Re<o.outChannels;++Re)g[K+Re]+=_e*v[ye+Re];ye+=o.outChannels}}}}return p.toTensor()},t.prototype.conv2dDerInput=function(e,n,o){X([e,n],"conv2dDerInput");for(var a=xe(o.inShape,"float32"),i=a.values,s=this.readSync(e.dataId),u=this.readSync(n.dataId),c=n.strides,l=c[0],f=c[1],h=c[2],d=o.batchSize,p=o.filterHeight,m=o.filterWidth,v=o.inChannels,g=o.inHeight,b=o.inWidth,x=o.outChannels,y=o.outHeight,w=o.outWidth,_=o.strideHeight,S=o.strideWidth,E=o.dataFormat,k=p-1-o.padInfo.top,I=m-1-o.padInfo.left,T=E==="channelsLast",D=a.strides[0],U=T?a.strides[1]:a.strides[2],V=T?a.strides[2]:1,z=T?1:a.strides[1],O=e.strides[0],P=T?e.strides[1]:e.strides[2],q=T?e.strides[2]:1,j=T?1:e.strides[1],K=0;K<d;++K)for(var J=0;J<v;++J)for(var ne=0;ne<g;++ne)for(var ce=ne-k,de=Math.max(0,Math.ceil(ce/_)),ge=Math.min(y,(p+ce)/_),ye=0;ye<b;++ye){for(var Ie=ye-I,_e=Math.max(0,Math.ceil(Ie/S)),Re=Math.min(w,(m+Ie)/S),Fe=0,Ee=de;Ee<ge;++Ee)for(var Ne=Ee*_-ce,De=_e;De<Re;++De)for(var Le=O*K+P*Ee+q*De,Q=l*(p-1-Ne)+f*(m-1-(De*S-Ie))+h*J,We=0;We<x;++We)Fe+=s[Le+j*We]*u[Q+We];i[D*K+U*ne+V*ye+z*J]=Fe}return a.toTensor()},t.prototype.conv3dDerInput=function(e,n,o){for(var a=xe(o.inShape,"float32"),i=a.values,s=a.strides,u=s[0],c=s[1],l=s[2],f=s[3],h=this.readSync(e.dataId),d=e.strides,p=d[0],m=d[1],v=d[2],g=d[3],b=this.readSync(n.dataId),x=n.strides,y=x[0],w=x[1],_=x[2],S=x[3],E=o.batchSize,k=o.filterDepth,I=o.filterHeight,T=o.filterWidth,D=o.inChannels,U=o.inDepth,V=o.inHeight,z=o.inWidth,O=o.outChannels,P=o.outDepth,q=o.outHeight,j=o.outWidth,K=o.strideDepth,J=o.strideHeight,ne=o.strideWidth,ce=k-1-o.padInfo.front,de=I-1-o.padInfo.top,ge=T-1-o.padInfo.left,ye=0;ye<E;++ye)for(var Ie=0;Ie<D;++Ie)for(var _e=0;_e<U;++_e)for(var Re=_e-ce,Fe=Math.max(0,Math.ceil(Re/K)),Ee=Math.min(P,(k+Re)/K),Ne=0;Ne<V;++Ne)for(var De=Ne-de,Le=Math.max(0,Math.ceil(De/J)),Q=Math.min(q,(I+De)/J),We=0;We<z;++We){for(var Rt=We-ge,It=Math.max(0,Math.ceil(Rt/ne)),ft=Math.min(j,(T+Rt)/ne),bn=0,zt=Fe;zt<Ee;++zt)for(var yt=zt*K-Re,Y=Le;Y<Q;++Y)for(var F=Y*J-De,me=It;me<ft;++me)for(var St=p*ye+m*zt+v*Y+g*me,Ve=y*(k-1-yt)+w*(I-1-F)+_*(T-1-(me*ne-Rt))+S*Ie,bt=0;bt<O;++bt)bn+=h[St+bt]*b[Ve+bt];i[u*ye+c*_e+l*Ne+f*We+Ie]=bn}return a.toTensor()},t.prototype.conv2dDerFilter=function(e,n,o){X([e,n],"conv2dDerFilter");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=o.dataFormat==="channelsLast",l=xe(o.filterShape,"float32"),f=o.padInfo.left,h=o.padInfo.top,d=this.bufferSync(e),p=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((h-m)/a)),g=Math.min(o.outHeight,(o.inHeight+h-m)/a),b=0;b<u;++b)for(var x=Math.max(0,Math.ceil((f-b)/i)),y=Math.min(o.outWidth,(o.inWidth+f-b)/i),w=0;w<o.inChannels;++w)for(var _=0;_<o.outChannels;++_){for(var S=0,E=0;E<o.batchSize;++E)for(var k=v;k<g;++k)for(var I=m+k*a-h,T=x;T<y;++T){var D=b+T*i-f;S+=c?d.get(E,I,D,w)*p.get(E,k,T,_):d.get(E,w,I,D)*p.get(E,_,k,T)}l.set(S,m,b,w,_)}return l.toTensor()},t.prototype.conv3dDerFilter=function(e,n,o){for(var a=o.strideDepth,i=o.strideHeight,s=o.strideWidth,u=o.filterDepth,c=o.filterHeight,l=o.filterWidth,f=xe(o.filterShape,"float32"),h=f.values,d=f.strides,p=d[0],m=d[1],v=d[2],g=d[3],b=this.readSync(n.dataId),x=n.strides,y=x[0],w=x[1],_=x[2],S=x[3],E=this.readSync(e.dataId),k=e.strides,I=k[0],T=k[1],D=k[2],U=k[3],V=o.padInfo.front,z=o.padInfo.left,O=o.padInfo.top,P=0;P<u;++P)for(var q=Math.max(0,Math.ceil((V-P)/a)),j=Math.min(o.outDepth,(o.inDepth+V-P)/a),K=P*p,J=0;J<c;++J)for(var ne=Math.max(0,Math.ceil((O-J)/i)),ce=Math.min(o.outHeight,(o.inHeight+O-J)/i),de=J*m+K,ge=0;ge<l;++ge)for(var ye=Math.max(0,Math.ceil((z-ge)/s)),Ie=Math.min(o.outWidth,(o.inWidth+z-ge)/s),_e=ge*v+de,Re=0;Re<o.inChannels;++Re)for(var Fe=Re*g+_e,Ee=0;Ee<o.outChannels;++Ee){for(var Ne=0,De=0;De<o.batchSize;++De)for(var Le=De*I,Q=De*y,We=q;We<j;++We)for(var Rt=(P+We*a-V)*T+Le,It=We*w+Q,ft=ne;ft<ce;++ft)for(var bn=(J+ft*i-O)*D+Rt,zt=ft*_+It,yt=ye;yt<Ie;++yt){var Y=yt*S+zt;Ne+=E[(ge+yt*s-z)*U+bn+Re]*b[Y+Ee]}h[Fe+Ee]=Ne}return f.toTensor()},t.prototype.fusedDepthwiseConv2D=function(e){var n=e.input,o=e.filter,a=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.depthwiseConv2D(n,o,a);return i&&(c=this.add(c,i)),s&&(c=xa(this,c,s,u)),c},t.prototype.depthwiseConv2D=function(e,n,o){X([e,n],"depthwiseConv2D");for(var a=o.filterHeight,i=o.filterWidth,s=o.dilationHeight,u=o.dilationWidth,c=o.padInfo.left,l=o.padInfo.top,f=o.outChannels/o.inChannels,h=xe(o.outShape,e.dtype),d=this.readSync(e.dataId),p=this.readSync(n.dataId),m=h.values,v=0;v<o.batchSize;++v)for(var g=v*e.strides[0],b=v*h.strides[0],x=0;x<o.outHeight;++x)for(var y=b+x*h.strides[1],w=x*o.strideHeight-c,_=0;_<a;++_){var S=w+_*s;if(!(S<0||S>=o.inHeight))for(var E=_*n.strides[0],k=g+S*e.strides[1],I=0;I<o.outWidth;++I)for(var T=y+I*h.strides[2],D=I*o.strideWidth-l,U=0;U<i;++U){var V=D+U*u;if(!(V<0||V>=o.inWidth))for(var z=E+U*n.strides[1],O=k+V*o.inChannels,P=T,q=z,j=0;j<o.inChannels;++j){for(var K=d[O+j],J=0;J<f;++J)m[P+J]+=K*p[q+J];P+=f,q+=f}}}return h.toTensor()},t.prototype.depthwiseConv2DDerInput=function(e,n,o){X([e,n],"depthwiseConv2DDerInput");for(var a=xe(o.inShape,"float32"),i=a.values,s=a.strides,u=s[0],c=s[1],l=s[2],f=this.readSync(e.dataId),h=e.strides,d=h[0],p=h[1],m=h[2],v=this.readSync(n.dataId),g=n.strides,b=g[0],x=g[1],y=g[2],w=o.batchSize,_=o.filterHeight,S=o.filterWidth,E=o.inChannels,k=o.inHeight,I=o.inWidth,T=o.outChannels,D=o.outHeight,U=o.outWidth,V=o.strideHeight,z=o.strideWidth,O=_-1-o.padInfo.top,P=S-1-o.padInfo.left,q=T/E,j=0;j<w;++j)for(var K=0;K<E;++K)for(var J=0;J<k;++J)for(var ne=J-O,ce=Math.max(0,Math.ceil(ne/V)),de=Math.min(D,(_+ne)/V),ge=0;ge<I;++ge){for(var ye=ge-P,Ie=Math.max(0,Math.ceil(ye/z)),_e=Math.min(U,(S+ye)/z),Re=0,Fe=ce;Fe<de;++Fe)for(var Ee=Fe*V-ne,Ne=Ie;Ne<_e;++Ne)for(var De=d*j+p*Fe+m*Ne,Le=b*(_-1-Ee)+x*(S-1-(Ne*z-ye))+y*K,Q=0;Q<q;++Q)Re+=f[De+(K*q+Q)]*v[Le+Q];i[u*j+c*J+l*ge+K]=Re}return a.toTensor()},t.prototype.depthwiseConv2DDerFilter=function(e,n,o){X([e,n],"depthwiseConv2DDerFilter");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=xe(o.filterShape,"float32"),l=o.padInfo.left,f=o.padInfo.top,h=o.outChannels/o.inChannels,d=this.bufferSync(e),p=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((f-m)/a)),g=Math.min(o.outHeight,(o.inHeight+f-m)/a),b=0;b<u;++b)for(var x=Math.max(0,Math.ceil((l-b)/i)),y=Math.min(o.outWidth,(o.inWidth+l-b)/i),w=0;w<o.outChannels;++w){for(var _=Math.trunc(w/h),S=w%h,E=0,k=0;k<o.batchSize;++k)for(var I=v;I<g;++I)for(var T=m+I*a-f,D=x;D<y;++D){var U=b+D*i-l;E+=d.get(k,T,U,_)*p.get(k,I,D,w)}c.set(E,m,b,_,S)}return c.toTensor()},t.prototype.tile=function(e,n){return X(e,"tile"),$u(this.bufferSync(e),n)},t.prototype.pad=function(e,n,o){X(e,"pad");var a=n.map(function(h,d){return h[0]+e.shape[d]+h[1]}),i=n.map(function(h){return h[0]}),s=this.bufferSync(e),u=xe(a,e.dtype);o!==0&&u.values.fill(o);for(var c=0;c<e.size;c++){var l=s.indexToLoc(c),f=l.map(function(h,d){return h+i[d]});u.set.apply(u,[s.get.apply(s,l)].concat(f))}return u.toTensor()},t.prototype.transpose=function(e,n){X(e,"transpose");for(var o=new Array(e.rank),a=0;a<o.length;a++)o[a]=e.shape[n[a]];var i=this.readSync(e.dataId),s=xe(o,e.dtype),u=this.bufferSync(e);for(a=0;a<e.size;++a){for(var c=u.indexToLoc(a),l=new Array(c.length),f=0;f<l.length;f++)l[f]=c[n[f]];var h=s.locToIndex(l);s.values[h]=i[a]}return s.toTensor()},t.prototype.gather=function(e,n,o){X([e,n],"gather");var a=e.shape.slice(),i=this.readSync(n.dataId);a[o]=i.length;for(var s=xe(a,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c),f=l.slice();f[o]=i[l[o]];var h=u.locToIndex(f);s.values[c]=u.values[h]}return s.toTensor()},t.prototype.batchToSpaceND=function(e,n,o){X([e],"batchToSpaceND");var a=n.reduce(function(f,h){return f*h}),i=wo(e.shape,n,a),s=_o(i.length,n.length),u=Co(e.shape,n,a),c=Ou(o,n.length),l=Bu(u,o,n.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,n,o){X([e],"spaceToBatchND");var a=n.reduce(function(h,d){return h*d}),i=[[0,0]];i.push.apply(i,o);for(var s=1+n.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=wo(u.shape,n,a,!1),l=_o(c.length,n.length,!1),f=Co(u.shape,n,a,!1);return u.reshape(c).transpose(l).reshape(f)},t.prototype.pool=function(e,n,o){X(e,"pool");for(var a=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,f=n.padInfo.top,h=n.padInfo.left,d=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,p=this.readSync(e.dataId),m=xe(n.outShape,e.dtype),v=m.values,g=n.outShape[1]*n.outShape[2]*n.outShape[3],b=n.outShape[2]*n.outShape[3],x=n.outShape[3],y=0;y<n.batchSize;++y)for(var w=y*g,_=y*e.strides[0],S=0;S<n.inChannels;++S)for(var E=0;E<n.outHeight;++E)for(var k=E*a-f,I=Math.max(0,k),T=Math.min(n.inHeight,c+k),D=w+E*b,U=0;U<n.outWidth;++U){for(var V=U*i-h,z=Math.max(0,V),O=Math.min(n.inWidth,l+V),P=d,q=0,j=0,K=I;K<T;K+=s){for(var J=_+K*e.strides[1],ne=z;ne<O;ne+=u){var ce=p[J+ne*e.strides[2]+S];o==="max"&&ce>P?P=ce:o==="avg"&&(q+=ce,j++)}if(isNaN(P))break}v[D+U*x+S]=o==="avg"?q/j:P}return m.toTensor()},t.prototype.maxPool=function(e,n){return this.pool(e,n,"max")},t.prototype.maxPoolPositions=function(e,n){for(var o=xe(n.outShape,"int32"),a=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,f=n.padInfo.top,h=n.padInfo.left,d=this.bufferSync(e),p=0;p<n.batchSize;++p)for(var m=0;m<n.inChannels;++m)for(var v=0;v<n.outHeight;++v){for(var g=v*a-f,b=g;b<0;)b+=s;for(var x=Math.min(n.inHeight,c+g),y=0;y<n.outWidth;++y){for(var w=y*i-h,_=w;_<0;)_+=u;for(var S=Math.min(n.inWidth,l+w),E=Number.NEGATIVE_INFINITY,k=-1,I=b;I<x;I+=s)for(var T=I-g,D=_;D<S;D+=u){var U=D-w,V=d.get(p,I,D,m);V>E&&(E=V,k=T*l+U)}o.set(k,p,v,y,m)}}return o.toTensor()},t.prototype.maxPoolBackprop=function(e,n,o,a){X([n,o],"maxPoolBackprop");for(var i=this.maxPoolPositions(n,a),s=a.strideHeight,u=a.strideWidth,c=a.dilationHeight,l=a.dilationWidth,f=a.effectiveFilterHeight,h=a.effectiveFilterWidth,d=h-1-a.padInfo.left,p=f-1-a.padInfo.top,m=xe(n.shape,"float32"),v=this.bufferSync(i),g=this.bufferSync(e),b=0;b<a.batchSize;++b)for(var x=0;x<a.inChannels;++x)for(var y=0;y<a.inHeight;++y)for(var w=0;w<a.inWidth;++w){for(var _=y-p,S=w-d,E=0,k=0;k<f;k+=c){var I=(_+k)/s;if(!(I<0||I>=a.outHeight||Math.floor(I)!==I))for(var T=0;T<h;T+=l){var D=(S+T)/u;if(!(D<0||D>=a.outWidth||Math.floor(D)!==D)){var U=f*h-1-v.get(b,I,D,x)===k*h+T?1:0;U!==0&&(E+=g.get(b,I,D,x)*U)}}}m.set(E,b,y,w,x)}return m.toTensor()},t.prototype.avgPoolBackprop=function(e,n,o){X([e,n],"avgPoolBackprop");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=o.dilationHeight,l=o.dilationWidth,f=o.effectiveFilterHeight,h=o.effectiveFilterWidth,d=h-1-o.padInfo.left,p=f-1-o.padInfo.top,m=xe(n.shape,"float32"),v=1/(s*u),g=this.bufferSync(e),b=0;b<o.batchSize;++b)for(var x=0;x<o.inChannels;++x)for(var y=0;y<o.inHeight;++y)for(var w=0;w<o.inWidth;++w){for(var _=y-p,S=w-d,E=0,k=0;k<f;k+=c){var I=(_+k)/a;if(!(I<0||I>=o.outHeight||Math.floor(I)!==I))for(var T=0;T<h;T+=l){var D=(S+T)/i;D<0||D>=o.outWidth||Math.floor(D)!==D||(E+=g.get(b,I,D,x))}}m.set(E*v,b,y,w,x)}return m.toTensor()},t.prototype.pool3d=function(e,n,o){X(e,"pool3d");for(var a=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,f=n.effectiveFilterDepth,h=n.effectiveFilterHeight,d=n.effectiveFilterWidth,p=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,b=this.readSync(e.dataId),x=xe(n.outShape,e.dtype),y=x.values,w=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],_=n.outShape[2]*n.outShape[3]*n.outShape[4],S=n.outShape[3]*n.outShape[4],E=n.outShape[4],k=0;k<n.batchSize;++k)for(var I=k*w,T=k*e.strides[0],D=0;D<n.inChannels;++D)for(var U=0;U<n.outDepth;++U){for(var V=U*a-p,z=V;z<0;)z+=u;for(var O=Math.min(n.inDepth,f+V),P=I+U*_,q=0;q<n.outHeight;++q){for(var j=q*i-m,K=j;K<0;)K+=c;for(var J=Math.min(n.inHeight,h+j),ne=P+q*S,ce=0;ce<n.outWidth;++ce){for(var de=ce*s-v,ge=de;ge<0;)ge+=l;for(var ye=Math.min(n.inWidth,d+de),Ie=ne+ce*E,_e=g,Re=0,Fe=0,Ee=z;Ee<O;Ee+=u){for(var Ne=T+Ee*e.strides[1],De=K;De<J;De+=c){for(var Le=Ne+De*e.strides[2],Q=ge;Q<ye;Q+=l){var We=b[Le+Q*e.strides[3]+D];if(o==="max"&&We>_e?_e=We:o==="avg"&&(Re+=We,Fe++),isNaN(_e))break}if(isNaN(_e))break}if(isNaN(_e))break}y[Ie+D]=o==="avg"?Re/Fe:_e}}}return x.toTensor()},t.prototype.avgPool3d=function(e,n){return X(e,"avgPool3d"),this.pool3d(e,n,"avg").toFloat()},t.prototype.avgPool3dBackprop=function(e,n,o){X([e,n],"avgPool3dBackprop");for(var a=o.strideDepth,i=o.strideHeight,s=o.strideWidth,u=o.filterDepth,c=o.filterHeight,l=o.filterWidth,f=o.dilationDepth,h=o.dilationHeight,d=o.dilationWidth,p=o.effectiveFilterDepth,m=o.effectiveFilterHeight,v=o.effectiveFilterWidth,g=p-1-o.padInfo.front,b=v-1-o.padInfo.left,x=m-1-o.padInfo.top,y=xe(n.shape,"float32"),w=1/(u*c*l),_=this.bufferSync(e),S=0;S<o.batchSize;++S)for(var E=0;E<o.inChannels;++E)for(var k=0;k<o.inDepth;++k)for(var I=0;I<o.inHeight;++I)for(var T=0;T<o.inWidth;++T){for(var D=k-g,U=I-x,V=T-b,z=0,O=0;O<p;O+=f){var P=(D+O)/a;if(!(P<0||P>=o.outDepth||Math.floor(P)!==P))for(var q=0;q<m;q+=h){var j=(U+q)/i;if(!(j<0||j>=o.outHeight||Math.floor(j)!==j))for(var K=0;K<v;K+=d){var J=(V+K)/s;J<0||J>=o.outWidth||Math.floor(J)!==J||(z+=_.get(S,P,j,J,E))}}}y.set(z*w,S,k,I,T,E)}return y.toTensor()},t.prototype.maxPool3d=function(e,n){return X(e,"maxPool3d"),this.pool3d(e,n,"max").toFloat()},t.prototype.maxPool3dPositions=function(e,n){for(var o=xe(n.outShape,"int32"),a=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,f=n.effectiveFilterDepth,h=n.effectiveFilterHeight,d=n.effectiveFilterWidth,p=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=this.bufferSync(e),b=0;b<n.batchSize;++b)for(var x=0;x<n.inChannels;++x)for(var y=0;y<n.outDepth;++y){for(var w=y*a-p,_=w;_<0;)_+=u;for(var S=Math.min(n.inDepth,f+w),E=0;E<n.outHeight;++E){for(var k=E*i-m,I=k;I<0;)I+=c;for(var T=Math.min(n.inHeight,h+k),D=0;D<n.outWidth;++D){for(var U=D*s-v,V=U;V<0;)V+=l;for(var z=Math.min(n.inWidth,d+U),O=Number.NEGATIVE_INFINITY,P=-1,q=_;q<S;q+=u)for(var j=q-w,K=I;K<T;K+=c)for(var J=K-k,ne=V;ne<z;ne+=l){var ce=ne-U,de=g.get(b,q,K,ne,x);de>=O&&(O=de,P=j*h*d+J*h+ce)}o.set(P,b,y,E,D,x)}}}return o.toTensor()},t.prototype.maxPool3dBackprop=function(e,n,o,a){X([n,o],"maxPool3dBackprop");for(var i=this.maxPool3dPositions(n,a),s=a.strideDepth,u=a.strideHeight,c=a.strideWidth,l=a.dilationDepth,f=a.dilationHeight,h=a.dilationWidth,d=a.effectiveFilterDepth,p=a.effectiveFilterHeight,m=a.effectiveFilterWidth,v=d-1-a.padInfo.front,g=m-1-a.padInfo.left,b=p-1-a.padInfo.top,x=xe(n.shape,"float32"),y=this.bufferSync(i),w=this.bufferSync(e),_=0;_<a.batchSize;++_)for(var S=0;S<a.inChannels;++S)for(var E=0;E<a.inDepth;++E)for(var k=0;k<a.inHeight;++k)for(var I=0;I<a.inWidth;++I){for(var T=E-v,D=k-b,U=I-g,V=0,z=0;z<d;z+=l){var O=(T+z)/s;if(!(O<0||O>=a.outDepth||Math.floor(O)!==O))for(var P=0;P<p;P+=f){var q=(D+P)/u;if(!(q<0||q>=a.outHeight||Math.floor(q)!==q))for(var j=0;j<m;j+=h){var K=(U+j)/c;if(!(K<0||K>=a.outWidth||Math.floor(K)!==K)){var J=d*p*m-1-y.get(_,O,q,K,S)===z*p*m+P*m+j?1:0;J!==0&&(V+=w.get(_,O,q,K,S)*J)}}}}x.set(V,_,E,k,I,S)}return x.toTensor()},t.prototype.cast=function(e,n){return qu(e,n,this)},t.prototype.reshape=function(e,n){return ja(e,n)},t.prototype.avgPool=function(e,n){return X(e,"avgPool"),this.pool(e,n,"avg").toFloat()},t.prototype.resizeBilinear=function(e,n,o,a){X(e,"resizeBilinear");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],f=this.readSync(e.dataId),h=new Float32Array(ae([s,n,o,l])),d=[a&&n>1?u-1:u,a&&o>1?c-1:c],p=[a&&n>1?n-1:n,a&&o>1?o-1:o],m=0,v=d[0]/p[0],g=d[1]/p[1],b=0;b<s;b++)for(var x=0;x<n;x++)for(var y=v*x,w=Math.floor(y),_=y-w,S=Math.min(u-1,Math.ceil(y)),E=b*e.strides[0]+w*e.strides[1],k=b*e.strides[0]+S*e.strides[1],I=0;I<o;I++)for(var T=g*I,D=Math.floor(T),U=T-D,V=Math.min(c-1,Math.ceil(T)),z=E+D*e.strides[2],O=k+D*e.strides[2],P=E+V*e.strides[2],q=k+V*e.strides[2],j=0;j<l;j++){var K=f[z+j],J=f[O+j],ne=K+(f[P+j]-K)*U,ce=ne+(J+(f[q+j]-J)*U-ne)*_;h[m++]=ce}return lt(h,[s,n,o,l])},t.prototype.resizeBilinearBackprop=function(e,n,o){X([e,n],"resizeBilinearBackprop");for(var a=n.shape,i=a[0],s=a[1],u=a[2],c=a[3],l=e.shape,f=l[1],h=l[2],d=new Float32Array(i*s*u*c),p=[o&&f>1?s-1:s,o&&h>1?u-1:u],m=[o&&f>1?f-1:f,o&&h>1?h-1:h],v=p[0]/m[0],g=p[1]/m[1],b=this.readSync(e.dataId),x=0,y=0;y<i;y++)for(var w=y*n.strides[0],_=0;_<f;_++)for(var S=_*v,E=Math.floor(S),k=Math.min(Math.ceil(S),s-1),I=w+E*n.strides[1],T=w+k*n.strides[1],D=S-E,U=1-D,V=0;V<h;V++)for(var z=V*g,O=Math.floor(z),P=Math.min(Math.ceil(z),u-1),q=z-O,j=1-q,K=I+O*n.strides[2],J=I+P*n.strides[2],ne=T+O*n.strides[2],ce=T+P*n.strides[2],de=U*j,ge=U*q,ye=D*j,Ie=D*q,_e=0;_e<c;_e++){var Re=b[x++];d[K+_e]+=Re*de,d[J+_e]+=Re*ge,d[ne+_e]+=Re*ye,d[ce+_e]+=Re*Ie}return wt(d,[i,u,s,c],n.dtype)},t.prototype.resizeNearestNeighbor=function(e,n,o,a){X(e,"resizeNearestNeighbor");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],f=this.readSync(e.dataId),h=new Float32Array(s*n*o*l),d=[a&&n>1?u-1:u,a&&o>1?c-1:c],p=[a&&n>1?n-1:n,a&&o>1?o-1:o],m=d[0]/p[0],v=d[1]/p[1],g=0,b=0;b<s;b++)for(var x=b*e.strides[0],y=0;y<n;y++)for(var w=m*y,_=x+Math.min(u-1,a?Math.round(w):Math.floor(w))*e.strides[1],S=0;S<o;S++)for(var E=v*S,k=_+Math.min(c-1,a?Math.round(E):Math.floor(E))*e.strides[2],I=0;I<l;I++){var T=f[k+I];h[g++]=T}return lt(h,[s,n,o,l],e.dtype)},t.prototype.resizeNearestNeighborBackprop=function(e,n,o){X([e,n],"resizeNearestNeighborBackprop");for(var a=n.shape,i=a[0],s=a[1],u=a[2],c=a[3],l=e.shape,f=l[1],h=l[2],d=new Float32Array(i*s*u*c),p=this.readSync(e.dataId),m=[o&&f>1?s-1:s,o&&h>1?u-1:u],v=[o&&f>1?f-1:f,o&&h>1?h-1:h],g=m[0]/v[0],b=m[1]/v[1],x=1/g,y=1/b,w=2*Math.ceil(x)+2,_=2*Math.ceil(y)+2,S=0;S<i;S++)for(var E=S*n.strides[0],k=0;k<s;k++)for(var I=E+k*n.strides[1],T=Math.floor(k*x),D=Math.floor(T-w/2),U=0;U<u;U++)for(var V=I+U*n.strides[2],z=Math.floor(U*y),O=Math.floor(z-_/2),P=0;P<c;P++){for(var q=0,j=0;j<w;j++){var K=j+D;if(!(K<0||K>=f)){var J=E+K*e.strides[1],ne=K*g;if(k===Math.min(s-1,o?Math.round(ne):Math.floor(ne)))for(var ce=0;ce<_;ce++){var de=ce+O;if(!(de<0||de>=h)){var ge=J+de*e.strides[2],ye=de*b;U===Math.min(u-1,o?Math.round(ye):Math.floor(ye))&&(q+=p[ge+P])}}}}d[V+P]=q}return wt(d,n.shape,n.dtype)},t.prototype.batchNormalization=function(e,n,o,a,i,s){X([e,n,o,i,s],"batchNorm");for(var u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=this.readSync(o.dataId),f=i?this.readSync(i.dataId):new Float32Array([1]),h=s?this.readSync(s.dataId):new Float32Array([0]),d=new Float32Array(u.length),p=h.length,m=f.length,v=l.length,g=c.length,b=0,x=0,y=0,w=0,_=0;_<u.length;++_)d[_]=h[b++]+(u[_]-c[x++])*f[y++]/Math.sqrt(l[w++]+a),b>=p&&(b=0),x>=g&&(x=0),y>=m&&(y=0),w>=v&&(w=0);return wt(d,e.shape)},t.prototype.localResponseNormalization4D=function(e,n,o,a,i){X(e,"localResponseNormalization4D");var s=e.shape[3],u=s-1,c=this.readSync(e.dataId),l=e.size,f=new Float32Array(l);function h(v){for(var g=v%s,b=v-g+Math.max(0,g-n),x=v-g+Math.min(g+n,u),y=0;b<=x;b++){var w=c[b];y+=w*w}return y}for(var d=0;d<l;d++){var p=h(d),m=c[d]*Math.pow(o+a*p,-i);f[d]=m}return wt(f,e.shape)},t.prototype.LRNGrad=function(e,n,o,a,i,s,u){X(e,"LRNGrad");for(var c=e.shape[3],l=this.readSync(e.dataId),f=this.readSync(n.dataId),h=this.readSync(o.dataId),d=new Float32Array(e.size),p=e.size,m=0;m<p;m++){for(var v=m%c,g=m-v+Math.max(0,v-a),b=m-v+Math.min(c,v+a+1),x=0,y=g;y<b;y++)x+=Math.pow(f[y],2);for(x=s*x+i,y=g;y<b;y++){var w=-2*s*u*f[y]*h[m]/x;m===y&&(w+=Math.pow(x,-u)),w*=l[m],d[y]+=w}}return wt(d,e.shape)},t.prototype.multinomial=function(e,n,o,a){X(e,"multinomial");for(var i=n?e:pn(e),s=i.shape[0],u=i.shape[1],c=Ge([s,o],"int32"),l=this.readSync(c.dataId),f=this.readSync(i.dataId),h=0;h<s;++h){var d=h*u,p=new Float32Array(u-1);p[0]=f[d];for(var m=1;m<p.length;++m)p[m]=p[m-1]+f[d+m];for(var v=Bo(a.toString()),g=h*o,b=0;b<o;++b){var x=v();l[g+b]=p.length;for(var y=0;y<p.length;y++)if(x<p[y]){l[g+b]=y;break}}}return c},t.prototype.oneHot=function(e,n,o,a){X(e,"oneHot");var i=new Float32Array(e.size*n);i.fill(a);for(var s=this.readSync(e.dataId),u=0;u<e.size;++u)s[u]>=0&&s[u]<n&&(i[u*n+s[u]]=o);return kn(i,[e.size,n],"int32")},t.prototype.nonMaxSuppression=function(e,n,o,a,i){return X(e,"nonMaxSuppression"),di(this.readSync(e.dataId),this.readSync(n.dataId),o,a,i)},t.prototype.fft=function(e){return this.fftBatch(e,!1)},t.prototype.ifft=function(e){return this.fftBatch(e,!0)},t.prototype.fftBatch=function(e,n){for(var o=e.shape[0],a=e.shape[1],i=xe(e.shape,"float32"),s=xe(e.shape,"float32"),u=Wt(e).as2D(o,a),c=Zt(e).as2D(o,a),l=0;l<o;l++)for(var f=u.slice([l,0],[1,a]),h=c.slice([l,0],[1,a]),d=ut(f,h),p=this.readSync(this.fftImpl(d,n).dataId),m=0;m<a;m++){var v=_s(p,m);i.values[l*a+m]=v.real,s.values[l*a+m]=v.imag}return ut(i.toTensor(),s.toTensor()).as2D(o,a)},t.prototype.fftImpl=function(e,n){var o=e.as1D(),a=o.size;if(this.isExponentOf2(a)){var i=this.fftRadix2(o,a,n).as2D(e.shape[0],e.shape[1]);return n&&(i=ut(Wt(i).div(Z(a)),Zt(i).div(Z(a)))),i}var s=this.readSync(e.dataId),u=function(c){for(var l=new Float32Array(c.length/2),f=new Float32Array(c.length/2),h=0;h<c.length;h+=2)l[h/2]=c[h],f[h/2]=c[h+1];return{real:l,imag:f}}(this.fourierTransformByMatmul(s,a,n));return ut(u.real,u.imag).as2D(e.shape[0],e.shape[1])},t.prototype.isExponentOf2=function(e){return(e&e-1)==0},t.prototype.fftRadix2=function(e,n,o){if(n===1)return e;var a=this.readSync(e.dataId),i=n/2,s=function(g){for(var b=Math.ceil(g.length/4),x=new Float32Array(b),y=new Float32Array(b),w=0;w<g.length;w+=4)x[Math.floor(w/4)]=g[w],y[Math.floor(w/4)]=g[w+1];return{real:x,imag:y}}(a),u=ut(s.real,s.imag).as1D(),c=function(g){for(var b=Math.floor(g.length/4),x=new Float32Array(b),y=new Float32Array(b),w=2;w<g.length;w+=4)x[Math.floor(w/4)]=g[w],y[Math.floor(w/4)]=g[w+1];return{real:x,imag:y}}(a),l=ut(c.real,c.imag).as1D();u=this.fftRadix2(u,i,o),l=this.fftRadix2(l,i,o);var f=function(g,b){for(var x=new Float32Array(g/2),y=new Float32Array(g/2),w=0;w<Math.ceil(g/2);w++){var _=(b?2:-2)*Math.PI*(w/g);x[w]=Math.cos(_),y[w]=Math.sin(_)}return{real:x,imag:y}}(n,o),h=ut(f.real,f.imag).mul(l),d=u.add(h),p=u.sub(h),m=Wt(d).concat(Wt(p)),v=Zt(d).concat(Zt(p));return ut(m,v).as1D()},t.prototype.fourierTransformByMatmul=function(e,n,o){for(var a=new Float32Array(2*n),i=0;i<n;i++){for(var s=0,u=0,c=0;c<n;c++){var l=Wh(i*c,n,o),f=_s(e,c);s+=f.real*l.real-f.imag*l.imag,u+=f.real*l.imag+f.imag*l.real}o&&(s/=n,u/=n),Lh(a,s,u,i)}return a},t.prototype.depthToSpace=function(e,n,o){R(o==="NHWC",function(){return"Only NHWC dataFormat supported on CPU for depthToSpace. Got "+o}),R(n>1,function(){return"blockSize should be > 1 for depthToSpace, but was: "+n});for(var a=e.shape[0],i=e.shape[1],s=e.shape[2],u=e.shape[3],c=i*n,l=s*n,f=u/(n*n),h=this.readSync(e.dataId),d=new Float32Array(a*c*l*f),p=0,m=0;m<a;++m)for(var v=0;v<c;++v)for(var g=Math.floor(v/n),b=v%n,x=0;x<l;++x)for(var y=Math.floor(x/n),w=(b*n+x%n)*f,_=0;_<f;++_){var S=_+w+u*(y+s*(g+i*m));d[p++]=h[S]}return wt(d,[a,c,l,f])},t.prototype.broadcastedBinaryOp=function(e,n,o,a){var i=Ae(e.shape,n.shape),s=xe(i,o),u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=Cn(e.shape,i),f=Cn(n.shape,i),h=s.values;if(l.length+f.length===0)for(var d=0;d<h.length;++d)h[d]=a(u[d%u.length],c[d%c.length]);else{var p=this.bufferSync(e),m=this.bufferSync(n),v=function(g){var b=s.indexToLoc(g),x=b.slice(-e.rank);l.forEach(function(S){return x[S]=0});var y=p.locToIndex(x),w=b.slice(-n.rank);f.forEach(function(S){return w[S]=0});var _=m.locToIndex(w);h[g]=a(u[y],c[_])};for(d=0;d<h.length;++d)v(d)}return s.toTensor()},t.prototype.broadcastedBinaryComplexOp=function(e,n,o){var a=Ae(e.shape,n.shape),i=xe(a,"float32"),s=xe(a,"float32"),u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=Cn(e.shape,a),f=Cn(n.shape,a),h=i.values,d=s.values;if(l.length+f.length===0)for(var p=0;p<h.length;p++){var m=p%u.length,v=p%c.length,g=o(u[2*m],u[2*m+1],c[2*v],c[2*v+1]);h[p]=g.real,d[p]=g.imag}else{var b=this.bufferSync(this.data.get(e.dataId).complexTensors.real),x=this.bufferSync(this.data.get(n.dataId).complexTensors.real),y=function(w){var _=i.indexToLoc(w),S=_.slice(-e.rank);l.forEach(function(D){return S[D]=0});var E=b.locToIndex(S),k=_.slice(-n.rank);f.forEach(function(D){return k[D]=0});var I=x.locToIndex(k),T=o(u[2*E],u[2*E+1],c[2*I],c[2*I+1]);h[w]=T.real,d[w]=T.imag};for(p=0;p<h.length;p++)y(p)}return this.complex(i.toTensor(),s.toTensor())},t.prototype.split=function(e,n,o){return Xu(e,n,o)},t.prototype.dispose=function(){},t.prototype.floatPrecision=function(){return 32},t.prototype.epsilon=function(){return 1e-7},t.prototype.cropAndResize=function(e,n,o,a,i,s){for(var u=e.shape,c=u[0],l=u[1],f=u[2],h=u[3],d=n.shape[0],p=a[0],m=a[1],v=xe([d,p,m,h],"float32"),g=this.readSync(n.dataId),b=this.readSync(o.dataId),x=this.readSync(e.dataId),y=e.strides,w=v.strides,_=0;_<d;_++){var S=4*_,E=g[S],k=g[S+1],I=g[S+2],T=g[S+3],D=b[_];if(!(D>=c))for(var U=p>1?(I-E)*(l-1)/(p-1):0,V=m>1?(T-k)*(f-1)/(m-1):0,z=0;z<p;z++){var O=p>1?E*(l-1)+z*U:.5*(E+I)*(l-1);if(O<0||O>l-1)for(var P=0;P<m;P++)for(var q=0;q<h;q++){var j=q+P*w[2]+z*w[1]+_*w[0];v.values[j]=s}else if(i==="bilinear"){var K=Math.floor(O),J=Math.ceil(O),ne=O-K;for(P=0;P<m;P++)if((Ee=m>1?k*(f-1)+P*V:.5*(k+T)*(f-1))<0||Ee>f-1)for(q=0;q<h;q++)j=q+P*w[2]+z*w[1]+_*w[0],v.values[j]=s;else{var ce=Math.floor(Ee),de=Math.ceil(Ee),ge=Ee-ce;for(q=0;q<h;q++){var ye=x[j=q+ce*y[2]+K*y[1]+D*y[0]],Ie=x[j=q+de*y[2]+K*y[1]+D*y[0]],_e=x[j=q+ce*y[2]+J*y[1]+D*y[0]],Re=ye+(Ie-ye)*ge,Fe=_e+(x[j=q+de*y[2]+J*y[1]+D*y[0]]-_e)*ge;j=q+P*w[2]+z*w[1]+_*w[0],v.values[j]=Re+(Fe-Re)*ne}}}else for(P=0;P<m;++P){var Ee;if((Ee=m>1?k*(f-1)+P*V:.5*(k+T)*(f-1))<0||Ee>f-1)for(q=0;q<h;q++)j=q+P*w[2]+z*w[1]+_*w[0],v.values[j]=s;else{var Ne=Math.round(Ee),De=Math.round(O);for(q=0;q<h;q++){var Le=q+Ne*y[2]+De*y[1]+D*y[0],Q=q+P*w[2]+z*w[1]+_*w[0];v.values[Q]=x[Le]}}}}}return v.toTensor()},t.prototype.sparseToDense=function(e,n,o,a){var i=Eo(0,e,o),s=i.sliceRank,u=i.numUpdates,c=i.sliceSize,l=i.strides,f=i.outputSize;return this.scatter(e,n,o,f,c,u,s,l,a,!1)},t.prototype.gatherND=function(e,n){var o=n.shape,a=o[o.length-1],i=Lu(e,n),s=i[0],u=i[1],c=i[2],l=i[3];if(u===0)return lt([],s,e.dtype);for(var f=new Nr([u,c],e.dtype),h=this.readSync(n.dataId),d=this.readSync(e.dataId),p=0;p<u;p++){for(var m=[],v=0,g=0;g<a;g++){var b=h[p*a+g];v+=b*l[g],m.push(b)}if(v<0||v>=e.size/c)throw new Error("Invalid indices: "+m+" does not index into "+e.shape);for(var x=0;x<c;x++)f.values[p*c+x]=d[v*c+x]}return f.toTensor().reshape(s)},t.prototype.scatterND=function(e,n,o){var a=Eo(0,e,o),i=a.sliceRank,s=a.numUpdates,u=a.sliceSize,c=a.strides,l=a.outputSize,f=Z(0);return this.scatter(e,n,o,l,u,s,i,c,f,!0)},t.prototype.fill=function(e,n,o){var a=po(o=o||Wr(n),ae(e));return a.fill(n),N.makeTensor(a,e,o,this)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported for string tensors");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){var n=po(e.dtype,ae(e.shape));return this.makeOutput(n,e.shape,e.dtype)},t.prototype.linspace=function(e,n,o){return ju(e,n,o)},t.prototype.scatter=function(e,n,o,a,i,s,u,c,l,f){var h=[a/i,i],d=this.readSync(e.dataId),p=this.readSync(n.dataId);if(a===0)return lt([],o,n.dtype);var m=new Nr(h,n.dtype);m.values.fill(this.readSync(l.dataId)[0]);for(var v=0;v<s;v++){for(var g=[],b=0,x=0;x<u;x++){var y=d[v*u+x];g.push(y),b+=y*c[x]}if(b<0||b>=a/i)throw new Error("Invalid indices: "+g+" does not index into "+o);for(var w=0;w<i;w++)f?m.values[b*i+w]+=p[v*i+w]:m.values[b*i+w]=n.rank===0?p[0]:p[v*i+w]}return m.toTensor().reshape(o)},t}(Gu);N.registerBackend("cpu",function(){return new ag},1);for(var wa=0,Hs=[{kernelName:"NonMaxSuppressionV5",backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs,o=t,a=o.boxes,i=o.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,f=s.softNmsSigma,h=e;X(a,"NonMaxSuppressionWithScore");var d=pi(h.data.get(a.dataId).values,h.data.get(i.dataId).values,u,c,l,f);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t.x,o=e;X(n,"square");for(var a=o.data.get(n.dataId).values,i=new Float32Array(a.length),s=0;s<a.length;++s){var u=a[s];i[s]=u*u}return{dataId:o.write(i,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}},{kernelName:Mr,backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t,o=n.a,a=n.b,i=e;X([o,a],Mr);var s=i.data.get(o.dataId).values,u=i.data.get(a.dataId).values,c=function(h,d,p,m,v,g){var b=Ae(h,d),x=b.length,y=nn(b),w=Tr(v,ae(b)),_=h.length,S=d.length,E=nn(h),k=nn(d),I=Cn(h,b),T=Cn(d,b);if(I.length+T.length===0)for(var D=0;D<w.length;++D)w[D]=g(p[D%p.length],m[D%m.length]);else{var U=function(V){var z=vf(V,x,y),O=z.slice(-_);I.forEach(function(K){return O[K]=0});var P=ds(O,_,E),q=z.slice(-S);T.forEach(function(K){return q[K]=0});var j=ds(q,S,k);w[V]=g(p[P],m[j])};for(D=0;D<w.length;++D)U(D)}return[w,b]}(o.shape,a.shape,s,u,o.dtype,function(h,d){var p=h-d;return p*p}),l=c[0],f=c[1];return{dataId:i.write(l,f,o.dtype),shape:f,dtype:o.dtype}}}];wa<Hs.length;wa++)gu(Hs[wa]);var Qn,ig=function(r){this.variableNames=["A"];var t=pt(),e=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+n+".0, "+e+`.0);

        vec4 values = `+t.texture2D+`(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `},sg=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var t=pt(),e=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(`+n+".0, "+e+`.0);
            vec4 values = `+t.texture2D+`(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        `+t.output+` = result;
      }
    `};for(var _a=0,qs=[{kernelName:"FromPixels",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs,o=t.pixels,a=n.numChannels,i=typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement,s=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,u=i?[o.videoWidth,o.videoHeight]:[o.width,o.height],c=u[0],l=u[1],f=[l,c],h=[l,c,a];(s||i)&&(Qn==null&&(Qn=document.createElement("canvas").getContext("2d")),Qn.canvas.width=c,Qn.canvas.height=l,Qn.drawImage(o,0,0,c,l),o=Qn.canvas);var d=e.makeTensorInfo(f,"int32");e.texData.get(d.dataId).usage=Nt.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(d.dataId),o);var p=G().getBool("WEBGL_PACK")?new sg(h):new ig(h),m=e.runWebGLProgram(p,[d],"int32");return e.disposeData(d.dataId),m}},{kernelName:"NonMaxSuppressionV5",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs;yo("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");var o=t,a=o.boxes,i=o.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,f=s.softNmsSigma,h=e,d=pi(h.readSync(a.dataId),h.readSync(i.dataId),u,c,l,f);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t.x,o=e,a=new Ce(n.shape,"return x * x;");return o.runWebGLProgram(a,[n],n.dtype)}},{kernelName:Mr,backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t,o=n.a,a=n.b,i=e,s=G().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new fn("return (a - b) * (a - b);",o.shape,a.shape):new Ke("return (a - b) * (a - b);",o.shape,a.shape);return i.compileAndRun(s,[o,a])}}];_a<qs.length;_a++)gu(qs[_a]);for(var Ca=0,js=[{kernelName:"Square",gradFunc:function(r,t){var e=t[0];return{x:function(){return r.mul(e.toFloat().mul(2))}}}},{kernelName:Mr,gradFunc:function(r,t){var e=t[0],n=t[1],o=Z(2);return{a:function(){return mt(r,mt(o,tt(e,n)))},b:function(){return mt(r,mt(o,tt(n,e)))}}}}];Ca<js.length;Ca++)rf(js[Ca]);var ug=function(){function r(){}return r.prototype.fetch=function(t,e){return fetch(t,e)},r.prototype.now=function(){return performance.now()},r.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Browser's encoder only supports utf-8, but got "+e);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)},r.prototype.decode=function(t,e){return new TextDecoder(e).decode(t)},r}();G().get("IS_BROWSER")&&G().setPlatform("browser",new ug);var Ea,cg=function(){return require("node-fetch")},lg=function(){function r(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}return r.prototype.fetch=function(t,e){return G().global.fetch!=null?G().global.fetch(t,e):(Ea==null&&(Ea=cg()),Ea(t,e))},r.prototype.now=function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6},r.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Node built-in encoder only supports utf-8, but got "+e);return this.textEncoder.encode(t)},r.prototype.decode=function(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)},r}();G().get("IS_NODE")&&G().setPlatform("node",new lg);var $a={float32:4,int32:4,uint16:2,uint8:1,bool:1},To=4;function Vc(r,t){for(var e={},n=0,o=function(s){var u=s.name,c=s.dtype,l=s.shape,f=ae(l),h=void 0;if("quantization"in s){var d=s.quantization;if(d.dtype!=="uint8"&&d.dtype!=="uint16")throw new Error("Weight "+s.name+" has unknown quantization dtype "+d.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var p=$a[d.dtype],m=r.slice(n,n+f*p),v=d.dtype==="uint8"?new Uint8Array(m):new Uint16Array(m);if(c==="float32")h=Float32Array.from(v,function(_){return _*d.scale+d.min});else{if(c!=="int32")throw new Error("Unsupported dtype in weight '"+u+"': "+c);h=Int32Array.from(v,function(_){return Math.round(_*d.scale+d.min)})}n+=f*p}else if(c==="string"){var g=ae(s.shape);h=[];for(var b=0;b<g;b++){var x=new Uint32Array(r.slice(n,n+To))[0];n+=To;var y=new Uint8Array(r.slice(n,n+x));h.push(y),n+=x}}else{var w=$a[c];if(m=r.slice(n,n+f*w),c==="float32")h=new Float32Array(m);else if(c==="int32")h=new Int32Array(m);else{if(c!=="bool")throw new Error("Unsupported dtype in weight '"+u+"': "+c);h=new Uint8Array(m)}n+=f*w}e[u]=lt(h,l,c)},a=0,i=t;a<i.length;a++)o(i[a]);return e}function fg(r){if(r===null)throw new Error("Invalid input value: "+JSON.stringify(r));var t=0,e=[];r.forEach(function(a){if(t+=a.byteLength,e.push(a.byteLength===a.buffer.byteLength?a:new a.constructor(a)),!(a instanceof Float32Array||a instanceof Int32Array||a instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+a.constructor.name)});var n=new Uint8Array(t),o=0;return e.forEach(function(a){n.set(new Uint8Array(a.buffer),o),o+=a.byteLength}),n.buffer}var Ya=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Ks(r){return Ya?Buffer.byteLength(r):new Blob([r]).size}function Fi(r){var t=0;r.forEach(function(o){t+=o.byteLength});var e=new Uint8Array(t),n=0;return r.forEach(function(o){e.set(new Uint8Array(o),n),n+=o.byteLength}),e.buffer}function Xs(r){for(r=r.trim();r.endsWith("/");)r=r.slice(0,r.length-1);var t=r.split("/");return t[t.length-1]}function jr(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:Ks(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:Ks(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:r.weightData.byteLength}}var Ft=function(){function r(){this.saveRouters=[],this.loadRouters=[]}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerSaveRouter=function(t){r.getInstance().saveRouters.push(t)},r.registerLoadRouter=function(t){r.getInstance().loadRouters.push(t)},r.getSaveHandlers=function(t){return r.getHandlers(t,"save")},r.getLoadHandlers=function(t,e){return r.getHandlers(t,"load",e)},r.getHandlers=function(t,e,n){var o=[];return(e==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(function(a){var i=a(t,n);i!==null&&o.push(i)}),o},r}(),ur="://",Rn=function(){function r(){this.managers={}}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerManager=function(t,e){R(t!=null,function(){return"scheme must not be undefined or null."}),t.endsWith(ur)&&(t=t.slice(0,t.indexOf(ur))),R(t.length>0,function(){return"scheme must not be an empty string."});var n=r.getInstance();R(n.managers[t]==null,function(){return"A model store manager is already registered for scheme '"+t+"'."}),n.managers[t]=e},r.getManager=function(t){var e=this.getInstance().managers[t];if(e==null)throw new Error("Cannot find model manager for scheme '"+t+"'");return e},r.getSchemes=function(){return Object.keys(this.getInstance().managers)},r}();function fo(r){if(r.indexOf(ur)===-1)throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+Rn.getSchemes().join(","));return{scheme:r.split(ur)[0],path:r.split(ur)[1]}}function $s(r,t,e){return e===void 0&&(e=!1),re(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,f;return oe(this,function(h){switch(h.label){case 0:return R(r!==t,function(){return"Old path and new path are the same: '"+r+"'"}),R((n=Ft.getLoadHandlers(r)).length>0,function(){return"Copying failed because no load handler is found for source URL "+r+"."}),R(n.length<2,function(){return"Copying failed because more than one ("+n.length+") load handlers for source URL "+r+"."}),o=n[0],R((a=Ft.getSaveHandlers(t)).length>0,function(){return"Copying failed because no save handler is found for destination URL "+t+"."}),R(a.length<2,function(){return"Copying failed because more than one ("+n.length+") save handlers for destination URL "+t+"."}),i=a[0],s=fo(r).scheme,u=fo(r).path,c=s===fo(r).scheme,[4,o.load()];case 1:return l=h.sent(),e&&c?[4,Rn.getManager(s).removeModel(u)]:[3,3];case 2:h.sent(),h.label=3;case 3:return[4,i.save(l)];case 4:return f=h.sent(),!e||c?[3,6]:[4,Rn.getManager(s).removeModel(u)];case 5:h.sent(),h.label=6;case 6:return[2,f.modelArtifactsInfo]}})})}var Vn="models_store",En="model_info_store";function Uc(){if(!G().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var r=window||self,t=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Ja(r){var t=r.result;t.createObjectStore(Vn,{keyPath:"modelPath"}),t.createObjectStore(En,{keyPath:"modelPath"})}var cr=function(){function r(t){if(this.indexedDB=Uc(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}return r.prototype.save=function(t){return re(this,void 0,void 0,function(){return oe(this,function(e){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,t)]})})},r.prototype.load=function(){return re(this,void 0,void 0,function(){return oe(this,function(t){return[2,this.databaseAction(this.modelPath)]})})},r.prototype.databaseAction=function(t,e){var n=this;return new Promise(function(o,a){var i=n.indexedDB.open("tensorflowjs",1);i.onupgradeneeded=function(){return Ja(i)},i.onsuccess=function(){var s=i.result;if(e==null){var u=s.transaction(Vn,"readonly"),c=u.objectStore(Vn).get(n.modelPath);c.onsuccess=function(){if(c.result==null)return s.close(),a(new Error("Cannot find model with path '"+n.modelPath+"' in IndexedDB."));o(c.result.modelArtifacts)},c.onerror=function(m){return s.close(),a(c.error)},u.oncomplete=function(){return s.close()}}else{var l,f=jr(e),h=s.transaction(En,"readwrite"),d=h.objectStore(En),p=d.put({modelPath:n.modelPath,modelArtifactsInfo:f});p.onsuccess=function(){var m=(l=s.transaction(Vn,"readwrite")).objectStore(Vn).put({modelPath:n.modelPath,modelArtifacts:e,modelArtifactsInfo:f});m.onsuccess=function(){return o({modelArtifactsInfo:f})},m.onerror=function(v){var g=(d=h.objectStore(En)).delete(n.modelPath);g.onsuccess=function(){return s.close(),a(m.error)},g.onerror=function(b){return s.close(),a(m.error)}}},p.onerror=function(m){return s.close(),a(p.error)},h.oncomplete=function(){l==null?s.close():l.oncomplete=function(){return s.close()}}}},i.onerror=function(s){return a(i.error)}})},r.URL_SCHEME="indexeddb://",r}(),Ys=function(r){return G().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(cr.URL_SCHEME)?(t=r.slice(cr.URL_SCHEME.length),new cr(t)):null;var t};Ft.registerSaveRouter(Ys),Ft.registerLoadRouter(Ys);var hg=function(){function r(){this.indexedDB=Uc()}return r.prototype.listModels=function(){return re(this,void 0,void 0,function(){var t=this;return oe(this,function(e){return[2,new Promise(function(n,o){var a=t.indexedDB.open("tensorflowjs",1);a.onupgradeneeded=function(){return Ja(a)},a.onsuccess=function(){var i=a.result,s=i.transaction(En,"readonly"),u=s.objectStore(En).getAll();u.onsuccess=function(){for(var c={},l=0,f=u.result;l<f.length;l++){var h=f[l];c[h.modelPath]=h.modelArtifactsInfo}n(c)},u.onerror=function(c){return i.close(),o(u.error)},s.oncomplete=function(){return i.close()}},a.onerror=function(i){return o(a.error)}})]})})},r.prototype.removeModel=function(t){return re(this,void 0,void 0,function(){var e=this;return oe(this,function(n){var o;return t=(o=t).startsWith(cr.URL_SCHEME)?o.slice(cr.URL_SCHEME.length):o,[2,new Promise(function(a,i){var s=e.indexedDB.open("tensorflowjs",1);s.onupgradeneeded=function(){return Ja(s)},s.onsuccess=function(){var u,c=s.result,l=c.transaction(En,"readwrite"),f=l.objectStore(En),h=f.get(t);h.onsuccess=function(){if(h.result==null)return c.close(),i(new Error("Cannot find model with path '"+t+"' in IndexedDB."));var d=f.delete(t),p=function(){var m=(u=c.transaction(Vn,"readwrite")).objectStore(Vn).delete(t);m.onsuccess=function(){return a(h.result.modelArtifactsInfo)},m.onerror=function(v){return i(h.error)}};d.onsuccess=p,d.onerror=function(m){return p(),c.close(),i(h.error)}},h.onerror=function(d){return c.close(),i(h.error)},l.oncomplete=function(){u==null?c.close():u.oncomplete=function(){return c.close()}}},s.onerror=function(u){return i(s.error)}})]})})},r}();if(G().getBool("IS_BROWSER"))try{Rn.registerManager(cr.URL_SCHEME,new hg)}catch{}var hn="/",or="tensorflowjs_models",zc="info",dg="model_topology",pg="weight_specs",vg="weight_data",mg="model_metadata";function Gc(r){return{info:[or,r,zc].join(hn),topology:[or,r,dg].join(hn),weightSpecs:[or,r,pg].join(hn),weightData:[or,r,vg].join(hn),modelMetadata:[or,r,mg].join(hn)}}function gg(r){var t=r.split(hn);if(t.length<3)throw new Error("Invalid key format: "+r);return t.slice(1,t.length-1).join(hn)}var lr=function(){function r(t){if(!G().getBool("IS_BROWSER")||typeof window>"u"||window.localStorage===void 0)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=Gc(this.modelPath)}return r.prototype.save=function(t){return re(this,void 0,void 0,function(){var e,n,o;return oe(this,function(a){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");e=JSON.stringify(t.modelTopology),n=JSON.stringify(t.weightSpecs),o=jr(t);try{return this.LS.setItem(this.keys.info,JSON.stringify(o)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,function(i){if(Ya)return Buffer.from(i).toString("base64");for(var s=new Uint8Array(i),u="",c=0,l=s.length;c<l;c++)u+=String.fromCharCode(s[c]);return btoa(u)}(t.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata})),[2,{modelArtifactsInfo:o}]}catch{throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+o.modelTopologyBytes+", weightSpecsBytes="+o.weightSpecsBytes+", weightDataBytes="+o.weightDataBytes+".")}return[2]})})},r.prototype.load=function(){return re(this,void 0,void 0,function(){var t,e,n,o,a,i,s;return oe(this,function(u){if((t=JSON.parse(this.LS.getItem(this.keys.info)))==null)throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(e={},(n=JSON.parse(this.LS.getItem(this.keys.topology)))==null)throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(e.modelTopology=n,(o=JSON.parse(this.LS.getItem(this.keys.weightSpecs)))==null)throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(e.weightSpecs=o,(a=this.LS.getItem(this.keys.modelMetadata))!=null&&(i=JSON.parse(a),e.format=i.format,e.generatedBy=i.generatedBy,e.convertedBy=i.convertedBy,e.userDefinedMetadata=i.userDefinedMetadata),(s=this.LS.getItem(this.keys.weightData))==null)throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return e.weightData=function(c){if(Ya){var l=Buffer.from(c,"base64");return l.buffer.slice(l.byteOffset,l.byteOffset+l.byteLength)}for(var f=atob(c),h=new Uint8Array(f.length),d=0;d<f.length;++d)h.set([f.charCodeAt(d)],d);return h.buffer}(s),[2,e]})})},r.URL_SCHEME="localstorage://",r}(),Js=function(r){return G().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(lr.URL_SCHEME)?(t=r.slice(lr.URL_SCHEME.length),new lr(t)):null;var t};Ft.registerSaveRouter(Js),Ft.registerLoadRouter(Js);var yg=function(){function r(){R(G().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),R(typeof window>"u"||window.localStorage!==void 0,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}return r.prototype.listModels=function(){return re(this,void 0,void 0,function(){var t,e,n,o,a,i;return oe(this,function(s){for(t={},e=or+hn,n=hn+zc,o=0;o<this.LS.length;++o)(a=this.LS.key(o)).startsWith(e)&&a.endsWith(n)&&(i=gg(a),t[i]=JSON.parse(this.LS.getItem(a)));return[2,t]})})},r.prototype.removeModel=function(t){return re(this,void 0,void 0,function(){var e,n;return oe(this,function(o){var a;if(t=(a=t).startsWith(lr.URL_SCHEME)?a.slice(lr.URL_SCHEME.length):a,e=Gc(t),this.LS.getItem(e.info)==null)throw new Error("Cannot find model at path '"+t+"'");return n=JSON.parse(this.LS.getItem(e.info)),this.LS.removeItem(e.info),this.LS.removeItem(e.topology),this.LS.removeItem(e.weightSpecs),this.LS.removeItem(e.weightData),[2,n]})})},r}();if(G().getBool("IS_BROWSER"))try{Rn.registerManager(lr.URL_SCHEME,new yg)}catch{}var bg="model",xg=".json",wg=".weights.bin";function Qs(r){return new Promise(function(t){return setTimeout(t)}).then(r)}var ka=function(){function r(t){if(!G().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(r.URL_SCHEME)&&(t=t.slice(r.URL_SCHEME.length)),t!=null&&t.length!==0||(t=bg),this.modelTopologyFileName=t+xg,this.weightDataFileName=t+wg}return r.prototype.save=function(t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s;return oe(this,function(u){switch(u.label){case 0:if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(e=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"})),!(t.modelTopology instanceof ArrayBuffer))return[3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],o={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:n},a=window.URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"})),(i=this.jsonAnchor==null?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=a,[4,Qs(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:return u.sent(),t.weightData==null?[3,4]:((s=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=e,[4,Qs(function(){return s.dispatchEvent(new MouseEvent("click"))})]);case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:jr(t)}]}})})},r.URL_SCHEME="downloads://",r}(),_g=function(){function r(t){if(t==null||t.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+t);this.files=t}return r.prototype.load=function(){return re(this,void 0,void 0,function(){var t,e,n=this;return oe(this,function(o){return t=this.files[0],e=this.files.slice(1),[2,new Promise(function(a,i){var s=new FileReader;s.onload=function(u){var c=JSON.parse(u.target.result),l=c.modelTopology;if(l!=null){e.length===0&&a({modelTopology:l});var f=c.weightsManifest;if(f!=null){var h;try{h=n.checkManifestAndWeightFiles(f,e)}catch(v){return void i(v)}var d=[],p=[],m=[];f.forEach(function(v){v.paths.forEach(function(g){p.push(g),m.push(null)}),d.push.apply(d,v.weights)}),f.forEach(function(v){v.paths.forEach(function(g){var b=new FileReader;b.onload=function(x){var y=x.target.result,w=p.indexOf(g);m[w]=y,m.indexOf(null)===-1&&a({modelTopology:l,weightSpecs:d,weightData:Fi(m),format:c.format,generatedBy:c.generatedBy,convertedBy:c.convertedBy,userDefinedMetadata:c.userDefinedMetadata})},b.onerror=function(x){return i("Failed to weights data from file of path '"+g+"'.")},b.readAsArrayBuffer(h[g])})})}else i(new Error("weightManifest field is missing from file "+t.name))}else i(new Error("modelTopology field is missing from file "+t.name))},s.onerror=function(u){return i("Failed to read model topology and weights manifest JSON from file '"+t.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},s.readAsText(t)})]})})},r.prototype.checkManifestAndWeightFiles=function(t,e){for(var n=[],o=e.map(function(u){return Xs(u.name)}),a={},i=0,s=t;i<s.length;i++)s[i].paths.forEach(function(u){var c=Xs(u);if(n.indexOf(c)!==-1)throw new Error("Duplicate file basename found in weights manifest: '"+c+"'");if(n.push(c),o.indexOf(c)===-1)throw new Error("Weight file with basename '"+c+"' is not provided.");a[u]=e[o.indexOf(c)]});if(n.length!==e.length)throw new Error("Mismatch in the number of files in weights manifest ("+n.length+") and the number of weight files provided ("+e.length+").");return a},r}();function Zs(r,t,e,n){(function(a){R(a!=null&&Array.isArray(a)&&a.length>0,function(){return"promises must be a none empty array"})})(r),function(a,i){R(a>=0&&a<=1,function(){return"Progress fraction must be in range [0, 1], but got startFraction "+a}),R(i>=0&&i<=1,function(){return"Progress fraction must be in range [0, 1], but got endFraction "+i}),R(i>=a,function(){return"startFraction must be no more than endFraction, but got startFraction "+a+" and endFraction "+i})}(e=e??0,n=n??1);var o=0;return Promise.all(r.map(function(a){return a.then(function(i){var s=e+ ++o/r.length*(n-e);return t(s),i}),a}))}function Hc(r,t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s,u,c,l;return oe(this,function(f){switch(f.label){case 0:return t==null&&(t={}),e=t.fetchFunc==null?G().platform.fetch:t.fetchFunc,n=r.map(function(h){return e(h,t.requestInit,{isBinary:!0})}),o=0,a=.5,t.onProgress!=null?[3,2]:[4,Promise.all(n)];case 1:return i=f.sent(),[3,4];case 2:return[4,Zs(n,t.onProgress,o,a)];case 3:i=f.sent(),f.label=4;case 4:return s=i.map(function(h){return h.arrayBuffer()}),u=.5,c=1,t.onProgress!=null?[3,6]:[4,Promise.all(s)];case 5:return l=f.sent(),[3,8];case 6:return[4,Zs(s,t.onProgress,u,c)];case 7:l=f.sent(),f.label=8;case 8:return[2,l]}})})}function eu(r){var t=this;return function(e,n,o){return n===void 0&&(n=""),re(t,void 0,void 0,function(){var a,i,s,u,c,l,f,h,d,p;return oe(this,function(m){switch(m.label){case 0:if(a=e.map(function(){return!1}),i={},s=o!=null?o.map(function(){return!1}):[],u=[],e.forEach(function(v,g){var b=0;v.weights.forEach(function(x){var y="quantization"in x?x.quantization.dtype:x.dtype,w=$a[y]*ae(x.shape),_=function(){a[g]=!0,i[g]==null&&(i[g]=[]),i[g].push({manifestEntry:x,groupOffset:b,sizeBytes:w})};o!=null?o.forEach(function(S,E){S===x.name&&(_(),s[E]=!0)}):_(),u.push(x.name),b+=w})}),!s.every(function(v){return v}))throw c=o.filter(function(v,g){return!s[g]}),new Error("Could not find weights in manifest with names: "+c.join(", ")+`. 
Manifest JSON has weights with names: `+u.join(", ")+".");return l=a.reduce(function(v,g,b){return g&&v.push(b),v},[]),f=[],l.forEach(function(v){e[v].paths.forEach(function(g){var b=n+(n.endsWith("/")?"":"/")+g;f.push(b)})}),[4,r(f)];case 1:return h=m.sent(),d={},p=0,l.forEach(function(v){for(var g=e[v].paths.length,b=0,x=0;x<g;x++)b+=h[p+x].byteLength;for(var y=new ArrayBuffer(b),w=new Uint8Array(y),_=0,S=0;S<g;S++){var E=new Uint8Array(h[p+S]);w.set(E,_),_+=E.byteLength}i[v].forEach(function(k){var I=Vc(y.slice(k.groupOffset,k.groupOffset+k.sizeBytes),[k.manifestEntry]);for(var T in I)d[T]=I[T]}),p+=g}),[2,d]}})})}}Ft.registerSaveRouter(function(r){return G().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(ka.URL_SCHEME)?function(t){return t===void 0&&(t="model"),new ka(t)}(r.slice(ka.URL_SCHEME.length)):null});var qc=function(){function r(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.onProgress=e.onProgress,e.fetchFunc!=null?(R(typeof e.fetchFunc=="function",function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=e.fetchFunc):this.fetch=G().platform.fetch,R(t!=null&&t.length>0,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(t)&&R(t.length===2,function(){return"URL paths for http must have a length of 2, (actual length is "+t.length+")."}),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{}}return r.prototype.save=function(t){return re(this,void 0,void 0,function(){var e,n,o,a;return oe(this,function(i){switch(i.label){case 0:if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,n=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],o={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata,weightsManifest:n},e.body.append("model.json",new Blob([JSON.stringify(o)],{type:"application/json"}),"model.json"),t.weightData!=null&&e.body.append("model.weights.bin",new Blob([t.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,e)];case 1:if((a=i.sent()).ok)return[2,{modelArtifactsInfo:jr(t),responses:[a]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+a.status+".")}})})},r.prototype.load=function(){return re(this,void 0,void 0,function(){var t,e,n,o,a,i,s,u,c,l,f,h;return oe(this,function(d){switch(d.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(t=d.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+t.status+". Please verify this URL points to the model JSON of the model to load.");d.label=2;case 2:return d.trys.push([2,4,,5]),[4,t.json()];case 3:return e=d.sent(),[3,5];case 4:throw d.sent(),n="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?n+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":n+=" Please make sure the server is serving valid JSON for this request.",new Error(n);case 5:if(o=e.modelTopology,a=e.weightsManifest,i=e.generatedBy,s=e.convertedBy,u=e.format,c=e.userDefinedMetadata,o==null&&a==null)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return a==null?[3,7]:[4,this.loadWeights(a)];case 6:h=d.sent(),l=h[0],f=h[1],d.label=7;case 7:return[2,{modelTopology:o,weightSpecs:l,weightData:f,userDefinedMetadata:c,generatedBy:i,convertedBy:s,format:u}]}})})},r.prototype.loadWeights=function(t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s,u,c,l,f,h;return oe(this,function(d){switch(d.label){case 0:for(e=Array.isArray(this.path)?this.path[1]:this.path,n=function(p){var m=p.lastIndexOf("/"),v=p.lastIndexOf("?"),g=p.substring(0,m),b=v>m?p.substring(v):"";return[g+"/",b]}(e),o=n[0],a=n[1],i=this.weightPathPrefix||o,s=[],u=0,c=t;u<c.length;u++)l=c[u],s.push.apply(s,l.weights);return f=[],t.forEach(function(p){p.paths.forEach(function(m){f.push(i+m+a)})}),[4,Hc(f,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return h=d.sent(),[2,[s,Fi(h)]]}})})},r.URL_SCHEME_REGEX=/^https?:\/\//,r}();function Qa(r){return r.match(qc.URL_SCHEME_REGEX)!=null}var tu=function(r,t){return typeof fetch>"u"?null:(Array.isArray(r)?r.every(function(e){return Qa(e)}):Qa(r))?Za(r,{onProgress:t}):null};function Za(r,t){return new qc(r,t)}Ft.registerSaveRouter(tu),Ft.registerLoadRouter(tu);var Ra=function(){function r(t){this.modelArtifacts=t}return r.prototype.load=function(){return re(this,void 0,void 0,function(){return oe(this,function(t){return[2,this.modelArtifacts]})})},r}(),Cg=function(){function r(t){this.saveHandler=t}return r.prototype.save=function(t){return re(this,void 0,void 0,function(){return oe(this,function(e){return[2,this.saveHandler(t)]})})},r}(),jc=Object.freeze({browserFiles:function(r){return new _g(r)},browserHTTPRequest:function(r,t){return Za(r,t)},concatenateArrayBuffers:Fi,decodeWeights:Vc,encodeWeights:function(r,t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s=this;return oe(this,function(u){switch(u.label){case 0:for(e=[],n=[],o=Array.isArray(r)?r.map(function(c){return c.name}):Object.keys(r),a=function(c){var l=o[c],f=Array.isArray(r)?r[c].tensor:r[l];if(f.dtype!=="float32"&&f.dtype!=="int32"&&f.dtype!=="bool"&&f.dtype!=="string")throw new Error("Unsupported dtype in weight '"+l+"': "+f.dtype);var h={name:l,shape:f.shape,dtype:f.dtype};if(f.dtype==="string"){var d=new Promise(function(p){return re(s,void 0,void 0,function(){var m,v,g,b,x,y,w;return oe(this,function(_){switch(_.label){case 0:return[4,f.bytes()];case 1:for(m=_.sent(),v=m.reduce(function(S,E){return S+E.length},0)+To*m.length,g=new Uint8Array(v),b=0,x=0;x<m.length;x++)y=m[x],w=new Uint8Array(new Uint32Array([y.length]).buffer),g.set(w,b),b+=To,g.set(y,b),b+=y.length;return p(g),[2]}})})});n.push(d)}else n.push(f.data());t!=null&&(h.group=t),e.push(h)},i=0;i<o.length;++i)a(i);return[4,Promise.all(n)];case 1:return[2,{data:fg(u.sent()),specs:e}]}})})},fromMemory:function(r,t,e,n){return arguments.length===1?r.modelTopology!=null||r.weightSpecs!=null?new Ra(r):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Ra({modelTopology:r})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Ra({modelTopology:r,weightSpecs:t,weightData:e,trainingConfig:n}))},getLoadHandlers:function(r,t){return Ft.getLoadHandlers(r,t)},getModelArtifactsInfoForJSON:jr,getSaveHandlers:function(r){return Ft.getSaveHandlers(r)},http:Za,isHTTPScheme:Qa,loadWeights:function(r,t,e,n){return t===void 0&&(t=""),re(this,void 0,void 0,function(){return oe(this,function(o){return[2,eu(function(a){return Hc(a,{requestInit:n})})(r,t,e)]})})},registerLoadRouter:function(r){return Ft.registerLoadRouter(r)},registerSaveRouter:function(r){return Ft.registerSaveRouter(r)},weightsLoaderFactory:eu,withSaveHandler:function(r){return new Cg(r)},copyModel:function(r,t){return re(this,void 0,void 0,function(){return oe(this,function(e){return[2,$s(r,t,!1)]})})},listModels:function(){return re(this,void 0,void 0,function(){var r,t,e,n,o,a,i;return oe(this,function(s){switch(s.label){case 0:r=Rn.getSchemes(),t={},e=0,n=r,s.label=1;case 1:return e<n.length?(o=n[e],[4,Rn.getManager(o).listModels()]):[3,4];case 2:for(i in a=s.sent())t[o+ur+i]=a[i];s.label=3;case 3:return e++,[3,1];case 4:return[2,t]}})})},moveModel:function(r,t){return re(this,void 0,void 0,function(){return oe(this,function(e){return[2,$s(r,t,!0)]})})},removeModel:function(r){return re(this,void 0,void 0,function(){var t;return oe(this,function(e){return t=fo(r),[2,Rn.getManager(t.scheme).removeModel(t.path)]})})}}),Zn;A({confusionMatrix_:function(r,t,e){var n=C(r,"labels","confusionMatrix"),o=C(t,"predictions","confusionMatrix");R(e==null||e>0&&Number.isInteger(e),function(){return"If provided, numClasses must be a positive integer, but got "+e}),R(n.rank===1,function(){return"Expected the rank of labels to be 1, but got "+n.rank}),R(o.rank===1,function(){return"Expected the rank of predictions to be 1, but got "+o.rank}),R(n.shape[0]===o.shape[0],function(){return"Mismatch in the number of examples: "+n.shape[0]+" vs. "+o.shape[0]+". Labels and predictions should have the same number of elements."}),R(e>0&&Number.isInteger(e),function(){return"numClasses is required to be a positive integer, but got "+e});var a=Ha(n.asType("int32"),e),i=Ha(o.asType("int32"),e);return a.transpose().matMul(i).asType("int32")}});var Eg=A({fromPixels_:function(r,t){if(t===void 0&&(t=3),t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var e=!1,n=!1,o=!1,a=!1,i=!1;if(r.data instanceof Uint8Array)e=!0;else if(typeof ImageData<"u"&&r instanceof ImageData)n=!0;else if(typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement)o=!0;else if(typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement)a=!0;else{if(r.getContext==null)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+r.constructor.name);i=!0}if(o&&o&&r.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");if(mu("FromPixels",N.backendName)!=null)return N.runKernel("FromPixels",{pixels:r},{numChannels:t});var s,u,c=o?[r.videoWidth,r.videoHeight]:[r.width,r.height],l=c[0],f=c[1];if(i?s=r.getContext("2d").getImageData(0,0,l,f).data:n||e?s=r.data:(a||o)&&(Zn==null&&(Zn=document.createElement("canvas").getContext("2d")),Zn.canvas.width=l,Zn.canvas.height=f,Zn.drawImage(r,0,0,l,f),s=Zn.getImageData(0,0,l,f).data),t===4)u=new Int32Array(s);else{var h=l*f;u=new Int32Array(h*t);for(var d=0;d<h;d++)for(var p=0;p<t;++p)u[d*t+p]=s[4*d+p]}return ui(u,[f,l,t],"int32")}}),Pi=Object.freeze({toPixels:function(r,t){return re(this,void 0,void 0,function(){var e,n,o,a,i,s,u,c,l,f,h,d,p,m,v,g,b,x,y,w,_,S,E;return oe(this,function(k){switch(k.label){case 0:if(e=C(r,"img","toPixels"),r instanceof He||(e=e.toInt()),e.rank!==2&&e.rank!==3)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+e.rank+".");if(n=e.shape.slice(0,2),o=n[0],a=n[1],(i=e.rank===2?1:e.shape[2])>4||i===2)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+i);return[4,e.data()];case 1:return s=k.sent(),u=e.min(),c=e.max(),[4,Promise.all([u.data(),c.data()])];case 2:if(l=k.sent(),f=l[0],h=l[1],d=f[0],p=h[0],u.dispose(),c.dispose(),e.dtype==="float32"){if(d<0||p>1)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+d+" - "+p+"].")}else{if(e.dtype!=="int32")throw new Error("Unsupported type for toPixels: "+e.dtype+". Please use float32 or int32 tensors.");if(d<0||p>255)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+d+" - "+p+"].")}for(m=e.dtype==="float32"?255:1,v=new Uint8ClampedArray(a*o*4),g=0;g<o*a;++g)b=void 0,x=void 0,y=void 0,w=void 0,i===1?(b=s[g]*m,x=s[g]*m,y=s[g]*m,w=255):i===3?(b=s[3*g]*m,x=s[3*g+1]*m,y=s[3*g+2]*m,w=255):i===4&&(b=s[4*g]*m,x=s[4*g+1]*m,y=s[4*g+2]*m,w=s[4*g+3]*m),v[(_=4*g)+0]=Math.round(b),v[_+1]=Math.round(x),v[_+2]=Math.round(y),v[_+3]=Math.round(w);return t!=null&&(t.width=a,t.height=o,S=t.getContext("2d"),E=new ImageData(v,a,o),S.putImageData(E,0,0)),e!==r&&e.dispose(),[2,v]}})})},fromPixels:Eg}),kg=function(){function r(){}return r.prototype.getClassName=function(){return this.constructor.className},r.fromConfig=function(t,e){return new t(e)},r}(),Rg=function(){function r(){this.classNameMap={}}return r.getMap=function(){return r.instance==null&&(r.instance=new r),r.instance},r.register=function(t){r.getMap().classNameMap[t.className]=[t,t.fromConfig]},r}();function Kn(r){R(r.className!=null,function(){return"Class being registered does not have the static className property defined."}),R(typeof r.className=="string",function(){return"className is required to be a string, but got type "+typeof r.className}),R(r.className.length>0,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),Rg.register(r)}var Xn=function(r){function t(){return r!==null&&r.apply(this,arguments)||this}return Kt(t,r),t.prototype.minimize=function(e,n,o){n===void 0&&(n=!1);var a=this.computeGradients(e,o),i=a.value,s=a.grads;if(o!=null){var u=o.map(function(c){return{name:c.name,tensor:s[c.name]}});this.applyGradients(u)}else this.applyGradients(s);return Ct(s),n?i:(i.dispose(),null)},Object.defineProperty(t.prototype,"iterations",{get:function(){return this.iterations_==null&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),t.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},t.prototype.computeGradients=function(e,n){return Oh(e,n)},t.prototype.dispose=function(){this.iterations_!=null&&Ct(this.iterations_)},t.prototype.saveIterations=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){return this.iterations_==null&&(this.iterations_=0),[2,{name:"iter",tensor:Z(this.iterations_,"int32")}]})})},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){throw new Error("getWeights() is not implemented for this optimizer yet.")})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())})})},t.prototype.extractIterations=function(e){return re(this,void 0,void 0,function(){var n;return oe(this,function(o){switch(o.label){case 0:return n=this,[4,e[0].tensor.data()];case 1:return n.iterations_=o.sent()[0],[2,e.slice(1)]}})})},t}(kg);Object.defineProperty(Xn,Symbol.hasInstance,{value:function(r){return r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null}});var Ig=function(r){function t(e,n,o){o===void 0&&(o=null);var a=r.call(this)||this;return a.learningRate=e,a.rho=n,a.epsilon=o,a.accumulatedGrads=[],a.accumulatedUpdates=[],o==null&&(a.epsilon=N.backend.epsilon()),a}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map(function(o){return o.name}):Object.keys(e)).forEach(function(o,a){var i=N.registeredVariables[o];n.accumulatedGrads[a]==null&&(n.accumulatedGrads[a]={originalName:o+"/accum_grad",variable:te(function(){return Te(i).variable(!1)})}),n.accumulatedUpdates[a]==null&&(n.accumulatedUpdates[a]={originalName:o+"/accum_var",variable:te(function(){return Te(i).variable(!1)})});var s=Array.isArray(e)?e[a].tensor:e[o];if(s!=null){var u=n.accumulatedGrads[a].variable,c=n.accumulatedUpdates[a].variable;te(function(){var l=u.mul(n.rho).add(s.square().mul(1-n.rho)),f=c.add(n.epsilon).sqrt().div(u.add(n.epsilon).sqrt()).mul(s),h=c.mul(n.rho).add(f.square().mul(1-n.rho));u.assign(l),c.assign(h);var d=f.mul(-n.learningRate).add(i);i.assign(d)})}}),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedUpdates!=null&&(Ct(this.accumulatedGrads.map(function(e){return e.variable})),Ct(this.accumulatedUpdates.map(function(e){return e.variable})))},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){var e;return oe(this,function(n){switch(n.label){case 0:return e=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){var n;return oe(this,function(o){switch(o.label){case 0:return[4,this.extractIterations(e)];case 1:return e=o.sent(),n=e.length/2,this.accumulatedGrads=e.slice(0,n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.accumulatedUpdates=e.slice(n,2*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},t.fromConfig=function(e,n){return new e(n.learningRate,n.rho,n.epsilon)},t.className="Adadelta",t}(Xn);Kn(Ig);var Sg=function(r){function t(e,n){n===void 0&&(n=.1);var o=r.call(this)||this;return o.learningRate=e,o.initialAccumulatorValue=n,o.accumulatedGrads=[],o}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map(function(o){return o.name}):Object.keys(e)).forEach(function(o,a){var i=N.registeredVariables[o];n.accumulatedGrads[a]==null&&(n.accumulatedGrads[a]={originalName:o+"/accumulator",variable:te(function(){return rn(i.shape,n.initialAccumulatorValue).variable(!1)})});var s=Array.isArray(e)?e[a].tensor:e[o];if(s!=null){var u=n.accumulatedGrads[a].variable;te(function(){var c=u.add(s.square());u.assign(c);var l=s.div(c.add(N.backend.epsilon()).sqrt()).mul(-n.learningRate).add(i);i.assign(l)})}}),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedGrads!=null&&Ct(this.accumulatedGrads.map(function(e){return e.variable}))},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),this.accumulatedGrads=e.map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},t.fromConfig=function(e,n){return new e(n.learningRate,n.initialAccumulatorValue)},t.className="Adagrad",t}(Xn);Kn(Sg);var Ag=function(r){function t(e,n,o,a){a===void 0&&(a=null);var i=r.call(this)||this;return i.learningRate=e,i.beta1=n,i.beta2=o,i.epsilon=a,i.accumulatedFirstMoment=[],i.accumulatedSecondMoment=[],te(function(){i.accBeta1=Z(n).variable(),i.accBeta2=Z(o).variable()}),a==null&&(i.epsilon=N.backend.epsilon()),i}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this,o=Array.isArray(e)?e.map(function(a){return a.name}):Object.keys(e);te(function(){var a=tt(1,n.accBeta1),i=tt(1,n.accBeta2);o.forEach(function(s,u){var c=N.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:te(function(){return Te(c).variable(!1)})}),n.accumulatedSecondMoment[u]==null&&(n.accumulatedSecondMoment[u]={originalName:s+"/v",variable:te(function(){return Te(c).variable(!1)})});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var f=n.accumulatedFirstMoment[u].variable,h=n.accumulatedSecondMoment[u].variable,d=f.mul(n.beta1).add(l.mul(1-n.beta1)),p=h.mul(n.beta2).add(l.square().mul(1-n.beta2)),m=d.div(a),v=p.div(i);f.assign(d),h.assign(p);var g=m.div(v.sqrt().add(n.epsilon)).mul(-n.learningRate).add(c);c.assign(g)}}),n.accBeta1.assign(n.accBeta1.mul(n.beta1)),n.accBeta2.assign(n.accBeta2.mul(n.beta2))}),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Ct(this.accumulatedFirstMoment.map(function(e){return e.variable})),this.accumulatedSecondMoment!=null&&Ct(this.accumulatedSecondMoment.map(function(e){return e.variable}))},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){var e;return oe(this,function(n){switch(n.label){case 0:return e=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){var n,o=this;return oe(this,function(a){switch(a.label){case 0:return[4,this.extractIterations(e)];case 1:return e=a.sent(),te(function(){o.accBeta1.assign(Ao(o.beta1,o.iterations_+1)),o.accBeta2.assign(Ao(o.beta2,o.iterations_+1))}),n=e.length/2,this.accumulatedFirstMoment=e.slice(0,n).map(function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}}),this.accumulatedSecondMoment=e.slice(n,2*n).map(function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}}),[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},t.fromConfig=function(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon)},t.className="Adam",t}(Xn);Kn(Ag);var Dg=function(r){function t(e,n,o,a,i){a===void 0&&(a=null),i===void 0&&(i=0);var s=r.call(this)||this;return s.learningRate=e,s.beta1=n,s.beta2=o,s.epsilon=a,s.decay=i,s.accumulatedFirstMoment=[],s.accumulatedWeightedInfNorm=[],te(function(){s.iteration=Z(0).variable(),s.accBeta1=Z(n).variable()}),a==null&&(s.epsilon=N.backend.epsilon()),s}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this,o=Array.isArray(e)?e.map(function(a){return a.name}):Object.keys(e);te(function(){var a=tt(1,n.accBeta1),i=Ht(-n.learningRate,n.iteration.mul(n.decay).add(1));o.forEach(function(s,u){var c=N.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:Te(c).variable(!1)}),n.accumulatedWeightedInfNorm[u]==null&&(n.accumulatedWeightedInfNorm[u]={originalName:s+"/v",variable:Te(c).variable(!1)});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var f=n.accumulatedFirstMoment[u].variable,h=n.accumulatedWeightedInfNorm[u].variable,d=f.mul(n.beta1).add(l.mul(1-n.beta1)),p=h.mul(n.beta2),m=l.abs(),v=p.maximum(m);f.assign(d),h.assign(v);var g=i.div(a).mul(d.div(v.add(n.epsilon))).add(c);c.assign(g)}}),n.iteration.assign(n.iteration.add(1)),n.accBeta1.assign(n.accBeta1.mul(n.beta1))}),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Ct(this.accumulatedFirstMoment.map(function(e){return e.variable})),this.accumulatedWeightedInfNorm!=null&&Ct(this.accumulatedWeightedInfNorm.map(function(e){return e.variable}))},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){throw new Error("getWeights() is not implemented for Adamax yet.")})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){throw new Error("setWeights() is not implemented for Adamax yet.")})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},t.fromConfig=function(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)},t.className="Adamax",t}(Xn);Kn(Dg);var Kc=function(r){function t(e){var n=r.call(this)||this;return n.learningRate=e,n.setLearningRate(e),n}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map(function(o){return o.name}):Object.keys(e)).forEach(function(o,a){var i=Array.isArray(e)?e[a].tensor:e[o];if(i!=null){var s=N.registeredVariables[o];te(function(){var u=n.c.mul(i).add(s);s.assign(u)})}}),this.incrementIterations()},t.prototype.setLearningRate=function(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Yf(Z(-e))},t.prototype.dispose=function(){this.c.dispose()},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:if((e=n.sent()).length!==0)throw new Error("SGD optimizer does not have settable weights.");return[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate}},t.fromConfig=function(e,n){return new e(n.learningRate)},t.className="SGD",t}(Xn);Kn(Kc);var Tg=function(r){function t(e,n,o){o===void 0&&(o=!1);var a=r.call(this,e)||this;return a.learningRate=e,a.momentum=n,a.useNesterov=o,a.accumulations=[],a.m=Z(a.momentum),a}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map(function(o){return o.name}):Object.keys(e)).forEach(function(o,a){var i=N.registeredVariables[o];n.accumulations[a]==null&&(n.accumulations[a]={originalName:o+"/momentum",variable:te(function(){return Te(i).variable(!1)})});var s=n.accumulations[a].variable,u=Array.isArray(e)?e[a].tensor:e[o];u!=null&&te(function(){var c,l=n.m.mul(s).add(u);c=n.useNesterov?n.c.mul(u.add(l.mul(n.m))).add(i):n.c.mul(l).add(i),s.assign(l),i.assign(c)})}),this.incrementIterations()},t.prototype.dispose=function(){this.m.dispose(),this.accumulations!=null&&Ct(this.accumulations.map(function(e){return e.variable}))},t.prototype.setMomentum=function(e){this.momentum=e},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){return oe(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){return oe(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),this.accumulations=e.map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},t.fromConfig=function(e,n){return new e(n.learningRate,n.momentum,n.useNesterov)},t.className="Momentum",t}(Kc);Kn(Tg);var Ng=function(r){function t(e,n,o,a,i){n===void 0&&(n=.9),o===void 0&&(o=0),a===void 0&&(a=null),i===void 0&&(i=!1);var s=r.call(this)||this;if(s.learningRate=e,s.decay=n,s.momentum=o,s.epsilon=a,s.accumulatedMeanSquares=[],s.accumulatedMoments=[],s.accumulatedMeanGrads=[],s.centered=i,a==null&&(s.epsilon=N.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.");return s}return Kt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map(function(o){return o.name}):Object.keys(e)).forEach(function(o,a){var i=N.registeredVariables[o];n.accumulatedMeanSquares[a]==null&&(n.accumulatedMeanSquares[a]={originalName:o+"/rms",variable:te(function(){return Te(i).variable(!1)})}),n.accumulatedMoments[a]==null&&(n.accumulatedMoments[a]={originalName:o+"/momentum",variable:te(function(){return Te(i).variable(!1)})}),n.accumulatedMeanGrads[a]==null&&n.centered&&(n.accumulatedMeanGrads[a]={originalName:o+"/mg",variable:te(function(){return Te(i).variable(!1)})});var s=Array.isArray(e)?e[a].tensor:e[o];if(s!=null){var u=n.accumulatedMeanSquares[a].variable,c=n.accumulatedMoments[a].variable;te(function(){var l=u.mul(n.decay).add(s.square().mul(1-n.decay));if(n.centered){var f=n.accumulatedMeanGrads[a].variable,h=f.mul(n.decay).add(s.mul(1-n.decay)),d=c.mul(n.momentum).add(s.mul(n.learningRate).div(l.sub(h.square().add(n.epsilon)).sqrt()));u.assign(l),f.assign(h),c.assign(d);var p=i.sub(d);i.assign(p)}else{var m=u.mul(n.decay).add(s.square().mul(1-n.decay));d=c.mul(n.momentum).add(s.mul(n.learningRate).div(m.add(n.epsilon).sqrt())),u.assign(m),c.assign(d),p=i.sub(d),i.assign(p)}})}}),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedMeanSquares!=null&&Ct(this.accumulatedMeanSquares.map(function(e){return e.variable})),this.accumulatedMeanGrads!=null&&this.centered&&Ct(this.accumulatedMeanGrads.map(function(e){return e.variable})),this.accumulatedMoments!=null&&Ct(this.accumulatedMoments.map(function(e){return e.variable}))},t.prototype.getWeights=function(){return re(this,void 0,void 0,function(){var e;return oe(this,function(n){switch(n.label){case 0:return e=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&e.push.apply(e,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},t.prototype.setWeights=function(e){return re(this,void 0,void 0,function(){var n;return oe(this,function(o){switch(o.label){case 0:return[4,this.extractIterations(e)];case 1:return e=o.sent(),n=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.accumulatedMoments=e.slice(n,2*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=e.slice(2*n,3*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}})})},t.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},t.fromConfig=function(e,n){return new e(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)},t.className="RMSProp",t}(Xn);Kn(Ng);He.prototype.squaredDifference=function(r){return uc(this,r)},W=og;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var ei=function(r,t){return ei=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])},ei(r,t)};function be(r,t){ei(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}var dt=function(){return dt=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++){e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},dt.apply(this,arguments)};function se(r,t,e,n){function o(a){return a instanceof e?a:new e(function(i){i(a)})}return new(e||(e=Promise))(function(a,i){function s(l){try{c(n.next(l))}catch(f){i(f)}}function u(l){try{c(n.throw(l))}catch(f){i(f)}}function c(l){l.done?a(l.value):o(l.value).then(s,u)}c((n=n.apply(r,[])).next())})}function ue(r,t){var e={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(c){return function(l){return u([c,l])}}function u(c){if(n)throw new TypeError("Generator is already executing.");for(;e;)try{if(n=1,o&&(a=c[0]&2?o.return:c[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,c[1])).done)return a;switch(o=0,a&&(c=[c[0]&2,a.value]),c[0]){case 0:case 1:a=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++,o=c[1],c=[0];continue;case 7:c=e.ops.pop(),e.trys.pop();continue;default:if(a=e.trys,!(a=a.length>0&&a[a.length-1])&&(c[0]===6||c[0]===2)){e=0;continue}if(c[0]===3&&(!a||c[1]>a[0]&&c[1]<a[3])){e.label=c[1];break}if(c[0]===6&&e.label<a[1]){e.label=a[1],a=c;break}if(a&&e.label<a[2]){e.label=a[2],e.ops.push(c);break}a[2]&&e.ops.pop(),e.trys.pop();continue}c=t.call(r,e)}catch(l){c=[6,l],o=0}finally{n=a=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function Dr(){for(var r=0,t=0,e=arguments.length;t<e;t++)r+=arguments[t].length;for(var n=Array(r),o=0,t=0;t<e;t++)for(var a=arguments[t],i=0,s=a.length;i<s;i++,o++)n[o]=a[i];return n}var fr=function(){function r(t,e){if(!Un(t)||!Un(e))throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have "+JSON.stringify({width:t,height:e}));this._width=t,this._height=e}return Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),r.prototype.reverse=function(){return new r(1/this.width,1/this.height)},r}();function qo(r,t){return r instanceof He&&r.shape.length===t}function Fg(r){return qo(r,2)}function jo(r){return qo(r,3)}function In(r){return qo(r,4)}function Pg(r){return r%1!==0}function nu(r){return r%2===0}function Mg(r,t){t===void 0&&(t=2);var e=Math.pow(10,t);return Math.floor(r*e)/e}function ru(r){return r&&r.width&&r.height}function Og(r,t){var e=r.width,n=r.height,o=t/Math.max(n,e);return new fr(Math.round(e*o),Math.round(n*o))}function Mi(r){return r.reduce(function(t,e){return t.add(e)},new Me(0,0)).div(new Me(r.length,r.length))}function Or(r,t,e){return Array(r).fill(0).map(function(n,o){return t+o*e})}function Un(r){return!!r&&r!==1/0&&r!==-1/0&&!isNaN(r)||r===0}function ou(r){return Un(r)&&0<=r&&r<=1}var Me=function(){function r(t,e){this._x=t,this._y=e}return Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),r.prototype.add=function(t){return new r(this.x+t.x,this.y+t.y)},r.prototype.sub=function(t){return new r(this.x-t.x,this.y-t.y)},r.prototype.mul=function(t){return new r(this.x*t.x,this.y*t.y)},r.prototype.div=function(t){return new r(this.x/t.x,this.y/t.y)},r.prototype.abs=function(){return new r(Math.abs(this.x),Math.abs(this.y))},r.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},r.prototype.floor=function(){return new r(Math.floor(this.x),Math.floor(this.y))},r}(),An=function(){function r(t,e){e===void 0&&(e=!0);var n=t||{},o=[n.left,n.top,n.right,n.bottom].every(Un),a=[n.x,n.y,n.width,n.height].every(Un);if(!a&&!o)throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have "+JSON.stringify(n));var i=a?[n.x,n.y,n.width,n.height]:[n.left,n.top,n.right-n.left,n.bottom-n.top],s=i[0],u=i[1],c=i[2],l=i[3];r.assertIsValidBox({x:s,y:u,width:c,height:l},"Box.constructor",e),this._x=s,this._y=u,this._width=c,this._height=l}return r.isRect=function(t){return!!t&&[t.x,t.y,t.width,t.height].every(Un)},r.assertIsValidBox=function(t,e,n){if(n===void 0&&(n=!1),!r.isRect(t))throw new Error(e+" - invalid box: "+JSON.stringify(t)+", expected object with properties x, y, width, height");if(!n&&(t.width<0||t.height<0))throw new Error(e+" - width ("+t.width+") and height ("+t.height+") must be positive numbers")},Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"left",{get:function(){return this.x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"top",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topLeft",{get:function(){return new Me(this.left,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topRight",{get:function(){return new Me(this.right,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomLeft",{get:function(){return new Me(this.left,this.bottom)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomRight",{get:function(){return new Me(this.right,this.bottom)},enumerable:!0,configurable:!0}),r.prototype.round=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.round(i)}),e=t[0],n=t[1],o=t[2],a=t[3];return new r({x:e,y:n,width:o,height:a})},r.prototype.floor=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.floor(i)}),e=t[0],n=t[1],o=t[2],a=t[3];return new r({x:e,y:n,width:o,height:a})},r.prototype.toSquare=function(){var t=this,e=t.x,n=t.y,o=t.width,a=t.height,i=Math.abs(o-a);return o<a&&(e-=i/2,o+=i),a<o&&(n-=i/2,a+=i),new r({x:e,y:n,width:o,height:a})},r.prototype.rescale=function(t){var e=ru(t)?t.width:t,n=ru(t)?t.height:t;return new r({x:this.x*e,y:this.y*n,width:this.width*e,height:this.height*n})},r.prototype.pad=function(t,e){var n=[this.x-t/2,this.y-e/2,this.width+t,this.height+e],o=n[0],a=n[1],i=n[2],s=n[3];return new r({x:o,y:a,width:i,height:s})},r.prototype.clipAtImageBorders=function(t,e){var n=this,o=n.x,a=n.y,i=n.right,s=n.bottom,u=Math.max(o,0),c=Math.max(a,0),l=i-u,f=s-c,h=Math.min(l,t-u),d=Math.min(f,e-c);return new r({x:u,y:c,width:h,height:d}).floor()},r.prototype.shift=function(t,e){var n=this,o=n.width,a=n.height,i=this.x+t,s=this.y+e;return new r({x:i,y:s,width:o,height:a})},r.prototype.padAtBorders=function(t,e){var n=this.width+1,o=this.height+1,a=1,i=1,s=n,u=o,c=this.left,l=this.top,f=this.right,h=this.bottom;return f>e&&(s=-f+e+n,f=e),h>t&&(u=-h+t+o,h=t),c<1&&(u=2-c,c=1),l<1&&(u=2-l,l=1),{dy:i,edy:u,dx:a,edx:s,y:l,ey:h,x:c,ex:f,w:n,h:o}},r.prototype.calibrate=function(t){return new r({left:this.left+t.left*this.width,top:this.top+t.top*this.height,right:this.right+t.right*this.width,bottom:this.bottom+t.bottom*this.height}).toSquare().round()},r}(),Ko=function(r){be(t,r);function t(e,n,o,a,i){return i===void 0&&(i=!1),r.call(this,{left:e,top:n,right:o,bottom:a},i)||this}return t}(An),Xc=function(){function r(t,e,n,o,a){this._imageDims=new fr(a.width,a.height),this._score=t,this._classScore=e,this._className=n,this._box=new An(o).rescale(this._imageDims)}return Object.defineProperty(r.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"className",{get:function(){return this._className},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"box",{get:function(){return this._box},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageDims",{get:function(){return this._imageDims},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this.imageDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this.imageDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativeBox",{get:function(){return new An(this._box).rescale(this.imageDims.reverse())},enumerable:!0,configurable:!0}),r.prototype.forSize=function(t,e){return new r(this.score,this.classScore,this.className,this.relativeBox,{width:t,height:e})},r}(),cn=function(r){be(t,r);function t(e,n,o){return r.call(this,e,e,"",n,o)||this}return t.prototype.forSize=function(e,n){var o=r.prototype.forSize.call(this,e,n),a=o.score,i=o.relativeBox,s=o.imageDims;return new t(a,i,s)},t}(Xc);function Bg(r,t,e){e===void 0&&(e=!0);var n=Math.max(0,Math.min(r.right,t.right)-Math.max(r.left,t.left)),o=Math.max(0,Math.min(r.bottom,t.bottom)-Math.max(r.top,t.top)),a=n*o;return e?a/(r.area+t.area-a):a/Math.min(r.area,t.area)}function Lg(r){var t=r.map(function(s){return s.x}),e=r.map(function(s){return s.y}),n=t.reduce(function(s,u){return u<s?u:s},1/0),o=e.reduce(function(s,u){return u<s?u:s},1/0),a=t.reduce(function(s,u){return s<u?u:s},0),i=e.reduce(function(s,u){return s<u?u:s},0);return new Ko(n,o,a,i)}function Br(r,t,e,n){n===void 0&&(n=!0);for(var o=t.map(function(s,u){return{score:s,boxIndex:u}}).sort(function(s,u){return s.score-u.score}).map(function(s){return s.boxIndex}),a=[],i=function(){var s=o.pop();a.push(s);for(var u=o,c=[],l=0;l<u.length;l++){var f=u[l],h=r[s],d=r[f];c.push(Bg(h,d,n))}o=o.filter(function(p,m){return c[m]<=e})};o.length>0;)i();return a}function Kr(r,t){return te(function(){var e=t[0],n=t[1],o=t[2],a=rn(Dr(r.shape.slice(0,3),[1]),e),i=rn(Dr(r.shape.slice(0,3),[1]),n),s=rn(Dr(r.shape.slice(0,3),[1]),o),u=Qe([a,i,s],3);return tt(r,u)})}function Wg(r,t){return t===void 0&&(t=!1),te(function(){var e=r.shape.slice(1),n=e[0],o=e[1];if(n===o)return r;var a=Math.abs(n-o),i=Math.round(a*(t?.5:1)),s=n>o?2:1,u=function(d){var p=r.shape.slice();return p[s]=d,rn(p,0)},c=u(i),l=a-c.shape[s],f=t&&l?u(l):null,h=[f,r,c].filter(function(d){return!!d}).map(function(d){return d.toFloat()});return Qe(h,s)})}function Ia(r){return 1/(1+Math.exp(-r))}var Oi=function(r){be(t,r);function t(e,n,o,a,i){return i===void 0&&(i=!1),r.call(this,{x:e,y:n,width:o,height:a},i)||this}return t}(An),Vg=.5,Ug=.43,zg=.45,No=function(){function r(t,e,n){n===void 0&&(n=new Me(0,0));var o=e.width,a=e.height;this._imgDims=new fr(o,a),this._shift=n,this._positions=t.map(function(i){return i.mul(new Me(o,a)).add(n)})}return Object.defineProperty(r.prototype,"shift",{get:function(){return new Me(this._shift.x,this._shift.y)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this._imgDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this._imgDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativePositions",{get:function(){var t=this;return this._positions.map(function(e){return e.sub(t._shift).div(new Me(t.imageWidth,t.imageHeight))})},enumerable:!0,configurable:!0}),r.prototype.forSize=function(t,e){return new this.constructor(this.relativePositions,{width:t,height:e})},r.prototype.shiftBy=function(t,e){return new this.constructor(this.relativePositions,this._imgDims,new Me(t,e))},r.prototype.shiftByPoint=function(t){return this.shiftBy(t.x,t.y)},r.prototype.align=function(t,e){if(e===void 0&&(e={}),t){var n=t instanceof cn?t.box.floor():new An(t);return this.shiftBy(n.x,n.y).align(null,e)}var o=Object.assign({},{useDlibAlignment:!1,minBoxPadding:.2},e),a=o.useDlibAlignment,i=o.minBoxPadding;return a?this.alignDlib():this.alignMinBbox(i)},r.prototype.alignDlib=function(){var t=this.getRefPointsForAlignment(),e=t[0],n=t[1],o=t[2],a=function(f){return o.sub(f).magnitude()},i=(a(e)+a(n))/2,s=Math.floor(i/zg),u=Mi(t),c=Math.floor(Math.max(0,u.x-Vg*s)),l=Math.floor(Math.max(0,u.y-Ug*s));return new Oi(c,l,Math.min(s,this.imageWidth+c),Math.min(s,this.imageHeight+l))},r.prototype.alignMinBbox=function(t){var e=Lg(this.positions);return e.pad(e.width*t,e.height*t)},r.prototype.getRefPointsForAlignment=function(){throw new Error("getRefPointsForAlignment not implemented by base class")},r}(),Gg=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.getRefPointsForAlignment=function(){var e=this.positions;return[e[0],e[1],Mi([e[3],e[4]])]},t}(No),Hg=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.getJawOutline=function(){return this.positions.slice(0,17)},t.prototype.getLeftEyeBrow=function(){return this.positions.slice(17,22)},t.prototype.getRightEyeBrow=function(){return this.positions.slice(22,27)},t.prototype.getNose=function(){return this.positions.slice(27,36)},t.prototype.getLeftEye=function(){return this.positions.slice(36,42)},t.prototype.getRightEye=function(){return this.positions.slice(42,48)},t.prototype.getMouth=function(){return this.positions.slice(48,68)},t.prototype.getRefPointsForAlignment=function(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(Mi)},t}(No),au=function(){function r(t,e){this._label=t,this._distance=e}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distance",{get:function(){return this._distance},enumerable:!0,configurable:!0}),r.prototype.toString=function(t){return t===void 0&&(t=!0),""+this.label+(t?" ("+Mg(this.distance)+")":"")},r}(),iu=function(r){be(t,r);function t(e,n){var o=r.call(this,e)||this;return o._label=n,o}return t.assertIsValidLabeledBox=function(e,n){if(An.assertIsValidBox(e,n),!Un(e.label))throw new Error(n+" - expected property label ("+e.label+") to be a number")},Object.defineProperty(t.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),t}(An),oo=function(){function r(t,e){if(typeof t!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(e)||e.some(function(n){return!(n instanceof Float32Array)}))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=t,this._descriptors=e}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"descriptors",{get:function(){return this._descriptors},enumerable:!0,configurable:!0}),r.prototype.toJSON=function(){return{label:this.label,descriptors:this.descriptors.map(function(t){return Array.from(t)})}},r.fromJSON=function(t){var e=t.descriptors.map(function(n){return new Float32Array(n)});return new r(t.label,e)},r}();(function(r){be(t,r);function t(e,n,o,a){var i=r.call(this,e,n)||this;return i._score=o,i._classScore=a,i}return t.assertIsValidPredictedBox=function(e,n){if(iu.assertIsValidLabeledBox(e,n),!ou(e.score)||!ou(e.classScore))throw new Error(n+" - expected properties score ("+e.score+") and ("+e.classScore+") to be a number between [0, 1]")},Object.defineProperty(t.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),t})(iu);function qg(r){return r.detection instanceof cn}function Bi(r,t){var e={detection:t};return Object.assign({},r,e)}function $c(){var r=window.fetch||function(){throw new Error("fetch - missing fetch implementation for browser environment")},t=function(){throw new Error("readFile - filesystem not available for browser environment")};return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:function(){return document.createElement("canvas")},createImageElement:function(){return document.createElement("img")},fetch:r,readFile:t}}function Yc(r){var t="";if(!r)try{r=require("fs")}catch(n){t=n.toString()}var e=r?function(n){return new Promise(function(o,a){r.readFile(n,function(i,s){return i?a(i):o(s)})})}:function(){throw new Error("readFile - failed to require fs in nodejs environment with error: "+t)};return{readFile:e}}function Jc(){var r=global.Canvas||global.HTMLCanvasElement,t=global.Image||global.HTMLImageElement,e=function(){if(r)return new r;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},n=function(){if(t)return new t;throw new Error("createImageElement - missing Image implementation for nodejs environment")},o=global.fetch||function(){throw new Error("fetch - missing fetch implementation for nodejs environment")},a=Yc();return dt({Canvas:r||function(){function i(){}return i}(),CanvasRenderingContext2D:global.CanvasRenderingContext2D||function(){function i(){}return i}(),Image:t||function(){function i(){}return i}(),ImageData:global.ImageData||function(){function i(){}return i}(),Video:global.HTMLVideoElement||function(){function i(){}return i}(),createCanvasElement:e,createImageElement:n,fetch:o},a)}function Qc(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}function Zc(){return typeof global=="object"&&typeof require=="function"&&typeof module<"u"&&typeof process<"u"&&!!process.version}var Je;function jg(){if(!Je)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return Je}function ti(r){Je=r}function Li(){Qc()&&ti($c()),Zc()&&ti(Jc())}function Kg(r){if(Je||Li(),!Je)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");var t=r.Canvas,e=t===void 0?Je.Canvas:t,n=r.Image,o=n===void 0?Je.Image:n;Je.Canvas=e,Je.Image=o,Je.createCanvasElement=r.createCanvasElement||function(){return new e},Je.createImageElement=r.createImageElement||function(){return new o},Je.ImageData=r.ImageData||Je.ImageData,Je.Video=r.Video||Je.Video,Je.fetch=r.fetch||Je.fetch,Je.readFile=r.readFile||Je.readFile}var gt={getEnv:jg,setEnv:ti,initialize:Li,createBrowserEnv:$c,createFileSystem:Yc,createNodejsEnv:Jc,monkeyPatch:Kg,isBrowser:Qc,isNodejs:Zc};Li();function el(r){return!gt.isNodejs()&&typeof r=="string"?document.getElementById(r):r}function Gn(r){var t=gt.getEnv(),e=t.Canvas,n=t.CanvasRenderingContext2D;if(r instanceof n)return r;var o=el(r);if(!(o instanceof e))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");var a=o.getContext("2d");if(!a)throw new Error("resolveContext2d - canvas 2d context is null");return a}var su;(function(r){r.TOP_LEFT="TOP_LEFT",r.TOP_RIGHT="TOP_RIGHT",r.BOTTOM_LEFT="BOTTOM_LEFT",r.BOTTOM_RIGHT="BOTTOM_RIGHT"})(su||(su={}));function tl(r){var t=gt.getEnv(),e=t.Image,n=t.Video;return r instanceof e&&r.complete||r instanceof n&&r.readyState>=3}function Xg(r){return new Promise(function(t,e){if(r instanceof gt.getEnv().Canvas||tl(r))return t();function n(a){a.currentTarget&&(a.currentTarget.removeEventListener("load",n),a.currentTarget.removeEventListener("error",o),t(a))}function o(a){a.currentTarget&&(a.currentTarget.removeEventListener("load",n),a.currentTarget.removeEventListener("error",o),e(a))}r.addEventListener("load",n),r.addEventListener("error",o)})}function nl(r){var t=gt.getEnv(),e=t.Image,n=t.Video;return r instanceof e?new fr(r.naturalWidth,r.naturalHeight):r instanceof n?new fr(r.videoWidth,r.videoHeight):new fr(r.width,r.height)}function Xo(r){var t=r.width,e=r.height,n=gt.getEnv().createCanvasElement,o=n();return o.width=t,o.height=e,o}function Wi(r,t){var e=gt.getEnv().ImageData;if(!(r instanceof e)&&!tl(r))throw new Error("createCanvasFromMedia - media has not finished loading yet");var n=nl(r),o=n.width,a=n.height,i=Xo({width:o,height:a});return r instanceof e?Gn(i).putImageData(r,0,0):Gn(i).drawImage(r,0,0,o,a),i}function $g(r,t){return se(this,void 0,void 0,function(){var e,n,o,a,i,s;return ue(this,function(u){switch(u.label){case 0:return e=gt.getEnv().createCanvasElement(),n=r.shape.slice(In(r)?1:0),o=n[0],a=n[1],i=n[2],s=te(function(){return r.as3D(o,a,i).toInt()}),[4,Pi.toPixels(s,e)];case 1:return u.sent(),s.dispose(),[2,e]}})})}function uu(r){var t=gt.getEnv(),e=t.Image,n=t.Canvas,o=t.Video;return r instanceof e||r instanceof n||r instanceof o}function Yg(r,t,e){e===void 0&&(e=!1);var n=gt.getEnv(),o=n.Image,a=n.Canvas;if(!(r instanceof o||r instanceof a))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");var i=nl(r),s=t/Math.max(i.height,i.width),u=s*i.width,c=s*i.height,l=Xo({width:t,height:t}),f=r instanceof a?r:Wi(r),h=Math.abs(u-c)/2,d=e&&u<c?h:0,p=e&&c<u?h:0;return Gn(l).drawImage(f,d,p,u,c),l}var Fo=function(){function r(t,e){var n=this;if(e===void 0&&(e=!1),this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],!Array.isArray(t))throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have "+t);this._treatAsBatchInput=e,this._batchSize=t.length,t.forEach(function(o,a){if(jo(o)){n._imageTensors[a]=o,n._inputDimensions[a]=o.shape;return}if(In(o)){var i=o.shape[0];if(i!==1)throw new Error("NetInput - tf.Tensor4D with batchSize "+i+" passed, but not supported in input array");n._imageTensors[a]=o,n._inputDimensions[a]=o.shape.slice(1);return}var s=o instanceof gt.getEnv().Canvas?o:Wi(o);n._canvases[a]=s,n._inputDimensions[a]=[s.height,s.width,3]})}return Object.defineProperty(r.prototype,"imageTensors",{get:function(){return this._imageTensors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canvases",{get:function(){return this._canvases},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isBatchInput",{get:function(){return this.batchSize>1||this._treatAsBatchInput},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"batchSize",{get:function(){return this._batchSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputDimensions",{get:function(){return this._inputDimensions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"reshapedInputDimensions",{get:function(){var t=this;return Or(this.batchSize,0,1).map(function(e,n){return t.getReshapedInputDimensions(n)})},enumerable:!0,configurable:!0}),r.prototype.getInput=function(t){return this.canvases[t]||this.imageTensors[t]},r.prototype.getInputDimensions=function(t){return this._inputDimensions[t]},r.prototype.getInputHeight=function(t){return this._inputDimensions[t][0]},r.prototype.getInputWidth=function(t){return this._inputDimensions[t][1]},r.prototype.getReshapedInputDimensions=function(t){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");var e=this.getInputWidth(t),n=this.getInputHeight(t);return Og({width:e,height:n},this.inputSize)},r.prototype.toBatchTensor=function(t,e){var n=this;return e===void 0&&(e=!0),this._inputSize=t,te(function(){var o=Or(n.batchSize,0,1).map(function(i){var s=n.getInput(i);if(s instanceof He){var u=In(s)?s:s.expandDims();return u=Wg(u,e),(u.shape[1]!==t||u.shape[2]!==t)&&(u=Si.resizeBilinear(u,[t,t])),u.as3D(t,t,3)}if(s instanceof gt.getEnv().Canvas)return Pi.fromPixels(Yg(s,t,e));throw new Error("toBatchTensor - at batchIdx "+i+", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have "+s)}),a=Mt(o.map(function(i){return i.toFloat()})).as4D(n.batchSize,t,t,3);return a})},r}();function st(r){return se(this,void 0,void 0,function(){var t,e,n;return ue(this,function(o){switch(o.label){case 0:if(r instanceof Fo)return[2,r];if(t=Array.isArray(r)?r:[r],!t.length)throw new Error("toNetInput - empty array passed as input");return e=function(a){return Array.isArray(r)?" at input index "+a+":":""},n=t.map(el),n.forEach(function(a,i){if(!uu(a)&&!jo(a)&&!In(a))throw typeof t[i]=="string"?new Error("toNetInput -"+e(i)+" string passed, but could not resolve HTMLElement for element id "+t[i]):new Error("toNetInput -"+e(i)+" expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");if(In(a)){var s=a.shape[0];if(s!==1)throw new Error("toNetInput -"+e(i)+" tf.Tensor4D with batchSize "+s+" passed, but not supported in input array")}}),[4,Promise.all(n.map(function(a){return uu(a)&&Xg(a)}))];case 1:return o.sent(),[2,new Fo(n,Array.isArray(r))]}})})}function Vi(r,t){return se(this,void 0,void 0,function(){var e,n,o,a,i,s,u;return ue(this,function(c){switch(c.label){case 0:return e=gt.getEnv().Canvas,n=r,r instanceof e?[3,5]:[4,st(r)];case 1:if(o=c.sent(),o.batchSize>1)throw new Error("extractFaces - batchSize > 1 not supported");return a=o.getInput(0),a instanceof e?(i=a,[3,4]):[3,2];case 2:return[4,$g(a)];case 3:i=c.sent(),c.label=4;case 4:n=i,c.label=5;case 5:return s=Gn(n),u=t.map(function(l){return l instanceof cn?l.forSize(n.width,n.height).box.floor():l}).map(function(l){return l.clipAtImageBorders(n.width,n.height)}),[2,u.map(function(l){var f=l.x,h=l.y,d=l.width,p=l.height,m=Xo({width:d,height:p});return Gn(m).putImageData(s.getImageData(f,h,d,p),0,0),m})]}})})}function Ui(r,t){return se(this,void 0,void 0,function(){return ue(this,function(e){if(!jo(r)&&!In(r))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(In(r)&&r.shape[0]>1)throw new Error("extractFaceTensors - batchSize > 1 not supported");return[2,te(function(){var n=r.shape.slice(In(r)?1:0),o=n[0],a=n[1],i=n[2],s=t.map(function(c){return c instanceof cn?c.forSize(a,o).box:c}).map(function(c){return c.clipAtImageBorders(a,o)}),u=s.map(function(c){var l=c.x,f=c.y,h=c.width,d=c.height;return Ac(r.as3D(o,a,i),[f,l,0],[d,h,i])});return u})]})})}function Jg(r,t){return se(this,void 0,void 0,function(){var e,n;return ue(this,function(o){switch(o.label){case 0:return e=gt.getEnv().fetch,[4,e(r,t)];case 1:if(n=o.sent(),!(n.status<400))throw new Error("failed to fetch: ("+n.status+") "+n.statusText+", from url: "+n.url);return[2,n]}})})}function Qg(r){return se(this,void 0,void 0,function(){return ue(this,function(t){switch(t.label){case 0:return[4,Jg(r)];case 1:return[2,t.sent().json()]}})})}function rl(r,t){var e=t+"-weights_manifest.json";if(!r)return{modelBaseUri:"",manifestUri:e};if(r==="/")return{modelBaseUri:"/",manifestUri:"/"+e};var n=r.startsWith("http://")?"http://":r.startsWith("https://")?"https://":"";r=r.replace(n,"");var o=r.split("/").filter(function(s){return s}),a=r.endsWith(".json")?o[o.length-1]:e,i=n+(r.endsWith(".json")?o.slice(0,o.length-1):o).join("/");return i=r.startsWith("/")?"/"+i:i,{modelBaseUri:i,manifestUri:i==="/"?"/"+a:i+"/"+a}}function Zg(r,t){return se(this,void 0,void 0,function(){var e,n,o,a;return ue(this,function(i){switch(i.label){case 0:return e=rl(r,t),n=e.manifestUri,o=e.modelBaseUri,[4,Qg(n)];case 1:return a=i.sent(),[2,jc.loadWeights(a,o)]}})})}var mn=function(){function r(t){this._name=t,this._params=void 0,this._paramMappings=[]}return Object.defineProperty(r.prototype,"params",{get:function(){return this._params},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"paramMappings",{get:function(){return this._paramMappings},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isLoaded",{get:function(){return!!this.params},enumerable:!0,configurable:!0}),r.prototype.getParamFromPath=function(t){var e=this.traversePropertyPath(t),n=e.obj,o=e.objProp;return n[o]},r.prototype.reassignParamFromPath=function(t,e){var n=this.traversePropertyPath(t),o=n.obj,a=n.objProp;o[a].dispose(),o[a]=e},r.prototype.getParamList=function(){var t=this;return this._paramMappings.map(function(e){var n=e.paramPath;return{path:n,tensor:t.getParamFromPath(n)}})},r.prototype.getTrainableParams=function(){return this.getParamList().filter(function(t){return t.tensor instanceof vr})},r.prototype.getFrozenParams=function(){return this.getParamList().filter(function(t){return!(t.tensor instanceof vr)})},r.prototype.variable=function(){var t=this;this.getFrozenParams().forEach(function(e){var n=e.path,o=e.tensor;t.reassignParamFromPath(n,o.variable())})},r.prototype.freeze=function(){var t=this;this.getTrainableParams().forEach(function(e){var n=e.path,o=e.tensor,a=lt(o.dataSync());o.dispose(),t.reassignParamFromPath(n,a)})},r.prototype.dispose=function(t){t===void 0&&(t=!0),this.getParamList().forEach(function(e){if(t&&e.tensor.isDisposed)throw new Error("param tensor has already been disposed for path "+e.path);e.tensor.dispose()}),this._params=void 0},r.prototype.serializeParams=function(){return new Float32Array(this.getParamList().map(function(t){var e=t.tensor;return Array.from(e.dataSync())}).reduce(function(t,e){return t.concat(e)}))},r.prototype.load=function(t){return se(this,void 0,void 0,function(){return ue(this,function(e){switch(e.label){case 0:return t instanceof Float32Array?(this.extractWeights(t),[2]):[4,this.loadFromUri(t)];case 1:return e.sent(),[2]}})})},r.prototype.loadFromUri=function(t){return se(this,void 0,void 0,function(){var e;return ue(this,function(n){switch(n.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromUri - expected model uri");return[4,Zg(t,this.getDefaultModelName())];case 1:return e=n.sent(),this.loadFromWeightMap(e),[2]}})})},r.prototype.loadFromDisk=function(t){return se(this,void 0,void 0,function(){var e,n,o,a,i,s,u,c,l,f;return ue(this,function(h){switch(h.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromDisk - expected model file path");return e=gt.getEnv().readFile,n=rl(t,this.getDefaultModelName()),o=n.manifestUri,a=n.modelBaseUri,i=function(d){return Promise.all(d.map(function(p){return e(p).then(function(m){return m.buffer})}))},s=jc.weightsLoaderFactory(i),l=(c=JSON).parse,[4,e(o)];case 1:return u=l.apply(c,[h.sent().toString()]),[4,s(u,a)];case 2:return f=h.sent(),this.loadFromWeightMap(f),[2]}})})},r.prototype.loadFromWeightMap=function(t){var e=this.extractParamsFromWeigthMap(t),n=e.paramMappings,o=e.params;this._paramMappings=n,this._params=o},r.prototype.extractWeights=function(t){var e=this.extractParams(t),n=e.paramMappings,o=e.params;this._paramMappings=n,this._params=o},r.prototype.traversePropertyPath=function(t){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");var e=t.split("/").reduce(function(a,i){if(!a.nextObj.hasOwnProperty(i))throw new Error("traversePropertyPath - object does not have property "+i+", for path "+t);return{obj:a.nextObj,objProp:i,nextObj:a.nextObj[i]}},{nextObj:this.params}),n=e.obj,o=e.objProp;if(!n||!o||!(n[o]instanceof He))throw new Error("traversePropertyPath - parameter is not a tensor, for path "+t);return{obj:n,objProp:o}},r}();function Pt(r,t,e){return te(function(){var n=Ci(r,t.depthwise_filter,t.pointwise_filter,e,"same");return n=Se(n,t.bias),n})}function Sa(r,t,e){return e===void 0&&(e=!1),te(function(){var n=qe(e?Se(Ut(r,t.conv0.filters,[2,2],"same"),t.conv0.bias):Pt(r,t.conv0,[2,2])),o=Pt(n,t.conv1,[1,1]),a=qe(Se(n,o)),i=Pt(a,t.conv2,[1,1]);return qe(Se(n,Se(o,i)))})}function ao(r,t,e,n){return e===void 0&&(e=!1),n===void 0&&(n=!0),te(function(){var o=qe(e?Se(Ut(r,t.conv0.filters,n?[2,2]:[1,1],"same"),t.conv0.bias):Pt(r,t.conv0,n?[2,2]:[1,1])),a=Pt(o,t.conv1,[1,1]),i=qe(Se(o,a)),s=Pt(i,t.conv2,[1,1]),u=qe(Se(o,Se(a,s))),c=Pt(u,t.conv3,[1,1]);return qe(Se(o,Se(a,Se(s,c))))})}function jt(r,t,e,n){return e===void 0&&(e="same"),n===void 0&&(n=!1),te(function(){var o=Se(Ut(r,t.filters,[1,1],e),t.bias);return n?qe(o):o})}function gn(r,t){Object.keys(r).forEach(function(e){t.some(function(n){return n.originalPath===e})||r[e].dispose()})}function $o(r,t){return function(e,n,o,a){var i=wt(r(e*n*o*o),[o,o,e,n]),s=Ye(r(n));return t.push({paramPath:a+"/filters"},{paramPath:a+"/bias"}),{filters:i,bias:s}}}function zi(r,t){return function(e,n,o){var a=kn(r(e*n),[e,n]),i=Ye(r(n));return t.push({paramPath:o+"/weights"},{paramPath:o+"/bias"}),{weights:a,bias:i}}}var ol=function(){function r(t,e,n){this.depthwise_filter=t,this.pointwise_filter=e,this.bias=n}return r}();function Gi(r,t){return function(e,n,o){var a=wt(r(9*e),[3,3,e,1]),i=wt(r(e*n),[1,1,e,n]),s=Ye(r(n));return t.push({paramPath:o+"/depthwise_filter"},{paramPath:o+"/pointwise_filter"},{paramPath:o+"/bias"}),new ol(a,i,s)}}function Hi(r){return function(t){var e=r(t+"/depthwise_filter",4),n=r(t+"/pointwise_filter",4),o=r(t+"/bias",1);return new ol(e,n,o)}}function Nn(r,t){return function(e,n,o){var a=r[e];if(!qo(a,n))throw new Error("expected weightMap["+e+"] to be a Tensor"+n+"D, instead have "+a);return t.push({originalPath:e,paramPath:o||e}),a}}function yn(r){var t=r;function e(o){var a=t.slice(0,o);return t=t.slice(o),a}function n(){return t}return{extractWeights:e,getRemainingWeights:n}}function al(r,t){var e=$o(r,t),n=Gi(r,t);function o(i,s,u,c){c===void 0&&(c=!1);var l=c?e(i,s,3,u+"/conv0"):n(i,s,u+"/conv0"),f=n(s,s,u+"/conv1"),h=n(s,s,u+"/conv2");return{conv0:l,conv1:f,conv2:h}}function a(i,s,u,c){c===void 0&&(c=!1);var l=o(i,s,u,c),f=l.conv0,h=l.conv1,d=l.conv2,p=n(s,s,u+"/conv3");return{conv0:f,conv1:h,conv2:d,conv3:p}}return{extractDenseBlock3Params:o,extractDenseBlock4Params:a}}function ey(r){var t=[],e=yn(r),n=e.extractWeights,o=e.getRemainingWeights,a=al(n,t).extractDenseBlock4Params,i=a(3,32,"dense0",!0),s=a(32,64,"dense1"),u=a(64,128,"dense2"),c=a(128,256,"dense3");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u,dense3:c}}}function il(r){return function(t){var e=r(t+"/filters",4),n=r(t+"/bias",1);return{filters:e,bias:n}}}function sl(r,t){var e=Nn(r,t),n=il(e),o=Hi(e);function a(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):o(s+"/conv0"),l=o(s+"/conv1"),f=o(s+"/conv2");return{conv0:c,conv1:l,conv2:f}}function i(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):o(s+"/conv0"),l=o(s+"/conv1"),f=o(s+"/conv2"),h=o(s+"/conv3");return{conv0:c,conv1:l,conv2:f,conv3:h}}return{extractDenseBlock3Params:a,extractDenseBlock4Params:i}}function ty(r){var t=[],e=sl(r,t).extractDenseBlock4Params,n={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2"),dense3:e("dense3")};return gn(r,t),{params:n,paramMappings:t}}var ul=function(r){be(t,r);function t(){return r.call(this,"FaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("FaceFeatureExtractor - load model before inference");return te(function(){var o=e.toBatchTensor(112,!0),a=[122.782,117.001,104.298],i=Kr(o,a).div(Z(255)),s=ao(i,n.dense0,!0);return s=ao(s,n.dense1),s=ao(s,n.dense2),s=ao(s,n.dense3),s=qr(s,[7,7],[2,2],"valid"),s})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_model"},t.prototype.extractParamsFromWeigthMap=function(e){return ty(e)},t.prototype.extractParams=function(e){return ey(e)},t}(mn);function en(r,t){return te(function(){return Se(zo(r,t.weights),t.bias)})}function ny(r,t,e){var n=[],o=yn(r),a=o.extractWeights,i=o.getRemainingWeights,s=zi(a,n),u=s(t,e,"fc");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{fc:u}}}function ry(r){var t=[],e=Nn(r,t);function n(a){var i=e(a+"/weights",2),s=e(a+"/bias",1);return{weights:i,bias:s}}var o={fc:n("fc")};return gn(r,t),{params:o,paramMappings:t}}function cl(r){var t={},e={};return Object.keys(r).forEach(function(n){var o=n.startsWith("fc")?e:t;o[n]=r[n]}),{featureExtractorMap:t,classifierMap:e}}var ll=function(r){be(t,r);function t(e,n){var o=r.call(this,e)||this;return o._faceFeatureExtractor=n,o}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var n=this,o=this.params;if(!o)throw new Error(this._name+" - load model before inference");return te(function(){var a=e instanceof Fo?n.faceFeatureExtractor.forwardInput(e):e;return en(a.as2D(a.shape[0],-1),o.fc)})},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),r.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var n=this.extractClassifierParams(e),o=n.params,a=n.paramMappings;this._params=o,this._paramMappings=a},t.prototype.extractClassifierParams=function(e){return ny(e,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())},t.prototype.extractParamsFromWeigthMap=function(e){var n=cl(e),o=n.featureExtractorMap,a=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(o),ry(a)},t.prototype.extractParams=function(e){var n=this.getClassifierChannelsIn(),o=this.getClassifierChannelsOut(),a=o*n+o,i=e.slice(0,e.length-a),s=e.slice(e.length-a);return this.faceFeatureExtractor.extractWeights(i),this.extractClassifierParams(s)},t}(mn),cu=["neutral","happy","sad","angry","fearful","disgusted","surprised"],oy=function(){function r(t){var e=this;if(t.length!==7)throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: "+t.length);cu.forEach(function(n,o){e[n]=t[o]})}return r.prototype.asSortedArray=function(){var t=this;return cu.map(function(e){return{expression:e,probability:t[e]}}).sort(function(e,n){return n.probability-e.probability})},r}(),ay=function(r){be(t,r);function t(e){return e===void 0&&(e=new ul),r.call(this,"FaceExpressionNet",e)||this}return t.prototype.forwardInput=function(e){var n=this;return te(function(){return pn(n.runNet(e))})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.predictExpressions=function(e){return se(this,void 0,void 0,function(){var n,o,a,i,s=this;return ue(this,function(u){switch(u.label){case 0:return[4,st(e)];case 1:return n=u.sent(),[4,this.forwardInput(n)];case 2:return o=u.sent(),[4,Promise.all(Ze(o).map(function(c){return se(s,void 0,void 0,function(){var l;return ue(this,function(f){switch(f.label){case 0:return[4,c.data()];case 1:return l=f.sent(),c.dispose(),[2,l]}})})}))];case 3:return a=u.sent(),o.dispose(),i=a.map(function(c){return new oy(c)}),[2,n.isBatchInput?i:i[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_expression_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t.prototype.getClassifierChannelsOut=function(){return 7},t}(ll);function fl(r,t){var e={expressions:t};return Object.assign({},r,e)}function iy(r){return qg(r)&&r.landmarks instanceof No&&r.unshiftedLandmarks instanceof No&&r.alignedRect instanceof cn}function qi(r,t){var e=r.detection.box,n=t.shiftBy(e.x,e.y),o=n.align(),a=r.detection.imageDims,i=new cn(r.detection.score,o.rescale(a.reverse()),a),s={landmarks:n,unshiftedLandmarks:t,alignedRect:i};return Object.assign({},r,s)}function sy(r,t){var e=$o(r,t),n=Gi(r,t);function o(i,s,u){var c=n(i,s,u+"/separable_conv0"),l=n(s,s,u+"/separable_conv1"),f=e(i,s,1,u+"/expansion_conv");return{separable_conv0:c,separable_conv1:l,expansion_conv:f}}function a(i,s){var u=n(i,i,s+"/separable_conv0"),c=n(i,i,s+"/separable_conv1"),l=n(i,i,s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:e,extractSeparableConvParams:n,extractReductionBlockParams:o,extractMainBlockParams:a}}function uy(r,t){var e=[],n=yn(r),o=n.extractWeights,a=n.getRemainingWeights,i=sy(o,e),s=i.extractConvParams,u=i.extractSeparableConvParams,c=i.extractReductionBlockParams,l=i.extractMainBlockParams,f=s(3,32,3,"entry_flow/conv_in"),h=c(32,64,"entry_flow/reduction_block_0"),d=c(64,128,"entry_flow/reduction_block_1"),p={conv_in:f,reduction_block_0:h,reduction_block_1:d},m={};Or(t,0,1).forEach(function(x){m["main_block_"+x]=l(128,"middle_flow/main_block_"+x)});var v=c(128,256,"exit_flow/reduction_block"),g=u(256,512,"exit_flow/separable_conv"),b={reduction_block:v,separable_conv:g};if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:e,params:{entry_flow:p,middle_flow:m,exit_flow:b}}}function cy(r,t){var e=Nn(r,t),n=il(e),o=Hi(e);function a(s){var u=o(s+"/separable_conv0"),c=o(s+"/separable_conv1"),l=n(s+"/expansion_conv");return{separable_conv0:u,separable_conv1:c,expansion_conv:l}}function i(s){var u=o(s+"/separable_conv0"),c=o(s+"/separable_conv1"),l=o(s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:n,extractSeparableConvParams:o,extractReductionBlockParams:a,extractMainBlockParams:i}}function ly(r,t){var e=[],n=cy(r,e),o=n.extractConvParams,a=n.extractSeparableConvParams,i=n.extractReductionBlockParams,s=n.extractMainBlockParams,u=o("entry_flow/conv_in"),c=i("entry_flow/reduction_block_0"),l=i("entry_flow/reduction_block_1"),f={conv_in:u,reduction_block_0:c,reduction_block_1:l},h={};Or(t,0,1).forEach(function(v){h["main_block_"+v]=s("middle_flow/main_block_"+v)});var d=i("exit_flow/reduction_block"),p=a("exit_flow/separable_conv"),m={reduction_block:d,separable_conv:p};return gn(r,e),{params:{entry_flow:f,middle_flow:h,exit_flow:m},paramMappings:e}}function hl(r,t,e){return Se(Ut(r,t.filters,e,"same"),t.bias)}function Aa(r,t,e){e===void 0&&(e=!0);var n=e?qe(r):r;return n=Pt(n,t.separable_conv0,[1,1]),n=Pt(qe(n),t.separable_conv1,[1,1]),n=ot(n,[3,3],[2,2],"same"),n=Se(n,hl(r,t.expansion_conv,[2,2])),n}function fy(r,t){var e=Pt(qe(r),t.separable_conv0,[1,1]);return e=Pt(qe(e),t.separable_conv1,[1,1]),e=Pt(qe(e),t.separable_conv2,[1,1]),e=Se(e,r),e}var hy=function(r){be(t,r);function t(e){var n=r.call(this,"TinyXception")||this;return n._numMainBlocks=e,n}return t.prototype.forwardInput=function(e){var n=this,o=this.params;if(!o)throw new Error("TinyXception - load model before inference");return te(function(){var a=e.toBatchTensor(112,!0),i=[122.782,117.001,104.298],s=Kr(a,i).div(Z(256)),u=qe(hl(s,o.entry_flow.conv_in,[2,2]));return u=Aa(u,o.entry_flow.reduction_block_0,!1),u=Aa(u,o.entry_flow.reduction_block_1),Or(n._numMainBlocks,0,1).forEach(function(c){u=fy(u,o.middle_flow["main_block_"+c])}),u=Aa(u,o.exit_flow.reduction_block),u=qe(Pt(u,o.exit_flow.separable_conv,[1,1])),u})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"tiny_xception_model"},t.prototype.extractParamsFromWeigthMap=function(e){return ly(e,this._numMainBlocks)},t.prototype.extractParams=function(e){return uy(e,this._numMainBlocks)},t}(mn);function dy(r){var t=[],e=yn(r),n=e.extractWeights,o=e.getRemainingWeights,a=zi(n,t),i=a(512,1,"fc/age"),s=a(512,2,"fc/gender");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:t,params:{fc:{age:i,gender:s}}}}function py(r){var t=[],e=Nn(r,t);function n(a){var i=e(a+"/weights",2),s=e(a+"/bias",1);return{weights:i,bias:s}}var o={fc:{age:n("fc/age"),gender:n("fc/gender")}};return gn(r,t),{params:o,paramMappings:t}}var Po;(function(r){r.FEMALE="female",r.MALE="male"})(Po||(Po={}));var vy=function(r){be(t,r);function t(e){e===void 0&&(e=new hy(2));var n=r.call(this,"AgeGenderNet")||this;return n._faceFeatureExtractor=e,n}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var n=this,o=this.params;if(!o)throw new Error(this._name+" - load model before inference");return te(function(){var a=e instanceof Fo?n.faceFeatureExtractor.forwardInput(e):e,i=qr(a,[7,7],[2,2],"valid").as2D(a.shape[0],-1),s=en(i,o.fc.age).as1D(),u=en(i,o.fc.gender);return{age:s,gender:u}})},t.prototype.forwardInput=function(e){var n=this;return te(function(){var o=n.runNet(e),a=o.age,i=o.gender;return{age:a,gender:pn(i)}})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.predictAgeAndGender=function(e){return se(this,void 0,void 0,function(){var n,o,a,i,s,u,c=this;return ue(this,function(l){switch(l.label){case 0:return[4,st(e)];case 1:return n=l.sent(),[4,this.forwardInput(n)];case 2:return o=l.sent(),a=Ze(o.age),i=Ze(o.gender),s=a.map(function(f,h){return{ageTensor:f,genderTensor:i[h]}}),[4,Promise.all(s.map(function(f){var h=f.ageTensor,d=f.genderTensor;return se(c,void 0,void 0,function(){var p,m,v,g,b;return ue(this,function(x){switch(x.label){case 0:return[4,h.data()];case 1:return p=x.sent()[0],[4,d.data()];case 2:return m=x.sent()[0],v=m>.5,g=v?Po.MALE:Po.FEMALE,b=v?m:1-m,h.dispose(),d.dispose(),[2,{age:p,gender:g,genderProbability:b}]}})})}))];case 3:return u=l.sent(),o.age.dispose(),o.gender.dispose(),[2,n.isBatchInput?u:u[0]]}})})},t.prototype.getDefaultModelName=function(){return"age_gender_model"},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),r.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var n=this.extractClassifierParams(e),o=n.params,a=n.paramMappings;this._params=o,this._paramMappings=a},t.prototype.extractClassifierParams=function(e){return dy(e)},t.prototype.extractParamsFromWeigthMap=function(e){var n=cl(e),o=n.featureExtractorMap,a=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(o),py(a)},t.prototype.extractParams=function(e){var n=1539,o=e.slice(0,e.length-n),a=e.slice(e.length-n);return this.faceFeatureExtractor.extractWeights(o),this.extractClassifierParams(a)},t}(mn),dl=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.postProcess=function(e,n,o){var a=o.map(function(s){var u=s.width,c=s.height,l=n/Math.max(c,u);return{width:u*l,height:c*l}}),i=a.length;return te(function(){var s=function(h,d){return Mt([rn([68],h),rn([68],d)],1).as2D(1,136).as1D()},u=function(h,d){var p=a[h],m=p.width,v=p.height;return d(m,v)?Math.abs(m-v)/2:0},c=function(h){return u(h,function(d,p){return d<p})},l=function(h){return u(h,function(d,p){return p<d})},f=e.mul(rn([i,136],n)).sub(Mt(Array.from(Array(i),function(h,d){return s(c(d),l(d))}))).div(Mt(Array.from(Array(i),function(h,d){return s(a[d].width,a[d].height)})));return f})},t.prototype.forwardInput=function(e){var n=this;return te(function(){var o=n.runNet(e);return n.postProcess(o,e.inputSize,e.inputDimensions.map(function(a){var i=a[0],s=a[1];return{height:i,width:s}}))})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.detectLandmarks=function(e){return se(this,void 0,void 0,function(){var n,o,a,i=this;return ue(this,function(s){switch(s.label){case 0:return[4,st(e)];case 1:return n=s.sent(),o=te(function(){return Ze(i.forwardInput(n))}),[4,Promise.all(o.map(function(u,c){return se(i,void 0,void 0,function(){var l,f,h,d,p;return ue(this,function(m){switch(m.label){case 0:return h=(f=Array).from,[4,u.data()];case 1:return l=h.apply(f,[m.sent()]),d=l.filter(function(v,g){return nu(g)}),p=l.filter(function(v,g){return!nu(g)}),[2,new Hg(Array(68).fill(0).map(function(v,g){return new Me(d[g],p[g])}),{height:n.getInputHeight(c),width:n.getInputWidth(c)})]}})})}))];case 2:return a=s.sent(),o.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?a:a[0]]}})})},t.prototype.getClassifierChannelsOut=function(){return 136},t}(ll),pl=function(r){be(t,r);function t(e){return e===void 0&&(e=new ul),r.call(this,"FaceLandmark68Net",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t}(dl);function my(r){var t=[],e=sl(r,t).extractDenseBlock3Params,n={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2")};return gn(r,t),{params:n,paramMappings:t}}function gy(r){var t=[],e=yn(r),n=e.extractWeights,o=e.getRemainingWeights,a=al(n,t).extractDenseBlock3Params,i=a(3,32,"dense0",!0),s=a(32,64,"dense1"),u=a(64,128,"dense2");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u}}}var yy=function(r){be(t,r);function t(){return r.call(this,"TinyFaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("TinyFaceFeatureExtractor - load model before inference");return te(function(){var o=e.toBatchTensor(112,!0),a=[122.782,117.001,104.298],i=Kr(o,a).div(Z(255)),s=Sa(i,n.dense0,!0);return s=Sa(s,n.dense1),s=Sa(s,n.dense2),s=qr(s,[14,14],[2,2],"valid"),s})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_tiny_model"},t.prototype.extractParamsFromWeigthMap=function(e){return my(e)},t.prototype.extractParams=function(e){return gy(e)},t}(mn),by=function(r){be(t,r);function t(e){return e===void 0&&(e=new yy),r.call(this,"FaceLandmark68TinyNet",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_tiny_model"},t.prototype.getClassifierChannelsIn=function(){return 128},t}(dl);(function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t})(pl);function xy(r,t){return Se(mt(r,t.weights),t.biases)}function ji(r,t,e,n,o){o===void 0&&(o="same");var a=t.conv,i=a.filters,s=a.bias,u=Ut(r,i,e,o);return u=Se(u,s),u=xy(u,t.scale),n?qe(u):u}function wy(r,t){return ji(r,t,[1,1],!0)}function vl(r,t){return ji(r,t,[1,1],!1)}function ml(r,t){return ji(r,t,[2,2],!0,"valid")}function _y(r,t){function e(s,u,c){var l=r(s),f=l.length/(u*c*c);if(Pg(f))throw new Error("depth has to be an integer: "+f+", weights.length: "+l.length+", numFilters: "+u+", filterSize: "+c);return te(function(){return Sn(wt(l,[u,f,c,c]),[2,3,1,0])})}function n(s,u,c,l){var f=e(s,u,c),h=Ye(r(u));return t.push({paramPath:l+"/filters"},{paramPath:l+"/bias"}),{filters:f,bias:h}}function o(s,u){var c=Ye(r(s)),l=Ye(r(s));return t.push({paramPath:u+"/weights"},{paramPath:u+"/biases"}),{weights:c,biases:l}}function a(s,u,c,l){var f=n(s,u,c,l+"/conv"),h=o(u,l+"/scale");return{conv:f,scale:h}}function i(s,u,c,l,f){f===void 0&&(f=!1);var h=a((f?.5:1)*s,u,c,l+"/conv1"),d=a(s,u,c,l+"/conv2");return{conv1:h,conv2:d}}return{extractConvLayerParams:a,extractResidualLayerParams:i}}function Cy(r){var t=yn(r),e=t.extractWeights,n=t.getRemainingWeights,o=[],a=_y(e,o),i=a.extractConvLayerParams,s=a.extractResidualLayerParams,u=i(4704,32,7,"conv32_down"),c=s(9216,32,3,"conv32_1"),l=s(9216,32,3,"conv32_2"),f=s(9216,32,3,"conv32_3"),h=s(36864,64,3,"conv64_down",!0),d=s(36864,64,3,"conv64_1"),p=s(36864,64,3,"conv64_2"),m=s(36864,64,3,"conv64_3"),v=s(147456,128,3,"conv128_down",!0),g=s(147456,128,3,"conv128_1"),b=s(147456,128,3,"conv128_2"),x=s(589824,256,3,"conv256_down",!0),y=s(589824,256,3,"conv256_1"),w=s(589824,256,3,"conv256_2"),_=s(589824,256,3,"conv256_down_out"),S=te(function(){return Sn(kn(e(256*128),[128,256]),[1,0])});if(o.push({paramPath:"fc"}),n().length!==0)throw new Error("weights remaing after extract: "+n().length);var E={conv32_down:u,conv32_1:c,conv32_2:l,conv32_3:f,conv64_down:h,conv64_1:d,conv64_2:p,conv64_3:m,conv128_down:v,conv128_1:g,conv128_2:b,conv256_down:x,conv256_1:y,conv256_2:w,conv256_down_out:_,fc:S};return{params:E,paramMappings:o}}function Ey(r,t){var e=Nn(r,t);function n(i){var s=e(i+"/scale/weights",1),u=e(i+"/scale/biases",1);return{weights:s,biases:u}}function o(i){var s=e(i+"/conv/filters",4),u=e(i+"/conv/bias",1),c=n(i);return{conv:{filters:s,bias:u},scale:c}}function a(i){return{conv1:o(i+"/conv1"),conv2:o(i+"/conv2")}}return{extractConvLayerParams:o,extractResidualLayerParams:a}}function ky(r){var t=[],e=Ey(r,t),n=e.extractConvLayerParams,o=e.extractResidualLayerParams,a=n("conv32_down"),i=o("conv32_1"),s=o("conv32_2"),u=o("conv32_3"),c=o("conv64_down"),l=o("conv64_1"),f=o("conv64_2"),h=o("conv64_3"),d=o("conv128_down"),p=o("conv128_1"),m=o("conv128_2"),v=o("conv256_down"),g=o("conv256_1"),b=o("conv256_2"),x=o("conv256_down_out"),y=r.fc;if(t.push({originalPath:"fc",paramPath:"fc"}),!Fg(y))throw new Error("expected weightMap[fc] to be a Tensor2D, instead have "+y);var w={conv32_down:a,conv32_1:i,conv32_2:s,conv32_3:u,conv64_down:c,conv64_1:l,conv64_2:f,conv64_3:h,conv128_down:d,conv128_1:p,conv128_2:m,conv256_down:v,conv256_1:g,conv256_2:b,conv256_down_out:x,fc:y};return gn(r,t),{params:w,paramMappings:t}}function $t(r,t){var e=wy(r,t.conv1);return e=vl(e,t.conv2),e=Se(e,r),e=qe(e),e}function io(r,t){var e=ml(r,t.conv1);e=vl(e,t.conv2);var n=qr(r,2,2,"valid"),o=Ge(n.shape),a=n.shape[3]!==e.shape[3],i=n.shape[1]!==e.shape[1]||n.shape[2]!==e.shape[2];if(i){var s=Dr(e.shape);s[1]=1;var u=Ge(s);e=Qe([e,u],1);var c=Dr(e.shape);c[2]=1;var l=Ge(c);e=Qe([e,l],2)}return n=a?Qe([n,o],3):n,e=Se(n,e),e=qe(e),e}var Ry=function(r){be(t,r);function t(){return r.call(this,"FaceRecognitionNet")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("FaceRecognitionNet - load model before inference");return te(function(){var o=e.toBatchTensor(150,!0).toFloat(),a=[122.782,117.001,104.298],i=Kr(o,a).div(Z(256)),s=ml(i,n.conv32_down);s=ot(s,3,2,"valid"),s=$t(s,n.conv32_1),s=$t(s,n.conv32_2),s=$t(s,n.conv32_3),s=io(s,n.conv64_down),s=$t(s,n.conv64_1),s=$t(s,n.conv64_2),s=$t(s,n.conv64_3),s=io(s,n.conv128_down),s=$t(s,n.conv128_1),s=$t(s,n.conv128_2),s=io(s,n.conv256_down),s=$t(s,n.conv256_1),s=$t(s,n.conv256_2),s=io(s,n.conv256_down_out);var u=s.mean([1,2]),c=zo(u,n.fc);return c})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.computeFaceDescriptor=function(e){return se(this,void 0,void 0,function(){var n,o,a,i=this;return ue(this,function(s){switch(s.label){case 0:return[4,st(e)];case 1:return n=s.sent(),o=te(function(){return Ze(i.forwardInput(n))}),[4,Promise.all(o.map(function(u){return u.data()}))];case 2:return a=s.sent(),o.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?a:a[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_recognition_model"},t.prototype.extractParamsFromWeigthMap=function(e){return ky(e)},t.prototype.extractParams=function(e){return Cy(e)},t}(mn);function gl(r,t){var e={descriptor:t};return Object.assign({},r,e)}function yl(r,t){var e={age:t};return Object.assign({},r,e)}function bl(r,t,e){var n={gender:t,genderProbability:e};return Object.assign({},r,n)}var xl=function(){function r(t){var e=t===void 0?{}:t,n=e.minFaceSize,o=e.scaleFactor,a=e.maxNumScales,i=e.scoreThresholds,s=e.scaleSteps;if(this._name="MtcnnOptions",this._minFaceSize=n||20,this._scaleFactor=o||.709,this._maxNumScales=a||10,this._scoreThresholds=i||[.6,.7,.7],this._scaleSteps=s,typeof this._minFaceSize!="number"||this._minFaceSize<0)throw new Error(this._name+" - expected minFaceSize to be a number > 0");if(typeof this._scaleFactor!="number"||this._scaleFactor<=0||this._scaleFactor>=1)throw new Error(this._name+" - expected scaleFactor to be a number between 0 and 1");if(typeof this._maxNumScales!="number"||this._maxNumScales<0)throw new Error(this._name+" - expected maxNumScales to be a number > 0");if(!Array.isArray(this._scoreThresholds)||this._scoreThresholds.length!==3||this._scoreThresholds.some(function(u){return typeof u!="number"}))throw new Error(this._name+" - expected scoreThresholds to be an array of numbers of length 3");if(this._scaleSteps&&(!Array.isArray(this._scaleSteps)||this._scaleSteps.some(function(u){return typeof u!="number"})))throw new Error(this._name+" - expected scaleSteps to be an array of numbers")}return Object.defineProperty(r.prototype,"minFaceSize",{get:function(){return this._minFaceSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleFactor",{get:function(){return this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxNumScales",{get:function(){return this._maxNumScales},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThresholds",{get:function(){return this._scoreThresholds},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleSteps",{get:function(){return this._scaleSteps},enumerable:!0,configurable:!0}),r}();function Iy(r,t){function e(u,c){var l=wt(r(9*u),[3,3,u,1]),f=Ye(r(u)),h=Ye(r(u)),d=Ye(r(u)),p=Ye(r(u));return t.push({paramPath:c+"/filters"},{paramPath:c+"/batch_norm_scale"},{paramPath:c+"/batch_norm_offset"},{paramPath:c+"/batch_norm_mean"},{paramPath:c+"/batch_norm_variance"}),{filters:l,batch_norm_scale:f,batch_norm_offset:h,batch_norm_mean:d,batch_norm_variance:p}}function n(u,c,l,f,h){var d=wt(r(u*c*l*l),[l,l,u,c]),p=Ye(r(c));return t.push({paramPath:f+"/filters"},{paramPath:f+"/"+(h?"batch_norm_offset":"bias")}),{filters:d,bias:p}}function o(u,c,l,f){var h=n(u,c,l,f,!0),d=h.filters,p=h.bias;return{filters:d,batch_norm_offset:p}}function a(u,c,l){var f=e(u,l+"/depthwise_conv"),h=o(u,c,1,l+"/pointwise_conv");return{depthwise_conv:f,pointwise_conv:h}}function i(){var u=o(3,32,3,"mobilenetv1/conv_0"),c=a(32,64,"mobilenetv1/conv_1"),l=a(64,128,"mobilenetv1/conv_2"),f=a(128,128,"mobilenetv1/conv_3"),h=a(128,256,"mobilenetv1/conv_4"),d=a(256,256,"mobilenetv1/conv_5"),p=a(256,512,"mobilenetv1/conv_6"),m=a(512,512,"mobilenetv1/conv_7"),v=a(512,512,"mobilenetv1/conv_8"),g=a(512,512,"mobilenetv1/conv_9"),b=a(512,512,"mobilenetv1/conv_10"),x=a(512,512,"mobilenetv1/conv_11"),y=a(512,1024,"mobilenetv1/conv_12"),w=a(1024,1024,"mobilenetv1/conv_13");return{conv_0:u,conv_1:c,conv_2:l,conv_3:f,conv_4:h,conv_5:d,conv_6:p,conv_7:m,conv_8:v,conv_9:g,conv_10:b,conv_11:x,conv_12:y,conv_13:w}}function s(){var u=o(1024,256,1,"prediction_layer/conv_0"),c=o(256,512,3,"prediction_layer/conv_1"),l=o(512,128,1,"prediction_layer/conv_2"),f=o(128,256,3,"prediction_layer/conv_3"),h=o(256,128,1,"prediction_layer/conv_4"),d=o(128,256,3,"prediction_layer/conv_5"),p=o(256,64,1,"prediction_layer/conv_6"),m=o(64,128,3,"prediction_layer/conv_7"),v=n(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),g=n(512,9,1,"prediction_layer/box_predictor_0/class_predictor"),b=n(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),x=n(1024,18,1,"prediction_layer/box_predictor_1/class_predictor"),y=n(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),w=n(512,18,1,"prediction_layer/box_predictor_2/class_predictor"),_=n(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),S=n(256,18,1,"prediction_layer/box_predictor_3/class_predictor"),E=n(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),k=n(256,18,1,"prediction_layer/box_predictor_4/class_predictor"),I=n(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),T=n(128,18,1,"prediction_layer/box_predictor_5/class_predictor"),D={box_encoding_predictor:v,class_predictor:g},U={box_encoding_predictor:b,class_predictor:x},V={box_encoding_predictor:y,class_predictor:w},z={box_encoding_predictor:_,class_predictor:S},O={box_encoding_predictor:E,class_predictor:k},P={box_encoding_predictor:I,class_predictor:T};return{conv_0:u,conv_1:c,conv_2:l,conv_3:f,conv_4:h,conv_5:d,conv_6:p,conv_7:m,box_predictor_0:D,box_predictor_1:U,box_predictor_2:V,box_predictor_3:z,box_predictor_4:O,box_predictor_5:P}}return{extractMobilenetV1Params:i,extractPredictionLayerParams:s}}function Sy(r){var t=[],e=yn(r),n=e.extractWeights,o=e.getRemainingWeights,a=Iy(n,t),i=a.extractMobilenetV1Params,s=a.extractPredictionLayerParams,u=i(),c=s(),l=ui(n(5118*4),[1,5118,4]),f={extra_dim:l};if(t.push({paramPath:"output_layer/extra_dim"}),o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{params:{mobilenetv1:u,prediction_layer:c,output_layer:f},paramMappings:t}}function Ay(r,t){var e=Nn(r,t);function n(c,l,f){var h=e(c+"/Conv2d_"+l+"_pointwise/weights",4,f+"/filters"),d=e(c+"/Conv2d_"+l+"_pointwise/convolution_bn_offset",1,f+"/batch_norm_offset");return{filters:h,batch_norm_offset:d}}function o(c){var l="mobilenetv1/conv_"+c,f="MobilenetV1/Conv2d_"+c+"_depthwise",h=l+"/depthwise_conv",d=l+"/pointwise_conv",p=e(f+"/depthwise_weights",4,h+"/filters"),m=e(f+"/BatchNorm/gamma",1,h+"/batch_norm_scale"),v=e(f+"/BatchNorm/beta",1,h+"/batch_norm_offset"),g=e(f+"/BatchNorm/moving_mean",1,h+"/batch_norm_mean"),b=e(f+"/BatchNorm/moving_variance",1,h+"/batch_norm_variance");return{depthwise_conv:{filters:p,batch_norm_scale:m,batch_norm_offset:v,batch_norm_mean:g,batch_norm_variance:b},pointwise_conv:n("MobilenetV1",c,d)}}function a(){return{conv_0:n("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:o(1),conv_2:o(2),conv_3:o(3),conv_4:o(4),conv_5:o(5),conv_6:o(6),conv_7:o(7),conv_8:o(8),conv_9:o(9),conv_10:o(10),conv_11:o(11),conv_12:o(12),conv_13:o(13)}}function i(c,l){var f=e(c+"/weights",4,l+"/filters"),h=e(c+"/biases",1,l+"/bias");return{filters:f,bias:h}}function s(c){var l=i("Prediction/BoxPredictor_"+c+"/BoxEncodingPredictor","prediction_layer/box_predictor_"+c+"/box_encoding_predictor"),f=i("Prediction/BoxPredictor_"+c+"/ClassPredictor","prediction_layer/box_predictor_"+c+"/class_predictor");return{box_encoding_predictor:l,class_predictor:f}}function u(){return{conv_0:n("Prediction",0,"prediction_layer/conv_0"),conv_1:n("Prediction",1,"prediction_layer/conv_1"),conv_2:n("Prediction",2,"prediction_layer/conv_2"),conv_3:n("Prediction",3,"prediction_layer/conv_3"),conv_4:n("Prediction",4,"prediction_layer/conv_4"),conv_5:n("Prediction",5,"prediction_layer/conv_5"),conv_6:n("Prediction",6,"prediction_layer/conv_6"),conv_7:n("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:s(0),box_predictor_1:s(1),box_predictor_2:s(2),box_predictor_3:s(3),box_predictor_4:s(4),box_predictor_5:s(5)}}return{extractMobilenetV1Params:a,extractPredictionLayerParams:u}}function Dy(r){var t=[],e=Ay(r,t),n=e.extractMobilenetV1Params,o=e.extractPredictionLayerParams,a=r["Output/extra_dim"];if(t.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!jo(a))throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have "+a);var i={mobilenetv1:n(),prediction_layer:o(),output_layer:{extra_dim:a}};return gn(r,t),{params:i,paramMappings:t}}function Yt(r,t,e){return te(function(){var n=Ut(r,t.filters,e,"same");return n=Se(n,t.batch_norm_offset),bi(n,0,6)})}var Ty=.0010000000474974513;function Ny(r,t,e){return te(function(){var n=Uo(r,t.filters,e,"same");return n=pc(n,t.batch_norm_mean,t.batch_norm_variance,t.batch_norm_offset,t.batch_norm_scale,Ty),bi(n,0,6)})}function Fy(r){return[2,4,6,12].some(function(t){return t===r})?[2,2]:[1,1]}function Py(r,t){return te(function(){var e=null,n=Yt(r,t.conv_0,[2,2]),o=[t.conv_1,t.conv_2,t.conv_3,t.conv_4,t.conv_5,t.conv_6,t.conv_7,t.conv_8,t.conv_9,t.conv_10,t.conv_11,t.conv_12,t.conv_13];if(o.forEach(function(a,i){var s=i+1,u=Fy(s);n=Ny(n,a.depthwise_conv,u),n=Yt(n,a.pointwise_conv,[1,1]),s===11&&(e=n)}),e===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:n,conv11:e}})}function My(r,t,e,n,o){var a=r.shape[0],i=Math.min(e,a),s=t.map(function(l,f){return{score:l,boxIndex:f}}).filter(function(l){return l.score>o}).sort(function(l,f){return f.score-l.score}),u=function(l){return l<=n?1:0},c=[];return s.forEach(function(l){if(!(c.length>=i)){for(var f=l.score,h=c.length-1;h>=0;--h){var d=Oy(r,l.boxIndex,c[h]);if(d!==0&&(l.score*=u(d),l.score<=o))break}f===l.score&&c.push(l.boxIndex)}}),c}function Oy(r,t,e){var n=r.arraySync(),o=Math.min(n[t][0],n[t][2]),a=Math.min(n[t][1],n[t][3]),i=Math.max(n[t][0],n[t][2]),s=Math.max(n[t][1],n[t][3]),u=Math.min(n[e][0],n[e][2]),c=Math.min(n[e][1],n[e][3]),l=Math.max(n[e][0],n[e][2]),f=Math.max(n[e][1],n[e][3]),h=(i-o)*(s-a),d=(l-u)*(f-c);if(h<=0||d<=0)return 0;var p=Math.max(o,u),m=Math.max(a,c),v=Math.min(i,l),g=Math.min(s,f),b=Math.max(v-p,0)*Math.max(g-m,0);return b/(h+d-b)}function By(r){var t=Ze(Sn(r,[1,0])),e=[tt(t[2],t[0]),tt(t[3],t[1])],n=[Se(t[0],Ht(e[0],Z(2))),Se(t[1],Ht(e[1],Z(2)))];return{sizes:e,centers:n}}function Ly(r,t){var e=By(r),n=e.sizes,o=e.centers,a=Ze(Sn(t,[1,0])),i=Ht(mt(Xa(Ht(a[2],Z(5))),n[0]),Z(2)),s=Se(mt(Ht(a[0],Z(10)),n[0]),o[0]),u=Ht(mt(Xa(Ht(a[3],Z(5))),n[1]),Z(2)),c=Se(mt(Ht(a[1],Z(10)),n[1]),o[1]);return Sn(Mt([tt(s,i),tt(c,u),Se(s,i),Se(c,u)]),[1,0])}function Wy(r,t,e){return te(function(){var n=r.shape[0],o=Ly(qt(ir(e.extra_dim,[n,1,1]),[-1,4]),qt(r,[-1,4]));o=qt(o,[n,o.shape[0]/n,4]);var a=lc(on(t,[0,0,1],[-1,-1,-1])),i=on(a,[0,0,0],[-1,-1,1]);i=qt(i,[n,i.shape[1]]);var s=Ze(o),u=Ze(i);return{boxes:s,scores:u}})}function er(r,t){return te(function(){var e=r.shape[0],n=qt(jt(r,t.box_encoding_predictor),[e,-1,1,4]),o=qt(jt(r,t.class_predictor),[e,-1,3]);return{boxPredictionEncoding:n,classPrediction:o}})}function Vy(r,t,e){return te(function(){var n=Yt(r,e.conv_0,[1,1]),o=Yt(n,e.conv_1,[2,2]),a=Yt(o,e.conv_2,[1,1]),i=Yt(a,e.conv_3,[2,2]),s=Yt(i,e.conv_4,[1,1]),u=Yt(s,e.conv_5,[2,2]),c=Yt(u,e.conv_6,[1,1]),l=Yt(c,e.conv_7,[2,2]),f=er(t,e.box_predictor_0),h=er(r,e.box_predictor_1),d=er(o,e.box_predictor_2),p=er(i,e.box_predictor_3),m=er(u,e.box_predictor_4),v=er(l,e.box_predictor_5),g=Qe([f.boxPredictionEncoding,h.boxPredictionEncoding,d.boxPredictionEncoding,p.boxPredictionEncoding,m.boxPredictionEncoding,v.boxPredictionEncoding],1),b=Qe([f.classPrediction,h.classPrediction,d.classPrediction,p.classPrediction,m.classPrediction,v.classPrediction],1);return{boxPredictions:g,classPredictions:b}})}var Yo=function(){function r(t){var e=t===void 0?{}:t,n=e.minConfidence,o=e.maxResults;if(this._name="SsdMobilenetv1Options",this._minConfidence=n||.5,this._maxResults=o||100,typeof this._minConfidence!="number"||this._minConfidence<=0||this._minConfidence>=1)throw new Error(this._name+" - expected minConfidence to be a number between 0 and 1");if(typeof this._maxResults!="number")throw new Error(this._name+" - expected maxResults to be a number")}return Object.defineProperty(r.prototype,"minConfidence",{get:function(){return this._minConfidence},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxResults",{get:function(){return this._maxResults},enumerable:!0,configurable:!0}),r}(),wl=function(r){be(t,r);function t(){return r.call(this,"SsdMobilenetv1")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("SsdMobilenetv1 - load model before inference");return te(function(){var o=e.toBatchTensor(512,!1).toFloat(),a=tt(mt(o,Z(.007843137718737125)),Z(1)),i=Py(a,n.mobilenetv1),s=Vy(i.out,i.conv11,n.prediction_layer),u=s.boxPredictions,c=s.classPredictions;return Wy(u,c,n.output_layer)})},t.prototype.forward=function(e){return se(this,void 0,void 0,function(){var n;return ue(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,st(e)];case 1:return[2,n.apply(this,[o.sent()])]}})})},t.prototype.locateFaces=function(e,n){return n===void 0&&(n={}),se(this,void 0,void 0,function(){var o,a,i,s,u,c,l,f,h,d,p,m,v,g,b,x,y,w,_,S,E;return ue(this,function(k){switch(k.label){case 0:return o=new Yo(n),a=o.maxResults,i=o.minConfidence,[4,st(e)];case 1:for(s=k.sent(),u=this.forwardInput(s),c=u.boxes,l=u.scores,f=c[0],h=l[0],d=1;d<c.length;d++)c[d].dispose(),l[d].dispose();return v=(m=Array).from,[4,h.data()];case 2:return p=v.apply(m,[k.sent()]),g=.5,b=My(f,p,a,g,i),x=s.getReshapedInputDimensions(0),y=s.inputSize,w=y/x.width,_=y/x.height,S=f.arraySync(),E=b.map(function(I){var T=[Math.max(0,S[I][0]),Math.min(1,S[I][2])].map(function(P){return P*_}),D=T[0],U=T[1],V=[Math.max(0,S[I][1]),Math.min(1,S[I][3])].map(function(P){return P*w}),z=V[0],O=V[1];return new cn(p[I],new Oi(z,D,O-z,U-D),{height:s.getInputHeight(0),width:s.getInputWidth(0)})}),f.dispose(),h.dispose(),[2,E]}})})},t.prototype.getDefaultModelName=function(){return"ssd_mobilenetv1_model"},t.prototype.extractParamsFromWeigthMap=function(e){return Dy(e)},t.prototype.extractParams=function(e){return Sy(e)},t}(mn);(function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t})(wl);var Uy=.4,zy=[new Me(.738768,.874946),new Me(2.42204,2.65704),new Me(4.30971,7.04493),new Me(10.246,4.59428),new Me(12.6868,11.8741)],Gy=[new Me(1.603231,2.094468),new Me(6.041143,7.080126),new Me(2.882459,3.518061),new Me(4.266906,5.178857),new Me(9.041765,10.66308)],Hy=[117.001,114.697,97.404],qy="tiny_yolov2_model",jy="tiny_yolov2_separable_conv_model",so=function(r){return typeof r=="number"};function Ky(r){if(!r)throw new Error("invalid config: "+r);if(typeof r.withSeparableConvs!="boolean")throw new Error("config.withSeparableConvs has to be a boolean, have: "+r.withSeparableConvs);if(!so(r.iouThreshold)||r.iouThreshold<0||r.iouThreshold>1)throw new Error("config.iouThreshold has to be a number between [0, 1], have: "+r.iouThreshold);if(!Array.isArray(r.classes)||!r.classes.length||!r.classes.every(function(t){return typeof t=="string"}))throw new Error("config.classes has to be an array class names: string[], have: "+JSON.stringify(r.classes));if(!Array.isArray(r.anchors)||!r.anchors.length||!r.anchors.map(function(t){return t||{}}).every(function(t){return so(t.x)&&so(t.y)}))throw new Error("config.anchors has to be an array of { x: number, y: number }, have: "+JSON.stringify(r.anchors));if(r.meanRgb&&(!Array.isArray(r.meanRgb)||r.meanRgb.length!==3||!r.meanRgb.every(so)))throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: "+JSON.stringify(r.meanRgb))}function Ki(r){return te(function(){var t=mt(r,Z(.10000000149011612));return Se(qe(tt(r,t)),t)})}function wn(r,t){return te(function(){var e=qn(r,[[0,0],[1,1],[1,1],[0,0]]);return e=Ut(e,t.conv.filters,[1,1],"valid"),e=tt(e,t.bn.sub),e=mt(e,t.bn.truediv),e=Se(e,t.conv.bias),Ki(e)})}function _n(r,t){return te(function(){var e=qn(r,[[0,0],[1,1],[1,1],[0,0]]);return e=Ci(e,t.depthwise_filter,t.pointwise_filter,[1,1],"valid"),e=Se(e,t.bias),Ki(e)})}function Xy(r,t){var e=$o(r,t);function n(i,s){var u=Ye(r(i)),c=Ye(r(i));return t.push({paramPath:s+"/sub"},{paramPath:s+"/truediv"}),{sub:u,truediv:c}}function o(i,s,u){var c=e(i,s,3,u+"/conv"),l=n(s,u+"/bn");return{conv:c,bn:l}}var a=Gi(r,t);return{extractConvParams:e,extractConvWithBatchNormParams:o,extractSeparableConvParams:a}}function $y(r,t,e,n){var o=yn(r),a=o.extractWeights,i=o.getRemainingWeights,s=[],u=Xy(a,s),c=u.extractConvParams,l=u.extractConvWithBatchNormParams,f=u.extractSeparableConvParams,h;if(t.withSeparableConvs){var d=n[0],p=n[1],m=n[2],v=n[3],g=n[4],b=n[5],x=n[6],y=n[7],w=n[8],_=t.isFirstLayerConv2d?c(d,p,3,"conv0"):f(d,p,"conv0"),S=f(p,m,"conv1"),E=f(m,v,"conv2"),k=f(v,g,"conv3"),I=f(g,b,"conv4"),T=f(b,x,"conv5"),D=y?f(x,y,"conv6"):void 0,U=w?f(y,w,"conv7"):void 0,V=c(w||y||x,5*e,1,"conv8");h={conv0:_,conv1:S,conv2:E,conv3:k,conv4:I,conv5:T,conv6:D,conv7:U,conv8:V}}else{var d=n[0],p=n[1],m=n[2],v=n[3],g=n[4],b=n[5],x=n[6],y=n[7],w=n[8],_=l(d,p,"conv0"),S=l(p,m,"conv1"),E=l(m,v,"conv2"),k=l(v,g,"conv3"),I=l(g,b,"conv4"),T=l(b,x,"conv5"),D=l(x,y,"conv6"),U=l(y,w,"conv7"),V=c(w,5*e,1,"conv8");h={conv0:_,conv1:S,conv2:E,conv3:k,conv4:I,conv5:T,conv6:D,conv7:U,conv8:V}}if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{params:h,paramMappings:s}}function Yy(r,t){var e=Nn(r,t);function n(s){var u=e(s+"/sub",1),c=e(s+"/truediv",1);return{sub:u,truediv:c}}function o(s){var u=e(s+"/filters",4),c=e(s+"/bias",1);return{filters:u,bias:c}}function a(s){var u=o(s+"/conv"),c=n(s+"/bn");return{conv:u,bn:c}}var i=Hi(e);return{extractConvParams:o,extractConvWithBatchNormParams:a,extractSeparableConvParams:i}}function Jy(r,t){var e=[],n=Yy(r,e),o=n.extractConvParams,a=n.extractConvWithBatchNormParams,i=n.extractSeparableConvParams,s;if(t.withSeparableConvs){var u=t.filterSizes&&t.filterSizes.length||9;s={conv0:t.isFirstLayerConv2d?o("conv0"):i("conv0"),conv1:i("conv1"),conv2:i("conv2"),conv3:i("conv3"),conv4:i("conv4"),conv5:i("conv5"),conv6:u>7?i("conv6"):void 0,conv7:u>8?i("conv7"):void 0,conv8:o("conv8")}}else s={conv0:a("conv0"),conv1:a("conv1"),conv2:a("conv2"),conv3:a("conv3"),conv4:a("conv4"),conv5:a("conv5"),conv6:a("conv6"),conv7:a("conv7"),conv8:o("conv8")};return gn(r,e),{params:s,paramMappings:e}}var lu;(function(r){r[r.XS=224]="XS",r[r.SM=320]="SM",r[r.MD=416]="MD",r[r.LG=608]="LG"})(lu||(lu={}));var Xi=function(){function r(t){var e=t===void 0?{}:t,n=e.inputSize,o=e.scoreThreshold;if(this._name="TinyYolov2Options",this._inputSize=n||416,this._scoreThreshold=o||.5,typeof this._inputSize!="number"||this._inputSize%32!==0)throw new Error(this._name+" - expected inputSize to be a number divisible by 32");if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||this._scoreThreshold>=1)throw new Error(this._name+" - expected scoreThreshold to be a number between 0 and 1")}return Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThreshold",{get:function(){return this._scoreThreshold},enumerable:!0,configurable:!0}),r}(),_l=function(r){be(t,r);function t(e){var n=r.call(this,"TinyYolov2")||this;return Ky(e),n._config=e,n}return Object.defineProperty(t.prototype,"config",{get:function(){return this._config},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"withClassScores",{get:function(){return this.config.withClassScores||this.config.classes.length>1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"boxEncodingSize",{get:function(){return 5+(this.withClassScores?this.config.classes.length:0)},enumerable:!0,configurable:!0}),t.prototype.runTinyYolov2=function(e,n){var o=wn(e,n.conv0);return o=ot(o,[2,2],[2,2],"same"),o=wn(o,n.conv1),o=ot(o,[2,2],[2,2],"same"),o=wn(o,n.conv2),o=ot(o,[2,2],[2,2],"same"),o=wn(o,n.conv3),o=ot(o,[2,2],[2,2],"same"),o=wn(o,n.conv4),o=ot(o,[2,2],[2,2],"same"),o=wn(o,n.conv5),o=ot(o,[2,2],[1,1],"same"),o=wn(o,n.conv6),o=wn(o,n.conv7),jt(o,n.conv8,"valid",!1)},t.prototype.runMobilenet=function(e,n){var o=this.config.isFirstLayerConv2d?Ki(jt(e,n.conv0,"valid",!1)):_n(e,n.conv0);return o=ot(o,[2,2],[2,2],"same"),o=_n(o,n.conv1),o=ot(o,[2,2],[2,2],"same"),o=_n(o,n.conv2),o=ot(o,[2,2],[2,2],"same"),o=_n(o,n.conv3),o=ot(o,[2,2],[2,2],"same"),o=_n(o,n.conv4),o=ot(o,[2,2],[2,2],"same"),o=_n(o,n.conv5),o=ot(o,[2,2],[1,1],"same"),o=n.conv6?_n(o,n.conv6):o,o=n.conv7?_n(o,n.conv7):o,jt(o,n.conv8,"valid",!1)},t.prototype.forwardInput=function(e,n){var o=this,a=this.params;if(!a)throw new Error("TinyYolov2 - load model before inference");return te(function(){var i=e.toBatchTensor(n,!1).toFloat();return i=o.config.meanRgb?Kr(i,o.config.meanRgb):i,i=i.div(Z(256)),o.config.withSeparableConvs?o.runMobilenet(i,a):o.runTinyYolov2(i,a)})},t.prototype.forward=function(e,n){return se(this,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,st(e)];case 1:return[4,o.apply(this,[a.sent(),n])];case 2:return[2,a.sent()]}})})},t.prototype.detect=function(e,n){return n===void 0&&(n={}),se(this,void 0,void 0,function(){var o,a,i,s,u,c,l,f,h,d,p,m,v,g,b=this;return ue(this,function(x){switch(x.label){case 0:return o=new Xi(n),a=o.inputSize,i=o.scoreThreshold,[4,st(e)];case 1:return s=x.sent(),[4,this.forwardInput(s,a)];case 2:return u=x.sent(),c=te(function(){return Ze(u)[0].expandDims()}),l={width:s.getInputWidth(0),height:s.getInputHeight(0)},[4,this.extractBoxes(c,s.getReshapedInputDimensions(0),i)];case 3:return f=x.sent(),u.dispose(),c.dispose(),h=f.map(function(y){return y.box}),d=f.map(function(y){return y.score}),p=f.map(function(y){return y.classScore}),m=f.map(function(y){return b.config.classes[y.label]}),v=Br(h.map(function(y){return y.rescale(a)}),d,this.config.iouThreshold,!0),g=v.map(function(y){return new Xc(d[y],p[y],m[y],h[y],l)}),[2,g]}})})},t.prototype.getDefaultModelName=function(){return""},t.prototype.extractParamsFromWeigthMap=function(e){return Jy(e,this.config)},t.prototype.extractParams=function(e){var n=this.config.filterSizes||t.DEFAULT_FILTER_SIZES,o=n?n.length:void 0;if(o!==7&&o!==8&&o!==9)throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found "+o+" filterSizes in config");return $y(e,this.config,this.boxEncodingSize,n)},t.prototype.extractBoxes=function(e,n,o){return se(this,void 0,void 0,function(){var a,i,s,u,c,l,f,h,d,p,m,v,g,b,x,y,w,_,S,E,k,I,T,D,U,V,z,O,P,q=this;return ue(this,function(j){switch(j.label){case 0:return a=n.width,i=n.height,s=Math.max(a,i),u=s/a,c=s/i,l=e.shape[1],f=this.config.anchors.length,h=te(function(){var K=e.reshape([l,l,f,q.boxEncodingSize]),J=K.slice([0,0,0,0],[l,l,f,4]),ne=K.slice([0,0,0,4],[l,l,f,1]),ce=q.withClassScores?pn(K.slice([0,0,0,5],[l,l,f,q.config.classes.length]),3):Z(0);return[J,ne,ce]}),d=h[0],p=h[1],m=h[2],v=[],[4,p.array()];case 1:return g=j.sent(),[4,d.array()];case 2:b=j.sent(),x=0,j.label=3;case 3:if(!(x<l))return[3,12];y=0,j.label=4;case 4:if(!(y<l))return[3,11];w=0,j.label=5;case 5:return w<f?(_=Ia(g[x][y][w][0]),!o||_>o?(S=(y+Ia(b[x][y][w][0]))/l*u,E=(x+Ia(b[x][y][w][1]))/l*c,k=Math.exp(b[x][y][w][2])*this.config.anchors[w].x/l*u,I=Math.exp(b[x][y][w][3])*this.config.anchors[w].y/l*c,T=S-k/2,D=E-I/2,U={row:x,col:y,anchor:w},this.withClassScores?[4,this.extractPredictedClass(m,U)]:[3,7]):[3,9]):[3,10];case 6:return P=j.sent(),[3,8];case 7:P={classScore:1,label:0},j.label=8;case 8:V=P,z=V.classScore,O=V.label,v.push(dt({box:new Ko(T,D,T+k,D+I),score:_,classScore:_*z,label:O},U)),j.label=9;case 9:return w++,[3,5];case 10:return y++,[3,4];case 11:return x++,[3,3];case 12:return d.dispose(),p.dispose(),m.dispose(),[2,v]}})})},t.prototype.extractPredictedClass=function(e,n){return se(this,void 0,void 0,function(){var o,a,i,s;return ue(this,function(u){switch(u.label){case 0:return o=n.row,a=n.col,i=n.anchor,[4,e.array()];case 1:return s=u.sent(),[2,Array(this.config.classes.length).fill(0).map(function(c,l){return s[o][a][i][l]}).map(function(c,l){return{classScore:c,label:l}}).reduce(function(c,l){return c.classScore>l.classScore?c:l})]}})})},t.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024],t}(mn),Qy=function(r){be(t,r);function t(e){e===void 0&&(e=!0);var n=this,o=Object.assign({},{withSeparableConvs:e,iouThreshold:Uy,classes:["face"]},e?{anchors:Gy,meanRgb:Hy}:{anchors:zy,withClassScores:!0});return n=r.call(this,o)||this,n}return Object.defineProperty(t.prototype,"withSeparableConvs",{get:function(){return this.config.withSeparableConvs},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,n){return se(this,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return[4,this.detect(e,n)];case 1:return o=a.sent(),[2,o.map(function(i){return new cn(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return this.withSeparableConvs?jy:qy},t.prototype.extractParamsFromWeigthMap=function(e){return r.prototype.extractParamsFromWeigthMap.call(this,e)},t}(_l),Cl=function(r){be(t,r);function t(){var e=r!==null&&r.apply(this,arguments)||this;return e._name="TinyFaceDetectorOptions",e}return t}(Xi),Xr=function(){function r(){}return r.prototype.then=function(t){return se(this,void 0,void 0,function(){var e;return ue(this,function(n){switch(n.label){case 0:return e=t,[4,this.run()];case 1:return[2,e.apply(void 0,[n.sent()])]}})})},r.prototype.run=function(){return se(this,void 0,void 0,function(){return ue(this,function(t){throw new Error("ComposableTask - run is not implemented")})})},r}();function Jo(r,t,e,n,o){return o===void 0&&(o=function(a){var i=a.alignedRect;return i}),se(this,void 0,void 0,function(){var a,i,s,u,c;return ue(this,function(l){switch(l.label){case 0:return a=r.map(function(f){return iy(f)?o(f):f.detection}),s=n,s?[3,5]:t instanceof He?[4,Ui(t,a)]:[3,2];case 1:return u=l.sent(),[3,4];case 2:return[4,Vi(t,a)];case 3:u=l.sent(),l.label=4;case 4:s=u,l.label=5;case 5:return i=s,[4,e(i)];case 6:return c=l.sent(),i.forEach(function(f){return f instanceof He&&f.dispose()}),[2,c]}})})}function $i(r,t,e,n,o){return se(this,void 0,void 0,function(){var a=this;return ue(this,function(i){return[2,Jo([r],t,function(s){return se(a,void 0,void 0,function(){return ue(this,function(u){return[2,e(s[0])]})})},n,o)]})})}function Zy(r){return te(function(){return Mt(Ze(r,3).reverse(),3)})}var uo=2,Mo=12;function e0(r,t){var e=$o(r,t),n=zi(r,t);function o(c,l){var f=Ye(r(c));return t.push({paramPath:l}),f}function a(c,l,f){f===void 0&&(f=!1);var h=e(c[0],c[1],3,l+"/conv1"),d=o(c[1],l+"/prelu1_alpha"),p=e(c[1],c[2],3,l+"/conv2"),m=o(c[2],l+"/prelu2_alpha"),v=e(c[2],c[3],f?2:3,l+"/conv3"),g=o(c[3],l+"/prelu3_alpha");return{conv1:h,prelu1_alpha:d,conv2:p,prelu2_alpha:m,conv3:v,prelu3_alpha:g}}function i(){var c=a([3,10,16,32],"pnet"),l=e(32,2,1,"pnet/conv4_1"),f=e(32,4,1,"pnet/conv4_2");return dt(dt({},c),{conv4_1:l,conv4_2:f})}function s(){var c=a([3,28,48,64],"rnet",!0),l=n(576,128,"rnet/fc1"),f=o(128,"rnet/prelu4_alpha"),h=n(128,2,"rnet/fc2_1"),d=n(128,4,"rnet/fc2_2");return dt(dt({},c),{fc1:l,prelu4_alpha:f,fc2_1:h,fc2_2:d})}function u(){var c=a([3,32,64,64],"onet"),l=e(64,128,2,"onet/conv4"),f=o(128,"onet/prelu4_alpha"),h=n(1152,256,"onet/fc1"),d=o(256,"onet/prelu5_alpha"),p=n(256,2,"onet/fc2_1"),m=n(256,4,"onet/fc2_2"),v=n(256,10,"onet/fc2_3");return dt(dt({},c),{conv4:l,prelu4_alpha:f,fc1:h,prelu5_alpha:d,fc2_1:p,fc2_2:m,fc2_3:v})}return{extractPNetParams:i,extractRNetParams:s,extractONetParams:u}}function t0(r){var t=yn(r),e=t.extractWeights,n=t.getRemainingWeights,o=[],a=e0(e,o),i=a.extractPNetParams,s=a.extractRNetParams,u=a.extractONetParams,c=i(),l=s(),f=u();if(n().length!==0)throw new Error("weights remaing after extract: "+n().length);return{params:{pnet:c,rnet:l,onet:f},paramMappings:o}}function n0(r,t){var e=Nn(r,t);function n(l){var f=e(l+"/weights",4,l+"/filters"),h=e(l+"/bias",1);return{filters:f,bias:h}}function o(l){var f=e(l+"/weights",2),h=e(l+"/bias",1);return{weights:f,bias:h}}function a(l){return e(l,1)}function i(l){var f=n(l+"/conv1"),h=a(l+"/prelu1_alpha"),d=n(l+"/conv2"),p=a(l+"/prelu2_alpha"),m=n(l+"/conv3"),v=a(l+"/prelu3_alpha");return{conv1:f,prelu1_alpha:h,conv2:d,prelu2_alpha:p,conv3:m,prelu3_alpha:v}}function s(){var l=i("pnet"),f=n("pnet/conv4_1"),h=n("pnet/conv4_2");return dt(dt({},l),{conv4_1:f,conv4_2:h})}function u(){var l=i("rnet"),f=o("rnet/fc1"),h=a("rnet/prelu4_alpha"),d=o("rnet/fc2_1"),p=o("rnet/fc2_2");return dt(dt({},l),{fc1:f,prelu4_alpha:h,fc2_1:d,fc2_2:p})}function c(){var l=i("onet"),f=n("onet/conv4"),h=a("onet/prelu4_alpha"),d=o("onet/fc1"),p=a("onet/prelu5_alpha"),m=o("onet/fc2_1"),v=o("onet/fc2_2"),g=o("onet/fc2_3");return dt(dt({},l),{conv4:f,prelu4_alpha:h,fc1:d,prelu5_alpha:p,fc2_1:m,fc2_2:v,fc2_3:g})}return{extractPNetParams:s,extractRNetParams:u,extractONetParams:c}}function r0(r){var t=[],e=n0(r,t),n=e.extractPNetParams,o=e.extractRNetParams,a=e.extractONetParams,i=n(),s=o(),u=a();return gn(r,t),{params:{pnet:i,rnet:s,onet:u},paramMappings:t}}function ni(r,t){var e=t[0],n=t[1];return{height:Math.floor(e*r),width:Math.floor(n*r)}}function o0(r,t,e){for(var n=e[0],o=e[1],a=Mo/r,i=[],s=Math.min(n,o)*a,u=0;s>=12;)i.push(a*Math.pow(t,u)),s=s*t,u+=1;return i}var Yi=function(r){be(t,r);function t(e,n,o,a){return r.call(this,{left:e,top:n,right:o,bottom:a},!0)||this}return t}(An);function El(r){return te(function(){return mt(tt(r,Z(127.5)),Z(.0078125))})}function hr(r,t){return te(function(){return Se(qe(r),mt(t,So(qe(So(r)))))})}function Ji(r,t,e){return e===void 0&&(e=!1),te(function(){var n=jt(r,t.conv1,"valid");return n=hr(n,t.prelu1_alpha),n=ot(n,e?[2,2]:[3,3],[2,2],"same"),n=jt(n,t.conv2,"valid"),n=hr(n,t.prelu2_alpha),n=e?n:ot(n,[3,3],[2,2],"valid"),n=jt(n,t.conv3,"valid"),n=hr(n,t.prelu3_alpha),n})}function a0(r,t){return te(function(){var e=Ji(r,t,!0),n=jt(e,t.conv4_1,"valid"),o=Lt(Go(n,3),3),a=pn(tt(n,o),3),i=jt(e,t.conv4_2,"valid");return{prob:a,regions:i}})}function i0(r,t){return te(function(){var e=ni(t,r.shape.slice(1)),n=e.height,o=e.width,a=Si.resizeBilinear(r,[n,o]),i=El(a);return Sn(i,[0,2,1,3])})}function s0(r,t,e,n){for(var o=[],a=r.arraySync(),i=0;i<r.shape[0];i++)for(var s=0;s<r.shape[1];s++)a[i][s]>=n&&o.push(new Me(s,i));var u=o.map(function(c){var l=new Ko(Math.round((c.y*uo+1)/e),Math.round((c.x*uo+1)/e),Math.round((c.y*uo+Mo)/e),Math.round((c.x*uo+Mo)/e)),f=a[c.y][c.x],h=t.arraySync(),d=new Yi(h[c.y][c.x][0],h[c.y][c.x][1],h[c.y][c.x][2],h[c.y][c.x][3]);return{cell:l,score:f,region:d}});return u}function u0(r,t,e,n,o){o.stage1=[];var a=t.map(function(h){return te(function(){var d={scale:h},p=i0(r,h),m=Date.now(),v=a0(p,n),g=v.prob,b=v.regions;d.pnet=Date.now()-m;var x=Ze(Ze(g,3)[1])[0],y=Ze(b)[0];return{scoresTensor:x,regionsTensor:y,scale:h,statsForScale:d}})}),i=a.map(function(h){var d=h.scoresTensor,p=h.regionsTensor,m=h.scale,v=h.statsForScale,g=s0(d,p,m,e);if(d.dispose(),p.dispose(),!g.length)return o.stage1.push(v),[];var b=Date.now(),x=Br(g.map(function(y){return y.cell}),g.map(function(y){return y.score}),.5);return v.nms=Date.now()-b,v.numBoxes=x.length,o.stage1.push(v),x.map(function(y){return g[y]})}),s=i.reduce(function(h,d){return h.concat(d)},[]),u=[],c=[];if(s.length>0){var l=Date.now(),f=Br(s.map(function(h){return h.cell}),s.map(function(h){return h.score}),.7);o.stage1_nms=Date.now()-l,c=f.map(function(h){return s[h].score}),u=f.map(function(h){return s[h]}).map(function(h){var d=h.cell,p=h.region;return new Ko(d.left+p.left*d.width,d.top+p.top*d.height,d.right+p.right*d.width,d.bottom+p.bottom*d.height).toSquare().round()})}return{boxes:u,scores:c}}function kl(r,t,e){var n=e.width,o=e.height;return se(this,void 0,void 0,function(){var a,i,s,u=this;return ue(this,function(c){switch(c.label){case 0:return a=Gn(r),[4,Promise.all(t.map(function(l){return se(u,void 0,void 0,function(){var f,h,d,p,m,v,g,b;return ue(this,function(x){return f=l.padAtBorders(r.height,r.width),h=f.y,d=f.ey,p=f.x,m=f.ex,v=p-1,g=h-1,b=a.getImageData(v,g,m-v,d-g),[2,gt.isNodejs()?Wi(b):createImageBitmap(b)]})})}))];case 1:return i=c.sent(),s=[],i.forEach(function(l){var f=Xo({width:n,height:o}),h=Gn(f);h.drawImage(l,0,0,n,o);for(var d=h.getImageData(0,0,n,o).data,p=[],m=0;m<d.length;m+=4)p.push(d[m+2]),p.push(d[m+1]),p.push(d[m]);s.push(p)}),[2,s.map(function(l){var f=te(function(){var h=Sn(wt(l,[1,n,o,3]),[0,2,1,3]).toFloat();return El(h)});return f})]}})})}function c0(r,t){return te(function(){var e=Ji(r,t),n=qt(e,[e.shape[0],t.fc1.weights.shape[0]]),o=en(n,t.fc1),a=hr(o,t.prelu4_alpha),i=en(a,t.fc2_1),s=Lt(Go(i,1),1),u=pn(tt(i,s),1),c=en(a,t.fc2_2),l=Ze(u,1)[1];return{scores:l,regions:c}})}function l0(r,t,e,n,o){return se(this,void 0,void 0,function(){var a,i,s,u,c,l,f,h,d,p,m,v,g,b;return ue(this,function(x){switch(x.label){case 0:return a=Date.now(),[4,kl(r,t,{width:24,height:24})];case 1:return i=x.sent(),o.stage2_extractImagePatches=Date.now()-a,a=Date.now(),s=i.map(function(y){var w=c0(y,n);return y.dispose(),w}),o.stage2_rnet=Date.now()-a,u=s.length>1?Qe(s.map(function(y){return y.scores})):s[0].scores,f=(l=Array).from,[4,u.data()];case 2:return c=f.apply(l,[x.sent()]),u.dispose(),h=c.map(function(y,w){return{score:y,idx:w}}).filter(function(y){return y.score>e}).map(function(y){var w=y.idx;return w}),d=h.map(function(y){return t[y]}),p=h.map(function(y){return c[y]}),m=[],v=[],d.length>0&&(a=Date.now(),g=Br(d,p,.7),o.stage2_nms=Date.now()-a,b=g.map(function(y){var w=s[h[y]].regions.arraySync();return new Yi(w[0][0],w[0][1],w[0][2],w[0][3])}),v=g.map(function(y){return p[y]}),m=g.map(function(y,w){return d[y].calibrate(b[w])})),s.forEach(function(y){y.regions.dispose(),y.scores.dispose()}),[2,{boxes:m,scores:v}]}})})}function f0(r,t){return te(function(){var e=Ji(r,t);e=ot(e,[2,2],[2,2],"same"),e=jt(e,t.conv4,"valid"),e=hr(e,t.prelu4_alpha);var n=qt(e,[e.shape[0],t.fc1.weights.shape[0]]),o=en(n,t.fc1),a=hr(o,t.prelu5_alpha),i=en(a,t.fc2_1),s=Lt(Go(i,1),1),u=pn(tt(i,s),1),c=en(a,t.fc2_2),l=en(a,t.fc2_3),f=Ze(u,1)[1];return{scores:f,regions:c,points:l}})}function h0(r,t,e,n,o){return se(this,void 0,void 0,function(){var a,i,s,u,c,l,f,h,d,p,m,v,g,b,x;return ue(this,function(y){switch(y.label){case 0:return a=Date.now(),[4,kl(r,t,{width:48,height:48})];case 1:return i=y.sent(),o.stage3_extractImagePatches=Date.now()-a,a=Date.now(),s=i.map(function(w){var _=f0(w,n);return w.dispose(),_}),o.stage3_onet=Date.now()-a,u=s.length>1?Qe(s.map(function(w){return w.scores})):s[0].scores,f=(l=Array).from,[4,u.data()];case 2:return c=f.apply(l,[y.sent()]),u.dispose(),h=c.map(function(w,_){return{score:w,idx:_}}).filter(function(w){return w.score>e}).map(function(w){var _=w.idx;return _}),d=h.map(function(w){var _=s[w].regions.arraySync();return new Yi(_[0][0],_[0][1],_[0][2],_[0][3])}),p=h.map(function(w,_){return t[w].calibrate(d[_])}),m=h.map(function(w){return c[w]}),v=[],g=[],b=[],p.length>0&&(a=Date.now(),x=Br(p,m,.7,!1),o.stage3_nms=Date.now()-a,v=x.map(function(w){return p[w]}),g=x.map(function(w){return m[w]}),b=x.map(function(w,_){return Array(5).fill(0).map(function(S,E){var k=s[w].points.arraySync();return new Me(k[0][E]*(v[_].width+1)+v[_].left,k[0][E+5]*(v[_].height+1)+v[_].top)})})),s.forEach(function(w){w.regions.dispose(),w.scores.dispose(),w.points.dispose()}),[2,{boxes:v,scores:g,points:b}]}})})}var d0=function(r){be(t,r);function t(){return r.call(this,"Mtcnn")||this}return t.prototype.load=function(e){return se(this,void 0,void 0,function(){return ue(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.load.call(this,e)]})})},t.prototype.loadFromDisk=function(e){return se(this,void 0,void 0,function(){return ue(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.loadFromDisk.call(this,e)]})})},t.prototype.forwardInput=function(e,n){return n===void 0&&(n={}),se(this,void 0,void 0,function(){var o,a,i,s,u,c,l,f,h,d,p,m,v,g,b,x,y,w,_,S,E;return ue(this,function(k){switch(k.label){case 0:if(o=this.params,!o)throw new Error("Mtcnn - load model before inference");if(a=e.canvases[0],!a)throw new Error("Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.");return i={},s=Date.now(),u=te(function(){return Zy(Lt(Pi.fromPixels(a)).toFloat())}),c=function(I){return u.dispose(),i.total=Date.now()-s,I},l=u.shape.slice(1),f=l[0],h=l[1],d=new xl(n),p=d.minFaceSize,m=d.scaleFactor,v=d.maxNumScales,g=d.scoreThresholds,b=d.scaleSteps,x=(b||o0(p,m,[f,h])).filter(function(I){var T=ni(I,[f,h]);return Math.min(T.width,T.height)>Mo}).slice(0,v),i.scales=x,i.pyramid=x.map(function(I){return ni(I,[f,h])}),y=Date.now(),[4,u0(u,x,g[0],o.pnet,i)];case 1:return w=k.sent(),i.total_stage1=Date.now()-y,w.boxes.length?(i.stage2_numInputBoxes=w.boxes.length,y=Date.now(),[4,l0(a,w.boxes,g[1],o.rnet,i)]):[2,c({results:[],stats:i})];case 2:return _=k.sent(),i.total_stage2=Date.now()-y,_.boxes.length?(i.stage3_numInputBoxes=_.boxes.length,y=Date.now(),[4,h0(a,_.boxes,g[2],o.onet,i)]):[2,c({results:[],stats:i})];case 3:return S=k.sent(),i.total_stage3=Date.now()-y,E=S.boxes.map(function(I,T){return qi(Bi({},new cn(S.scores[T],new Oi(I.left/h,I.top/f,I.width/h,I.height/f),{height:f,width:h})),new Gg(S.points[T].map(function(D){return D.sub(new Me(I.left,I.top)).div(new Me(I.width,I.height))}),{width:I.width,height:I.height}))}),[2,c({results:E,stats:i})]}})})},t.prototype.forward=function(e,n){return n===void 0&&(n={}),se(this,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,st(e)];case 1:return[4,o.apply(this,[a.sent(),n])];case 2:return[2,a.sent().results]}})})},t.prototype.forwardWithStats=function(e,n){return n===void 0&&(n={}),se(this,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,st(e)];case 1:return[2,o.apply(this,[a.sent(),n])]}})})},t.prototype.getDefaultModelName=function(){return"mtcnn_model"},t.prototype.extractParamsFromWeigthMap=function(e){return r0(e)},t.prototype.extractParams=function(e){return t0(e)},t}(mn),p0=.4,v0=[new Me(1.603231,2.094468),new Me(6.041143,7.080126),new Me(2.882459,3.518061),new Me(4.266906,5.178857),new Me(9.041765,10.66308)],m0=[117.001,114.697,97.404],g0=function(r){be(t,r);function t(){var e=this,n={withSeparableConvs:!0,iouThreshold:p0,classes:["face"],anchors:v0,meanRgb:m0,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};return e=r.call(this,n)||this,e}return Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,n){return se(this,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return[4,this.detect(e,n)];case 1:return o=a.sent(),[2,o.map(function(i){return new cn(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return"tiny_face_detector_model"},t.prototype.extractParamsFromWeigthMap=function(e){return r.prototype.extractParamsFromWeigthMap.call(this,e)},t}(_l),at={ssdMobilenetv1:new wl,tinyFaceDetector:new g0,tinyYolov2:new Qy,mtcnn:new d0,faceLandmark68Net:new pl,faceLandmark68TinyNet:new by,faceRecognitionNet:new Ry,faceExpressionNet:new ay,ageGenderNet:new vy},Rl=function(r){be(t,r);function t(e,n,o){var a=r.call(this)||this;return a.parentTask=e,a.input=n,a.extractedFaces=o,a}return t}(Xr),Qi=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o=this;return ue(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),[4,Jo(e,this.input,function(i){return se(o,void 0,void 0,function(){return ue(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return at.faceExpressionNet.predictExpressions(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=a.sent(),[2,e.map(function(i,s){return fl(i,n[s])})]}})})},t.prototype.withAgeAndGender=function(){return new ns(this,this.input)},t}(Rl),Zi=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n;return ue(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),e?[4,$i(e,this.input,function(a){return at.faceExpressionNet.predictExpressions(a)},this.extractedFaces)]:[2];case 2:return n=o.sent(),[2,fl(e,n)]}})})},t.prototype.withAgeAndGender=function(){return new rs(this,this.input)},t}(Rl),es=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new os(this,this.input)},t.prototype.withFaceDescriptors=function(){return new is(this,this.input)},t}(Qi),ts=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new as(this,this.input)},t.prototype.withFaceDescriptor=function(){return new ss(this,this.input)},t}(Zi),Il=function(r){be(t,r);function t(e,n,o){var a=r.call(this)||this;return a.parentTask=e,a.input=n,a.extractedFaces=o,a}return t}(Xr),ns=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o=this;return ue(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),[4,Jo(e,this.input,function(i){return se(o,void 0,void 0,function(){return ue(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return at.ageGenderNet.predictAgeAndGender(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=a.sent(),[2,e.map(function(i,s){var u=n[s],c=u.age,l=u.gender,f=u.genderProbability;return yl(bl(i,l,f),c)})]}})})},t.prototype.withFaceExpressions=function(){return new Qi(this,this.input)},t}(Il),rs=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o,a,i;return ue(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?[4,$i(e,this.input,function(u){return at.ageGenderNet.predictAgeAndGender(u)},this.extractedFaces)]:[2];case 2:return n=s.sent(),o=n.age,a=n.gender,i=n.genderProbability,[2,yl(bl(e,a,i),o)]}})})},t.prototype.withFaceExpressions=function(){return new Zi(this,this.input)},t}(Il),os=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new es(this,this.input)},t.prototype.withFaceDescriptors=function(){return new is(this,this.input)},t}(ns),as=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new ts(this,this.input)},t.prototype.withFaceDescriptor=function(){return new ss(this,this.input)},t}(rs),Sl=function(r){be(t,r);function t(e,n){var o=r.call(this)||this;return o.parentTask=e,o.input=n,o}return t}(Xr),is=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n;return ue(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),[4,Jo(e,this.input,function(a){return Promise.all(a.map(function(i){return at.faceRecognitionNet.computeFaceDescriptor(i)}))},null,function(a){return a.landmarks.align(null,{useDlibAlignment:!0})})];case 2:return n=o.sent(),[2,n.map(function(a,i){return gl(e[i],a)})]}})})},t.prototype.withFaceExpressions=function(){return new es(this,this.input)},t.prototype.withAgeAndGender=function(){return new os(this,this.input)},t}(Sl),ss=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n;return ue(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),e?[4,$i(e,this.input,function(a){return at.faceRecognitionNet.computeFaceDescriptor(a)},null,function(a){return a.landmarks.align(null,{useDlibAlignment:!0})})]:[2];case 2:return n=o.sent(),[2,gl(e,n)]}})})},t.prototype.withFaceExpressions=function(){return new ts(this,this.input)},t.prototype.withAgeAndGender=function(){return new as(this,this.input)},t}(Sl),Al=function(r){be(t,r);function t(e,n,o){var a=r.call(this)||this;return a.parentTask=e,a.input=n,a.useTinyLandmarkNet=o,a}return Object.defineProperty(t.prototype,"landmarkNet",{get:function(){return this.useTinyLandmarkNet?at.faceLandmark68TinyNet:at.faceLandmark68Net},enumerable:!0,configurable:!0}),t}(Xr),y0=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o,a,i,s=this;return ue(this,function(u){switch(u.label){case 0:return[4,this.parentTask];case 1:return e=u.sent(),n=e.map(function(c){return c.detection}),this.input instanceof He?[4,Ui(this.input,n)]:[3,3];case 2:return a=u.sent(),[3,5];case 3:return[4,Vi(this.input,n)];case 4:a=u.sent(),u.label=5;case 5:return o=a,[4,Promise.all(o.map(function(c){return s.landmarkNet.detectLandmarks(c)}))];case 6:return i=u.sent(),o.forEach(function(c){return c instanceof He&&c.dispose()}),[2,e.map(function(c,l){return qi(c,i[l])})]}})})},t.prototype.withFaceExpressions=function(){return new es(this,this.input)},t.prototype.withAgeAndGender=function(){return new os(this,this.input)},t.prototype.withFaceDescriptors=function(){return new is(this,this.input)},t}(Al),b0=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o,a,i;return ue(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?(n=e.detection,this.input instanceof He?[4,Ui(this.input,[n])]:[3,3]):[2];case 2:return a=s.sent(),[3,5];case 3:return[4,Vi(this.input,[n])];case 4:a=s.sent(),s.label=5;case 5:return o=a,[4,this.landmarkNet.detectLandmarks(o[0])];case 6:return i=s.sent(),o.forEach(function(u){return u instanceof He&&u.dispose()}),[2,qi(e,i)]}})})},t.prototype.withFaceExpressions=function(){return new ts(this,this.input)},t.prototype.withAgeAndGender=function(){return new as(this,this.input)},t.prototype.withFaceDescriptor=function(){return new ss(this,this.input)},t}(Al),Dl=function(r){be(t,r);function t(e,n){n===void 0&&(n=new Yo);var o=r.call(this)||this;return o.input=e,o.options=n,o}return t}(Xr),x0=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n,o,a;return ue(this,function(i){switch(i.label){case 0:return e=this,n=e.input,o=e.options,o instanceof xl?[4,at.mtcnn.forward(n,o)]:[3,2];case 1:return[2,i.sent().map(function(s){return s.detection})];case 2:if(a=o instanceof Cl?function(s){return at.tinyFaceDetector.locateFaces(s,o)}:o instanceof Yo?function(s){return at.ssdMobilenetv1.locateFaces(s,o)}:o instanceof Xi?function(s){return at.tinyYolov2.locateFaces(s,o)}:null,!a)throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options");return[2,a(n)]}})})},t.prototype.runAndExtendWithFaceDetections=function(){var e=this;return new Promise(function(n){return se(e,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return[4,this.run()];case 1:return o=a.sent(),[2,n(o.map(function(i){return Bi({},i)}))]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new y0(this.runAndExtendWithFaceDetections(),this.input,e)},t.prototype.withFaceExpressions=function(){return new Qi(this.runAndExtendWithFaceDetections(),this.input)},t.prototype.withAgeAndGender=function(){return new ns(this.runAndExtendWithFaceDetections(),this.input)},t}(Dl),w0=function(r){be(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return se(this,void 0,void 0,function(){var e,n;return ue(this,function(o){switch(o.label){case 0:return[4,new x0(this.input,this.options)];case 1:return e=o.sent(),n=e[0],e.forEach(function(a){a.score>n.score&&(n=a)}),[2,n]}})})},t.prototype.runAndExtendWithFaceDetection=function(){var e=this;return new Promise(function(n){return se(e,void 0,void 0,function(){var o;return ue(this,function(a){switch(a.label){case 0:return[4,this.run()];case 1:return o=a.sent(),[2,n(o?Bi({},o):void 0)]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new b0(this.runAndExtendWithFaceDetection(),this.input,e)},t.prototype.withFaceExpressions=function(){return new Zi(this.runAndExtendWithFaceDetection(),this.input)},t.prototype.withAgeAndGender=function(){return new rs(this.runAndExtendWithFaceDetection(),this.input)},t}(Dl);function _0(r,t){return t===void 0&&(t=new Yo),new w0(r,t)}function C0(r,t){if(r.length!==t.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");var e=Array.from(r),n=Array.from(t);return Math.sqrt(e.map(function(o,a){return o-n[a]}).reduce(function(o,a){return o+Math.pow(a,2)},0))}(function(){function r(t,e){e===void 0&&(e=.6),this._distanceThreshold=e;var n=Array.isArray(t)?t:[t];if(!n.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");var o=1,a=function(){return"person "+o++};this._labeledDescriptors=n.map(function(i){if(i instanceof oo)return i;if(i instanceof Float32Array)return new oo(a(),[i]);if(i.descriptor&&i.descriptor instanceof Float32Array)return new oo(a(),[i.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}return Object.defineProperty(r.prototype,"labeledDescriptors",{get:function(){return this._labeledDescriptors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distanceThreshold",{get:function(){return this._distanceThreshold},enumerable:!0,configurable:!0}),r.prototype.computeMeanDistance=function(t,e){return e.map(function(n){return C0(n,t)}).reduce(function(n,o){return n+o},0)/(e.length||1)},r.prototype.matchDescriptor=function(t){var e=this;return this.labeledDescriptors.map(function(n){var o=n.descriptors,a=n.label;return new au(a,e.computeMeanDistance(t,o))}).reduce(function(n,o){return n.distance<o.distance?n:o})},r.prototype.findBestMatch=function(t){var e=this.matchDescriptor(t);return e.distance<this.distanceThreshold?e:new au("unknown",e.distance)},r.prototype.toJSON=function(){return{distanceThreshold:this.distanceThreshold,labeledDescriptors:this.labeledDescriptors.map(function(t){return t.toJSON()})}},r.fromJSON=function(t){var e=t.labeledDescriptors.map(function(n){return oo.fromJSON(n)});return new r(e,t.distanceThreshold)},r})();const Da=[{title:"工作台与数据",perms:[["dashboardView","查看工作台数据"],["extract","职称信息提取与登记"],["financeExtract","财税信息提取与登记"],["editConsult","录入今日咨询量"],["reconcileExport","导出月度财务对账单"],["feedbackManage","销售异常线索核实与重发"]]},{title:"客户登记表管理",perms:[["viewData","查看职称登记表"],["edit","修改职称客户数据"],["delete","删除职称客户记录"],["exportExcel","导出职称Excel"],["clearTable","清空职称登记表"],["markInvalid","标记无效咨询"],["financeView","查看财税登记表"],["financeEdit","修改财税客户数据"],["financeDelete","删除财税客户记录"],["financeExportExcel","导出财税Excel"],["financeClear","清空财税登记表"]]},{title:"运营管理",perms:[["taskManage","任务管理"],["qrGen","无痕码生成"]]}],E0={class:"customer-config-page"},k0={class:"config-add-row mobile-config-add-row"},R0={key:0,class:"config-value-list"},I0={__name:"CustomerConfigSettings",setup(r){const t=ve("degree"),e=ve(""),n=ve({degree:[],major:[],applyLevel:[],store:[]}),o=[{key:"degree",label:"学历"},{key:"major",label:"专业"},{key:"applyLevel",label:"申报级别"},{key:"store",label:"店铺"}],a=Bt(()=>n.value[t.value]||[]);async function i(){const c=await na.configs();n.value={degree:c.degree||[],major:c.major||[],applyLevel:c.applyLevel||[],store:c.store||[]}}async function s(){const c=e.value.trim();if(c)try{const l=await na.addConfig(t.value,c);n.value[t.value]=l.values||[],e.value="",Pe.success("已新增配置")}catch(l){Pe.error(l.message||"新增失败")}}async function u(c){try{await ri.confirm(`确定删除配置“${c}”？`,"删除配置",{type:"warning"});const l=await na.removeConfig(t.value,c);n.value[t.value]=l.values||[],Pe.success("已删除")}catch(l){l!=="cancel"&&l!=="close"&&Pe.error(l.message||"删除失败")}}return Lr(()=>i().catch(c=>Pe.error(c.message||"加载配置失败"))),(c,l)=>{const f=he("el-input"),h=he("el-button"),d=he("el-tag"),p=he("el-empty"),m=he("el-tab-pane"),v=he("el-tabs"),g=he("el-card");return ee(),fe("section",E0,[l[4]||(l[4]=M("div",{class:"settings-section-title"},"客户配置",-1)),B(g,{shadow:"never",class:"settings-card"},{header:H(()=>[...l[2]||(l[2]=[M("div",{class:"panel-head"},[M("div",null,[M("div",{class:"settings-row-label"},"客户字段选项"),M("div",{class:"settings-row-desc"},"维护登记表中学历、专业、申报级别和店铺的下拉选项")])],-1)])]),default:H(()=>[B(v,{modelValue:t.value,"onUpdate:modelValue":l[1]||(l[1]=b=>t.value=b),class:"customer-config-tabs",stretch:""},{default:H(()=>[(ee(),fe(rt,null,Ot(o,b=>B(m,{key:b.key,label:b.label,name:b.key},{default:H(()=>[M("div",k0,[B(f,{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=x=>e.value=x),placeholder:`新增${b.label}`,onKeyup:fu(s,["enter"])},null,8,["modelValue","placeholder"]),B(h,{type:"primary",disabled:!e.value.trim(),onClick:s},{default:H(()=>[...l[3]||(l[3]=[ke("新增",-1)])]),_:1},8,["disabled"])]),a.value.length?(ee(),fe("div",R0,[(ee(!0),fe(rt,null,Ot(a.value,x=>(ee(),Xe(d,{key:x,closable:"",onClose:y=>u(x)},{default:H(()=>[ke(le(x),1)]),_:2},1032,["onClose"]))),128))])):(ee(),Xe(p,{key:1,description:"暂无配置项","image-size":72}))]),_:2},1032,["label","name"])),64))]),_:1},8,["modelValue"])]),_:1})])}}},S0={class:"customer-config-page"},A0={class:"config-add-row mobile-config-add-row"},D0={key:0,class:"config-value-list"},T0={__name:"FinanceConfigSettings",setup(r){const t=ve("stores"),e=ve(""),n=ve({stores:[],serviceTypes:[],taxpayerTypes:[]}),o=[{key:"stores",label:"财税店铺"},{key:"serviceTypes",label:"业务类型"},{key:"taxpayerTypes",label:"纳税性质"}],a=Bt(()=>n.value[t.value]||[]);async function i(){var c,l;try{const f=await Fl.configs();n.value={stores:f.stores||[],serviceTypes:((c=f.configs)==null?void 0:c.serviceTypes)||[],taxpayerTypes:((l=f.configs)==null?void 0:l.taxpayerTypes)||[]}}catch(f){Pe.error(f.message||"加载财税配置失败")}}async function s(){const c=e.value.trim();if(c)try{const l=await cs("POST",`/api/finance-configs/${t.value}`,{value:c});l.values?n.value[t.value]=l.values:await i(),e.value="",Pe.success("已新增配置")}catch(l){Pe.error(l.message||"新增失败")}}async function u(c){try{await ri.confirm(`确定删除配置“${c}”？`,"删除配置",{type:"warning"});const l=await cs("DELETE",`/api/finance-configs/${t.value}?value=${encodeURIComponent(c)}`);l.values?n.value[t.value]=l.values:await i(),Pe.success("已删除")}catch(l){l!=="cancel"&&l!=="close"&&Pe.error(l.message||"删除失败")}}return Lr(i),(c,l)=>{const f=he("el-input"),h=he("el-button"),d=he("el-tag"),p=he("el-empty"),m=he("el-tab-pane"),v=he("el-tabs"),g=he("el-card");return ee(),fe("section",S0,[l[4]||(l[4]=M("div",{class:"settings-section-title"},"财税配置",-1)),B(g,{shadow:"never",class:"settings-card"},{header:H(()=>[...l[2]||(l[2]=[M("div",{class:"panel-head"},[M("div",null,[M("div",{class:"settings-row-label"},"财税字段与来源店铺"),M("div",{class:"settings-row-desc"},"维护财税登记表中的店铺来源、业务类型和纳税人性质")])],-1)])]),default:H(()=>[B(v,{modelValue:t.value,"onUpdate:modelValue":l[1]||(l[1]=b=>t.value=b),class:"customer-config-tabs",stretch:""},{default:H(()=>[(ee(),fe(rt,null,Ot(o,b=>B(m,{key:b.key,label:b.label,name:b.key},{default:H(()=>[M("div",A0,[B(f,{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=x=>e.value=x),placeholder:`新增${b.label}`,onKeyup:fu(s,["enter"])},null,8,["modelValue","placeholder"]),B(h,{type:"primary",disabled:!e.value.trim(),onClick:s},{default:H(()=>[...l[3]||(l[3]=[ke("新增",-1)])]),_:1},8,["disabled"])]),a.value.length?(ee(),fe("div",D0,[(ee(!0),fe(rt,null,Ot(a.value,x=>(ee(),Xe(d,{key:x,closable:"",onClose:y=>u(x)},{default:H(()=>[ke(le(x),1)]),_:2},1032,["onClose"]))),128))])):(ee(),Xe(p,{key:1,description:"暂无配置项","image-size":72}))]),_:2},1032,["label","name"])),64))]),_:1},8,["modelValue"])]),_:1})])}}},N0=hu(T0,[["__scopeId","data-v-c0e0ce37"]]),F0={class:"sync-settings"},P0={class:"sync-card-head"},M0={class:"sync-status"},O0={class:"sync-enable-row"},B0={class:"sync-action-bar"},L0={class:"sync-token-note"},W0={key:0},V0={key:1},U0={key:2},z0={class:"sync-action-buttons"},G0={class:"sync-card-head"},H0={class:"sync-selected-count"},q0={class:"sync-card-head"},j0={class:"sync-queue-actions"},K0={class:"sync-selected-count"},X0={class:"sync-detail-text"},$0={key:1,class:"mobile-list sync-queue-mobile-list"},Y0=["onClick"],J0={class:"customer-summary-date"},Q0={class:"customer-summary-phone"},Z0={class:"customer-summary-info"},e1={class:"customer-summary-store"},t1={key:0,class:"customer-mobile-details sync-queue-mobile-details"},n1={class:"customer-detail-grid"},r1={key:0},o1={key:1,class:"customer-detail-wide"},a1={class:"sync-error-text"},i1={key:0,class:"mobile-load-more"},s1={key:1,class:"mobile-load-more muted-text"},u1={__name:"WukongSyncSettings",setup(r){const{isMobile:t}=oi(),e=ve([]),n=ve(!1),o=ve(!1),a=ve(!1),i=ve([]),s=ve(0),u=ve(0),c=ve(1),l=ve(20),f=[10,20,50,100],h=ve(!1),d=ve(null),p=ve(!1),m=ve([]),v=co({enabled:!0,baseUrl:"",username:"",password:"",hasPassword:!1,hasToken:!1,tokenUpdatedAt:"",tokenStatus:"missing",tokenCheckedAt:"",syncStores:[]}),g=Bt(()=>({valid:"Token 正常",expired:"Token 已过期",missing:"未获取 Token"})[v.tokenStatus]||"未连接");function b(O={}){v.enabled=!!O.enabled,v.baseUrl=O.baseUrl||"",v.username=O.username||"",v.password="",v.hasPassword=!!O.hasPassword,v.hasToken=!!O.hasToken,v.tokenUpdatedAt=O.tokenUpdatedAt||"",v.tokenStatus=O.tokenStatus||(O.hasToken?"valid":"missing"),v.tokenCheckedAt=O.tokenCheckedAt||"",v.syncStores=Array.isArray(O.syncStores)?O.syncStores:[],m.value=[...v.syncStores]}function x(){return{enabled:v.enabled,baseUrl:v.baseUrl,username:v.username,password:v.password,syncStores:v.syncStores}}function y(O){const P=new Date(O);return Number.isNaN(P.getTime())?O:P.toLocaleString("zh-CN",{hour12:!1})}async function w(){try{const O=await Pn.settings();e.value=O.stores||[],b(O.settings);const P=await Pn.validateToken();b(P.settings),await _({reset:!0})}catch(O){Pe.error(O.message||"加载同步设置失败")}}async function _(O={}){const P=!!O.append;!!O.reset&&(c.value=1),P&&(h.value=!0);try{const j=await Pn.queue(c.value,l.value),K=j.queue||[];i.value=P?[...i.value,...K]:K,s.value=j.total||0,u.value=j.pendingCount||0,j.page&&j.page!==c.value&&(c.value=j.page)}catch(j){Pe.error(j.message||"加载同步队列失败")}finally{h.value=!1}}function S(O){const P=String(O||"").match(/(\d{4})-(\d{2})-(\d{2})/);return P?`${P[2]}-${P[3]}`:String(O||"-").slice(0,5)}function E(O){d.value=d.value===O?null:O}function k(){!t.value||h.value||i.value.length>=s.value||window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-180&&(c.value+=1,_({append:!0}))}function I(O){return{pending:"待同步",failed:"同步失败",synced:"已同步"}[O]||"待处理"}function T(O){return{pending:"warning",failed:"danger",synced:"success"}[O]||"info"}async function D(){a.value=!0;try{const P=(await Pn.runQueue()).summary||{};Pe.success(`同步完成：成功 ${P.success||0} 条，失败 ${P.failed||0} 条，跳过 ${P.skipped||0} 条`),await _({reset:!0})}catch(O){Pe.error(O.message||"同步失败")}finally{a.value=!1}}async function U(){n.value=!0;try{const O=await Pn.saveSettings(x());b(O.settings),Pe.success("同步设置已保存")}catch(O){Pe.error(O.message||"保存失败")}finally{n.value=!1}}async function V(){p.value=!0;try{const O=await Pn.saveSettings({syncStores:v.syncStores});b(O.settings),Pe.success("同步店铺已更新")}catch(O){v.syncStores=[...m.value],Pe.error(O.message||"更新同步店铺失败")}finally{p.value=!1}}async function z(){o.value=!0;try{const O=await Pn.fetchToken(x());b(O.settings),Pe.success("已获取悟空CRM Token")}catch(O){Pe.error(O.message||"获取Token失败")}finally{o.value=!1}}return Lr(()=>{w(),window.addEventListener("scroll",k,{passive:!0})}),du(()=>window.removeEventListener("scroll",k)),(O,P)=>{const q=he("el-switch"),j=he("el-divider"),K=he("el-input"),J=he("el-form-item"),ne=he("el-col"),ce=he("el-row"),de=he("el-form"),ge=he("el-button"),ye=he("el-card"),Ie=he("el-checkbox"),_e=he("el-checkbox-group"),Re=he("el-empty"),Fe=he("el-table-column"),Ee=he("el-tag"),Ne=he("el-table"),De=he("el-icon"),Le=he("el-pagination");return ee(),fe("section",F0,[P[23]||(P[23]=M("div",{class:"settings-section-title"},"同步设置",-1)),B(ye,{shadow:"never",class:"settings-card sync-connection-card"},{header:H(()=>[M("div",P0,[P[7]||(P[7]=M("div",null,[M("div",{class:"settings-row-label"},"悟空CRM连接"),M("div",{class:"settings-row-desc"},"使用 CRM 账号获取 Token，凭据仅在服务器加密保存")],-1)),M("div",M0,[M("span",{class:dr(["sync-status-dot",{connected:v.tokenStatus==="valid",expired:v.tokenStatus==="expired"}])},null,2),M("span",null,le(g.value),1)])])]),default:H(()=>[M("div",O0,[P[8]||(P[8]=M("div",null,[M("div",{class:"settings-row-label"},"启用客户同步"),M("div",{class:"settings-row-desc"},"新登记客户会进入同步队列，按已选店铺手动同步至悟空CRM")],-1)),B(q,{modelValue:v.enabled,"onUpdate:modelValue":P[0]||(P[0]=Q=>v.enabled=Q)},null,8,["modelValue"])]),B(j),B(de,{"label-position":"top",class:"sync-form"},{default:H(()=>[B(ce,{gutter:16},{default:H(()=>[B(ne,{xs:24,md:24},{default:H(()=>[B(J,{label:"悟空CRM地址"},{default:H(()=>[B(K,{modelValue:v.baseUrl,"onUpdate:modelValue":P[1]||(P[1]=Q=>v.baseUrl=Q),placeholder:"例如：https://scrm.zctom.com（也可粘贴登录地址）",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),B(ne,{xs:24,sm:12},{default:H(()=>[B(J,{label:"CRM账号"},{default:H(()=>[B(K,{modelValue:v.username,"onUpdate:modelValue":P[2]||(P[2]=Q=>v.username=Q),autocomplete:"off",placeholder:"请输入登录账号",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),B(ne,{xs:24,sm:12},{default:H(()=>[B(J,{label:"CRM密码"},{default:H(()=>[B(K,{modelValue:v.password,"onUpdate:modelValue":P[3]||(P[3]=Q=>v.password=Q),type:"password","show-password":"",autocomplete:"new-password",placeholder:v.hasPassword?"已保存，留空则不修改":"请输入登录密码"},null,8,["modelValue","placeholder"])]),_:1})]),_:1})]),_:1})]),_:1}),M("div",B0,[M("div",L0,[v.tokenCheckedAt?(ee(),fe("span",W0,"最近校验："+le(y(v.tokenCheckedAt)),1)):v.tokenUpdatedAt?(ee(),fe("span",V0,"最近获取："+le(y(v.tokenUpdatedAt)),1)):(ee(),fe("span",U0,"保存账号信息后获取 Token"))]),M("div",z0,[B(ge,{loading:n.value,onClick:U},{default:H(()=>[...P[9]||(P[9]=[ke("保存设置",-1)])]),_:1},8,["loading"]),B(ge,{type:"primary",loading:o.value,onClick:z},{default:H(()=>[...P[10]||(P[10]=[ke("获取 Token",-1)])]),_:1},8,["loading"])])])]),_:1}),B(ye,{shadow:"never",class:"settings-card sync-scope-card"},{header:H(()=>[M("div",G0,[P[11]||(P[11]=M("div",null,[M("div",{class:"settings-row-label"},"同步范围"),M("div",{class:"settings-row-desc"},"仅同步分配至下列店铺的新客户；未勾选店铺不会发送到 CRM")],-1)),M("span",H0,"已选 "+le(v.syncStores.length)+" 个店铺",1)])]),default:H(()=>[B(_e,{modelValue:v.syncStores,"onUpdate:modelValue":P[4]||(P[4]=Q=>v.syncStores=Q),class:"store-selection-grid",onChange:V},{default:H(()=>[(ee(!0),fe(rt,null,Ot(e.value,Q=>(ee(),Xe(Ie,{key:Q,label:Q,border:"",disabled:p.value},{default:H(()=>[ke(le(Q),1)]),_:2},1032,["label","disabled"]))),128))]),_:1},8,["modelValue"]),e.value.length?Ue("",!0):(ee(),Xe(Re,{key:0,"image-size":72,description:"请先在客户配置中维护店铺"}))]),_:1}),B(ye,{shadow:"never",class:"settings-card sync-queue-card"},{header:H(()=>[M("div",q0,[P[13]||(P[13]=M("div",null,[M("div",{class:"settings-row-label"},"待同步客户"),M("div",{class:"settings-row-desc"},"新登记客户先进入队列，成功同步后会保留“已同步”标记")],-1)),M("div",j0,[M("span",K0,"未同步 "+le(u.value)+" 条",1),B(ge,{type:"primary",icon:we(Ol),loading:a.value,disabled:!u.value,onClick:D},{default:H(()=>[...P[12]||(P[12]=[ke("开始同步",-1)])]),_:1},8,["icon","loading","disabled"])])])]),default:H(()=>[we(t)?(ee(),fe("div",$0,[(ee(!0),fe(rt,null,Ot(i.value,Q=>(ee(),fe("article",{key:Q.id,class:dr(["customer-card customer-mobile-card sync-queue-mobile-row",{expanded:d.value===Q.id}])},[M("button",{class:"customer-mobile-summary",onClick:We=>E(Q.id)},[M("span",J0,le(S(Q.createdAt)),1),M("span",Q0,le(Q.phone||"无电话"),1),M("span",Z0,le(Q.customerName||"-"),1),M("strong",e1,le(Q.assignedTo||"未分配"),1),B(De,{class:"customer-summary-arrow"},{default:H(()=>[d.value===Q.id?(ee(),Xe(we(Pl),{key:0})):(ee(),Xe(we(Ml),{key:1}))]),_:2},1024)],8,Y0),d.value===Q.id?(ee(),fe("div",t1,[M("div",n1,[M("div",null,[P[14]||(P[14]=M("span",null,"客户",-1)),M("strong",null,le(Q.customerName||"-"),1)]),M("div",null,[P[15]||(P[15]=M("span",null,"状态",-1)),M("strong",null,[B(Ee,{type:T(Q.status),size:"small"},{default:H(()=>[ke(le(I(Q.status)),1)]),_:2},1032,["type"])])]),M("div",null,[P[16]||(P[16]=M("span",null,"电话",-1)),M("strong",null,le(Q.phone||"-"),1)]),M("div",null,[P[17]||(P[17]=M("span",null,"分配店铺",-1)),M("strong",null,le(Q.assignedTo||"-"),1)]),M("div",null,[P[18]||(P[18]=M("span",null,"尝试次数",-1)),M("strong",null,le(Q.attempts||0)+" 次",1)]),M("div",null,[P[19]||(P[19]=M("span",null,"创建时间",-1)),M("strong",null,le(y(Q.createdAt)),1)]),Q.syncedAt?(ee(),fe("div",r1,[P[20]||(P[20]=M("span",null,"同步时间",-1)),M("strong",null,le(y(Q.syncedAt)),1)])):Ue("",!0),Q.lastError?(ee(),fe("div",o1,[P[21]||(P[21]=M("span",null,"同步说明",-1)),M("strong",a1,le(Q.lastError),1)])):Ue("",!0)])])):Ue("",!0)],2))),128)),h.value?(ee(),fe("div",i1,[B(De,{class:"is-loading"},{default:H(()=>[B(we(Na))]),_:1}),P[22]||(P[22]=M("span",null,"正在加载更多客户",-1))])):i.value.length&&i.value.length>=s.value?(ee(),fe("div",s1,"已加载全部客户")):Ue("",!0)])):(ee(),Xe(Ne,{key:0,data:i.value,border:"",class:"settings-table sync-queue-table"},{default:H(()=>[B(Fe,{label:"客户","min-width":"130"},{default:H(({row:Q})=>[ke(le(Q.customerName||"-"),1)]),_:1}),B(Fe,{prop:"phone",label:"电话","min-width":"130"}),B(Fe,{prop:"assignedTo",label:"店铺","min-width":"120"}),B(Fe,{label:"状态",width:"110"},{default:H(({row:Q})=>[B(Ee,{type:T(Q.status),size:"small"},{default:H(()=>[ke(le(I(Q.status)),1)]),_:2},1032,["type"])]),_:1}),B(Fe,{label:"尝试次数",width:"100"},{default:H(({row:Q})=>[ke(le(Q.attempts||0),1)]),_:1}),B(Fe,{label:"创建时间","min-width":"170"},{default:H(({row:Q})=>[ke(le(y(Q.createdAt)),1)]),_:1}),B(Fe,{label:"同步说明","min-width":"260","class-name":"sync-detail-cell"},{default:H(({row:Q})=>[M("div",X0,le(Q.lastError||(Q.syncedAt?`同步于 ${y(Q.syncedAt)}`:"-")),1)]),_:1})]),_:1},8,["data"])),i.value.length?Ue("",!0):(ee(),Xe(Re,{key:2,"image-size":72,description:"暂无同步记录"})),s.value&&!we(t)?(ee(),Xe(Le,{key:3,"current-page":c.value,"onUpdate:currentPage":P[5]||(P[5]=Q=>c.value=Q),"page-size":l.value,"onUpdate:pageSize":P[6]||(P[6]=Q=>l.value=Q),layout:"total, sizes, prev, pager, next","page-sizes":f,total:s.value,background:"",class:"pager",onCurrentChange:_,onSizeChange:_},null,8,["current-page","page-size","total"])):Ue("",!0)]),_:1})])}}},c1={class:"face-enroll-body"},l1={class:"face-enroll-camera-wrap"},f1={key:0,class:"face-enroll-tip"},h1={key:0,class:"danger-text"},d1={key:1,class:"face-enroll-overlay"},p1={class:"face-enroll-overlay-text"},v1={key:2,class:"face-enroll-frame"},m1={key:3,class:"face-enroll-detected-badge"},g1={class:"face-enroll-status"},y1={key:0,class:"face-enroll-model-tip"},b1={class:"face-enroll-actions"},x1={key:0,class:"face-enroll-existing"},Ta="https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights",w1={__name:"FaceEnroll",props:{modelValue:Boolean,targetUser:Object},emits:["update:modelValue","enrolled"],setup(r,{emit:t}){const e=r,n=t,{isMobile:o}=oi(),a=Bt({get:()=>e.modelValue,set:E=>n("update:modelValue",E)}),i=ve(null),s=ve(!1),u=ve(""),c=ve(!1),l=ve(!1),f=ve(""),h=ve(""),d=ve(!1),p=ve(!1);let m=null;const v=Bt(()=>e.targetUser?p.value?`重新录入人脸 - ${e.targetUser.name}`:`录入人脸 - ${e.targetUser.name}`:"录入人脸"),g=Bt(()=>location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1");async function b(){if(!c.value)try{await at.tinyFaceDetector.loadFromUri(Ta),await at.faceLandmark68Net.loadFromUri(Ta),await at.faceRecognitionNet.loadFromUri(Ta),c.value=!0}catch{try{await at.tinyFaceDetector.loadFromUri("/weights"),await at.faceLandmark68Net.loadFromUri("/weights"),await at.faceRecognitionNet.loadFromUri("/weights"),c.value=!0}catch{u.value="人脸识别模型加载失败，请检查网络"}}}async function x(){if(!g.value){u.value="需要HTTPS环境";return}try{m=await navigator.mediaDevices.getUserMedia({video:{width:480,height:360,facingMode:"user"}}),i.value&&(i.value.srcObject=m,i.value.onloadedmetadata=()=>{s.value=!0})}catch(E){u.value="无法访问摄像头: "+(E.message||"请允许摄像头权限")}}function y(){m&&(m.getTracks().forEach(E=>E.stop()),m=null),s.value=!1,d.value=!1}async function w(){if(!(!s.value||!c.value||!e.targetUser)){l.value=!0,f.value="";try{const E=await _0(i.value,new Cl).withFaceLandmarks().withFaceDescriptor();if(!E){f.value="未检测到人脸，请正对摄像头",h.value="error";return}const k=Array.from(E.descriptor);await Fa.addEmployee({name:e.targetUser.name||e.targetUser.username,userId:e.targetUser.id,descriptor:k}),p.value=!0,f.value=`${e.targetUser.name||e.targetUser.username} 人脸录入成功！`,h.value="success",n("enrolled",e.targetUser.id),setTimeout(()=>{a.value=!1},1500)}catch(E){f.value=E.message||"录入失败",h.value="error"}finally{l.value=!1}}}function _(){y(),f.value=""}async function S(){if(e.targetUser)try{const k=(await Fa.employees()).employees||[];p.value=k.some(I=>I.userId===e.targetUser.id)}catch{p.value=!1}}return lo(a,async E=>{E?(f.value="",u.value="",await S(),await b(),await x()):y()}),Lr(()=>{b()}),du(()=>{y()}),(E,k)=>{const I=he("el-icon"),T=he("el-button"),D=he("el-dialog");return ee(),Xe(D,{modelValue:a.value,"onUpdate:modelValue":k[1]||(k[1]=U=>a.value=U),title:v.value,width:we(o)?"94%":"480px",top:we(o)?"8vh":"15vh","close-on-click-modal":!1,class:"responsive-dialog face-enroll-dialog",onClose:_},{default:H(()=>{var U;return[M("div",c1,[M("div",l1,[M("video",{ref_key:"videoEl",ref:i,autoplay:"",muted:"",playsinline:"",class:dr(["face-enroll-video",{ready:s.value}])},null,2),s.value?Ue("",!0):(ee(),fe("div",f1,[B(I,{size:"28"},{default:H(()=>[B(we(Bl))]),_:1}),M("p",null,le(u.value||"正在启动摄像头..."),1),g.value?Ue("",!0):(ee(),fe("p",h1,"人脸录入需要HTTPS环境"))])),l.value?(ee(),fe("div",d1,[M("div",p1,[B(I,{class:"is-loading",size:"24"},{default:H(()=>[B(we(Na))]),_:1}),k[2]||(k[2]=M("span",null,"正在采集人脸数据...",-1))])])):Ue("",!0),s.value?(ee(),fe("div",v1)):Ue("",!0),d.value&&s.value?(ee(),fe("div",m1,"✓ 已检测到人脸")):Ue("",!0)]),M("div",g1,[!c.value&&!u.value?(ee(),fe("div",y1,[B(I,{class:"is-loading"},{default:H(()=>[B(we(Na))]),_:1}),k[3]||(k[3]=ke(" 正在加载人脸识别模型... ",-1))])):Ue("",!0),f.value?(ee(),fe("div",{key:1,class:dr(["face-enroll-msg",h.value])},le(f.value),3)):Ue("",!0)]),M("div",b1,[B(T,{onClick:k[0]||(k[0]=V=>a.value=!1)},{default:H(()=>[...k[4]||(k[4]=[ke("取消",-1)])]),_:1}),B(T,{type:"primary",loading:l.value,disabled:!s.value||!c.value,onClick:w},{default:H(()=>[ke(le(p.value?"重新采集":"采集并录入"),1)]),_:1},8,["loading","disabled"])]),p.value?(ee(),fe("div",x1,[B(I,null,{default:H(()=>[B(we(Ll))]),_:1}),M("span",null,le((U=r.targetUser)==null?void 0:U.name)+" 已录入人脸数据",1)])):Ue("",!0)])]}),_:1},8,["modelValue","title","width","top"])}}},_1=hu(w1,[["__scopeId","data-v-1ea7f129"]]),C1={key:0,class:"mobile-settings-home"},E1={class:"mobile-settings-group"},k1={class:"mobile-settings-icon icon-blue"},R1={class:"mobile-settings-group"},I1={class:"mobile-settings-icon icon-green"},S1={class:"mobile-settings-icon icon-orange"},A1={class:"mobile-settings-icon icon-green"},D1={class:"mobile-settings-icon icon-purple"},T1={class:"mobile-settings-icon icon-violet"},N1={class:"mobile-settings-group"},F1={class:"mobile-settings-item static-item"},P1={class:"mobile-settings-icon icon-gray"},M1={class:"mobile-settings-item static-item"},O1={class:"mobile-settings-icon icon-gray"},B1={class:"mobile-settings-icon icon-red"},L1={class:"settings-row"},W1={class:"panel-head"},V1={class:"settings-toolbar"},U1={class:"muted-text"},z1={key:1,class:"mobile-list"},G1={class:"card-main"},H1={class:"card-foot"},q1={key:1,class:"mobile-list"},j1={class:"card-main"},K1={class:"card-foot"},X1={class:"settings-toolbar"},$1={key:1,class:"mobile-list settings-log-list"},Y1={class:"card-main"},J1={class:"muted-text"},Q1={class:"card-foot"},Z1={class:"settings-dialog-actions"},eb={class:"account-admin-toggle"},tb={key:0,class:"perm-tree"},nb=["onClick"],rb={class:"toggle-icon"},ob={class:"group-count"},ab={class:"perm-tree-body"},ib={class:"perm-tree-footer"},sb={class:"account-dialog-actions"},ub={class:"settings-dialog-actions"},lb={__name:"SettingsView",props:{user:Object,hasPerm:Function},emits:["user-updated","logout"],setup(r,{emit:t}){const e=r,n=t,{isMobile:o}=oi(),a=Vl(),i=Ul(),s=Bt(()=>a.meta.section||"profile"),u=co({oldPassword:"",newPassword:"",confirmPassword:""}),c=ve(!1),l=ve([]),f=ve(""),h=ve(1),d=ve(10),p=[10,20,50,100],m=ve([]),v=ve(1),g=ve(20),b=ve(0),x=ve(""),y=ve(!1),w=ve(null),_=ve([]),S=co({}),E=co({username:"",name:"",password:"",isAdmin:!1}),k=ve(!1),I=ve(null),T=ve(""),D=ve(!1),U=ve(null),V=ve(new Set),z=Bt(()=>Da.flatMap(Y=>Y.perms)),O=Bt(()=>z.value.length),P=Bt(()=>{const Y=f.value.trim().toLowerCase();return Y?l.value.filter(F=>String(F.username||"").toLowerCase().includes(Y)||String(F.name||"").toLowerCase().includes(Y)):l.value}),q=Bt(()=>P.value.slice((h.value-1)*d.value,h.value*d.value)),j=Bt(()=>m.value),K=[["login","登录"],["register","登记客户"],["edit","修改客户"],["delete","删除客户"],["clear_table","清空登记表"],["consult_edit","录入咨询量"],["task_import","导入题目"],["wukong_sync_config","更新同步设置"],["wukong_sync_token","获取CRM Token"],["wukong_sync_run","执行客户同步"],["roi_settings","ROI参数修改"],["roi_product","ROI产品管理"],["punch_settings","打卡设置修改"],["punch_employee","人脸录入管理"]].map(([Y,F])=>({value:Y,label:F}));function J(Y){a.name!==Y&&i.push({name:Y})}async function ne(){if(!u.oldPassword||!u.newPassword)return Pe.warning("请填写旧密码和新密码");if(u.newPassword!==u.confirmPassword)return Pe.warning("两次新密码不一致");if(u.newPassword.length<3)return Pe.warning("新密码至少3位");try{await Zl.changePassword({oldPassword:u.oldPassword,newPassword:u.newPassword}),u.oldPassword="",u.newPassword="",u.confirmPassword="",c.value=!1,Pe.success("密码已修改")}catch(Y){Pe.error(Y.message||"修改失败")}}async function ce(){if(!e.user.isAdmin&&!hasPerm("punchFace"))return;const Y=await Cr.list();l.value=Y.users||[]}async function de(){if(!e.user.isAdmin)return;const Y=await Wl.auditLogs(v.value,g.value,x.value);m.value=Y.logs||[],b.value=Y.total||0}function ge(){v.value=1,de()}function ye(Y){if(Y.isAdmin)return"全部权限";const F=z.value.filter(me=>Y.permissions&&Y.permissions[me[0]]).length;return F===0?"无权限":F===O.value?"全部权限":`${F}/${O.value}项`}function Ie(Y){const F=ye(Y);return F==="无权限"?"danger-text":F==="全部权限"?"success-text":""}function _e(Y){w.value=Y||null,E.username=(Y==null?void 0:Y.username)||"",E.name=(Y==null?void 0:Y.name)||"",E.password="",E.isAdmin=!!(Y!=null&&Y.isAdmin),_.value=Y!=null&&Y.permissions?Object.keys(Y.permissions).filter(F=>Y.permissions[F]):[],Da.forEach(F=>{S[F.title]=o.value}),y.value=!0}function Re(Y,F){const me=new Set(_.value);F?me.add(Y):me.delete(Y),_.value=[...me]}function Fe(Y){return Y.perms.every(F=>_.value.includes(F[0]))}function Ee(Y){return Y.perms.filter(F=>_.value.includes(F[0])).length}function Ne(Y,F){const me=new Set(_.value);Y.perms.forEach(St=>F?me.add(St[0]):me.delete(St[0])),_.value=[...me]}async function De(){var Y,F;if(!((Y=w.value)!=null&&Y.id)&&(!E.username.trim()||!E.password))return Pe.warning("用户名和密码不能为空");try{const me={};_.value.forEach(Ve=>{me[Ve]=!0});const St={name:E.name.trim(),isAdmin:E.isAdmin};E.isAdmin||(St.permissions=me),E.password&&(St.password=E.password),(F=w.value)!=null&&F.id?await Cr.update(w.value.id,St):await Cr.create({...St,username:E.username.trim(),password:E.password}),y.value=!1,Pe.success("已保存"),ce(),n("user-updated")}catch(me){Pe.error(me.message||"保存失败，请重试")}}function Le(Y){I.value=Y,T.value="",k.value=!0}async function Q(){if(!T.value)return Pe.warning("请输入新密码");await Cr.update(I.value.id,{password:T.value}),k.value=!1,Pe.success("密码已重置")}function We(Y){const F=l.value.filter(me=>me.isAdmin).length;return(!Y.isAdmin||F>1)&&Y.id!==e.user.id}async function Rt(Y){await ri.confirm(`删除账号 ${Y.username}？`,"删除账号",{type:"warning"}),await Cr.remove(Y.id),Pe.success("已删除"),ce()}function It(Y){var F;return((F=K.find(me=>me.value===Y))==null?void 0:F.label)||Y}function ft(Y){U.value=Y,D.value=!0}function bn(Y){V.value.add(Y),V.value=new Set(V.value)}async function zt(){try{const F=(await Fa.employees()).employees||[];V.value=new Set(F.map(me=>me.userId).filter(Boolean))}catch{}}function yt(Y){return V.value.has(Y)}return lo(f,()=>{h.value=1}),lo(d,()=>{h.value=1}),lo(x,()=>{v.value=1}),Lr(()=>{ce(),de(),zt()}),(Y,F)=>{var us;const me=he("el-icon"),St=he("Money"),Ve=he("el-button"),bt=he("el-card"),At=he("el-input"),Fn=he("el-tag"),xt=he("el-table-column"),xr=he("el-table"),$n=he("el-pagination"),wr=he("el-option"),_r=he("el-select"),xn=he("el-form-item"),Qo=he("el-form"),Zo=he("el-dialog"),ea=he("el-col"),Tl=he("el-row"),ta=he("el-checkbox");return ee(),fe("section",{class:"settings-page",key:we(a).fullPath},[s.value==="profile"?(ee(),fe(rt,{key:0},[we(o)?(ee(),fe("div",C1,[F[44]||(F[44]=M("div",{class:"mobile-settings-group-title"},"个人设置",-1)),M("div",E1,[M("button",{class:"mobile-settings-item",onClick:F[0]||(F[0]=$=>c.value=!0)},[M("span",k1,[B(me,null,{default:H(()=>[B(we(zl))]),_:1})]),F[32]||(F[32]=M("span",null,"修改密码",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})])]),r.user.isAdmin?(ee(),fe(rt,{key:0},[F[38]||(F[38]=M("div",{class:"mobile-settings-group-title"},"账号管理",-1)),M("div",R1,[M("button",{class:"mobile-settings-item",onClick:F[1]||(F[1]=$=>J("settings-accounts"))},[M("span",I1,[B(me,null,{default:H(()=>[B(we(Gl))]),_:1})]),F[33]||(F[33]=M("span",null,"账号列表与权限",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})]),M("button",{class:"mobile-settings-item",onClick:F[2]||(F[2]=$=>J("settings-customer-config"))},[M("span",S1,[B(me,null,{default:H(()=>[B(we(Hl))]),_:1})]),F[34]||(F[34]=M("span",null,"职称客户配置",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})]),M("button",{class:"mobile-settings-item",onClick:F[3]||(F[3]=$=>J("settings-finance-config"))},[M("span",A1,[B(me,null,{default:H(()=>[B(St)]),_:1})]),F[35]||(F[35]=M("span",null,"财税店铺与配置",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})]),M("button",{class:"mobile-settings-item",onClick:F[4]||(F[4]=$=>J("settings-sync"))},[M("span",D1,[B(me,null,{default:H(()=>[B(we(ql))]),_:1})]),F[36]||(F[36]=M("span",null,"同步设置",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})]),M("button",{class:"mobile-settings-item",onClick:F[5]||(F[5]=$=>J("settings-audit"))},[M("span",T1,[B(me,null,{default:H(()=>[B(we(jl))]),_:1})]),F[37]||(F[37]=M("span",null,"操作审计日志",-1)),B(me,{class:"mobile-settings-arrow"},{default:H(()=>[B(we(Yn))]),_:1})])])],64)):Ue("",!0),F[45]||(F[45]=M("div",{class:"mobile-settings-group-title"},"关于",-1)),M("div",N1,[M("div",F1,[M("span",P1,[B(me,null,{default:H(()=>[B(we(Kl))]),_:1})]),F[39]||(F[39]=M("span",null,"产品名称",-1)),F[40]||(F[40]=M("strong",null,"创赢工具箱",-1))]),M("div",M1,[M("span",O1,[B(me,null,{default:H(()=>[B(we(Xl))]),_:1})]),F[41]||(F[41]=M("span",null,"当前版本",-1)),F[42]||(F[42]=M("strong",null,"v5.2.1",-1))]),M("button",{class:"mobile-settings-item logout-item",onClick:F[6]||(F[6]=$=>n("logout"))},[M("span",B1,[B(me,null,{default:H(()=>[B(we($l))]),_:1})]),F[43]||(F[43]=M("span",null,"退出登录",-1))])]),F[46]||(F[46]=M("div",{class:"mobile-settings-footer"},"创赢工具箱",-1))])):(ee(),fe(rt,{key:1},[F[49]||(F[49]=M("div",{class:"settings-section-title"},"个人设置",-1)),B(bt,{shadow:"never",class:"settings-card"},{default:H(()=>[M("div",L1,[F[48]||(F[48]=M("div",null,[M("div",{class:"settings-row-label"},"登录密码"),M("div",{class:"settings-row-desc"},"修改当前账号的登录密码")],-1)),B(Ve,{type:"primary",onClick:F[7]||(F[7]=$=>c.value=!0)},{default:H(()=>[...F[47]||(F[47]=[ke("修改密码",-1)])]),_:1})])]),_:1})],64))],64)):Ue("",!0),r.user.isAdmin&&s.value==="accounts"?(ee(),fe(rt,{key:1},[F[59]||(F[59]=M("div",{class:"settings-section-title"},"账号管理",-1)),B(bt,{shadow:"never",class:"settings-card"},{header:H(()=>[M("div",W1,[F[51]||(F[51]=M("div",null,[M("div",{class:"settings-row-label"},"账号列表与权限"),M("div",{class:"settings-row-desc"},"创建子账号、配置功能权限、重置密码")],-1)),B(Ve,{type:"primary",icon:we(Jl),onClick:F[8]||(F[8]=$=>_e())},{default:H(()=>[...F[50]||(F[50]=[ke("创建账号",-1)])]),_:1},8,["icon"])])]),default:H(()=>[M("div",V1,[B(At,{modelValue:f.value,"onUpdate:modelValue":F[9]||(F[9]=$=>f.value=$),clearable:"","prefix-icon":we(Yl),placeholder:"搜索用户名/姓名"},null,8,["modelValue","prefix-icon"]),M("span",U1,le(P.value.length)+" 条",1)]),we(o)?(ee(),fe("div",z1,[(ee(!0),fe(rt,null,Ot(q.value,$=>(ee(),fe("article",{key:$.id,class:"customer-card"},[M("div",G1,[M("strong",null,le($.name||$.username),1),B(Fn,{type:$.isAdmin?"success":"info",size:"small"},{default:H(()=>[ke(le($.isAdmin?"管理员":$.username),1)]),_:2},1032,["type"])]),M("p",null,"权限："+le(ye($)),1),M("div",H1,[M("span",null,le($.username),1),M("div",null,[B(Ve,{size:"small",onClick:Oe=>_e($)},{default:H(()=>[...F[56]||(F[56]=[ke("编辑",-1)])]),_:1},8,["onClick"]),B(Ve,{size:"small",onClick:Oe=>Le($)},{default:H(()=>[...F[57]||(F[57]=[ke("重置",-1)])]),_:1},8,["onClick"]),B(Ve,{size:"small",type:"danger",disabled:!We($),onClick:Oe=>Rt($)},{default:H(()=>[...F[58]||(F[58]=[ke("删除",-1)])]),_:1},8,["disabled","onClick"])])])]))),128))])):(ee(),Xe(xr,{key:0,data:q.value,border:"",class:"settings-table"},{default:H(()=>[B(xt,{prop:"username",label:"用户名","min-width":"140"},{default:H(({row:$})=>[M("span",null,le($.username),1),$.isAdmin?(ee(),Xe(Fn,{key:0,type:"success",size:"small",class:"ml-8"},{default:H(()=>[...F[52]||(F[52]=[ke("管理员",-1)])]),_:1})):Ue("",!0)]),_:1}),B(xt,{prop:"name",label:"姓名","min-width":"120"}),B(xt,{label:"权限概览","min-width":"140"},{default:H(({row:$})=>[M("span",{class:dr(Ie($))},le(ye($)),3)]),_:1}),B(xt,{label:"操作",width:"220"},{default:H(({row:$})=>[B(Ve,{text:"",onClick:Oe=>_e($)},{default:H(()=>[...F[53]||(F[53]=[ke("编辑",-1)])]),_:1},8,["onClick"]),B(Ve,{text:"",onClick:Oe=>Le($)},{default:H(()=>[...F[54]||(F[54]=[ke("重置密码",-1)])]),_:1},8,["onClick"]),B(Ve,{text:"",type:"danger",disabled:!We($),onClick:Oe=>Rt($)},{default:H(()=>[...F[55]||(F[55]=[ke("删除",-1)])]),_:1},8,["disabled","onClick"])]),_:1})]),_:1},8,["data"])),B($n,{"current-page":h.value,"onUpdate:currentPage":F[10]||(F[10]=$=>h.value=$),layout:we(o)?"total, prev, next":"total, sizes, prev, pager, next","page-size":d.value,"onUpdate:pageSize":F[11]||(F[11]=$=>d.value=$),"page-sizes":p,total:P.value.length,background:"",class:"pager"},null,8,["current-page","layout","page-size","total"])]),_:1})],64)):Ue("",!0),(r.user.isAdmin||r.hasPerm("punchFace"))&&s.value==="face-enroll"?(ee(),fe(rt,{key:2},[F[62]||(F[62]=M("div",{class:"settings-section-title"},"人脸录入管理",-1)),B(bt,{shadow:"never",class:"settings-card"},{header:H(()=>[...F[60]||(F[60]=[M("div",{class:"panel-head"},[M("div",null,[M("div",{class:"settings-row-label"},"人脸录入状态"),M("div",{class:"settings-row-desc"},"在下方列表中点击「录入人脸」按钮即可录入人脸"),M("div",{class:"settings-row-desc",style:{color:"#07c160","font-weight":"600"}},"考勤打卡锁定IP: 113.66.20.207")])],-1)])]),default:H(()=>[we(o)?(ee(),fe("div",q1,[(ee(!0),fe(rt,null,Ot(l.value,$=>(ee(),fe("article",{key:$.id,class:"customer-card"},[M("div",j1,[M("strong",null,le($.name||$.username),1),B(Fn,{type:yt($.id)?"success":"info",size:"small"},{default:H(()=>[ke(le(yt($.id)?"已录入":"未录入"),1)]),_:2},1032,["type"])]),M("div",K1,[M("span",null,le($.username),1),B(Ve,{size:"small",type:"success",onClick:Oe=>ft($)},{default:H(()=>[ke(le(yt($.id)?"重新录入":"录入人脸"),1)]),_:2},1032,["onClick"])])]))),128))])):(ee(),Xe(xr,{key:0,data:l.value,border:"",class:"settings-table"},{default:H(()=>[B(xt,{prop:"username",label:"用户名","min-width":"140"},{default:H(({row:$})=>[M("span",null,le($.username),1),$.isAdmin?(ee(),Xe(Fn,{key:0,type:"success",size:"small",class:"ml-8"},{default:H(()=>[...F[61]||(F[61]=[ke("管理员",-1)])]),_:1})):Ue("",!0)]),_:1}),B(xt,{prop:"name",label:"姓名","min-width":"120"}),B(xt,{label:"人脸状态","min-width":"120"},{default:H(({row:$})=>[B(Fn,{type:yt($.id)?"success":"info",size:"small"},{default:H(()=>[ke(le(yt($.id)?"已录入":"未录入"),1)]),_:2},1032,["type"])]),_:1}),B(xt,{label:"操作",width:"200"},{default:H(({row:$})=>[B(Ve,{text:"",onClick:Oe=>ft($)},{default:H(()=>[ke(le(yt($.id)?"重新录入":"录入人脸"),1)]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]))]),_:1})],64)):Ue("",!0),r.user.isAdmin&&s.value==="customer-config"?(ee(),Xe(I0,{key:3})):Ue("",!0),r.user.isAdmin&&s.value==="finance-config"?(ee(),Xe(N0,{key:4})):Ue("",!0),r.user.isAdmin&&s.value==="sync"?(ee(),Xe(u1,{key:5})):Ue("",!0),r.user.isAdmin&&s.value==="audit"?(ee(),fe(rt,{key:6},[F[64]||(F[64]=M("div",{class:"settings-section-title"},"操作日志",-1)),B(bt,{shadow:"never",class:"settings-card"},{default:H(()=>[M("div",X1,[B(_r,{modelValue:x.value,"onUpdate:modelValue":F[12]||(F[12]=$=>x.value=$),clearable:"",placeholder:"动作",style:{width:"180px"},onChange:ge},{default:H(()=>[(ee(!0),fe(rt,null,Ot(we(K),$=>(ee(),Xe(wr,{key:$.value,label:$.label,value:$.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),B(Ve,{onClick:de},{default:H(()=>[...F[63]||(F[63]=[ke("刷新",-1)])]),_:1})]),we(o)?(ee(),fe("div",$1,[(ee(!0),fe(rt,null,Ot(j.value,$=>(ee(),fe("article",{key:$.id||`${$.timestamp}-${$.username}`,class:"customer-card settings-log-card"},[M("div",Y1,[M("strong",null,le(It($.action)),1),M("span",J1,le($.username||"-"),1)]),M("p",null,le($.detail||"-"),1),M("div",Q1,[M("span",null,le($.timestamp||"-"),1)])]))),128))])):(ee(),Xe(xr,{key:0,data:j.value,border:"",class:"settings-table"},{default:H(()=>[B(xt,{prop:"timestamp",label:"时间","min-width":"170"}),B(xt,{prop:"username",label:"账号","min-width":"100"}),B(xt,{label:"动作","min-width":"120"},{default:H(({row:$})=>[ke(le(It($.action)),1)]),_:1}),B(xt,{prop:"detail",label:"详情","min-width":"220"})]),_:1},8,["data"])),B($n,{"current-page":v.value,"onUpdate:currentPage":F[13]||(F[13]=$=>v.value=$),layout:we(o)?"total, prev, next":"total, sizes, prev, pager, next","page-size":g.value,"onUpdate:pageSize":F[14]||(F[14]=$=>g.value=$),"page-sizes":p,total:b.value,background:"",class:"pager",onCurrentChange:de,onSizeChange:de},null,8,["current-page","layout","page-size","total"])]),_:1})],64)):Ue("",!0),B(Zo,{modelValue:c.value,"onUpdate:modelValue":F[19]||(F[19]=$=>c.value=$),title:"修改密码",width:we(o)?"94%":"420px",top:we(o)?"18vh":"15vh","close-on-click-modal":!1,class:"responsive-dialog settings-mobile-dialog"},{footer:H(()=>[M("div",Z1,[B(Ve,{size:"large",onClick:F[18]||(F[18]=$=>c.value=!1)},{default:H(()=>[...F[65]||(F[65]=[ke("取消",-1)])]),_:1}),B(Ve,{size:"large",type:"primary",onClick:ne},{default:H(()=>[...F[66]||(F[66]=[ke("确定修改",-1)])]),_:1})])]),default:H(()=>[B(Qo,{class:"settings-dialog-form","label-position":"top"},{default:H(()=>[B(xn,{label:"旧密码"},{default:H(()=>[B(At,{modelValue:u.oldPassword,"onUpdate:modelValue":F[15]||(F[15]=$=>u.oldPassword=$),type:"password","show-password":""},null,8,["modelValue"])]),_:1}),B(xn,{label:"新密码"},{default:H(()=>[B(At,{modelValue:u.newPassword,"onUpdate:modelValue":F[16]||(F[16]=$=>u.newPassword=$),type:"password","show-password":""},null,8,["modelValue"])]),_:1}),B(xn,{label:"确认新密码"},{default:H(()=>[B(At,{modelValue:u.confirmPassword,"onUpdate:modelValue":F[17]||(F[17]=$=>u.confirmPassword=$),type:"password","show-password":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","width","top"]),B(Zo,{modelValue:y.value,"onUpdate:modelValue":F[27]||(F[27]=$=>y.value=$),title:(us=w.value)!=null&&us.id?"编辑账号":"创建账号",width:we(o)?"94%":"760px",top:we(o)?"5vh":"15vh","close-on-click-modal":!1,class:"responsive-dialog account-dialog"},{footer:H(()=>[M("div",sb,[B(Ve,{size:"large",onClick:F[26]||(F[26]=$=>y.value=!1)},{default:H(()=>[...F[69]||(F[69]=[ke("取消",-1)])]),_:1}),B(Ve,{size:"large",type:"primary",onClick:De},{default:H(()=>[...F[70]||(F[70]=[ke("保存账号",-1)])]),_:1})])]),default:H(()=>{var $;return[(ee(),Xe(Qo,{key:(($=w.value)==null?void 0:$.id)||"new-user",class:"account-form","label-position":"top",autocomplete:"off"},{default:H(()=>[B(Tl,{gutter:12,class:"account-basic-fields"},{default:H(()=>[B(ea,{xs:24,sm:8},{default:H(()=>[B(xn,{label:"用户名"},{default:H(()=>{var Oe;return[B(At,{modelValue:E.username,"onUpdate:modelValue":F[20]||(F[20]=Gt=>E.username=Gt),name:"zgj-new-account-username",autocomplete:"off",disabled:!!((Oe=w.value)!=null&&Oe.id)},null,8,["modelValue","disabled"])]}),_:1})]),_:1}),B(ea,{xs:24,sm:8},{default:H(()=>[B(xn,{label:"姓名"},{default:H(()=>[B(At,{modelValue:E.name,"onUpdate:modelValue":F[21]||(F[21]=Oe=>E.name=Oe)},null,8,["modelValue"])]),_:1})]),_:1}),B(ea,{xs:24,sm:8},{default:H(()=>{var Oe;return[B(xn,{label:(Oe=w.value)!=null&&Oe.id?"密码（留空不修改）":"密码"},{default:H(()=>[B(At,{modelValue:E.password,"onUpdate:modelValue":F[22]||(F[22]=Gt=>E.password=Gt),name:"zgj-new-account-password",type:"password",autocomplete:"new-password","show-password":""},null,8,["modelValue"])]),_:1},8,["label"])]}),_:1})]),_:1}),M("div",eb,[B(ta,{modelValue:E.isAdmin,"onUpdate:modelValue":F[23]||(F[23]=Oe=>E.isAdmin=Oe),onChange:F[24]||(F[24]=Oe=>_.value=E.isAdmin?[]:_.value)},{default:H(()=>[...F[67]||(F[67]=[ke("设为管理员（拥有全部权限）",-1)])]),_:1},8,["modelValue"])]),E.isAdmin?Ue("",!0):(ee(),fe("div",tb,[F[68]||(F[68]=M("div",{class:"perm-tree-root"},"权限配置",-1)),(ee(!0),fe(rt,null,Ot(we(Da),Oe=>(ee(),fe("div",{key:Oe.title,class:dr(["perm-tree-group",{collapsed:S[Oe.title]}])},[M("div",{class:"perm-tree-head",onClick:Gt=>S[Oe.title]=!S[Oe.title]},[M("span",rb,le(S[Oe.title]?"▶":"▼"),1),M("span",null,le(Oe.title),1),B(ta,{"model-value":Fe(Oe),onClick:F[25]||(F[25]=Ql(()=>{},["stop"])),onChange:Gt=>Ne(Oe,Gt)},null,8,["model-value","onChange"]),M("span",ob,le(Ee(Oe))+"/"+le(Oe.perms.length),1)],8,nb),M("div",ab,[(ee(!0),fe(rt,null,Ot(Oe.perms,Gt=>(ee(),fe("label",{key:Gt[0],class:"perm-tree-item"},[B(ta,{"model-value":_.value.includes(Gt[0]),onChange:Nl=>Re(Gt[0],Nl)},null,8,["model-value","onChange"]),M("span",null,le(Gt[1]),1)]))),128))])],2))),128)),M("div",ib,"已选 "+le(_.value.length)+" / 共 "+le(O.value)+" 项",1)]))]),_:1}))]}),_:1},8,["modelValue","title","width","top"]),B(Zo,{modelValue:k.value,"onUpdate:modelValue":F[30]||(F[30]=$=>k.value=$),title:"重置密码",width:we(o)?"94%":"420px",top:we(o)?"22vh":"15vh","close-on-click-modal":!1,class:"responsive-dialog settings-mobile-dialog"},{footer:H(()=>[M("div",ub,[B(Ve,{size:"large",onClick:F[29]||(F[29]=$=>k.value=!1)},{default:H(()=>[...F[71]||(F[71]=[ke("取消",-1)])]),_:1}),B(Ve,{size:"large",type:"primary",onClick:Q},{default:H(()=>[...F[72]||(F[72]=[ke("确认重置",-1)])]),_:1})])]),default:H(()=>[B(Qo,{class:"settings-dialog-form","label-position":"top"},{default:H(()=>[B(xn,{label:"账号"},{default:H(()=>{var $;return[B(At,{"model-value":(($=I.value)==null?void 0:$.username)||"",disabled:""},null,8,["model-value"])]}),_:1}),B(xn,{label:"新密码"},{default:H(()=>[B(At,{modelValue:T.value,"onUpdate:modelValue":F[28]||(F[28]=$=>T.value=$),type:"password","show-password":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","width","top"]),B(_1,{modelValue:D.value,"onUpdate:modelValue":F[31]||(F[31]=$=>D.value=$),"target-user":U.value,onEnrolled:bn},null,8,["modelValue","target-user"])])}}};export{lb as default};
