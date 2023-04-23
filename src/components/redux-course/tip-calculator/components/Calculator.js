import { Card } from '@twilio-paste/core'
import { TipSelectContainer } from '../containers/TipSelectContainer'
import React from 'react'
import { MenuItems } from './MenuItems'
import { NewItemForm } from './NewItemForm'
import { Summary } from './Summary'
import '../index.css'
import { MenuItemsContainer } from '../containers/menuItemsContainer'
import { NewItemFormContainer } from '../containers/newItemFormContainer'

const Calculator = () => {
  return (
    <Card>
      <NewItemFormContainer />
      <MenuItemsContainer />
      <TipSelectContainer />
      <Summary />
    </Card>
  )
}

export default Calculator
