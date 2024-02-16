import React from "react"

import { Route, Routes } from "react-router-dom"


import HeaderAdmin from "./header"
import SideBarAdmin from "./sidebar"
import User from "../../../../pages/admin/User"
import Home from "../../../../pages/admin/Home"
import Product from "../../../../pages/admin/Products"
import Category from "../../../../pages/admin/Category"
import CreateProduct from "../../../../pages/admin/CreateProduct"
import EditProduct from "../../../../pages/admin/EditProduct"
import CreateCategory from "../../../../pages/admin/CreateCategory"
import EditCategory from "../../../../pages/admin/EditCategory"
import CreateUser from "../../../../pages/admin/CreateUser"
import EditUser from "../../../../pages/admin/EditUser"
import Comment from "../../../../pages/admin/Comment"
import LinkCss from "./Linkcss"
import Order from "../../../../pages/admin/Order"
import DetailOrder from "../../../../pages/admin/DetailOrder"
import Contact from "../../../../pages/admin/Contact"
import DetailContact from "../../../../pages/admin/DetailContact"
import ReplyContact from "../../../../pages/admin/ReplyContact"
import Blog from "../../../../pages/admin/Blog"
import CreateBlog from "../../../../pages/admin/CreateBlog"
import EditBlog from "../../../../pages/admin/EditBlog"
import CommentBlog from "../../../../pages/admin/CommentBlog"

const Admin = () => {
    const [show, setShow] = React.useState(false)



    React.useEffect(() => {
        
        setTimeout(() => {
            setShow(true)
        }, 400)
        
    }, [])
    return (
        <>
            <LinkCss />
            {show &&
                <div>
                    <HeaderAdmin />
                    <SideBarAdmin />
                    {/*/.sidebar*/}
                    <Routes>
                        <Route path="/users" element={<User />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/comments" element={<Comment />} />
                        <Route path="/commentblog" element={<CommentBlog />} />

                        <Route path="/orders" element={<Order />} />


                        <Route path="/categories" element={<Category />} />
                        <Route path="/products/create" element={<CreateProduct />} />
                        <Route path='/products/edit/:id' element={<EditProduct />} />
                        <Route path='/orders/:id' element={<DetailOrder />} />

                        <Route path='/contacts' element={<Contact />} />
                        <Route path='/contacts/:id' element={<DetailContact />} />
                        <Route path='/contacts/reply/:id' element={<ReplyContact />} />

                        <Route path='/blogs' element={<Blog />} />
                        <Route path='/blogs/create' element={<CreateBlog />} />
                        <Route path='/blogs/edit/:id' element={<EditBlog />} />




                        <Route path="/categories/create" element={<CreateCategory />} />
                        <Route path="/categories/edit/:id" element={<EditCategory />} />
                        <Route path="/users/create" element={<CreateUser />} />
                        <Route path="/users/edit/:id" element={<EditUser />} />

                        <Route path="/" element={<Home />} />

                    </Routes>

                    {/*/.main*/}
                </div>
            }





        </>
    )
}

export default Admin