import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import {
  useContract,
  useContractRead,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import Login from '../components/Login';
import Loading from '../components/Loading';
import {useState,useEffect} from "react"
import { ethers } from "ethers"
import { currrency } from '../constants';
import CountDownTimer from '../components/CountDownTimer';
import toast from "react-hot-toast";
import Marquee from 'react-fast-marquee';
import AdminControls from '../components/AdminControls';

const Home: NextPage = () => {
  //will try to get for us 
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { contract, isLoading, error} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)
  
  const { data: remainingTickets } = useContractRead(
    contract,
     "RemainingTickets")
  const { data: currentWinningReward } = useContractRead(
      contract,
       "CurrentWinningReward")
  const { data: ticketPrice } = useContractRead(
        contract,
         "ticketPrice")
  const { data:ticketCommission} = useContractRead(
          contract,
           "ticketCommission")
  const { data:expiration } = useContractRead(
          contract,
           "expiration")
  const { data: tickets} = useContractRead(
            contract, "getTickets")

  
  const { data: winnings } = useContractRead(
              contract, "getWinningsForAddress", address)

  const { mutateAsync: WithdrawWinnings } = useContractWrite(
                contract, "WithdrawWinnings")
  const { data: lastWinner} = useContractRead(
                  contract, "lastWinner")
  const { data: lastWinnerAmount} = useContractRead(
                    contract, "lastWinnerAmount")    
 const { data: islotteryOperator } = useContractRead(
                      contract, "lotteryOperator")            
  const { mutateAsync: BuyTickets} = useContractWrite(
            contract, "BuyTickets")
            useEffect(() => {
              if (!tickets) return;
          
              const totalTickets: string[] = tickets;
          
              const noOfUserTickets = totalTickets.reduce(
                (total, ticketAddress) => (
                  ticketAddress === address ? 
                  total + 1 : total), 
                  0
              );
          
              setUserTickets(noOfUserTickets);
              
            }, [tickets, address]);
   console.log(userTickets)
            


  const handleClick = async () => {
    if (!ticketPrice)  return ;

    const notification = toast.loading("Buying your tickets...");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
          (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
        ),}
      ]
      );
      toast.success("Tickets purchased successfully", {
        id: notification,
      })
      console.info("contract call success",data)
    } catch(err) {
      toast.error("whoops something went wrong !!", {
        id: notification,
      });
      console.log("contract call faillure", err)
    }
  } 
  console.log(address);
  

const onWithdrawWinnings = async() => {
  const notification = toast.loading("Withdrawing Winnings...");
  try {
    const data = await WithdrawWinnings([{}]);
    toast.success("Winnings Withdrawsuccessfully!", {
      id: notification,
    })
  } catch (err) {
    toast.error("whoops something went wrong !!", {
      id: notification,
    });
    console.log("contract call faillure", err)
  }
} 
  
 // if(isLoading) return <Loading />
  if (!address) return <Login />;
  return (
<div className="bg-[#05110f] min-h-screen flex flex-col">
      <Head>
        <title>KALI CRYPTO LOTTERY</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
        />
      </Head>

    <div className='flex-1'>
       <Header />
      <Marquee className='bg-[#081815] p-5 mb-5' 
      gradient={false} speed={100}>
        <div className='flex space-x-2 mx-10'>
          <h4 className='text-white font-bold'>Last Winner: 
          {lastWinner?.toString()}
          </h4>
          <h4 className='text-white font-bold'>Previous Winnings:
          {lastWinnerAmount && 
          ethers.utils.formatEther(lastWinnerAmount?.toString())}
          {" "} {currrency}
          </h4>
        </div>
      </Marquee>

      {islotteryOperator === address && (
        <div className='flex justify-center'>
          <AdminControls />
        </div>
      )

      }


      {winnings > 0   && ( 
       <div className='max-w-md md:max-w-5xl lg:max-w-4xl 
       mx-auto mt-5'>
        <button className='p-5 bg-gradient-to-b from-teal-600
              to-cyan-600 
              animate-pulse text-center 
              rounded-xl w-full'
             onClick={onWithdrawWinnings}>
          <p className='font-bold'>Winner Winner Chicken Dinner!</p>
          <p>
            Total Winnings: {
              ethers.utils.formatEther(winnings.toString())
            } {" "} {currrency}
          </p>
          <br />
          <p className='font-semibold'>Click Here to Withdraw</p>
        </button>
       </div>
      )
      }


      {/**THE NEXT DRAW BOX*/}
      <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex:row items-start justify-center md:space-x-5'>
        <div className='stats-container'> 
           <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>
          <div className='flex justify-between p-2 space-x-2'>
            <div className='stats'>
             <h2 className='text-sm'>Total Pool</h2>
             <p className='text-xl'>
              {currentWinningReward && 
              ethers.utils.formatEther
             //hadi the MATIC value:
              (currentWinningReward.toString()
              )}{" "}
                {currrency}
             </p>
           </div>
           <div className="stats">
             <h2 className='text-sm'>Tickets Remaining</h2> 
             <p className='text-xl'>{remainingTickets?.toNumber()}</p>
           </div>
          </div>
           {/* Countdown timer*/}
           <div className='mt-5 mb-3'>
              <CountDownTimer />
           </div>
          
         </div>
        <div className="stats-container space-y-2">
          <div className="stats-container ">
            <div className='flex justify-between items-center text-white pb-2'>
            <h2 >Price per ticket</h2>
            <p>{ticketPrice && 
                 ethers.utils.formatEther(ticketPrice.toString())}
                   {" "}
                   {currrency}
                   </p>
            </div>

            <div className='flex text-white items-center space-x-2  bg-[#05110f]  border-[#134e4a] border p-4'>
              <p>TICKETS</p>
              <input 
              className='flex w-full bg-transparent text-right outline-none'
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={
                (e)=> setQuantity(Number(e.target.value))
              }
              />
            </div> 


            <div className='space-y-2 mt-5'>
              <div className='flex items-center justify-between text-teal-300 text-sm italic font-extrabold'>
                <p>Total cost of tickets</p>
                <p>
                  {ticketPrice &&
                  Number(
                    ethers.utils.formatEther(ticketPrice.toString())
                  )  * quantity} {" "} 
                  {currrency}
                </p>
              </div>

              <div className='flex items-center justify-between text-teal-300 text-xs italic'>
                <p>Service fees</p>
                <p>
                  {ticketCommission  && ethers.utils.formatEther(ticketCommission?.toString())
                  }
                  {" "}
                  {currrency}
                </p>
              </div>

               <div className='flex items-center justify-between text-teal-300 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC</p>
               </div>
            </div>
 
             <button 
             disabled={expiration?.toString() <Date.now().toString() || 
              remainingTickets?.toNumber() === 0}
              onClick={handleClick}
             className='mt-5 w-full bg-gradient-to-br from-teal-600
              to-cyan-600  px-10 py-5 
              rounded-md font-semibold text-white shadow-xl
               disabled:from-gray-600 disabled:to-gray-100
              disabled:cursor-not-allowed'>
              Buy {quantity} tickets for {ticketPrice && 
              Number(ethers.utils.formatEther(ticketPrice.toString()))
              * quantity} {" "} {currrency}
             </button>
          </div>
        {userTickets > 0 && (
          <div className='stats'>
            <p className='text-lg mb-2'>
              You have {userTickets} Tickets in this draw
            </p>
            <div className='flex max-w-sm flex-wrap gap-y-2 gap-x-2'>
              {Array(userTickets)
                .fill("")
                .map((_,index) => (
                  <p key={index}
                  className=' text-teal-300 h-20 w-12
                  bg-teal-500/30 rounded-lg flex flex-shrink-0
                  items-center justify-center text-xs italic'
                  
                  >{index + 1}</p>
                ))}
            </div>
          </div>
          )}
      </div>  
    </div>   
    <div>
      </div> 
 </div>
</div>
  )
}

export default Home
