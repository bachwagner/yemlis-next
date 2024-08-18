"use client"
import React from 'react';
import { PieArcLabel, PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const data = [
  { value: 9, label: 'Karbonhidrat' },
  { value: 6, label: 'Yağ' },
  { value: 6, label: 'Protein' },
  { value: 0, label: 'Alkol' },
];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2} >
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <Box display="flex">
    <PieChart series={[{
      data: data.map((d) => ({ label:d.label,value: d.value })),
      valueFormatter: (v, { dataIndex }) => {
        return `${v.value} gr `;
      },
      innerRadius: 80
    }]}
      {...size}>
      <PieCenterLabel>100 gram</PieCenterLabel>
    </PieChart>
    </Box>
  );
}