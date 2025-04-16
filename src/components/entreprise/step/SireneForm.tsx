import { Button, TextField } from "@mui/material";
import CountrySelect from "./CountrySelect";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  CountryType,
  EntrepriseInfoWithValideSireneType,
  FormDataSirene,
} from "../../../typescript/module";
import { useEffect, useState } from "react";
import { isValideSireneApi } from "../../../apis/EntrepriseApis";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
// Définition du type de données du formulaire
type Props = {
  isNextStep: boolean;
  setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  entreprise: EntrepriseInfoWithValideSireneType | undefined;
  setEntreprise: React.Dispatch<
    React.SetStateAction<EntrepriseInfoWithValideSireneType | undefined>
  >;
};
const SireneForm = ({ isNextStep, setIsNextStep, token ,entreprise,setEntreprise}: Props) => {
  // Initialisation de React Hook Form
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSirene>({
    defaultValues: {
      pays: null,
      numero_sirene: entreprise?.sirene_entreprise,
    },
  });

  // Gestion de la soumission du formulaire

  //state de chargement
  // ******************verification
  const [isSireneValide, setIsSireneValide] = useState(false);
  const [isPedding, setIsPedding] = useState(false);
  // const [isError, setIsError] = useState(false);

  const onSubmit: SubmitHandler<FormDataSirene> = async (
    data: FormDataSirene
  ) => {
    try {
      //se charge
      setIsPedding(true);

      //envoyer le sirene au bdd
      const response = await isValideSireneApi(token, data.numero_sirene);

      //pas d'err alors on l'enregistre dans le cookies
      const entrepriseInfo = response.data.data;

      //enregistrement dans le cookies
      Cookies.set("entrepriseInfo", JSON.stringify(entrepriseInfo), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      //si c'est bien enregistré alors on , verifier encore
      if (Cookies.get("entrepriseInfo")) {
        toast.success("sirene validé ");

        setIsSireneValide(true);

        setEntreprise(JSON.parse(Cookies.get("entrepriseInfo") as any));
      }

      // console.log(Cookies.get("entrepriseInfo"))
    } catch (error: any) {
      if (error.response.status == 404) {
        toast.error("adresse sirene non trouvé");
      } else if (error.response.status == 400) {
        toast.error("adresse sirene non trouvé");
      } else {
        toast.error("une erreur est survenue");
        if (error.request) {
          //pas de connexion par rapport au bdd

          toast.error(
            "le serveur ne repond pas, veuillez contacter l'administrateur"
          );
        }
      }
    } finally {
      //fini de se charger
      setIsPedding(false);
    }
  };

  //VERIFIER A CHAQUE RENDER QUE LES INFO SONT TOUJOURS LA
  useEffect(() => {
    if (Cookies.get("entrepriseInfo")) {
      setIsSireneValide(true);

      setEntreprise(JSON.parse(Cookies.get("entrepriseInfo") as any));
    }
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Titre */}
      <h1 className="text-2xl font-semibold text-blue-700 text-center">
        Création de compte entreprise
      </h1>

      {/* Formulaire */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Étape 1 : Informations initiales */}
        <div className="flex flex-col  md:flex-row md:space-x-3">
          {/* Sélection du pays */}

          <div className="w-full md:flex-row mb-4 md:mb-0">
            <Controller
              name="pays"
              rules={{ required: "le pays est obligatoire" }}
              control={control}
              render={({ field }) => (
                <CountrySelect
                  value={field.value}
                  isSireneValide={isSireneValide}
                  onChange={(newValue: CountryType) => field.onChange(newValue)}
                />
              )}
            />
            {/* CountrySelect register={register} errors={errors}  */}
          </div>

          {/* Numéro SIREN */}
          <div className="w-full md:flex-row">
            <TextField
              id="siretNumber"
              label={
                <h3>
                  Numéro SIRENE <span className="text-red-400">*</span>
                </h3>
              }
              type="number"
              placeholder={"numero siren par exemple 123456789"}
              variant="outlined"
              className="w-full"
              //il va etre desactiver si la sirene est valide, et on a cliqué
              disabled={isSireneValide}
              //defaut
              defaultValue={entreprise?.sirene_entreprise}
              {...register("numero_sirene", {
                required: "Ce champ est obligatoire",
                maxLength: { value: 9, message: "9 chiffres" },
                minLength: { value: 9, message: "9 chiffres" },
              })}
              error={!!errors.numero_sirene}
              helperText={errors.numero_sirene?.message}
            />
            <p className="text-xs text-gray-500 mt-1">
              Le numéro SIREN identifie votre entreprise. Il est composé de 9
              chiffres.
            </p>
          </div>
        </div>

        {/* Bouton Valider */}
        <div className="flex flex-col  md:flex-row md:space-x-3 md:justify-end">
          {!isSireneValide ? (
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-md transition duration-300"
              loading={isPedding}
            >
              suivant
            </Button>
          ) : (
            <div className="bg-green-100 border border-green-300 rounded-xl p-4 space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-700">
                  Entreprise trouvée
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                L'entreprise sélectionnée est{" "}
                <strong>{entreprise?.nom_entreprise}</strong>. Est-ce correct ?
              </p>

              <div className="flex flex-col md:flex-row ">
                <Button
                  variant="outlined"
                  color="error"
                  className="md:mb-0"
                  sx={{ mt: 2, mr: 1 }}
                  onClick={() => {
                    // Si on annule
                    setIsSireneValide(false);
                    Cookies.remove("entrepriseInfo");
                    reset();
                  }}
                >
                  Non, annuler
                </Button>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  className="bg-blue-500  hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  onClick={() => setIsNextStep(!isNextStep)}
                >
                  Oui, continuer
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SireneForm;
