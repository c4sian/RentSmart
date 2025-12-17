import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>
} & TextFieldProps;

export default function ControlledTextInput<T extends FieldValues>({ name, ...props }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) =>
                <TextField
                    {...field}
                    {...props}
                    value={field.value || ''}
                    error={!!error}
                    helperText={error?.message}
                />}
        />
    )
}