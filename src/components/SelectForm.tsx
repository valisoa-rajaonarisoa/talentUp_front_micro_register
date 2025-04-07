import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  label: React.ReactNode | string;
  options: any[];
  value?: any; // Valeur actuelle
  onChange?: (value: any) => void; // Gestion des changements
};

export default function SelectForm({ label, options, value, onChange }: Props) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: "100%" }}
      className="bg-gray-100"
      value={value || null} // Définir la valeur actuelle
      onChange={(event, newValue) => {
        if (onChange) {
          onChange(newValue); // Appeler la fonction onChange avec la nouvelle valeur
        }
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}