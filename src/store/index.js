import { createStore } from 'vuex'
import { auth, db } from '@/firebase/config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import { getDocs, collection, query, orderBy, deleteDoc, doc} from "firebase/firestore";

const store = createStore({
  state: {
    kullanici:null,
    authDurum:false,
    sertifikalar:null
  },
  getters: {
    sertifikaGetir:(state)=>(id)=>{
        return state.sertifikalar.find(sertifika => sertifika.id===id)
    },
    sertifikaNoGetir:(state)=>(no)=>{
        return state.sertifikalar.find(sertifika => sertifika.sertifikaNo === no)
    }
  },
  mutations: {
    kullaniciDegistir(state, payload){
      state.kullanici = payload;
      //console.log(`output->state.kullanici:`,state.kullanici)
    },
    authDurumDegistir(state, payload){
      state.authDurum = payload
      //console.log(`output->state.authDurum:`,state.payload)
    },
    sertifikalarDoldur(state, payload){
      state.sertifikalar = payload
    }
  },
  actions: {
    async login(context,payload){
      const res = await signInWithEmailAndPassword(auth, payload.email, payload.parola);
      if (res) {
        context.commit('kullaniciDegistir', res.user)
      } else {
        throw new Error("Giriş işlemi gerçekleşmedi")
      }
    },
    async logout(context){
      await signOut(auth)
      context.commit('kullaniciDegistir', null)
    },
    async sertifikalariGetir(context){
       let sertifikalar = [];
        const colRef = collection(db, "sertifikalar")
        const sorgu = query(colRef,orderBy("eklenmeTarih", "desc"))

        await getDocs(sorgu)
        .then(snapshot=>{
          snapshot.docs.forEach(doc => {
            sertifikalar.push({...doc.data(), id: doc.id})
          });
        }).catch(err=>{console.log(`output->err:`,err.message)})

        //console.log(`output->sertifikalar`,sertifikalar)
        context.commit('sertifikalarDoldur',sertifikalar)

    },
    async sertifikaSil(context, id){
      try {
        console.log(`output->id`,id)
        const docRef = doc(db, "sertifikalar",id)
        await deleteDoc(docRef).catch(err =>{
          //console.log(`output->err`,err)
          throw new Error("sertifika silinemedi");
        })
      } catch (error) {
        //console.log(`output->error`,error)
        throw new Error("sertifika silinemedi");
      }
    }
  },
  modules: {
  }
})

const unsub=onAuthStateChanged(auth,(user)=>{
  
  store.commit('authDurumDegistir', true);
  store.commit('kullaniciDegistir', user);
  unsub()
})
export default store;