import { Box, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { accommodationAmenities } from "../../../features/accommodations/form/accommodationUtils";

type Props = {
    selected: number[],
    onChange: (value: number[]) => void,
}

export default function AmenitiesSelector({ selected, onChange }: Props) {
    const toggle = (id: number) => {
        if (selected.includes(id)) onChange(selected.filter(x => x !== id));
        else onChange([...selected, id]);
    }

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {accommodationAmenities.map(a => {
                const Icon = a.icon;

                return (
                    <Box key={a.id} sx={{ width: "25%", mt: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selected.includes(a.id)}
                                    onChange={() => toggle(a.id)}
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "secondary.main"
                                        }
                                    }}
                                />
                            }
                            label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Icon fontSize="small" />
                                    {a.label}
                                </Box>
                            }
                        />
                        <FormHelperText></FormHelperText>
                    </Box>
                )
            })}
        </Box>
    )
}