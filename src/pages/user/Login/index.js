import { Link,useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import React from "react"
import { LOGIN_SUCCESS } from "../../../shared/constants/action-type"
import { apiLogin } from "../../../services/Api"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [message, setMessage] = React.useState("")

    const [inputs, setInputs] = React.useState({})
    const onChangeInput = (e) => {
        setMessage("")
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    console.log(inputs)
    const onClickLogin = (e) => {
        if (inputs.email && inputs.password) {
            e.preventDefault()
            apiLogin(inputs)
                .then(({ data }) => {
                    if (data.user) {
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: data.user
                        })
                        navigate('/')
                    } else {
                        setMessage(<div className="alert alert-danger">Tài khoản hoặc mật khẩu không chính xác !</div>)
                    }
                })
        }
    }
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Đăng nhập</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="page-section mb-60 mt-40">
                <div className="container">
                    <div className="row">
                        <div style={{margin:"auto"}} className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">
                            {/* Login Form s*/}
                            <form action="#">
                                {message}
                                <div className="login-form">
                                    <h4 className="login-title">Login</h4>
                                    <div className="row">
                                        <div className="col-md-12 col-12 mb-20">
                                            <label>Email Address*</label>
                                            <input className="mb-0" onChange={onChangeInput} name="email" type="text" placeholder="Email Address" required />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>Password</label>
                                            <input className="mb-0" onChange={onChangeInput} name="password" type="password" placeholder="Password" required />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                                <input type="checkbox" id="remember_me" />
                                                <Link to="/forgotpassword">Quên mật khẩu</Link>

                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                                            <Link to="/register"> Đăng kí ngay!</Link>
                                        </div>
                                        <div className="col-md-12">
                                            <button onClick={onClickLogin} className="register-button mt-0">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login