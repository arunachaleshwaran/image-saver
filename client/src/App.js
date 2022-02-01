import { useEffect, useState } from 'react';
import './App.css';
import ImageShow from './components/ImageShow';
function App() {
  const [allImage, setAllImage] = useState([]);
  const getAllImage = async e => {
    const res = await (await fetch('http://localhost:5000/allimage')).json()
    console.log(res)
    setAllImage(res)
  }
  useEffect(() => getAllImage(), []);
  const onChange = async e => {
    const data = new FormData();
    data.append('userPhoto', e.target.files[0]);
    const response = await fetch('http://localhost:5000/uploadimage/',
      {
        method: 'POST',
        body: data
      })
    console.log(response)
  }
  return (
    <div className="App">
      <input type="file" name="userPhoto" onChange={onChange} id="userPhoto" accept=".png,.jpg,.jpeg" />
      <div className="image-frame">
        {allImage && allImage.map((i,index) => <ImageShow key={index} Image={i} />)}
      </div>
    </div>
  );
}

export default App;
