import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import AmenitiesSelector from "./AmenitiesSelector";

type Props<T extends FieldValues> = {
    name: Path<T>,
};

export default function ControlledCheckboxSelector<T extends FieldValues>({ name }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <AmenitiesSelector
                    selected={field.value || []}
                    onChange={field.onChange}
                />
            )}
        />
    )
}