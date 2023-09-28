<template>
    <v-row color="#ffff00">
        <v-col align-self="center" fill-height >
            <v-card class="main-style" elevation="3">
                <v-row justify-self="center">
                    <v-col cols="6" class="text-center pa-0 logo-style">
                        <img 
                            class="image-style"
                            :width="400" 
                            src="@/assets/sAPPat_main.png"/>
                    </v-col>
                    <v-col cols="6" class="px-10 py-10 form-style">
                        <v-row class="mb-2 mt-10" justify="center">
                            <v-col cols="3">
                                <h3 class="text-uppercase">Register</h3>
                            </v-col>
                        </v-row>

                        <v-form ref="form" v-model="valid" lazy-validation>
                            
                            <v-row no-gutters>Name</v-row>
                            <v-text-field :rules="[v => !!v || 'Name is required']" required density="compact" variant="outlined" v-model="user.name"> 
                            </v-text-field>

                            <v-row no-gutters>Assigned sex at birth</v-row>
                            <v-radio-group inline v-model="user.sex_at_birth">
                                <v-radio label="Male" value="male"></v-radio>
                                <v-radio label="Female" value="female"></v-radio>
                            </v-radio-group>

                            <v-row no-gutters>Contact Number</v-row>
                            <v-text-field :rules="[v => !!v || 'Contact Number is required']" required density="compact" variant="outlined" v-model="user.contact_no"> 
                            </v-text-field>

                            <v-row no-gutters>Email Address</v-row>
                            <v-text-field :rules="[v => !!v || 'Email Address is required']" required density="compact" variant="outlined" v-model="user.email"> 
                            </v-text-field>

                            <v-row no-gutters>Password</v-row>
                            <v-text-field :rules="[v => !!v || 'Password is required']" required density="compact" v-on:keyup.enter="onLogin" :type="showPassword ? 'text' : 'password'" variant="outlined" v-model="user.password"> 
                                <!-- <v-btn flat class="custom-button" icon size="x-small" @click="showPassword = !showPassword"><v-icon :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"/></v-btn> -->
                                <v-icon class="custom-button" :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click="showPassword = !showPassword"/>
                            </v-text-field>

                            <v-row no-gutters>Confirm Password</v-row>
                            <v-text-field :rules="[v => !!v || 'Confirm Password is required']" required density="compact" v-on:keyup.enter="onLogin" :type="showPasswordCheck ? 'text' : 'password'" variant="outlined" v-model="user.password_check"> 
                                <!-- <v-btn flat class="custom-button" icon size="x-small" @click="showPassword = !showPassword"><v-icon :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"/></v-btn> -->
                                <v-icon class="custom-button" :icon="showPasswordCheck ? 'mdi-eye' : 'mdi-eye-off'" @click="showPasswordCheck = !showPasswordCheck"/>
                            </v-text-field>
                            
                            <!-- <v-row class="note-text font-italic text-right-justify">
                                <router-link class="ml-2" to="">Forgot Password?</router-link>
                            </v-row> -->

                            <v-row no-gutters>
                                <v-col class="text-red" style="font-size: 10px;">
                                    {{ errorMessage }}
                                </v-col>
                            </v-row>
                            <v-btn flat class="text-uppercase" @click="openDialog" width="100%" style="background: #E5E2DA; font-weight: bold;">Register</v-btn>

                            <v-dialog
                                v-model="dialog"
                                width="auto"
                            >
                                <v-card flat
                                    hover height="100%" class="card-outter"
                                >
                                    <v-card-text>
                                        Are you sure you want to register?
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-card-actions class="card-actions">
                                        <v-btn
                                            flat
                                            style="background: #E5E2DA"
                                            @click="onRegister"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            flat
                                            style="background: #E5E2DA"
                                            @click="dialog = false"
                                        >
                                            No
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-dialog
                                v-model="register_bool"
                                width="auto"
                            >
                                <v-card flat
                                    hover height="100%" class="card-outter"
                                >
                                    <v-card-text>
                                        {{ errorMessage }}
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-card-actions class="card-actions">
                                        <v-btn
                                            flat
                                            style="background: #E5E2DA"
                                            :to="'/login'"
                                        >
                                            Okay
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-form>
                        <!-- <v-row no-gutters class="text justify-center my-3">Or</v-row>
                        <v-btn class="text-capitalize text-white" color="#3B5998" width="100%" @click="onLoginThroughFB"> Login using Facebook</v-btn> -->
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import RepresentativeProfileComponent from "@/components/RepresentativeProfileComponent.vue"

export default {
    components: {
        RepresentativeProfileComponent,
    },
    data() {
        return {
            dialog: false,
            register_bool: false,
            user:{
                name: '',
                sex_at_birth: '',
                contact_no: '',
                email: '',
                password: '',
                password_check: '',
            },
            errorMessage: "",
            showPassword: false,
            showPasswordCheck: false,
            valid: false,
            image: "vc-img.png",
        }
    },
    setup(){
        const getImageUrl = (name) => {
            return new URL(`@/assets/${name}`, import.meta.url).href
        }
        return {getImageUrl}
    },
    mounted(){

    },
    methods: {
        async onRegister(){
            this.dialog = false;
            console.log(this.user.name);
            console.log(this.user.email);
            console.log(this.user.password);
            console.log(this.user.password_check);
            this.errorMessage = await this.$store.dispatch('registerUser', this.user);
           
            if(this.errorMessage == 'User successfully registered!'){
                console.log('Hello hello register')
                console.log(this.errorMessage)
                this.register_bool = true
            }
        },

        async openDialog(){
            const isValid = await this.$refs.form.validate()
            if(!isValid.valid){
                // this.errorMessage = await this.$store.dispatch('loginUser', this.user);
                this.errorMessage = "Registration Failed";
            } else {
                this.dialog = true;
            }
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
    .note-text {
        font-size: 12px;
        // color: #c5c5c5
    }
    .custom-input {
        position: relative;
    }
    .custom-button {
        position: absolute;
        right: 10px;
        z-index: 2;
        border: none;
        cursor: pointer;
        background-color: transparent;
    }
    .text-right-justify {
        text-align: right;
    }
    .logo-style {
        background-color: #E5E2DA;
    }
    .image-style {
        margin-top: 80px;
    }
    .main-style {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }
    .form-style {
        margin-top: auto;
        text-justify: center;
        text-align: center;
        min-height: 70vh;
    }

    .card-outter {
        padding-bottom: 50px;
    }

    .card-actions {
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>