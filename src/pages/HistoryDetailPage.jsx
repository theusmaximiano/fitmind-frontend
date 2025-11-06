import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// ✅ Import do contexto de usuário
import { useUser } from "../context/UserContext";

export default function HistoryDetailPage() {
  const { id } = useParams(); // ✅ corrigido o parâmetro da rota
  const navigate = useNavigate();
  const { usuario } = useUser(); // ✅ pega o usuário do contexto

  const [treino, setTreino] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        // Passando o nome do usuário para garantir que só traga treinos dele
        const response = await axios.get(
          `http://127.0.0.1:8080/treinos/detalhe/${id}?usuario=${usuario.nome}`
        );
        setTreino(response.data);
      } catch (error) {
        console.error("Erro ao buscar treino:", error);
        alert("Erro ao buscar treino. Tente novamente.");
        navigate("/history"); // volta para histórico se houver erro
      } finally {
        setLoading(false);
      }
    };

    fetchTreino();
  }, [id, usuario.nome, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(rgba(123,47,247,0.8), rgba(159,7,241,0.8))",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!treino) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(123,47,247,0.8), rgba(159,7,241,0.8))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        color="white"
        fontWeight="bold"
        mb={2}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <FitnessCenterIcon />
        Detalhes do Treino
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 700,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {treino.nome}
        </Typography>

        <Typography variant="body2" color="textSecondary" mb={2}>
          Criado em:{" "}
          {new Date(treino.data_criacao).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          às{" "}
          {new Date(treino.data_criacao).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color:
              treino.status === "concluido"
                ? "green"
                : treino.status === "ignorado"
                ? "red"
                : "#555",
            mb: 3,
          }}
        >
          Status: {treino.status}
        </Typography>

        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", color: "#333" }}
        >
          {treino.descricao}
        </Typography>
      </Paper>

      <Button
        variant="contained"
        sx={{
          mt: 5,
          backgroundColor: "#7b2ff7",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#9c4ef7" },
        }}
        onClick={() => navigate("/history")}
      >
        Voltar para Histórico
      </Button>
    </Box>
  );
}
