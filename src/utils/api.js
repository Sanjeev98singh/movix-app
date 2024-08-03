import axios from 'axios'

export const fetchApi = async (url, data) => {

    try {
        const result = await axios(url, data);
        return result;
    } catch (error) {
        console.error(error);
    }

}
