import React,{useContext,useState,useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import { useParams, Link } from 'react-router-dom'
import ProductItem from '../productItem/ProductItem'
export default function ProductDetail() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [ProductDetail,setProductDetail] = useState([])

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setProductDetail(product)
            })
        }
    },[params.id,products])
    
    if(ProductDetail.length === 0) return null 
    
    return (
        <>
        //FE (Thu)
        <div className='detail'>
            <img src={ProductDetail.images.url} alt=''/>
            <div className='box-detail'>
                <div className='row'>
                    <h2>{ProductDetail.title}</h2>
                    <span>#{ProductDetail.product_id}</span>
                </div>
                <span>${ProductDetail.price}</span>
                <p>{ProductDetail.description}</p>
                <p>{ProductDetail.content}</p>
                <p>Sold: {ProductDetail.sold}</p>
                <Link to='/cart' className='cart'>Buy now</Link>
            </div>
        </div>
        <div>
            <h2>Related Products</h2>
            <div className='products'>
                {
                    products.map(product => {
                        return product.category === ProductDetail.category
                        ? <ProductItem key={product._id} product={product}/> : null
                    })
                }
            </div>
        </div>
    </>
    )
}
