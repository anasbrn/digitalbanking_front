import { JwtPayload as BaseJwtPayload } from 'jwt-decode';

export interface JwtPayload extends BaseJwtPayload {
  scope?: string;
}
