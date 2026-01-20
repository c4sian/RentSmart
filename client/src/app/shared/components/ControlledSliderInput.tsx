import { Slider } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form"

type Props<T extends FieldValues> = {
    name: Path<T>
};

export default function ControlledSliderInput<T extends FieldValues>({ name }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Slider
                    value={field.value || 1000}
                    onChange={(_, value) => field.onChange(value)}

                    valueLabelDisplay="auto"
                    color="secondary"
                    step={10}
                    max={1000}
                />
            )}
        />
    )
}