import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div> 
        <nav className='w-full bg-gray-300 h-10 rounded-b-lg px-2 flex justify-center items-center'>
            <div className='w-full flex flex-row justify-between'>
                <Link href="/" >
                SGD-CC</Link>
                <div>
                    <ul className='flex flex-row justify-end'>
                        <li className='mx-5'>
                            <Link href="/about">
                            About</Link>
                        </li>
                        <li className='mx-5'>
                            <Link href="/contact">
                            Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar