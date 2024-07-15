import { FetchMethod, URL } from './Api';

const getAllFilters = async () => {
  const responseJson = await fetch(URL.filters);
  const response = await responseJson.json();
  console.log('response -> ', JSON.stringify(response, null, 2));
  return response;
};

const getCartoonImages = async obj => {
  const form = FetchMethod.getFormData(obj);
  const response = await FetchMethod.race({ url: URL.feature, body: form });
  return response;
};

const getFilteredResult = async obj => {
  const form = FetchMethod.getFormData(obj);
  const response = await FetchMethod.race({ url: URL.result, body: form });
  return response;
};

export { getAllFilters, getCartoonImages, getFilteredResult };
