import { FormDataEntreprise } from "../typescript/module";

import axios from "axios";
const URL_API = import.meta.env.VITE_API_BACK;

export const createEntreprise = (
  token: string,
  entreprise: FormDataEntreprise
) => {
  return axios.post(`${URL_API}/talentEntreprise/createEntreprise`, entreprise, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
