import md5 from 'crypto-js/md5';

export const getGravatar = (gravatarEmail) => {
  const hash = md5(gravatarEmail).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};
