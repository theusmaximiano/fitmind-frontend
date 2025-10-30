import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WaterPage() {
  const navigate = useNavigate();
  const [garrafas, setGarrafas] = useState(0);
  const totalGarrafas = 10;

  // Carrega valor salvo
  useEffect(() => {
    const saved = localStorage.getItem("garrafas");
    if (saved) setGarrafas(parseInt(saved));
  }, []);

  // Adiciona garrafa
  const adicionarGarrafa = () => {
    if (garrafas < totalGarrafas) {
      const novoTotal = garrafas + 1;
      setGarrafas(novoTotal);
      localStorage.setItem("garrafas", novoTotal);
    }
  };

  // Diminui garrafa
  const diminuiGarrafa = () => {
    const novoTotal = garrafas > 0 ? garrafas - 1 : 0;
    setGarrafas(novoTotal);
    localStorage.setItem("garrafas", novoTotal);
  };

  // Reseta contador
  const resetar = () => {
    setGarrafas(0);
    localStorage.removeItem("garrafas");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(rgba(0, 69, 196, 0.8), rgba(255, 255, 255, 0.8)),
          url('/assets/imagem.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "0px 1px 4px rgba(0,0,0,0.8)",
        p: 3,
      }}
    >
      <Typography variant="h4" mb={2}>
        💧 Contador de Garrafas de Água
      </Typography>

      <Typography variant="h6" mb={3}>
        Você bebeu {garrafas} de {totalGarrafas} garrafas hoje
      </Typography>

      {/* Exibe as garrafas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 60px)",
          gap: 2,
          mb: 3,
        }}
      >
        {Array.from({ length: totalGarrafas }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 50,
              height: 120,
              borderRadius: "8px",
              backgroundImage: i < garrafas ? "url('/assets/agua.png')" : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "transform 0.3s ease, background-image 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        ))}
      </Box>

      {/* Botões de controle */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            fontSize: "18px",
            padding: "12px 24px",
             backgroundImage: "url('/assets/agua.png')",
              backgroundSize: "cover",
            backgroundColor: "#2196F3",
            "&:hover": { backgroundColor: "#1976D2" },
          }}
          onClick={adicionarGarrafa}
        >
          
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{
            fontSize: "18px",
            padding: "12px 24px",
            borderColor: "blue",
             backgroundImage: "url('/assets/agua.png')",
              backgroundSize: "cover", "&:hover": 
              { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
          onClick={diminuiGarrafa}
        >
          -
        </Button>

        <Button
          variant="outlined"
          sx={{
            fontSize: "18px",
            padding: "12px 24px",
            color: "white",
            backgroundColor: "#40a5f7ff",
            borderColor: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
          onClick={resetar}
        >
          Resetar
        </Button>
      </Box>

      <Button
        variant="contained"
        color="success"
        sx={{
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
        onClick={() => navigate("/home")}
      >
        Voltar para Página Principal
      </Button>
    </Box>
  );
}
