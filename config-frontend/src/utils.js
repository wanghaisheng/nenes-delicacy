import axios from './axios';
import Cookie from 'universal-cookie'
import Shape1 from '/icons/shape.svg'
import Shape2 from '/icons/shape2.svg'
import Shape3 from '/icons/shape3.svg'
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

        get(`cart/createCart/?sessionid=${sessionid}`)
    }
    return sessionid
}
   


const routeProtection = {
    id: uuid4(), 
    quantity: 1, 
    
    item: { image: 'image/upload/v1721681276/route-package-protection-logoV2_small_qwmbfg.avif',
            lazyImage: 'image/upload/v1721681276/route-package-protection-logoV2_small_qwmbfg.avif',
            name: 'Route package protection',
            description: 'Against loss, theft or damage in transit and instant resolution'
        },
    price: 1000
}



const backgroundImages = [
    {
        id: 0,
        background: import.meta.env.VITE_CLOUD_URL + 'image/upload/v1723443945/delicious-pakistani-food-with-tomato-sauce_1_bqefon.jpg',
        header: "Welcome to Nene's delicacy",
        svg: Shape1,
        paragraph: "We invite you to enter a world where buttery\
                    perfection meets irresistible flavors, where each\
                    bite transports you to a realm of pure bliss.",
        lineBreak: "images/noun-decorative-line-4253413.png",
        colorScheme: '#00211a',
        desc: 'samosas with two dipping sauces',
        lineBreakText: "whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy"
    }, 

    {
        id: 1,
        background: import.meta.env.VITE_CLOUD_URL + 'image/upload/v1723478265/79897_1_rvkunk.jpg',
        header: "Welcome to Nene's delicacy",
        svg: Shape2,
        paragraph: "We invite you to enter a world where buttery\
                    perfection meets irresistible flavors, where each\
                    bite transports you to a realm of pure bliss.",
        lineBreak: "images/noun-decorative-line-4253413.png",
        colorScheme: '#00211a',
        desc: 'cookies with cinnamon ornaments',
        lineBreakText: "whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy"
    },

    {
        id: 2,
        background: import.meta.env.VITE_CLOUD_URL + 'image/upload/v1725039156/Cupcake_Confetti_Vanilla_6_Count_2048x_s0iprk.webp',
        header: "Welcome to Nene's delicacy",
        svg: Shape3,
        paragraph: "We invite you to enter a world where buttery\
                    perfection meets irresistible flavors, where each\
                    bite transports you to a realm of pure bliss.",
        lineBreak: "images/noun-decorative-line-4253413.png",
        colorScheme: '#43234c',
        desc: 'cupcakes with sprinkles',
        lineBreakText: "whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy"
    },
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
    deliveryDate: '',
    routeProtection: null
}


const imageCollage = [
    [
        {
            id: 1,
            'title': 'Girl celebrating birthday with a cake',
            'url': 'image/upload/v1725649747/dreamstime_ftdomr.jpg',
            'placeHolderSrc': ''
        },

        {
            id: 2,
            'title': 'Slice of red velvet cake on a plate',
            'url': 'image/upload/v1725807223/Classic_Red_Velvet_Cake_pg1g3i.jpg',
            'placeHolderSrc': ''
        },

        {
            id: 3,
            'title': 'Three people celebrating with one holding a cake',
            'url': 'image/upload/v1725649748/1725628768549_scfpl9.png',
            'placeHolderSrc': ''
        },

        {
            id: 4,
            'title': 'Packaged tray of small chops',
            'url': 'image/upload/v1725649749/Photo_from_catabong89_jc0djc.png',
            'placeHolderSrc': ''
        }
    ],

    [
        {
            id: 1,
            'title': 'A stack of four chocolate chip cookies',
            'url': 'image/upload/v1725806644/Perfect_Chocolate_Chip_Cookies_1_l0py24.jpg',
            'placeHolderSrc': ''
        },

        {
            id: 2,
            'title': 'A lady celebrating her birthday, holding a cake',
            'url': 'image/upload/v1725649749/Photo_from_catabong89_4_iti3sx.png',
            'placeHolderSrc': ''
        },

        {
            id: 3,
            'title': 'Pink birthday cake with a chocalate glaze and sprinkles',
            'url': 'image/upload/v1725649749/Photo_from_catabong89_6_ficlzm.jpg',
            'placeHolderSrc': ''
        },

        {
            id: 4,
            'title': 'Boy holding up a blue cake with happy smile',
            'url': 'image/upload/v1725649747/Happy_Boy_cpbmof.jpg',
            'placeHolderSrc': ''
        }
    ],

    [
        {
            id: 1,
            'title': 'Three women on a picnic taking a bit of cupcake',
            'url': 'image/upload/v1725649749/images_d18mol.png',
            'placeHolderSrc': ''
        },

        {
            id: 2,
            'title': 'red velvet cupcake with heart shaped sprinkles',
            'url': 'image/upload/v1725806644/One_Bowl_Red_Velvet_Cupcakes_-_Baker_by_Nature_1_zae53r.jpg',
            'placeHolderSrc': ''
        },

        {
            id: 3,
            'title': 'Young girl in a graduation gown holding up a cake',
            'url': 'image/upload/v1725649749/Photo_from_catabong89_3_meftq7.png',
            'placeHolderSrc': ''
        },

        {
            id: 4,
            'title': 'white butter cream cake decorated with chocolate waifers, chocolate coins, sprinkles, and cookies ',
            'url': 'image/upload/v1725649749/Photo_from_catabong89_7_clggki.jpg',
            'placeHolderSrc': ''
        }
    ]
]


const comments = [
    {
        id: 1,
        url: 'image/upload/v1721588092/m9wm87ls7vlny8xjen0a.jpg',
        desc: 'Chocolate cake with a slice missing',
        comment: 'This chocolate cake was a dream come true! So soft and fluffy,\
                    with just the right amount of sweetness. It melted in my mouth\
                    and left me wanting more. Perfect for any celebration!',
        user: 'Kayode Olamide'           
    },

    {
        id: 2,
        url: 'image/upload/v1718280224/nbc5nkakoowsw0fryc8g.webp',
        desc: 'bowl of puff puffs',
        comment: 'Absolutely loved the puff puff! It was soft, perfectly\
                    sweet, and had that classic fluffy texture. A delicious\
                     treat that’s hard to stop eating!',
        user: 'Elizabeth Kamsi'
    },

    {
        id: 3,
        url: 'image/upload/v1718324773/d5m29jtmwwyoa9tnnaqp.jpg',
        desc: 'two meat pies with one cut in half',
        comment: "Just had the meat pie, and it was amazing!\
                The crust was perfectly flaky,\and the filling was\
                flavorful and savory. Will definitely be ordering again!",
        user: 'Nina Oxford'
    }
]


const collectionPlaceHolder = [
   
     {
        name:'',
        description: '',
        image: '',
        alt: '',
        collection: ''
    }
]



export { 
        get, 
        post, 
        getCookie, 
        routeProtection,
        backgroundImages,
        placeHolder,
        imageCollage,
        comments,
        collectionPlaceHolder
     }

