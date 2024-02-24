import { Link, useSearchParams,useNavigate } from "react-router-dom"
import React from "react"
import { getAllProducts } from "../../../services/Api";
import ProductItem from "../ProductItem";
import Panigation from "../Panigation";


const AllProduct = () => {
    const navigate=useNavigate()
    const [products, setProducts] = React.useState([])
    const [searchParams] = useSearchParams();
    const field = searchParams.get('field') || "name";
    const type = searchParams.get('type') || "desc";

    const page = searchParams.get('page') || 1;
    const limit = 8;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const getData = () => {
        getAllProducts({
            params: {
                limit,
                page,field,type,
            }
        }).then(({ data }) => {
            setProducts(data.data)
            seTotal(data.total)
            setPages(data.pages)
        })
    }
    React.useEffect(() => {
        getData();
    }, [page,field,type])
    const handleChangeSort=(e)=>{
        const {value} = e.target;
        const [field,type] = value.split("-")
        navigate(`?page=${page}&field=${field}&type=${type}`)
    }

    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Sản phẩm </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-banner shop-page-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/638378857537132015_F-C1_1200x300.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>

                            <div className="shop-top-bar mt-30">
                                <div className="shop-bar-inner">
                                    
                                    <div className="toolbar-amount">
                                        <h4>Tất cả sản phẩm</h4>
                                    </div>
                                </div>
                                {/* product-select-box start */}
                                <div className="product-select-box">
                                    <div style={{alignItems:"center"}} className="product-short">
                                        <p style={{width:140}}>Sắp xếp theo:</p>
                                        <select name="sort" onChange={handleChangeSort} style={{display:"block!important"}} className="nice-select-me">
                                            <option value="name-desc">Mặc định</option>
                                            <option value="name-asc">Tên (Z - A)</option>
                                            <option value="name-desc">Tên (A - Z)</option>
                                            <option value="price-asc">Giá (Thấp &gt; Cao)</option>
                                            <option value="price-desc">Giá (Cao &gt; Thấp)</option>
                                        </select>
                                    </div>
                                </div>
                                {/* product-select-box end */}
                            </div>

                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {products.map((item) => (<ProductItem item={item} />))}
                                            </div>
                                        </div>
                                    </div>

                                    <Panigation pages={{ ...pages, total }} />
                                </div>
                            </div>
                            {/* shop-products-wrapper end */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllProduct