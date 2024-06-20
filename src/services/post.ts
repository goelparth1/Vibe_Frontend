import { INewPost } from "@/types";
import axios from "axios";

export const createPost = async (data : INewPost) => {
    if(!data){return}
    try{
        console.log(data.File);
        const formData = new FormData();
        
        formData.append("caption",data.caption);
        formData.append("file",data.File);
        formData.append("location",data.location!);
        formData.append("tags",data.tags!);
    const response = await axios.post(`${import.meta.env.VITE_POST_URL}/create`,formData,{
        withCredentials : true,
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
          }
    });
    return response.data;
}catch(err){
    console.log(err);
}
}

export const getRecentPosts = async () => {
try{
  const response =  await  axios.get(`${import.meta.env.VITE_POST_URL}/getRecentPosts`,{
        withCredentials:true,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    return  response.data;
}catch(err){
  throw err;
}

}