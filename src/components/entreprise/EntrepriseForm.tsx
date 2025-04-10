import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import SelectForm from "../SelectForm";
import { ActivitySecteur } from "../../data/ActivitySecteur";
import { Collaborateur } from "../../data/Collaborateur";
import { useForm, Controller } from "react-hook-form";

import { useState } from "react";
import PhoneInput from "../PhoneInput";
import { FormDataEntreprise, KeyType } from "../../typescript/module";
import { createEntreprise } from "../../apis/EntrepriseApis";

type Props = {
  token: string;
};


const EntrepriseForm = ({ token }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataEntreprise>({
    defaultValues: {
      nom_entreprise: "",
      numero_siret: "",
      secteur_activite: "",
      collaborateurs: "",
      adresse: "",
      telephone: "",
      site_web: "",
      linkedin: "",
      nom_contact: "",
      fonction_contact: "",
      description_entreprise: "",
      logo: null,
    },
  });

  // ***********************errors au bdd

  const [registerErrorBdd, setRegisterErrorBdd] = useState<any[]>([]);

  // ************************constante pour recuperer le num
  const [countryPhone, setCountryPhone] = useState("+33");

  //const create
  const onSubmit = async (entreprise: FormDataEntreprise) => {
    try {
      entreprise.telephone = countryPhone + " " + entreprise.telephone;

      const create = await createEntreprise(token, entreprise);

      if (create.status == 201) {
        window.location.reload(); //on actualise la page
      }
    } catch (error: any) {

      ///on regarde si le micro_service envoye un err 
      if (error.response) {
       
        setRegisterErrorBdd(error.response.data);
      } else {
        console.error(error);
        alert("Une erreur est survenue ");
        throw new Error("Erreur lors de l'inscription entreprise");
      }
    }
  };

  //fonction boolean pour l'err
  const isErrorKey=(key: KeyType)=>{
    let error = false;
    registerErrorBdd.forEach((element) => {
      if (Object.keys(element)[0] == key) {
        error = true;
      }
    });
    return error;
  }

  //afficher l'err
  const getErrorKey=(key:KeyType)=>{
    let message = "";
    registerErrorBdd.forEach((element) => {
      if (Object.keys(element)[0] == key) {
        message = element[key];
      }
    });

    return message;
  }

  console.log(registerErrorBdd)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* **************INFORMATION GÉNÉRALE */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Information générale
        </h3>
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          {/* Nom de l'entreprise */}
          <div className="w-full md:w-[50%]">
            <TextField
              id="companyName"
              label={
                <h3>
                  Nom de l'entreprise <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("nom_entreprise", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.nom_entreprise || isErrorKey("nom_entreprise")}
              helperText={
                errors.nom_entreprise?.message || getErrorKey("nom_entreprise")
              }
            />
          </div>
          {/* Numéro SIRET */}
          <div className="w-full md:w-[50%]">
            <TextField
              id="siretNumber"
              label={
                <h3>
                  Numéro SIRET <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("numero_siret", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.numero_siret || isErrorKey("numero_siret")}
              helperText={
                errors.numero_siret?.message || getErrorKey("numero_siret")
              }
            />
          </div>
        </div>
        {/* Secteur d'activité */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            <Controller
              name="secteur_activite"
              control={control}
              rules={{ required: "Ce champ est obligatoire" }}
              render={({ field }) => (
                <SelectForm
                  label={
                    <h3>
                      Secteur d'activité <span className="text-red-400">*</span>
                    </h3>
                  }
                  options={ActivitySecteur}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
            {errors.secteur_activite && (
              <p className="text-red-500 text-sm">
                {errors.secteur_activite.message} || {getErrorKey("secteur_activite")}
              </p>
            )}
          </div>
          {/* Nombre de collaborateurs */}
          <div className="w-full md:w-[50%]">
            <Controller
              name="collaborateurs"
              rules={{ required: "Ce champ est obligatoire" }}
              control={control}
              render={({ field }) => (
                <SelectForm
                  label={
                    <h3>
                      Nombre de collaborateurs{" "}
                      <span className="text-red-400">*</span>{" "}
                    </h3>
                  }
                  options={Collaborateur}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
            {errors.collaborateurs && (
              <p className="text-red-500 text-sm">
                {errors.collaborateurs.message} || {getErrorKey("collaborateurs")}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* **************COORDONNÉES */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">Coordonnées</h3>
        {/* Adresse complète */}
        <div className="w-full mb-4 md:md-6">
          <TextField
            id="address"
            label={
              <h3>
                Adresse complète <span className="text-red-400">*</span>
              </h3>
            }
            multiline
            maxRows={4}
            sx={{ width: "100%" }}
            {...register("adresse", { required: "Ce champ est obligatoire" })}
            error={!!errors.adresse || isErrorKey("adresse")}
            helperText={errors.adresse?.message || getErrorKey("adresse")}
          />
        </div>
        {/* Téléphone et site web */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row md:mb-6">
          <div className="w-full md:w-[50%]">
            <PhoneInput
              register={register as any}
              errors={errors}
              countryPhone={countryPhone}
              setCountryPhone={setCountryPhone}

              getErrorKey={getErrorKey}
              isErrorKey={isErrorKey}

            />
          </div>
          <div className="w-full md:w-[50%]">
            <TextField
              id="site_web"
              label={<h3>Site web</h3>}
              variant="outlined"
              className="w-full"
              {...register("site_web")}

              error={isErrorKey("site_web")}
              helperText={getErrorKey("site_web")}
            />
          </div>
        </div>
        {/* LinkedIn */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4 mt-4">
          <div className="w-full md:w-[50%]">
            <TextField
              id="linkedin"
              label={<h3>LinkedIn</h3>}
              variant="outlined"
              className="w-full"
              {...register("linkedin")}

              error={isErrorKey("linkedin")}
              helperText={getErrorKey("linkedin")}
            />
          </div>
        </div>
      </div>
      {/* **************CONTACT PRINCIPAL */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Contact principal
        </h3>
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            <TextField
              id="contactName"
              label={
                <h3>
                  Nom et prénom <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("nom_contact", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.nom_contact || isErrorKey("nom_contact")}
              helperText={errors.nom_contact?.message || getErrorKey("nom_contact")}
            />
          </div>
          <div className="w-full md:w-[50%]">
            <TextField
              id="contactFunction"
              label={
                <h3>
                  Fonction <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("fonction_contact", {
                required: "ce champ est obligatoire",
              })}
              error={!!errors.fonction_contact || isErrorKey("fonction_contact")}
              helperText={errors.fonction_contact?.message || getErrorKey("fonction_contact")}
            />
          </div>
        </div>
      </div>
      {/* **************PRÉSENTATION */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">Présentation</h3>
        {/* Description de l'entreprise */}
        <div className="w-full mb-4">
          <TextField
            id="companyDescription"
            label={
              <h3>
                Présentation de l'entreprise{" "}
                <span className="text-red-400">*</span>
              </h3>
            }
            variant="outlined"
            className="w-full"
            multiline
            maxRows={5}
            {...register("description_entreprise", {
              required: "Ce champ est obligatoire",
            })}
            error={!!errors.description_entreprise || isErrorKey("description_entreprise")}
            helperText={errors.description_entreprise?.message || getErrorKey("description_entreprise")}
          />
        </div>
        {/* Upload du logo */}
        <div className="w-full">
          <label
            htmlFor="logo-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Logo de l'entreprise <span className="text-red-400">*</span>
          </label>
          <input
            type="file"
            id="logo-upload"
            accept=".jpg,.jpeg,.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("logo", {
              required: "Le logo est obligatoire",
              validate: (value) => {
                if (!value || value.length === 0) {
                  return "Veuillez sélectionner un fichier";
                }
                return true;
              },
            })}
          />
          {errors.logo && (
            <p className="text-red-500 text-sm">{errors.logo.message}</p>
          )}
        </div>
      </div>
      {/* **************CONDITIONS ET CONFIDENTIALITÉ */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Conditions et confidentialité
        </h3>
        <div className="flex flex-col">
          <FormControlLabel
            control={<Checkbox required/>}
            label={
              <h3>
                J'accepte{" "}
                <span className="text-blue-500">
                  les Conditions générales d'utilisation{" "}
                  <span className="text-red-400">*</span>{" "}
                </span>{" "}
              </h3>
            }
          />
          <FormControlLabel
            control={<Checkbox required/>}
            label={
              <h3>
                Je consens au traitement de mes données conformément à la{" "}
                <span className="text-blue-500">
                  Politique de confidentialité{" "}
                  <span className="text-red-400">*</span>{" "}
                </span>
              </h3>
            }
          />
        </div>
      </div>
      {/* **************BOUTON DE SOUMISSION */}
      <div>
        <Button type="submit" variant="outlined">
          Créer mon compte entreprise
        </Button>
      </div>
    </form>
  );
};

export default EntrepriseForm;
