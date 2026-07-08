import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AplicationLogo from '@/Components/ApplicationLogo';
export default function Welcome({auth}) {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const fullText="Welcome to MastaMacha";

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let timer;

        const handleTyping = () => {
            const currentText = isDeleting
                ? fullText.substring(0, index - 1)
                : fullText.substring(0, index + 1);
            setText(currentText);

            if (!isDeleting && currentText === fullText) {
                isDeleting = true;
                index = index + 1;
                timer = setTimeout(handleTyping, 1500);
                return;
            }

            if (isDeleting && currentText === '') {
                isDeleting = false;
                index = index - 1;
                timer = setTimeout(handleTyping, 100);
                return;
            }

            index = isDeleting ? index - 1 : index + 1;
            timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
        };

        timer = setTimeout(handleTyping, 1000);
        return () => clearTimeout(timer);
    }, [fullText])
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
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-emerald-400 hover:bg-zinc-900">Home</Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition">About</Link>
                            <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition">Profile</Link>
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
                                    <Link href={route('register')} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-md">
                                    Register</Link>
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
                <h1 className="text-4xl font-bold text-emerald-400 pr-2 animate-pulse">
                    {text}</h1>
            </main>
            {/*Menu Dropdown Mobile*/}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-16 left-0 z-20 w-full bg-[#1e1e1e]/90 border-b border-zinc-800 shadow-xl`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:bg-zinc-900">Home</Link>
                    <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800">About</Link>
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
                                <Link href={route('register')} className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-md">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
            </div>
        </div>
    );
}
