const quizmaster = (function(){
  const config = {
    main : 'main#main',
    menu : 'ul#menu',
    default : 'main',
    api : 'localhost:8081/api',
    components : [
      { endpoint : 'quiz' },
      { endpoint : 'games' },
      { endpoint : 'players' },
      { endpoint : 'questions' }
    ]
  },
  //shorthands
  make = tool.make, // create html object
  obj = utils.obj, // object to arrays
  element = view.element, // get dom element
  set = view.set, // set dom element
  call = application.call, // call application function
  hook = application.hook, // callback call
  before = application.before, //
  data = model.data,
  get = model.get;


  const main = () => {
    const component = 'quiz'
    const start = () => {
      console.log('start')
    }
    return {
      label : 'Start',
      start : start,
      default : start
    }
  }
  return{
    config : config,
    main : main
  }
})()
