import { MenuItems } from './MenuItems'
import * as actions from './Dispach'

export interface State {
  option: string
  searchInput: string
  showDropdown: boolean
  selectedIndex: number
  filteredItems: object[]
  emptySearchQuery: boolean
}

export const initialState: State = {
  option: 'Type..',
  searchInput: '',
  showDropdown: false,
  selectedIndex: -1,
  filteredItems: MenuItems,
  emptySearchQuery: false
}
export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case actions.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.searchInput
      }
    case actions.SET_OPTION:
      return {
        ...state,
        option: action.option
      }
    case actions.TOGGLE_DROPDOWN:
      return {
        ...state,
        showDropdown: !state.showDropdown,
        emptySearchQuery: !state.showDropdown,
        searchInput: '',
        selectedIndex: -1
      }
    case actions.SET_SELECTED_INDEX:
      return {
        ...state,
        selectedIndex: action.selectedIndex
      }
    case actions.SET_FILTERED_ITEMS:
      return {
        ...state,
        filteredItems: action.filteredItems
      }
    case actions.SET_EMPTY_SEARCH_QUERY:
      return {
        ...state,
        emptySearchQuery: action.emptySearchQuery
      }
    default:
      return state
  }
}
