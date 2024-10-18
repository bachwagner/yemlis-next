"use client"  //main page
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import Box from "@mui/material/Box"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { likeFood, saveFood } from '@/app/lib/actions/food';

import { useFormState } from 'react-dom'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Food({ food }) {

  //console.log("foodd")
  //console.log(food)

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  const [likeInfos, likeFormAction] = useFormState(likeFood, { likes: food.likes.length, isLiked: food.userRelations?.isLiked })
  const [saveInfos, saveFormAction] = useFormState(saveFood, { isSaved: food.userRelations?.isSaved })

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const foodImage = food.image || "noFoodImage.png"
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card sx={{ maxWidth: 345, m: 1 }} >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <><IconButton aria-label="settings">
              <MoreVertIcon
                id="food-options"
                aria-controls={open ? 'food-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </IconButton>
              <Menu
                id="food-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'food-options',
                }}
              >
                <MenuItem onClick={handleClose}>Bunu Gösterme</MenuItem>
                <MenuItem onClick={handleClose}>Şikayet Et</MenuItem>
              </Menu>
            </>
          }
          title={food.name}
          subheader={food?.organisation?.name || ""}

        />
        {/* <CardMedia
        component="img"
        height="194"
        image="@/static/images/foods"
        alt="Paella dish"
      /> */}
        <Image
          src={`/static/images/foods/${foodImage}`}
          height={194}
          width={350}
          alt="paella"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            *{food?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {food?.description || food.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {food.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "block" }}>
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
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more" >

                  <ExpandMoreIcon />
                </ExpandMore>
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

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography fontWeight="bold" >100 gram</Typography>

            {food?.quantitativeValues && food.quantitativeValues.map((fq, i) => {
              const quantType = i == 0 ? "KJ" : "Kkal" //kcal cal //TODO
              const shortInfo = fq.name + ": " + fq.value + " " + quantType/* fq.unit.name */
              return <Typography key={fq.name + quantType}>{shortInfo} <br /></Typography>
            }
            )}
            {food?.nutritionValues && food.nutritionValues.map((nv, i) => {
              const quantType = i == 0 ? "KJ" : "Kkal" //kcal cal //TODO
              const shortInfo = nv.name + ": " + nv.value + " " + nv.unit?.name
              return <Typography sx={{ backgroundColor: (i % 2 == 0) ? "silver" : "inherit" }} key={nv.name + quantType}>{shortInfo} <br /></Typography>
            }
            )}

          </CardContent>
        </Collapse>

      </Card>
    </Box >
  );
}