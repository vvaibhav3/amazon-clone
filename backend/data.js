import bcrypt from 'bcryptjs';
const data={
    users:[
        {
            name:"vvaibhav3",
            email:"vaibhav@gmail.com",
            password: bcrypt.hashSync("vaibhav",8),
            isAdmin:true
        },
        {
            name:"vikram",
            email:"vikram@gmail.com",
            password: bcrypt.hashSync("vikram",8),
            isAdmin:false
        }
    ],
    products:[
        {
            name:'Nike slim shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:100,
            brand:'Nike',
            rating:4.5,
            numReviews:20,
            description:"high quality product",
            countInStock:10
        },
        {
            name:'Gucci fit shirt',
            category:'Shirts',
            image:'/images/p2.jpg',
            price:120,
            brand:'Gucci',
            rating:5,
            numReviews:10,
            description:"high quality product",
            countInStock:5
        },
        {
            name:'Luis slim shirt',
            category:'Shirts',
            image:'/images/p3.jpg',
            price:110,
            brand:'Luis',
            rating:4,
            numReviews:10,
            description:"high quality product",
            countInStock:7
        },
        {
            name:'Denim classic pant',
            category:'Pants',
            image:'/images/p4.jpg',
            price:200,
            brand:'Denim',
            rating:5,
            numReviews:12,
            description:"high quality product",
            countInStock:8
        },
        {
            name:'Gucci classic pant',
            category:'Pants',
            image:'/images/p5.jpg',
            price:220,
            brand:'Gucci',
            rating:4.7,
            numReviews:10,
            description:"high quality product",
            countInStock:9
        },
        {
            name:'Nike slim pant',
            category:'Pants',
            image:'/images/p6.jpg',
            price:150,
            brand:'Nike',
            rating:4,
            numReviews:17,
            description:"high quality product",
            countInStock:12
        }
    ]
};

export default data;