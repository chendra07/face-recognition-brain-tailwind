import jwt_decode from "jwt-decode";

type JWTBodyType = {
  email: string;
  userid: number;
  exp: number;
  iat: number;
};

export function jwtDecoder(token: string) {
  const decoded = jwt_decode(token);
  return decoded as JWTBodyType;
}
