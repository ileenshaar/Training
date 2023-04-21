import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from 'redux'

//allows to take a set of functions,
// create one function that will pass a value through each of them
//compose()

const makeLouder = string => string.toUpperCase()
const repeateThreeTimes = string => string.repeat(3)
const embolden = string => string.bold()

//what compose gives for us:
// const makeLouderRepeateThreeTimesEmbolden = string =>
//   embolden(repeateThreeTimes(makeLouder(string)))

const makeLouderRepeateThreeTimesEmbolden = compose(
  embolden,
  repeateThreeTimes,
  makeLouder
)
