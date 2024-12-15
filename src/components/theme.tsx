'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeSwitcher = () => {
    const { theme, setTheme, resolvedTheme } = useTheme(); // resolvedTheme ensures correct theme after refresh
    // console.log(theme,resolvedTheme)
    useEffect(() => {
        setTheme(theme as string)
    }, [theme])


    const isActive = (btnTheme: string) => {
        if (btnTheme === 'system') return theme === 'system'; // System mode check
        return theme !== 'system' && resolvedTheme === btnTheme; // Prevent multiple highlights
    };

    return (
        <div className="flex justify-center fixed bottom-5 right-10 items-center bg-gray-200 dark:bg-black dark:border-[1px] dark:border-[#ffffff36] rounded-full p-[5px] shadow-lg w-fit">
            {/* Light Theme Button */}
            <button
                onClick={() => setTheme('light')}
                className={`flex justify-center items-center w-8 h-8 rounded-full ${isActive('light') ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`}
                aria-label="Light Mode"
            >
                <FiSun className="text-black dark:text-white" size={15} />
            </button>

            {/* System Theme Button */}
            <button
                onClick={() => setTheme('system')}
                className={`flex justify-center items-center w-8 h-8 rounded-full mx-2 ${isActive('system') ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`}
                aria-label="System Mode"
            >
                <FiMonitor className="text-black dark:text-white" size={15} />
            </button>

            {/* Dark Theme Button */}
            <button
                onClick={() => setTheme('dark')}
                className={`flex justify-center items-center w-8 h-8 rounded-full ${isActive('dark') ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`}
                aria-label="Dark Mode"
            >
                <FiMoon className="text-black dark:text-white" size={15} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
