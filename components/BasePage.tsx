import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import star from '../assets/star.svg'

const BasePage = ({children,back,className,style}:{children:ReactNode,back?:String,className?:String,style?:any}) => {
    const [loggedIn, setloggedIn] = useState(null);
    console.log(loggedIn);
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("Change to local storage!");
            const d = localStorage.getItem('loggedIn')
            setloggedIn(d)
        })
    }, []);
    
    return <div className={"basePage flex min-h-screen flex-col items-center "+className}
    style={{
        backgroundImage: `url(${star.src})`,
        backgroundSize:'100px 100px',
        ...style
    }}>
        {back     && <Link href={String(back)} className="self-start p-8 absolute text-xl z-10">{"< Vissza"}</Link>}
        {loggedIn && <button onClick={()=>{
            localStorage.removeItem('loggedIn');
            window.dispatchEvent(new Event("storage"));
            setloggedIn(null)
        }} className="self-end p-8 absolute text-xl  z-10">{"Kijelentkezés"}</button>}
        {children}
    </div>
}

export default BasePage;