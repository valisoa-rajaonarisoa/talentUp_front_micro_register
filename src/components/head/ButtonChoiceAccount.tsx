
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
type Props = {
    choiceAccount:string;
     setChoiceAccount:React.Dispatch<React.SetStateAction<string>>;
};

const ButtonChoiceAccount = ({choiceAccount,setChoiceAccount}: Props) => {
 
  return (
    <div className=" w-full flex overflow-hidden cursor-pointer">
      <button
        className={`w-[50%] flex items-center py-2 pt-4 justify-center space-x-2 transition-all duration-300 ease-in-out ${
          choiceAccount === "entreprise"
            ? "border-b-3 border-blue-400  shadow-md"
            : "border-b-2 border-gray-200 hover:bg-blue-100"
        }`}
        onClick={() => setChoiceAccount("entreprise")}
      >
        <BusinessOutlinedIcon
          className={`${
            choiceAccount === "entreprise" ? "text-blue-400" : "text-gray-400"
          }`}
        />
        <h3
          className={`text-sm md:text-sm font-medium  ${
            choiceAccount === "entreprise" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          Entreprise
        </h3>
      </button>

      <button
        className={`w-[50%] flex items-center py-2 pt-4 justify-center space-x-2 transition-all duration-300 ease-in-out ${
          choiceAccount != "entreprise"
            ? "border-b-3 border-blue-400  shadow-md"
            : "border-b-2 border-gray-200 hover:bg-blue-100"
        }`}
        onClick={() => setChoiceAccount("apprenant")}
      >
        <SchoolOutlinedIcon
          className={`${
            choiceAccount != "entreprise" ? "text-blue-400" : "text-gray-400"
          }`}
        />
        <h3
          className={`text-sm md:text-sm  font-medium  ${
            choiceAccount != "entreprise" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          Apprenant
        </h3>
      </button>
    </div>
  );
};

export default ButtonChoiceAccount;
