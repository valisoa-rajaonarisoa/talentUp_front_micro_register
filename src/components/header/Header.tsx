import { Link } from "react-router-dom";

import User from "./User";

type Props = {
  userInfo: {
    email: string;
    username: string;
    name: string;
    id: string | undefined;
  };
  handleLogout: () => void;
};

const Header: React.FC<Props> = ({ userInfo, handleLogout }: Props) => {
  //   **********************keycloak

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
