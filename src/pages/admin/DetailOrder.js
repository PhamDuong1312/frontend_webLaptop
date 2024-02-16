import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { editOrder, getDetailOrder } from "../../services/Api"
import { VND, getImageProduct, renderId } from "../../ultils"
import moment from "moment"
const DetailOrder = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = React.useState({})
    React.useEffect(() => {
        getDetailOrder(id, {}).then(({ data }) => {
            setOrder(data)
        })
    }, [id])
    const handleClickShip = () => {
        editOrder(id, {
            status: 'shipping',
        }, {}).then(() => {
            navigate("/orders")
        })
    }
    const handleClickDone = () => {
        editOrder(id, {
            status: 'done',
        }, {}).then(() => {
            navigate("/orders")
        })
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/orders">Quản lý đơn hàng</Link></li>
                        <li className="active">chi tiết đơn hàng</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Mã đơn hàng:{order._id == null ? "" : renderId(order._id)}</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-7 huhu" style={{}}>
                                    <div>
                                        <p style={{ textAlign: "right" }}>Thời gian đặt : {moment(order.dateOrder).format("L")}</p>
                                    </div>
                                    <div style={{
                                        border: "1px solid #ccc",
                                        borderRadius: 10, padding: "0 10px"
                                    }} className="infor_order">
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Tên khách hàng
                                            </p>
                                            <span style={{}}>{order?.fullname}</span>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Địa chỉ</p>
                                            <span style={{}}>{order?.address}</span>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Số điện thoại</p>
                                            <span style={{}}>{order?.phone}</span>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Email</p>
                                            <span style={{}}>{order?.email}</span>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #ccc" }}>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Ghi chú</p>
                                            <span style={{}}>{order?.notes}</span>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, display: "inline-block", padding: "20px 0", width: 140 }}>Phương thức</p>
                                            <span style={{}}>{order.pay === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán chuyển khoản VNPAY"}</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        {order.status === "done" && <><button disabled type="button" className="btn btn-info">Giao hàng</button>
                                            <button disabled style={{ marginLeft: 10 }} type="button" className="btn btn-success">Hoàn thành</button></>}
                                        {order.status === "pending" && <><button onClick={handleClickShip} type="button" className="btn btn-info">Giao hàng</button>
                                            <button disabled style={{ marginLeft: 10 }} type="button" className="btn btn-success">Hoàn thành</button></>}
                                        {order.status === "shipping" && <><button type="button" disabled className="btn btn-info">Giao hàng</button>
                                            <button onClick={handleClickDone} style={{ marginLeft: 10 }} type="button" className="btn btn-success">Hoàn thành</button></>}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="borderTopRps"><p>Sản phẩm</p></div>
                                    <div style={{ borderBottom: "1px solid #ccc" }}>
                                        {order?.items?.map((item) => {
                                            const giaGiam = item.product.price - item.product.price * item.product.giamGia / 100
                                            return (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                                        <img style={{ width: 30 }} alt="anh" src={getImageProduct(item.product.image)} />
                                                        <p style={{ margin: 0, padding: "0 8px" }}>{item.product.name} <span style={{ marginLeft: 3 }}>x<b>{item.quantity}</b></span></p>
                                                    </div>
                                                    {item.product.giamGia ?
                                                        <div>
                                                            <p style={{ margin: 0, textDecoration: "line-through" }}>{VND.format(item.product.price)}</p>
                                                            <p style={{ margin: 0, color: "red" }}>{VND.format(giaGiam)}</p>
                                                        </div>
                                                        :
                                                        <p style={{ margin: 0 }}>{VND.format(item.product.price)}</p>
                                                    }
                                                </div>

                                            )
                                        })}

                                    </div>
                                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                                        <p style={{ margin: 0, padding: "10px 0" }}>Giảm giá</p>
                                        <p style={{ margin: 0, padding: "10px 0" }}>0đ</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", borderBottom: '1px solid #ccc' }}>
                                        <p style={{ margin: 0, padding: "10px 0" }}>Phí vận chuyển </p>
                                        <p style={{ margin: 0, padding: "10px 0" }}>Miễn phí</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                                        <p style={{ margin: 0, padding: "10px 0", fontSize: 16 }}>Tổng tiền</p>
                                        <p style={{ margin: 0, padding: "10px 0", fontSize: 16 }}><b>{VND.format(order.totalPrice)}</b></p>
                                    </div>
                                    <div className="statusRps" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                        <p style={{ margin: 0, }}>Tình trạng đơn:</p>
                                        <p style={{ margin: 0, fontSize: 16 }}>
                                            <b>{order.status === "pending" ? "Chờ xử lí" : order.status === "shipping" ? "Đang giao hàng" : "Giao thành công"}
                                            </b>
                                        </p>
                                    </div>

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

export default DetailOrder