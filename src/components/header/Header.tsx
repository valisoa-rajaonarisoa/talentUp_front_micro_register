import { Link } from "react-router-dom";
import { useKeycloak } from "../../context/KeycloakContext";
import User from "./User";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  //   **********************keycloak
  const { keycloak } = useKeycloak();

  let userInfo = {
    email: "",
    username: "",
    name: "",
    id: "" as string | undefined,
  };
  if (keycloak) {
    //  *************recuperation user ***

    userInfo.email = keycloak.idTokenParsed?.email;
    userInfo.username = keycloak.idTokenParsed?.preferred_username;
    userInfo.id = keycloak.idTokenParsed?.sub;

    if (userInfo.email) {
      userInfo.name = userInfo.email
        .split("@")[0]
        .substring(0, 2)
        .toUpperCase();
    }
  }

  //   ********************keycloak
  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({
        redirectUri: import.meta.env.VITE_SERVICE_LOGOUT,
      });
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-400 text-white z-50 shadow-md">
      {/* Conteneur principal */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Text Talnetup */}
        <div className="flex items-center space-x-2">
          <Link to={import.meta.env.SERVICE_LOGOUT}>
            <h1 className="text-xl font-bold">TalentUp</h1>
          </Link>
        </div>
        <div>
          <User userInfo={userInfo} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
