'use strict'
const application = (function(){

  let applicationModule,applicationObj,config,main,menu,moduleNames,moduleFunctions,filePath,loadEvent;

  const obj = utils.obj
  const element = view.element
  const add = view.add

  const route = (config) => config.route ? config.route : location.hash.slice(1).split('/'),
  //...........................................................................

  load = (event) => {
    const thisApp = applicationModule
    const thisRoute = route(thisApp.config)
    const endpoint = thisRoute[0] ? thisRoute[0] : thisApp.config.default
    thisRoute[1]
      ? thisApp[endpoint]()[thisRoute[1]](thisRoute[2])
      : thisApp[endpoint]().default()
  },

  //...........................................................................

  nav = () => {
    for( let item of moduleNames){
      if( applicationModule[ item ].label ){
        let menuItem = view.add( menu, "li",{ id : item })
        const prefix = applicationModule.config.navMenuItemPrefix ? applicationModule.config.navMenuItemPrefix : '#'
        view.add( menuItem, "a", { href : `${prefix}${item}`}, applicationModule[ item ].label)
      }
    }
  },

  //...........................................................................

  init = ( application ) => {
    applicationModule = application;
    applicationObj = obj(application);
    config = applicationModule.config;
    model.load(config)
    main = element(config.main);
    menu = element(config.menu);
    //apiBasePath = config.apiBasePath;
    moduleNames = applicationObj.properties;
    moduleFunctions = applicationObj.values;
    if(menu) nav()
    config.loadEvent
    ? loadEvent = config.loadEvent
    : loadEvent = 'hashchange'
    controller.add( window, loadEvent, (event) => load(event) );
    controller.add( window, 'load', (event) => load(event) )

  },

  //...........................................................................

  call = ( exc, fn, args ) => {
    if(!args.target) args['target'] = applicationModule.config.main;
    args['data'] = model.data[args.component]
    args['config'] = applicationModule.config
    callbefore( exc, fn, args.target )
    if(typeof exc === 'string'){
      window[exc][fn](args)
    }else if( typeof exc === 'function' ){
      fn ? exc()[fn](args) : exc(fn)
    }
    callback( exc, fn )
  },

  //...........................................................................
  hooks = {},
  exc = ( exc ) =>  {
    exc = typeof exc === 'function' ? /function ([^(]*)/.exec( exc+'' )[1] : exc
    return exc
  },
  before = ( exc, fn, before ) => {
    exc = exc(exc)
    fn ? hooks[ `before:${exc}.${fn}` ] = before : hooks[ `before:${exc}` ] = fn
  },
  hook = ( exc, fn, hook) => {
    exc = exc(exc)
    fn ? hooks[ `${exc}.${fn}` ] = hook : hooks[ exc ] = fn
  },
  //...........................................................................
  callbefore = (exc, fn ,target ) => {
    exc = exc(exc)
    exc = exc(exc)
    if( fn && hooks[`before:${exc}.${fn}`] ) {
      hooks[`${exc}.${fn}`]()
    }else if( hooks[`before:${exc}`]){
      hooks[`before:${exc}`]()
    }
  },
  callback = ( exc, fn ) => {
    exc = exc(exc)
    if( fn && hooks[`${exc}.${fn}`] ) {
      hooks[`${exc}.${fn}`]()
    }else if( hooks[exc]){
      hooks[exc]()
    }
  }



  return {
    route : route,
    config : config,
    init : init,
    call : call,
    hooks : hooks,
    before : before,
    hook : hook,
    callbefore : callbefore,
    callback : callback
  }
})()
