const utils = (function(){
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  obj = (obj) => {
      return {
        properties : Object.getOwnPropertyNames(obj),
        values : Object.values(obj)
      }
  },

  params = (func) => {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
        ARGUMENT_NAMES = /([^\s,]+)/g,
        fnStr = func.toString().replace(STRIP_COMMENTS, ''),
        result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
        result = [];
        return result;

  },
  elements = (args) => {
    const argsObj = obj(args);
    for(let item in argsObj.properties ){
      args[argsObj.properties[item]] = view.element(argsObj.values[item])
    }
    return args
  },
  format = (str) => {
    return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/(?:\r\n|\r|\n)/g, '<br>');
  },
  isNode = (o) => {
    return (
      typeof Node === "object" ? o instanceof Node :
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },

  //Returns true if it is a DOM element
  isElement = (o) => {
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  },
  formData = ( form ) => {
    let data = {},
    formData = new FormData( form )
    for( let item of formData.entries() ) data[ item[0] ] = item[1]
    return data
  },
  occurence = (str,find) => (str.match(new RegExp(`${find}`,'g')) || []).length;
  return{
    getRandomInt : getRandomInt,
    obj : obj,
    params : params,
    elements : elements,
    format : format,
    isNode : isNode,
    isElement : isElement,
    formData : formData,
    occurence : occurence
  }
})()
