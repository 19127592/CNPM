import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])
    
    
    const [search, setSearch] = useState('')
    

    useEffect(() =>{
        const getProducts = async () => {
            
            const res = await axios.get(`/api/products`)
            console.log(res)
            setProducts(res.data.products)

        }
        getProducts()
    },[ search])
    
    return {
        products: [products, setProducts],
        
        search: [search, setSearch],
        
    }
}

export default ProductsAPI