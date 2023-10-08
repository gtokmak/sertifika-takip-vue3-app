<template>
    <div class="row">
        <div class="col s12 m12">
            <div class="card blue-grey darken-1">
                <div class="card-content black-text">
                    <span class="card-title white-text">Sertifika listesi</span>
                    <ul class="collapsible">
                        <li v-for="sertifika in sertifikalar" :key="sertifika.id">
                            <div class="collapsible-header"><i class="material-icons orange-text">article</i>{{ sertifika.ogrenciAd }} {{ sertifika.ogrenciSoyad }}</div>
                            <div class="collapsible-body white-text">
                                <span>Not:{{ sertifika.not }}</span>
                                <button class="right btn orange" @click="handleClik(sertifika.id)">İncele</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter()

store.dispatch('sertifikalariGetir')
onMounted(()=>{
    M.AutoInit();
})
const sertifikalar = computed(()=>store.state.sertifikalar)

const handleClik = (id)=>{
    router.push({name:"incele", params:{id}})
}

</script>

