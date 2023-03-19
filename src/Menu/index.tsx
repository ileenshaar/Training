import React, { useEffect, useRef, useReducer } from 'react'
import './MenuStyle.css'
import { MenuItems } from './MenuItems'
import { reducer, initialState } from './Reducer-hook'
import * as actions from './Dispach'

export const Menu = () => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    option,
    searchInput,
    showDropdown,
    selectedIndex,
    filteredItems,
    emptySearchQuery
  } = state

  const toggleDropdown = () => {
    dispatch(actions.toggleDropdown(!showDropdown))
    //dispatch(actions.setSearchInput(''))
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    //dispatch(actions.setSelectedIndex(-1))
    {
      showDropdown ? null : inputRef.current ? inputRef.current.focus() : null
    }
  }

  const handleOptionClicked = (chosenOption: string) => {
    inputRef.current ? inputRef.current.blur() : null
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    dispatch(actions.toggleDropdown(false))
    //dispatch(actions.setSelectedIndex(-1))
    dispatch(actions.setOption(chosenOption))
    //dispatch(actions.setEmptySearchQuery(false))
  }

  const handleEnter = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
      handleOptionClicked(filteredItems[selectedIndex].text)
    }
  }

  const handleArrowDown = () => {
    if (selectedIndex < filteredItems.length - 1) {
      dispatch(actions.setSelectedIndex(selectedIndex + 1))

      if (selectedIndex >= 4 && scrollerRef.current)
        scrollerRef.current.scrollTop += 75
    }
  }

  const handleArrowUp = () => {
    if (selectedIndex > 0) {
      dispatch(actions.setSelectedIndex(selectedIndex - 1))
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop -= 75
      }
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        handleArrowUp()
        break
      case 'ArrowDown':
        e.preventDefault()
        handleArrowDown()
        break
      case 'Enter':
        e.preventDefault()
        handleEnter()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const filteredMenuItems = MenuItems.filter(item =>
      item.text.toLowerCase().includes(searchInput.toLowerCase())
    )
    dispatch(actions.setFilteredItems(filteredMenuItems))
  }, [searchInput, MenuItems])

  return (
    <div
      className="dropdown"
      onKeyDown={handleKeyDown}
      onClick={toggleDropdown}
    >
      <input
        ref={inputRef}
        type="text"
        value={emptySearchQuery ? searchInput : option}
        className="SearchInput"
        onChange={e => {
          dispatch(actions.setSearchInput(e.target.value))
          dispatch(actions.setSelectedIndex(-1))
          scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
        }}
      />
      <div
        ref={scrollerRef}
        className={`dropdown-content ${showDropdown ? 'show' : ''}`}
      >
        {showDropdown &&
          filteredItems.map(
            (item: { value: string; text: string }, index: number) => (
              <a
                key={item.value}
                className={selectedIndex == index ? 'selected' : ''}
                onClick={() => {
                  dispatch(actions.toggleDropdown(false))
                  handleOptionClicked(item.text)
                }}
                onMouseOver={() => dispatch(actions.setSelectedIndex(index))}
                onMouseLeave={() => dispatch(actions.setSelectedIndex(-1))}
              >
                {item.text}
              </a>
            )
          )}
      </div>
      <button className="dropbtn">
        <span className="arrow" />
      </button>
    </div>
  )
}

export default Menu
