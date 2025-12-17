import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type Props<T extends FieldValues> = {
    name: Path<T>
    label: string
};

export default function ControlledTimePicker<T extends FieldValues>({ name, label }: Props<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TimePicker
                    label={label}
                    value={field.value || null}
                    onChange={(time) => field.onChange(time)}
                    ampm={false}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message
                        }
                    }}
                />
            )}
        />
    )
}