(()=>{"use strict";const t=(e=class{constructor({id:t=null,...e}={}){var s,i;this.id=t,Object.assign(this,(s=this.constructor.properties,i=([t])=>[t,null],Object.fromEntries(Object.entries(s).map(i)))),this.assign_attributes(e)}static get _staticProperties(){return Object.prototype.hasOwnProperty.call(this,"__staticProperties")||(this.__staticProperties={id:0,all:{}}),this.__staticProperties}static get model(){return"Model"}static get id(){return this._staticProperties.id++}static get id_key(){return`${this.model.toLowerCase()}_id`}static create(t){const e=new this(t);return e.save(),e}static find(t){return this._staticProperties.all[t]}static delete(t){delete this._staticProperties.all[t],this.save()}delete(){this.constructor.delete(this.id)}assign_attributes(t){Object.assign(this,t),this.assign_parent()}assign_parent(){this.parents&&this.parents.forEach((t=>{this[t.model.toLowerCase()]=t.all.find((e=>e.id===this[t.id_key]))}))}update(t){return this.assign_attributes(t),this.save()}get errors(){return this._errors=this._errors||{}}validate(){this._errors=Object.fromEntries(Object.entries(this.constructor.properties).flatMap((([t,e])=>{const s=this[t],i=[];return null!==s&&s.constructor===e||i.push(`${s} is not of type ${e.name}`),i.length>0?[[t,i]]:[]})))}_appendError(t,e){this.errors[t]||(this.errors[t]=[]),this.errors[t].push(e)}get isValid(){return this.validate(),0===Object.keys(this.errors).length}static get all(){return this.load(),this._table}static get _table(){return Object.values(this._staticProperties.all)}},class extends e{static load(){if(!localStorage.getItem(this.model))return!1;this._staticProperties.all=function(){const t=JSON.parse(localStorage.getItem(this.model)).map((t=>[t.id,new this(t)]));return Object.fromEntries(t)}.call(this),this._staticProperties.id=this._table.reduce(((t,e)=>!isNaN(e.id)&&t<=e.id?e.id+1:t),0)}save(){return!!this.isValid&&(this.constructor.load(),null===this.id&&(this.id=this.constructor.id),this.constructor._staticProperties.all[this.id]=new this.constructor({...this}),this.constructor.save(),this)}static save(){localStorage.setItem(this.model,JSON.stringify(this._table))}});var e;const s=class extends Array{constructor({parent:t,model:e}){super(),this._model=e,this._parent=t,this.push(...e.all.filter((e=>e[this._parent.constructor.id_key]===t.id)))}build({...t}){return new this._model({...t,[this._parent.constructor.id_key]:this._parent.id})}create({...t}){const e=this.build({...t});return e.save(),e}},i=class extends t{static get model(){return"Project"}static get properties(){return{title:String}}get todos(){return new s({parent:this,model:r})}static delete(t){this.find(t).todos.forEach((t=>t.delete())),super.delete(t)}},r=class extends t{static get model(){return"Todo"}static get properties(){return{title:String,description:String,priority:String,project_id:Number}}static get parents(){return[i]}};localStorage.clear();const o=new i({title:"Lorem Ipsum"});o.save(),o.todos.create({title:"Title",description:"description",priority:"low"}),o.todos.create({title:"Lorem Ipsum",description:"desc",priority:"medium"}),o.delete();const a=new i({title:"Ipsum Lorem"});a.save(),a.todos.build({title:"Title",description:"description",priority:"low"}).save(),console.table(r.all)})();
//# sourceMappingURL=main.js.map