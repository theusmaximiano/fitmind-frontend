import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WaterPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        💧 Monitoramento de Água
      </Typography>
      <Typography variant="body1" mb={3}>
        Aqui você poderá registrar a ingestão diária de água.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}>
        Voltar para Home
      </Button>
    </Box>
  );
}
