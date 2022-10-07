import React from 'react'


//in typescript we should define what the props are
interface Props  {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}
function NavButton({title, isActive , onClick}: Props) {
  return (
    <button 
      onClick={onClick}
      className={`${isActive && "bg-[#0d9488]" }
       hover:bg-[#0d9488] text-white py-2 px-4
     rounded font-bold`}
  > 
     {title}
   </button>
)
}

export default NavButton
