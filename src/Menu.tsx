import React, { useState, useEffect } from 'react'
import './MenuStyle.css'
import { MenuItems } from './MenuItems'
//import { placeholder } from '@babel/types'

export const Menu = () => {
  const [ChosenOption, setChosenOption] = useState('type..')
  const [SearchQueryMenu, setSearchQueryMenu] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [filteredItems, setfilteredItems] = useState(MenuItems)
  const [InputClicked, setInputClicked] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    setSearchQueryMenu('')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (selectedIndex < filteredItems.length - 1) {
          setSelectedIndex(selectedIndex + 1)
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
          setChosenOption(filteredItems[selectedIndex].Option)
        }
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      window.addEventListener('keydown', handleKeyDown)
      setInputClicked(true)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
      setInputClicked(false)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDropdown, selectedIndex])

  useEffect(() => {
    const filteredMenuItems = MenuItems.filter(item =>
      item.Option.toLowerCase().includes(SearchQueryMenu.toLowerCase())
    )
    setfilteredItems(filteredMenuItems)
  }, [SearchQueryMenu, MenuItems, ChosenOption])

  return (
    <div>
      <div className="dropdown">
        <input
          type="text"
          value={InputClicked ? SearchQueryMenu : ChosenOption}
          onFocus={() => setSearchQueryMenu('')}
          className="SearchInput"
          onChange={e => setSearchQueryMenu(e.target.value)}
        />
        <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
          {showDropdown &&
            filteredItems.map((item, index) => (
              <a
                key={item.id}
                className={selectedIndex == index ? 'selected' : ''}
                onClick={() => {
                  setChosenOption(item.Option)
                  setInputClicked(false)
                  setShowDropdown(false)
                }}
                onMouseOver={() => setSelectedIndex(index)}
              >
                {item.Option}
              </a>
            ))}
        </div>
        <button className="dropbtn" onClick={toggleDropdown}>
          <span className="arrow"></span>
        </button>
      </div>
    </div>
  )
}

export default Menu
