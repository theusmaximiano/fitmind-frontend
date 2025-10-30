import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrainingResultPage() {
  const navigate = useNavigate();
  const [treino, setTreino] = useState("");

  useEffect(() => {
    const treinoSalvo = localStorage.getItem("treinoGerado");
    if (treinoSalvo) {
      setTreino(treinoSalvo);
    } else {
      setTreino("Nenhum treino foi gerado ainda.");
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(rgba(123, 47, 247, 0.8), rgba(159, 7, 241, 0.8)),
          url('/assets/imagem.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 500,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          💪 Seu Treino Gerado
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            textAlign: "justify",
            mb: 3,
          }}
        >
          {treino}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, py: 1.5, backgroundColor: "#7b2ff7", "&:hover": { backgroundColor: "#9c4ef7" } }}
          onClick={() => navigate("/training")}
        >
          Gerar Novo Treino
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          onClick={() => navigate("/home")}
        >
          Voltar Para Página Principal
        </Button>
      </Paper>
    </Box>
  );
}
