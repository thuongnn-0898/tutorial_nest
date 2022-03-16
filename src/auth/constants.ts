export const jwtConstants = {
  secret: process.env.SECRET_JWT || 'SECRECT',
  expires: process.env.EXPIRE_JWT || '3600',
};
