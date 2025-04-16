import { useState } from "react";
import CoordonneInfo from "./step/CoordonneInfo";
import SireneForm from "./step/SireneForm";
import { EntrepriseInfoWithValideSireneType } from "../../typescript/module";

type Props = {
  token: string;
};

const Entreprise = ({ token }: Props) => {
  const [isNextStep, setIsNextStep] = useState(false);

  const [entreprise, setEntreprise] =
    useState<EntrepriseInfoWithValideSireneType>();
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      {/* Conteneur principal */}

      {!isNextStep ? (
        <SireneForm
          isNextStep={isNextStep}
          setIsNextStep={setIsNextStep}
          token={token}

          
          entreprise={entreprise}
          setEntreprise={setEntreprise}
        />
      ) : (
        <CoordonneInfo
          isNextStep={isNextStep}
          setIsNextStep={setIsNextStep}
          token={token}

          entreprise={entreprise}
          setEntreprise={setEntreprise}
        />
      )}
    </div>
  );
};

export default Entreprise;
