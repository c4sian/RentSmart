import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useImages } from "../../../lib/hooks/useImages";

export default function AccommodationPhotos() {
    const { id } = useParams();
    const { images, uploadImage } = useImages(id);


    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            await uploadImage.mutateAsync(file);
        }
    }, [uploadImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: "calc(100vh - 4rem)" }}>

            <Stack sx={{ width: "1000px", mt: 2, backgroundColor: "primary.main", p: 2, borderRadius: 2 }}>
                <Typography variant="h4">Photos</Typography>
                <Typography sx={{ mb: 2 }}>Here you can manage the photos for your property</Typography>

                <ButtonBase sx={{
                    display: "flex", flexDirection: "column",
                    backgroundColor: "grey.400", borderRadius: 2,
                    p: 2, width: 1, gap: 2, mb: 3
                }}
                    disableRipple
                    {...getRootProps()}
                >

                    <input {...getInputProps()} />
                    <FileUploadRoundedIcon fontSize="large" />

                    <Stack sx={{ alignItems: "center", gap: 1 }}>
                        {isDragActive ? (
                            <Typography>Drop images here...</Typography>
                        ) : (
                            <Typography>Drag & drop images, or click to select</Typography>
                        )}
                        <Typography>Max 10MB.</Typography>
                    </Stack>
                </ButtonBase>

                {images && (
                    images.map((img) => (<Typography>{img.url}</Typography>))
                )}
            </Stack>
        </Box>

    )
}