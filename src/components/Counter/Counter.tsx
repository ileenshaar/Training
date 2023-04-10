import React, { useState, useEffect, useRef } from 'react'

interface CounterProps {
  max: number
  step: number
}

// const storeStateInlocalStorage = (count: number) => {
//   localStorage.setItem('counterState', JSON.stringify({ count }))
// }

// const getStateFromLocalStorage = () => {
//   const storage = localStorage.getItem('counterState')
//   if (storage) return JSON.parse(storage).count
//   return { count: 0 }
// }

// const useLocalStorage = (initialState: number, key: string) => {
//   const get = (): number | undefined => {
//     const storage = localStorage.getItem(key)
//     if (storage) return JSON.parse(storage).value
//     return undefined
//   }
//   const [value, setValue] = useState<number>(get() ?? initialState)

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify({ value }))
//   }, [value])

//   return [value, setValue] as const
// }

const Counter = ({ max, step }: CounterProps) => {
  const [count, setCount] = useState<number>(0)
  const countRef = useRef<number>()

  let message = ''
  if (countRef.current !== undefined) {
    if (countRef.current < count) {
      message = 'Higher'
    }
    if (countRef.current > count) {
      message = 'Lower'
    }
  }

  const increment = () => {
    setCount(c => c + 1)
  }

  const decrement = () => {
    setCount((c: number) => c - 1)
  }

  const reset = () => setCount(0)

  // const increment = () =>{
  //   setCount(c => c+1)
  //   setCount(c => c+1)
  //   setCount(c => c+1)
  // } count:3

  useEffect(() => {
    document.title = `Counter: ${count}`
    const id = setInterval(() => {
      console.log(`Count: ${count}`)
    }, 3000)
    countRef.current = count
    return () => clearInterval(id)
  }, [count])

  // useEffect(() => {
  //   storeStateInlocalStorage(count)
  // }, [count])

  return (
    <div className="Counter">
      <p>{message}</p>
      <p className="count">{count}</p>
      <section className="controls">
        <button
          onClick={() => {
            increment()
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            decrement()
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            reset()
          }}
        >
          Reset
        </button>
      </section>
    </div>
  )
}

export default Counter
