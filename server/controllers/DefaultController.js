// use if requiring a mongo connection
// const mongoClient = require('../models/MongoConnection');
const icsCalendar = require('node-ical')

const getCalendar = async (req, res, next) => {

  const startDate = new Date('March 1, 2021');
  const calendar = await icsCalendar.async.fromURL(req.body);
  const allEvents = []

  for (const event of Object.values(calendar)) {
    if (event.type === "VEVENT") {
      if (event.start > startDate) {
        if (!(event.summary.includes("WRK") || event.summary.includes("LAB") || event.summary.includes("CLN"))) {
          if (event.rrule) {

            // If the event has recurrence rules, then get all occurrences and push them.
            for (const occurrence of event.rrule.all()) {
              let duration = event.end - event.start

              let endDate = new Date(occurrence)
              endDate.setMilliseconds(endDate.getMilliseconds() + duration)

              allEvents.push({
                title: event.summary,
                description: event.description,
                location: event.location,
                start: occurrence,
                end: endDate,
              })
            }
          } else {

            // If the event has no rules, push it.
            allEvents.push({
              title: event.summary,
              description: event.description,
              location: event.location,
              start: event.start,
              end: event.end,
            })
          }
        }
      }
    }
  }

  console.log(allEvents)

  res.json(allEvents)
}

module.exports = {
  getCalendar
}
