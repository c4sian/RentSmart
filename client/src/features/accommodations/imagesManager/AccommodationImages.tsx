import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useImages } from "../../../lib/hooks/useImages";
import DraggableImageList from "./DraggableImageList";

export default function AccommodationImages() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { gettedImages, uploadImage, reorderImages } = useImages(id);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        setImages(gettedImages);
    }, [gettedImages]);

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

    const handleConfirm = async () => {
        await reorderImages.mutateAsync(images, {
            onSuccess: () => {
                navigate(`/profile/${id}`);
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: "calc(100vh - 4rem)" }}>

            <Stack sx={{ width: "1000px", mt: 2, backgroundColor: "primary.main", p: 2, borderRadius: 2 }}>

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

                <Typography variant="h4">Display gallery</Typography>
                <Typography sx={{ mb: 2 }}>Drag photos into your preffered order of display</Typography>

                <Box>
                    <DraggableImageList images={images} setImages={setImages} />
                    <Button variant="contained" sx={{ bgcolor: "secondary.main", color: "primary.main" }}
                        onClick={handleConfirm}
                    >
                        Confirm Images
                    </Button>
                </Box>
            </Stack>
        </Box>

    )
}