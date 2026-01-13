const toProperCase = (str) => 
  str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export default toProperCase;