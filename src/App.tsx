import React from "react";
import logo from "./logo.svg";

function App() {
    return (
        <div className='text-center'>
            <header className='flex flex-col items-center justify-center min-h-screen text-white text-[calc(10px+2vmin)] bg-[#282c34]'>
                <img
                    src={logo}
                    className='motion-safe:animate-[spin_20s] duration-1000 h-[40vmin] pointer-events-none'
                    alt='logo'
                />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className='text-[#61dafb] hover:underline'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Learn React
                </a>
                <a
                    className='text-sky-400 hover:underline'
                    href='https://tailwindcss.com/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Learn Tailwind
                </a>
            </header>
        </div>
    );
}

export default App;
