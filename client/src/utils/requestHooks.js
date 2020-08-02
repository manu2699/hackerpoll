import axios from "axios";

export default async ({
  url, method, body = {},
  onSuccess = undefined, onError = undefined, noToken = undefined
}) => {
  let token = await localStorage.getItem("token")
  if (token === null && noToken) {
    noToken();
    return;
  }
  try {
    const { data } = await axios({
      method,
      url,
      data: { ...body },
      headers: { Authorization: token }
    })
    if (onSuccess) {
      onSuccess(data)
      return;
    }
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.message;
      console.log(errors)
      if (onError) {
        onError(errors)
      }
    }
  }
}
