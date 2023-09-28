import{u as w}from"./breadcrumbsHandler-694eac1c.js";import{_ as L,r as a,o as h,c as u,d,w as p,f as V,F as f,b as T,h as x,a as r,i as S,t as I,n as b,e as g,p as B,g as R}from"./index-47a93c9c.js";const F={emits:["activeView"],data(){return{viewName:"Search",isReport:null,isReady:!1,selectedSector:null,selectedLocation:null,selectedProduct:null,selectedVCP:null,searchString:"",storePlayers:[],storeProducts:[],data:"",business_data:"",final_product_data:[],sectorItems:[{title:"All"},{title:"Agriculture"},{title:"Fisheries"}],locationItems:[],productItems:[],businessItems:[],locItems:[],vcplayertypeItems:[{title:"All"},{title:"Producer"},{title:"Processor"},{title:"Trader"}],prodItems:[],filters:[{id:0,name:"Sector",enabled:!1,col_name:"sector"},{id:1,name:"Location",enabled:!1,col_name:"location"},{id:2,name:"Products",enabled:!1,col_name:"products"},{id:3,name:"VC Player",enabled:!1,col_name:"vcplayer"}],headers:[{name:"Business Name",col_name:"business_name",align:"center",width:"1%"},{name:"Sector",col_name:"sector",align:"center",width:"1%"},{name:"Location",col_name:"location",align:"center",width:"1%"},{name:"VC Player Type",col_name:"vcplayer_type",align:"center",width:"1%"},{name:"Products",col_name:"products",align:"center",width:"1%"},{name:"Actions",col_name:"actions",align:"center",width:"1%"}],toggle:[],selected_sector:"Sector",actor_data:"",product_data:"",player_data:"",player_product_data:""}},mounted(){this.activeView(),this.isReady=!0},watch:{selectedVCP:function(o){o==="Producer"?this.updateTableVCP(1):o==="Processor"?this.updateTableVCP(2):o==="Trader"?this.updateTableVCP(3):o==="All"&&this.updateTableVCP(0)},selectedSector:function(o){this.updateTableSector(o)},selectedLocation:function(o){this.updateTableLocation(o)},selectedProduct:function(o){this.updateTableProduct(o)}},methods:{setData(){var o=JSON.parse(localStorage.getItem("breadcrumbs")),t={title:"Search",disabled:!0,href:"/home/search"};this.items=w(o,t),this.isReady=!0},activeView(){console.log(localStorage.getItem("isReport")),this.isReport=localStorage.getItem("isReport"),this.$emit("activeView",this.viewName)},onClick(o){console.log(o),this.filters[o].enabled=!this.filters[o].enabled},getColor(o){if(o===1)return"#dbc1a7";if(o===2)return"#e6b470"},getColorSector(o){if(o==="Agriculture")return"#BAD4AF";if(o==="Fisheries")return"#B3CDE0"},getText(o){if(o===1)return"Producer";if(o===2)return"Processor";if(o===3)return"Trader"},updateTableVCP(o){var t=[];if(this.prodItems=this.storePlayers,console.log(this.selectedVCP),console.log(this.selectedProduct),console.log(this.selectedLocation),console.log(this.selectedSector),o===0){if(t=this.prodItems,this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].product_name===this.selectedProduct&&t.push(this.prodItems[s])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].sector===this.selectedSector&&t.push(this.prodItems[s])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].location===this.selectedLocation&&t.push(this.prodItems[s])}}else{for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].vcplayer_type===o&&t.push(this.prodItems[s]);if(this.prodItems=t,console.log(this.prodItems),this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].product_name===this.selectedProduct&&t.push(this.prodItems[s])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].sector===this.selectedSector&&t.push(this.prodItems[s])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedLocation==="All")t=this.prodItems;else{t=[];for(let s=0;s<this.prodItems.length;s++)console.log(this.prodItems[s]),this.prodItems[s].location===this.selectedLocation&&t.push(this.prodItems[s])}}this.prodItems=t},updateTableProduct(o){var t=[];if(this.prodItems=this.storePlayers,console.log(o),console.log(this.prodItems),console.log(this.selectedVCP),console.log(this.selectedProduct),console.log(this.selectedLocation),console.log(this.selectedSector),o==="All"){if(t=this.prodItems,this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),console.log(this.prodItems[e].vcplayer_type),console.log(this.selectedVCP),this.prodItems[e].vcplayer_type===1?s="Producer":this.prodItems[e].vcplayer_type===2?s="Processor":this.prodItems[e].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].sector===this.selectedSector&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].location===this.selectedLocation&&t.push(this.prodItems[e])}}else{for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),console.log(this.prodItems[e].product_name),this.prodItems[e].product_name===o&&t.push(this.prodItems[e]);if(this.prodItems=t,console.log(this.prodItems),this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let l=0;l<this.prodItems.length;l++)console.log(this.prodItems[l]),console.log(this.prodItems[l].vcplayer_type),console.log(this.selectedVCP),this.prodItems[l].vcplayer_type===1?s="Producer":this.prodItems[l].vcplayer_type===2?s="Processor":this.prodItems[l].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[l])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].sector===this.selectedSector&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedLocation==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].location===this.selectedLocation&&t.push(this.prodItems[e])}}this.prodItems=t},updateTableSector(o){var t=[];if(this.prodItems=this.storePlayers,o==="All"){if(t=this.prodItems,this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),console.log(this.prodItems[e].vcplayer_type),console.log(this.selectedVCP),this.prodItems[e].vcplayer_type===1?s="Producer":this.prodItems[e].vcplayer_type===2?s="Processor":this.prodItems[e].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedLocation==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].location===this.selectedLocation&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].product_name===this.selectedProduct&&t.push(this.prodItems[e])}}else{for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].sector===this.selectedSector&&t.push(this.prodItems[e]);if(this.prodItems=t,console.log(this.prodItems),this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let l=0;l<this.prodItems.length;l++)console.log(this.prodItems[l]),console.log(this.prodItems[l].vcplayer_type),console.log(this.selectedVCP),this.prodItems[l].vcplayer_type===1?s="Producer":this.prodItems[l].vcplayer_type===2?s="Processor":this.prodItems[l].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[l])}if(this.prodItems=t,console.log(this.prodItems),this.selectedLocation!=null)if(this.selectedLocation==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].location===this.selectedLocation&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].product_name===this.selectedProduct&&t.push(this.prodItems[e])}}this.prodItems=t},updateTableLocation(o){var t=[];if(this.prodItems=this.storePlayers,o==="All"){if(t=this.prodItems,this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].product_name===this.selectedProduct&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].sector===this.selectedSector&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),console.log(this.prodItems[e].vcplayer_type),console.log(this.selectedVCP),this.prodItems[e].vcplayer_type===1?s="Producer":this.prodItems[e].vcplayer_type===2?s="Processor":this.prodItems[e].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[e])}}else{for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].location===this.selectedLocation&&t.push(this.prodItems[e]);if(this.prodItems=t,console.log(this.prodItems),this.selectedProduct!=null)if(this.selectedProduct==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].product_name===this.selectedProduct&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedSector!=null)if(this.selectedSector==="All")t=this.prodItems;else{t=[];for(let e=0;e<this.prodItems.length;e++)console.log(this.prodItems[e]),this.prodItems[e].sector===this.selectedSector&&t.push(this.prodItems[e])}if(this.prodItems=t,console.log(this.prodItems),this.selectedVCP!=null)if(this.selectedVCP==="All")t=this.prodItems;else{t=[];var s="";for(let l=0;l<this.prodItems.length;l++)console.log(this.prodItems[l]),console.log(this.prodItems[l].vcplayer_type),console.log(this.selectedVCP),this.prodItems[l].vcplayer_type===1?s="Producer":this.prodItems[l].vcplayer_type===2?s="Processor":this.prodItems[l].vcplayer_type===3&&(s="Trader"),s===this.selectedVCP&&t.push(this.prodItems[l])}}this.prodItems=t},async onEnter(){if(this.prodItems=[],this.selectedLocation=null,this.selectedProduct=null,this.selectedSector=null,this.selectedVCP=null,console.log(this.searchString),this.data=await this.$store.dispatch("searchString",this.searchString),console.log(this.data[0]),console.log(this.data[1]),this.isReady=!1,this.data[0].length!=0){this.actor_data=this.data[0];var o=!1,t=!1;o=this.locationItems.includes("All"),t=this.productItems.includes("All"),o||this.locationItems.push("All"),t||this.productItems.push("All");for(let s=0;s<this.actor_data.length;s++)this.getPlayer(this.actor_data[s].name,this.actor_data[s].id)}if(this.data[1].length!=0){this.product_data=this.data[1];var o=!1,t=!1;o=this.locationItems.includes("All"),t=this.productItems.includes("All"),o||this.locationItems.push("All"),t||this.productItems.push("All");for(let l=0;l<this.product_data.length;l++)console.log(this.product_data[l].id),this.getPlayerByProduct(this.product_data[l].name,this.product_data[l].id)}this.storePlayers=this.prodItems},async getPlayer(o,t){console.log(t),this.player_data=await this.$store.dispatch("searchPlayer",t);for(let e=0;e<this.player_data.length;e++){console.log(this.player_data[0]);var s=!1;s=this.locationItems.includes(this.player_data[e].business_address_city_municipality),s||(console.log(s),console.log(this.player_data[e].business_address_city_municipality),this.locationItems.push(this.player_data[e].business_address_city_municipality)),this.getPlayerProducts(o,this.player_data[e].sector,this.player_data[e].business_address_city_municipality,this.player_data[e].role_id,this.player_data[e].id)}},async getPlayerByProduct(o,t){this.player_product_data=await this.$store.dispatch("searchPlayerByProduct",t),console.log(this.player_product_data);for(let s=0;s<this.player_product_data.length;s++)console.log(this.player_product_data[s].id),console.log(this.player_product_data[s].product_metric),console.log(this.player_product_data[s].player_id),this.getFinalPlayer(o,this.player_product_data[s].player_id)},async getFinalPlayer(o,t){this.player_data=await this.$store.dispatch("searchFinalPlayer",t),console.log(this.player_data);for(let e=0;e<this.player_data.length;e++){console.log(this.player_data[e].business_address_city_municipality),console.log(this.player_data[e].business_contact_no);var s=!1;s=this.locationItems.includes(this.player_data[e].business_address_city_municipality),s||(console.log(s),console.log(this.player_data[e].business_address_city_municipality),this.locationItems.push(this.player_data[e].business_address_city_municipality)),this.getActor(t,this.player_data[e].actor_id,this.player_data[e].sector,this.player_data[e].business_address_city_municipality,this.player_data[e].role_id,o)}},async getActor(o,t,s,e,l,c){this.actor_data=await this.$store.dispatch("searchActor",t),console.log(this.actor_data),console.log(this.actor_data[0].name),this.prodItems.push({player_id:o,business_name:this.actor_data[0].name,sector:s,location:e,vcplayer_type:l,product_name:c})},async getPlayerProducts(o,t,s,e,l){this.player_product_data=await this.$store.dispatch("searchPlayerProduct",l);for(let c=0;c<this.player_product_data.length;c++)this.getProducts(l,o,t,s,e,this.player_product_data[c].product_id)},async getProducts(o,t,s,e,l,c){this.product_data=await this.$store.dispatch("searchProduct",c),this.prodItems.push({player_id:o,business_name:t,sector:s,location:e,vcplayer_type:l,product_name:this.product_data[0].name});var m=!1;m=this.productItems.includes(this.product_data[0].name),m||(console.log(m),console.log(this.product_data[0].name),this.productItems.push(this.product_data[0].name)),this.final_product_data.push(this.product_data[0].name),console.log(this.product_data[0].name)}}},n=o=>(B("data-v-e310e6de"),o=o(),R(),o),N=n(()=>r("br",null,null,-1)),U=n(()=>r("br",null,null,-1)),k=n(()=>r("br",null,null,-1)),E=n(()=>r("div",{class:"title-style"}," sAPPat ",-1)),K=n(()=>r("br",null,null,-1)),D=n(()=>r("br",null,null,-1)),z=n(()=>r("br",null,null,-1)),j={cols:"3"};function J(o,t,s,e,l,c){const m=a("v-row"),P=a("v-text-field"),_=a("v-autocomplete"),C=a("v-col"),v=a("v-btn"),y=a("v-chip"),A=a("v-table");return l.isReady?(h(),u(f,{key:0},[N,U,k,d(m,null,{default:p(()=>[E]),_:1}),K,D,d(P,{"hide-details":"auto",variant:"outlined",rounded:"","append-inner-icon":"mdi-magnify",class:"searchbox-style",modelValue:l.searchString,"onUpdate:modelValue":t[0]||(t[0]=i=>l.searchString=i),onKeyup:V(c.onEnter,["enter"])},null,8,["modelValue","onKeyup"])],64)):(h(),u(f,{key:1},[d(C,{class:"d-flex align-center ma-0 pa-0",cols:"9"},{default:p(()=>[d(_,{modelValue:l.selectedSector,"onUpdate:modelValue":t[1]||(t[1]=i=>l.selectedSector=i),items:l.sectorItems,label:"Sector",placeholder:"Select",density:"compact",variant:"outlined"},null,8,["modelValue","items"]),d(_,{class:"ma-1",modelValue:l.selectedLocation,"onUpdate:modelValue":t[2]||(t[2]=i=>l.selectedLocation=i),items:l.locationItems,label:"Location",placeholder:"Select",density:"compact",variant:"outlined"},null,8,["modelValue","items"]),d(_,{modelValue:l.selectedProduct,"onUpdate:modelValue":t[3]||(t[3]=i=>l.selectedProduct=i),items:l.productItems,label:"Product",placeholder:"Select",density:"compact",variant:"outlined"},null,8,["modelValue","items"]),d(_,{class:"ma-1",modelValue:l.selectedVCP,"onUpdate:modelValue":t[4]||(t[4]=i=>l.selectedVCP=i),items:l.vcplayertypeItems,label:"VC Player Type",placeholder:"Select",density:"compact",variant:"outlined"},null,8,["modelValue","items"])]),_:1}),d(P,{"hide-details":"auto",variant:"outlined",rounded:"","append-inner-icon":"mdi-magnify",modelValue:l.searchString,"onUpdate:modelValue":t[5]||(t[5]=i=>l.searchString=i),onKeyup:V(c.onEnter,["enter"])},null,8,["modelValue","onKeyup"]),z,l.isReport!="null"?(h(),T(m,{key:0,justify:"end"},{default:p(()=>[d(v,{flat:"",class:"ma-2",icon:"mdi-printer-outline"})]),_:1})):x("",!0),d(A,{"fixed-header":""},{default:p(()=>[r("thead",null,[r("tr",null,[(h(!0),u(f,null,S(l.headers,i=>(h(),u("th",j,I(i.name),1))),256))])]),r("tbody",null,[(h(!0),u(f,null,S(l.prodItems,i=>(h(),u("tr",{key:i},[r("td",null,I(i.business_name),1),r("td",null,[d(y,{id:"chip",small:"",class:b(`${i.sector}`)},{default:p(()=>[g(I(i.sector),1)]),_:2},1032,["class"])]),r("td",null,I(i.location),1),r("td",null,[d(y,{id:"chip",small:"",class:b(`${c.getText(i.vcplayer_type)} white--text caption my-2`),text:c.getText(i.vcplayer_type)},null,8,["class","text"])]),r("td",null,[d(y,null,{default:p(()=>[g(I(i.product_name),1)]),_:2},1024)]),r("td",null,[d(v,{rounded:"xs",size:"small",flat:"",variant:"outlined"},{default:p(()=>[g("VC Map")]),_:1})])]))),128))])]),_:1})],64))}const q=L(F,[["render",J],["__scopeId","data-v-e310e6de"]]);export{q as default};