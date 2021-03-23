import React from 'react'
import {useState} from 'react'

export default function UrlForm() {

  const [url, setUrl] = useState('')
  const [calData, setCalData] = useState([])

  const urlData = {
    url: url
  }

  const handleSubmit = () => {
    console.log('Submitting Request')
    const reqOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(urlData),
    }

    fetch('/api/test', reqOptions).then(async (r) => {
      const data = await r.json();
      console.log(data)
      data.sort((a, b) => (a.start > b.start) ? 1 : -1)
      setCalData(data)
    })
  }

  return (
    <div>
      <form>
        <input type={'text'} value={url}
               onChange={(e) => setUrl(e.target.value)}/>
      </form>
      <button onClick={() => handleSubmit()}>Submit URL</button>
      <button
        onClick={() => setUrl('https://uoacal.auckland.ac.nz/calendar/167b0924ba8785a4d69660125665bf00b140d19db8cb7fb94167d9aaeec1ea3f3b95cdfa1cae362da802bd4d232bbfb386c845a592301e89f3b4f924c50966f6')}>Auto
        URL
      </button>
      <div>

        {calData.map((event, index) => {
          return (
            <div>
              <h3>{index}</h3>
              <p>{event.title}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{new Date(event.start).toString()}</p>
              <p>{new Date(event.end).toString()}</p>
              <br/>
              <br/>
            </div>
            )
        })}

      </div>
    </div>
  )

}