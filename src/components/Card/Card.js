import React from 'react'
import './Card.css'

function Card({title, body, isImg}) {
  return (
    <div className='card'>
        <div className='card__title'>
            {title}
        </div>
        <div className='card__body'>
            {
                isImg ? 
                <img alt={title} src={body} className='clima' /> :
                body
            }
        </div>
    </div>
  )
}

export default Card