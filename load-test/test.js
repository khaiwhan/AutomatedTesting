import http from 'k6/http';
import { check, sleep } from 'k6';

const url = __ENV.API_URL || '';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const res = http.get(url);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
