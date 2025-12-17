import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import TextInput from "../../app/shared/components/ControlledTextInput";
import { useAccount } from "../../lib/hooks/useAccount";

export default function LoginForm() {
    const methods = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const { handleSubmit } = methods;

    const { loginUser } = useAccount();

    const onSubmit = async (data: LoginSchema) => {
        loginUser.mutateAsync(data, {
            onError: (error) => {
                console.log(error);
            }
        });
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
                        Sign In
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                        <TextInput<LoginSchema> name="email" label="Enter email" />
                        <TextInput<LoginSchema> name="password" label="Enter password" type="password" />
                    </Box>
                    <Button variant="contained" type="submit" sx={{ bgcolor: "secondary.main", color: "primary.main" }}>
                        Sign In
                    </Button>
                </Stack>
            </FormProvider>
        </Box>
    )
}