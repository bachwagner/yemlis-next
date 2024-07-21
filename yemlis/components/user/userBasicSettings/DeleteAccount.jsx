import React from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/material'
function DeleteAccount({ isMarkToDeleted }) {
    return (
        <>
            {!isMarkToDeleted ?
                < Button variant='contained' color='error'>Hesabı Sil</Button >
                : <>
                    <Typography variant='body1' fontSize={18}>
                        Hesabı Silme Talebi Başlattınız
                    </Typography>
                    <Typography variant='body1' fontSize={16}>
                        Hesabın Silineceği Tarih: {isMarkToDeleted?.deleteDate || "?"}
                    </Typography>
                    < Button variant='contained' color='error'>Hesap Silmeyi İptal Et</Button >
                </>
            }

        </>

    )
}

export default DeleteAccount