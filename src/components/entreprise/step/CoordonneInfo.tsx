import React, { useEffect, useState } from "react";
import { TextField, Select, MenuItem, Checkbox, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import {
  CreateEntrepriseType,
  EntrepriseInfoWithValideSireneType,
} from "../../../typescript/module";

import Cookies from "js-cookie";
import { createEntrepriseApi } from "../../../apis/EntrepriseApis";
import toast from "react-hot-toast";

type FormData = {
  telephone: string;
  site_web: string | undefined;
  linkedin: string | undefined;
  nom_contact: string;
  fonction_contact: string;
};

type Props = {
  isNextStep: boolean;
  setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  entreprise: EntrepriseInfoWithValideSireneType | undefined;
  setEntreprise: React.Dispatch<
    React.SetStateAction<EntrepriseInfoWithValideSireneType | undefined>
  >;
};

const CoordonneInfo = ({
  isNextStep,
  setIsNextStep,
  token,
  entreprise,
  setEntreprise,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      telephone: "",
      site_web: undefined,
      linkedin: undefined,
      nom_contact: "",
      fonction_contact: "",
    },
  });

  //chargement

  const [isPedding, setIsPedding] = useState(false);
  // *************tester

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // Envoyer les données au backend ici

    // *************************** envoyer vers le back

    try {
      // Remplacer les champs vides par undefined

      setIsPedding(true);
      if (data.site_web?.trim() === "") {
        data.site_web = undefined;
      }

      if (data.linkedin?.trim() === "") {
        data.linkedin = undefined;
      }

      const new_entreprise: CreateEntrepriseType = {
        telephone: data.telephone,
        site_web: data.site_web,
        linkedin: data.linkedin,
        nom_contact: data.nom_contact,
        fonction_contact: data.fonction_contact,

        forme_juridique: entreprise?.forme_juridique as string,
        activite_entreprise: entreprise?.activite_entreprise as string,
        taille_entreprise: entreprise?.taille_entreprise as string,
        effectifs_entreprise: entreprise?.effectifs_entreprise as string,
        date_creation_entreprise:
          entreprise?.date_creation_entreprise as string,
        siret_entreprise: entreprise?.siret_entreprise as string,
        nic_entreprise: entreprise?.nic_entreprise as string,
        etat_administratif_entreprise:
          entreprise?.etat_administratif_entreprise as string,
        nom_entreprise: entreprise?.nom_entreprise as string,
        adresse_entreprise: entreprise?.adresse_entreprise as string,
        sirene_entreprise: entreprise?.sirene_entreprise as string,
      };

      const createEntreprise = await createEntrepriseApi(token, new_entreprise);

      if (createEntreprise) {
        //suppimer les cookies
        Cookies.remove("entrepriseInfo");

        //actualiser la page
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        toast.error("une erreur est survenue");
      }
    } finally {
      setIsPedding(false);
    }
  };

  //VERIFIER A CHAQUE RENDER QUE LES INFO SONT TOUJOURS LA
  useEffect(() => {
    if (Cookies.get("entrepriseInfo")) {
      setEntreprise(JSON.parse(Cookies.get("entrepriseInfo") as any));
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Titre */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Coordonnées de l'entreprise
      </h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Téléphone */}
        <div className="mb-4">
          <TextField
            id="telephone"
            label={
              <h3>
                Telephone <span className="text-red-400">*</span>
              </h3>
            }
            variant="outlined"
            placeholder="Entrez votre numéro de téléphone"
            fullWidth
            {...register("telephone", {
              required: "Le champ est obligatoire",
              pattern: {
                value: /^\d+$/,
                message: "Veuillez entrer un numéro valide",
              },
              minLength: {
                value: 10,
                message: "La longueur minimum est 10",
              },
              maxLength: {
                value: 15,
                message: "La longueur maxium est 15",
              },
            })}
            error={!!errors.telephone}
            helperText={errors.telephone?.message}
          />
        </div>

        {/* Site Web */}
        <div className="mb-4">
          <TextField
            id="siteWeb"
            variant="outlined"
            placeholder="Entrez l'URL de votre site web"
            label="site web"
            fullWidth
            {...register("site_web", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Veuillez entrer un site web  valide",
              },
            })}
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <TextField
            id="linkedin"
            variant="outlined"
            label="LinkedIn"
            placeholder="Entrez l'URL de votre profil LinkedIn"
            fullWidth
            {...register("linkedin", {
              pattern: {
                value: /^https:\/\/(www\.)?linkedin\.com\/[^\s]*$/,
                message: "Veuillez entrer un site web  valide",
              },
            })}
          />
        </div>

        {/* Contact Principal */}
        <div className="mb-4">
          <TextField
            id="contactPrincipal"
            variant="outlined"
            label={
              <h3>
                Nom et Prenom du contact <span className="text-red-400">*</span>
              </h3>
            }
            placeholder="Nom et prénom du contact principal"
            fullWidth
            {...register("nom_contact", {
              required: "Le nom est obligatoire",
              minLength: {
                value: 2,
                message: "la longueur minum est 2",
              },
              maxLength: {
                value: 200,
                message: "la longueur maximum est 200",
              },
            })}
            error={!!errors.nom_contact}
            helperText={errors.nom_contact?.message}
          />
        </div>

        {/* Fonction */}
        <div className="mb-4">
          <label>
            <h3>
              Fonction du contact<span className="text-red-400">*</span>
            </h3>
          </label>
          <Select
            id="fonction"
            variant="outlined"
            fullWidth
            defaultValue=""
            {...register("fonction_contact", {
              required: "Le champ est obligatoire",
            })}
            error={!!errors.fonction_contact}
          >
            <MenuItem value="" disabled>
              Sélectionnez la fonction
            </MenuItem>
            <MenuItem value="Directeur">Directeur</MenuItem>
            <MenuItem value="Responsable RH">Responsable RH</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Autre">Autre</MenuItem>
          </Select>
          {errors.fonction_contact && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fonction_contact.message}
            </p>
          )}
        </div>

        {/* Conditions Générales */}
        <div className="flex items-center mb-4">
          <Checkbox id="termsAccepted" required />
          <label
            htmlFor="termsAccepted"
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            J'accepte les conditions générales d'utilisation
          </label>
        </div>

        {/* Boutons */}
        <div className="flex flex-col md:flex-row">
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2, mr: 1 }}
            onClick={() => setIsNextStep(!isNextStep)}
          >
            <KeyboardBackspaceOutlinedIcon />
            Précédent
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 1 }}
            //chargement
            loading={isPedding}
          >
            Créer mon compte entreprise
            <EastOutlinedIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CoordonneInfo;
