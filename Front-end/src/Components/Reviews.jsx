import React from 'react'
import Dashboard from './Dashboard'

function Reviews() {
  return (
    <>
       <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/daadrhhk9/image/upload/v1753778107/Admin-Dashbord_mco6xg.png)",
          backgroundSize: "100% 100%",
        }}
        className="w-full h-[100vh] flex flex-row justify-center"
      >
        <Dashboard/>

        <div className='w-full'></div>


      </div>
    </>
  )
}

export default Reviews
