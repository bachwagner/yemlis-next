"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Icon, IconButton } from '@mui/material'
import vegan from '@/static/images/foods/vegan.svg'
import milk from '@/static/images/foods/milk.svg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Tooltip from '@mui/material/Tooltip';
const tags = [
    { name: "vegan", label: "Vegan Besin", image: vegan, text: "Vegan Besin Açıklaması" },
    { name: "milk", label: "Süt", image: milk, text: "Bu ürün süt ürünü olup laktoz ve kazein içerir." },
    { name: "vegan", label: "Vegan Besin", image: vegan, text: "Vegan Besin Açıklaması" },
]
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
function FoodBands() {
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
            {tags.map(tag => {
                return (
                    <Tooltip title={tag.label} key={tag.name}>
                        <IconButton onClick={getTag} aria-label={tag.text} value={tag.name}>
                            <Image src={tag.image} width={25} height={25} />
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectedTag?.label}
                    </Typography>
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