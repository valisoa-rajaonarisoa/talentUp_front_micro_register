import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../../data/contry";
import { CountryType } from "../../../typescript/module";


type Props={
  onChange: (newValue: CountryType) => void
  value: CountryType | null,
  isSireneValide:boolean
}

export default function CountrySelect({onChange,value,isSireneValide}:Props) {
  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{ width:"100%"}}
        options={countries}
        
        disabled={isSireneValide}
        autoHighlight
        value={value || null} // Définir la valeur actuelle
        onChange={(event, newValue) => {
          if (onChange) {
            onChange(newValue as CountryType); // Appeler la fonction onChange avec la nouvelle valeur
            console.log(typeof event);
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

            //on le desactive si le sirene est valide 
            disabled={isSireneValide}

            required
          />
        )}
      />
    </>
  );
}
