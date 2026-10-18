import { useState, useEffect } from 'react'

function Receive() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle')
  const [filename, setFilename] = useState('')

  const createSession = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/session', {
      method: 'POST',
    })

    const data = await response.json()

    setCode(data.code)
    setStatus('waiting')
  }

useEffect(() => {
  if (status !== 'waiting' || !code) {
    return
  }

  const checkStatus = async () => {
  const response = await fetch(`http://127.0.0.1:5000/status/${code}`)
  const data = await response.json()

  console.log(data)
  if (data.ready) {
  setFilename(data.filename)
  setStatus('received')
}
}

const interval = setInterval(checkStatus, 2000)
return () => clearInterval(interval)

}, [status, code])

  return (
    <main>
      <h1>Receive a Book</h1>

      <p>Generate a code and give it to the person sending your book.</p>

      <button onClick={createSession}>
        GET MY CODE
      </button>

      {code && (
        <div>
          <p>Your BookBridge code is:</p>
          <h2>{code}</h2>
        </div>
      )}
      {status === 'waiting' && (
  <p>Waiting for your book...</p>
)}
{status === 'received' && (
  <div>
    <p>Your book is here!</p>
    <h3>{filename}</h3>
  </div>
)}
    </main>
  )
}

export default Receive