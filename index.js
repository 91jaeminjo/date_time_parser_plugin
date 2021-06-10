/// This code modified from: https://github.com/PostHog/timestamp-parser-plugin

function processEvent(event) {
  const date = new Date(event.timestamp || event.data?.timestamp || event.properties?.timestamp || event.now || event.sent_at || event.properties?.['$time']);  
  event.properties['day_of_the_week'] = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const dayMonthYear = date.toLocaleDateString('en-GB').split('/');
  event.properties['day'] = Number(dayMonthYear[0]);
  event.properties['month'] = Number(dayMonthYear[1]);
  event.properties['year'] = Number(dayMonthYear[2]);
  event.properties['time_of_day'] = date.getUTCHours();
  return event;
}

module.exports = {
    processEvent
}
