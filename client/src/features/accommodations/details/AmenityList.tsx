import { Box, Button, Typography } from "@mui/material";
import { accommodationAmenities } from "../form/accommodationUtils";
import { useState } from "react";

type Props = {
    amenityIds: number[]
};

export default function AmenityList({ amenityIds }: Props) {
    const selectedAmenities = accommodationAmenities.filter(a =>
        amenityIds.includes(a.id)
    );

    const visibleAmenities = selectedAmenities.slice(0, 9);
    const hiddenAmenities = selectedAmenities.slice(9);

    const [showAll, setShowAll] = useState(false);

    return (
        <Box sx={{ my: 2 }}>
            <Typography variant="h2" fontSize={24}>Amenities</Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(3, 1fr)" }, gap: 4, mt: 2 }}>
                {visibleAmenities.map(a => (
                    <Box key={a.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <a.icon />
                        <Typography>{a.label}</Typography>
                    </Box>
                ))}

                {showAll && hiddenAmenities.map(a => (
                    <Box key={a.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <a.icon />
                        <Typography>{a.label}</Typography>
                    </Box>
                ))}

                {hiddenAmenities.length > 0 &&
                    <Button variant="outlined" color="secondary" sx={{ width: "50%" }}
                        onClick={() => { setShowAll(prev => !prev) }}
                    >
                        {showAll ? 'Show less' : `Show +${hiddenAmenities.length}`}
                    </Button>
                }
            </Box>
        </Box>
    )
}