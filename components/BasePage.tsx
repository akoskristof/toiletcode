import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react"

import star from '../assets/star.svg'

const BasePage = ({children,back,className,style}:{children:ReactNode,back?:String,className?:String,style?:any}) => {
    const { data: session, status } = useSession()
    const loggedIn = status === "authenticated";

    return <div className={"basePage flex min-h-screen flex-col items-center "+className}
    style={{
        backgroundImage: `url(${star.src})`,
        backgroundSize:'100px 100px',
        ...style
    }}>
        {back     && <Link href={String(back)} className="self-start p-8 absolute text-xl z-10">{"< Vissza"}</Link>}
        {false && <button onClick={()=>{
            signOut()
        }} className=" p-8 absolute text-xl  z-10">{"Kijelentkezés"}</button>}
        {children}
    </div>
}

export default BasePage;