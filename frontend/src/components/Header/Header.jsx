import React from "react";

function Header() {
  return (
    <div className="mb-[4.5rem]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[4.5rem]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-2 md:px-6">
          {/* Logo & School Name */}
          <div className="flex items-center gap-2 md:gap-3 h-full"style={{ marginLeft: '-2rem' }}>
            <img
              src="logo3.png"
              alt="Logo"
              className="mt-2 w-[9rem] h-[9rem] rounded-md object-cover"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-16">
            {["Home", "About Us"].map((item) => (
              <div key={item} className="relative group py-2">
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-m font-medium text-gray-800 transition hover:text-[#1a237e] tracking-wide no-underline"
                >
                  {item}
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a237e] transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}

            {/* Login Button */}
            <div>
              <a
                href="#login"
                className="text-white bg-blue-600 text-base lg:text-lg font-semibold border border-blue-600 px-8 py-2 hover:bg-blue-700 rounded-full transition duration-300 shadow-lg no-underline"
              >
                Login
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;