import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white sticky w-full top-0 left-0'>
       <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

       <div className='logo font-bold text-white text-2xl'>
        <span className='text-orange-700'> &lt;</span>
       
       <span>Lock</span>
        <span className='text-orange-700'>Er/&gt;</span>
      

        </div>
        {/* <ul className=''>
            <li className='flex gap-20'>
                <a className='hover:font-bold' href='#'>Home</a>
                <a className='hover:font-bold' href='#'>About</a>
                <a className='hover:font-bold' href='#'>Contact</a>
            </li>
        </ul> */}
        <button className='text-white  my-5 rounded-md flex justify-between items-center'>
          <img className='invert w-10 ' src='Icons/GitHublogo.png' alt="GitHub"/>
          <a className='hover:font-bold' href='https://github.com/nihaljhariya?tab=repositories'>GitHub</a>
        </button>
       </div>
    </nav>
  )
}

export default Navbar
