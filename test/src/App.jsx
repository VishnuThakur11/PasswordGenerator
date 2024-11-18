import './App.css'
import Home from './Home.jsx'
import { useState , useCallback , useEffect ,useRef } from 'react'

function App() {

  const [length , setLength] = useState(10);
  let [numberAllowed , setnumberAllowed] = useState(false);
  const [charAllowed , setcharAllowed] = useState(false);
  const [password , setPassword] = useState("")

  const [copy ,setCopy] = useState('copy');

  
  const copied = useCallback( () =>{
    setCopy('copied')
  },[])


  const passwordReference = useRef(null)
  
  const passwordGenerator =useCallback(() =>{
    let pass = "";
    let str = 'ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!#$%&()*+,-./:;<=>?@[]^_{|}~"

    for(let i = 1 ; i <= length ; i++ ){
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
     
    setPassword(pass)
  },[length , numberAllowed , charAllowed])
  useEffect( () =>{
    passwordGenerator();
    setCopy('copy')
  } , [length , numberAllowed , charAllowed , setPassword ,passwordGenerator])


  const copyClip = useCallback(() =>{
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password);

  },[password])
  return (
    <>
    <div>
    <Home navigation = 'Home'/>
    </div>
    <div className="container">
    <div className='main'>
      Password Generator
    </div>
    
    <div className="input">
      <div className='inputBox'>
      <input 
      type="text" 
      id='input1' 
      value={password} 
      ref={passwordReference}
      readOnly 
      
      />
      </div>
      <button id='reload' 
      onClick={()=>{
        passwordGenerator()
        setCopy('copy')
      }}
      >
        <img src="https://assets.dryicons.com/uploads/icon/preview/9966/small_1x_c99be21d-800b-4a19-9011-fc4472e52fc6.png" alt="" id='reload'/>  
      </button>
      <button 
       onClick={()=>{
        copyClip()
        copied()
       }} 
      >{copy}</button>
    </div>
    <div>
      <input 
      type="range"
       min={0} max={50} 
       value={length}
       onChange={(e) => {setLength(e.target.value)}}
       id='input2'
       />
       <div id='lengthText'>
       <label htmlFor="range" >Length {length}</label>
       </div>
       <div id='checkbox'>
       <input type="checkbox" 
              defaultChecked ={numberAllowed}
              onChange={()=>{
                setnumberAllowed((prev) => !prev);
              }}
       /><span>Number</span>
       </div>
       <div id="checkbox">
        
       <input type="checkbox" 
          defaultChecked ={numberAllowed}
          onChange={()=>{
          setcharAllowed((prev) => !prev);
       }}
       /><span>Characters</span>
       </div>
    </div>
    </div>
    
    
    </>
  )
}

export default App;