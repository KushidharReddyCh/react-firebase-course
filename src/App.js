import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db,auth,storage} from './config/firebase-config';
import { getDocs ,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage';

function App() {
  const [movieList,setMovieList] = useState([]);

  // New Movie States
  const [newNewMovieTitle,setNewMovieTitle] = useState("");
  const [newReleaseDate,setNewReleaseDate] = useState(0);
  const [isNewMovieOscar,setIsNewMovieOscar] = useState(false);

  //Update Title States
  const [updatedTitle,setUpdatedTitle] = useState("");

  // file upload state
  const [fileUpload,setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db,"movies");
  const getMovieList = async () => {
    // READ THE DATA
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }));
      console.log("Hiih",filteredData);
      setMovieList(filteredData);
    } catch(err){
      console.log(err);
    } 
    // SET THE MOVIE LIST
  };

  const deleteMovie = async (id)=>{
    const movieDoc = doc(db,"movies",id);
    await deleteDoc(movieDoc);
    getMovieList();
  }


  const updateMovieTitle = async (id)=>{
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc,{title:updatedTitle});
    getMovieList();
  }
  useEffect(()=>{
      getMovieList();
  },[]);
  
  const onSubmitMovie = async ()=>{
    try{
    await addDoc(moviesCollectionRef,{
        title:newNewMovieTitle,
        releaseDate:newReleaseDate,
        receivedAnOscar:isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    }catch(err){
      console.error(err);
    }
  }

  const uploadFile = async() => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage,`projectfiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUpload);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="App">
        FireBase Tutorial
        <Auth />
        <div>
              <hr></hr>
              <h1>FILE UPLOAD</h1>
              <input 
                  type="file"
                  onChange={(e)=>setFileUpload(e.target.files[0])}
                 />
              <button onClick={uploadFile}>Upload File</button>
        </div>   
        <hr></hr>
        <div>
            <input 
                placeholder='Movie Title...'
                onChange={(e)=>setNewMovieTitle(e.target.value)}
                />
            <input 
                placeholder='ReleaseDate..' 
                type="number"
                onChange={(e)=>setNewReleaseDate(Number(e.target.value))}  
              />
            <input  
                type="checkbox"
                checked={isNewMovieOscar}
                onChange={(e)=>setIsNewMovieOscar(e.target.checked)}
                />
            <label>Received an Oscar</label>
            <button onClick={onSubmitMovie}>Submit A Movie</button>
        </div>


        <hr></hr>
        <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color:movie.receivedAnOscar ? "green":"red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input 
                placeholder='new title...'
                onChange = {(e)=>setUpdatedTitle(e.target.value)}
                />
            <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
            <hr></hr>
          </div>
        )
        )}
        </div>
  

    </div>
  );
}

export default App;
