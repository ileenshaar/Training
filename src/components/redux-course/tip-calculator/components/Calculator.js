import { Card } from '@twilio-paste/core'
import { TipSelectContainer } from '../containers/TipSelectContainer'
import React from 'react'
import { MenuItems } from './MenuItems'
import { NewItemForm } from './NewItemForm'
import '../index.css'
import { MenuItemsContainer } from '../containers/menuItemsContainer'
import { NewItemFormContainer } from '../containers/newItemFormContainer'
import { SummaryContainer } from '../containers/summaryContainer'

const Calculator = () => {
  return (
    <Card>
      <NewItemFormContainer />
      <MenuItemsContainer />
      <TipSelectContainer />
      <SummaryContainer />
    </Card>
  )
}

export default Calculator
