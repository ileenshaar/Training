/* eslint-disable react/prop-types */
import { Box, Flex, Heading } from '@twilio-paste/core'
import React from 'react'

export const SummaryLine = ({ title, children }) => {
  return (
    <Flex>
      <Box width="100%" textAlign="right">
        <Heading variant="heading50">{title}</Heading>
      </Box>
      <Box width="100%" textAlign="right">
        {children}
      </Box>
    </Flex>
  )
}

export default SummaryLine
