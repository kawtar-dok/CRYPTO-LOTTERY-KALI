import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader';
 
function Loading() {
  return (
    
        <div className="bg-[#030707] min-h-screen flex flex-col items-center justify-center text-center">
          <div className='flex item-center space-x-1' >
          <img
               className='rounded-full h-20 w-20 mb-2'
               src='https://c.tenor.com/zyUn_DgNXyUAAAAd/eth-etherum.gif'
               alt=''
            />
          <h1 className='text-lg text-white font-bold'>Loading the Kali Crypto Lottery </h1>
          </div>
          <PropagateLoader color='white' size={30}/>
        </div>  
  );
}

export default Loading
