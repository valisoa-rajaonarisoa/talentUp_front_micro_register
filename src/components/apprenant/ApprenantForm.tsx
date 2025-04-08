import {
  Button,
  Checkbox,
  FormControlLabel,
  // styled,
  TextField,
} from "@mui/material";
import SelectForm from "../SelectForm";

import { ActivitySecteur } from "../../data/ActivitySecteur";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import PhoneInput from "../PhoneInput";
import { FormDataApprenant } from "../../typescript/module";
type Props={
  token:string
}

const ApprenantForm = ({token}:Props) => {

  console.log(token)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataApprenant>({
    defaultValues: {
      nom: "",
      prenom: "",
      date_naissance: "",
      telephone: "",
      ville: "",
      niveau_etude: "",
      specialite: "",
      cv: null,
      photo: null,
      presentation: "",
      linkedin: "",
      portfolio: "",
      objectives: [],
    },
  });

  const [countryPhone, setCountryPhone] = useState("+33");

  const onSubmit = (data: FormDataApprenant) => {
    data.telephone = countryPhone + data.telephone;

    console.log("Données du formulaire :", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* **************INFORMATION PERSONNELLE */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Informations personnelles
        </h3>

        {/* *********************Nom et Prénom */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            <TextField
              id="lastName"
              label={
                <h3>
                  Nom <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("nom", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.nom}
              helperText={errors.nom?.message}
            />
          </div>

          <div className="w-full md:w-[50%]">
            <TextField
              id="prenom"
              label={<h3>Prénom(s)</h3>}
              variant="outlined"
              className="w-full"
              {...register("prenom")}
            />
          </div>
        </div>

        {/* *********************Date de Naissance */}
        <div className="w-full md:w-[70%] mb-4">
          <label
            htmlFor="date-of-birth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date de naissance *
          </label>
          <input
            type="date"
            id="date-of-birth"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("date_naissance", {
              required: "Ce champ est obligatoire",
            })}
          />
          {errors.date_naissance && (
            <p className="text-red-500 text-sm">
              {errors.date_naissance.message}
            </p>
          )}
        </div>

        {/* *********************Téléphone et Ville */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            <PhoneInput
              register={register as any}
              errors={errors}
              countryPhone={countryPhone}
              setCountryPhone={setCountryPhone}
            />
          </div>

          <div className="w-full md:w-[50%]">
            <TextField
              id="city"
              label={
                <h3>
                  Ville / Région <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("ville", { required: "Ce champ est obligatoire" })}
              error={!!errors.ville}
              helperText={errors.ville?.message}
            />
          </div>
        </div>
      </div>

      {/* ********************************P A R C O U R S ******** */}
      <div>
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Parcours académique
        </h3>

        {/* *********************Niveau d'études et Spécialité */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          {/* Niveau d'études */}
          <div className="w-full md:w-[50%]">
            <Controller
              name="niveau_etude"
              control={control}
              rules={{ required: "Ce champ est obligatoire" }}
              render={({ field }) => (
                <SelectForm
                  label={
                    <h3>
                      Niveau d'études <span className="text-red-400">*</span>
                    </h3>
                  }
                  options={ActivitySecteur}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
            {errors.niveau_etude && (
              <p className="text-red-500 text-sm">
                {errors.niveau_etude.message}
              </p>
            )}
          </div>

          {/* Spécialité / Domaine */}
          <div className="w-full md:w-[50%]">
            <TextField
              id="specialite"
              label={
                <h3>
                  Spécialité / Domaine <span className="text-red-400">*</span>
                </h3>
              }
              variant="outlined"
              className="w-full"
              {...register("specialite", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.specialite}
              helperText={errors.specialite?.message}
            />
          </div>
        </div>

        {/* **************************UPLOAD FICHIER */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            {/* Upload CV PDF */}
            <label
              htmlFor="cv-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Télécharger votre CV (PDF) *
            </label>
            <input
              type="file"
              id="cv-upload"
              accept=".pdf"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("cv", { required: "Ce champ est obligatoire" })}
            />
            {errors.cv && (
              <p className="text-red-500 text-sm">{errors.cv.message}</p>
            )}
          </div>

          <div className="w-full md:w-[50%]">
            {/* Upload Photo */}
            <label
              htmlFor="photo-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Télécharger votre photo (JPG/PNG) *
            </label>
            <input
              type="file"
              id="photo-upload"
              accept=".jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("photo", { required: "Ce champ est obligatoire" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* **************************************P R E N S T A T I O N ET L I E N ******************* */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Présentation et liens
        </h3>

        <div className="w-full mb-4">
          <TextField
            id="presentation"
            label={
              <h3>
                Courte présentation <span className="text-red-400">*</span>
              </h3>
            }
            variant="outlined"
            className="w-full"
            multiline
            maxRows={5}
            placeholder="Parlez-nous de vous, votre parcours et de vos aspirations "
            {...register("presentation", {
              required: "Ce champ est obligatoire",
            })}
            error={!!errors.presentation}
            helperText={errors.presentation?.message}
          />
        </div>

        {/* Lien LinkedIn */}
        {/* Portfolio, GitHub ou site personnel */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-[50%]">
            <TextField
              id="linkedin"
              label={<h3>Lien LinkedIn</h3>}
              variant="outlined"
              className="w-full"
              {...register("linkedin")}
            />
          </div>

          <div className="w-full md:w-[50%]">
            <TextField
              id="portfolio"
              label={<h3>Portfolio, GitHub ou site personnel</h3>}
              variant="outlined"
              className="w-full"
              {...register("portfolio")}
            />
          </div>
        </div>
      </div>

      {/* **********************O B J E C T I F S************* */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">Objectifs</h3>

        <h3>
          Objectif principal (plusieurs choix possibles){" "}
          <span className="text-red-400">*</span>
        </h3>
        <div className="flex flex-col mt-3">
          <FormControlLabel
            control={<Checkbox />}
            label={<h5 className="text-sm text-gray-500">Chercher un stage</h5>}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <h5 className="text-sm text-gray-500">Suivre une formation</h5>
            }
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <h5 className="text-sm text-gray-500">Partager des tutoriels</h5>
            }
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <h5 className="text-sm text-gray-500">Découvrir des métiers</h5>
            }
          />
        </div>
      </div>

      {/* *********************Conditions */}
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg font-bold text-blue-500 mb-4">
          Conditions et confidentialité
        </h3>
        <div className="flex flex-col">
          <FormControlLabel
            control={<Checkbox />}
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
            control={<Checkbox />}
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
          Créer mon compte apprenant
        </Button>
      </div>
    </form>
  );
};

export default ApprenantForm;
