import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/ControlledTextInput";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { useAccount } from "../../lib/hooks/useAccount";

export default function RegisterForm() {
    const methods = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const { handleSubmit } = methods;

    const { registerUser } = useAccount();

    const onSubmit = async (data: RegisterSchema) => {
        registerUser.mutateAsync(data, {
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: "calc(100vh - 4rem)" }}>
            <FormProvider {...methods}>
                <Stack component={"form"} onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        justifyContent: "center", width: "50vw", height: "50vh",
                        mt: "10vh", px: "5vw", borderRadius: 5, gap: "5vh"
                    }}>
                    <Typography variant="h4" textAlign={"center"}>
                        Sign Up
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                        <TextInput<RegisterSchema> name="email" label="Enter email" />
                        <TextInput<RegisterSchema> name="displayName" label="Enter full name" />
                        <TextInput<RegisterSchema> name="password" label="Enter password" type="password" />
                    </Box>
                    <Button variant="contained" type="submit"
                        sx={{ bgcolor: "secondary.main", color: "primary.main" }}>
                        Sign Up
                    </Button>
                </Stack>
            </FormProvider>
        </Box>
    )
}