import {useState,useEffect} from 'react'
import axios from 'axios'
function ProductsAPI() {
    const [products,setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    useEffect(() => {
        const getProducts = async () => {
            console.log(category)
            const res = await axios.get(`/api/products?${category}&${sort}&title[regex]=${search}`)
            
            setProducts(res.data.products)
        }

        getProducts()
        
    },[callback,sort,category,search])
    return {
        products: [products,setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        sort: [sort, setSort],
    }
}
export default ProductsAPI