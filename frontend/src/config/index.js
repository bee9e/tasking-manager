// API ENDPOINTS
export const API_URL = process.env.REACT_APP_BASE_URL
  ? new URL('/api/v2/', process.env.REACT_APP_BASE_URL)
  : 'http://127.0.0.1:5000/api/v2/';
export const EDITS_API_URL = process.env.REACT_APP_EDITS_API_URL || '';

// APPLICATION SETTINGS
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || 'en';
export const PROJECTCARD_CONTRIBUTION_SHOWN_THRESHOLD =
  process.env.REACT_APP_PROJECTCARD_CONTRIBUTION_SHOWN_THRESHOLD || 5;
export const INTERMEDIATE_LEVEL_COUNT =
  Number(process.env.REACT_APP_TM_MAPPER_LEVEL_INTERMEDIATE) || 250;
export const ADVANCED_LEVEL_COUNT = Number(process.env.REACT_APP_TM_MAPPER_LEVEL_ADVANCED) || 500;
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
export const ENABLE_SERVICEWORKER = process.env.REACT_APP_ENABLE_SERVICEWORKER || 0;
export const MAP_MAX_AREA = process.env.REACT_APP_MAP_MAX_AREA || 5000;

// ORGANISATIONAL INFORMATION
export const ORG_NAME = process.env.REACT_APP_ORG_NAME || '';
export const ORG_CODE = process.env.REACT_APP_ORG_CODE || '';
export const ORG_URL = process.env.REACT_APP_ORG_URL || '';
export const ORG_PRIVACY_POLICY_URL = process.env.REACT_APP_ORG_PRIVACY_POLICY_URL || '';
export const ORG_TWITTER = process.env.REACT_APP_ORG_TWITTER || 'http://twitter.com';
export const ORG_FB = process.env.REACT_APP_ORG_FB || 'https://www.facebook.com';
export const ORG_INSTAGRAM = process.env.REACT_APP_ORG_INSTAGRAM || 'https://www.instagram.com';
export const ORG_YOUTUBE = process.env.REACT_APP_ORG_YOUTUBE || 'https://www.youtube.com';
export const ORG_GITHUB = process.env.REACT_APP_ORG_GITHUB || 'https://github.com/';

export const CUSTOM_ID_EDITOR_INSTANCE_NAME = process.env.REACT_APP_CUSTOM_ID_EDITOR_INSTANCE_NAME;
export const CUSTOM_ID_EDITOR_INSTANCE_HOST = process.env.REACT_APP_CUSTOM_ID_EDITOR_INSTANCE_HOST;

export const TASK_COLOURS = {
  READY: '#fff',
  LOCKED_FOR_MAPPING: '#fff',
  MAPPED: '#ade6ef',
  LOCKED_FOR_VALIDATION: '#ade6ef',
  VALIDATED: '#40ac8c',
  INVALIDATED: '#fceca4',
  BADIMAGERY: '#d8dae4',
  PRIORITY_AREA: '#ffc5c8',
};
