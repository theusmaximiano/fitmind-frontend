import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

// ✅ Import do contexto
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const { setUsuario } = useUser(); // pega a função para atualizar o usuário no contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim().length < 3 || password.trim().length < 6) {
      setSnackbar({
        open: true,
        message: "Usuário ou senha inválidos",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulação de login (aqui você chamaria seu backend)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ Atualiza o contexto com o usuário logado
      setUsuario({ nome: username });

      setSnackbar({
        open: true,
        message: "Login realizado com sucesso! ✅",
        severity: "success",
      });

      setTimeout(() => navigate("/home"), 800);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao efetuar login",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url('/assets/imagem.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: { xs: "90%", sm: 360 },
          textAlign: "center",
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          FitMind 🧠💪
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          Entre para transformar sua mente e corpo
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#9c4ef7" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#9c4ef7" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: "10px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #7b2ff7 0%, #9c4ef7 100%)",
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
          </Button>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}