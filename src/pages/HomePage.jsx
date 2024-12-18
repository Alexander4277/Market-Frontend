
function HomePage() {
  return (
    <div className="bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 h-screen flex flex-col items-center">
      <div class="text-4xl font-extrabold text-center text-orange-900 my-3">¡Compra y ahorra en MarketPlace. ¡Lo que buscas está aquí! 
        </div>

      <div className="w-full overflow-hidden mt-10">
        <div className="flex justify-center space-x-12">

          <div className="text-center text-black text-2xl">
          <img
            src="/img/mouse.webp"
            alt="Imagen 1"
            className="max-w-sm max-h-48 object-contain"
          /> Electronicos
          </div>

          <div className="text-center text-black text-2xl">
          <img
            src="/img/Licuadora.webp"
            alt="Imagen 2"
            className="max-w-sm max-h-48 object-contain"
          /> Electrodomesticos
        </div>

        <div className="text-center text-black text-2xl">
          <img
            src="/img/creatina.webp"
            alt="Imagen 3"
            className="max-w-sm max-h-48 object-contain"
          />
          Gimnasio
          </div>
        </div>
      </div>

      <div className="bg-white w-full p-6 rounded-none shadow-md border-b-4 border-orange-500 mt-32">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 my-3">
          MarketPlace
        </h1>
        <p className="text-center text-sm text-gray-700 mt-3">
          Tu tienda online, fácil, rápida y segura en un solo clic. <br />
          ¡Conoce la mejor experiencia de compra con nosotros!
        </p>
      </div>
      <p className="text-center text-x text-gray-500 mt-4">
        Derechos Reservados CAHG &#9400; 2024
      </p>
    </div>
  );
}

export default HomePage;



/*function HomePage() {
  return (
    <div className="bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 h-screen flex flex-col justify-between">
      {}
      <div className="flex-grow"></div> {}
      <div className="bg-white w-full p-6 rounded-none shadow-md border-t-4 border-orange-500 mb-40">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 my-3">
          MarketPlace
        </h1>
        <p className="text-center text-sm text-gray-700 mt-10">
          Tu tienda online, fácil, rápida y segura en un solo clic. <br />
          ¡Conoce la mejor experiencia de compra con nosotros!
        </p>
      </div>
      {}
      <p className="text-center text-xs text-gray-500 mt-2 mb-4">
        Derechos Reservados CAHG &#9400; 2023
      </p>
    </div>
  );
}

export default HomePage;
*/