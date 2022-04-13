import {
  // alpha,
  styled,
} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const TextFieldCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#fefefe",
    color: "#1f1f1f",
    border: "1px solid #009688",
    fontSize: 16,
    width: "auto",
    padding: "5px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `#009688 0 0 0 0.2rem`,
      borderColor: "#009688",
    },
  },
}));

const SearchFieldCustom = ({ handleInput }) => {
  return <TextFieldCustom id="search-music" onChange={handleInput} />;
};

export default SearchFieldCustom;
