<template>
    <v-row class="form-style">
        <v-col>
            <v-row no-gutters>Product</v-row>
            <v-autocomplete class="form-style"
                :items="products"
                item-title="name"
                item-value="id"
                v-model="selectedProduct"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>
        </v-col>
        
        <v-col>
            <v-row no-gutters>Location</v-row>
            <v-autocomplete class="ma pa-0"
                :items="locations"
                item-title="name"
                item-value="id"
                v-model="selectedLocation"
                placeholder="Select"
                density="compact"
                variant="outlined"
            ></v-autocomplete>
        </v-col>
        

        
    </v-row>

    <v-row class="ma-0">
        
        <v-col class="ma-0">
            <v-row
                v-for="(item, supp_index) in supp_data"
                :ref="'supp' + item.id"
                :key=supp_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'supplier' + supp_index"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col class="ma-0">
            <v-row
                v-for="(item, supp_index) in final_player_data"
                :ref="'supp' + item.id"
                :key=supp_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'supp' + supp_index"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col class="ma-0">
            <v-row
                v-for="(item, buy_index) in buy_data"
                :ref="'buy' + item.id"
                :key=buy_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'buy' + buy_index"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import LeaderLine from "leader-line-vue";
    export default{
        data(){
            return{

                supplier_name: 'Agrivet Stores',
                player: null,

                products: [],
                data: [],
                locations: [],
                locationItems: [],
                final_actor_data: [],
                temp_data: null,
                selectedProduct: null,
                selectedLocation: null,
                data_temp: null,
                actor_data: null,
                address_data: null,
                muni_data: null,

                player_data: [],
                final_player_data: [],

                supp_data: [],
                supplier_data: null,

                temp_buy_data: [],
                buy_data: [],
                
                player_index: [],
                buy_index: [],
                supp_index: [],
                player_supp_index: [],

                buyer_data: null,
                buyer: null,

                supplier: null,
                play_data: [],
                temp_supp_data: [],

                supp_line: [],
                buy_line: [],

                supp_line_supp: [],
                buy_line_supp: [],

                colors: ['#102820', '#4C6444', '#CABA9C', '#8A6240', '#4D2D18'],
            }
        },
        beforeMount(){
            this.getProducts()
            //this.getLocations()
        },
        beforeUnmount(){
            //this.disconnectLines()
        },
        watch: {
            selectedProduct: function (newValue){
                this.locationItems = []
                this.locations = []
                this.final_actor_data = []
                this.selectedLocation = null
                this.getPlayerProducts(newValue)
            },

            selectedLocation: function (newValue){
                this.final_player_data = []
                this.buy_data = []
                this.supp_data = []
                this.buyer_data = null
                this.temp_buy_data = []
                this.temp_supp_data = []
                this.player_index = []
                this.buy_index = []
                this.player_supp_index = []
                this.supp_index = []
                this.buy_line = []
                this.supp_line = []
                this.buy_line_supp = []
                this.supp_line_supp = []
                this.getFinalData(newValue)
                //this.connectLines()
            }
        },
        methods:{
            async getProducts(){
                this.data = await(this.$store.dispatch('searchAllProducts'))
                console.log(this.data)
                for(let i = 0; i < (this.data).length; i++){
                    this.products.push({id: this.data[i].id, name: this.data[i].name})
                }
            },

            async getPlayerProducts(product_id){
                console.log(product_id)
                //search player by product

                this.temp_data = await(this.$store.dispatch('searchPlayerByProduct', product_id))
                console.log(this.temp_data)

                for(let i = 0; i < (this.temp_data).length; i++){
                    this.data_temp = await(this.$store.dispatch('searchFinalPlayer', this.temp_data[i].player_id))
                    console.log(this.data_temp[0].business_address_id)

                    this.address_data = await(this.$store.dispatch('getBusinessAddress', this.data_temp[0].business_address_id))
                    console.log(this.address_data)

                    this.muni_data = await(this.$store.dispatch('getMunicipalityName', this.address_data[0].municipality_city_id))
                    console.log(this.muni_data[0].name)

                    var checkLocation = false

                    checkLocation = this.locationItems.includes(this.muni_data[0].name)

                    if(!checkLocation){
                        this.locationItems.push(this.muni_data[0].name)
                        this.locations.push({id: this.muni_data[0].id, name: this.muni_data[0].name})
                    }

                    this.actor_data = await(this.$store.dispatch('searchActor', this.data_temp[0].actor_id))
                    console.log(this.actor_data)

                    this.final_actor_data.push(this.actor_data[0])
                }
            },

            async getPProduct(){
                this.temp_data = await(this.$store.dispatch('searchPlayerByProduct', 1))
                console.log(this.temp_data)
                this.connectLines()
            },

            async getFinalData(municipality_city_id){
                console.log(this.selectedProduct)
                console.log(municipality_city_id)
                console.log(this.final_actor_data)

                for(let i = 0; i < (this.final_actor_data).length; i++){
                    this.player_data = await(this.$store.dispatch('searchPlayer', this.final_actor_data[i].id))

                    this.address_data = await(this.$store.dispatch('getBusinessAddress', this.player_data[0].business_address_id))
                    console.log(this.address_data)

                    if(this.address_data[0].municipality_city_id == municipality_city_id){
                        console.log(this.player_data)
                        this.final_player_data.push(this.final_actor_data[i])
                    }
                }

                console.log(this.final_player_data)

                //get transactions to get the suppliers and the buyers
                for(let j = 0; j < (this.final_player_data).length; j++){

                    this.supplier_data = await(this.$store.dispatch('getSupplier', this.final_player_data[j].id))
                    console.log(this.final_player_data[j].name)
                    console.log('supplieeer')

                    for(let i = 0; i < (this.supplier_data).length; i++){
                        console.log(this.supplier_data[i])

                        this.supplier = await(this.$store.dispatch('searchActor', this.supplier_data[i].supplier_actor_id))
                        console.log(this.supplier)

                        var checkSupplier = this.temp_supp_data.includes(this.supplier[0].name)

                        if(!checkSupplier){
                            console.log(this.supplier[0].name)
                            this.temp_supp_data.push(this.supplier[0].name)
                            this.supp_data.push({id: i, name: this.supplier[0].name})

                            this.player_supp_index.push({id: j, name: this.final_player_data[j].name})
                            this.supp_index.push({id: this.temp_supp_data.indexOf(this.supplier[0].name), name: this.supplier[0].name})
                        }else{
                            console.log('indeeeeeex')
                            console.log(this.temp_supp_data.indexOf(this.supplier[0].name))

                            this.player_supp_index.push({id: j, name: this.final_player_data[j].name})

                            this.supp_index.push({id: this.temp_supp_data.indexOf(this.supplier[0].name), name: this.supplier[0].name})
                            
                        }

                    }

                    this.buyer_data = await(this.$store.dispatch('getBuyer', this.final_player_data[j].id))
                    console.log(this.final_player_data[j].name)
                    console.log('buyeeeeer')
                    //console.log(this.buyer_data)

                    for(let i = 0; i < (this.buyer_data).length; i++){
                        if(this.buyer_data[i].output_product_id == this.selectedProduct){
                            console.log(this.buyer_data[i])

                            this.buyer = await(this.$store.dispatch('searchActor', this.buyer_data[i].actor_id))

                            var checkBuyer = this.temp_buy_data.includes(this.buyer[0].name)

                            if(!checkBuyer){
                                console.log(this.buyer[0].name)
                                this.temp_buy_data.push(this.buyer[0].name)
                                this.buy_data.push({id: i, name: this.buyer[0].name})

                                this.player_index.push({id: j, name: this.final_player_data[j].name})

                                console.log(this.temp_buy_data.indexOf(this.buyer[0].name))
                                this.buy_index.push({id: this.temp_buy_data.indexOf(this.buyer[0].name), name: this.buyer[0].name})
                            }else{
                                console.log('indeeeeeex')
                                console.log(this.temp_buy_data.indexOf(this.buyer[0].name))

                                this.player_index.push({id: j, name: this.final_player_data[j].name})

                                this.buy_index.push({id: this.temp_buy_data.indexOf(this.buyer[0].name), name: this.buyer[0].name})
                            }

                        }
                    }
                }

                console.log(this.player_supp_index)
                console.log(this.supp_index)

                console.log(this.player_index)
                console.log(this.buy_index)
                this.getPProduct()
                //this.connectLines()
                
            },
            
            async connectLines(){
                console.log('Helloooo connect lines')
                
                var last_id_supp = null
                var selected_color_supp = 0

                for(let i = 0; i < (this.player_supp_index).length; i++){
                    console.log('supplier' + this.player_supp_index[i].id)
                    console.log('supp' + this.supp_index[i].id)
                    
                    var supplier = 'supp' + this.player_supp_index[i].id
                    var player = 'supplier' + this.supp_index[i].id
                    
                    if(last_id_supp == this.player_supp_index[i].id){
                    }else{
                        selected_color_supp++
                        last_id_supp = this.player_supp_index[i].id
                    }

                    var line = new LeaderLine.setLine(document.getElementById(player), document.getElementById(supplier), {
                        color: this.colors[selected_color_supp],
                        path: "curve",
                        endPlug: "show",
                    });
                    line.setOptions({startSocket: 'right', endSocket: 'left'});

                    this.buy_line_supp.push(line)
                    this.supp_line_supp.push(line)
                }
                
                var last_id = null
                var selected_color = 0

                for(let i = 0; i < (this.player_index).length; i++){
                    console.log('supp' + this.player_index[i].id)
                    console.log('buy' + this.buy_index[i].id)
                    
                    var supp = 'supp' + this.player_index[i].id
                    var buy = 'buy' + this.buy_index[i].id

                    if(last_id == this.player_index[i].id){
                    }else{
                        selected_color++
                        last_id = this.player_index[i].id
                    }

                    var line = new LeaderLine.setLine(document.getElementById(supp), document.getElementById(buy), {
                        color: this.colors[selected_color],
                        path: "curve",
                        endPlug: "show",
                    });
                    line.setOptions({startSocket: 'right', endSocket: 'left'});

                    this.buy_line.push(line)
                    this.supp_line.push(line)
                }

                
            },
            /*
            async getLocations(){
                this.data = await(this.$store.dispatch('searchAllLocations'))
                console.log(this.data)

                for(let i = 0; i < (this.data).length; i++){
                    this.temp_data = await(this.$store.dispatch('getMunicipalityName', this.data[i].municipality_city_id))
                    console.log(this.temp_data[0].name)

                    var checkLocation = false

                    checkLocation = this.locationItems.includes(this.temp_data[0].name)

                    if(!checkLocation){
                        this.locationItems.push(this.temp_data[0].name)
                        this.locations.push({id: this.temp_data[0].id, name: this.temp_data[0].name})

                    }
                }
            }
            async getProduct(product_id){
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                //this.product_name = this.product_data[0].name
                
                //this.getPlayerProducts(product_id)
                this.connectLines()
            },

            async getPlayerProducts(product_id){
                this.final_data.splice(0, 1)
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                this.product_name = this.product_data[0].name
                console.log(this.final_data)
                this.player_product_data = await(this.$store.dispatch('searchPlayerByProduct', product_id))

                for(let i = 0; i < (this.player_product_data).length; i++){
                    console.log(this.player_product_data[i])
                    
                    var array = this.player_product_data[i].product_date.split("-");
                    console.log(array)
                    console.log(array[1])
                    console.log(this.months[array[1]-1])
                    console.log(this.months[array[1]-1] + " " + array[0])

                    var checkDate = this.date_data.includes(this.months[array[1]-1] + " " + array[0])
                    
                    if(!checkDate){
                        this.date_data.push(this.months[array[1]-1] + " " + array[0])
                        this.final_data.push({date:[{date_name: this.months[array[1]-1] + " " + array[0],
                            product_name: this.product_name, inputs: 'number 1'}]})
                        console.log(this.date_data.indexOf(this.months[array[1]-1] + " " + array[0]))
                    }else{
                        console.log(this.date_data.indexOf(this.months[array[1]-1] + " " + array[0]))
                        var index = this.date_data.indexOf(this.months[array[1]-1] + " " + array[0])
                        console.log(this.final_data[index])
                        this.final_data[index].date.push({date_name: this.months[array[1]-1] + " " + array[0],
                            product_name: this.product_name, inputs: 'number 2'})
                    }
                    console.log(this.final_data)
                    
                    this.getPlayerProductInput(product_id, this.player_product_data[i].id)
                }
            },

            async getPlayerProductInput(product_id, player_product_id){
                this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInput', player_product_id))
                console.log(this.player_product_input_data)
                
                for(let i = 0; i < (this.player_product_input_data).length; i++){
                    this.getInput(i, this.player_product_input_data[i].input_id)
                }
                this.getInputByName(product_id, this.product_name)
                
            },

            async getInput(id, input_id){
                this.input_data = await(this.$store.dispatch('getInput', input_id))
                console.log(this.input_data[0].name)
                this.product_input_data.push({id: id, name: this.input_data[0].name})
            },

            async getInputByName(product_id, name){
                this.input_data_name = await(this.$store.dispatch('getInputByName', name))
                console.log(this.input_data_name)
                if((this.input_data_name).length != 0){
                    
                    for(let i = 0; i < (this.input_data_name).length; i++){
                        console.log(this.input_data_name[i])
                        this.getPlayerProductInputByInput(product_id, this.input_data_name[i].id)
                    }
                }else{
                    this.getProduct(product_id)
                }
            },

            async getPlayerProductInputByInput(product_id, input_id){
                this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInputByInput', input_id))
                console.log(this.player_product_input_data)

                for(let i = 0; i < (this.player_product_input_data).length; i++){
                    console.log(this.player_product_input_data[i].player_product_id)
                    this.player_product_data = await(this.$store.dispatch('getPlayerProductByInput', this.player_product_input_data[i].player_product_id))
                    console.log(this.player_product_data)

                    for(let j = 0; j < (this.player_product_data).length; j++){
                        this.getProductByInput(j, this.player_product_data[i].product_id)
                    }
                }

                //this.connectLines()
                this.getProduct(product_id)
            },

            async getProductByInput(id, product_id){
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                this.product_output_data.push({id: id, name: this.product_data[0].name})
                
            },

            async connectLines(){
                console.log('Helloooo connect lines')

                for(let i = 0; i < (this.product_input_data).length; i++){
                    var input = 'input' + i
                    var line = new LeaderLine.setLine(document.getElementById(input), product, {
                        color: "#3498db",
                        path: "curve",
                        endPlug: "show",
                    });

                    this.input_line.push(line)
                }
                
                for(let i = 0; i < (this.product_output_data).length; i++){
                    var output = 'output' + i
                    var line = new LeaderLine.setLine(product, document.getElementById(output), {
                        color: "#3498db",
                        path: "curve",
                        endPlug: "show",
                    });

                    this.output_line.push(line)
                }
            },

            async disconnectLines(){
                console.log('Helloooo disconnect lines')
                
                for(let i = 0; i < (this.input_line).length; i++){
                    this.input_line[i].hide();
                }

                for(let i = 0; i < (this.output_line).length; i++){
                    this.output_line[i].hide();
                }
            }
            */
        }
    }
</script>