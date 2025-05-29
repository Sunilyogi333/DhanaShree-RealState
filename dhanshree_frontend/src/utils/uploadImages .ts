
import $axios from "@/lib/axios.instance";


export const uploadImages = async (formData: FormData) => {

    console.log("uploading images with formData", formData);
        try {
            const res = await $axios.post("/image", formData);
            return res.data;
        } catch (error) {
            console.log("error in uploadImages",error);
        }


}