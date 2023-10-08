<template>
        
    <div class="row ">
      <div class="col s12 m9 offset-m2 center-align">
        <div class="card grey lighten-4">
            <span class="card-title">Sertifika Bigileri</span>
            <div class="card-content">
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix active">badge</i>
                  <input id="sertifikaNo" type="text" class="validate" v-model="sertifikaNo">
                  <label class="active" for="sertifikaNo">Sertifika No:</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix active">money</i>
                  <input id="not" type="text" class="validate" v-model="not">
                  <label class="active" for="not">Not:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix active">face</i>
                  <input id="ogrAd" type="text" class="validate" v-model="ogrAd">
                  <label class="active" for="ogrAd">Öğrenci Ad:</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix active">face</i>
                  <input id="ogrSoyad" type="text" class="validate" v-model="ogrSoyad">
                  <label class="active" for="ogrSoyad">Öğrenci Soyad:</label>
                </div>
              </div>
              <div class="row">
                <div class="file-field input-field">
                <div class="btn orange">
                    <span>Dosya Seç</span>
                    <input type="file" @change="handleChange">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
              </div>
            </div>
              <div class="card-action">
                <p v-if="hata" class="red-text">{{ hata }}</p>
                <a @click="handleBack" class="waves-effect waves-light btn orange accent-4 left">Geri <i class="material-icons">arrow_back</i></a>
                <a @click.prevent="handleDelete" class="waves-effect waves-light btn red accent-4 center">Sil <i class="material-icons">delete</i></a>
                <a @click="handleUpdate" class="waves-effect waves-light btn blue accent-4 right">Güncelle <i class="material-icons">update</i></a>
                </div>
            </div>
        </div>
      </div>
    </div>

</template>
    
<script setup>
import { useRoute, useRouter } from "vue-router";
import useStorage from '../composables/useStorage'
import { useStore } from "vuex";
import {ref} from 'vue';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
    

    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const {dosyaYukle,url} = useStorage();
    const id = route.params.id

    const sertifika = store.getters.sertifikaGetir(id)

    const dosya = ref(null)
    const gecerliTip=['application/pdf']


    const sertifikaNo = ref(sertifika.sertifikaNo)
    const not = ref(sertifika.not)
    const ogrAd = ref(sertifika.ogrenciAd)
    const ogrSoyad = ref(sertifika.ogrenciSoyad)
    const hata =ref(null)

    const handleBack=()=>{
        router.go(-1)
    }

    const handleChange=(event)=>{
            let secilen = event.target.files[0];
            if(secilen && gecerliTip.includes(secilen.type)){
                dosya.value = secilen
                hata.value = null
            } else{
                dosya.value = null
                hata.value = "Pdf uzantılı dosya seçmelisiniz!"
            }
    }
    const handleDelete=async()=>{
        try {
            await store.dispatch('sertifikaSil',id)
            router.push({name:"liste"})
        } catch (error) {
            hata.value = error.message;
        }
    }

    const handleUpdate=async()=>{
        const docRef = doc(db, 'sertifikalar',id)
        if(dosya.value){
            await dosyaYukle(dosya.value)
            updateDoc(docRef,{
                sertifikaNo:sertifikaNo.value,
                not:not.value,
                ogrenciAd:ogrAd.value,
                ogrenciSoyad:ogrSoyad.value,
                sertifikaUrl:url.value,
            }).then(()=>{ router.push('/liste')})
            .catch(err => hata.value = err.message)
        }else {
            updateDoc(docRef,{
                sertifikaNo:sertifikaNo.value,
                not:not.value,
                ogrenciAd:ogrAd.value,
                ogrenciSoyad:ogrSoyad.value,
            }).then(()=>{ router.push('/liste')})
            .catch(err => hata.value = err.message)
        }
    }
</script>
    
<style>
    
</style>