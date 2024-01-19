import BasePage from "@/components/BasePage";
import Image from "next/image";
import Link from "next/link";
import map from '../assets/map.jpeg'
import stars from '../assets/stars.png'
import community from '../assets/community.png'
import { signIn } from "next-auth/react";


export default function Page() {
    return <BasePage>
        <h1>Toilet Code</h1>
        <div className='container p-12 pb-4'>
            <h2>Egy oldal, hogy sose kelljen várni.</h2>
            <div className="flex flex-row">
                <div className="module flex flex-col">
                    <p>Keress a térképen fizetős wckhez ingyenes kódokat</p>
                    <Image src={map} alt="A map" className="image"/>
                </div>
                <div className="module flex flex-col">
                    <p>Értékelj mosdókat, mondd el a véleményed.</p>
                    <Image src={stars} alt="A map" className="image"/>
                </div>
                <div className="module flex flex-col">
                    <p>Tegyünk a közös mosdóhasználatért együtt!</p>
                    <Image src={community} alt="A map" className="image"/>
                </div>
            </div>
            <Link href="map" className="text-center button">Tovább a térképre!</Link>
            
            <div className="flex flex-row justify-center items-center">
                <span onClick={()=>signIn('email',{callbackUrl:'/map'})} className="m-4 p-8">Regisztráció</span>
                <button onClick={()=>signIn('email',{callbackUrl:'/map'})} className="m-4 button">Bejelentkezés</button>
            </div>
        </div>
    </BasePage>
}