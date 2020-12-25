(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){if(t(1,arguments),"string"==typeof n){var r=n.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|\+00:?00)?/);return r?new Date(Date.UTC(+r[1],r[2]-1,+r[3],+r[4],+r[5],+r[6],+((r[7]||"0")+"00").substring(0,3))):new Date(NaN)}return e(n)}function r(t,e){return Object.fromEntries(Object.entries(t).map(e))}function a(t,r){switch(t){case Date:switch(r){case"JSON":return n;default:return e}default:return t}}function i({tag:t,classes:e=[],...n},...r){const a=document.createElement(t);return a.classList.add(...e),Object.assign(a,n),o(a,...r),a}function o(t,...e){return e.forEach((e=>{t.appendChild(e)})),t}const s=(u=class{constructor({id:t=null,format:e,...n}={}){this.id=t,Object.assign(this,r(this.constructor.properties,(([t])=>[t,null]))),this.constructor.defaults&&Object.assign(this,this.constructor.sanitize_params(this.constructor.defaults)),Object.defineProperties(this,{_errors:{enumerable:!1,writable:!0},_load_format:{value:e,enumerable:!1}}),this.assign_attributes(n)}static get _staticProperties(){return Object.prototype.hasOwnProperty.call(this,"__staticProperties")||(this.__staticProperties={id:0,all:{}}),this.__staticProperties}static get model(){return"Model"}static get id(){return this._staticProperties.id++}static get id_key(){return`${this.model.toLowerCase()}Id`}static create(t){const e=new this(t);return e.save(),e}static find(t){return this._staticProperties.all[t]}static delete(t){delete this._staticProperties.all[t],this.save()}delete(){this.constructor.delete(this.id)}assign_attributes(t){Object.assign(this,this.constructor.sanitize_params(t,this._load_format)),this.assign_parent()}static sanitize_params(t,e){return r(t,(([t,n])=>[t,a(this.properties[t],e)(n)]))}assign_parent(){this.parents&&this.parents.forEach((t=>{this[t.model.toLowerCase()]=t.all.find((e=>e.id===this[t.id_key]))}))}update(t){return this.assign_attributes(t),this.save()}get errors(){return this._errors=this._errors||{}}validate(){this._errors=Object.fromEntries(Object.entries(this.constructor.properties).flatMap((([t,e])=>{const n=this[t],r=[];return null!==n&&n.constructor===e||r.push(`${n} is not of type ${e.name}`),r.length>0?[[t,r]]:[]})))}_appendError(t,e){this.errors[t]||(this.errors[t]=[]),this.errors[t].push(e)}get isValid(){return this.validate(),0===Object.keys(this.errors).length}static get all(){return this.load(),this._table}static get _table(){return Object.values(this._staticProperties.all)}},class extends u{static load(){if(!localStorage.getItem(this.model))return!1;this._staticProperties.all=function(){const t=JSON.parse(localStorage.getItem(this.model)).map((t=>[t.id,new this({...t,format:"JSON"})]));return Object.fromEntries(t)}.call(this),this._staticProperties.id=this._table.reduce(((t,e)=>!isNaN(e.id)&&t<=e.id?e.id+1:t),0)}save(){return!!this.isValid&&(this.constructor.load(),null===this.id&&(this.id=this.constructor.id),this.constructor._staticProperties.all[this.id]=new this.constructor({...this}),this.constructor.save(),this)}static save(){localStorage.setItem(this.model,JSON.stringify(this._table))}});var u;class c extends Array{constructor({parent:t,model:e}){super(),Object.defineProperties(this,{_model:{value:e,enumerable:!1},_parent:{value:t,enumerable:!1}}),this.push(...e.all.filter((e=>e[this._parent.constructor.id_key]===t.id)))}static get[Symbol.species](){return Array}build({...t}){return new this._model({...t,[this._parent.constructor.id_key]:this._parent.id})}create({...t}){const e=this.build({...t});return e.save(),e}}const d=c;function l(n){t(1,arguments);var r=e(n);return!isNaN(r)}var h={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function f(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var m,g={date:f({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:f({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:f({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},p={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function w(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var s=t.defaultWidth,u=a.width?String(a.width):t.defaultWidth;r=t.values[u]||t.values[s]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function b(t){return function(e,n){var r=String(e),a=n||{},i=a.width,o=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],s=r.match(o);if(!s)return null;var u,c=s[0],d=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),u=t.valueCallback?t.valueCallback(u):u,{value:u=a.valueCallback?a.valueCallback(u):u,rest:r.slice(c.length)}}}const v={code:"en-US",formatDistance:function(t,e,n){var r;return n=n||{},r="string"==typeof h[t]?h[t]:1===e?h[t].one:h[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:g,formatRelative:function(t,e,n,r){return p[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:w({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:w({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:w({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:w({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:w({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(m={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(m.matchPattern);if(!a)return null;var i=a[0],o=n.match(m.parsePattern);if(!o)return null;var s=m.valueCallback?m.valueCallback(o[0]):o[0];return{value:s=r.valueCallback?r.valueCallback(s):s,rest:n.slice(i.length)}}),era:b({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:b({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:b({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:b({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:b({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function y(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function T(n,r){t(2,arguments);var a=e(n).getTime(),i=y(r);return new Date(a+i)}function C(e,n){t(2,arguments);var r=y(n);return T(e,-r)}function x(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const M=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return x("yy"===e?r%100:r,e.length)},P=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):x(n+1,2)},D=function(t,e){return x(t.getUTCDate(),e.length)},j=function(t,e){return x(t.getUTCHours()%12||12,e.length)},k=function(t,e){return x(t.getUTCHours(),e.length)},S=function(t,e){return x(t.getUTCMinutes(),e.length)},_=function(t,e){return x(t.getUTCSeconds(),e.length)},O=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return x(Math.floor(r*Math.pow(10,n-3)),e.length)};var U=864e5;function E(n){t(1,arguments);var r=1,a=e(n),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function N(n){t(1,arguments);var r=e(n),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=E(i),s=new Date(0);s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0);var u=E(s);return r.getTime()>=o.getTime()?a+1:r.getTime()>=u.getTime()?a:a-1}function W(e){t(1,arguments);var n=N(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=E(r);return a}var Y=6048e5;function q(n,r){t(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,s=null==o?0:y(o),u=null==a.weekStartsOn?s:y(a.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=e(n),d=c.getUTCDay(),l=(d<u?7:0)+d-u;return c.setUTCDate(c.getUTCDate()-l),c.setUTCHours(0,0,0,0),c}function z(n,r){t(1,arguments);var a=e(n,r),i=a.getUTCFullYear(),o=r||{},s=o.locale,u=s&&s.options&&s.options.firstWeekContainsDate,c=null==u?1:y(u),d=null==o.firstWeekContainsDate?c:y(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,d),l.setUTCHours(0,0,0,0);var h=q(l,r),f=new Date(0);f.setUTCFullYear(i,0,d),f.setUTCHours(0,0,0,0);var m=q(f,r);return a.getTime()>=h.getTime()?i+1:a.getTime()>=m.getTime()?i:i-1}function L(e,n){t(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:y(i),s=null==r.firstWeekContainsDate?o:y(r.firstWeekContainsDate),u=z(e,n),c=new Date(0);c.setUTCFullYear(u,0,s),c.setUTCHours(0,0,0,0);var d=q(c,n);return d}var G=6048e5;function X(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+x(i,2)}function H(t,e){return t%60==0?(t>0?"-":"+")+x(Math.abs(t)/60,2):F(t,e)}function F(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+x(Math.floor(a/60),2)+n+x(a%60,2)}const Q={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return M(t,e)},Y:function(t,e,n,r){var a=z(t,r),i=a>0?a:1-a;return"YY"===e?x(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):x(i,e.length)},R:function(t,e){return x(N(t),e.length)},u:function(t,e){return x(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return x(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return x(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return P(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return x(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,i){var o=function(n,r){t(1,arguments);var a=e(n),i=q(a,r).getTime()-L(a,r).getTime();return Math.round(i/G)+1}(n,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):x(o,r.length)},I:function(n,r,a){var i=function(n){t(1,arguments);var r=e(n),a=E(r).getTime()-W(r).getTime();return Math.round(a/Y)+1}(n);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):x(i,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):D(t,e)},D:function(n,r,a){var i=function(n){t(1,arguments);var r=e(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/U)+1}(n);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):x(i,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return x(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return x(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return x(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return j(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):k(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):x(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):x(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):S(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):_(t,e)},S:function(t,e){return O(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return H(a);case"XXXX":case"XX":return F(a);case"XXXXX":case"XXX":default:return F(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return H(a);case"xxxx":case"xx":return F(a);case"xxxxx":case"xxx":default:return F(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+X(a,":");case"OOOO":default:return"GMT"+F(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+X(a,":");case"zzzz":default:return"GMT"+F(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return x(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return x((r._originalDate||t).getTime(),e.length)}};function B(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function A(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const R={p:A,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return B(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",B(a,e)).replace("{{time}}",A(i,e))}};var J=6e4;function I(t){return t.getTime()%J}function $(t){var e=new Date(t.getTime()),n=Math.ceil(e.getTimezoneOffset());e.setSeconds(0,0);var r=n>0?(J+I(e))%J:I(e);return n*J+r}var V=["D","DD"],K=["YY","YYYY"];function Z(t){return-1!==V.indexOf(t)}function tt(t){return-1!==K.indexOf(t)}function et(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var nt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,rt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,at=/^'([^]*?)'?$/,it=/''/g,ot=/[a-zA-Z]/;function st(t){return t.match(at)[1].replace(it,"'")}const ut=class extends s{constructor(...t){super(...t)}static get defaults(){return{complete:!1,dueDate:Date.now()}}static get model(){return"Todo"}static get properties(){return{title:String,description:String,priority:String,projectId:Number,dueDate:Date,complete:Boolean}}static get parents(){return[ct]}get formatted_date(){return function(n,r,a){t(2,arguments);var i=String(r),o=a||{},s=o.locale||v,u=s.options&&s.options.firstWeekContainsDate,c=null==u?1:y(u),d=null==o.firstWeekContainsDate?c:y(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=s.options&&s.options.weekStartsOn,f=null==h?0:y(h),m=null==o.weekStartsOn?f:y(o.weekStartsOn);if(!(m>=0&&m<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var g=e(n);if(!l(g))throw new RangeError("Invalid time value");var p=$(g),w=C(g,p),b={firstWeekContainsDate:d,weekStartsOn:m,locale:s,_originalDate:g};return i.match(rt).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,R[e])(t,s.formatLong,b):t})).join("").match(nt).map((function(t){if("''"===t)return"'";var e=t[0];if("'"===e)return st(t);var a=Q[e];if(a)return!o.useAdditionalWeekYearTokens&&tt(t)&&et(t,r,n),!o.useAdditionalDayOfYearTokens&&Z(t)&&et(t,r,n),a(w,t,s.localize,b);if(e.match(ot))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return t})).join("")}(this.dueDate,"MM/dd/yyyy")}},ct=class extends s{static get model(){return"Project"}static get properties(){return{title:String}}get todos(){return new d({parent:this,model:ut})}static delete(t){this.find(t).todos.forEach((t=>t.delete())),super.delete(t)}},dt=function(t){const e={};var n;return i({tag:"div",classes:["todo"]},e.complete=i({tag:"input",type:"checkbox",name:"todo-complete"}),i({tag:"div",classes:["todo--important"]},i({tag:"span",classes:["todo--title"],textContent:t.title}),document.createTextNode(" - "),i({tag:"span",classes:["todo--description"],textContent:t.description})),i({tag:"div",classes:["todo--info"]},i({tag:"div",classes:["todo--priority",`todo--priority__${t.priority}`],textContent:`${n=t.priority,n.charAt(0).toUpperCase()+n.slice(1)} Priority`}),i({tag:"div",classes:["todo--due-date"],textContent:`Due ${t.formatted_date}`}),i({tag:"form",classes:["todo--buttons"]},e.edit=i({tag:"button",classes:["todo--edit"],textContent:"Edit"}),e.delete=i({tag:"button",classes:["todo--delete"],textContent:"Delete"}))))},lt=class{constructor(t){this.model=t,this.input={},Object.assign(this,t)}buttonRenderTemplate({buttonRole:t,element:e,template:n}){this.input[t].addEventListener("click",(()=>{e.parentNode.replaceChild(new this.constructor.alternate(this.model)[n],e)}))}},ht=function(t){var e;return i({tag:"div",classes:["project"]},new ft({project:t}).titleGroup,i({tag:"div",classes:["project--card"]},...(e=t.todos,e.map(dt))))};class ft extends lt{static get alternate(){return mt}get titleGroup(){const t=i({tag:"div",classes:["project--title-group"]},i({tag:"h2",classes:["project--title"],textContent:this.project.title}),i({tag:"form"},this.input.edit=i({tag:"input",classes:["btn","btn__yellow"],type:"button",name:"edit-project",value:"Edit"}),this.input.delete=i({tag:"input",classes:["btn","btn__red"],type:"button",name:"delete-project",value:"Delete"})));return this.buttonRenderTemplate({element:t,buttonRole:"edit",template:"titleGroup"}),this.input.delete.addEventListener("click",(()=>{wt.destroy(this.project.id)})),t}}class mt extends lt{static get alternate(){return ft}get titleGroup(){const t=i({tag:"form",classes:["project--title-group","project--edit-title"]},this.input.title=i({tag:"input",type:"text",class:"project--title",name:"project-title",placeholder:"Project Title",value:this.project.title,size:"8"}),this.input.cancel=i({tag:"input",type:"button",classes:["btn","btn__red"],name:"cancel-project-rename",value:"N"}),this.input.confirm=i({tag:"input",type:"submit",classes:["btn","btn__green"],name:"confirm-project-rename",value:"Y"}));return["cancel","confirm"].forEach((t=>{this.input[t].addEventListener("click",(t=>{t.preventDefault(),wt.index()}))})),this.input.confirm.addEventListener("click",(()=>{null===this.project.id?wt.create({title:this.input.title.value}):wt.update(this.project.id,{title:this.input.title.value})})),t}}const gt=function(t){return t.map(ht)},pt=function(){const t=i({tag:"form"},i({tag:"input",classes:["btn","btn__yellow","project--create"],name:"project--create",type:"button",value:"New Project"}));return t.addEventListener("click",(()=>{wt.new()})),t}(),wt=new class{constructor(t=class extends class{constructor(){this.content=document.querySelector("#content")}render(t,e){!function(t){for(;t.firstChild;)t.removeChild(t.lastChild)}(this.content),this.buildComponent(t,e,this.content)}buildComponent(t,e,n){return Object.assign(this,e),o(n||i({tag:"div"}),...this[t]())}}{index(){return t=this.projects,[...gt(t),pt];var t}new(){return t=this.projects,e=this.project,[...gt(t),new mt({project:e}).titleGroup,pt];var t,e}}){this.renderer=new t}index(){this.renderer.render("index",{projects:ct.all})}new(){this.renderer.render("new",{projects:ct.all,project:new ct({title:""})})}create(t){new ct(t).save()&&this.index()}update(t,e){ct.find(t).update(e)&&this.index()}destroy(t){ct.delete(t),this.index()}};wt.index()})();
//# sourceMappingURL=main.js.map