import React , {useState,useEffect,useContext} from 'react'
import { AppBar, IconButton, Toolbar, Drawer,Button ,Avatar ,useMediaQuery} from '@mui/material'
import { Menu, AccountCircle, Brightness4 , Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles';

import { setUser , userSelector } from '../../features/auth'
import { Sidebar , Search } from '..'
import { fetchToken, createSessionId, moviesApi } from '../../utils/index';
import { ColorModeContext } from '../../utils/ToggleColorMode'


function NavBar()  {
  
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setmobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const colorMode = useContext(ColorModeContext);
 
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  /*const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if(token){
        if(sessionIdFromLocalStorage){
          console.log("1");
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);

          dispatch(setUser(userData));

        }else{
          console.log("2");
          const sessionId = await createSessionId();

          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
        }
      }
    };

  logInUser();
  }, [token]); */


  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton 
            color = "inherit" 
            edge = "start" 
            style = {{outline: 'none'}} 
            onClick = {() => setmobileOpen((prevMobileOpen) => !prevMobileOpen)} 
            className = {classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ml : 1}} onClick = {colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ):(
              <Button color='inherit' component = {Link} to = {`/profile/${user.id}`} className={classes.linkButton} onClick = {() => {}}>
              {!isMobile && <>MY Movies &nbsp;</>}
               <Avatar style = {{width: 30, height:30}} 
               alt="profile"
               src = "https://pixabay.com/vectors/avatar-icon-placeholder-facebook-1577909/" 

               />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className= {classes.drawer}>
              {isMobile ? (
                <Drawer
                variant='temporary'
                anchor='right'
                open = {mobileOpen}
                onClose={() => setmobileOpen((prevMobileOpen) => !prevMobileOpen)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted:true}}
                >
                  <Sidebar setmobileOpen = {setmobileOpen} />
                </Drawer>
              ):(
                <Drawer  classes={{paper: classes.drawerPaper}} variant='permanent' open>
                  <Sidebar setmobileOpen = {setmobileOpen} />
                </Drawer>

              )}
        </nav>
      </div>
    </> 
  )
} 

export default NavBar