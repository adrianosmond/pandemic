// eslint-disable-next-line import/prefer-default-export
export const getPositionsFromVectors = (vectors) =>
  vectors.map((v) => [v.x, v.y, v.z]).flat();
