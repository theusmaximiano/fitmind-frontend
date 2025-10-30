import { AppBar, Toolbar, Typography, Box, Button, Grid } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(rgba(247, 47, 47, 0.7), rgba(0, 0, 0, 0.7)),
          url('/assets/imagem.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Barra superior */}
      <AppBar position="static" sx={{ background: "rgba(0,0,0,0.3)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FitMind 🧠💪
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* Conteúdo */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bem-vindo à FitMind!
        </Typography>
        <Typography variant="subtitle1" mb={4}>
          Escolha uma das opções abaixo:
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<FitnessCenterIcon />}
              sx={{ py: 2, fontWeight: "bold", borderRadius: 3 }}
              onClick={() => navigate("/training")}
            >
              Criar Novo Treino
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<HistoryIcon />}
              sx={{
                py: 2,
                backgroundColor: "#7b2ff7",
                "&:hover": { backgroundColor: "#9c4ef7" },
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/history")}
            >
              Ver Histórico
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<InfoIcon />}
              sx={{
                py: 2,
                backgroundColor: "#1900ffff",
                "&:hover": { backgroundColor: "#2d0087ff" },
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/about")}
            >
              Como Funciona
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<LocalDrinkIcon />}
              sx={{
                py: 2,
                backgroundColor: "#00bcd4",
                "&:hover": { backgroundColor: "#26c6da" },
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/water")}
            >
              Monitore Sua Água
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<RestaurantIcon />}
              sx={{
                py: 2,
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#66bb6a" },
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/food")}
            >
              Sugestão de Alimentação
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
