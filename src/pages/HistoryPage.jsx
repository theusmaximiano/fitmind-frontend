import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        📜 Histórico de Treinos
      </Typography>
      <Typography variant="body1" mb={3}>
        Aqui serão listados os treinos anteriores do usuário.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}>
        Voltar para Home
      </Button>
    </Box>
  );
}
