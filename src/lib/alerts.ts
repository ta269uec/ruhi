export interface AlertState {
  armed: boolean;
  triggered: boolean;
}

/**
 * Edge-triggered, not level-triggered: the alert fires exactly once on the
 * transition from above the trigger to at-or-below it, and only re-arms once
 * the percentile climbs back above the trigger (see README "Watch — Alert
 * semantics": fires once on a downward cross, not continuously while below).
 *
 * Pass `prev` to re-evaluate against the last known state. Omitting it
 * establishes a fresh baseline: an already-below condition counts as already
 * triggered (informative for a slice added below its own trigger), not as a
 * live crossing event.
 */
export function evaluateAlert(pct: number, trigger: number, prev?: AlertState): AlertState {
  const isBelow = pct <= trigger;
  if (!isBelow) {
    return { armed: true, triggered: false };
  }
  const wasArmed = prev ? prev.armed : true;
  return { armed: false, triggered: wasArmed ? true : prev!.triggered };
}
