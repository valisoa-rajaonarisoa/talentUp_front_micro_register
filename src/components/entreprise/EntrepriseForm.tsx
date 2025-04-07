import {
    Button,
    Checkbox,
    FormControlLabel,
    styled,
    TextField,
  } from "@mui/material";
  import SelectForm from "../SelectForm";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import { ActivitySecteur } from "../../data/ActivitySecteur";
  import { Collaborateur } from "../../data/Collaborateur";
  import { useForm, Controller } from "react-hook-form";
  
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  
  type FormData = {
    companyName: string;
    siretNumber: string;
    activitySector: string;
    collaborators: string;
    address: string;
    phone: string;
    website: string;
    linkedin: string;
    contactName: string;
    contactFunction: string;
    companyDescription: string;
    logo: FileList | null;
  };
  
  const EntrepriseForm = () => {
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        companyName: "",
        siretNumber: "",
        activitySector: "",
        collaborators: "",
        address: "",
        phone: "",
        website: "",
        linkedin: "",
        contactName: "",
        contactFunction: "",
        companyDescription: "",
        logo: null,
      },
    });
  
    const onSubmit = (data: FormData) => {
      console.log("Données du formulaire :", data);
    };
  
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
                {...register("companyName", {
                  required: "Ce champ est obligatoire",
                })}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
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
                {...register("siretNumber", {
                  required: "Ce champ est obligatoire",
                })}
                error={!!errors.siretNumber}
                helperText={errors.siretNumber?.message}
              />
            </div>
          </div>
          {/* Secteur d'activité */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-[50%]">
              <Controller
                name="activitySector"
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
              {errors.activitySector && (
                <p className="text-red-500 text-sm">
                  {errors.activitySector.message}
                </p>
              )}
            </div>
            {/* Nombre de collaborateurs */}
            <div className="w-full md:w-[50%]">
              <Controller
                name="collaborators"
                control={control}
                render={({ field }) => (
                  <SelectForm
                    label={<h3>Nombre de collaborateurs</h3>}
                    options={Collaborateur}
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />
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
              {...register("address", { required: "Ce champ est obligatoire" })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </div>
          {/* Téléphone et site web */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-[50%]">
              <TextField
                id="phone"
                label={
                  <h3>
                    Téléphone professionnel{" "}
                    <span className="text-red-400">*</span>
                  </h3>
                }
                variant="outlined"
                className="w-full"
                {...register("phone", { required: "Ce champ est obligatoire" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </div>
            <div className="w-full md:w-[50%]">
              <TextField
                id="website"
                label={<h3>Site web</h3>}
                variant="outlined"
                className="w-full"
                {...register("website")}
              />
            </div>
          </div>
          {/* LinkedIn */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-[50%]">
              <TextField
                id="linkedin"
                label={<h3>LinkedIn</h3>}
                variant="outlined"
                className="w-full"
                {...register("linkedin")}
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
                {...register("contactName", {
                  required: "Ce champ est obligatoire",
                })}
                error={!!errors.contactName}
                helperText={errors.contactName?.message}
              />
            </div>
            <div className="w-full md:w-[50%]">
              <TextField
                id="contactFunction"
                label={<h3>Fonction</h3>}
                variant="outlined"
                className="w-full"
                {...register("contactFunction")}
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
              {...register("companyDescription", {
                required: "Ce champ est obligatoire",
              })}
              error={!!errors.companyDescription}
              helperText={errors.companyDescription?.message}
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
            Créer mon compte entreprise
          </Button>
        </div>
      </form>
    );
  };
  
  export default EntrepriseForm;