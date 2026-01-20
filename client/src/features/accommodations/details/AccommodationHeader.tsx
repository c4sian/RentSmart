import { Box, IconButton, Typography } from "@mui/material";
import { useFavorites } from "../../../lib/hooks/useFavorites";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState } from "react";

type Props = {
    id: string
    title: string
    country: string
    stateOrCounty: string | undefined
    city: string
    isFavorite: boolean
    isLoggedIn: boolean
};

export default function AccommodationHeader({ id, title, country, stateOrCounty, city, isFavorite, isLoggedIn }: Props) {
    const { addFavorite, removeFavorite } = useFavorites();

    const [favoriteState, setFavoriteState] = useState(isFavorite);

    const onSetFavorite = async () => {
        if (addFavorite.isPending || removeFavorite.isPending) return;

        setFavoriteState((prev) => { return !prev });

        if (favoriteState) {
            await removeFavorite.mutateAsync(id);
        } else {
            await addFavorite.mutateAsync(id);
        }
    }

    return (
        <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
                <Typography variant="h1" fontSize={28}>{title}</Typography>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    {city}, {stateOrCounty}, {country}
                </Typography>
            </Box>

            <IconButton
                onClick={onSetFavorite}
                sx={{
                    color: favoriteState ? "red" : "grey.700",
                    "&:hover": {
                        backgroundColor: "transparent"
                    }
                }}
                disableRipple
                disabled={!isLoggedIn}
            >
                {favoriteState ? (
                    <Box display={"flex"} gap={2}>
                        <Favorite />
                        <Typography variant="subtitle2">Favorite</Typography>
                    </Box>

                ) : (
                    <Box display={"flex"} gap={2}>
                        <FavoriteBorder />
                        <Typography variant="subtitle2">Add favorite</Typography>
                    </Box>
                )}
            </IconButton>
        </Box>
    )
}