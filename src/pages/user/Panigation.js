import { Link,useSearchParams } from "react-router-dom"


const Panigation = ({pages}) => {
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword')
    const {currentPage, total,limit,next,prev,hasNext,hasPrev} = pages
    
    const field = searchParams.get('field');
    const type = searchParams.get('type');
    const renderPage=()=>{
        const pageHtml=[]
        const pageCount = Math.ceil(total/limit)
        const l=currentPage-1
        const r=currentPage+1

        for(let i=1; i<=pageCount; i++){
            if([1,pageCount,currentPage].includes(i)||(i>=l&&i<=r)){
                pageHtml.push(i);
            }else if(i==l-1||i==r+1){
                pageHtml.push("...")
            }
        }
        return pageHtml
    }
    return (<>
        <div className="paginatoin-area">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <p>Hiện thị 1-{limit} trong {total} sản phẩm</p>
                </div>
                <div className="col-lg-6 col-md-6">
                    <ul className="pagination-box">
                        {hasPrev&&<li><Link to={keyword?`?keyword=${keyword}&page=${prev}`:`${field?`?page=${prev}&field=${field}&type=${type}`:`?page=${prev}`}`} className="Previous"><i className="fa fa-chevron-left" /> Previous</Link>
                        </li>}
                        {renderPage().map((item)=>{

                            return item==="..."?<li><span >{item}</span></li>
                            :<li className={currentPage==item?"active":""}><Link to={keyword?`?keyword=${keyword}&page=${item}`:`${field?`?page=${item}&field=${field}&type=${type}`:`?page=${item}`}`}>{item}</Link></li>
                        })}
                        
                       {hasNext&& <li>
                            <Link to={keyword?`?keyword=${keyword}&page=${next}`:`${field?`?page=${next}&field=${field}&type=${type}`:`?page=${next}`}`} className="Next"> Next <i className="fa fa-chevron-right" /></Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </div>
    </>)
}

export default Panigation