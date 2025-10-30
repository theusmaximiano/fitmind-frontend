import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FoodPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        🍽 Sugestão de Alimentação
      </Typography>
      <Typography variant="body1" mb={3}>
        Aqui você verá sugestões de alimentação personalizada.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}>
        Voltar para Home
      </Button>
    </Box>
  );
}
