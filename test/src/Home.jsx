import {useState} from 'react'

function Home() {

    const [nav , setNav] = useState('Home')
    const navigaton = (props) =>{
        setNav(props)
    }
  return (
    <>
        <div>
            <ul>
                <li>{nav}</li>
            </ul>
        </div>
       {navigaton}
    </>
  )
}

export default Home