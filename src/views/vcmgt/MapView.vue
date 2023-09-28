<template>
    <br/>

    <div class="card-style">
        <l-map
            class="map-style"
            ref="map"
            :zoom="zoom"
            :center="center"
            :min-zoom="minZoom"
            :max-zoom="maxZoom"
            :max-bounds="maxBounds"
            :options="{ zoomControl: false }"
        >

            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base">
            ></l-tile-layer>
            <!--
            <l-marker :lat-lng="[11.1584, 124.9919]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.2543, 124.9617]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.0384, 124.6193]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.6396, 124.4087]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.8363, 124.9617]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.8464, 125.0278]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.8873, 125.0829]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[10.9643, 124.5196]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.5990, 125.0608]"><l-popup>This is a popup</l-popup></l-marker>
            <l-marker :lat-lng="[11.0565, 124.8514]"><l-popup>This is a popup</l-popup></l-marker>
            -->
            <l-marker
                v-for="address in map_data"
                z-index-offset="1"
                :lat-lng="[address.lat, address.long]"
                label="1"
            >
            <l-tooltip>{{address.name}}</l-tooltip></l-marker>
                
            <l-control-zoom :position="'topright'"/>
            <l-control-layers position="topright"/>
            <l-control-scale position="bottomleft" :metric="true" :imperial="false"></l-control-scale>
        </l-map>
        <v-card class="nav-window-style" flat>
            <v-row>
                <v-col class="pb-0">
                    <v-icon @click="showNav=!showNav" style="color: white;">mdi-menu</v-icon>
                </v-col>
            </v-row>
            <v-row v-show="showNav" >
                <v-col class="pt-1">
                    <v-card class="pa-5" flat>
                        <b>Select VC Player Type</b>
                        <v-select
                            :items="typeItems"
                            density="compact"
                            variant="outlined"
                            v-model="selectedType"
                            @input="selectItem"
                        ></v-select>

                        <b>Select Product</b>
                        <v-select
                            :items="productItems"
                            item-title="name"
                            item-value="id"
                            density="compact"
                            variant="outlined"
                            v-model="selectedProduct"
                        ></v-select>

                        <v-btn flat class="text-uppercase" @click="updateMap()" width="100%" style="background: #BAD4AF; font-weight: bold;">Map</v-btn>

                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>


<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LControlZoom, LControlLayers, LCircleMarker, LTooltip, LGeoJson, LControl, LControlScale } from "@vue-leaflet/vue-leaflet";


export default {
    
    components: {
        LMap,
        LTileLayer,
        LControlZoom,
        LMarker,
        LPopup,
        LControlLayers,
        LCircleMarker,
        LTooltip,
        LGeoJson,
        LControl,
        LControlScale
    },
    data() {
        return {
            showNav: false,
            isReady: false,
            zoom: 6,
            center: [12.8797, 121.7740],
            maxZoom: 17,
            maxBounds: [
                [-1.622524, 148.835926],
                [23.227101, 91.603690]
            ],
            minZoom: 5,

            addresses: [
                {
                    name: 'Palo',
                    lat: 11.1584,
                    long: 124.9919
                },
                {
                    name: 'Tacloban',
                    lat: 11.2543,
                    long: 124.9617
                },
                {
                    name: 'Ormoc',
                    lat: 11.0384,
                    long: 124.6193
                },
                {
                    name: 'Almeria',
                    lat: 11.6396,
                    long: 124.4087
                },
                {
                    name: 'Jiabong',
                    lat: 11.8363,
                    long: 124.9617
                },
                {
                    name: 'Motiong',
                    lat: 11.8464,
                    long: 125.0278
                },
                {
                    name: 'Paranas',
                    lat: 11.8873,
                    long: 125.0829
                },
                {
                    name: 'Merida',
                    lat: 10.9643,
                    long: 124.5196
                },
                {
                    name: 'Calbiga',
                    lat: 11.5990,
                    long: 125.0608
                },
                {
                    name: 'Dagami',
                    lat: 11.0565,
                    long: 124.8514
                },
            ],

            tileProviders: [
                {
                    name: 'OpenStreetMap',
                    visible: false,
                    attribution:
                        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                },
                {
                    name: 'ESRI World Imagery',
                    visible: false,
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                },
                {
                    name: 'CyclOSM',
                    visible: false,
                    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                },
                {
                    name: 'OpenTopoMap',
                    visible: false,
                    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                    attribution:
                        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },
                {
                    name: 'World Imagery',
                    visible: true,
                    url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attribution:
                        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },

                // http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}
                // {
                //     name: 'MapBox',
                //     visible: false,
                //     url: 'https://{s}.tiles.mapbox.com/v3/[YOUR_MAPBOX_KEY]/{z}/{x}/{y}.png',
                //     attribution: '© Map tiles <a href="https://mapbox.com">Mapbox</a>'
                // }
            ],

            items: [],
            select: 'All',
            typeItems: [
                'All',
                'Producer',
                'Processor',
                'Trader'
            ],
            
            selectedProduct: null,
            selectedType: null,

            municipalities: ['Palo','Tacloban','Ormoc','Almeria','Jiabong','Motiong','Paranas','Merida','Calbiga','Dagami'],

            business_address_data: [],
            temp_data: [],
            municipality_data: [],

            final_data: [],
            map_data: [],
            productItems: [],
            player_data: [],
            
            temp_producer: [],
            temp_processor: [],
            temp_trader: [],
            temp_all: [],
            producer_prod: [],
            processor_prod: [],
            trader_prod: [],

            address_count: [],
        }
    },
    watch:{
        selectedType: function(value){
            this.selectedProduct = null
            this.productItems = []
            this.temp_all = []
            this.productItems.push('All')
            
            if(value === 'Producer'){
                for(let i = 0; i < (this.temp_producer).length; i++){
                    this.productItems.push(this.temp_producer[i])
                }
            }
            if(value === 'Processor'){
                for(let i = 0; i < (this.temp_processor).length; i++){
                    this.productItems.push(this.temp_processor[i])
                }
            }
            if(value === 'Trader'){
                for(let i = 0; i < (this.temp_trader).length; i++){
                    this.productItems.push(this.temp_trader[i])
                }
            }

            if(value === 'All'){

                for(let i = 0; i < (this.temp_producer).length; i++){
                    var checkProduct = this.temp_all.includes(this.temp_producer[i])
                    console.log(this.temp_producer[i].product_name)
                    console.log(checkProduct)

                    if(!checkProduct){
                        this.temp_all.push(this.temp_producer[i])
                        this.productItems.push(this.temp_producer[i])
                    }
                }

                for(let i = 0; i < (this.temp_processor).length; i++){
                    var checkProduct = this.temp_all.includes(this.temp_processor[i])
                    console.log(this.temp_processor[i])
                    console.log(checkProduct)

                    if(!checkProduct){
                        this.temp_all.push(this.temp_processor[i])
                        this.productItems.push(this.temp_processor[i])
                    }
                }

                for(let i = 0; i < (this.temp_trader).length; i++){
                    var checkProduct = this.temp_all.includes(this.temp_trader[i])
                    console.log(this.temp_trader[i])
                    console.log(checkProduct)

                    if(!checkProduct){
                        this.temp_all.push(this.temp_trader[i])
                        this.productItems.push(this.temp_trader[i])
                    }
                }
            }
        }
    },
    mounted(){
        this.getData()
        this.getLocations()
    },
    methods: {
        getData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            for(let i=0; i<temp.length; i++){
                this.items.push(temp[i])
            }
            this.isReady = true
        },
        selectItem(item){
            console.log("jere")
            console.log(item)
        },
        async getLocations(){
            this.business_address_data = await(this.$store.dispatch('searchAllLocations'));
            console.log(this.business_address_data)
            for(let i = 0 ; i < (this.business_address_data).length; i++){
                //console.log(this.business_address_data[i].municipality_city_id)
                
                this.municipality_data = await(this.$store.dispatch('getMunicipalityName', this.business_address_data[i].municipality_city_id))

                //console.log(this.municipality_data[0].name)
                /*
                var checkMunicipality = this.temp_data.includes(this.municipality_data[0].name)

                if(!checkMunicipality){
                    this.temp_data.push(this.municipality_data[0].name)
                }
                */

                this.player_data = await(this.$store.dispatch('getPlayerByAddress', this.business_address_data[i].id))

                console.log(this.player_data)
                
                
                for(let j = 0; j < (this.player_data).length; j++){
                    if(this.player_data[j].length != 0){
                        var actor_name = await(this.$store.dispatch('searchActor', this.player_data[j].actor_id))
                        console.log(actor_name)

                        var products = await(this.$store.dispatch('searchPlayerProduct', this.player_data[j].id))
                        console.log(products)
                        //console.log(this.player_data[j].role_id)

                        for(let k = 0; k < products.length; k++){
                            var product_name = await(this.$store.dispatch('searchProduct', products[k].product_id))

                            if(this.player_data[j].role_id == 1){
                                var checkProduct = this.temp_producer.includes(product_name[0].name)

                                if(!checkProduct){
                                    this.temp_producer.push(product_name[0].name)
                                }

                                var index = this.municipalities.indexOf(this.municipality_data[0].name)
                                this.final_data.push({name: actor_name[0].name, product_name: product_name[0].name, type: 'Producer',
                                    address: this.addresses[index].name,
                                    lat: this.addresses[index].lat, long: this.addresses[index].long})
            
                            }else if(this.player_data[j].role_id == 2){
                                var checkProduct = this.temp_processor.includes(product_name[0].name)

                                if(!checkProduct){
                                    this.temp_processor.push(product_name[0].name)
                                }

                                var index = this.municipalities.indexOf(this.municipality_data[0].name)
                                this.final_data.push({name: actor_name[0].name, product_name: product_name[0].name, type: 'Processor',
                                    address: this.addresses[index].name,
                                    lat: this.addresses[index].lat, long: this.addresses[index].long})

                            }else if(this.player_data[j].role_id == 3){
                                var checkProduct = this.temp_trader.includes(product_name[0].name)

                                if(!checkProduct){
                                    this.temp_trader.push(product_name[0].name)
                                }

                                var index = this.municipalities.indexOf(this.municipality_data[0].name)
                                this.final_data.push({name: actor_name[0].name, product_name: product_name[0].name,  type: 'Trader',
                                    address: this.addresses[index].name,
                                    lat: this.addresses[index].lat, long: this.addresses[index].long})
                            }
                        }
                    }
                }
            }

            for(let i = 0; i < (this.final_data).length; i++){

                console.log(this.final_data[i].name)

                this.address_count.push(this.final_data[i].address)

                let count = this.address_count.filter(x => x == this.final_data[i].address).length
                console.log(count)

                this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})

            }

            console.log(this.temp_producer)
            console.log(this.temp_processor)
            console.log(this.temp_trader)
        },

        async updateMap(){
            this.map_data = []
            this.address_count = []
            console.log(this.selectedProduct)
            console.log(this.selectedType)
            //console.log(this.final_data)
            
            if((this.selectedType != null) && (this.selectedProduct != null)){
                if((this.selectedType != 'All') && (this.selectedProduct != 'All')){
                    for(let i = 0; i < (this.final_data).length; i++){
                        //console.log(this.final_data[i].name)
                        if((this.final_data[i].product_name == this.selectedProduct) && (this.final_data[i].type == this.selectedType)){
                            console.log(this.final_data[i].name)

                            this.address_count.push(this.final_data[i].address)

                            let count = this.address_count.filter(x => x == this.final_data[i].address).length
                            console.log(count)

                            this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                        }
                    }
                }else{
                    if(this.selectedType == 'All'){
                        for(let i = 0; i < (this.final_data).length; i++){

                            if(this.final_data[i].product_name == this.selectedProduct){
                                console.log(this.final_data[i].name)

                                this.address_count.push(this.final_data[i].address)

                                let count = this.address_count.filter(x => x == this.final_data[i].address).length
                                console.log(count)

                                this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                            }
                        }
                    }
                    
                    if(this.selectedProduct == 'All'){
                        for(let i = 0; i < (this.final_data).length; i++){

                            if(this.final_data[i].type == this.selectedType){
                                console.log(this.final_data[i].name)

                                this.address_count.push(this.final_data[i].address)

                                let count = this.address_count.filter(x => x == this.final_data[i].address).length
                                console.log(count)

                                this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                            }
                        }
                    }
                    
                    if((this.selectedType == 'All') && (this.selectedProduct == 'All')){
                        for(let i = 0; i < (this.final_data).length; i++){

                            console.log(this.final_data[i].name)

                            this.address_count.push(this.final_data[i].address)

                            let count = this.address_count.filter(x => x == this.final_data[i].address).length
                            console.log(count)

                            this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                            
                        }
                    }
                }
            }else{
                if(this.selectedType != null){
                    for(let i = 0; i < (this.final_data).length; i++){
                        //console.log(this.final_data[i].name)
                        if(this.final_data[i].type == this.selectedType){
                            console.log(this.final_data[i].name)

                            this.address_count.push(this.final_data[i].address)

                            let count = this.address_count.filter(x => x == this.final_data[i].address).length
                            console.log(count)

                            this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                        }
                    }
                }else if(this.selectedProduct != null){
                    for(let i = 0; i < (this.final_data).length; i++){
                        //console.log(this.final_data[i].name)
                        if(this.final_data[i].product_name == this.selectedProduct){
                            console.log(this.final_data[i].name)

                            this.address_count.push(this.final_data[i].address)

                            let count = this.address_count.filter(x => x == this.final_data[i].address).length
                            console.log(count)

                            this.map_data.push({name: count, lat: this.final_data[i].lat, long: this.final_data[i].long})
                        }
                    }
                }
            }

            /*
            for(let i = 0; i < (this.final_data).length; i++){
                //console.log(this.final_data[i].name)
                if((this.final_data[i].product_name == this.selectedProduct) && (this.final_data[i].type == this.selectedType)){
                    console.log(this.final_data[i].name)

                    this.map_data.push({name: this.final_data[i].name, lat: this.final_data[i].lat, long: this.final_data[i].long})
                }
            }
            */
            
        }
    }
}

</script>

<style lang="scss" scoped>
.card-style{
    margin: auto;
    width: 100%;
    height: 100%;
}
.map-style{
    z-index: 0;
    position: absolute;
    max-width: 70vw;
    max-height: 82vh;
}
.nav-window-style{
    z-index: 4;
    position: relative;
    top: 5px;
    left: 5px;
    padding: 10px;
    width: 35vh;
    background-color: transparent;
}

.navcard{
    width: 30vh;
    
}
</style>