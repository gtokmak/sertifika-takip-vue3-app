<template>
  <div class="row">
    <div class="col s12 m8 offset-m2 center-align">
      <div class="card grey lighten-4">
        <span class="card-title">Sertifika Ara</span>
        <a @click="handleSearch" class="btn-floating halfway-fab waves-effect waves-light orange accent-4 pulse">
          <i class="material-icons">search</i>
        </a>
        <div class="card-content">
          <p>Aradığınız sertifikayı bulmak için lütfen sertifika numarası giriniz!</p>
          <div class="row">
            <div class="input-field col s8">
              <input v-model="sertifikaNo" type="text" id="sertifika_no">
              <label for="sertifika_no">Sertifika No:</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <transition name="hata">
      <div v-if="hata" class="col s12 m8 offset-m2 center-align"> 
        <div class="card red lighten-4">
          <span class="card-title">Sertifika Arama Sonucu</span>
          <div class="card-content">{{  hata }}</div>
        </div>
      </div>
    </transition>
    
  </div>
  <div class="row">
    <transition name="sertifika">
    <div v-if="sertifikaBilgisi !='' " class="col s12 m12"> 
      <div class="card grey lighten-4">
        <div class="card-content black-text">
          <span class="card-title">Sertifika Bilgisi</span>
          <div class="row">
            <div class="col s4 m4">
              <p> <b>Öğrenci:</b>{{ sertifikaBilgisi.ogrenciAd }} {{ sertifikaBilgisi.ogrenciSoyad }}</p>
            </div>
            <div class="col s4 m4">
              <p> <b>Not:</b>{{ sertifikaBilgisi.not }}</p>
            </div>
            <div class="col s4 m4">
              <a :href="sertifikaBilgisi.sertifikaUrl" target="_blank" class="btn btn-success">Sertifika İncele</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const sertifikaNo = ref('');
const hata = ref(null);
const sertifikaBilgisi = ref('');

store.dispatch('sertifikalariGetir')
const sertifikalar = computed(()=> store.state.sertifikalar)

const handleSearch=()=>{
  if(sertifikaNo.value){
    hata.value = null;
    sertifikaBilgisi.value =''
    const sertifika = store.getters.sertifikaNoGetir(sertifikaNo.value)
    if(sertifika === undefined){
      hata.value = sertifikaNo.value + " numaralı sertifika bulunamadı."
    }else {
      sertifikaBilgisi.value = sertifika
    }

  }

}

</script>

<style scoped>
.input-field label{
  color: #000 !important;
}

.input-field input[type=text]:focus + label{
  color: #000 !important;
}

.input-field input[type=text]:focus{
border-bottom: 1px solid #000 !important;
box-shadow: 0 1px 0 0;
}

.hata-enter-active,
.hata-leave-active{
  transition: opacity 2s ease-in-out;
}

.hata-enter-from,
.hata-leave-to{
  opacity: 0;
}

.sertifika-enter-active,
.sertifika-leave-active{
  transition: all 2s ease;
}

.sertifika-enter-from,
.sertifika-leave-to{
  opacity: 0;
}
</style>