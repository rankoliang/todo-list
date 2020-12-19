(()=>{"use strict";const t=(s=class{constructor({id:t=null,...s}={}){var e,i;this.id=t,Object.assign(this,(e=this.constructor.properties,i=([t])=>[t,null],Object.fromEntries(Object.entries(e).map(i)))),this.assign_attributes(s)}static get _staticProperties(){return Object.prototype.hasOwnProperty.call(this,"__staticProperties")||(this.__staticProperties={id:0,all:{}}),this.__staticProperties}static get model(){return"Model"}static get id(){return this._staticProperties.id++}static create(t){const s=new this(t);return s.save(),s}assign_attributes(t){Object.assign(this,t)}update(t){return this.assign_attributes(t),this.save()}get errors(){return this._errors=this._errors||{}}validate(){this._errors=Object.fromEntries(Object.entries(this.constructor.properties).flatMap((([t,s])=>{const e=this[t],i=[];return null!==e&&e.constructor===s||i.push(`${e} is not of type ${s.name}`),i.length>0?[[t,i]]:[]})))}_appendError(t,s){this.errors[t]||(this.errors[t]=[]),this.errors[t].push(s)}get isValid(){return this.validate(),0===Object.keys(this.errors).length}static get all(){return this.load(),this._table}static get _table(){return Object.values(this._staticProperties.all)}},class extends s{static load(){if(!localStorage.getItem(this.model))return!1;this._staticProperties.all=JSON.parse(localStorage.getItem(this.model)).map((t=>new this(t))),this._staticProperties.id=this._table.reduce(((t,s)=>!isNaN(s.id)&&t<=s.id?s.id+1:t),0)}save(){return!!this.isValid&&(this.constructor.load(),null===this.id&&(this.id=this.constructor.id),this.constructor._staticProperties.all[this.id]=Object.assign({},this),localStorage.setItem(this.constructor.model,JSON.stringify(this.constructor._table)),this)}});var s;const e=class extends t{static get model(){return"Todo"}static get properties(){return{title:String,description:String,priority:String}}},i=new e({title:"Title",description:"description",priority:"low"});i.save(),new e({title:"Lorem Ipsum",description:"desc",priority:"medium"}).save(),i.update({title:1}),console.table(e.all)})();
//# sourceMappingURL=main.js.map