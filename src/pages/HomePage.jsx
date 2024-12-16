function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400">
      <div className="bg-white max-w-md w-full p-10 rounded-lg shadow-lg border-2 border-orange-500">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 my-3">MarketPlace</h1>
        
        <div>
          <p className="gap-x-9 text-justify text-sm text-gray-700 mt-5 mb-4">
            Tu tienda online, fácil, rápida y segura en un solo clic. <br />
            ¡Conoce la mejor experiencia de compra con nosotros!
          </p>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
          <p className="text-center text-xs text-gray-500">
            Derechos Reservados CAHG &#9400; 2023
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
