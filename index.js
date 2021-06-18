/// This code is based on MIT licensed code from: https://github.com/PostHog/timestamp-parser-plugin

function processEvent(event) {
  const date = new Date(event.timestamp || event.data?.timestamp || event.properties?.timestamp || event.now || event.sent_at || event.properties?.['$time']);
  const clientTimeZone = (event.properties['\$timezone'] || event.properties.timezone);
  const dayOfWeek =  date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: clientTimeZone });
  const dayMonthYear = date.toLocaleDateString('en-GB').split('/');
  const timeOfDay = date.toLocaleTimeString('en-GB', {timeZone: clientTimeZone}).split(':');
  
  /// en-GB formats date: day/month/year
  event.properties['date'] = date.toLocaleDateString('en-US', {timeZone: clientTimeZone});
  event.properties['day_of_the_week'] = dayOfWeek;
  event.properties['day'] = Number(dayMonthYear[0]);
  event.properties['month'] = Number(dayMonthYear[1]);
  event.properties['year'] = Number(dayMonthYear[2]);
  event.properties['time_of_day'] = timeOfDay[0];
  
  return event;
}

module.exports = {
    processEvent
}
