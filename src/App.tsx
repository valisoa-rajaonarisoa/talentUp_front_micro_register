type Props = {};

import { useState } from "react";
import ButtonChoiceAccount from "./components/head/ButtonChoiceAccount";
import ApprenantForm from "./components/apprenant/ApprenantForm";

import { useKeycloak } from "./context/KeycloakContext";
import NavBar from "./components/header/NavBar";
import Entreprise from "./components/entreprise/Entreprise";

const App = ({}: Props) => {
  // **************************STATE*******
  const [choiceAccount, setChoiceAccount] = useState("entreprise");

  // ***************keycloak
  const { keycloak } = useKeycloak();

  console.log(keycloak?.token);
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
    <div className="bg-red-100 w-full bg-white">
      {/* ****header  */}
      <NavBar handleLogout={handleLogout} />

      <div className="bg-red-100 w-full bg-white py-16 mt-10  px-2 md:px-32 xl:px-62">
        <div className="bg-white shadow-lg rounded border border-gray-200 w-full p-1 md:p-6">
          <ButtonChoiceAccount
            choiceAccount={choiceAccount}
            setChoiceAccount={setChoiceAccount}
          />
          <div className="bg mt-5 w-full py-4">
            {choiceAccount == "entreprise" ? (
              // <EntrepriseForm token={keycloak?.token as string}/>
              <Entreprise token={keycloak?.token as string} />
            ) : (
              <ApprenantForm token={keycloak?.token as string} />
            )}
          </div>
        </div>
      </div>

      {/* ***********info */}
    </div>
  );
};

export default App;
