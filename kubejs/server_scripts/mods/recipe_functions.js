function checkQuantity(item){
    let amount = 1
    let returnItem = item
    if(item.includes('x ')){
      amount = item.split('x ')[0]
      returnItem = item.split('x ')[1]
    }
    return amount, returnItem
  }

  const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'cyan',
    'white',
    'black',
    'orange',
    'gray',
    'light_gray',
    'magenta',
    'light_blue',
    'lime',
    'pink',
    'purple',
    'brown'
  ]