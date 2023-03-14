import React, { useState, useEffect } from 'react'
import './MenuStyle.css'
import { MenuItems } from './MenuItems'

export const Menu = () => {
  const [ChoosenOption, setChoosenOption] = useState('type..')
  const [SearchQueryMenu, setSearchQueryMenu] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [filteredItems, setfilteredItems] = useState(MenuItems)
  const [InputClicked, setInputClicked] = useState(false)

  useEffect(() => {
    const filteredMenuItems = MenuItems.filter(item =>
      item.Option.toLowerCase().includes(SearchQueryMenu.toLowerCase())
    )
    setfilteredItems(filteredMenuItems)
    setInputClicked(false)
  }, [SearchQueryMenu, MenuItems])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
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
          setChoosenOption(filteredItems[selectedIndex].Option)
        }
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showDropdown, selectedIndex])

  return (
    <div>
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={toggleDropdown}
          onKeyDown={e => e.key === 'Enter'}
        >
          <input
            type="text"
            placeholder={InputClicked ? '' : ChoosenOption}
            className="SearchInput"
            onChange={e => setSearchQueryMenu(e.target.value)}
            // value={SearchQueryMenu}
            onClick={() => {
              setInputClicked(true)
            }}
          />
          <span className="arrow"></span>

          <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
            {showDropdown &&
              filteredItems.map((item, index) => (
                <a
                  key={item.id}
                  className={selectedIndex == index ? 'selected' : ''}
                  onClick={() => {
                    setChoosenOption(item.Option)
                    setInputClicked(false)
                    setShowDropdown(false)
                  }}
                  onMouseOver={() => setSelectedIndex(index)}
                >
                  {item.Option}
                </a>
              ))}
          </div>
        </button>
      </div>
    </div>
  )
}
export default Menu
