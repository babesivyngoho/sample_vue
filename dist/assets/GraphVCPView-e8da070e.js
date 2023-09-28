import{L as g}from"./leader-line-vue-b24e3c58.js";import{_ as S,r as m,o as r,c as b,d as a,w as l,F as f,b as h,h as k,i as w,a as n,t as v}from"./index-47a93c9c.js";const B={data(){return{rotation:0,business:[],supplier:[],buyer:[],supp_data:[],temp_supp_data:[],buy_data:[],temp_buy_data:[],data:[],player_data:"",actor_data:"",supplier_data:"",buyer_data:"",message:"",selectedPlayer:"",player:null,supp_line:[],buy_line:[],industry_line:[],isReport:null,industry_player:[]}},beforeMount(){this.getPlayers()},beforeUnmount(){this.disconnectLines()},watch:{selectedPlayer:function(e){this.disconnectLines(),console.log("helloooo newvalue"),console.log(e),this.supp_data=[],this.temp_supp_data=[],this.buy_data=[],this.temp_buy_data=[],this.industry_player=[],this.getSupplier(e)}},mounted(){this.initial()},methods:{initial(){console.log(localStorage.getItem("isReport")),this.isReport=localStorage.getItem("isReport")},async getPlayers(){this.data=await this.$store.dispatch("getAllPlayers"),console.log(this.data);for(let e=0;e<this.data.length;e++)this.getBusinessName(this.data[e].actor_id)},async getPlayer(e){this.player_data=await this.$store.dispatch("searchActor",e),console.log(this.player_data[0].name),this.player=this.player_data[0].name,this.connectLines()},async getBusinessName(e){this.actor_data=await this.$store.dispatch("searchActor",e),console.log(this.actor_data[0].name),this.business.push({id:e,name:this.actor_data[0].name})},async getSupplier(e){console.log(e),this.temp_supp_data=[],this.supp_data=[],this.supplier_data=await this.$store.dispatch("getSupplier",e),console.log(this.supplier_data);for(let o=0;o<this.supplier_data.length;o++){console.log(this.supplier_data[o].supplier_actor_id),this.supplier=await this.$store.dispatch("searchActor",this.supplier_data[o].supplier_actor_id),console.log(this.supplier[0].name);var s=this.temp_supp_data.includes(this.supplier[0].name);s||(this.temp_supp_data.push(this.supplier[0].name),this.supp_data.push({id:o,name:this.supplier[0].name}))}this.getBuyers(e)},async getBuyers(e){console.log(e),this.buy_data=[],this.buyer_data=await this.$store.dispatch("getBuyer",e),console.log("buyeeeeer"),console.log(this.buyer_data);var s=0;for(let i=0;i<this.buyer_data.length;i++){console.log(this.buyer_data[i].actor_id),this.buyer=await this.$store.dispatch("searchActor",this.buyer_data[i].actor_id);var o=this.temp_buy_data.includes(this.buyer[0].name);o||(console.log(this.buyer[0].name),this.temp_buy_data.push(this.buyer[0].name),this.buy_data.push({id:i,name:this.buyer[0].name}),(this.buyer_data[i].price!=null||this.buyer_data[i].term_duration!=null)&&(console.log("Hellooo not null"),this.buyer=await this.$store.dispatch("searchActor",this.buyer_data[i].supplier_actor_id),this.industry_player.push({id:s,name:this.buyer[0].name})))}this.getPlayer(e)},async connectLines(){console.log("Helloooo connect lines");for(let t=0;t<this.supp_data.length;t++){var e="supp"+t,s=new g.setLine(document.getElementById(e),player,{color:"#3498db",path:"grid",endPlug:"show"});s.setOptions({startSocket:"right",endSocket:"left"}),this.supp_line.push(s)}if(console.log(this.industry_player),this.industry_player.length!=0)for(let t=0;t<this.industry_player.length;t++){var o="industry"+t,s=new g.setLine(player,document.getElementById(o),{color:"#3498db",path:"grid",endPlug:"show"});s.setOptions({startSocket:"right",endSocket:"left"}),this.industry_line.push(s);for(let _=0;_<this.buy_data.length;_++){var i="buy"+_,s=new g.setLine(document.getElementById(o),document.getElementById(i),{color:"#3498db",path:"grid",endPlug:"show"});s.setOptions({startSocket:"right",endSocket:"left"}),this.buy_line.push(s)}}else for(let t=0;t<this.buy_data.length;t++){var i="buy"+t,s=new g.setLine(player,document.getElementById(i),{color:"#3498db",path:"grid",endPlug:"show"});s.setOptions({startSocket:"right",endSocket:"left"}),this.buy_line.push(s)}},async disconnectLines(){console.log("Helloooo disconnect lines");for(let e=0;e<this.supp_line.length;e++)this.supp_line[e].hide();for(let e=0;e<this.buy_line.length;e++)this.buy_line[e].hide()}}},L={class:"text-center"},x=n("div",{class:"py"},null,-1),V={class:"text-subtitle-1"},I={class:"text-center"},A=n("div",{class:"py"},null,-1),E={class:"text-subtitle-1"},C={class:"text-center"},N=n("div",{class:"py"},null,-1),R={class:"text-subtitle-1"},O={class:"text-center"},j=n("div",{class:"py"},null,-1),H={class:"text-subtitle-1"};function F(e,s,o,i,t,G){const _=m("v-autocomplete"),d=m("v-col"),P=m("v-btn"),p=m("v-row"),y=m("v-sheet");return r(),b(f,null,[a(p,{justify:"space-between"},{default:l(()=>[a(d,null,{default:l(()=>[a(_,{items:t.business,"item-title":"name","item-value":"id",modelValue:t.selectedPlayer,"onUpdate:modelValue":s[0]||(s[0]=u=>t.selectedPlayer=u),placeholder:"Select",density:"compact",variant:"outlined",class:"form-style"},null,8,["items","modelValue"])]),_:1}),t.isReport!="null"?(r(),h(p,{key:0,justify:"end"},{default:l(()=>[a(P,{flat:"",class:"ma-2",icon:"mdi-printer-outline"})]),_:1})):k("",!0)]),_:1}),a(p,{class:"ma-0"},{default:l(()=>[a(d,{class:"ma-0"},{default:l(()=>[(r(!0),b(f,null,w(t.supp_data,(u,c)=>(r(),h(p,{ref_for:!0,ref:"supp"+u.id,key:c},{default:l(()=>[a(d,null,{default:l(()=>[n("div",L,[a(y,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"supp"+c},null,8,["id"]),x,n("code",V,v(u.name),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1}),a(d,{class:"ma-0"},{default:l(()=>[a(p,null,{default:l(()=>[a(d,null,{default:l(()=>[n("div",I,[t.player!=null?(r(),h(y,{key:0,flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"player"})):(r(),h(y,{key:1,flat:"",class:"pa-6 bg-white rounded-circle d-inline-block",id:"player"})),A,n("code",E,v(t.player),1)])]),_:1})]),_:1})]),_:1}),t.industry_player.length!=0?(r(),h(d,{key:0,class:"ma-0"},{default:l(()=>[(r(!0),b(f,null,w(t.industry_player,(u,c)=>(r(),h(p,{ref_for:!0,ref:"industry"+u.id,key:c},{default:l(()=>[a(d,null,{default:l(()=>[n("div",C,[a(y,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"industry"+c},null,8,["id"]),N,n("code",R,v(u.name),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1})):k("",!0),a(d,{class:"ma-0"},{default:l(()=>[(r(!0),b(f,null,w(t.buy_data,(u,c)=>(r(),h(p,{ref_for:!0,ref:"buy"+u.id,key:c},{default:l(()=>[a(d,null,{default:l(()=>[n("div",O,[a(y,{flat:"",class:"pa-6 bg-brown-lighten-4 rounded-circle d-inline-block",id:"buy"+c},null,8,["id"]),j,n("code",H,v(u.name),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})],64)}const D=S(B,[["render",F]]);export{D as default};
