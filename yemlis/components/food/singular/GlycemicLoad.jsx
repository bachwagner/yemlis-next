import React from 'react'
import { Box } from '@mui/material'
import { LinearProgress } from '@mui/material'
function GlycemicLoad({ value }) {

    function calculateSeverityStatus(value) {
        if (value > 0 && value < 11) {
            return { label: "Düşük Glisemik Yük", color: "success" }
        } else if (value >= 11 && value < 20) {
            return { label: "Orta Glisemik Yük", color: "warning" }

        } else if (value >= 20) {
            return { label: "Yüksek Glisemik Yük", color: "error" }

        } else {
            return { label: "??", color: "error" }
        }
    }
    const severityStatus = calculateSeverityStatus(value)
    return (
        <div>Glisemik Yük: {value ? value : "?"} ({severityStatus.label})
            <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{ height: 15 }} color={severityStatus.color} variant="determinate" value={35} />
            </Box></div>
    )
}

export default GlycemicLoad