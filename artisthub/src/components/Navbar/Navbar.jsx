export const Navbar = ({ path, title }) => {
    
  
    return (
     <header class="bg-gray-800">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="text-white font-bold text-xl">
          <a href="#">Artisthub</a>
        </div>
        <div class="hidden md:block">
          <ul class="flex items-center space-x-8">
            <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#" class="text-white hover:text-gray-300">Register</a></li>
            <li><a href="#" class="text-white hover:text-gray-300">Login</a></li>
          </ul>
        </div>
        <div class="md:hidden">
          <button class="outline-none mobile-menu-button">
            <svg class="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="mobile-menu hidden md:hidden">
        <ul class="mt-4 space-y-4">
          <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Home</a></li>
          <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">About</a></li>
          <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Services</a></li>
          <li><a href="#" class="block px-4 py-2 text-white bg-gray-900 rounded hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>
    );
  };
  