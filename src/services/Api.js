import Http from "./Http";

export const apiLogin = (data)=>Http.post('/login',data);
export const apiGetCode = (data)=>Http.post('/getcode',data);
export const apiChangePassword = (data)=>Http.put('/changepassword',data);
export const apiChangePasswordNext = (data)=>Http.put('/changepasswordnext',data);



export const getAllProducts = (config)=>Http.get('/products',config);
export const getAllUsers = (config)=>Http.get('/users',config);
export const getAllCategories = (config)=>Http.get('/categories',config);


export const deleteUser = (id,config)=>Http.delete('/users/delete/'+id,config)
export const deleteManyUser = (data,config)=>Http.post('/users/deletemany',data,config)

export const createUser = (data,config)=>Http.post('/users/create',data,config)
export const editUser = (id,data,config)=>Http.put('/users/edit/'+id,data,config)
export const getUser = (id,config)=>Http.get('/users/'+id,config)

export const createCategory = (data,config)=>Http.post('/categories/create',data,config)
export const deleteCategory = (id,config)=>Http.delete('/categories/delete/'+id,config)
export const getCategory = (id,config)=>Http.get('/categories/'+id,config)
export const editCategory = (id,data,config)=>Http.put('/categories/edit/'+id,data,config)
export const deleteManyCategory = (data,config)=>Http.post('/categories/deletemany',data,config)



export const getAllComments = (config)=>Http.get('/comments',config)
export const getCommentsProduct = (id,config)=>Http.get('/comments/product/'+id,config)
export const createComment = (data,config)=>Http.post('/comments/create',data,config)
export const deleteComment = (id,config)=>Http.delete('/comments/delete/'+id,config)
export const deleteManyComment = (data,config)=>Http.post('/comments/deletemany',data,config)


export const createProduct = (data,config)=>Http.post('/products/create',data,config)
export const deleteProduct = (id,config)=>Http.delete('/products/delete/'+id,config)
export const deleteManyProduct = (data,config)=>Http.post('/products/deletemany',data,config)

export const getProduct = (id,config)=>Http.get('/products/'+id,config)
export const editProduct = (id,data,config)=>Http.put('/products/edit/'+id,data,config)

export const getProductHot = (config)=>Http.get('/products/hot',config)
export const getProductByDm = (id,config)=>Http.get('/products/category/'+id,config)


export const createCart = (data,config)=>Http.post('/cart/create',data,config)
export const getCartUser = (id,config)=>Http.get('/cart/'+id,config)
export const deleteProToCart = (id,config)=>Http.delete('/cart/delete/'+id,config)
export const updateCart = (data,config)=>Http.put('/cart/update',data,config)


export const orderApi = (data,config)=>Http.post('/order/create',data,config)

export const getOrderUser = (id,config)=>Http.get('/order/user/'+id,config)
export const getDetailOrder = (id,config)=>Http.get('/order/'+id,config)
export const getOrders = (config)=>Http.get('/order',config)

export const deleteOrder = (id,config)=>Http.delete('/order/delete/'+id,config)
export const editOrder = (id,data,config)=>Http.put('/order/edit/'+id,data,config)

export const getContacts = (config)=>Http.get('/contact',config)
export const createContact = (data,config)=>Http.post('/contact/create',data,config)
export const deleteContact = (id,config)=>Http.delete('/contact/delete/'+id,config)
export const getContactDetail = (id,config)=>Http.get('/contact/'+id,config)
export const deleteManyContact = (data,config)=>Http.post('/contact/deletemany',data,config)
export const replyContact = (id,data,config)=>Http.put('/contact/reply/'+id,data,config)

export const getBlogs = (config)=>Http.get('/blogs',config)
export const createBlog = (data,config)=>Http.post('/blogs/create',data,config)
export const deleteBlog = (id,config)=>Http.delete('/blogs/delete/'+id,config)
export const getBlogDetail = (id,config)=>Http.get('/blogs/'+id,config)
export const deleteManyBlog = (data,config)=>Http.post('/blogs/deletemany',data,config)
export const editBlog = (id,data,config)=>Http.put('/blogs/edit/'+id,data,config)

export const getAllCommentsBlog = (config)=>Http.get('/commentsblog',config)
export const getCommentsBlog = (id,config)=>Http.get('/commentsblog/blog/'+id,config)
export const createCommentBlog = (data,config)=>Http.post('/commentsblog/create',data,config)
export const deleteCommentBlog = (id,config)=>Http.delete('/commentsblog/delete/'+id,config)
export const deleteManyCommentBlog = (data,config)=>Http.post('/commentsblog/deletemany',data,config)




export const bankingAPi = (data)=>Http.post('/bank/create_payment_url',data)






















