/**
 *  Generates dates for Google Fitness API request.
 *  If no argument is provided, returns a 0 length date that is still a valid
 *  request to the fitness API.
 *
 *  @param {number} days - Number of days from Date.now() you want data for.
 *  @returns {{startDate:string, endDate:string}} object in ISO format
 */
function getRequestDates(days) {
  const base = new Date()
  const msInDay = 86400000
  return days
    ? {
        endDate: base.toISOString(),
        startDate: new Date(base - msInDay * days).toISOString()
      }
    : {startDate: base.toISOString(), endDate: base.toISOString()}
}
// module.exports = {getRequestDates}
/**
Fetch the user's info, passing in the access token in the Authorization
HTTP request header.
*/

/* exported getUserInfo */

function getUserInfo(accessToken) {
  const {startDate, endDate} = getRequestDates(3)
  // console.log(startDate, endDate)
  const requestURL = `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startDate}&endTime=${endDate}`
  const requestHeaders = new Headers()
  requestHeaders.append('Authorization', 'Bearer ' + accessToken)
  const driveRequest = new Request(requestURL, {
    method: 'GET',
    headers: requestHeaders
  })
  console.log('fetching data from', requestURL)
  return fetch(driveRequest).then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw response.status
    }
  })
}
