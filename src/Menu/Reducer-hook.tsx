interface State {
  option: string
  searchInput: string
  showDropdown: boolean
  selectedIndex: number
  filteredItems: string[]
  emptySearchQuery: boolean
}
export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'chosen-Option': {
      return {
        ...state,
        option: action.option
      }
    }
    case 'search-Input': {
      return {
        ...state,
        searchInput: action.searchInput
      }
    }
    case 'show-Dropdown': {
      return {
        ...state,
        showDropdown: action.showDropdown
      }
    }
    case 'selected-Index': {
      return {
        ...state,
        selectedIndex: action.selectedIndex
      }
    }
    case 'filtered-Items': {
      return {
        ...state,
        filteredItems: action.filteredItems
      }
    }
    case 'empty-SearchQuery': {
      return {
        ...state,
        emptySearchQuery: action.emptySearchQuery
      }
    }
  }

  throw Error('Unknown action: ' + action.type)
}
