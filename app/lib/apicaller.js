export const API_URL = "http://pp.f418.eu/article";
export default async function callApi(end_point, method) {
  let payload = {
    method,
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  };

  return fetch(`${API_URL}/${end_point}`, payload)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      return { errors: { base: "Something went wrong" } };
    });
}
