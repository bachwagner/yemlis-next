"use server"
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getUnits } from '@/utils/units';
import { getUnitEqs } from '@/utils/unitseqs';

const Read = async () => {
  // const updateFG = await updateFoodGroups()
  const units =  await getUnitEqs()

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
    <Typography sx={{ mb: 1 }} textAlign="center" variant="h1" fontSize={24} fontWeight="bold">Unit Equivalents</Typography>
    <Box sx={{ width: '100%' }}>
      Total Unit Equivalents: {units.length}
      <Traverse list={units} />
    </Box>
  </>
  )
}

export default Read