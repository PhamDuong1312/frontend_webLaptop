import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { checkFileImage, getImageBlog } from "../../ultils";
import { editBlog, getBlogDetail } from "../../services/Api";

const EditBlog = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = React.useState("")
    const [blog, setBlog] = React.useState({})
    const [inputs, setInputs] = React.useState({})
    const [image, setImage] = React.useState()

    React.useEffect(() => {
        getBlogDetail(id, {}).then(({ data }) => {
            setBlog(data.data)
            setImage(data.data.image)
            setInputs({
                title: data.data.title,
                header: data.data.header,
                tags: data.data.tags,
                notes: data.data.notes,
                content: data.data.content,
            })
        })
    }, [id])

    const handleUpdateBlog = () => {
        if (inputs.title && inputs.header && image && inputs.notes && inputs.tags && inputs.content) {
            const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            formData.append("image", image)

            editBlog(id, formData, {})
                .then(() => {
                    navigate("/blogs")
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
                        <li><Link to="/blogs">Quản lý bài viết</Link></li>
                        <li className="active">{blog.title}</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Bài viết: {blog.title}</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                            <div className="col-md-8">
                                    {message}
                                    <form role="form" method="post" encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Tiêu đề bài viết</label>
                                            <input required value={inputs.title || ""} onChange={onChangInput} name="title" className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Mở đầu bài viết</label>
                                            <textarea onChange={onChangInput} required value={inputs.header || ""} name="header" className="form-control" rows={3} defaultValue={""} />
                                        </div>
                                        <div className="form-group">
                                            <label>Thẻ gắn</label>
                                            <input required value={inputs.tags || ""} onChange={onChangInput} name="tags" type="text" className="form-control" />
                                        </div>
                                    </form></div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Ảnh sản phẩm</label>
                                        <input required onChange={onChangeFile} name="image" type="file" />
                                        <br />
                                        <div>
                                            <img style={{ width: "400px" }} id="loadImg" src={getImageBlog(blog.image)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả bài viết</label>
                                        <textarea onChange={onChangInput} required value={inputs.notes || ""} name="notes" className="form-control" rows={3} defaultValue={""} />
                                    </div>
                                    <div className="form-group">
                                        <label>Nội dung bài viết</label>
                                        <textarea onChange={onChangInput} required value={inputs.content || ""} name="content" className="form-control" rows={3} defaultValue={""} />
                                    </div>
                                    <button name="sbm" onClick={handleUpdateBlog} type="submit" className="btn btn-success">Cập nhật</button>
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

export default EditBlog