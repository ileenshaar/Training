import { connect } from 'react-redux'
import NewItemForm from '../components/NewItemForm'
import { addNemItem } from '../store/items/actions'

const mapDispatchToProps = {
  onSubmit: (name, price) => addNemItem(name, price)
}

//first argument is mapState, the second is mapDispatch
export const NewItemFormContainer = connect(
  null,
  mapDispatchToProps
)(NewItemForm)

//or:
// const mapDispatchToProps = dispatch => {
//     return  bindActionCreators{
//       onSubmit: (name, price) => addNemItem(name, price)
//     },dispatch
//   }
