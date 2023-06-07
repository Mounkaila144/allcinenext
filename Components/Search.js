import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {grey, pink} from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";

const Search = ({setsearch}) => {
    const {register, handleSubmit} = useForm();

    return (<Box sx={{
        marginBottom: 1,
        width: 300
    }}
    >

                    <OutlinedInput

                        sx={{height: '5ch', boxShadow: 3, borderRadius: 2,
                            '&:hover': {
                                backgroundColor: grey[100],
                            },
                        }}
                        onChange={(event) => {
                            event.target.value.length>=3?
                            setsearch(event.target.value):null
                        }}
                        placeholder="Recherche…"
                        inputProps={{'aria-label': 'Recherche'}}

                    />

</Box>
    );
};

export default Search;
