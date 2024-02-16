import React from "react"
import { Link } from "react-router-dom"
import { checkEmail } from "../../../ultils"
import { createContact } from "../../../services/Api"

const ConTact = () => {
    const [inputs, setInputs] = React.useState({})
    const [message, setMessage] = React.useState("")

    const handleClickSend = (e) => {
        e.preventDefault()
        if (inputs.fullname && inputs.email && inputs.title && inputs.message) {
            if (checkEmail(inputs.email)) {
                createContact(inputs,{}).then(()=>{
                    setMessage(<div className="alert alert-success">Gửi liên hệ thành công !</div>)
                    setInputs({})
                })
            } else {
                setMessage(<div className="alert alert-danger">Email không hợp lệ !</div>)
            }
        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ thông tin !</div>)
        }

    }
    const onChangeInput = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
                            <div className="contact-page-side-content">
                                <h3 className="contact-page-title">Liên hệ</h3>
                                <p className="contact-page-message mb-25">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas human.</p>
                                <div className="single-contact-block">
                                    <h4><i className="fa fa-fax" /> Địa chỉ</h4>
                                    <p>16 Đường Xuân Phương, Minh Khai, Bắc Từ Liêm, Hà Nội.</p>
                                </div>
                                <div className="single-contact-block">
                                    <h4><i className="fa fa-phone" /> Điện thoại</h4>
                                    <p>Điện thoại: (+84) 963 523 033</p>
                                    <p>Hotline: 1009 678 456</p>
                                </div>
                                <div className="single-contact-block last-child">
                                    <h4><i className="fa fa-envelope-o" /> Email</h4>
                                    <p>phamquyduong2k2@gmail.com</p>
                                    <p>support@hastech.company</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 order-2 order-lg-1">
                            <div className="contact-form-content pt-sm-55 pt-xs-55">
                                <h3 className="contact-page-title">Thông tin liên hệ của bạn</h3>
                                <div className="contact-form">
                                    <form id="contact-form" action="http://demo.hasthemes.com/limupa-v3/limupa/mail.php" method="post">
                                        <div className="form-group">
                                            <label>Họ tên <span className="required">*</span></label>
                                            <input onChange={onChangeInput} value={inputs.fullname || ""} type="text" name="fullname" id="customername" required />
                                        </div>
                                        <div className="form-group">
                                            <label> Email <span className="required">*</span></label>
                                            <input onChange={onChangeInput} value={inputs.email || ""} type="email" name="email" id="customerEmail" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Tiêu đề</label>
                                            <input onChange={onChangeInput} value={inputs.title || ""} type="text" name="title" id="contactSubject" />
                                        </div>
                                        <div className="form-group mb-30">
                                            <label>Nội dung</label>
                                            <textarea onChange={onChangeInput} value={inputs.message || ""} name="message" id="contactMessage" defaultValue={""} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" onClick={handleClickSend} value="submit" id="submit" className="li-btn-3" name="submit">send</button>
                                        </div>
                                        {message}
                                    </form>
                                </div>
                                <p className="form-messege" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConTact