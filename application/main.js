/*
* application/main.js
*/
(()=>{
  'use strict'
  requirejs([
    'assets/utils',
    'assets/tool',
    'assets/model',
    'assets/controller',
    'assets/view',
    'assets/ui',
    'assets/application',
    'assets/ui.bootstrap',
    'quizmaster'
  ],function(){

    application.init(quizmaster)
  })
})()
