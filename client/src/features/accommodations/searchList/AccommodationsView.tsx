import { Box, Pagination } from "@mui/material";
import { useAccommodations } from "../../../lib/hooks/useAccommodations";
import AccommodationCard from "./AccommodationCard";
import { useNavigate, useSearchParams } from "react-router";
import FiltersForm from "./FiltersForm";

export default function AccommodationsView() {
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const navigate = useNavigate();

    const onChangePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        navigate(`/accommodations?${params.toString()}`);
    }

    const filters = {
        destination: searchParams.get("destination") ?? undefined,
        checkIn: searchParams.get("checkIn") ?? undefined,
        checkOut: searchParams.get("checkOut") ?? undefined,
        maxPrice: searchParams.get("maxPrice") ?? undefined,
        type: searchParams.get("type") ?? undefined,
        minRating: searchParams.get("minRating") ?? undefined,
        page
    };

    const { pagedAccommodations } = useAccommodations(undefined, filters);
    const accommodations = pagedAccommodations.accommodations;

    const pageCount = Math.ceil(pagedAccommodations.totalCount / 5);

    return (
        <Box sx={{
            maxWidth: 1200, mx: "auto",
            display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 3fr" },
            gap: 4, alignItems: "start", mt: 2
        }}>
            <FiltersForm />

            <Box sx={{ bgcolor: "white", px: 2 }}>
                {accommodations.map((acc) => (
                    <AccommodationCard key={acc.id} accommodation={acc} />
                ))}
                <Box display={"flex"} justifyContent={"center"}>
                    <Pagination
                        page={page}
                        onChange={(_, value) => onChangePage(value)}
                        count={pageCount} color="secondary"
                    />
                </Box>

            </Box>

        </Box>
    )
}