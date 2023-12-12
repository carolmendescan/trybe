export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS' | 'CREATED',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
