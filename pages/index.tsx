import BasePage from "@/components/BasePage";
import Image from "next/image";
import Link from "next/link";
import map from '../assets/map.png'

export default function Page() {
    return <BasePage>
        <h1>Toilet Code</h1>
        <div className='container flex flex-col p-12 pb-4 w-full'>
            <h2>Egy oldal, hogy sose kelljen várni.</h2>
            <div className="flex flex-row">
                <div className="module flex flex-col">
                    <p>Keress a térképen fizetős wckhez ingyenes kódokat</p>
                    <Image src={map} alt="A map" className="image"/>
                </div>
                <div className="module flex flex-col">
                    <p>Értékelj mosdókat, mondd el a véleményed.</p>
                    <Image src={map} alt="A map" className="image"/>
                </div>
                <div className="module flex flex-col">
                    <p>Tegyünk a közös mosdóhasználatért együtt!</p>
                    <Image src={map} alt="A map" className="image"/>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <Link href="signup" className="m-4 p-8">Regisztráció</Link>
                <Link href="login" className="m-4 button">Bejelentkezés</Link>
            </div>
        </div>
    </BasePage>
}