import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      // Simulação de login bem-sucedido
      navigate("/home");
    } else {
      alert("Preencha username e senha");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h5" mb={3}>
          FitMind 🧠💪
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: "#7b2ff7",
              "&:hover": { backgroundColor: "#9c4ef7" },
            }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
