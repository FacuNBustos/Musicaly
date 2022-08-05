
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Validate from '../../services/searchValidate.service';


const Home = () => {

  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(screen.width);
  window.addEventListener('resize', handleChangeScreenWidth);
  function handleChangeScreenWidth() {
    setScreenWidth(screen.width);
  }

  const handleSubmitButton = (e) => {
    handleSearchQuery(document.querySelector('#search').value);
  }
  const handleSubmitKey = (e) => {
    if (e.keyCode === 13) {
      handleSearchQuery(document.querySelector('#search').value);
    }
  }
  
  const handleSearchQuery = ( value ) => {
    const query = Validate(value);
    if (query){
      navigate(`/search?q=${query}`);
    }
  }

  const FullScreen = () => {
    return(
      <>
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <img src={logo} alt='logo musicaly' className='w-[380px] mb-6' />
          
          <div className='flex flex-row items-center w-[600px] h-[45px] bg-[#FFFFFF] border border-gray-200 rounded-full font-roboto shadow-sm shadow-gray-300 text-lg
          hover:shadow-lg'>

            <input type="text" className='w-[85%] pl-4 rounded-l-full outline-none bg-gray-100/0 text-center'
            onKeyDown={handleSubmitKey}
            id='search' />

            <div className='w-[1px] h-[80%] border-l border-gray-300'></div>
            <button className='w-[15%] h-full rounded-r-full
            hover:bg-gray-300/25
            active:bg-gray-300/50'
            onClick={handleSubmitButton}>
              Buscar
            </button>

          </div>
        </div>

        <footer className='flex flex-col justify-center items-center w-full h-[65px] border-t font-roboto text-sm gap-1'>
          <div className='flex flex-row gap-4 text-gray-600'>
            <p><a href="https://github.com/FacuNBustos/Musicaly" className='hover:underline' target='_blanck'>Github</a></p>
            <p><a href="https://www.linkedin.com/in/facundo-bustos-goainochea-a46b0220b/" className='hover:underline' target='_blanck'>LinkedIn</a></p>
          </div>
          <p className='font-bold text-gray-400'>Derechos reservados a Facundo Bustos Goainochea</p>
        </footer>
      </>
    )
  }

  const SmallScreen = () => {
    return(
      <>
        <div className='flex flex-col justify-center items-center w-full h-full'>

        <img src={logo} alt="logo musicaly" className='w-[55vw]'/>

        <div className='flex flex-row items-center w-[85vw] h-[35px] bg-[#FFFFFF] border border-gray-200 rounded-full font-roboto shadow-sm shadow-gray-300 text-sm'>

          <input type="text" className='w-[80%] outline-none pl-3'
          id='search'/>
          <div className='w-[1px] h-[70%] bg-gray-200'></div>
          <button className='w-[20%]'
          onClick={handleSubmitButton}>
            Buscar
          </button>

        </div>
        </div>

        <footer className='flex flex-col justify-center items-center w-full h-[40px] border-t font-roboto text-sm gap-1'>
          <p className='text-gray-400'>Derechos reservados a Facundo Bustos Goainochea</p>
        </footer>
      </>
    )
  }

  return (
    <div>
      <div className='flex flex-col w-screen h-screen bg-[#FFFCEF]'>

       {(screenWidth >= 800)? <FullScreen /> : <SmallScreen />}

      </div>
    </div>
  )
}

export default Home