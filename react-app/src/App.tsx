import React, {useState, useEffect} from 'react';
import { fetchMovies, MovieData, movieData }  from './List';
import { CreateLists } from './PresentingLists';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addToWatched, setaddToWatched] = useState<number[]>([]);
  const [data, setData] = useState<MovieData>(movieData);

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
      const jsonData = await fetchMovies();
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
  return (
    <div> 
      <div className='header'>
      <input
      placeholder="search"
      className='input'
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} /></div>

      <CreateLists 
      listTitle={"To Watch List:"}
      data={data}
      list={filteredList}
      addRemoveButton={"Watched"}
      moveToWatched={moveToWatched}
      />

      <div  className="right-bar" >
      <CreateLists 
      listTitle={"Watched List:"}
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
