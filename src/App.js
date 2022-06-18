import React from 'react';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
import Draggable from 'react-draggable';
import {randomColor} from 'randomcolor'

import './App.css';


function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  
  useEffect(()=> {
    localStorage.setItem('items', JSON.stringify(items))
  },[items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPosition: {
          x: 100,
          y: -500
        }
      }
      setItems((item) => [...items, newItem])
      setItem('')
    } else {
      alert('Write something...')
      setItem('')
    }
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id ))
  }

const updatePosition = (data, index) => {
  const newArr = [...items]
  newArr[index].defaultPosition = {x: data.x, y: data.y}
  setItems(newArr)
}

const keyPress = (e) => {
  const code = e.keyCode || e.which
  if (code === 13 ) {
    newItem()
  }
}

  return (
    <div className="App">
      <div className='wrapper'>
        <input type='text'
         value={item}
         className='wrapper-input' 
         placeholder='Write something...'
         onChange={(e)=> {setItem(e.target.value)}}
         onKeyPress={(e) => keyPress(e)}
         />
        <button className='add' onClick={newItem}>Add</button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable 
              key={index}
              defaultPosition={item.defaultPosition}
              onStop={(e, data) => {
                updatePosition(data, index)
              }}
            >
              <div className='todo-item' style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button className='delete-btn'
                onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </div>
            </Draggable>
          )
        })
      }

    </div>
  );
}

export default App;
