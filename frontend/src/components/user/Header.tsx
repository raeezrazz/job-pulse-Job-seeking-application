function Header() {
    return (
        <header className="sticky max-w-[85%] mx-auto text-sky-500 p-4 flex justify-between items-center bg-white shadow-md">
        <div className="text-2xl font-bold">
          JobPulse
        </div>
        <div className="flex space-x-8 text-lg">
        <a href="#home" className="text-black hover:text-blue-500">Home</a>
        <a href="#about" className="text-black hover:text-blue-500">About</a>
        <a href="#jobs" className="text-black hover:text-blue-500">Jobs</a>
      </div>
        <div className="flex space-x-4">
        <button className="bg-orange-600 hover:bg-orange-600 text-white font-semibold py-1 px-4 rounded-md">
  Join Now
</button>

        </div>
      </header>
    );
  }
  
  export default Header;
  