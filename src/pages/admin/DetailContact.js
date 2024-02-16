import { Link, useParams, useNavigate } from "react-router-dom"
import { deleteContact, getContactDetail } from "../../services/Api";
import React from "react";
import moment from "moment";

const DetailContact = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [contact, setContact] = React.useState({})

    React.useEffect(() => {
        getContactDetail(id, {}).then(({ data }) => {
            setContact(data.data)
        })
    }, [id])
    const handleClickDel = (e) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteContact(id, {}).then(() => {
                navigate("/contacts")
            })
        }
    }

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/contacts">Quản lý liên hệ</Link></li>
                        <li className="active">chi tiết liên hệ</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thông tin liên hệ</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-6" style={{}}>
                                    <p>Thời gian gửi: {moment(contact.createdAt).format('LT')} {moment(contact.createdAt).format('L')}</p>

                                    <div style={{
                                        border: "1px solid #ccc",
                                        borderRadius: 10, padding: "0 10px"
                                    }} className="infor_order">
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 80 }}>Họ tên
                                            </p>
                                            <span style={{}}>{contact?.fullname}</span>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 80 }}>Email</p>
                                            <span style={{}}>{contact?.email}</span>
                                        </div>
                                        <div style={{}}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 80 }}>Tiêu đề</p>
                                            <span style={{}}>{contact?.title}</span>
                                        </div>


                                    </div>

                                </div>
                                <div className="col-md-6" style={{}}>
                                    <p className="borderTopRps">Nội dung</p>
                                    <textarea disabled value={contact.message} style={{ width: "100%", borderRadius: 10, padding: "4px 0 0 10px" }} rows={9} />
                                    {contact.status ?
                                        <a style={{ marginTop: 10 }} onClick={(e)=>{e.preventDefault();}} disabled href="" className="btn btn-warning">Phản hồi</a>
                                        :
                                        <Link style={{ marginTop: 10 }} to={`/contacts/reply/${id}`} className="btn btn-warning">Phản hồi</Link>
                                    }
                                    <a style={{ marginLeft: 10, marginTop: 10 }} onClick={handleClickDel} href="/" className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>
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

export default DetailContact