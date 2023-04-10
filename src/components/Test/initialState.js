// import name from 'random-name';
import id from 'uuid/v4';

// This is some dummy data.
const initialState = [
  {
    id: id(),
    person: "nidal",
    reason: 'Parked too close to me in the parking lot',
    forgiven: false
  },
  {
    id: id(),
    person: "ileen",
    reason: 'Did not brew another pot of coffee after drinking the last cup',
    forgiven: false
  },
  {
    id: id(),
    person: "oday",
    reason: 'Failed to wish me a happy birthday but ate my cake',
    forgiven: false
  },
  ];

export default initialState;
