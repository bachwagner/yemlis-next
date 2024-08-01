"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, Typography } from "@mui/material"

import { useCurrentUser } from "@/hooks/use-current-user"


const TryUserInfo = () => {
    // const { user } = useCurrentUser()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/user', { next: { tags: ['collection']}})
            .then((res) => res.json())
            .then((data) => {
                console.log("data try")
                console.log(data)
                setData(data)
                setLoading(false)
            }).catch((error) => {
                console.log("catch error")
                console.log(error)
            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>⚙ User Info Try</Typography>
            {isLoading ? <>Yükleniyor</> : data.name} <br/>
            {isLoading ? <>Yükleniyor</> : data.email}
        </Box >
    )
}

export default TryUserInfo