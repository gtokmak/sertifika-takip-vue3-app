<template>
    <div class="row ">
      <div class="col s12 m9 offset-m2 center-align">
        <div class="card grey lighten-4">
            <span class="card-title">Sertifika Ekle</span>
            <div class="card-content">
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">badge</i>
                  <input id="sertifikaNo" type="text" class="validate" v-model="sertifikaNo">
                  <label for="sertifikaNo">Sertifika No:</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">money</i>
                  <input id="not" type="text" class="validate" v-model="not">
                  <label for="not">Not:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">face</i>
                  <input id="ogrAd" type="text" class="validate" v-model="ogrAd">
                  <label for="ogrAd">Öğrenci Ad:</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">face</i>
                  <input id="ogrSoyad" type="text" class="validate" v-model="ogrSoyad">
                  <label for="ogrSoyad">Öğrenci Soyad:</label>
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
            </div>
            <div class="card-action">
                <p v-if="dosyaHata" class="red-text"> {{ dosyaHata }}</p>
             <a :disabled="dosyaHata" class="waves-effect waves-light btn orange accent-4" @click.prevent="handleSubmit">Kaydet 
            <i class="material-icons right">save</i></a>
            <p v-if="belgeHata" class="red-text"> {{ belgeHata }}</p>
            </div>
        </div>
      </div>
    </div>
</template>
    
<script>
import { ref } from 'vue';
import useStorage from '../composables/useStorage'
import useColleciton from '../composables/useColleciton'
import { useRouter } from 'vue-router';
import { tarih } from '@/firebase/config';
export default{
    
    setup() {
        const router = useRouter()
        const sertifikaNo = ref('')
        const not = ref('')
        const ogrAd = ref('')
        const ogrSoyad = ref('')

        const {dosyaYukle,url,fileYol,hata} = useStorage();
        const {belgeEkle, belgeHata} = useColleciton('sertifikalar');

        const dosya = ref(null)
        const dosyaHata = ref(null)
        const gecerliTip=['application/pdf']



        const handleChange =(event)=>{
            let secilen = event.target.files[0];
            if(secilen && gecerliTip.includes(secilen.type)){
                dosya.value = secilen
                dosyaHata.value = null
            } else{
                dosya.value = null
                dosyaHata.value = "Pdf uzantılı dosya seçmelisiniz!"
            }
        }
        const handleSubmit= async()=>{
            if(dosya.value){
              await dosyaYukle(dosya.value)
              await belgeEkle({
                sertifikaNo:sertifikaNo.value,
                not:not.value,
                ogrenciAd:ogrAd.value,
                ogrenciSoyad:ogrSoyad.value,
                sertifikaUrl:url.value,
                eklenmeTarih:tarih
              })

              if(!belgeHata.value){
                router.push('/liste')
              }else {
                
              }
            }
        }
        return{ sertifikaNo, not, ogrAd, ogrSoyad, handleSubmit,handleChange,dosyaHata, belgeHata}
    }
}
</script>
    
<style>
    
</style>