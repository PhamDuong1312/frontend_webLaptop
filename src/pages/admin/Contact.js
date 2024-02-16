import { Link, useSearchParams,useNavigate } from "react-router-dom";
import React from "react"
import { deleteContact, deleteManyContact, getContacts } from "../../services/Api";
import Pagination from "../../shared/components/layout/Panigation";
const Contact = () => {
    const [contacts, setContacts] = React.useState([])
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const keyword = searchParams.get('keyword')
    const [search, setSearch] = React.useState()
    const filter = searchParams.get('filter')
    const page = searchParams.get('page') || 1;
    const limit = 9;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)
    const getData = () => {
        getContacts({
            params: {
                page, limit,keyword,filter,
            }
        }).then(({ data }) => {
            setContacts(data.data)
            setPages(data.pages)
            seTotal(data.total)
        })
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmitSearch = () => {
        if(filter){
            navigate(`?keyword=${search}&filter=${filter}`)

        }else{

            navigate(`?keyword=${search}`)
        }

    }
    const handleEnterSearch = (e) => {
        if (e.which == 13) {
            handleSubmitSearch()
            document.getElementById("search_input").blur()
        }
    }
    const onChangFilter=(e)=>{
        if(keyword){
            navigate(`?keyword=${search}&filter=${e.target.value}`)

        }else{

            navigate(`?filter=${e.target.value}`)
        }
    }

    React.useEffect(() => {
        toggleBtnAction()
        getData();
    }, [page,keyword,filter])
    const handleClickDel=(e,id)=>{
        e.preventDefault();
        const isConfirm=window.confirm("Bạn có chắc chắn muốn xóa?");
        if(isConfirm){
            deleteContact(id,{}).then(()=>{
                getData();
            })
        }
    }
    const handleChangeCheckAll = (e) => {
        const isCheck = e.target.checked;
        document.querySelectorAll(".checkitem").forEach((item) => {
            item.checked = isCheck;
        })
        toggleBtnAction()
    }
    const handleChangeItem = (e) => {
        const isCheck = document.querySelectorAll(".checkitem").length == document.querySelectorAll(".checkitem:checked").length
        document.getElementById("checkall").checked = isCheck
        toggleBtnAction()
    }
    const handleClickAction = () => {
        const items = []
        const action = document.getElementById("selectaction").value
        document.querySelectorAll(".checkitem:checked").forEach((item) => {
            items.push(item.value)
        })
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteManyContact({
                items, action
            }, {}).then(() => {
                getData()
                toggleBtnAction()
            })
        }


    }
    const toggleBtnAction = () => {
        let isCheck = true;
        if (document.querySelectorAll(".checkitem:checked").length && document.getElementById("selectaction").value) {
            isCheck = false
        }
        document.getElementById("action").disabled = isCheck

    }

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li className="active">Danh sách liên hệ</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách liên hệ</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="bootstrap-table"><div className="fixed-table-toolbar"><div className="bars pull-left"><div id="toolbar" className="btn-group">
                                    {/* <Link to="/products/create" className="btn btn-success">
                                        <i className="glyphicon glyphicon-plus" /> Thêm sản phẩm
                                    </Link> */}
                                </div></div>
                                <div className="tuychon">
                                        <div className="handles" >
                                            <label style={{ margin: 0, cursor: "pointer" }} for="checkall">Tất cả</label>
                                            <input style={{ margin: "0 10px" }} onChange={handleChangeCheckAll} type="checkbox" className="checkall" id="checkall" />
                                            <select onChange={toggleBtnAction} id="selectaction" name="action">
                                                <option value="">--Chọn hành động--</option>
                                                <option value="delete">Xóa</option>
                                            </select>
                                            <button style={{ marginLeft: 10 }} id="action" className="btn btn-primary" onClick={handleClickAction}>Thực hiện</button>
                                        </div>
                                        <div className="search">
                                            <input type="text" id="search_input" onKeyDown={handleEnterSearch} className="form-control" placeholder="Search" onChange={handleChangeSearch} />
                                            <button className="btn btn-primary" onClick={handleSubmitSearch}>Tìm</button>
                                        </div>
                                        <div className="filter">
                                            Lọc :
                                            <select onChange={onChangFilter} name="filter">
                                                <option value="">Tất cả</option>
                                                <option value="admin">Đã phản hồi</option>
                                                <option value="member">Chưa phản hồi</option>

                                            </select>

                                        </div>
                                    </div>
                                </div><div className="fixed-table-container"><div className="fixed-table-header"><table /></div><div className="fixed-table-body"><div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div><table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                    <thead>
                                        <tr>
                                        <th style={{}}><div className="th-inner sortable">#</div><div className="fht-cell" /></th>

                                            <th style={{}}><div className="th-inner sortable">STT</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">Họ tên</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Email</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Tiêu đề</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Trạng thái</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Hành động</div><div className="fht-cell" /></th></tr>
                                    </thead>
                                    <tbody>

                                        {contacts.map((item, index) => {
                                            return (
                                                <tr data-index={index}>
                                                            <td><input type="checkbox" onChange={handleChangeItem} value={item._id} name="items[]" className="checkitem" /></td>
                                                    
                                                    <td >{index + 1}</td>
                                                    <td >{item.fullname}</td>
                                                    <td >{item.email}</td>
                                                    <td >{item.title}
                                                    </td>
                                                    <td >
                                                        {item.status ? <span className="label label-success">Đã phản hồi</span> :
                                                            <span className="label label-danger">Chưa phản hồi</span>}
                                                    </td>
                                                    <td className="form-group" >
                                                        <Link to={`/contacts/${item._id}`} className="btn btn-info"><i className="glyphicon glyphicon-eye-open" /></Link>
                                                        {!item.status &&<Link to={`/contacts/reply/${item._id}`} className="btn btn-warning">Phản hồi</Link>}
                                                        <a href="/" onClick={(e)=>{handleClickDel(e,item._id)}} className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>

                                                    </td>
                                                </tr>
                                            )
                                        })}



                                    </tbody>
                                </table></div><div className="fixed-table-pagination" /></div></div><div className="clearfix" />
                            </div>
                            <Pagination pages={{ ...pages, total }} />
                        </div>
                    </div>
                </div>{/*/.row*/}
            </div>

        </>
    )
}
export default Contact;
