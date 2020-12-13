import { ErrorInterceptor } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { ApiUrlInterceptor } from './api-url.interceptor';

export * from './error.interceptor';
export * from './token.interceptor';
export * from './api-url.interceptor';

export const interceptors = [ErrorInterceptor, TokenInterceptor, ApiUrlInterceptor];
