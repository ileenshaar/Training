import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<{ id: number; title: string ;poster:string;
    overview:string;release_date:number;genres:string[]}[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addToWatched, setaddToWatched] = useState<number[]>([]);

  const filteredList = data.filter((item) =>
  !addToWatched.includes(item.id) &&
   item.title.toLowerCase().
   includes(searchQuery.toLowerCase())
  );

  const listId=data.filter((item)=>
  addToWatched.includes(item.id) &&item.title.toLowerCase().
  includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://mocki.io/v1/26cead06-d092-41d0-9317-d964faa232ee');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  function moveToWatched(id: number) {
    setaddToWatched([...addToWatched, id]);
  }

  function removeFromwatched(id: number) {
    setaddToWatched(addToWatched.filter((item)=> item!==id))
  }
  function CreateLists({
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
           <div> <button onClick={()=>
            moveToWatched(item.id) }
            className='moveButton' >{addRemoveButton}</button></div>
            <li className="title" >{item.title} </li>
          <ul><img
            className="avatar"
            src={item.poster}
            alt='MovieImage'
          />
          </ul >
          <li className='description'> {item.overview}</li>
          <li className='description' >{item.genres.join(",")}</li>
          <li className='description'>{item.release_date}</li>
         </div>
          </li>
          ))}
        </ul>
      )}</div>);
  }
  return (
    <div>
      <input
      placeholder="search"
      className='input'
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} />

      <CreateLists
      listTitle={"To Watch List"}
      data={data}
      list={filteredList}
      addRemoveButton={"Watched"}
      moveToWatched={moveToWatched}
      />

      <div  className="right-bar" >
      <CreateLists
      listTitle={"Watched List"}
      data={listId}
      list={listId}
      addRemoveButton={"Remove"}
      moveToWatched={removeFromwatched}
      />

    </div>
    </div>
  );
}

export default App;
