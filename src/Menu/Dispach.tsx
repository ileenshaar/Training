export const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT'
export const SET_OPTION = 'SET_OPTION'
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN'
export const SET_SELECTED_INDEX = 'SET_SELECTED_INDEX'
export const SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS'
export const SET_EMPTY_SEARCH_QUERY = 'SET_EMPTY_SEARCH_QUERY'

export const setSearchInput = (searchInput: string) => ({
  type: SET_SEARCH_INPUT,
  searchInput
})

export const setOption = (option: string) => ({
  type: SET_OPTION,
  option
})

export const toggleDropdown = (dropDown: boolean) => ({
  type: TOGGLE_DROPDOWN,
  dropDown
})

export const setSelectedIndex = (selectedIndex: number) => ({
  type: SET_SELECTED_INDEX,
  selectedIndex
})

export const setFilteredItems = (filteredItems: object[]) => ({
  type: SET_FILTERED_ITEMS,
  filteredItems
})

export const setEmptySearchQuery = (emptySearchQuery: boolean) => ({
  type: SET_EMPTY_SEARCH_QUERY,
  emptySearchQuery
})
