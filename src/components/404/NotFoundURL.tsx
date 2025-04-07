

type Props = {};

const NotFoundURL = ({}: Props) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white border border-gray-200 rounded-lg shadow-lg text-center space-y-6">
        {/* Icône d'erreur */}
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-800">404 - Page non trouvée</h1>

        {/* Message principal */}
        <p className="text-gray-600">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Veuillez vérifier l'URL ou retourner à la page d'accueil.
        </p>

        {/* Bouton pour revenir à la page d'accueil */}
        <button
          onClick={handleGoHome}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Retourner à la page d'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFoundURL;