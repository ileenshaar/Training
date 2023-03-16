import React, { useEffect, useRef, useReducer } from 'react'
import './MenuStyle.css'
import { MenuItems } from './MenuItems'
import { reducer } from './Reducer-hook'

const initialState = {
  option: 'Type..',
  searchInput: '',
  showDropdown: false,
  selectedIndex: -1,
  filteredItems: MenuItems,
  emptySearchQuery: false
}

export const Menu = () => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleDropdown = () => {
    dispatch({
      type: 'show-Dropdown',
      showDropdown: !state.showDropdown
    })

    dispatch({
      type: 'search-Input',
      searchInput: ''
    })
  }

  const handleOptionClicked = (chosenOption: string) => {
    dispatch({
      type: 'chosen-Option',
      option: chosenOption
    })
    dispatch({
      type: 'empty-SearchQuery',
      emptySearchQuery: false
    })
    dispatch({
      type: 'show-Dropdown',
      showDropdown: false
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollerRef.current) {
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          if (state.selectedIndex > 0) {
            dispatch({
              type: 'selected-Index',
              selectedIndex: state.selectedIndex - 1
            })
            console.log(state.filteredItems.length)
            scrollerRef.current.scrollTop -= 100
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          if (state.selectedIndex < state.filteredItems.length - 1) {
            dispatch({
              type: 'selected-Index',
              selectedIndex: state.selectedIndex + 1
            })
            if (state.selectedIndex >= 2) scrollerRef.current.scrollTop += 100
          }
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (
            state.selectedIndex >= 0 &&
            state.selectedIndex < state.filteredItems.length
          ) {
            dispatch({
              type: 'chosen-Option',
              option: state.filteredItems[state.selectedIndex].text
            })
          }
          dispatch({
            type: 'show-Dropdown',
            showDropdown: false
          })
        }
      }
    }

    if (state.showDropdown) {
      window.addEventListener('keydown', handleKeyDown)
      dispatch({
        type: 'empty-SearchQuery',
        emptySearchQuery: true
      })
    } else {
      window.removeEventListener('keydown', handleKeyDown)
      dispatch({
        type: 'empty-SearchQuery',
        emptySearchQuery: false
      })
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.showDropdown, state.selectedIndex])

  useEffect(() => {
    const filteredMenuItems = MenuItems.filter(item =>
      item.text.toLowerCase().includes(state.searchInput.toLowerCase())
    )
    dispatch({
      type: 'filtered-Items',
      filteredItems: filteredMenuItems
    })
  }, [state.searchInput, MenuItems])

  return (
    <div className="dropdown">
      <input
        type="text"
        value={state.emptySearchQuery ? state.searchInput : state.option}
        onFocus={() =>
          dispatch({
            type: 'search-Input',
            searchInput: ''
          })
        }
        className="SearchInput"
        onChange={e =>
          dispatch({
            type: 'search-Input',
            searchInput: e.target.value
          })
        }
      />
      <div
        ref={scrollerRef}
        className={`dropdown-content ${state.showDropdown ? 'show' : ''}`}
      >
        {state.showDropdown &&
          state.filteredItems.map(
            (item: { value: string; text: string }, index: number) => (
              <a
                key={item.value}
                className={state.selectedIndex == index ? 'selected' : ''}
                onClick={() => {
                  handleOptionClicked(item.text)
                }}
                onMouseOver={() =>
                  dispatch({
                    type: 'selected-Index',
                    selectedIndex: index
                  })
                }
                onMouseLeave={() =>
                  dispatch({
                    type: 'selected-Index',
                    selectedIndex: -1
                  })
                }
              >
                {item.text}
              </a>
            )
          )}
      </div>
      <button className="dropbtn" onClick={toggleDropdown}>
        <span className="arrow" />
      </button>
    </div>
  )
}

export default Menu
