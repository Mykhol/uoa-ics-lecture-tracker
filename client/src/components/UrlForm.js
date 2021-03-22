import React from 'react'
import { useState } from 'react'

export default function UrlForm () {
  
  const [url, setUrl] = useState('')
  
  const urlData = {
    url: url
  }
  
  const handleSubmit = () => {
    console.log('Submitting Request')
    const reqOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(urlData),
    }
    
    fetch('/api/test', reqOptions).then(async (r) => {
      const data = await r.json();
      console.log(data)
    })
  }
  
  return (
    <div>
      <form>
        <input type={'text'} value={url}
               onChange={(e) => setUrl(e.target.value)} />
      </form>
      <button onClick={() => handleSubmit()}>Submit URL</button>
    </div>
  )
  
}