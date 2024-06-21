import React from 'react'

export default function navbar() {
  return (
    <div>
      {/* creating a navbar  */}
        <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="navigation">
            <a href="/" className="pl-8">FlySmart</a>
            <div className="pr-8 md:hidden">
            <i className="fas fa-bars"></i>
            </div>
            <div className="pr-8 md:block hidden">
            <a href="/" className="p-4">Home</a>
            <a href="/" className="p-4">About</a>
            <a href="/" className="p-4">Services</a>
            <a href="/" className="p-4">Contact</a>
            </div>
            </nav>
    </div>
  )
}
