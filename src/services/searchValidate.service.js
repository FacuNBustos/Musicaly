
const Validate = ( value ) => {

  try{

    let searchString = value.toLowerCase().trim().split('');
    if (searchString.length > 0) {
      searchString = searchString.filter(function(v) {return ( v.charCodeAt(0) >= 48 && v.charCodeAt(0) <= 57 ) 
        || ( v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122 ) || v.charCodeAt(0) === 32});
    };
    
    searchString = searchString.join('');
    if (searchString) {
      return searchString.replace(/ /g, '%');
    } else {
      return false;
    }

  } catch (error) {
    return false;
  }
}

export default Validate;