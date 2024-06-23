'use client'
import { Box, Button } from '@mui/material'
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

function UserInfo() {
  const { data: session } = useSession()
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <div>{session?.user?.email}</div>

      <Button
        onClick={() => signOut()}
        size='small'
        variant='contained'
        color='error'>Logout</Button>
    </Box >
  )
}

export default UserInfo