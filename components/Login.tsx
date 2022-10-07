import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Login() {
    const connectWithMetamask = useMetamask();
  return (
    <div className='bg-[#030707] min-h-screen flex flex-col items-center justify-center text-center'>
       <div>
           <img
           className='rounded-full h-64 w-65 mb-10'
           src='/kaw.jpg'
           alt=''
           />
            
       </div>
       <div className='flex items-center space-x-2 justify-center '>
       <h1 className='text-6xl text-white font-bold text-cente'>KALI LOTTERY</h1>
       <img
           className='rounded-full h-20 w-20 hidden md:flex '
           src='https://c.tenor.com/zyUn_DgNXyUAAAAd/eth-etherum.gif'
           alt=''
        />
        </div>
       <h2 className='text-white'>Get Started By Logging In With Your MetaMask</h2>
        <button 
        onClick={connectWithMetamask}
        className='bg-white px-8 py-5 mt-10 rounded-lg shwadow-lg font-bold'>
        Login with MetaMask
       </button>
    </div>
  )
}

export default Login
