import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://shop.acloudbank.com/';
export const DEFAULT_METADATA_TITLE = 'Acloudbank Shop';
export const DEFAULT_METADATA_DESCRIPTION =
	'A graphQL limitless shop';
export const DEFAULT_METADATA_IMAGE = 'https://shop.acloudbank.com/social-image.png';
export const DEFAULT_LOCALE = 'en';
