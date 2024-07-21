"use client"
import React, { useState } from "react"
import { useCurrentRole } from "@/hooks/use-current-role"
//import { currentRole } from "@/app/lib/auth"
import { Box, Button, Paper, Typography } from "@mui/material"
import { RoleGate } from "@/components/auth/role-gate"
import CustomSnackbar from "@/components/CustomSnackBar"
import { admin } from "@/app/lib/actions/admin"
const AdminPage = () => {
    const { role, status } = useCurrentRole()
    const [open, setOpen] = useState()
    const [message, setMessage] = useState()
    // const role = currentRole()

    const onApiRouteClick = () => {

        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    setMessage("Allowed API Route")
                    setOpen(true)
                } else {
                    setMessage("FORBIDDEN API Route")
                    setOpen(true)
                }
            })
    }
    const onServerActionClick = () => {
        admin()
            .then((data) => {
                console.log("dataa")
                console.log(data)
                if (data.success) {
                    setMessage("Allowed Server Action")
                    setOpen(true)
                } else {
                    setMessage("FORBIDDEN Server Action")
                    setOpen(true)
                }
            })
    }
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1" fontSize={18} mb={1}>🔑Admin</Typography>
            <Typography variant="body1" fontSize={18} mb={1}>  Current role:  {role}</Typography>
            <RoleGate
                allowedRole="ADMIN">
                You are allowed
            </RoleGate>
            <Box boxShadow={1} width="100%" display="flex" justifyContent="space-evenly" alignItems="center">
                Admin Only API Route
                <Button onClick={onApiRouteClick}>Test</Button>
            </Box>
            <Box boxShadow={1} width="100%" display="flex" justifyContent="space-evenly" alignItems="center">
                Admin Only Server Action
                <Button onClick={onServerActionClick}>Test</Button>
            </Box>
            <CustomSnackbar open={open} setOpen={setOpen} message={message} duration={6000} />
        </Box>
    )
}
export default AdminPage