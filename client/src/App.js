import './App.css';

function App() {
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
    </div>
  );
}

export default App;
