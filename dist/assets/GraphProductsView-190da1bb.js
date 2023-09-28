import{L as v}from"./leader-line-vue-b24e3c58.js";import{_ as I,r as p,o as u,c as y,d as s,w as o,F as g,a as d,e as b,i as f,b as P,t as m}from"./index-47a93c9c.js";const $={data(){return{products:[],players:[],date_data:[],input_data:[],selectedProduct:"",selectedPlayer:"",data:[],product_data:[],player_product_data:[],player_product_input_data:[],temp_input:[],product_name:"",product_input_data:[],input_data_name:[],product_output_data:[],player_data:[],actor_data:[],line_data:[]}},beforeMount(){this.getProducts()},beforeUnmount(){this.disconnectLines()},watch:{selectedProduct:function(t){this.disconnectLines(),this.product_input_data=[],this.product_output_data=[],this.selectedPlayer=null,this.getPlayer(t)},selectedPlayer:function(t){this.disconnectLines(),console.log(t),this.getPlayerProduct(t)}},methods:{async getProducts(){this.data=await this.$store.dispatch("searchAllProducts"),console.log(this.data);for(let t=0;t<this.data.length;t++)this.products.push({id:this.data[t].id,name:this.data[t].name})},async getProduct(t){this.product_data=await this.$store.dispatch("searchProduct",t),console.log(this.product_data)},async getPlayer(t){this.product_data=await this.$store.dispatch("searchProduct",t),console.log(this.product_data),this.product_name=this.product_data[0].name,this.player_product_data=await this.$store.dispatch("searchPlayerByProduct",t),console.log(this.player_product_data);var a=0;for(let r=0;r<this.player_product_data.length;r++){this.player_data=await this.$store.dispatch("searchFinalPlayer",this.player_product_data[r].player_id),console.log(this.player_data),this.actor_data=await this.$store.dispatch("searchActor",this.player_data[0].actor_id),console.log(this.actor_data[0].name),this.players.push({id:this.player_data[0].id,name:this.actor_data[0].name}),console.log("Hello"),this.player_product_input_data=await this.$store.dispatch("getPlayerProductInput",this.player_product_data[r].id),console.log(this.player_product_input_data);for(let i=0;i<this.player_product_input_data.length;i++){this.input_data=await this.$store.dispatch("getInput",this.player_product_input_data[i].input_id),console.log(this.input_data[0].name);var e=!1;e=this.temp_input.includes(this.input_data[0].name),e||(this.temp_input.push(this.input_data[0].name),this.product_input_data.push({id:a,name:this.input_data[0].name}),a++)}}this.getInputByName()},async getPlayerProduct(t){this.player_product_data=await this.$store.dispatch("searchPlayerProduct",t),console.log(this.player_product_data);for(let a=0;a<this.player_product_data.length;a++)if(this.player_product_data[a].product_id==this.selectedProduct){console.log("Hello"),this.player_product_input_data=await this.$store.dispatch("getPlayerProductInput",this.player_product_data[a].id),console.log(this.player_product_input_data);for(let e=0;e<this.player_product_input_data.length;e++)this.input_data=await this.$store.dispatch("getInput",this.player_product_input_data[e].input_id),console.log(this.input_data[0].name),this.product_input_data.push({id:e,name:this.input_data[0].name})}this.getInputByName()},async getPlayerProductInput(t){this.player_product_input_data=await this.$store.dispatch("getPlayerProductInput",t),console.log(this.player_product_input_data);for(let a=0;a<this.player_product_input_data.length;a++)this.getInput(a,this.player_product_input_data[a].input_id)},async getInput(t,a){this.input_data=await this.$store.dispatch("getInput",a),console.log(this.input_data[0].name),this.product_input_data.push({id:t,name:this.input_data[0].name})},async getInputByName(){this.input_data=await this.$store.dispatch("getInput",1),console.log(this.input_data[0].name),this.connectLines()},async getPlayerProductInputByInput(t,a){this.player_product_input_data=await this.$store.dispatch("getPlayerProductInputByInput",a),console.log(this.player_product_input_data);for(let e=0;e<this.player_product_input_data.length;e++){console.log(this.player_product_input_data[e].player_product_id),this.player_product_data=await this.$store.dispatch("getPlayerProductByInput",this.player_product_input_data[e].player_product_id),console.log(this.player_product_data);for(let r=0;r<this.player_product_data.length;r++)this.getProductByInput(r,this.player_product_data[e].product_id)}this.getProduct(t)},async getProductByInput(t,a){this.product_data=await this.$store.dispatch("searchProduct",a),console.log(this.product_data),this.product_output_data.push({id:t,name:this.product_data[0].name})},async connectLines(){console.log("Helloooo connect lines");for(let e=0;e<this.product_input_data.length;e++){var t="input"+e,a=new v.setLine(document.getElementById(t),product,{color:"#3498db",path:"grid",endPlug:"show"});a.setOptions({startSocket:"right",endSocket:"left"}),this.line_data.push(a)}},async disconnectLines(){console.log("Helloooo disconnect lines");for(let t=0;t<this.line_data.length;t++)this.line_data[t].hide()}}},B=d("br",null,null,-1),x={class:"text-center"},L=d("div",{class:"py"},null,-1),k={class:"text-subtitle-1"},N={class:"text-center"},V=d("div",{class:"py"},null,-1),H={class:"text-subtitle-1"},S={class:"text-center"},j=d("div",{class:"py"},null,-1),F={class:"text-subtitle-1"};function A(t,a,e,r,i,C){const c=p("v-row"),w=p("v-autocomplete"),l=p("v-col"),_=p("v-sheet");return u(),y(g,null,[s(c,{class:"form-style"},{default:o(()=>[s(l,null,{default:o(()=>[s(c,{"no-gutters":""},{default:o(()=>[b("Product")]),_:1}),s(w,{class:"ma-1 pa-0",items:i.products,"item-title":"name","item-value":"id",modelValue:i.selectedProduct,"onUpdate:modelValue":a[0]||(a[0]=n=>i.selectedProduct=n),placeholder:"Select",density:"compact",variant:"outlined"},null,8,["items","modelValue"])]),_:1})]),_:1}),B,s(c,{class:"ma-0"},{default:o(()=>[s(l,{class:"ma-0"},{default:o(()=>[(u(!0),y(g,null,f(i.product_input_data,(n,h)=>(u(),P(c,{ref_for:!0,ref:"input"+n.id,key:h},{default:o(()=>[s(l,null,{default:o(()=>[d("div",x,[s(_,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"input"+n.id},null,8,["id"]),L,d("code",k,m(n.name),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1}),s(l,{class:"ma-0"},{default:o(()=>[s(c,null,{default:o(()=>[s(l,null,{default:o(()=>[d("div",N,[s(_,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"product"}),V,d("code",H,m(i.product_name),1)])]),_:1})]),_:1})]),_:1}),s(l,{class:"ma-0"},{default:o(()=>[(u(!0),y(g,null,f(i.product_output_data,(n,h)=>(u(),P(c,{ref_for:!0,ref:"output"+n.id,key:h},{default:o(()=>[s(l,null,{default:o(()=>[d("div",S,[s(_,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"output"+n.id},null,8,["id"]),j,d("code",F,m(n.name),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})],64)}const D=I($,[["render",A]]);export{D as default};