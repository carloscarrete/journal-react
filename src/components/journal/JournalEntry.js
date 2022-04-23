import React from 'react'

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
        <div className='journal__entry-picture'
        style={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://images4.alphacoders.com/120/thumb-1920-1204596.jpg)'
        }}>
        </div>

        <div className='journal__body-entry'>
            <p className='journal__entry-title'>Algo nuevo</p>
            <p className='journal__entry-content'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </div>

        <div className='journal__entry-date-box'>
            <span>Monday</span>
            <h4>28</h4>
        </div>
    </div>
  )
}
