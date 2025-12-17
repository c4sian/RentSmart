import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>
    items: { value: string, label: string }[]
} & SelectProps;

export default function ControlledSelectInput<T extends FieldValues>({ name, label, items, ...props }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) =>
            (<FormControl fullWidth error={!!error}>
                <InputLabel sx={{ "&.Mui-focused": { color: "grey.700" } }}>{label}</InputLabel>
                <Select
                    value={field.value || ''}
                    label={label}
                    onChange={field.onChange}
                    {...props}
                    sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "grey.900" }
                    }}
                >
                    {items.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>)
            }
        />
    )
}