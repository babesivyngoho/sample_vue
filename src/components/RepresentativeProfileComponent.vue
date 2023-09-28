<template>
    <v-form ref="form" lazy-validation>
  
      <v-row no-gutters class="header-6">Name of Business</v-row>
      <v-autocomplete
          :items="players"
          v-model="this.final_data.business_name"
          density="compact"
          variant="outlined"
      ></v-autocomplete>
      
      <v-row no-gutters class="header-6">Name of Representative</v-row>
      <v-autocomplete
          :items="representatives"
          v-model="this.final_data.representative_name"
          density="compact"
          variant="outlined"
      ></v-autocomplete>
      
      <v-row>
        <v-col>
          <v-btn color="#BAD4AF" flat @click="saveChanges">Save</v-btn>
          <v-btn color="#CECECE" flat class="ml-5">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-form>
</template>

<script>
  export default {
    data () {
        return {
            data: [],
            actor_data: [],
            user_data: [],
            players: [],
            representatives: [],
            message: '',

            final_data: {
              business_name: null,
              representative_name: null,
            },
        }
    },
    beforeMount(){
        this.getPlayers()
        this.getBusinessName()
    },
    methods: {
        async getPlayers(){
          console.log("Helloo")
          this.data = await(this.$store.dispatch('getAllPlayers'));
          console.log(this.data)
          this.representatives.push('No Representative')
          for(let i = 0; i <(this.data).length; i++){
              this.actor_data = await(this.$store.dispatch('searchActor', this.data[i].actor_id))
              console.log(this.actor_data[0].name)
              this.players.push(this.actor_data[0].name)
          }
            
        },

        async getBusinessName(){
          this.user_data = await(this.$store.dispatch('getAllUsers'))
          for(let i = 0; i < (this.user_data).length; i++){
            console.log(this.user_data[i].name)
            this.representatives.push(this.user_data[i].name)
          }
        },

        async saveChanges(){
          console.log(this.final_data.business_name)
          console.log(this.final_data.representative_name)

          this.message = await(this.$store.dispatch('setRepresentative', this.final_data))
          console.log(this.message)
        }
      }
  }
</script>