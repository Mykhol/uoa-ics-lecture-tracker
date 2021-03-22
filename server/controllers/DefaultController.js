// use if requiring a mongo connection
// const mongoClient = require('../models/MongoConnection');
const ical = require('node-ical')

const getCalendar = async (req, res, next) => {
  const calendar = await ical.async.fromURL(req.body);
  const params = [];
  const events = [];
  
  for (const event of Object.values(calendar)) {
    if (event.type === "VEVENT") {
      events.push(event)
      console.log(event.description)
    } else {
      params.push(event)
    }
  }
  
  res.json(calendar)
}

module.exports = {
  getCalendar
}
