import { describe, expect, it } from "vitest";
import { evaluateAlert } from "./alerts";

describe("evaluateAlert", () => {
  it("does not trigger on a fresh baseline above the trigger", () => {
    expect(evaluateAlert(22, 20)).toEqual({ armed: true, triggered: false });
  });

  it("treats an already-below fresh baseline as already triggered", () => {
    expect(evaluateAlert(15, 20)).toEqual({ armed: false, triggered: true });
  });

  it("treats pct exactly at the trigger as triggered", () => {
    expect(evaluateAlert(20, 20)).toEqual({ armed: false, triggered: true });
  });

  it("fires on a downward crossing from an armed state", () => {
    const prev = evaluateAlert(22, 20); // armed, not yet triggered
    const next = evaluateAlert(19, 20, prev);
    expect(next).toEqual({ armed: false, triggered: true });
  });

  it("stays triggered — does not re-fire — while it remains below, once already fired", () => {
    let state = evaluateAlert(22, 20);
    state = evaluateAlert(19, 20, state); // crosses down, fires
    expect(state).toEqual({ armed: false, triggered: true });
    state = evaluateAlert(10, 20, state); // still below, further down
    expect(state).toEqual({ armed: false, triggered: true });
    state = evaluateAlert(18, 20, state); // still below, ticks back up but not past trigger
    expect(state).toEqual({ armed: false, triggered: true });
  });

  it("re-arms once the percentile climbs back above the trigger", () => {
    let state = evaluateAlert(19, 20); // fresh baseline below -> triggered
    expect(state.triggered).toBe(true);
    state = evaluateAlert(25, 20, state);
    expect(state).toEqual({ armed: true, triggered: false });
  });

  it("can fire again on a second crossing after re-arming", () => {
    let state = evaluateAlert(22, 20); // armed
    state = evaluateAlert(19, 20, state); // fires
    state = evaluateAlert(25, 20, state); // re-arms
    state = evaluateAlert(18, 20, state); // fires again
    expect(state).toEqual({ armed: false, triggered: true });
  });

  it("never shows triggered while strictly above the trigger, regardless of prior state", () => {
    for (let pct = 21; pct <= 100; pct++) {
      expect(evaluateAlert(pct, 20, { armed: false, triggered: true })).toEqual({ armed: true, triggered: false });
    }
  });
});
