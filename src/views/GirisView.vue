<template>
       <div class="row">
        <div class="col s12 m8 offset-m2 center-align">
            <div class="card grey lighten-4">
                <span class="card-title">Sistem Girişi</span>
                <div class="card-content">
                    <div class="row">
                        <div class="col s6 input-field">
                            <i class="material-icons prefix">email</i>
                            <input v-model="email" type="email" id="email" class="validate" autocomplete="off">
                            <label for="email">Email:</label>
                        </div>
                        <div class="col s6 input-field">
                            <i class="material-icons prefix">lock</i>
                            <input v-model="parola" type="password" id="parola" class="validate">
                            <label for="parola">Parola:</label>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <a @click.prevent="handleSubmit" class="waves-effect waves-light btn orange accents" >GİRİŞ<i class="material-icons right">done</i></a>
                </div>
                <div v-if="hata">{{ hata }}</div>
            </div>
        </div>
        
       </div>
</template>
    
<script setup>
import {ref} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const email = ref('')
const parola = ref('')
const hata = ref('')
const store = useStore();
const router =useRouter();
const handleSubmit=async()=>{
    const payload = {
        email:email.value, parola:parola.value
    }
    try {
        await store.dispatch('login',payload )
        router.push('/profil')
    } catch (error) {
        hata.value = error.message;
    }
    //console.log(email.value, parola.value)
}

    
</script>
    
<style scoped>

.input-field input[type=password]:focus + label{
  color: #000 !important;
}

.input-field input[type=password]:focus{
border-bottom: 1px solid #000 !important;
box-shadow: 0 1px 0 0 #000 !important;
}

.input-field input[type=email]:focus + label{
  color: #000 !important;
}

.input-field input[type=email]:focus{
border-bottom: 1px solid #000 !important;
box-shadow: 0 1px 0 0 #000 !important;
}

.input-field .active{
    color: #ff6d00;
}
</style>