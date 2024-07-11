import REQUEST from './REQUEST';
const GET = async ({ EndPoint, NeedToken }) => {
  return await REQUEST({
    Method: 'GET',
    EndPoint,
    NeedToken,
  });
};
const POST = async ({ EndPoint, Params, NeedToken }) => {
  return await REQUEST({
    Method: 'POST',
    Params,
    EndPoint,
    NeedToken,
  });
};
const PUT = async ({ EndPoint, Params, NeedToken }) => {
  return await REQUEST({
    Method: 'PUT',
    Params,
    EndPoint,
    NeedToken,
  });
};
const DELETE = async ({ EndPoint, Params, NeedToken }) => {
  return await REQUEST({
    Method: 'DELETE',
    Params,
    EndPoint,
    NeedToken,
  });
};
// For FORMDATA....
const POST_FORMDATA = async ({ EndPoint, Params, NeedToken }) => {
  return await REQUEST({
    Method: 'POST',
    IsformData: true,
    Params,
    EndPoint,
  });
};
const PUT_FORMDATA = async ({ EndPoint, Params, NeedToken }) => {
  return await REQUEST({
    Method: 'PUT',
    IsformData: true,
    Params,
    EndPoint,
    NeedToken,
  });
};

const race = async ({
  url,
  method = 'POST',
  body,
  headers = defaultHeader,
}) => {
  const response = await Promise.race([
    fetch(url, {
      method: method,
      body: body,
      headers: headers,
    }),
    new Promise(res =>
      setTimeout(() => res({ json: () => dummyResponse }), 50000),
    ),
  ]);
  return await response.json();
};

const getFormData = obj => {
  const form = new FormData();
  Object.keys(obj).forEach(key => {
    if (key === 'image') {
      form.append(key, {
        name: obj[key]?.filename,
        type: obj[key]?.mime || 'image/jpeg',
        uri: obj[key]?.path,
      });
    } else {
      form.append(key, obj[key]);
    }
  });
  return form;
};

const dummyResponse = { timeout: true };
const defaultHeader = {
  Accept: '*/*',
  'Content-Type': 'multipart/form-data',
};

const FetchMethod = {
  GET,
  POST,
  POST_FORMDATA,
  PUT,
  PUT_FORMDATA,
  DELETE,
  race,
  getFormData,
};
export default FetchMethod;
