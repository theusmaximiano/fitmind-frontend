import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

// ✅ Import do contexto
import { useUser } from "../context/UserContext";

export default function HistoryPage() {
  const navigate = useNavigate();
  const { usuario } = useUser(); // ✅ usuário do contexto
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/treinos/${usuario.nome}`
        );
        setTreinos(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreinos();
  }, [usuario.nome]);

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
        sx={{ textAlign: "center" }}
      >
        Olá, {usuario.nome}! 👋
      </Typography>

      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        mb={4}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <HistoryIcon />
        Histórico de Treinos
      </Typography>

      {treinos.length === 0 ? (
        <Typography variant="h6" color="white" textAlign="center">
          Nenhum treino encontrado 😕
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 900,
            justifyContent: "center",
          }}
        >
          {treinos.map((treino) => (
            <Grid item xs={12} sm={6} md={4} key={treino.id}>
              <Paper
                elevation={6}
                onClick={() => navigate(`/history/${treino.id}`)}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: "pointer",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#7b2ff7"
                  mb={1}
                  noWrap
                >
                  {treino.nome.length > 30
                    ? treino.nome.slice(0, 30) + "..."
                    : treino.nome}
                </Typography>

                <Typography variant="body2" color="textSecondary" mb={1}>
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
                  }}
                >
                  Status: {treino.status}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        sx={{
          mt: 5,
          backgroundColor: "#7b2ff7",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#9c4ef7" },
        }}
        onClick={() => navigate("/home")}
      >
        Voltar para Página Inicial
      </Button>
    </Box>
  );
}
