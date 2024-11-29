import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import PostRecept from "../../components/PostRecept/PostRecept";
import { useNavigate } from "react-router-dom";
import CharacterProduct from "../../components/CharacterProduct/CharacterProduct";

const PersonalAccount: React.FC = () => {

	const navigate = useNavigate();

	const [open,setOpen] = useState<boolean>(false)

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f5f5">
      {/* Sidebar */}
      <Box
        width={{ xs: "70px", sm: "250px" }}
        bgcolor="#1976d2"
        color="#fff"
        display="flex"
        flexDirection="column"
        padding={2}
        alignItems={{ xs: "center", sm: "flex-start" }}
      >
        {/* User Info */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mb: 2,
              backgroundColor: "#fff",
              color: "#1976d2",
              fontSize: 32,
            }}
          >
            A
          </Avatar>
          <Typography
            variant="h6"
            align="center"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            John Doe
          </Typography>
        </Box>

        {/* Navigation */}
        <List sx={{ width: "100%" }}>
          <ListItem onClick={()=>setOpen(false)} className=" cursor-pointer" >
            <ListItemIcon sx={{ color: "#fff" }}>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText
              primary="Products"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
          <ListItem onClick={()=>setOpen(true)} className=" cursor-pointer" >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary="Characteristic"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
          <Divider sx={{ backgroundColor: "#fff", my: 2 }} />
          <ListItem onClick={()=>navigate('/')} className=" cursor-pointer">
            <ListItemIcon sx={{ color: "#fff" }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
        </List>
      </Box>

	  
	  {open ?
	(<div>
		<CharacterProduct/>
	  </div>)
	  :
	  (<div>
		  <PostRecept/>
	  </div>)  
	}
    </Box>
  );
};

export default PersonalAccount;
