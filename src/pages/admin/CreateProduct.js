import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { createProduct, getAllCategories } from "../../services/Api"
import { checkFileImage } from "../../ultils"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategory] = React.useState([])
    const [inputs, setInputs] = React.useState({})
    const [image, setImage] = React.useState()
    const [message, setMessage] = React.useState("")



    const onChangeInputs = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const onChangeFile = (e) => {
        setMessage("")
        const file = e.target.files[0]
        document.getElementById("loadImg").src = URL.createObjectURL(file)
        if (checkFileImage(file.name)) {

            setImage(file)
        } else {
            setMessage(<div className="alert alert-danger">File ảnh không đúng định dạng !</div>)

        }

    }


    const handleCreateProduct = () => {
        if (inputs.name && inputs.price && inputs.quantity && image && inputs.baoHanh && inputs.description && inputs.phuKien && inputs.tinhTrang) {
            const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            formData.append("image", image)

            createProduct(formData, {})
                .then(({ data }) => {
                    if (data.success) {
                        navigate("/products")
                    }
                })

        } else {

            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ dữ liệu !</div>)
        }
    }
    const onChangeCheckbox = (e) => {
        if (e.target.checked) {
            setInputs({ ...inputs, [e.target.name]: true })
        } else {
            setInputs({ ...inputs, [e.target.name]: false })
        }
    }

    React.useEffect(() => {
        getAllCategories({
            params: {
                limit: 1000
            }
        }).then(({ data }) => {
            setCategory(data.data)
            setInputs({ ...inputs, categoryId: data.data[0]._id })
        })
    }, [])
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/products">Quản lý sản phẩm</Link></li>
                        <li className="active">Thêm sản phẩm</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm sản phẩm</h1>
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
                                            <input required value={inputs.name || ""} onChange={onChangeInputs} name="name" className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input required value={inputs.price || ""} onChange={onChangeInputs} name="price" type="number" min={0} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Bảo hành</label>
                                            <input required value={inputs.baoHanh || ""} onChange={onChangeInputs} name="baoHanh" type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phụ kiện</label>
                                            <input required value={inputs.phuKien || ""} onChange={onChangeInputs} name="phuKien" type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Giảm giá ( % )</label>
                                            <input value={inputs.giamGia || ""} min={0} max={100} onChange={onChangeInputs} name="giamGia" type="number" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Tình trạng</label>
                                            <input required value={inputs.tinhTrang || ""} onChange={onChangeInputs} name="tinhTrang" type="text" className="form-control" />
                                        </div>
                                    </form></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ảnh sản phẩm</label>
                                        <input required onChange={onChangeFile} name="image" type="file" />
                                        <br />
                                        <div>
                                            <img style={{ width: "400px" }} id="loadImg" src="img/download.jpeg" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <select onChange={onChangeInputs} name="categoryId" className="form-control">
                                            {categories.map((item) => {
                                                return (

                                                    <option value={item._id}>{item.name}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input value={inputs.quantity || ""} min={0} max={100} onChange={onChangeInputs} name="quantity" type="number" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Sản phẩm nổi bật</label>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} name="noiBat" type="checkbox" value={1} />Nổi bật
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả sản phẩm</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={inputs.description || ""}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            onChange={(event, editor) => {
                                                setMessage("")
                                                setInputs({ ...inputs, description: editor.getData() })
                                            }}
                                        />
                                    </div>
                                    <button name="sbm" onClick={handleCreateProduct} type="submit" className="btn btn-success">Thêm mới</button>
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

export default CreateProduct