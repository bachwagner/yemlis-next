'use client' // Error boundaries must be Client Components
 
import { Button } from '@mui/material'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error catched on page")
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Unit Control: Something went wrong!</h2>
      <Button
      size="small"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
        </Button>
    </div>
  )
}