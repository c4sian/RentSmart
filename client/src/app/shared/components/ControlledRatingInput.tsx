import { Rating, type RatingProps } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>
} & RatingProps;

export default function ControlledRatingInput<T extends FieldValues>({ name, ...props }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Rating
                    {...field}
                    {...props}
                    value={field.value || 0}
                    onChange={(value) => field.onChange(value)}
                />
            )}
        />
    )
}