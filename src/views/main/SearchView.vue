<template>
    <template v-if="isReady" class="search-style">
        <br/><br/><br/>
        <v-row>
            <div class="title-style">
                sAPPat
            </div>
        </v-row>
        <br/><br/>
  
        <v-text-field
            hide-details="auto"
            variant="outlined"
            rounded
            append-inner-icon="mdi-magnify"
            class="searchbox-style"
            v-model="searchString"
            v-on:keyup.enter="onEnter"
        ></v-text-field>
    </template>
    <template v-else>
        <v-col
            class="d-flex align-center ma-0 pa-0"
            cols="9"
        >
            <v-autocomplete
                v-model="selectedSector"
                :items="sectorItems"
                label="Sector"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>

            <v-autocomplete class="ma-1"
                v-model="selectedLocation"
                :items="locationItems"
                label="Location"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>

            <v-autocomplete
                v-model="selectedProduct"
                :items="productItems"
                label="Product"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>

            <v-autocomplete class="ma-1"
                v-model="selectedVCP"
                :items="vcplayertypeItems"
                label="VC Player Type"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>
        </v-col>
        <v-text-field
            hide-details="auto"
            variant="outlined"
            rounded
            append-inner-icon="mdi-magnify"
            v-model="searchString"
            v-on:keyup.enter="onEnter"
        ></v-text-field>

        <br/>
        <template v-if="isReport != 'null'">
            <v-row justify="end">
                <v-btn
                    flat
                    class="ma-2"
                    icon="mdi-printer-outline"
                >
                </v-btn>
            </v-row>
        </template>

        <v-table
            fixed-header
        >
            <thead>
                <tr>
                    <th
                        v-for="header in headers"
                        cols="3"
                    >
                        {{ header.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="items in prodItems"
                    :key="items"
                >
                    <td>{{ items.business_name }}</td>

                    <td>
                        <v-chip id="chip" small :class="`${items.sector}`">{{items.sector}}</v-chip>
                    </td>
                    
                    <td>{{ items.location}}</td>

                    <td>
                        <v-chip id="chip" small :class="`${getText(items.vcplayer_type)} white--text caption my-2`" :text="getText(items.vcplayer_type)"></v-chip>
                    </td>

                    <td>
                        <v-chip>{{ items.product_name }}</v-chip>
                    </td>

                    <td>
                        <v-btn rounded="xs" size="small" flat variant="outlined">VC Map</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </template>
</template>

<script>
import {updateCrumbs} from "@/functions/breadcrumbsHandler.js"
export default {
    emits: ["activeView"],
    data(){
        return {
            viewName: "Search",
            isReport: null,
            isReady: false,
            selectedSector: null,
            selectedLocation: null,
            selectedProduct: null,
            selectedVCP: null,
            searchString: '',

            storePlayers: [],
            storeProducts: [],

            data: '',
            business_data: '',
            final_product_data: [],
            sectorItems: [
                {title: 'All'},
                {title: 'Agriculture'},
                {title: 'Fisheries'},
            ],
            locationItems: [],
            productItems: [],

            businessItems: [],
            locItems: [],
            vcplayertypeItems: [
                {title: 'All'},
                {title: 'Producer'},
                {title: 'Processor'},
                {title: 'Trader'},
            ],
            prodItems: [],

            filters: [
                {id: 0, name: 'Sector', enabled: false, col_name: 'sector'},
                {id: 1, name: 'Location', enabled: false, col_name: 'location'},
                {id: 2, name: 'Products', enabled: false, col_name: 'products'},
                {id: 3, name: 'VC Player', enabled: false, col_name: 'vcplayer'}
            ],

            headers: [
                {name: 'Business Name', col_name: 'business_name', align: 'center', width: '1%'},
                {name: 'Sector', col_name: 'sector', align: 'center', width: '1%'},
                {name: 'Location', col_name: 'location',  align: 'center', width: '1%'},
                {name: 'VC Player Type', col_name: 'vcplayer_type',  align: 'center', width: '1%'},
                {name: 'Products', col_name: 'products',  align: 'center', width: '1%'},
                {name: 'Actions', col_name: 'actions',  align: 'center', width: '1%'}
            ],

            toggle: [],
            selected_sector: 'Sector',
            actor_data: '',
            product_data: '',
            player_data: '',
            player_product_data: '',

            business_address_data: null,
            municipality_data: null,
        }
    },
    mounted(){
        this.activeView()
        this.isReady=true
    },
    watch: {
        selectedVCP: function (newValue){
            if(newValue === 'Producer'){
                //console.log('Producer')
                this.updateTableVCP(1)
            }else if(newValue === 'Processor'){
                //console.log('Processor')
                this.updateTableVCP(2)
            }else if(newValue === 'Trader'){
                //console.log('Trader')
                this.updateTableVCP(3)
            }else if(newValue === 'All'){
                this.updateTableVCP(0)
            }
        },
        
        selectedSector: function (newValue){
            this.updateTableSector(newValue)
        },
        
        selectedLocation: function (newValue){
            this.updateTableLocation(newValue)
        },
        
        selectedProduct: function (newValue){
            this.updateTableProduct(newValue)
        },
    },
    methods: {
        setData(){
            var temp = JSON.parse(localStorage.getItem('breadcrumbs'))
            var crumb = {
                title: 'Search',
                disabled: true,
                href: '/home/search'
            }
            this.items = updateCrumbs(temp, crumb)
            this.isReady = true
        },

        activeView(){
            console.log(localStorage.getItem("isReport"))
            this.isReport = localStorage.getItem("isReport")
            this.$emit('activeView', this.viewName)
        },

        onClick(id){
            console.log(id)
            this.filters[id].enabled = !this.filters[id].enabled
        },

        getColor(role_id){
            if(role_id === 1){
                return '#dbc1a7';
            }else if(role_id === 2){
                return '#e6b470';
            }
        },

        getColorSector(sector){
            if(sector === 'Agriculture'){
                return '#BAD4AF';
            }else if(sector === 'Fisheries'){
                return '#B3CDE0';
            }
        },

        getText(role_id){
            if(role_id === 1){
                return 'Producer';
            }else if(role_id === 2){
                return 'Processor';
            }else if(role_id === 3){
                return 'Trader'
            }
        },

        updateTableVCP(value){
            var temp = []
            this.prodItems = this.storePlayers

            console.log(this.selectedVCP)
            console.log(this.selectedProduct)
            console.log(this.selectedLocation)
            console.log(this.selectedSector)
            
            if(value === 0){
                temp = this.prodItems

                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedLocation != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }

            }else{
                for(let i = 0; i < this.prodItems.length; i++){
                    console.log(this.prodItems[i])
                    if(this.prodItems[i].vcplayer_type === value){
                        temp.push(this.prodItems[i])
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedLocation != null){
                    if(this.selectedLocation === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }   
                }
            }
            this.prodItems = temp
        },

        updateTableProduct(value){
            var temp = []
            this.prodItems = this.storePlayers
            console.log(value)
            console.log(this.prodItems)
            console.log(this.selectedVCP)
            console.log(this.selectedProduct)
            console.log(this.selectedLocation)
            console.log(this.selectedSector)
            
            if(value === 'All'){
                temp = this.prodItems

                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedLocation != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
            }else{
                for(let i = 0; i < this.prodItems.length; i++){
                    console.log(this.prodItems[i])
                    console.log(this.prodItems[i].product_name)
                    if(this.prodItems[i].product_name === value){
                        temp.push(this.prodItems[i])
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)
                
                if(this.selectedLocation != null){
                    if(this.selectedLocation === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
            }
            this.prodItems = temp
        },

        updateTableSector(value){
            var temp = []
            this.prodItems = this.storePlayers

            if(value === 'All'){
                temp = this.prodItems
                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            } 
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedLocation != null){
                    if(this.selectedLocation === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }

                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
            }else{
                for(let i = 0; i < this.prodItems.length; i++){
                    console.log(this.prodItems[i])
                    if(this.prodItems[i].sector === this.selectedSector){
                        temp.push(this.prodItems[i])
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedLocation != null){
                    if(this.selectedLocation === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].location === this.selectedLocation){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }

                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }
            }
            this.prodItems = temp
        },

        updateTableLocation(value){
            var temp = []
            this.prodItems = this.storePlayers

            if(value === 'All'){
                temp = this.prodItems
                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                }
            }else{
                for(let i = 0; i < this.prodItems.length; i++){
                    console.log(this.prodItems[i])
                    if(this.prodItems[i].location === this.selectedLocation){
                        temp.push(this.prodItems[i])
                    }
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedProduct != null){
                    if(this.selectedProduct === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].product_name === this.selectedProduct){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedSector != null){
                    if(this.selectedSector === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            if(this.prodItems[i].sector === this.selectedSector){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }
                this.prodItems = temp
                console.log(this.prodItems)

                if(this.selectedVCP != null){
                    if(this.selectedVCP === 'All'){
                        temp = this.prodItems
                    }else{
                        temp = []
                        var vcpselected = ''
                        for(let i = 0; i < this.prodItems.length; i++){
                            console.log(this.prodItems[i])
                            console.log(this.prodItems[i].vcplayer_type)
                            console.log(this.selectedVCP)

                            if(this.prodItems[i].vcplayer_type === 1){
                                vcpselected = 'Producer';
                            }else if(this.prodItems[i].vcplayer_type === 2){
                                vcpselected = 'Processor';
                            }else if(this.prodItems[i].vcplayer_type === 3){
                                vcpselected = 'Trader'
                            }

                            if(vcpselected === this.selectedVCP){
                                temp.push(this.prodItems[i])
                            }
                        }
                    }
                    
                }
            }
            this.prodItems = temp
        },

        async onEnter(){
            this.prodItems = [];
            this.selectedLocation = null
            this.selectedProduct = null
            this.selectedSector = null
            this.selectedVCP = null

            console.log(this.searchString);
            this.data = await this.$store.dispatch('searchString', this.searchString);

            console.log(this.data[0])
            console.log(this.data[1])
            this.isReady = false
            
            
            if((this.data[0]).length != 0){
                this.actor_data = this.data[0]
                
                var checkLocation = false
                var checkProduct = false

                checkLocation = this.locationItems.includes('All')
                checkProduct = this.productItems.includes('All')

                if(!checkLocation){
                    this.locationItems.push('All')
                }

                if(!checkProduct){
                    this.productItems.push('All')
                }

                for(let i = 0; i < this.actor_data.length; i++){
                    console.log(this.actor_data[i].name)
                    this.getPlayer(this.actor_data[i].name, this.actor_data[i].id)
                }
            }
            
            if((this.data[1]).length != 0){
                this.product_data = this.data[1]
                var checkLocation = false
                var checkProduct = false

                checkLocation = this.locationItems.includes('All')
                checkProduct = this.productItems.includes('All')

                if(!checkLocation){
                    this.locationItems.push('All')
                }

                if(!checkProduct){
                    this.productItems.push('All')
                }

                for(let i = 0; i < this.product_data.length; i++){
                    console.log(this.product_data[i].id)
                    this.getPlayerByProduct(this.product_data[i].name, this.product_data[i].id)
                }
            }
            
            
            this.storePlayers = this.prodItems
        },

        async getPlayer(actor_name, actor_id){
            console.log(actor_id)
            console.log('Helloooooooooooooooooooo')
            this.player_data = await this.$store.dispatch('searchPlayer', actor_id)
            for(let i = 0; i < (this.player_data).length; i++){
                this.business_address_data = await this.$store.dispatch('getBusinessAddress', this.player_data[i].business_address_id)
                console.log(this.business_address_data)

                if((this.business_address_data).length != 0){
                    this.municipality_data = await this.$store.dispatch('getMunicipalityName', this.business_address_data[0].municipality_city_id)
                    console.log(this.municipality_data[0].name)
                    var checkLocation = false

                    checkLocation = this.locationItems.includes(this.municipality_data[0].name)

                    if(!checkLocation){
                        console.log(checkLocation)
                        console.log(this.municipality_data[0].name)
                        this.locationItems.push(this.municipality_data[0].name)
                    }
                    
                    this.getPlayerProducts(actor_name, this.player_data[i].sector, this.municipality_data[0].name,
                        this.player_data[i].role_id, this.player_data[i].id)
                }
                
            }
        },

        async getPlayerByProduct(product_name, product_id){
            this.player_product_data = await this.$store.dispatch('searchPlayerByProduct', product_id)
            console.log(this.player_product_data)
            for(let i = 0; i < (this.player_product_data).length; i++){
                console.log(this.player_product_data[i].id)
                console.log(this.player_product_data[i].product_metric)
                console.log(this.player_product_data[i].player_id)

                this.getFinalPlayer(product_name, this.player_product_data[i].player_id)
            }
        },

        async getFinalPlayer(product_name, player_id){
            this.player_data = await this.$store.dispatch('searchFinalPlayer', player_id)
            console.log(this.player_data)

            for(let i = 0; i < (this.player_data).length; i++){

                this.business_address_data = await this.$store.dispatch('getBusinessAddress', this.player_data[i].business_address_id)
                console.log(this.business_address_data)

                this.municipality_data = await this.$store.dispatch('getMunicipalityName', this.business_address_data[0].municipality_city_id)
                console.log(this.municipality_data[0].name)
                var checkLocation = false

                checkLocation = this.locationItems.includes(this.municipality_data[0].name)

                if(!checkLocation){
                    console.log(checkLocation)
                    console.log(this.municipality_data[0].name)
                    this.locationItems.push(this.municipality_data[0].name)
                }

                this.getActor(player_id, this.player_data[i].actor_id, this.player_data[i].sector, this.municipality_data[0].name, 
                    this.player_data[i].role_id, product_name)
            }

            //this.storePlayers = this.prodItems
        },

        async getActor(player_id, actor_id, player_sector, player_location, player_role, product_name){
            this.actor_data = await this.$store.dispatch('searchActor', actor_id)
            console.log(this.actor_data)

            console.log(this.actor_data[0].name)
            this.prodItems.push({player_id: player_id, business_name: this.actor_data[0].name, sector: player_sector, 
                location: player_location, vcplayer_type: player_role, 
                product_name: product_name})
        },

        async getPlayerProducts(actor_name, player_sector, player_location, player_role, player_id){
            
            this.player_product_data = await this.$store.dispatch('searchPlayerProduct', player_id);
            console.log('Kumadi meee')
            console.log(this.player_product_data)
            for(let i = 0; i < this.player_product_data.length; i++){
                this.getProducts(player_id, actor_name, player_sector, player_location, player_role, this.player_product_data[i].product_id)
            }

            //this.storePlayers = this.prodItems
        },

        async getProducts(player_id, actor_name, player_sector, player_location, player_role, product_id){
            this.product_data = await this.$store.dispatch('searchProduct', product_id);
            
            this.prodItems.push({player_id: player_id, business_name: actor_name, sector: player_sector, 
                location: player_location, vcplayer_type: player_role, 
                product_name: this.product_data[0].name})
            
            console.log("Hellooooo")
            console.log(player_id)
            console.log(actor_name)
            console.log(player_sector)
            console.log(player_location)
            console.log(player_role)
            console.log(this.product_data[0].name)
            
            var checkProduct = false

            checkProduct = this.productItems.includes(this.product_data[0].name)
            if(!checkProduct){
                console.log(checkProduct)
                console.log(this.product_data[0].name)
                this.productItems.push(this.product_data[0].name)
            }

            this.final_product_data.push(this.product_data[0].name)
            console.log(this.product_data[0].name)
        }
    }
}
</script>

<style lang="scss" scoped>
    .button-style{
        height: 250px;
        width: 250px;
        margin-left: auto;
        margin-right: auto;
    }
    .icon-style{
        color: #333333;
    }
    .button-name-style{
        font-size: 15pt;
        font-weight: bold;
        color: #333333;
        max-width: 250px;
        margin-left: auto;
        margin-right: auto;
    }
    .search-style{
        margin-top: 10vh;
        padding-left: 5%;
        padding-right: 5%;
    }
    .select-style{
        justify-content: center;
    }
    .select-style-2{
        justify-content: left;
    }
    .btn-style{
        padding-top: 5%;
        padding-bottom: 5%;
        width: 100%;
    }
    .title-style{
        font-weight: bold;
        font-size: 5em;
        color: #6C4A3F;
        margin: auto;
    }
    .searchbox-style{
        border-radius: 10px;
    }
    .text-field-style{
        width: 800px;
    }

    .text-chip-color{
        color: black;
    }

    #chip.v-chip.Agriculture {background: #BAD4AF;}
    #chip.v-chip.Fisheries {background: #B3CDE0;}
    #chip.v-chip.Producer {background: #E0D6CC;}
    #chip.v-chip.Processor {background: #E7D0B1;}
    #chip.v-chip.Trader {background: #C69C84}
    
</style>