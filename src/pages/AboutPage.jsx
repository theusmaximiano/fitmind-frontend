// src/pages/AboutPage.jsx
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(rgba(229, 6, 6, 0.8), rgba(241, 7, 163, 0.8)),
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
          maxWidth: 600,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold">
          Sobre o FitMind 🧠💪
        </Typography>

        <Typography variant="body1" mb={2} sx={{ textAlign: "justify" }}>
          O FitMind é uma aplicação inovadora para pessoas que focam no bem
          estar da saúde e modo de vida fitness, que combina tecnologia e
          inteligência artificial para criar treinos personalizados de acordo
          com seus objetivos, tipo de treino, nível físico e duração desejada.
        </Typography>

        <Typography variant="body1" mb={2} sx={{ textAlign: "justify" }}>
          Com a integração da API Gemini, o FitMind gera planos de treino
          adequados, detalhados e adaptados a necessidade do usuário, incluindo
          séries, repetições e intervalos de descanso. Além disso, oferece
          funcionalidades como monitoramento de água, sugestões de alimentação e
          histórico de treinos.
        </Typography>

        <Typography variant="body1" mb={4} sx={{ textAlign: "justify" }}>
          A missão do FitMind é unir a saúde e a tecnologia para proporcionar
          uma experiência única para cada usuário, priorizando a satisfação do
          cliente.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/home")}
        >
          Voltar para Pagina Inicial
        </Button>
      </Paper>
    </Box>
  );
}
