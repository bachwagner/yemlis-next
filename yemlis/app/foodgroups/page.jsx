"use server"
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { getFoodGroups, updateFoodGroups } from "@/utils/foodgroups"
import { Typography } from '@mui/material';

async function FoodGroups() {
  // const updateFG = await updateFoodGroups()
  const foodGroups = await getFoodGroups()
  var idsToElements = {};
  for (var i = 0; i < foodGroups.length; i++) {
    idsToElements[foodGroups[i].foodId] = foodGroups[i];
  }
  var topLevel = [];
  for (var i = 0; i < foodGroups.length; i++) {
    if (foodGroups[i].parent) {
      var parentElement = idsToElements[foodGroups[i].parent.foodId];
      if (!parentElement) {
        // Parent element missing in list; treat as top-level
        topLevel.push(foodGroups[i]);

      } else {
        if (!parentElement.chd) {
          parentElement.chd = [];
        }
        parentElement.chd.push(foodGroups[i]);
      }
    } else {

      topLevel.push(foodGroups[i]);
    }
  }
  const Traverse = ({list}) => {

    return (<>
      <ul>
        {
          list.map((l, i) => {
            return (
              <><li>
                {l.name}
              </li>
                {l.chd && <Traverse list={l.chd} />}
              </>
            )
          })
        }

      </ul ></>
    )
  
  }
  console.log("topLeveltopLevel")
  // console.log(topLevel)
 
  return (<>
    <Typography sx={{ mb: 1 }} textAlign="center" variant="h1" fontSize={24} fontWeight="bold">Food Groups</Typography>
    <Box sx={{ width: '100%' }}>
      Total Groups: {foodGroups.length}
      <Traverse list={topLevel} />
      {/*  <ul>
        {idsToElements.map(fg => <li key={fg.name}>  {fg.foodId} {fg.name}</li>)}
      </ul> */}
      {/*  <Stack spacing={2}>
                {foodGroups.map(fg => {
                    return (
                        <Paper key={fg.name}>{fg.name} parent: {fg.parent?.name}</Paper>
                      )
                })}
            </Stack> */}
      {/* <ul>
  <li>Coffee</li>
  <li>Tea
    <ul>
      <li>Black tea</li>
      <li>Green tea</li>
    </ul>
  </li>
  <li>Milk</li>
</ul> */}
    </Box>
  </>
  )
}

export default FoodGroups