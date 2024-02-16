import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { editProduct, getAllCategories, getProduct } from "../../services/Api";
import { checkFileImage, getImageProduct } from "../../ultils";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategory] = React.useState([])

    const [message, setMessage] = React.useState("")
    const [product, setProduct] = React.useState({})
    const [inputs, setInputs] = React.useState({})
    const [image, setImage] = React.useState()

    React.useEffect(() => {
        getProduct(id, {}).then(({ data }) => {
            setProduct(data.data)
            setImage(data.data.image)
            setInputs({
                name: data.data.name,
                price: data.data.price,
                phuKien: data.data.phuKien,
                noiBat: data.data.noiBat,
                tinhTrang: data.data.tinhTrang,
                categoryId: data.data.categoryId._id,
                giamGia: data.data.giamGia,
                status: data.data.status,
                description: data.data.description,
                baoHanh: data.data.baoHanh

            })
        })
        getAllCategories({
            params: {
                limit: 1000
            }
        }).then(({ data }) => {
            setCategory(data.data)
        })
    }, [id])

    const handleUpdateProduct = () => {
        if (inputs.name && inputs.price && image && inputs.baoHanh && inputs.description && inputs.phuKien && inputs.tinhTrang) {
            const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            formData.append("image", image)

            editProduct(id, formData, {})
                .then(() => {
                    navigate("/products")
                })

        } else {

            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ dữ liệu !</div>)
        }
    }

    const onChangInput = (e) => {
        setMessage("")

        const { value, name } = e.target

        setInputs({ ...inputs, [name]: value })


    }
    console.log(image, 88)
    console.log(inputs, 99)
    const onChangeCheckbox = (e) => {
        if (e.target.checked) {
            setInputs({ ...inputs, [e.target.name]: true })
        } else {
            setInputs({ ...inputs, [e.target.name]: false })
        }
    }

    const onChangeFile = (e) => {
        setMessage("")
        const file = e.target.files[0]
        document.getElementById("loadImg").src = URL.createObjectURL(file)
        if (checkFileImage(file.name)) {
            setImage(file)
        } else {
            setImage()
            setMessage(<div className="alert alert-danger">File ảnh không đúng định dạng !</div>)

        }

    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/products">Quản lý sản phẩm</Link></li>
                        <li className="active">{product.name}</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Sản phẩm: {product.name}</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-6">
                                    {message}
                                    <form role="form" method="post" encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input type="text" name="name" required onChange={onChangInput} value={inputs.name || ""} className="form-control" defaultValue="Sản phẩm số 1" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input type="number" name="price" required onChange={onChangInput} value={inputs.price || ""} defaultValue={18500000} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Bảo hành</label>
                                            <input type="text" name="baoHanh" required onChange={onChangInput} value={inputs.baoHanh || ""} defaultValue="12 tháng" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phụ kiện</label>
                                            <input type="text" name="phuKien" required onChange={onChangInput} value={inputs.phuKien || ""} defaultValue="Xạc, Tai nghe..." className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Giảm giá ( % )</label>
                                            <input type="number" min="0" max="100" name="giamGia" required onChange={onChangInput} value={inputs.giamGia || ""} defaultValue="Xạc dự phòng" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Tình trạng</label>
                                            <input type="text" name="tinhTrang" required onChange={onChangInput} value={inputs.tinhTrang || ""} defaultValue="Like new 99%" className="form-control" />
                                        </div>
                                    </form></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ảnh sản phẩm</label>
                                        <input type="file" name="image" required onChange={onChangeFile} />
                                        <br />
                                        <div>
                                            <img id="loadImg" src={getImageProduct(product.image)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <select onChange={onChangInput} name="categoryId" className="form-control">
                                            {categories?.map((item) => {
                                                return (
                                                    item._id === product.categoryId._id ?
                                                        <option selected value={item._id}>{item.name}</option> :
                                                        <option value={item?._id}>{item.name}</option>

                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select name="status" onChange={onChangInput} className="form-control">
                                            <option value={1}>Còn hàng</option>
                                            <option selected={!inputs.status} value={0}>Hết hàng</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Sản phẩm nổi bật</label>
                                        <div className="checkbox">
                                            <label>
                                                <input name="noiBat" checked={inputs.noiBat} onChange={onChangeCheckbox} type="checkbox" />Nổi bật
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả sản phẩm</label>
                                        <textarea name="description" required onChange={onChangInput} value={inputs.description || ""} className="form-control" rows={3} defaultValue={""} />
                                    </div>
                                    <button type="submit" onClick={handleUpdateProduct} name="sbm" className="btn btn-primary">Cập nhật</button>
                                    <button type="reset" onClick={() => setInputs({})} className="btn btn-default">Làm mới</button>
                                </div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>{/* /.row */}
            </div>	{/*/.main*/}


        </>
    )
}

export default EditProduct