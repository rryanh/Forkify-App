import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config';

export const AJAX = async function (url, recipe = undefined) {
  try {
    const fetchReq = recipe
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        })
      : fetch(url);

    const res = await Promise.race([fetchReq, timeout(TIMEOUT_SECONDS)]);
    const resData = await res.json();

    if (!res.ok) throw new Error(`${resData.message} (${res.status})`);

    const { data } = resData;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     const objData = data.data;
//     return objData;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const sendJSON = async function (url, recipe) {
//   try {
//     const fetchReq = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(recipe),
//     });

//     const res = await Promise.race([fetchReq, timeout(TIMEOUT_SECONDS)]);
//     const resData = await res.json();

//     if (!res.ok) throw new Error(`${resData.message} (${res.status})`);

//     const { data } = resData;

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
