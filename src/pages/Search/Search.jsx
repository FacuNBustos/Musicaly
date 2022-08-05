
import React, { useEffect, useState } from 'react'
import artistService from '../../services/artist.service';
import logo from '../../assets/logo.png'
import Validate from '../../services/searchValidate.service';
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(screen.width);
  window.addEventListener('resize', handleChangeScreenWidth);
  function handleChangeScreenWidth() {
    setScreenWidth(screen.width);
  }

  const [artists, setArtist] = useState();
  const [tracks, setTracks] = useState();

  const handleChangeInformation = ( value ) => {
    setArtist(value.artists.hits);
    setTracks(value.tracks.hits);
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
      location.reload();
    }
  }

  useEffect(() => {
    const query = window.location.search.replace('?q=', '');
    if (query){
      artistService(query.replace(/%/g, ' '))
      .then(function(response) {
        handleChangeInformation(response);
        console.log(response.artists.hits)
      }).catch(function(error) {
        console.log(error.message);
      })
    }
  },[])
  
  const FullScreen = () => {

    return(
      <>
        <div className='grid grid-cols-2 w-full h-[100px]'>

          <div className='flex flex-row items-center gap-4 pl-10'>
            <img src={logo} alt="logo musicaly" className='h-[65px] hover:cursor-pointer' onClick={e => navigate('/')}/>
            <div className='flex justify-center items-center w-[700px] h-[45px] rounded-full bg-[#FEFEFE] text-lg font-roboto border border-gray-200/75 shadow-sm shadow-gray-300
            hover:shadow-lg'>

              <input id='search' type="text" className='w-[85%] h-full rounded-l-full pl-5 outline-none'
              onKeyDown={handleSubmitKey}
              placeholder={window.location.search.replace(/%/g, ' ').replace('?q=', '')} />

              <button className='w-[15%] h-full rounded-r-full
              hover:bg-gray-100/75
              active:bg-gray-200/75'
              onClick={handleSubmitButton}>
                Buscar
              </button>

            </div>
          </div>

        </div>
        
        <div className='w-full h-[1px] bg-gray-200 mt-2'></div>

        <div className='flex flex-row items-center w-full h-[150px] pl-[100px] pr-[100px] gap-3'>

          {(artists)? 
          artists.map((elem, key) => {
            return <a href={elem.artist.weburl} target='_blanck' className='w-[120px] h-[120px]' key={key}>
              <img src={elem.artist.avatar} className='w-full h-full rounded-full
              hover:scale-125
              active:scale-110'/>
            </a>
          })
          : null}

        </div>

        <div className='w-full h-[1px] bg-gray-200'></div>

        <div className='grid grid-cols-2 w-full p-4 pt-5 gap-3'>

          <div className='flex flex-col w-full h-full gap-3'>

            { (tracks)?
            tracks.map((elem, key) => {
              return <div className='flex flex-row items-center w-full h-[150px] bg-[#FFFCBF] font-roboto rounded border' key={key}>
                <img src={elem.track.images.coverart}  className='w-[140px] pl-2 '/>
                <div className='flex flex-col h-full w-[600px] pt-5 pl-3'>
                  <h2 className='items-center text-medium'><span className='text-sm pr-2'>Titulo:</span>{elem.track.title}</h2>
                  <h3><span className='text-sm pr-2'>Artistas:</span>{elem.track.subtitle}</h3>
                </div>

              </div>
            })
            : null}

          </div>

          <div className='flex justify-center w-full h-full'>
            <div className='w-[70%] h-[600px] bg-red-200 rounded'>
              <img alt="foto artista" />
            </div>
          </div>

        </div>


      </>
    )
  }

  const SmallScreen = () => {

    return(
      <>

      </>
    )
  }


  return (
    <div>
      <div className='flex flex-col w-screen h-max-content bg-[#FFFFFF]'>

       {(screenWidth >= 800)? <FullScreen /> : <SmallScreen />}

      </div>
    </div>
  )
}

export default Search