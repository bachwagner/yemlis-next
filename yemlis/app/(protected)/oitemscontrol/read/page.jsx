"use server"
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getAllItems, getOItems } from '@/utils/items';

const Read = async () => {
  // const updateFG = await updateFoodGroups()
  const oitems = await getOItems()

  const Traverse = ({ list }) => {
    return (<>
      {list ? (<ul>
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

      </ul >) : "Veri Alınamadı"}
    </>
    )

  }
  // console.log(topLevel)

  return (<>
    <Typography sx={{ mb: 1 }} textAlign="center" variant="h1" fontSize={24} fontWeight="bold">OItems</Typography>
    <Box sx={{ width: '100%' }}>
      Total OItems: {oitems.length}
      <Traverse list={oitems} />
    </Box>
  </>
  )
}

export default Read