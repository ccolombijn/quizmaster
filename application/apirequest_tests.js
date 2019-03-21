let data = {
  id : 0,
  name : 'test'
}
model.apiRequest({ endpoint : 'players' },() => {
  console.log( event.target.responseText )
})
