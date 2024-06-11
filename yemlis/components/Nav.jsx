'use client'
import React, { useState, useEffect } from 'react';
import { Link } from '@mui/material';
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
import NextLink from 'next/link'
import Image from 'next/image'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    signIn, signOut, useSession,
    getProviders
} from 'next-auth/react'

const pages = [
    { title: 'Besin Ekle', href: '/addFood' },
    { title: 'Besin Ara', href: '/searchFood' },
    { title: 'Keşfet', href: '/explore' },
    { title: 'Rehber', href: '/guide' }]

const signButtons = [
    { title: 'Kayıt Ol', href: '/signup' },
    { title: 'Giriş Yap', href: '/addFood' }]

const settings = [
    { title: 'Profil', href: '/profile' },
    { title: 'Hesap', href: '/account' },
    { title: 'Kaydedilenler', href: '/saved' },
    { title: 'Atölye', href: '/workshop' }];

const AvatarImage = () => {
    return (<Image
        src="/assets/images/avatar.jpg"
        alt="Yemlis Logo"
        width={40}
        height={40}

    />)
}
const logout = () => {
    alert("Logged Out")
}
const LanguageSelector = ({ language, handleChange, isDark }) => {
    return (
        <FormControl sx={{ minWidth: 80, my: !isDark ? 2 : 0, display: 'block' }}>
            <Select
                labelId="language-selector-id"
                id="language-selector"
                value={language}
                onChange={handleChange}
                autoWidth
                label="Dil"
                size='small'
                defaultValue="TR"
                sx={{
                    height: '2.5rem',
                    color: !isDark ? 'white' : 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: !isDark ? 'white' : 'inherit'
                    },
                    '& .MuiSvgIcon-root': {
                        color: !isDark ? 'white' : 'inherit'
                    },
                    boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}
            >
                <MenuItem value={"TR"}>TR</MenuItem>
                <MenuItem value={"EN"}>EN</MenuItem>
                <MenuItem value={"RU"}>RU</MenuItem>
            </Select>
        </FormControl>
    )
}
export default function Nav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [language, setLanguage] = useState();
    const [providers, setProviders] = useState(null);

    /* useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
    },[]) */

    const isSignIn = true


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const handleChange = (event) => {

        setLanguage(event.target.value);
    };
    return (
        <Box display="flex" mb={1.5} alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FoodBankIcon fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Yemlis
                        </Typography>

                        <Box sx={{ flexDirection: "row-reverse", flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <LanguageSelector language={language} onChange={handleChange} isDark={true} />

                                {!isSignIn && signButtons.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Button
                                            href={page.href}
                                            LinkComponent={NextLink}
                                            variant="body2">
                                            {page.title}
                                        </Button>
                                    </MenuItem>
                                ))}

                                {pages.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                        <Button
                                            href={page.href}
                                            LinkComponent={NextLink}
                                            variant="body2">
                                            {page.title}
                                        </Button>
                                    </MenuItem>
                                ))}


                            </Menu>
                        </Box>
                        {/* __Mobile__  */}

                        <FoodBankIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Yemlis
                        </Typography>
                        <Box sx={{ flexDirection: "row-reverse", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <LanguageSelector language={language} onChange={handleChange} />

                            {!isSignIn && signButtons.map((page) => (
                                <Button
                                    href={page.href}
                                    LinkComponent={NextLink}
                                    variant="body2"
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            ))}

                            {pages.map((page) => (
                                <Button
                                    href={page.href}
                                    LinkComponent={NextLink}
                                    variant="body2"
                                    key={page.title}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            ))}

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                                <Avatar alt="profil fotoğrafı mini" >
                                    <AvatarImage />
                                </Avatar>
                            </IconButton>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                                        <Button
                                            href={setting.href}
                                            LinkComponent={NextLink}
                                            variant="body2">
                                            {setting.title}
                                        </Button>

                                    </MenuItem>
                                ))}
                                <MenuItem key={"logout-menu-item"} onClick={handleCloseUserMenu}>
                                    <Button
                                        key="logout"
                                        onClick={logout}>
                                        Çıkış
                                    </Button>
                                </MenuItem>

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    )
}

{/* <Image
    src="/assets/images/logo.svg"
    alt="Yemlis Logo"
    width={30}
    height={30}
/>  */}