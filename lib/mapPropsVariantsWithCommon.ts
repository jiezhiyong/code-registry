export const mapPropsVariantsWithCommon = <
  P extends Record<any, any>,
  VK extends keyof P,
  CK extends keyof P = never,
>(
  originalProps: P,
  variantKeys: VK[],
  commonKeys?: CK[],
) => {
  const props = Object.keys(originalProps)
    .filter((key) => !variantKeys.includes(key as VK) || commonKeys?.includes(key as CK))
    .reduce((acc, key) => ({ ...acc, [key]: originalProps[key as keyof P] }), {}) as Omit<
      P,
      Exclude<VK, CK>
    >;

  const variants = variantKeys.reduce(
    (acc, key) => ({ ...acc, [key]: originalProps[key] }),
    {},
  ) as Pick<P, VK>;

  return [props, variants] as const;
};