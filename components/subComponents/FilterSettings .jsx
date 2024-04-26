import { Grid, TextField } from "@mui/material";

 const FilterSettings = ({ filters, onFilterChange }) => {
    return (
        <Grid container spacing={2} columns={12} mb={5}>
            {filters.map((filter) => (
                <Grid item xs={3} key={filter.id}>
                    <TextField
                        label={filter.label}
                        variant="outlined"
                        type="number"
                        size="small"
                        value={filter.value}
                        onChange={(e) => onFilterChange(e, filter.type)}
                        fullWidth
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FilterSettings;