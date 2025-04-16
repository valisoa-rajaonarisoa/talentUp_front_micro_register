import { CreateEntrepriseType} from "../typescript/module";

import axios from "axios";
const URL_API = import.meta.env.VITE_API_BACK;






// **************************sirene 
export const isValideSireneApi= (
  token: string,
  sirene_entreprise:number | string
) => {
  return axios.post(`${URL_API}/talentEntreprise/sirene/${sirene_entreprise}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createEntrepriseApi = (
  token: string,
  entreprise: CreateEntrepriseType
) => {
  return axios.post(`${URL_API}/talentEntreprise/createEntreprise`, entreprise, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

