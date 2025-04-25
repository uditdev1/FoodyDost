import * as React from 'react';
import {useState , useEffect} from "react";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../Hooks/useAuth.jsx';
import { useCart } from '../Hooks/useCart.jsx';
import classes from "./Header.module.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white , 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));
import axios from 'axios';

export default function PrimarySearchAppBar() {
// userDefined Functions 
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const {cart} = useCart();
  const totalCount = cart.totalCount;

  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const search = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData && userData.id){
      const id = userData.id;
      const result = await axios.post("/api/foods/saveSearch", {id , term});
    }
    term ? navigate("/search/" + term) : navigate("/");
  };

  const {user , logout} = useAuth();

  // preDefined style functions 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link style={{color:"black", textDecoration:"none"}} to="/profile">Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <span style={{color:"black", textDecoration:"none"}} onClick={logout}>Logout</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <IconButton>
        { 
          user ? <Link to="/dashboard" style={{color:"black", textDecoration:"none"}}>
          {user.name}
          </Link> 
          :
          <Link to="/login" style={{color:"black", textDecoration:"none"}}>
          login
          </Link> 
        }
      </IconButton>
      </MenuItem>
      <Link to="/cart" style={{color:"black", textDecoration:"none" }} >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={totalCount} color="error">
              <ShoppingCartIcon/>
            </Badge>
          </IconButton>
          <p>cart</p>
        </MenuItem>
      </Link>
      {user && <Link to="/orders" style={{color:"black", textDecoration:"none" }} >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
          <BorderColorIcon/>
          </IconButton>
          <p>orders</p>
        </MenuItem>
      </Link>
      }
      {user && <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>}
    </Menu>
  );
 


  return (
    <div className={classes.mainDiv} style={{borderRadius:"0.5rem", overflow:"hidden"}}>
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" sx={{bgcolor:"error.main"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
          >
          <Link className={classes.title} style={{color:"white" , textDecoration:"none"}} to="/" >FoodyDost</Link>
          </IconButton>

          <Search sx={{
                '@media only screen and (max-width: 600px)': {
                  padding: "0px",
                  margin:"0px"
                }
              }}>
            <SearchIconWrapper>
              <SearchIcon sx={{
                '@media only screen and (max-width: 600px)': {
                  fontSize: '1rem', 
                }
                }} 
                onClick={search}
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setTerm(e.target.value)}
              onKeyUp={e => e.key === 'Enter' && search()}
              value={term}
              sx={{
                width:"100%",
                '@media only screen and (max-width: 800px)': {
                  width: '100%', 
                },
                '@media only screen and (max-width: 600px)': {
                  width: '100%', 
                  padding: "0px",
                  margin:"0px"
                }
              }} 
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/cart" style={{color:"white", textDecoration:"none" }} >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={totalCount} color="warning">
                <ShoppingCartIcon/>
                </Badge>
              </IconButton>
            </Link>
            <IconButton>
              { 
                user && <Link to="/dashboard" style={{color:"white", textDecoration:"none"}}>
                {user.name}
                </Link>
              }
            </IconButton>
            {user && <Link to="/orders" style={{color:"white", textDecoration:"none"}}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
              <BorderColorIcon/>
              </IconButton>
            </Link>
            }
            {user ? <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> 
            :
            <IconButton>
              <Link style={{color:"white",  textDecoration:"none" }}  to="/login">Login</Link>
            </IconButton>
            }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </div>
  );
}