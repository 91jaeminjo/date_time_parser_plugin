/// This code is based on MIT licensed code from: https://github.com/PostHog/timestamp-parser-plugin

function processEvent(event) {
  const date = new Date(event.timestamp || event.data?.timestamp || event.properties?.timestamp || event.now || event.sent_at || event.properties?.['$time']);
  const clientTimeZone = event.properties['\$timezone'];
  event.properties['timezoneCheck'] = clientTimeZone;
  /// en-GB formats date: day/month/year
  event.properties['day_of_the_week'] = date.toLocaleDateString('en-GB', { weekday: 'long', timezone: 'America/Chicago' });
  const dayMonthYear = date.toLocaleDateString('en-GB').split('/');
  event.properties['day'] = Number(dayMonthYear[0]);
  event.properties['month'] = Number(dayMonthYear[1]);
  event.properties['year'] = Number(dayMonthYear[2]);
  event.properties['time_of_day'] = date.toLocaleTimeString('en-GB', {timezone: 'America/Chicago'}).split(':')[0];
  return event;
}

module.exports = {
    processEvent
}
