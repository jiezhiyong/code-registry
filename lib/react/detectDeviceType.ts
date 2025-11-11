export function detectDeviceType(navigator: Navigator) {
  const { userAgent: ua } = navigator;

  if (/(tablet)|(iPad)|(Nexus 9)/i.test(ua)) return "tablet";
  if (/(mobi)/i.test(ua)) return "phone";

  return "desktop";
}

export type UserAgentDeviceType = NonNullable<ReturnType<typeof detectDeviceType>>;
