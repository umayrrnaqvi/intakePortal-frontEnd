"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
const Navbar = () => {
const router=useRouter()
const pathname=usePathname()
    const Logout=()=>{
        localStorage.removeItem("token")
router.push("/login")
    }


    const mainPage=()=>{
router.push("/")
    }
  return (
   <>
   
   
 <div className={`bg-black flex items-center justify-around w-[100%] h-[80px]  ${pathname === "/login" || pathname === "/signup" || pathname === "/form" ? "hidden" : ""}`}>

    <h1 className='text-white font-semibold text-3xl'>
        Injury Report System
    </h1>
<button onClick={mainPage} className='text-black px-8 py-3 text-sm bg-white cursor-pointer rounded-[5px] border-none'>
    Main Page
</button>
<button onClick={Logout} className='text-black px-8 py-3  text-sm bg-white cursor-pointer  rounded-[5px] border-none'>
    Logout
</button>


 </div>
   </>
  )
}

export default Navbar