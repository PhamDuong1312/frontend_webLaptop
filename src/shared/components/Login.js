import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { apiLogin } from "../../services/Api"
import { LOGIN_SUCCESS } from "../constants/action-type"



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
                        setMessage(<div className="alert alert-danger">Tài khoản không hợp lệ !</div>)
                    }
                })
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">Vietpro Mobile Shop - Administrator</div>
                        <div className="panel-body">
                            {message}
                            <form role="form" method="post">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" onChange={onChangeInput} placeholder="E-mail" name="email" type="email" autofocus />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" onChange={onChangeInput} placeholder="Mật khẩu" name="password" type="password"  />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" defaultValue="Remember Me" />Nhớ tài khoản
                                        </label>
                                    </div>
                                    <button type="submit"  onClick={onClickLogin} className="btn btn-primary">Đăng nhập</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>{/* /.col*/}
            </div>

        </>
    )
}

export default Login