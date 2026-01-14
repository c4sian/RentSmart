import { Box, Stack } from "@mui/material";

type Props = {
    images: Image[]
};

export default function ImageGallery({ images }: Props) {
    const sortedImages = [...images].sort(
        (a, b) => a.orderIndex - b.orderIndex
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "row", maxHeight: "400px" }}>
            <Box sx={{ width: "60%", pr: 1 }} >
                <img src={sortedImages[0].url} alt="Accommodation image"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "10px" }} />
            </Box>

            <Stack sx={{ width: "40%" }}>
                <Box sx={{ height: "60%" }}>
                    <img src={sortedImages[1].url} alt="Accommodation image"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "10px" }} />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", height: "40%", pt: 1, gap: 1 }}>
                    <img src={sortedImages[2].url} alt="Accommodation image"
                        style={{ width: "50%", height: "100%", objectFit: "cover", display: "block", borderRadius: "10px" }} />
                    <img src={sortedImages[3]?.url} alt="Accommodation image"
                        style={{ width: "50%", height: "100%", objectFit: "cover", display: "block", borderRadius: "10px" }} />
                </Box>
            </Stack>
        </Box>
    )
}