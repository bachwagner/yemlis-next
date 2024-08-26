import React from 'react'
import { Box } from '@mui/material'
import { LinearProgress } from '@mui/material'
function GlycemicIndex({ value }) {

    function calculateSeverityStatus(value) {
        if (value > 0 && value < 56) {
            return { label: "Düşük Glisemik İndex", color: "success" }
        } else if (value >= 56 && value < 70) {
            return { label: "Orta Glisemik İndex", color: "warning" }

        } else if (value >= 70 && value <= 100) {
            return { label: "Yüksek Glisemik İndex", color: "error" }

        } else {
            return { label: "??", color: "error" }
        }
    }
    const severityStatus =calculateSeverityStatus(value)
    return (
        <div>Glisemik İndeks: {value ? value : "?"} ({severityStatus.label})
            <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{ height: 15 }} color={severityStatus.color} variant="determinate" value={35} />
            </Box></div>
    )
}

export default GlycemicIndex