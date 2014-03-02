/*! Dou v0.0.10 | (c) Hatio, Lab. | MIT License */
!function(t){function n(){var t,n,e=Array.prototype.slice.call(arguments),i=[];"string"==typeof e[0]&&(t=e.shift()),o(e[0])&&(i=e.shift()),n=e.shift(),r[t]=[i,n]}function e(t){function n(n){var e=t.split("/"),r=n.split("/"),i=!1;for(e.pop();".."==r[0]&&e.length;)e.pop(),r.shift(),i=!0;return"."==r[0]&&(r.shift(),i=!0),i&&(r=e.concat(r)),r.join("/")}var o,s,c;return"undefined"==typeof i[t]&&(o=r[t],o&&(c=o[0],s=o[1],i[t]=s.apply(void 0,u(c,function(t){return e(n(t))})))),i[t]}var r={},i={},o=Array.isArray||function(t){return t.constructor==Array},u=Array.map||function(t,n,e){for(var r=0,i=t.length,o=[];i>r;r++)o.push(n.call(e,t[r]));return o};!function(){var t=[].slice,e={}.hasOwnProperty;n("build/js/utils",[],function(){"use strict";var n,r;return n=100,r=0,{merge:function(){var n,r,i,o,u,s,c;for(o=arguments[0],n=2<=arguments.length?t.call(arguments,1):[],o&&typeof o!==!1||(o={}),s=0,c=n.length;c>s;s++){i=n[s];for(r in i)e.call(i,r)&&(u=i[r],o[r]="object"!=typeof u?u:this.merge(o[r],u))}return o},push:function(t,n,r){var i,o;if(!t||!n)return t;for(i in n)if(e.call(n,i)){if(o=n[i],t[i]&&r)throw new Error('utils.push attempted to overwrite "'+i+'" while running in protected mode');"object"==typeof t[i]&&"object"==typeof n[i]?this.push(t[i],n[i]):t[i]=n[i]}return t},isEnumerable:function(t,n){return Object.keys(t).indexOf(n)>-1},compose:function(){var t;return t=arguments,function(){var n,e,r,i;for(n=arguments,e=r=i=t.length-1;0>=i?0>=r:r>=0;e=0>=i?++r:--r)n=t[e].apply(this,n);return n[0]}},uniqueArray:function(t){var n,e,r,i,o;for(r={},n=[],i=0,o=t.length;o>i;i++)e=t[i],r.hasOwnProperty(e)||(n.push(e),r[e]=1);return n},debounce:function(t,e,r){var i,o;return"number"!=typeof e&&(e=n),o=0,i=null,function(){var n,u,s,c;return s=this,n=arguments,c=function(){return o=null,r?void 0:i=t.apply(s,n)},u=r&&!o,clearTimeout(o),o=setTimeout(c,e),u&&(i=t.apply(s,n)),i}},throttle:function(t,e){var r,i,o,u,s,c,a;return"number"!=typeof e&&(e=n),i=r=c=s=o=u=null,a=this.debounce(function(){return o=s=!1},e),function(){var n;return i=this,r=arguments,n=function(){return c=null,o&&(u=t.apply(i,r)),a()},c||(c=setTimeout(n,e)),s?o=!0:(s=!0,u=t.apply(i,r)),a(),u}},countThen:function(t,n){return function(){return--t?void 0:n.apply(this,arguments)}},delegate:function(t){return function(n,r){var i,o,u;u=$(n.target),i=null;for(o in t)if(e.call(t,o)&&!n.isPropagationStopped()&&(i=u.closest(o)).length)return r=r||{},r.el=i[0],t[o].apply(this,[n,r])}},once:function(t){var n,e;return n=!1,e=null,function(){return n?e:(e=t.apply(this,arguments),n=!0,e)}},uniqueId:function(t){var n;return n=++r+"",t?t+n:n},clone:function(t){var n,e,r;if(null==t||"object"!=typeof t)return t;if(t instanceof Date)return new Date(t.getTime());if(t instanceof RegExp)return n="",null!=t.global&&(n+="g"),null!=t.ignoreCase&&(n+="i"),null!=t.multiline&&(n+="m"),null!=t.sticky&&(n+="y"),new RegExp(t.source,n);r=new t.constructor;for(e in t)r[e]=this.clone(t[e]);return r}}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/debug",[],function(){"use strict";var n,e,r,i,o,u,s,c,a,l,f,h,p,g,v,y,m,d,b,w;return h="undefined"==typeof window?{}:window,w=function(n,e,r){var i,o,u,s;r=r||{},i=r.obj||h,o=r.path||(i===h?"global":""),s=[];for(u in i)t.call(i,u)&&((b[n]||n)(e,i,u)&&console.log(""+o+"."+u+" -> ("+typeof i[u]+")",i[u]),i[u]&&"object"==typeof i[u]&&i[u]!==i?s.push(w(n,e,{obj:i[u],path:""+o+"."+u})):s.push(void 0));return s},m=function(t,n,e,r){return n&&typeof e!==n?console.error(""+e+" must be "+n):w(t,e,r)},b={name:function(t,n,e){return t===e},nameContains:function(t,n,e){return e.indexOf(t)>-1},type:function(t,n,e){return n[e]instanceof t},value:function(t,n,e){return n[e]===t},valueCoerced:function(t,n,e){return n[e]==t}},e=function(t,n){return m("name","string",t,n)},r=function(t,n){return m("nameContains","string",t,n)},i=function(t,n){return m("type","function",t,n)},o=function(t,n){return m("value",null,t,n)},u=function(t,n){return m("valueCoerced",null,t,n)},s=function(t,n){return w(t,null,n)},l=function(){var t;return t=[].slice.call(arguments),g.eventNames.length||(g.eventNames=n),g.actions=t.length?t:n,y()},f=function(){var t;return t=[].slice.call(arguments),g.actions.length||(g.actions=n),g.eventNames=t.length?t:n,y()},p=function(){return g.actions=[],g.eventNames=[],y()},d=function(){return g.actions=n,g.eventNames=n,y()},y=function(){return h.localStorage?(h.localStorage.setItem("logFilter_eventNames",g.eventNames),h.localStorage.setItem("logFilter_actions",g.actions)):void 0},v=function(){var e,r,i;r={eventNames:h.localStorage&&h.localStorage.getItem("logFilter_eventNames")||a,actions:h.localStorage&&h.localStorage.getItem("logFilter_actions")||c};for(e in r)t.call(r,e)&&(i=r[e],"string"==typeof i&&i!==n&&(r[e]=i.split(".")));return r},n="all",a=[],c=[],g=v(),{enable:function(t){return this.enabled=!!t,t&&h.console&&(console.info("Booting in DEBUG mode"),console.info("You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()")),h.DEBUG=this},find:{byName:e,byNameContains:r,byType:i,byValue:o,byValueCoerced:u,custom:s},events:{logFilter:g,logByAction:l,logByName:f,logAll:d,logNone:p}}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/compose",["./utils","./debug"],function(n,e){"use strict";var r,i,o,u,s,c;if(r=e.enabled&&!n.isEnumerable(Object,"getOwnPropertyDescriptor"),i=["mixedIn","mixingIn"],r)try{Object.getOwnPropertyDescriptor(Object,"keys")}catch(a){o=a,r=!1}return s=function(n,e){var o,u,s;if(r){s=Object.create(null);for(u in n)t.call(n,u)&&i.indexOf(0>u)&&(o=Object.getOwnPropertyDescriptor(n,u),o.writable=e,s[u]=o);return Object.defineProperties(n,s)}},c=function(t,n,e){var i;return r&&t.hasOwnProperty(n)?(i=Object.getOwnPropertyDescriptor(t,n).writable,Object.defineProperties(t,n,{writable:!0}),e.call(t),Object.defineProperties(t,n,{writable:i})):e.call(t)},u=function(t,n){var e,r;if(!(n instanceof Array))return this.mixin(t,[n]);for(t.mixedIn=t.hasOwnProperty("mixedIn")?t.mixedIn:[],t.mixingIn=t.hasOwnProperty("mixingIn")?t.mixingIn:[],s(t,!1),e=0,r=n.length;r>e;e++)if(u=n[e],-1===t.mixedIn.indexOf(u)){if(t.mixingIn.indexOf(u)>-1)throw new Error("found cyclic dependencies between "+t.mixingIn);t.mixingIn.push(u),u.call(t),t.mixingIn.pop(),t.mixedIn.push(u)}return s(t,!0),t},{mixin:u,unlockProperty:c}})}.call(this),function(){n("build/js/advice",["./compose"],function(t){"use strict";var n;return n={around:function(t,n){return function(){var e,r,i,o,u,s;for(o=arguments.length,e=new Array(o+1),e[0]=t.bind(this),i=u=0,s=e.length;s>u;i=++u)r=e[i],e[i+1]=arguments[i];return n.apply(this,e)}},before:function(t,n){var e;return e="function"==typeof n?n:n.obj[n.fnName],function(){return e.apply(this,arguments),t.apply(this,arguments)}},after:function(t,n){var e;return e="function"==typeof n?n:n.obj[n.fnName],function(){var n;return n=(t.unbound||t).apply(this,arguments),e.apply(this,arguments),n}},withAdvice:function(){return["before","after","around"].forEach(function(e){return this[e]=function(r,i){return t.unlockProperty(this,r,function(){return this[r]="function"==typeof this[r]?n[e](this[r],i):i,this[r]})}},this)}}})}.call(this),function(){n("build/js/event",["./utils"],function(t){"use strict";var n,e,r,i,o,u,s,c;s=[].slice,n={withEvent:function(){var t,e,r,i,o;for(i=["on","off","once","trigger"],o=[],e=0,r=i.length;r>e;e++)t=i[e],o.push(this[t]=n[t]);return o},on:function(t,n,e){var i;return r(this,"on",t,[n,e])&&n?(this._events||(this._events={}),i=this._events[t]||(this._events[t]=[]),i.push({callback:n,context:e,ctx:e||this}),this):this},once:function(n,e,i){var o,u;return r(this,"once",n,[e,i])&&e?(u=this,o=t.once(function(){return u.off(n,o),e.apply(this,arguments)}),o._callback=e,this.on(n,o,i)):this},off:function(t,n,e){var i,o,u,s,c,a,l,f,h,p;if(!this._events||!r(this,"off",t,[n,e]))return this;if(!t&&!n&&!e)return this._events=void 0,this;for(c=t?[t]:Object.keys(this._events),u=l=0,h=c.length;h>l;u=++l)if(t=c[u],o=this._events[t]){if(this._events[t]=a=[],n||e)for(s=f=0,p=o.length;p>f;s=++f)i=o[s],(n&&n!==i.callback&&n!==i.callback._callback||e&&e!==i.context)&&a.push(i);a.length||delete this._events[t]}return this},trigger:function(t){var n,e,i;return this._events?(e=s.call(arguments,1),r(this,"trigger",t,e)?(i=this._events[t],n=this._events.all,i&&c(i,e),n&&c(n,arguments),this):this):this},stopListening:function(t,n,e){var r,i,o;if(i=this._listeningTo,!i)return this;o=!n&&!e,e||"object"!=typeof n||(e=this),t&&((i={})[t._listenId]=t);for(r in i)t=i[r],t.off(n,e,this),(o||_.isEmpty(t._events))&&delete this._listeningTo[r];return this}},e=/\s+/,r=function(t,n,r,i){var o,u,s,c,a;if(!r)return!0;if("object"==typeof r){for(o in r)s=r[o],t[n].apply(t,[o,s].concat(i));return!1}if(e.test(r)){for(u=r.split(e),c=0,a=u.length;a>c;c++)s=u[c],t[n].apply(t,[s].concat(i));return!1}return!0},c=function(t,n){var e,r,i,o;for(o=[],r=0,i=t.length;i>r;r++)e=t[r],o.push(e.callback.apply(e.ctx,n));return o},o={listenTo:"on",listenToOnce:"once"};for(u in o)i=o[u],n[u]=function(n,e,r){var o,u;return u=this._listeningTo||(this._listeningTo={}),o=n._listenId||(n._listenId=t.uniqueId("l")),u[o]=n,r||"object"!=typeof e||(r=this),n[i](e,r,this),this};return n})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/property",["./utils","./compose","./event"],function(n,e,r){"use strict";var i,o;return o=function(e,r){var i,o,u,s,c;if(!e)return this;if(arguments.length>1&&"string"==typeof arguments[0])return o={},o[e]=r,this.set(o);this.attrs||(this.attrs={}),o=e,i={},u={},s=this.attrs;for(e in s)t.call(s,e)&&(r=s[e],u[e]=r);n.push(this.attrs,o),c=this.attrs;for(e in c)t.call(c,e)&&(r=c[e],r!==u[e]?i[e]=r:delete u[e]);return 0!==Object.keys(i).length&&this.trigger("change",{before:u,after:i},!0),this},i=function(t){return this.attrs&&this.attrs[t]},function(){return e.mixin(this,r.withEvent),this.set=o,this.get=i}})}.call(this),function(){var t={}.hasOwnProperty;n("build/js/lifecycle",["./compose","./property"],function(n,e){"use strict";var r,i;return i=function(n){var e,r,i,o;n||(n={}),e={};for(r in n)t.call(n,r)&&(i=n[r],e[r]=i);o=this.defaults;for(r in o)t.call(o,r)&&(i=o[r],e.hasOwnProperty(r)||(e[r]=i));return this.set(e),this},r=function(){},function(){return n.mixin(this,e),this.initialize=i,this.despose=r}})}.call(this),function(){n("build/js/serialize",["./compose","./property"],function(t,n){"use strict";var e,r;return r=function(){return["type: "+this.name,"id: "+this.id,"props: "+JSON.stringify(this.attrs)].join(",")},e=function(){},function(){return t.mixin(this,n),this.serialize||(this.serialize=r),this.deserialize?void 0:this.deserialize=e}})}.call(this),function(){var t={}.hasOwnProperty,e=function(n,e){function r(){this.constructor=n}for(var i in e)t.call(e,i)&&(n[i]=e[i]);return r.prototype=e.prototype,n.prototype=new r,n.__super__=e.prototype,n};n("build/js/dou",["./compose","./advice","./lifecycle","./property","./serialize","./event","./utils"],function(n,r,i,o,u,s,c){"use strict";var a,l;return a=function(r,i,o){var u,s,c,a;if(i||(i=function(){}),u=r["extends"]?function(t){function n(){return r.apply(this,arguments)}var r;return e(n,t),r=i,n}(r["extends"]):function(){function t(){return n.apply(this,arguments)}var n;return n=i,t}(),r.members){a=r.members;for(s in a)t.call(a,s)&&(c=a[s],u.prototype[s]=c)}if(o)for(s in o)t.call(o,s)&&(c=o[s],u.prototype[s]=c);return r.mixins&&n.mixin(u.prototype,r.mixins),r.name&&(u.name=r.name),u},l=function(t,e){return n.mixin("function"==typeof t?t.prototype:t,e),t},{define:a,mixin:l,"with":{advice:r.withAdvice,property:o,lifecycle:i,event:s.withEvent,serialize:u},util:c}})}.call(this),t.dou=e("build/js/dou")}(this);