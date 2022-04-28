import React from 'react'
import moment from 'moment';


export const JournalEntry = ({id, body, title, url, date}) => {

    const noteDate = moment();

  return (
    <div className='journal__entry pointer'>

        {url&&
        (
        <div className='journal__entry-picture'
        style={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://images4.alphacoders.com/120/thumb-1920-1204596.jpg)'
        }}>
        </div>
        )
        }

        <div className='journal__body-entry'>
            <p className='journal__entry-title'>{title}</p>
            <p className='journal__entry-content'>
                {body}
            </p>
        </div>

        <div className='journal__entry-date-box'>
            <span>{noteDate.format('dddd')}</span>
            <h4>{noteDate.format('Do')}</h4>
        </div>
    </div>
  )
}
