export function isIOS(): boolean {
  const ua = navigator.userAgent;
  const isAppleTouch = /iPad|iPhone|iPod/.test(ua);
  // iPadOS 13+ reports as "Macintosh" but exposes touch points, unlike a real Mac.
  const isIpadOS = ua.includes("Macintosh") && navigator.maxTouchPoints > 1;
  return isAppleTouch || isIpadOS;
}

export function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
