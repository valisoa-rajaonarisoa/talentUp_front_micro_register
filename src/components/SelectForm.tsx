import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { countries } from "../data/contry";


interface CountrySelectProps {
  value?: any; // Valeur actuelle du pays
  onChange?: (newValue: any) => void; // Fonction pour mettre à jour la valeur
  options:any
}

export default function CountrySelect({ value, onChange,options}: CountrySelectProps) {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      value={value || null} // Définir la valeur actuelle
      onChange={(event, newValue) => {
        event.type
        if (onChange) {
          onChange(newValue); // Appeler la fonction onChange avec la nouvelle valeur
        }
      }}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pays"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
            },
          }}
        />
      )}
    />
  );
}