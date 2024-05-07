import React from "react";
import { useParams, Link } from "react-router-dom"
import { getContactDetail, replyContact } from "../../services/Api";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ReplyContact = () => {
    const { id } = useParams();
    const [contact, setContact] = React.useState({})
    const [message, setMessage] = React.useState("");
    const [inputs, setInputs] = React.useState({})

    React.useEffect(() => {
        getContactDetail(id, {}).then(({ data }) => {
            setContact(data.data)
        })
    }, [id])
    const onChangInput = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const handleClickSend = (e) => {
        e.preventDefault();
        if (inputs.title && inputs.message) {

            replyContact(id, {
                status:true,
                ...inputs
            }, {}).then(() => {
                setInputs({})
                setMessage(<div className="alert alert-success">Gửi thành công !</div>)
            })
        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ thông tin !</div>)
        }
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/contacts">Quản lý liên hệ</Link></li>
                        <li className="active">Phản hồi liên hệ</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Phản hồi</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">

                                <div className="col-md-8" style={{}}>
                                    {message}
                                    <form role="form" method="post">
                                        <div className="form-group">
                                            <label>Người nhận</label>
                                            <input value={contact?.email} disabled className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Tiêu đề</label>
                                            <input name="title" onChange={onChangInput} value={inputs.title || ""} type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nội dung</label>
                                            <CKEditor
                                            editor={ClassicEditor}
                                            data={inputs.message || ""}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            onChange={(event, editor) => {
                                                setMessage("")
                                                setInputs({ ...inputs, message: editor.getData() })
                                            }}
                                        />
                                        </div>
                                        <button name="sbm" onClick={handleClickSend} type="submit" className="btn btn-success">Gửi</button>
                                        <button onClick={(e) => { e.preventDefault(); setInputs({}) }} className="btn btn-default">Làm mới</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>
                {/* /.row */}
            </div>
        </>
    )
}
export default ReplyContact
