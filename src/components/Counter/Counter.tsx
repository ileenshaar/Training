import React, { Component } from 'react'

interface CounterProps {
  max: number
  step: number
}

interface CounterState {
  count: number
}

function storeStateInlocalStorage(this: Counter) {
  localStorage.setItem('counterState', JSON.stringify(this.state))
  console.log(localStorage)
}

const getStateFromLocal = () => {
  const storage = localStorage.getItem('counterState')
  if (storage) return JSON.parse(storage)
  return { count: 0 }
}

class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props)
    this.state = getStateFromLocal()
    // this.state = {
    //   count: 0
    // }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this)
  }

  updateDocumentTitle() {
    document.title = String(this.state.count)
  }

  increment() {
    this.setState(
      (state, props) => {
        const { max, step } = props
        if (state.count >= max) return
        return { count: state.count + step }
      },
      () => {
        storeStateInlocalStorage.bind(this)
        // storeStateInlocalStorage()  will not work
        this.updateDocumentTitle()
      }
    )
  }

  decrement() {
    this.setState(
      state => ({ count: state.count - 1 }),

      this.updateDocumentTitle
    )
  }

  reset() {
    this.setState({ count: 0 }, this.updateDocumentTitle)
  }

  render() {
    const { count } = this.state

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    )
  }
}

export default Counter
