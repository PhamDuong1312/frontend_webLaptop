import { useParams, Link, useNavigate } from "react-router-dom"
import React from "react"
import { editUser, getUser } from "../../services/Api";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [user, setUser] = React.useState({});
    const [message, setMessage] = React.useState("");

    const [inputs, setInputs] = React.useState({});


    React.useEffect(() => {
        getUser(id, {})
            .then(({ data }) => {
                setUser(data.data)
                setInputs({
                    email: data.data.email,
                    fullName: data.data.fullName,
                    isAdmin: data.data.isAdmin,
                    password: data.data.password,
                    rePassword: data.data.password
                })
            })

    }, [id])

    const onChangeInput = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }


    const handleSubmitEdit = (e) => {
        if (inputs.email && inputs.password && inputs.rePassword && inputs.fullName) {
            e.preventDefault();
            if (inputs.password === inputs.rePassword) {
                const newData = { ...inputs }
                delete newData.rePassword;
                editUser(id, newData, {}).then(({ data }) => {
                    navigate("/users")
                })

            } else {
                setMessage(<div className="alert alert-danger">Mật khẩu nhập lại phải trùng nhau!</div>);
            }
        }
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/users">Quản lý thành viên</Link></li>
                        <li className="active">{user.fullName}</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thành viên: {user.fullName}</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {message}
                                    <form role="form" method="post">
                                        <div className="form-group">
                                            <label>Họ &amp; Tên</label>
                                            <input type="text" onChange={onChangeInput} name="fullName" required value={inputs.fullName} className="form-control" defaultValue="Nguyễn Văn A" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" onChange={onChangeInput} name="email" required value={inputs.email} defaultValue="nguyenvana@gmail.com" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <input type="text" onChange={onChangeInput} name="password" required value={inputs.password} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nhập lại mật khẩu</label>
                                            <input type="text" onChange={onChangeInput} name="rePassword" required value={inputs.rePassword} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Quyền</label>
                                            <select onChange={onChangeInput} name="isAdmin" className="form-control">
                                                {inputs.isAdmin?
                                                <>
                                                
                                                <option value={1}>Admin</option>
                                                <option value={0} >Member</option>
                                                </>:<>
                                                
                                                <option value={0} >Member</option>
                                                <option value={1}>Admin</option>
                                                </>}
                                                
                                            </select>
                                        </div>
                                        <button type="submit" onClick={handleSubmitEdit} name="sbm" className="btn btn-primary">Cập nhật</button>
                                        <button type="reset" className="btn btn-default">Làm mới</button>
                                    </form></div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>{/* /.row */}
            </div>


        </>
    )
}

export default EditUser