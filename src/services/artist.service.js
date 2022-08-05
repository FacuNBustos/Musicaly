import axios from "axios";

const artistService = async ( query ) => {

  try {

    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {term: query, locale: 'es-ES', offset: '0', limit: '5'},
      headers: {
        'X-RapidAPI-Key': '2f49a6b18amshaadcaa53f94fcf2p1cf00ajsn674790249f4a',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    return false;
  }
}

export default artistService;