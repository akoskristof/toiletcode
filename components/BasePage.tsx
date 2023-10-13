import Link from "next/link";
import { ReactNode } from "react";

const BasePage = ({children,back}:{children:ReactNode,back?:String}) => {
    return <div className="basePage flex min-h-screen flex-col items-center">
        {back && <Link href={String(back)} className="self-start p-8 absolute text-xl">{"< Vissza"}</Link>}
        {children}
    </div>
}

export default BasePage;