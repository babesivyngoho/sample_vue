<template>
    <v-row no-gutters>
        <div class="main-text">
            Hello, {{ user.username }}!
        </div>
    </v-row>
    <v-row no-gutters>
        <v-sheet class="role-text">
            {{ user.role }}
        </v-sheet>
    </v-row>

    <v-row class="pt-5">
        <!-- Temporary loop -->
        <v-col class="button-layout" v-for="button in features" cols="5" xs="5" sm="4" md="3" lg="2">
            <v-card
                class="button-style d-flex align-center justify-center"
                variant="outlined"
                rounded
                @click="onClick(button)"
            >
                <v-icon class="icon-style" size="70">{{ button.icon }}</v-icon>
            </v-card>
            <v-sheet class="pt-3 text-center button-name-style text-uppercase"> {{ button.name.toUpperCase() }} </v-sheet>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ['user', 'features'],
    emits: ["selected"],
    methods: {
        onClick(params){
            this.$emit('selected', params)
        }
    }
}
</script>

<style lang="scss" scoped>
  .main-text{
    font-weight: bold;
    font-size: 2.3em;
  }
  .role-text{
    font-size: 1.2em;
  }

  .icon-style{
    color: #333333;
  }

  // .button-name-style{
  //   font-size: 1.0em;
  //   font-weight: bold;
  //   color: #333333;
  //   max-width: 250px;
  //   margin-left: auto;
  //   margin-right: auto;
  // }
</style>