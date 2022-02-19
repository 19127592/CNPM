import { useParams,Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import React,{useContext,useState,useEffect} from 'react'
var initialState = {
    price:{},
    images:{
        url:{}
    }
  };
export default function ProductDetail() {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [ProductDetail,setProductDetail] = useState(initialState)
    const priceWithCommas = (price) => {
        var parts = price.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    }
    const removeAccent = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str.toLowerCase().trim().split(/\s+/).join('-');
    }
    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(removeAccent(product.title) === params.id) {setProductDetail(product)}
            })
        }
    },[params.id,products])

    const personalComputerDetail = () => {
        return (
            <>
                
                <div>CPU: {ProductDetail.CPU}</div>
                <div>Màu: {ProductDetail.Color}</div>
                <div>Chip đồ hoạ: {ProductDetail.GPU}</div>
                <div>RAM: {ProductDetail.RAM}</div>
                <div>Màn hình: {ProductDetail.Screen}</div>
                <div>Lưu trữ: {ProductDetail.DataStorage}</div>
                <div>Cổng kết nối: {ProductDetail.ConnectionType}</div>
                <div>Chất liệu: {ProductDetail.Material}</div>
                <div>Khối lượng: {ProductDetail.Weight}</div>
            </>
        )
    }

    const monitorDetail = () => {
        return (
            <>
                <div>Màn hình: {ProductDetail.Screen}</div>
                <div>Độ phân giải: {ProductDetail.Resolution}</div>
                <div>Tấm nền: {ProductDetail.Panel}</div>
                <div>Tần số quét: {ProductDetail.RefreshRate}</div>
                <div>Thời gian phản hồi: {ProductDetail.Response}</div>
                <div>Công nghệ đồng bộ: {ProductDetail.TechSync}</div>
                <div>Độ sáng: {ProductDetail.Bright}</div>
                <div>Độ tương phản: {ProductDetail.Contrast}</div>
                <div>Khối lượng: {ProductDetail.Weight}</div>
            </>
        )
    }
    const keyboardDetail = () => {
        
        return (
            <>
                <div>Cổng kết nối: {ProductDetail.ConnectionType}</div>
                <div>Màu: {ProductDetail.Color}</div>
                <div>RGB: {confirmRGB()}</div>
                <div>Loại Switch: {ProductDetail.Switch}</div>
                <div>Thời gian phản hồi: {ProductDetail.Response}</div>
            </>
        )
    }

    const headphoneDetail = () => {
        
        return (
            <>
                <div>Loại: {ProductDetail.Type}</div>
                <div>Cổng kết nối: {ProductDetail.ConnectionType}</div>
                <div>Màu: {ProductDetail.Color}</div>
                <div>RGB: {confirmRGB()}</div>
                <div>Thời gian phản hồi: {ProductDetail.RefreshRate}</div>
                <div>Khối lượng: {ProductDetail.Weight}</div>
            </>
        )
    }

    const mouseDetail = () => {
        
        return (
            <>
                <div>Loại: {ProductDetail.Type}</div>
                <div>Cổng kết nối: {ProductDetail.ConnectionType}</div>
                <div>Màu: {ProductDetail.Color}</div>
                <div>RGB: {confirmRGB()}</div>
                <div>DPI: {ProductDetail.DPI}</div>
                <div>Loại Switch: {ProductDetail.Switch}</div>
                <div>Thời gian phản hồi: {ProductDetail.Response}</div>
            </>
        )
    }
    
    const confirmRGB = () => {
        if (ProductDetail.RGB === true){
            console.log("Working")
            return "Có"
        }else return "Không"
    }

    const productDetail = () => {

        if (ProductDetail.category === 'laptop' || ProductDetail.category === 'pc'){
            return personalComputerDetail()
        }else if (ProductDetail.category === 'monitor'){
            return monitorDetail()
        }else if (ProductDetail.category === 'keyboard'){
            return keyboardDetail()
        }else if (ProductDetail.category === 'headphone'){
            return headphoneDetail()
        }else return mouseDetail()

    }
    if (ProductDetail === null) {
        return null;
    } 
    else{
        return (
        
            <div>
                <img src={ProductDetail.images.url} alt="" />
                <div>Tên sản phẩm: {ProductDetail.title}</div>
                <div>Giá: {priceWithCommas(ProductDetail.price)} đ</div>
                <div>Thương hiệu: {ProductDetail.brand}</div>
                <div>Bảo hành: {ProductDetail.maintenance_time} tháng</div>
                {productDetail()}
            </div>
        )
    }
}
