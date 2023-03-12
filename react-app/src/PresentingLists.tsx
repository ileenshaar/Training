export function CreateLists({
    listTitle, list,data,addRemoveButton,moveToWatched }:
    { listTitle: string;list: any[];data: any[];addRemoveButton:string;moveToWatched: (id: number) => void } ){
 return(
 <div>
     <p className='listTitle'>
       {listTitle}
        </p>

     {data && data.length > 0 && (
       <ul >
         {list.map((item) => (
           <li className='li' key={item.id} >
          <div className='square' >
          <img
           className="avatar"
           src={item.poster}
           alt='MovieImage'
         /> 
          <div className='overlay'> 
       <div className="description">Overview: <br></br> {item.overview}</div>
       <div className="description">Genres: <br></br> {item.genres.join(",")}</div>
       <div className="description">Release_date: <br></br> {item.release_date}</div>
     </div >
     <div className="title" >{item.title} </div>
     <button onClick={()=>
           moveToWatched(item.id) } 
           className='moveButton' >{addRemoveButton}</button>
        </div>
         </li> 
         ))}
       </ul>
     )}</div>);
 }