import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrainingPage() {
  const [formData, setFormData] = useState({
    objetivo: "",
    tipo: "",
    nivel: "",
    duracao: "",
  });

  const [respostaIA, setRespostaIA] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.objetivo ||
      !formData.tipo ||
      !formData.nivel ||
      !formData.duracao
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setRespostaIA("");

    try {
      const prompt = `
      Crie um plano de treino personalizado com base nas seguintes informações:
      - Objetivo: ${formData.objetivo}
      - Tipo de treino: ${formData.tipo}
      - Nível físico: ${formData.nivel}
      - Duração: ${formData.duracao} minutos
      O retorno deve ser motivacional e descritivo, com exercícios, séries e descansos.
      `;

      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Erro ao conectar com o backend");
      }

      const data = await response.json();
      setRespostaIA(data.response || "Sem resposta da IA");
    } catch (error) {
      console.error(error);
      setRespostaIA(
        "❌ Erro ao obter resposta do Treinador IA. Verifique o backend ou a conexão."
      );
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(rgba(123, 47, 247, 0.8), rgba(241, 7, 163, 0.8)),
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
          width: 450,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" mb={3}>
          Criar Novo Treino com IA
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Grupo Muscular"
            placeholder="Ex: Treino de Perna"
            name="objetivo"
            fullWidth
            margin="normal"
            value={formData.objetivo}
            onChange={handleChange}
          />

          <TextField
            select
            label="Tipo de treino"
            name="tipo"
            fullWidth
            margin="normal"
            value={formData.tipo}
            onChange={handleChange}
          >
            <MenuItem value="forca">Força</MenuItem>
            <MenuItem value="emagrecimento">Emagrecimento</MenuItem>
            <MenuItem value="resistencia">Resistência</MenuItem>
            <MenuItem value="hipertrofia">Hipertrofia</MenuItem>
          </TextField>

          <TextField
            select
            label="Nível físico"
            name="nivel"
            fullWidth
            margin="normal"
            value={formData.nivel}
            onChange={handleChange}
          >
            <MenuItem value="iniciante">Iniciante</MenuItem>
            <MenuItem value="intermediario">Intermediário</MenuItem>
            <MenuItem value="avancado">Avançado</MenuItem>
          </TextField>

          <TextField
            label="Duração (minutos)"
            name="duracao"
            type="number"
            fullWidth
            margin="normal"
            value={formData.duracao}
            onChange={handleChange}
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Gerar Treino com IA"
            )}
          </Button>
        </form>

        {respostaIA && (
          <Box mt={4} textAlign="left">
            <Typography variant="h6" gutterBottom>
              💬 Resposta da IA:
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", textAlign: "justify" }}
            >
              {respostaIA}
            </Typography>
          </Box>
        )}

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
          onClick={() => navigate("/home")}
        >
          Voltar Para Página Principal
        </Button>
      </Paper>
    </Box>
  );
}
