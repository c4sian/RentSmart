import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, ImageListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
    img: Image,
    onSetPrimary: (id: string) => void,
    onDelete: (id: string) => void
};

export default function SortableImage({ img, onSetPrimary, onDelete }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
    };

    const isPrimary = img.orderIndex === 0;

    return (
        <ImageListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Box
                sx={{
                    position: "relative",
                    cursor: "grab",
                    width: "100%",
                    height: "100%",
                    "&:hover .overlay": {
                        opacity: 1
                    },
                }}
            >
                <img
                    src={img.url}
                    alt="Accommodation image"
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }}
                />

                <Box
                    className="overlay"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        opacity: 0,
                        transition: "opacity 0.2s ease-in-out",
                    }}
                >

                    <IconButton
                        size="small"
                        onClick={() => onDelete(img.id)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "white",
                            pointerEvents: "auto",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.8)",
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() => onSetPrimary(img.id)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: isPrimary ? "gold" : "white",
                            pointerEvents: "auto",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.8)",
                            },
                        }}
                    >
                        {isPrimary ? (
                            <StarIcon fontSize="small" />
                        ) : (
                            <StarBorderIcon fontSize="small" />
                        )}
                    </IconButton>

                </Box>
            </Box>
        </ImageListItem>
    )
}