const debounce =  function (fnc, delay) {
  let timer = null;
  return (...args)=>{
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout( () => {
      fnc.apply(this, args);
    },delay);
  };
};

export default debounce;
