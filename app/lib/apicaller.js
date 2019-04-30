import { Alert } from 'react-native';
export const API_URL = "http://pp.f418.eu/";

export default async function callApi(end_point, method) {
  let payload = {
    method,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  };
  return fetch(`${API_URL}${end_point}`, payload)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        Alert.alert('Alert', 'There is an error in API call')
      }
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      return { errors: { base: "Something went wrong" } };
    });
}
