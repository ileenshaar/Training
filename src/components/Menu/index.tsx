import React, { useEffect, useRef, useState } from 'react'
import './MenuStyle.css'
import MenuItems from './MenuItems'

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

  const dropdownList = document.getElementById('myDropdownList')
  document.addEventListener('click', function (event) {
    if (dropdownList) {
      if (dropdownList && !dropdownList.contains(event.target as Node)) {
        setState(prevState => ({
          ...prevState,
          showDropdown: false,
          emptySearchQuery: false,
          searchInput: '',
          selectedIndex: -1
        }))
      }
    }
  })

  const toggleDropdown = () => {
    setState(prevState => ({
      ...prevState,
      showDropdown: !showDropdown,
      searchInput: '',
      selectedIndex: -1,
      emptySearchQuery: showDropdown ? false : true
    }))
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    showDropdown || !inputRef.current || inputRef.current.focus()
  }

  const handleOptionClicked = (chosenOption: string) => {
    inputRef.current ? inputRef.current.blur() : null
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
    setState(prevState => ({
      ...prevState,
      selectedIndex: -1,
      showDropdown: false,
      option: chosenOption,
      emptySearchQuery: false,
      searchInput: ''
    }))
  }

  const handleInputChange = (value: string) => {
    setState(prevState => ({
      ...prevState,
      searchInput: value,
      selectedIndex: -1
    }))
    scrollerRef.current ? (scrollerRef.current.scrollTop = 0) : null
  }

  const MouseHover = (index: number) => {
    setState(prevState => ({
      ...prevState,
      selectedIndex: index
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

      const itemRef = document.getElementById(`item-${selectedIndex + 1}`)
      if (itemRef) {
        itemRef.focus()
      }
    }
  }

  const handleArrowUp = () => {
    if (selectedIndex > 0) {
      setState(prevState => ({
        ...prevState,
        selectedIndex: prevState.selectedIndex - 1
      }))
      const itemRef = document.getElementById(`item-${selectedIndex - 1}`)
      if (itemRef) {
        itemRef.focus()
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
    setState(prevState => ({
      ...prevState,
      filteredItems: filteredMenuItems
    }))
  }, [searchInput, MenuItems])

  return (
    <div
      id="myDropdownList"
      className="dropdown"
      onKeyDown={handleKeyDown}
      onClick={toggleDropdown}
    >
      <input
        ref={inputRef}
        type="text"
        value={emptySearchQuery ? searchInput : option}
        className="SearchInput"
        onChange={e => handleInputChange(e.target.value)}
      />
      <div
        ref={scrollerRef}
        className={`dropdown-content ${showDropdown ? 'show' : ''}`}
      >
        {showDropdown
          ? filteredItems.map(
              (item: { value: string; text: string }, index: number) => (
                <a
                  tabIndex={0}
                  id={`item-${index}`}
                  key={item.value}
                  className={selectedIndex == index ? 'selected' : ''}
                  onClick={() => {
                    handleOptionClicked(item.text)
                  }}
                  onMouseOver={() => MouseHover(index)}
                  onMouseLeave={() => MouseHover(-1)}
                >
                  {item.text}
                </a>
              )
            )
          : null}
      </div>
      <button className="dropbtn">
        <span className="arrow" />
      </button>
    </div>
  )
}
export default Menu
