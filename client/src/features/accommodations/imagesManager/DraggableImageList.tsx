import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { ImageList } from "@mui/material";
import type React from "react"
import SortableImage from "./SortableImage";

type Props = {
    images: Image[],
    setImages: React.Dispatch<React.SetStateAction<Image[]>>
};

export default function DraggableImageList({ images, setImages }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setImages((prev) => {
            const ordered = [...prev].sort(
                (a, b) => a.orderIndex - b.orderIndex
            );

            const oldIndex = ordered.findIndex((i) => i.id === active.id);
            const newIndex = ordered.findIndex((i) => i.id === over.id);

            const reordered = arrayMove(ordered, oldIndex, newIndex);

            return reordered.map((img, index) => ({
                ...img,
                orderIndex: index,
            }));
        })
    }

    const handleSetPrimary = (id: string) => {
        setImages(prev => {
            const selected = prev.find(i => i.id === id)!;
            const others = prev.filter(i => i.id !== id);

            return [
                { ...selected, orderIndex: 0 },
                ...others.map((img, index) => ({
                    ...img,
                    orderIndex: index + 1,
                })),
            ];
        });
    };

    const handleDelete = (id: string) => {
        setImages(prev =>
            prev.filter(img => img.id !== id)
                .map((img, index) => ({
                    ...img,
                    orderIndex: index,
                }))
        );
    };

    const sortedImages = [...images].sort(
        (a, b) => a.orderIndex - b.orderIndex
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
            <SortableContext items={sortedImages.map((img) => img.id)} strategy={rectSortingStrategy}>
                <ImageList cols={5} rowHeight={200}>
                    {sortedImages.map((img) => (
                        <SortableImage key={img.id} img={img}
                            onSetPrimary={handleSetPrimary} onDelete={handleDelete} />
                    ))}
                </ImageList>
            </SortableContext>
        </DndContext>
    )
}