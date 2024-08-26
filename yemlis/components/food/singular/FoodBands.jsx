"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Icon, IconButton } from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Tooltip from '@mui/material/Tooltip';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function FoodBands({ tags }) {
    const [open, setOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState();
    const handleOpen = () => setOpen(true);
    const getTag = (e) => {
        const foodTag = e.currentTarget.value
        const selected = tags.find(tag => tag?.name === foodTag)
        if (selected) {
            setSelectedTag(selected)
            handleOpen()
        }
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Typography variant="h6">Ürün Özellikleri</Typography>
            {tags.map(tag => {
                return (
                    <Tooltip title={tag.label} key={tag.name}>
                        <IconButton onClick={getTag} aria-label={tag.text} value={tag.name}>
                            <Image
                                alt={`${tag.name} etiketi`}
                                src={`/static/images/foods/${tag.image}.svg`}
                                width={40}
                                height={35} />
                        </IconButton>
                    </Tooltip>)
            }
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Image
                            alt={`${selectedTag?.name} simgesi`}
                            src={`/static/images/foods/${selectedTag?.image}.svg`}
                            width={25} height={25} />
                        <Typography id="modal-modal-title" variant="h6" component="h2" p={1}>
                            {selectedTag?.label}
                        </Typography>
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        {selectedTag?.text}
                    </Typography>
                    <Button variant="contained" onClick={handleClose}>Kapat</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default FoodBands