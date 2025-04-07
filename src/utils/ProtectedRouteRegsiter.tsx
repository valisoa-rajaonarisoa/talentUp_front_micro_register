import { useKeycloak } from "../context/KeycloakContext";
import Loader from "../components/loader/Loader";

type Props = {
  children: React.ReactNode;
};
const ProtectedRouteRegister = ({ children }: Props) => {
  //   ****************initialisation de keycloak ***********
  const { keycloak, keycloakInitialized } = useKeycloak();

  // ***********chargement de kc*****
  if (!keycloakInitialized) return <Loader />;

  // ****************si il est authentifié ***
  if (keycloak != null && keycloak.authenticated) {
    //   ****************verification du roles**
    if (keycloak.realmAccess?.roles.includes("anonyme")) {
      // ****return le children
      return children;
    } else {
      return (window.location.href = import.meta.env.VITE_SERVICE_HOST);
    }
    //   ************si non au page navigation ************
  } else {
    return (window.location.href = import.meta.env.VITE_SERVICE_HOST);
  }
};

export default ProtectedRouteRegister;
