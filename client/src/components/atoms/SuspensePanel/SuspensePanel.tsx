import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SuspensePanel = () => {
  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRender(true)
    }, 100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  if (!shouldRender) {
    return null
  }
  return (
    <Box>
      <Typography variant="caption">Loading</Typography>
    </Box>
  )
}

export default SuspensePanel
