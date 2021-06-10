/// This code is based on MIT licensed code from: https://github.com/PostHog/timestamp-parser-plugin

function processEvent(event) {
  const date = new Date();
  const clientTimeZone = event.properties['timezone'];
  event.properties['timezoneCheck'] = clientTimeZone;
  /// en-GB formats date: day/month/year
  event.properties['day_of_the_week'] = date.toLocaleDateString('en-GB', { weekday: 'long', timezone: 'America/Chicago' });
  const dayMonthYear = date.toLocaleDateString('en-GB').split('/');
  event.properties['day'] = Number(dayMonthYear[0]);
  event.properties['month'] = Number(dayMonthYear[1]);
  event.properties['year'] = Number(dayMonthYear[2]);
  event.properties['time_of_day'] = date.getHours();
  return event;
}

module.exports = {
    processEvent
}
