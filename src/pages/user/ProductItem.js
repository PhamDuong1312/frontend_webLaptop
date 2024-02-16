import { Link,useNavigate } from "react-router-dom"
import { VND, getImageProduct } from "../../ultils"
import React from "react"
import { useSelector } from "react-redux"
import { createCart } from "../../services/Api"

const ProductItem = ({ item }) => {
    const navigate=useNavigate();
    const user = useSelector(({ Auth }) => Auth.user)


    const handleClickBuyNow=(e,id)=>{
        e.preventDefault();
        if(user._id){
            
            createCart({
                user: user._id,
                product:id,
                quantity:1
            },{}).then(()=>{
                navigate("/cart")
            })
        }else{
            navigate("/login")
        }
    }

    return (<>
        <div className="col-lg-3 col-md-4 col-sm-6 mt-40">
            {/* single-product-wrap start */}
            <div className="single-product-wrap">
                <div className="product-image">
                    <Link to={`/product/${item._id}`}>
                        <img src={getImageProduct(item.image)} alt="Li's Product Image" />
                    </Link>
                    {item.noiBat ? <span style={{background:"red"}} className="sticker">Hot</span> : <span className="sticker">New</span>}

                </div>
                <div className="product_desc">
                    <div className="product_desc_info">
                        <div className="product-review">
                            <h5 className="manufacturer">
                                <Link to={`/product/${item._id}`}>Graphic Corner</Link>
                            </h5>
                            <div className="rating-box">
                                <ul className="rating">
                                    <li><i className="fa fa-star-o" /></li>
                                    <li><i className="fa fa-star-o" /></li>
                                    <li><i className="fa fa-star-o" /></li>
                                    <li className="no-star"><i className="fa fa-star-o" /></li>
                                    <li className="no-star"><i className="fa fa-star-o" /></li>
                                </ul>
                            </div>
                        </div>
                        <h4><Link className="product_name" to={`/product/${item._id}`}>{item.name}</Link></h4>
                        {item.giamGia ?
                            <div className="price-box">
                                <span className="new-price new-price-2">{VND.format(item.price-(item.price*item.giamGia)/100)}</span>
                                <span className="old-price">{VND.format(item.price)}</span>
                                <span className="discount-percentage">-{item.giamGia}%</span>
                            </div>
                            :
                            <div className="price-box">
                                <span className="new-price">{VND.format(item.price)}</span>
                            </div>
                        }


                    </div>
                    <div className="add-actions">
                        <ul className="add-actions-link">
                            <li className="add-cart active"><a onClick={(e)=>handleClickBuyNow(e,item._id)} href="shopping-cart.html">Mua Ngay</a></li>
                            <li><Link to={`/product/${item._id}`} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></Link></li>
                            <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* single-product-wrap end */}
        </div>
    </>)
}
export default ProductItem