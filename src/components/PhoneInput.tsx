import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataApprenant, FormDataEntreprise, KeyType } from "../typescript/module";

type FormData = FormDataEntreprise | FormDataApprenant;

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;

  countryPhone: string;
  setCountryPhone: React.Dispatch<React.SetStateAction<string>>;

  getErrorKey?: (key: KeyType) => string;
  isErrorKey?: (key: KeyType) => boolean;
};

const countries = [
  { code: "FR", label: "France (+33)", phone: "+33" },
  { code: "US", label: "United States (+1)", phone: "+1" },
  { code: "GB", label: "United Kingdom (+44)", phone: "+44" },
  { code: "DE", label: "Germany (+49)", phone: "+49" },
];

const PhoneInput = ({ register, errors, setCountryPhone, getErrorKey, isErrorKey }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex h-[60px] space-x-2">
        <select
          className="border-2 rounded-lg border-gray-300 h-full p-1"
          onChange={(e) => setCountryPhone(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.phone}>
              {country.label}
            </option>
          ))}
        </select>

        <TextField
          id="phone"
          label={
            <h3>
              Téléphone professionnel <span className="text-red-400">*</span>
            </h3>
          }
          variant="outlined"
          className="w-full"
          {...register("telephone", { required: "Ce champ est obligatoire" })}
          error={!!errors.telephone || (isErrorKey && isErrorKey("telephone"))}
          helperText={errors.telephone?.message || (getErrorKey && getErrorKey("telephone"))}
        />
      </div>
    </div>
  );
};

export default PhoneInput;