const BASE_URL = 'https://app-manager-api.maheshpatel.me';
const FILTER_URL = 'https://cartoonai-api.maheshpatel.me';

const URL = {
  BaseUrl: BASE_URL,
  AppUrl: `${BASE_URL}/api/app`,
  createAppRequest: '/create-app-request',
  filters: FILTER_URL + '/photolab-get-all-templates-with-categories',
  result: FILTER_URL + '/photolab-get-edited-image-or-video-or-gif',
};

export default URL;
