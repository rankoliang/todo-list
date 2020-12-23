(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var r=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===r?new Date(e.getTime()):"number"==typeof e||"[object Number]"===r?new Date(e):("string"!=typeof e&&"[object String]"!==r||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(t(1,arguments),"string"==typeof r){var s=r.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|\+00:?00)?/);return s?new Date(Date.UTC(+s[1],s[2]-1,+s[3],+s[4],+s[5],+s[6],+((s[7]||"0")+"00").substring(0,3))):new Date(NaN)}return e(r)}function s(t,e){return Object.fromEntries(Object.entries(t).map(e))}function i(t,s){switch(t){case Date:switch(s){case"JSON":return r;default:return e}default:return t}}const n=(a=class{constructor({id:t=null,format:e,...r}={}){this.id=t,Object.assign(this,s(this.constructor.properties,(([t])=>[t,null]))),Object.defineProperties(this,{_errors:{enumerable:!1,writable:!0},_load_format:{value:e,enumerable:!1}}),this.assign_attributes(r)}static get _staticProperties(){return Object.prototype.hasOwnProperty.call(this,"__staticProperties")||(this.__staticProperties={id:0,all:{}}),this.__staticProperties}static get model(){return"Model"}static get id(){return this._staticProperties.id++}static get id_key(){return`${this.model.toLowerCase()}_id`}static create(t){const e=new this(t);return e.save(),e}static find(t){return this._staticProperties.all[t]}static delete(t){delete this._staticProperties.all[t],this.save()}delete(){this.constructor.delete(this.id)}assign_attributes(t){Object.assign(this,this.constructor.sanitize_params(t,this._load_format)),this.assign_parent()}static sanitize_params(t,e){return s(t,(([t,r])=>[t,i(this.properties[t],e)(r)]))}assign_parent(){this.parents&&this.parents.forEach((t=>{this[t.model.toLowerCase()]=t.all.find((e=>e.id===this[t.id_key]))}))}update(t){return this.assign_attributes(t),this.save()}get errors(){return this._errors=this._errors||{}}validate(){this._errors=Object.fromEntries(Object.entries(this.constructor.properties).flatMap((([t,e])=>{const r=this[t],s=[];return null!==r&&r.constructor===e||s.push(`${r} is not of type ${e.name}`),s.length>0?[[t,s]]:[]})))}_appendError(t,e){this.errors[t]||(this.errors[t]=[]),this.errors[t].push(e)}get isValid(){return this.validate(),0===Object.keys(this.errors).length}static get all(){return this.load(),this._table}static get _table(){return Object.values(this._staticProperties.all)}},class extends a{static load(){if(!localStorage.getItem(this.model))return!1;this._staticProperties.all=function(){const t=JSON.parse(localStorage.getItem(this.model)).map((t=>[t.id,new this({...t,format:"JSON"})]));return Object.fromEntries(t)}.call(this),this._staticProperties.id=this._table.reduce(((t,e)=>!isNaN(e.id)&&t<=e.id?e.id+1:t),0)}save(){return!!this.isValid&&(this.constructor.load(),null===this.id&&(this.id=this.constructor.id),this.constructor._staticProperties.all[this.id]=new this.constructor({...this}),this.constructor.save(),this)}static save(){localStorage.setItem(this.model,JSON.stringify(this._table))}});var a;const o=class extends Array{constructor({parent:t,model:e}){super(),Object.defineProperties(this,{_model:{value:e,enumerable:!1},_parent:{value:t,enumerable:!1}}),this.push(...e.all.filter((e=>e[this._parent.constructor.id_key]===t.id)))}build({...t}){return new this._model({...t,[this._parent.constructor.id_key]:this._parent.id})}create({...t}){const e=this.build({...t});return e.save(),e}},c=class extends n{static get model(){return"Todo"}static get properties(){return{title:String,description:String,priority:String,project_id:Number,due_date:Date}}static get parents(){return[l]}},l=class extends n{static get model(){return"Project"}static get properties(){return{title:String}}get todos(){return new o({parent:this,model:c})}static delete(t){this.find(t).todos.forEach((t=>t.delete())),super.delete(t)}},d=new class{constructor(t=class extends class{constructor(){this.content=document.querySelector("#content")}static clearNode(t){for(;t.firstChild;)t.removeChild(t.lastChild)}render(t,e){this.buildComponent(t,e,this.content)}buildComponent(t,e,r){Object.assign(this,e),this.constructor.clearNode(r),this[t]().forEach((t=>{r.appendChild(t)}))}}{index(){return this.projects.map((t=>{const e=document.createElement("h2");return e.textContent=t.title,e}))}}){this.renderer=new t}index(){this.renderer.render("index",{projects:l.all})}};localStorage.clear();const u=l.create({title:"Lorem Ipsum"});u.todos.create({title:"Title",description:"description",priority:"low",due_date:Date.now()}),u.todos.create({title:"Lorem Ipsum",description:"desc",priority:"medium",due_date:Date.now()}),l.create({title:"Project 2"}),d.index()})();
//# sourceMappingURL=main.js.map