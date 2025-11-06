import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Import do contexto
import { useUser } from "../context/UserContext";

export default function TrainingPage() {
  const { usuario } = useUser(); // ✅ pega o usuário do contexto
  const [formData, setFormData] = useState({
    objetivo: "",
    tipo: "",
    nivel: "",
    duracao: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const gerarTreino = async () => {
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
    setPreview("");

    try {
      const prompt = `
Crie um plano de treino personalizado baseado nas seguintes informações:
- Objetivo: ${formData.objetivo}
- Tipo de treino: ${formData.tipo}
- Nível físico: ${formData.nivel}
- Duração: ${formData.duracao} minutos

Estruture em blocos (Aquecimento, Treino Principal, Alongamento) e destaque:
- Nome do exercício em negrito
- Séries e repetições em negrito
- Descanso em negrito
- Inclua uma descrição curta do objetivo de cada bloco
`;

      const responseIA = await axios.post("http://127.0.0.1:8080/generate", {
        prompt,
      });
      const treinoGerado = responseIA.data.response || "Sem resposta da IA";

      // Quebra simples por blocos
      const blocos = treinoGerado.split(/\n(?=[A-Z])/).map((bloco, i) => ({
        id: i,
        texto: bloco.trim(),
      }));

      setPreview(blocos.map((b) => b.texto).join("\n\n"));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Erro ao gerar treino.");
    } finally {
      setLoading(false);
    }
  };

  const salvarTreino = async () => {
    if (!preview) return;

    setLoading(true);
    try {
      const nomeTreino = `${formData.objetivo} - IA`;

      await axios.post("http://127.0.0.1:8080/treinos/", {
        usuario: usuario.nome, // ✅ pega o nome do usuário do contexto
        nome: nomeTreino,
        duracao: parseInt(formData.duracao),
        descricao: preview,
      });

      navigate("/history");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Erro ao salvar treino.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(123,47,247,0.8), rgba(241,7,163,0.8)), url('/assets/imagem.png')`,
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
          width: { xs: "90%", sm: 500 },
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" mb={3}>
          Criar Treino Personalizado
        </Typography>

        <Typography variant="subtitle1" mb={2}>
          Usuário: <strong>{usuario.nome}</strong>
        </Typography>

        <TextField
          label="Objetivo"
          placeholder="Ex: Hipertrofia, Força"
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
          inputProps={{ min: 10, max: 180 }}
          value={formData.duracao}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#7b2ff7",
            "&:hover": { backgroundColor: "#9c4ef7" },
          }}
          onClick={gerarTreino}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Gerar Treino com IA"
          )}
        </Button>

        {preview && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" mb={1}>
              Preview do Treino
            </Typography>
            <Paper
              sx={{
                p: 2,
                textAlign: "left",
                maxHeight: 300,
                overflowY: "auto",
                mb: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <pre style={{ whiteSpace: "pre-wrap" }}>{preview}</pre>
            </Paper>

            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mb: 2 }}
              onClick={salvarTreino}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Salvar Treino"
              )}
            </Button>
          </>
        )}

        <Button
          fullWidth
          variant="outlined"
          sx={{ py: 1.2, fontWeight: "bold" }}
          onClick={() => navigate("/home")}
        >
          Voltar Para Página Principal
        </Button>
      </Paper>
    </Box>
  );
}
