import { TextField } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type Props<T extends FieldValues> = {
    name: Path<T>
    label: string
};

export default function ControlledNumberInput<T extends FieldValues>({ name, ...props }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <NumericFormat
                    customInput={TextField}
                    {...field}
                    {...props}
                    value={field.value || ''}
                    error={!!error}
                    helperText={error?.message}
                    allowNegative={false}
                    decimalSeparator="."
                />
            )
            }
        />
    )
}