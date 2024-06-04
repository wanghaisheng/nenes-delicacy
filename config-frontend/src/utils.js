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


const backgroundImages = [
    {
        id: 0,
        background: 'images/cupcakes-with-pink-icing-pink-drink-flip.jpg',
        header: "Welcome to Nene's delicacy",
        paragraph: "We invite you to enter a world where buttery\
                    perfection meets irresistible flavors, where each\
                    bite transports you to a realm of pure bliss.",
        lineBreak: "images/noun-decorative-line-4253413.png",
        lineBreakText: "whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy"
    }, 

    {
        id: 1,
        background: 'images/cupcakes-with-pink-icing-pink-drink-flip.jpg',
        header: "Welcome to Nene's delicacy",
        paragraph: "We invite you to enter a world where buttery\
                    perfection meets irresistible flavors, where each\
                    bite transports you to a realm of pure bliss.",
        lineBreak: "images/noun-decorative-line-4253413.png",
        lineBreakText: "whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy"
    }
]

const placeHolder = {
    id: null,
    address: '',
    firstName: '',  
    lastName: '',
    phone: '',
    price: 0,
    state: '',
    lga: '',
    email: '',
    deliveryDate: ''
}


export { 
        get, 
        post, 
        getCookie, 
        routeProtection,
        backgroundImages,
        placeHolder
     }

