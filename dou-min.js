/*! Dou v0.0.10 | (c) Hatio, Lab. | MIT License */
!function(t){function n(){var t,n,e=Array.prototype.slice.call(arguments),r=[];"string"==typeof e[0]&&(t=e.shift()),o(e[0])&&(r=e.shift()),n=e.shift(),i[t]=[r,n]}function e(t){function n(n){var e=t.split("/"),i=n.split("/"),r=!1;for(e.pop();".."==i[0]&&e.length;)e.pop(),i.shift(),r=!0;return"."==i[0]&&(i.shift(),r=!0),r&&(i=e.concat(i)),i.join("/")}var o,u,c;return"undefined"==typeof r[t]&&(o=i[t],o&&(c=o[0],u=o[1],r[t]=u.apply(void 0,s(c,function(t){return e(n(t))})))),r[t]}var i={},r={},o=Array.isArray||function(t){return t.constructor==Array},s=Array.map||function(t,n,e){for(var i=0,r=t.length,o=[];r>i;i++)o.push(n.call(e,t[i]));return o};!function(){var t=[].slice,e={}.hasOwnProperty;n("build/js/utils",[],function(){"use strict";var n,i;return n=100,i=0,{merge:function(){var n,i,r,o,s,u,c;for(o=arguments[0],n=2<=arguments.length?t.call(arguments,1):[],o&&typeof o!==!1||(o={}),u=0,c=n.length;c>u;u++){r=n[u];for(i in r)e.call(r,i)&&(s=r[i],o[i]="object"!=typeof s?s:this.merge(o[i],s))}return o},push:function(t,n,i){var r,o;if(!t||!n)return t;for(r in n)if(e.call(n,r)){if(o=n[r],t[r]&&i)throw new Error('utils.push attempted to overwrite "'+r+'" while running in protected mode');"object"==typeof t[r]&&"object"==typeof n[r]?this.push(t[r],n[r]):t[r]=n[r]}return t},isEnumerable:function(t,n){return Object.keys(t).indexOf(n)>-1},compose:function(){var t;return t=arguments,function(){var n,e,i,r;for(n=arguments,e=i=r=t.length-1;0>=r?0>=i:i>=0;e=0>=r?++i:--i)n=t[e].apply(this,n);return n[0]}},uniqueArray:function(t){var n,e,i,r,o;for(i={},n=[],r=0,o=t.length;o>r;r++)e=t[r],i.hasOwnProperty(e)||(n.push(e),i[e]=1);return n},debounce:function(t,e,i){var r,o;return"number"!=typeof e&&(e=n),o=0,r=null,function(){var n,s,u,c;return u=this,n=arguments,c=function(){return o=null,i?void 0:r=t.apply(u,n)},s=i&&!o,clearTimeout(o),o=setTimeout(c,e),s&&(r=t.apply(u,n)),r}},throttle:function(t,e){var i,r,o,s,u,c,l;return"number"!=typeof e&&(e=n),r=i=c=u=o=s=null,l=this.debounce(function(){return o=u=!1},e),function(){var n;return r=this,i=arguments,n=function(){return c=null,o&&(s=t.apply(r,i)),l()},c||(c=setTimeout(n,e)),u?o=!0:(u=!0,s=t.apply(r,i)),l(),s}},countThen:function(t,n){return function(){return--t?void 0:n.apply(this,arguments)}},delegate:function(t){return function(n,i){var r,o,s;s=$(n.target),r=null;for(o in t)if(e.call(t,o)&&!n.isPropagationStopped()&&(r=s.closest(o)).length)return i=i||{},i.el=r[0],t[o].apply(this,[n,i])}},once:function(t){var n,e;return n=!1,e=null,function(){return n?e:(e=t.apply(this,arguments),n=!0,e)}},uniqueId:function(t){var n;return n=++i+"",t?t+n:n},clone:function(t){var n,e,i;if(null==t||"object"!=typeof t)return t;if(t instanceof Date)return new Date(t.getTime());if(t instanceof RegExp)return n="",null!=t.global&&(n+="g"),null!=t.ignoreCase&&(n+="i"),null!=t.multiline&&(n+="m"),null!=t.sticky&&(n+="y"),new RegExp(t.source,n);i=new t.constructor;for(e in t)i[e]=this.clone(t[e]);return i}}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/debug",[],function(){"use strict";var n,e,i,r,o,s,u,c,l,a,f,h,p,g,_,v,m,y,d,b;return h="undefined"==typeof window?{}:window,b=function(n,e,i){var r,o,s,u;i=i||{},r=i.obj||h,o=i.path||(r===h?"global":""),u=[];for(s in r)t.call(r,s)&&((d[n]||n)(e,r,s)&&console.log(""+o+"."+s+" -> ("+typeof r[s]+")",r[s]),r[s]&&"object"==typeof r[s]&&r[s]!==r?u.push(b(n,e,{obj:r[s],path:""+o+"."+s})):u.push(void 0));return u},m=function(t,n,e,i){return n&&typeof e!==n?console.error(""+e+" must be "+n):b(t,e,i)},d={name:function(t,n,e){return t===e},nameContains:function(t,n,e){return e.indexOf(t)>-1},type:function(t,n,e){return n[e]instanceof t},value:function(t,n,e){return n[e]===t},valueCoerced:function(t,n,e){return n[e]==t}},e=function(t,n){return m("name","string",t,n)},i=function(t,n){return m("nameContains","string",t,n)},r=function(t,n){return m("type","function",t,n)},o=function(t,n){return m("value",null,t,n)},s=function(t,n){return m("valueCoerced",null,t,n)},u=function(t,n){return b(t,null,n)},a=function(){var t;return t=[].slice.call(arguments),g.eventNames.length||(g.eventNames=n),g.actions=t.length?t:n,v()},f=function(){var t;return t=[].slice.call(arguments),g.actions.length||(g.actions=n),g.eventNames=t.length?t:n,v()},p=function(){return g.actions=[],g.eventNames=[],v()},y=function(){return g.actions=n,g.eventNames=n,v()},v=function(){return h.localStorage?(h.localStorage.setItem("logFilter_eventNames",g.eventNames),h.localStorage.setItem("logFilter_actions",g.actions)):void 0},_=function(){var e,i,r;i={eventNames:h.localStorage&&h.localStorage.getItem("logFilter_eventNames")||l,actions:h.localStorage&&h.localStorage.getItem("logFilter_actions")||c};for(e in i)t.call(i,e)&&(r=i[e],"string"==typeof r&&r!==n&&(i[e]=r.split(".")));return i},n="all",l=[],c=[],g=_(),{enable:function(t){return this.enabled=!!t,t&&h.console&&(console.info("Booting in DEBUG mode"),console.info("You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()")),h.DEBUG=this},find:{byName:e,byNameContains:i,byType:r,byValue:o,byValueCoerced:s,custom:u},events:{logFilter:g,logByAction:a,logByName:f,logAll:y,logNone:p}}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/compose",["./utils","./debug"],function(n,e){"use strict";var i,r,o,s,u,c;if(i=e.enabled&&!n.isEnumerable(Object,"getOwnPropertyDescriptor"),r=["mixedIn","mixingIn"],i)try{Object.getOwnPropertyDescriptor(Object,"keys")}catch(l){o=l,i=!1}return u=function(n,e){var o,s,u;if(i){u=Object.create(null);for(s in n)t.call(n,s)&&r.indexOf(0>s)&&(o=Object.getOwnPropertyDescriptor(n,s),o.writable=e,u[s]=o);return Object.defineProperties(n,u)}},c=function(t,n,e){var r;return i&&t.hasOwnProperty(n)?(r=Object.getOwnPropertyDescriptor(t,n).writable,Object.defineProperties(t,n,{writable:!0}),e.call(t),Object.defineProperties(t,n,{writable:r})):e.call(t)},s=function(t,n){var e,i;if(!(n instanceof Array))return this.mixin(t,[n]);for(t.mixedIn=t.hasOwnProperty("mixedIn")?t.mixedIn:[],t.mixingIn=t.hasOwnProperty("mixingIn")?t.mixingIn:[],u(t,!1),e=0,i=n.length;i>e;e++)if(s=n[e],-1===t.mixedIn.indexOf(s)){if(t.mixingIn.indexOf(s)>-1)throw new Error("found cyclic dependencies between "+t.mixingIn);t.mixingIn.push(s),s.call(t),t.mixingIn.pop(),t.mixedIn.push(s)}return u(t,!0),t},{mixin:s,unlockProperty:c}})}.call(this),function(){n("build/js/advice",["./compose"],function(t){"use strict";var n;return n={around:function(t,n){return function(){var e,i,r,o,s,u;for(o=arguments.length,e=new Array(o+1),e[0]=t.bind(this),r=s=0,u=e.length;u>s;r=++s)i=e[r],e[r+1]=arguments[r];return n.apply(this,e)}},before:function(t,n){var e;return e="function"==typeof n?n:n.obj[n.fnName],function(){return e.apply(this,arguments),t.apply(this,arguments)}},after:function(t,n){var e;return e="function"==typeof n?n:n.obj[n.fnName],function(){var n;return n=(t.unbound||t).apply(this,arguments),e.apply(this,arguments),n}},withAdvice:function(){return["before","after","around"].forEach(function(e){return this[e]=function(i,r){return t.unlockProperty(this,i,function(){return this[i]="function"==typeof this[i]?n[e](this[i],r):r,this[i]})}},this)}}})}.call(this),function(){n("build/js/event",["./utils"],function(t){"use strict";var n,e,i,r,o,s,u,c;u=[].slice,n={withEvent:function(){var t,e,i,r,o;for(r=["on","off","once","trigger","delegate"],o=[],e=0,i=r.length;i>e;e++)t=r[e],o.push(this[t]=n[t]);return o},on:function(t,n,e){var r;return i(this,"on",t,[n,e])&&n?(this._events||(this._events={}),r=this._events[t]||(this._events[t]=[]),r.push({callback:n,context:e,ctx:e||this}),this):this},once:function(n,e,r){var o,s;return i(this,"once",n,[e,r])&&e?(s=this,o=t.once(function(){return s.off(n,o),e.apply(this,arguments)}),o._callback=e,this.on(n,o,r)):this},off:function(t,n,e){var r,o,s,u,c,l,a,f,h,p;if(!this._events||!i(this,"off",t,[n,e]))return this;if(!t&&!n&&!e)return this._events=void 0,this;for(c=t?[t]:Object.keys(this._events),s=a=0,h=c.length;h>a;s=++a)if(t=c[s],o=this._events[t]){if(this._events[t]=l=[],n||e)for(u=f=0,p=o.length;p>f;u=++f)r=o[u],(n&&n!==r.callback&&n!==r.callback._callback||e&&e!==r.context)&&l.push(r);l.length||delete this._events[t]}return this},delegate:function(){var t,n,e;return this._events?(n=arguments[arguments.length-1],e=this._events[n.name],t=this._events.all,e&&c(e,arguments),t&&c(t,arguments),this):this},trigger:function(t){var n,e,r;return this._events?(e=u.call(arguments,1),i(this,"trigger",t,e)?(r=this._events[t],n=this._events.all,e.push({target:this,name:t}),r&&c(r,e),n&&c(n,e),this):this):this},stopListening:function(t,n,e){var i,r,o;if(r=this._listeningTo,!r)return this;o=!n&&!e,e||"object"!=typeof n||(e=this),t&&((r={})[t._listenId]=t);for(i in r)t=r[i],t.off(n,e,this),(o||_.isEmpty(t._events))&&delete this._listeningTo[i];return this}},e=/\s+/,i=function(t,n,i,r){var o,s,u,c,l;if(!i)return!0;if("object"==typeof i){for(o in i)u=i[o],t[n].apply(t,[o,u].concat(r));return!1}if(e.test(i)){for(s=i.split(e),c=0,l=s.length;l>c;c++)u=s[c],t[n].apply(t,[u].concat(r));return!1}return!0},c=function(t,n){var e,i,r,o;for(o=[],i=0,r=t.length;r>i;i++)e=t[i],o.push(e.callback.apply(e.ctx,n));return o},o={listenTo:"on",listenToOnce:"once"};for(s in o)r=o[s],n[s]=function(n,e,i){var o,s;return s=this._listeningTo||(this._listeningTo={}),o=n._listenId||(n._listenId=t.uniqueId("l")),s[o]=n,i||"object"!=typeof e||(i=this),n[r](e,i,this),this};return n})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/property",["./utils","./compose","./event"],function(n,e,i){"use strict";var r,o;return o=function(e,i){var r,o,s,u,c;if(!e)return this;if(arguments.length>1&&"string"==typeof arguments[0])return o={},o[e]=i,this.set(o);this.attrs||(this.attrs={}),o=e,r={},s={},u=this.attrs;for(e in u)t.call(u,e)&&(i=u[e],s[e]=i);n.push(this.attrs,o),c=this.attrs;for(e in c)t.call(c,e)&&(i=c[e],i!==s[e]?r[e]=i:delete s[e]);return 0!==Object.keys(r).length&&this.trigger("change",this,s,r),this},r=function(t){return this.attrs&&this.attrs[t]},function(){return e.mixin(this,i.withEvent),this.set=o,this.get=r}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/lifecycle",["./compose","./property"],function(n,e){"use strict";var i,r;return r=function(n){var e,i,r,o;n||(n={}),e={};for(i in n)t.call(n,i)&&(r=n[i],e[i]=r);o=this.defaults;for(i in o)t.call(o,i)&&(r=o[i],e.hasOwnProperty(i)||(e[i]=r));return this.set(e),this},i=function(){},function(){return n.mixin(this,e),this.initialize=r,this.despose=i}})}.call(this),function(){n("build/js/serialize",["./compose","./property"],function(t,n){"use strict";var e,i;return i=function(){return["type: "+this.name,"id: "+this.id,"props: "+JSON.stringify(this.attrs)].join(",")},e=function(){},function(){return t.mixin(this,n),this.serialize||(this.serialize=i),this.deserialize?void 0:this.deserialize=e}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/collection",[],function(){"use strict";var n,e,i;return e={insertAt:function(t,n){return this.__collection__?(t=this.__collection__.indexOf(n),-1===this.__collection__.indexOf(n)&&this.__collection__.splice(t,0,n),this):this},append:function(t){return this.__collection__||(this.__collection__=[]),-1===this.__collection__.indexOf(t)&&this.__collection__.push(t),this},prepend:function(t){return this.__collection__||(this.__collection__=[]),-1===this.__collection__.indexOf(t)&&this.__collection__.unshift(t),this},remove:function(t){var n;return this.__collection__?(n=this.__collection__.indexOf(t),n>-1&&this.__collection__.splice(n,1),this):this},get:function(t){return this.__collection__?this.__collection__[t]:void 0},forEach:function(t,n){return this.__collection__?this.__collection__.forEach(t,n):this},indexOf:function(t){return(this.__collection__||[]).indexOf(t)},size:function(){return(this.__collection__||[]).length},clear:function(){return this.__collection__=[]}},i={push:function(){throw new Error("Not Implemented Yet")},pop:function(){throw new Error("Not Implemented Yet")}},n={withList:function(){var n,i,r;r=[];for(n in e)t.call(e,n)&&(i=e[n],r.push(this[n]=i));return r},withStack:function(){var n,e,r;r=[];for(n in i)t.call(i,n)&&(e=i[n],r.push(this[n]=e));return r}}})}.call(this),function(){var t={}.hasOwnProperty,e=function(n,e){function i(){this.constructor=n}for(var r in e)t.call(e,r)&&(n[r]=e[r]);return i.prototype=e.prototype,n.prototype=new i,n.__super__=e.prototype,n};n("build/js/dou",["./compose","./advice","./lifecycle","./property","./serialize","./event","./utils","./collection"],function(n,i,r,o,s,u,c,l){"use strict";var a,f;return a=function(i,r,o){var s,u,c,l;if(r||(r=function(){}),s=i["extends"]?function(t){function n(){return i.apply(this,arguments)}var i;return e(n,t),i=r,n}(i["extends"]):function(){function t(){return n.apply(this,arguments)}var n;return n=r,t}(),i.members){l=i.members;for(u in l)t.call(l,u)&&(c=l[u],s.prototype[u]=c)}if(o)for(u in o)t.call(o,u)&&(c=o[u],s.prototype[u]=c);return i.mixins&&n.mixin(s.prototype,i.mixins),i.name&&(s.name=i.name),s},f=function(t,e){return n.mixin("function"==typeof t?t.prototype:t,e),t},{define:a,mixin:f,"with":{advice:i.withAdvice,property:o,lifecycle:r,event:u.withEvent,serialize:s,collection:l},util:c}})}.call(this),t.dou=e("build/js/dou")}(this);