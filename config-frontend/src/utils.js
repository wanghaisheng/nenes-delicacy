import axios from './axios';
import Cookie from 'universal-cookie'
import { v4 as uuid4} from 'uuid'


const cookie = new Cookie();
const date = new Date();


const get = async (url) => {

    const response = await axios.get(url, { withCredentials: true })
    return response.data
}


const post =  async (url, data) => {
    const response = await axios.post(url, data, { withCredentials: true })
    return response
}


const getCookie = () => {
    
    let sessionid = cookie.get('sessionid')
    if (!sessionid) {
        sessionid = uuid4();

        cookie.set('sessionid', sessionid, { 
            maxAge: date.setMonth(date.getMonth() + 2),
            path: '/'}
        );

        get(`cart/createCart?sessionid=${sessionid}`) 
        .then(res => console.log(res))
    }
    return sessionid
}
   

const routeProtection = {
    id: uuid4(), 
    quantity: 1, 
    item: { image: 'http://127.0.0.1:8000/media/route-package-protection-logo_small.avif',
            name: 'Route package protection',
            unit_price: 1000,
            description: 'Against loss, theft or damage in transit and instant resolution'
        }
    }



export { get, post, getCookie, routeProtection }

