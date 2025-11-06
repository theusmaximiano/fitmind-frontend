import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ✅ Importa o contexto
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useUser(); // ✅ obtém usuário do contexto

  // Estado local para edição
  const [profile, setProfile] = useState({
    nome: usuario.nome,
    email: usuario.email || "", // caso ainda não exista
    objetivo: usuario.objetivo || "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (
      !profile.nome.trim() ||
      !profile.email.trim() ||
      !profile.objetivo.trim()
    ) {
      setSnackbar({
        open: true,
        message: "Preencha todos os campos!",
        severity: "error",
      });
      return;
    }

    if (!validarEmail(profile.email)) {
      setSnackbar({
        open: true,
        message: "E-mail inválido!",
        severity: "error",
      });
      return;
    }

    // Atualiza o usuário global
    setUsuario({
      ...usuario,
      nome: profile.nome,
      email: profile.email,
      objetivo: profile.objetivo,
    });

    setSnackbar({
      open: true,
      message: "Perfil atualizado com sucesso! 💪",
      severity: "success",
    });

    // Aqui você pode adicionar chamada à API para salvar permanentemente
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/imagem.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: { xs: "90%", sm: 380 },
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate("/home")}
          sx={{ position: "absolute", top: 20, left: 20, color: "white" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            backgroundColor: "#7b2ff7",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 70 }} />
        </Avatar>

        <Typography variant="h5" fontWeight="bold" mt={2} mb={3}>
          Meu Perfil
        </Typography>

        <TextField
          label="Nome"
          fullWidth
          variant="outlined"
          value={profile.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          margin="normal"
        />

        <TextField
          label="E-mail"
          fullWidth
          variant="outlined"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          margin="normal"
        />

        <TextField
          label="Objetivo"
          fullWidth
          variant="outlined"
          value={profile.objetivo}
          onChange={(e) => handleChange("objetivo", e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            fontWeight: "bold",
            backgroundColor: "#7b2ff7",
            "&:hover": { backgroundColor: "#9c4ef7" },
          }}
          onClick={handleSave}
        >
          Salvar Alterações
        </Button>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
