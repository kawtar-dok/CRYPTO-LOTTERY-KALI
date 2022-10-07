import React from 'react'
import Image from 'next/image'
import NavButton from './NavButton'
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import {
    useContract,
    useContractRead,
    useContractWrite,
    useAddress,
    useDisconnect,
  } from "@thirdweb-dev/react";
  
//all its abt boxes flex boxes div inside div ...
function Header() {
    const address = useAddress();
    const disconnect = useDisconnect();
  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
     <div className='flex items-center space-x-2'>
        <img
        className='rounded-full h-20 w-20'
        src='/kaw.jpg'
        alt=''
         />
        <div>
           <h1 className='text-lg text-white font-bold'>KALI DRAW</h1>
           <p className='text-xs text-teal-200 truncate'>User: {address?.substring(0,5)}...
           {address?.substring(address.length - 5)}</p>
        </div>
       </div>

       <div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md '>
        <div className='bg-[#071714] p-4 space-x-2'>
            {/* Button1 */}
            <NavButton isActive title='Buy Tickects'/>
             {/* Button2 */}
            <NavButton onClick={disconnect} title='Logout'/>
        </div>
        </div>
 
        <div className='flex flex-col ml-auto'> 
            <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer'/>
            <span className='md:hidden '>
            <NavButton onClick={disconnect} title='Logout'/>
        </span>
        </div>
        
        
     
    </header>
  )
}

export default Header
