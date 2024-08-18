"use client"
import React from 'react'

import { useFormState } from 'react-dom'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box"

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { likeFood,saveFood } from '@/app/lib/actions/food';


function FeedBacks({food}) {
    const [likeInfos, likeFormAction] = useFormState(likeFood, { likes: food.likes.length, isLiked: food.userRelations.isLiked })
    const [saveInfos, saveFormAction] = useFormState(saveFood, { isSaved: food.userRelations.isSaved })
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" justifyContent="left">
                <form action={likeFormAction} style={{ display: "block" }}>
                    <input
                        name='foodId'
                        value={food._id}
                        type="hidden" />
                    <input
                        name='isLiked'
                        value={likeInfos?.isLiked || ""}
                        type="hidden" />
                    <IconButton type='submit' aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: likeInfos?.isLiked ? "crimson" : "inherit" }} />
                        <span style={{ fontSize: "16px" }}>{likeInfos?.likes}</span>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </form>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="flex-end">
                <form action={saveFormAction} style={{ display: "block" }}>
                    <input
                        name='foodId'
                        value={food._id}
                        type="hidden" />
                    <input
                        name='isSaved'
                        value={saveInfos?.isSaved || ""}
                        type="hidden" />
                    <IconButton type='submit' aria-label="save food">
                        {!saveInfos.isSaved ?
                            <BookmarkBorderIcon />
                            : <BookmarkIcon />}
                    </IconButton>
                </form>
            </Box>

        </Box>
    )
}

export default FeedBacks