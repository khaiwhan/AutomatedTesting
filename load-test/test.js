import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const res = http.get('https://66c7f957732bf1b79fa7e2b9.mockapi.io/item');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
