import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AplicationLogo from '@/Components/ApplicationLogo';
export default function Welcome({auth}) {
    const [activeSection, setActiveSection]= useState(0)
    const [displayedText, setDisplayedText]= useState("")
    const [isDeleting, setIsDeleting]= useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const fullText = "Welcome To MastaMatcha";
    useEffect(() => {
    const timer = setInterval(() =>{
        setDisplayedText(prev => {
            if (!isDeleting){
                if (prev.length < fullText.length){
                    return fullText.substring(0,prev.length +1);
                } else {
                    setIsDeleting(true);
                    return prev;
                }
            } else {
                if (prev.length > 0){
                    return prev.substring(0, prev.length -1);
                } else {
                    setIsDeleting(false);
                    return "";
                }
            }
        })
    },100);
    return () => clearInterval(timer);
},[isDeleting,fullText]);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') setActiveSection(prev => (prev < 2 ? prev + 1 : prev));
            if (e.key === 'ArrowLeft') setActiveSection(prev => (prev > 0 ? prev - 1 : prev));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[]);
    return (
            <div className="min-h-screen bg-[#121212] text-white font-sans antialiased">
                {/*Navbar*/}
                <nav className="bg-[#1e1e1e] border-b border-zinc-800 fixed w-full z-20 top-0 left-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/*Logo mastamacha*/}
                            <div className="flex-shrink-0 flex item-center">
                            <Link href="/">
                                <AplicationLogo className="block h-9 w-auto fill-current text-emerald-500"/>
                            </Link>
                            </div>
                            {/*Menu Utama*/}
                            <div className="hidden md:flex space-x-4 item-center">
                                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-emerald-400 text-zinc-400 hover:text-white">Home</Link>
                                <Link href="/produk" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400  hover:text-white">Produk</Link>
                                <Link href="/profile"className="px-3 py-2 rounded-md text-sm font-medium text-emerald-400 text-zinc-400 hover:text-white">Profile</Link>
                            </div>
                            {/*Menu Login & Register (Desktop)*/}
                        <div className="hidden md:flex items-center space-x-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-md">
                                    Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white transition">
                                    Log in</Link>
                                </>
                            )}
                        </div>
                            {/*Tombol Toggle Mobile*/}
                            <div className="md:hidden flex items-center">
                                <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition">
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={!isOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={isOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            {/*Teks Welcome*/}
            <main className="pt-24 flex items-center justify-center min-h-[60vh]">
                <div className="h-10">
                </div>
                <h2 className="text-4xl font-bold text-emerald-400 pr-2 animate-pulse">
                    {displayedText}
                </h2>
            </main>
                {/*Menu Dropdown Mobile*/}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-16 left-0 z-20 w-full bg-[#1e1e1e]/90 border-b border-zinc-800 shadow-xl`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:bg-zinc-900">Home</Link>
                        <Link href="/produk" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800">Produk</Link>
                        <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800">Profile</Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-zinc-800 px-4 space-y-2">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="block w-full text-center px-4 py-2 text-base font-medium text-zinc-300 hover:text-white transition">
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
}
