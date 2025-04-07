type Props = {};

import { useState } from "react";
import EntrepriseForm from "./components/entreprise/EntrepriseForm";
import ButtonChoiceAccount from "./components/head/ButtonChoiceAccount";
import ApprenantForm from "./components/apprenant/ApprenantForm";

const App = ({}: Props) => {
  // **************************STATE*******
  const [choiceAccount, setChoiceAccount] = useState("entreprise");
  return (
    <div className="bg-red-100 w-full bg-white py-16  px-2 md:px-32 xl:px-62">
      {/* ****header  */}
      <div className="bg-white shadow-lg rounded border border-gray-200 w-full p-1 md:p-6">
        <ButtonChoiceAccount
          choiceAccount={choiceAccount}
          setChoiceAccount={setChoiceAccount}
        />
        <div className="bg mt-5 w-full py-4">
          {choiceAccount == "entreprise" ? (
            <EntrepriseForm />
          ) : (
            <ApprenantForm />
          )}
        </div>
      </div>

      {/* ***********info */}
    </div>
  );
};

export default App;
