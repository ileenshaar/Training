import React, { useEffect, useRef, useState } from 'react'
import './MenuStyle.css'
import { MenuItems } from './MenuItems'

export const Menu = () => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState({
    option: 'Type..',
    searchInput: '',
    showDropdown: false,
    selectedIndex: -1,
    filteredItems: [] as { value: string; text: string }[],
    emptySearchQuery: false
  })
  const {
    option,
    searchInput,
    showDropdown,
    selectedIndex,
    filteredItems,
    emptySearchQuery
  } = state

  const toggleDropdown = () => {
    setState(prevState => ({
      ...prevState,
      showDropdown: !showDropdown,
      emptySearchQuery: !state.showDropdown,
      searchInput: '',
      selectedIndex: -1
    }))
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    {
      showDropdown ? null : inputRef.current ? inputRef.current.focus() : null
    }
  }

  const handleOptionClicked = (chosenOption: string) => {
    inputRef.current ? inputRef.current.blur() : null
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    setState(prevState => ({
      ...prevState,
      showDropdown: false,
      emptySearchQuery: !state.showDropdown,
      searchInput: '',
      selectedIndex: -1,
      option: chosenOption
    }))
  }

  const handleEnter = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
      handleOptionClicked(filteredItems[selectedIndex].text)
    }
  }

  const handleArrowDown = () => {
    if (selectedIndex < filteredItems.length - 1) {
      setState(prevState => ({
        ...prevState,
        selectedIndex: prevState.selectedIndex + 1
      }))

      if (selectedIndex >= 4 && scrollerRef.current)
        scrollerRef.current.scrollTop += 75
    }
  }

  const handleArrowUp = () => {
    if (selectedIndex > 0) {
      setState(prevState => ({
        ...prevState,
        selectedIndex: prevState.selectedIndex - 1
      }))
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop -= 75
      }
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        handleArrowUp()
        break
      case 'ArrowDown':
        handleArrowDown()
        break
      case 'Enter':
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
    setState(prevState => ({
      ...prevState,
      filteredItems: filteredMenuItems
    }))
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
          setState(prevState => ({
            ...prevState,
            searchInput: e.target.value,
            selectedIndex: -1
          }))

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
                  setState(prevState => ({
                    ...prevState,
                    showDropdown: false,
                    emptySearchQuery: !state.showDropdown,
                    searchInput: '',
                    selectedIndex: -1
                  }))
                  handleOptionClicked(item.text)
                }}
                onMouseOver={() =>
                  setState(prevState => ({
                    ...prevState,
                    selectedIndex: index
                  }))
                }
                onMouseLeave={() =>
                  setState(prevState => ({
                    ...prevState,
                    selectedIndex: -1
                  }))
                }
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
