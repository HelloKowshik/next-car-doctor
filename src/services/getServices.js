import axios from 'axios';

export const getAllServices = async () => {
    const res = await axios.get('http://localhost:3000/services/api/get-all');
    return res.data;
}

export const getServiceDetails = async (id) => {
    const res = await fetch(`http://localhost:3000/services/api/${id}`);
    const service = res.json();
    return service;
}
