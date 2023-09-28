<template>
      <v-row justify="space-between">
        <v-col>
            <v-autocomplete
                :items="products"
                item-title="name"
                item-value="id"
                v-model="selectedProduct"
                placeholder="Select"
                density="compact"
                variant="outlined"
                class="form-style"
            ></v-autocomplete>
        </v-col>
        <!--
            <v-col>
                <v-autocomplete
                    :items="players"
                    item-title="name"
                    item-value="id"
                    v-model="selectedPlayer"
                    placeholder="Select"
                    density="compact"
                    variant="outlined"
                    class="form-style"
                ></v-autocomplete>
            </v-col>
        -->
        
    </v-row>

    <br/>

    <v-row class="ma-0">
        <v-col class="ma-0">
            <v-row
                v-for="(item, input_index) in product_input_data"
                :ref="'input' + item.id"
                :key=input_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'input' + item.id"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ item.name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col class="ma-0">
            <v-row>
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            id="product"
                        ></v-sheet>
                        <div class="py"></div>
                        <code class="text-subtitle-1">{{ product_name }}</code>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col class="ma-0">
            <v-row
                v-for="(item, output_index) in product_output_data"
                :ref="'output' + item.id"
                :key=output_index
            >
                <v-col>
                    <div class="text-center">
                        <v-sheet flat
                            class="pa-6 bg-brown-lighten-4 rounded-circle d-inline-block"
                            :id="'output' + item.id"
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
                products: [],
                players: [],
                date_data: [],
                input_data: [],
                selectedProduct: '',
                selectedPlayer: '',
                data: [],
                product_data: [],
                player_product_data: [],
                player_product_input_data: [],
                temp_input: [],
                product_name: '',
                product_input_data: [],
                input_data_name: [],
                product_output_data: [],

                player_data: [],
                actor_data: [],
                product_data: [],

                line_data: [],
                player_id: null,

                is_player: false,
            }
        },
        beforeMount(){
            this.initial()
            //this.getProducts()
        },
        beforeUnmount(){
            this.disconnectLines()
        },
        watch: {
            selectedProduct: function (newValue){
                //console.log(newValue)
                this.disconnectLines()
                this.product_input_data = []
                this.product_output_data = []
                this.selectedPlayer = null

                if(!this.is_player){
                    this.getPlayer(newValue)
                }else{
                    

                    this.getPlayerProduct(this.player_id[0].id)
                }

                
            },

            selectedPlayer: function (newValue){
                this.disconnectLines()
                console.log(newValue)
                this.getPlayerProduct(newValue)
                
            }
        },
        methods:{
            initial(){
                //console.log(localStorage.getItem("isReport"))
                //this.isReport = localStorage.getItem("isReport")

                console.log(localStorage.getItem("user_id"))
                this.getPlayerByRepresentative()
                

            },
            async getPlayerByRepresentative(){
                console.log(localStorage.getItem("user_id"))
                console.log('Kumadiii meeeee rep')
                var user_id = localStorage.getItem("user_id")

                this.player_id = await(this.$store.dispatch('getPlayerByRepresentative', user_id))
                console.log(this.player_id)
                console.log(this.player_id[0].id)
                
                if((this.player_id).length != 0){
                    this.is_player = true

                    this.player_product_data = await(this.$store.dispatch('searchPlayerProduct', this.player_id[0].id))
                    console.log(this.player_product_data)

                    for(let i = 0; i < (this.player_product_data).length; i++){
                        this.product_data = await(this.$store.dispatch('searchProduct', this.player_product_data[i].product_id))
                        console.log(this.product_data[0].name)
                        this.products.push({id: this.product_data[0].id, name: this.product_data[0].name})
                    }

                    //this.getPlayerProduct(this.player_id[0].id)
                }else{
                    this.is_player = false
                    this.getProducts()
                }
                

            },
            async getProducts(){
                this.data = await(this.$store.dispatch('searchAllProducts'))
                console.log(this.data)
                for(let i = 0; i < (this.data).length; i++){
                    this.products.push({id: this.data[i].id, name: this.data[i].name})
                }
            },
            async getProduct(product_id){
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                //this.product_name = this.product_data[0].name
                
                //this.getPlayerProducts(product_id)
                //this.connectLines()
            },
            async getPlayer(product_id){
                /*
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                this.product_name = this.product_data[0].name
                this.player_product_data = await(this.$store.dispatch('searchPlayerByProduct', product_id))
                console.log(this.player_product_data)
                //getPlayer
                
                var ctr = 0
                for(let i = 0; i < (this.player_product_data).length; i++){
                    this.player_data = await(this.$store.dispatch('searchFinalPlayer', this.player_product_data[i].player_id))
                    console.log(this.player_data)

                    this.actor_data = await(this.$store.dispatch('searchActor', this.player_data[0].actor_id))
                    console.log(this.actor_data[0].name)

                    this.players.push({id: this.player_data[0].id, name: this.actor_data[0].name})
                    this.date_data.push(this.player_product_data[i].product_date)
                    //console.log(this.player_product_data[i].player_id)
                    //this.getPlayerProduct(this.player_product_data[i].player_id)
                    console.log('Hello')
                    //this.getPlayerProductInput(this.player_product_data[i].id)
                    this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInput', this.player_product_data[i].id))
                    console.log(this.player_product_input_data)
                    for(let j = 0; j < (this.player_product_input_data).length; j++){
                        //console.log(player_product_input_data)
                        //this.getInput(i, this.player_product_input_data[i].input_id)
                        this.input_data = await(this.$store.dispatch('getInput', this.player_product_input_data[j].input_id))
                        console.log(this.input_data[0].name)

                        var checkInput = false

                        checkInput = this.temp_input.includes(this.input_data[0].name)

                        if(!checkInput){
                            this.temp_input.push(this.input_data[0].name)
                            this.product_input_data.push({id: ctr, name: this.input_data[0].name})
                            ctr++
                        }
                    }
                }

                //console.log(this.final_data)
                this.getInputByName()
                */
                
                this.product_data = await(this.$store.dispatch('searchProduct', product_id))
                console.log(this.product_data)
                this.product_name = this.product_data[0].name
                this.player_product_data = await(this.$store.dispatch('searchPlayerByProduct', product_id))
                console.log(this.player_product_data)
                //getPlayer
                
                var ctr = 0
                for(let i = 0; i < (this.player_product_data).length; i++){
                    this.player_data = await(this.$store.dispatch('searchFinalPlayer', this.player_product_data[i].player_id))
                    console.log(this.player_data)

                    this.actor_data = await(this.$store.dispatch('searchActor', this.player_data[0].actor_id))
                    console.log(this.actor_data[0].name)

                    this.players.push({id: this.player_data[0].id, name: this.actor_data[0].name})
                    
                    //console.log(this.player_product_data[i].player_id)
                    //this.getPlayerProduct(this.player_product_data[i].player_id)
                    console.log('Hello')
                    //this.getPlayerProductInput(this.player_product_data[i].id)
                    this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInput', this.player_product_data[i].id))
                    console.log(this.player_product_input_data)
                    for(let j = 0; j < (this.player_product_input_data).length; j++){
                        //console.log(player_product_input_data)
                        //this.getInput(i, this.player_product_input_data[i].input_id)
                        this.input_data = await(this.$store.dispatch('getInput', this.player_product_input_data[j].input_id))
                        console.log(this.input_data[0].name)

                        var checkInput = false

                        checkInput = this.temp_input.includes(this.input_data[0].name)

                        if(!checkInput){
                            this.temp_input.push(this.input_data[0].name)
                            this.product_input_data.push({id: ctr, name: this.input_data[0].name})
                            ctr++
                        }

                    }
                    
                }
                //this.getPlayerProduct(1)
                this.getInputByName()
                
                /*
                for(let i = 0; i < (this.player_product_data).length; i++){
                    console.log(this.player_product_data[i])
                    this.getPlayerProductInput(product_id, this.player_product_data[i].id)
                }
                */

                //console.log(this.product_name)
            },

            async getPlayerProduct(player_id){

                this.product_data = await(this.$store.dispatch('searchProduct', this.selectedProduct))
                console.log(this.product_data)
                this.product_name = this.product_data[0].name

                this.player_product_data = await(this.$store.dispatch('searchPlayerProduct', player_id))
                console.log(this.player_product_data)

                //must return this
                
                for(let i = 0; i < (this.player_product_data).length; i++){
                    if(this.player_product_data[i].product_id == this.selectedProduct){
                        console.log('Hello')
                        //this.getPlayerProductInput(this.player_product_data[i].id)
                        this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInput', this.player_product_data[i].id))
                        console.log(this.player_product_input_data)
                        for(let j = 0; j < (this.player_product_input_data).length; j++){
                            //console.log(player_product_input_data)
                            //this.getInput(i, this.player_product_input_data[i].input_id)
                            this.input_data = await(this.$store.dispatch('getInput', this.player_product_input_data[j].input_id))
                            console.log(this.input_data[0].name)
                            this.product_input_data.push({id: j, name: this.input_data[0].name})
                        }
                    }
                }
                this.getInputByName()
                

            },
            async getPlayerProductInput(player_product_id){
                this.player_product_input_data = await(this.$store.dispatch('getPlayerProductInput', player_product_id))
                console.log(this.player_product_input_data)
                for(let i = 0; i < (this.player_product_input_data).length; i++){
                    //console.log(player_product_input_data)
                    this.getInput(i, this.player_product_input_data[i].input_id)
                }
                //this.getInputByName()
                
            },
            async getInput(id, input_id){
                this.input_data = await(this.$store.dispatch('getInput', input_id))
                console.log(this.input_data[0].name)
                this.product_input_data.push({id: id, name: this.input_data[0].name})

                //this.connectLines()


            },
            async getInputByName(){
                this.input_data = await(this.$store.dispatch('getInput', 1))
                console.log(this.input_data[0].name)
                this.connectLines()
                /*
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
                */
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
                        path: "grid",
                        endPlug: "show",
                    });

                    line.setOptions({startSocket: 'right', endSocket: 'left'});

                    this.line_data.push(line)
                }
            },

            async disconnectLines(){
                console.log('Helloooo disconnect lines')
                
                for(let i = 0; i < (this.line_data).length; i++){
                    this.line_data[i].hide();
                }
            }
        }
    }
</script>

<style>
    .form-style {
        width: 700px;
    }

    .icon {
        size: 2000px;
    }
</style>