let temp = {
  onClick(e, that) {
    console.log(e);
    console.log(that);
    that.setData({sizeObj: 'hello'})
    
  }
}

module.exports= {
  temp: temp,
}