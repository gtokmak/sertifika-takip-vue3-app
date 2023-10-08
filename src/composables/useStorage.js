import {ref} from 'vue'
import {storage} from '../firebase/config'
import {ref as sRef, uploadBytes, getDownloadURL} from 'firebase/storage'

const useStroge =()=>{

    const hata = ref(null);
    const url = ref(null);
    const fileYol = ref(null);

    const dosyaYukle= async(file)=>{
        fileYol.value = `sertifikalar/${file.name}`
        const storageRef = sRef(storage, fileYol.value)

        try {
            const uploadTask = await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(uploadTask.ref)
        } catch (error) {
            hata.value = error.message;
        }
    }
    return {dosyaYukle,url,fileYol,hata }
}
export default useStroge