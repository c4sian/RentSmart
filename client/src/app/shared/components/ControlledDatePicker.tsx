import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form"


type Props<T extends FieldValues> = {
    name: Path<T>
    label: string
    isDateDisabled: (date: Date) => boolean
};

export default function ControlledDatePicker<T extends FieldValues>({ name, label, isDateDisabled }: Props<T>) {
    const { control } = useFormContext();

    const [open, setOpen] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <DatePicker
                    label={label}
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}

                    format="dd/MM/yyyy"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    shouldDisableDate={isDateDisabled}
                    disablePast={true}

                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            inputProps: {
                                readOnly: true
                            },
                            onClick: () => setOpen(true)
                        }
                    }}
                />
            )}
        />
    )
}