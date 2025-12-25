import React from 'react'

type Prop = {
    title : string
}    

const Demo = (prop : Prop) => {
  return (
    <div>{prop.title}</div>
  )
}

export default Demo