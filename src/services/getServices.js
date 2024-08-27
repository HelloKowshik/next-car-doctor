import axios from 'axios';

export const getAllServices = async () => {
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`);
        return res.data;
    }catch(err){
        console.log(err);
        return [];
    }
    
}

export const getServiceDetails = async (id) => {
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`);
        return res.data;
    }catch(err){
        console.log(err);
        return {};
    }
}
