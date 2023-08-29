import React, { useEffect, useState } from 'react'
import axios from 'axios'
import List from './List'

const Accordition = () => {
    const [data, setData] = useState([])

    useEffect(() =>{
      axios.get('http://localhost:4000/items').then(
          response =>{
              setData(response.data)
          }
      ).catch(error=>{
          console.error("Error fetching data: ", error)
      })
    }, [])
  return (
    <div className='Accordition'>
        {
            data.map((item, index)=>(
                <List key={index} title = {item.title} order={item.order} completed = {item.completed} data = {item.createdOn} />
            ))
        }
    </div>
  )
}

export default Accordition