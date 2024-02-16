import { Link,useSearchParams } from "react-router-dom"

const Pagination = ({pages}) => {
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword')
    const filter = searchParams.get('filter')

    const {currentPage, total,limit,next,prev,hasNext,hasPrev} = pages
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

    return (
        <>
            <div className="panel-footer">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {hasPrev&&<li className="page-item"><Link className="page-link" to={keyword&&filter?`?keyword=${keyword}&page=${prev}&filter=${filter}`:`${filter?`?page=${prev}&filter=${filter}`:`${keyword?`?page=${prev}&keyword=${keyword}`:`?page=${prev}`}`}`}>«</Link></li>}
                        {renderPage().map(item=>(
                            item==="..."?
                            <li className="page-item"><span className="page-link">{item}</span></li>:
                            <li className={item==currentPage?"active page-item":"page-item"}><Link className="page-link" to={keyword&&filter?`?keyword=${keyword}&page=${item}&filter=${filter}`:`${filter?`?page=${item}&filter=${filter}`:`${keyword?`?page=${item}&keyword=${keyword}`:`?page=${item}`}`}`}>{item}</Link></li>

                        ))}
                        
                        {hasNext&&<li className="page-item"><Link className="page-link" to={keyword&&filter?`?keyword=${keyword}&page=${next}&filter=${filter}`:`${filter?`?page=${next}&filter=${filter}`:`${keyword?`?page=${next}&keyword=${keyword}`:`?page=${next}`}`}`}>»</Link></li>}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination