import React from 'react'

function Footer() {
    return (
        <footer className="bg-[#D32F2F] rounded-md shadow m-4 mt-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center ">©{new Date().getFullYear()}<a href="https://foodydost.vercel.app/" className="hover:underline">FoodyDost</a> All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
                <li>
                    <a href="https://linkedin.com/in/uditdev" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="https://github.com/uditdev1" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li className='max-sm:flex max-sm:flex-row max-sm:w-[10rem]'>
                    <a href="https://github.com/uditdev1/FoodyDost" className="hover:underline me-4 md:me-6">Project Repository</a>
                </li>
            </ul>
            </div>
        </footer>
    )
}

export default Footer
