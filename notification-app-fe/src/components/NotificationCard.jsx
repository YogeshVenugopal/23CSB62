import React from 'react'

export const NotificationCard = ({key, notification}) => {
  return (
    <div className='w-full p-4 rounded-[24px] shadow-lg flex flex-col items-start'>
      <div className='flex w-full items-center justify-between'>
        <p className='p-1 px-2 bg-gray-200 text-sm rounded-[20px]'>
        {notification.ID}
      </p>
       {notification.Timestamp}
      </div>
      
      <h1 className='font-bold'>{notification.Message}</h1>
      <p
      >
        Type : {notification.Type}
      </p>
    </div>
  )
}
