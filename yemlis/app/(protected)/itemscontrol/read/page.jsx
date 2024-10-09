"use server"
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getItems } from '@/utils/items';

const Read = async () => {
  // const updateFG = await updateFoodGroups()
  const items =  await getItems()

  const Traverse = ({ list }) => {
    return (<>
    {list?(  <ul>
        {
          list.map((l, i) => {
            return (
              <><li key={l.name}>
                {l.name}
              </li>
              </>
            )
          })
        }

      </ul >):"Veri Alınamadı"}
    </>
    )

  }
  // console.log(topLevel)

  return (<>
    <Typography sx={{ mb: 1 }} textAlign="center" variant="h1" fontSize={24} fontWeight="bold">Nutrients</Typography>
    <Box sx={{ width: '100%' }}>
      Total Groups: {items.length}
      <Traverse list={items} />
    </Box>
  </>
  )
}

export default Read