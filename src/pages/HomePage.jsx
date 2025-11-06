import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import do contexto de usuário
import { useUser } from "../context/UserContext";

export default function HomePage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    navigate("/");
  };

  // ✅ Pega o usuário do contexto
  const { usuario } = useUser();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const options = [
    {
      title: "Criar Treino",
      icon: <FitnessCenterIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#7b2ff7",
      path: "/training",
    },
    {
      title: "Ver Treinos",
      icon: <HistoryIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#9c4ef7",
      path: "/history",
    },
    {
      title: "Como Funciona",
      icon: <InfoIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#2d0087",
      path: "/about",
    },
    {
      title: "Água",
      icon: <LocalDrinkIcon sx={{ fontSize: 40, color: "#fff" }} />,
      color: "#00bcd4",
      path: "/water",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/imagem.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      {/* AppBar */}
      <AppBar position="static" sx={{ background: "rgba(0,0,0,0.3)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FitMind 🧠💪
          </Typography>

          <IconButton onClick={handleMenu} sx={{ color: "white" }}>
            <AccountCircleIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 150,
                backgroundColor: "#222",
                color: "white",
                borderRadius: 2,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
            >
              Ver Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Perfil + Data */}
      <Box textAlign="center" mt={5} mb={4}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            margin: "0 auto",
            mb: 2,
            backgroundColor: "#7b2ff7",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          Olá, {usuario.nome}!
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </Typography>
      </Box>

      {/* Cards */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 700, margin: "0 auto", px: 2 }}
      >
        {options.map((opt) => (
          <Grid item xs={12} sm={6} md={4} key={opt.title}>
            <Card
              sx={{
                backgroundColor: opt.color,
                borderRadius: 4,
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                },
              }}
            >
              <CardActionArea onClick={() => navigate(opt.path)}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  {opt.icon}
                  <Typography variant="h6" mt={1} fontWeight="bold">
                    {opt.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
