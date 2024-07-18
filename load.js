import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 50 }, // ramp up to 10 users
    { duration: '2m', target: 10 }, // stay at 10 users
    { duration: '1m', target: 30 }, // ramp up to 20 users
    { duration: '2m', target: 10 }, // stay at 20 users
    { duration: '1m', target: 50 },  // ramp down to 0 users
  ],
};

export default function () {
  const url = 'http://localhost:3000';

  let res = http.get(url);
  console.log(`Response time for URL: ${res.timings.duration} ms`);
  sleep(1); // Simulate some think time between requests
}
