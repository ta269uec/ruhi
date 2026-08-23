import { BackBar } from "../components/BackBar";
import { RangeMark } from "../components/RangeMark";
import { Wordmark } from "../components/Wordmark";
import { InstallHint } from "../components/InstallHint";
import styles from "./AboutScreen.module.css";

export function AboutScreen() {
  return (
    <div>
      <BackBar label="About Ruhi" fallback="/ranks" />

      <div className={styles.page}>
        <div className={styles.logoRow}>
          <RangeMark size={64} strokeWidth={2} />
        </div>

        <div className={styles.wordmarkBlock}>
          <Wordmark nameSize={34} descSize={9.5} descMarginTop={7} descLetterSpacing=".22em" align="center" />
        </div>

        <div className={styles.copy}>
          <div className={styles.headline}>The essence of a price</div>
          <div className={styles.paragraph}>
            <em>Ruhi</em> means soul. It is the right name for this app because a price is the only part of an
            investment you actually control, and almost the only part anyone ignores. Strip away the story, the
            ticker and the forecast, and what is left — what you paid, measured against everything that slice of
            the market has ever cost — is the thing that decides your return.
          </div>
          <div className={styles.paragraph}>
            So Ruhi does one thing. It takes every slice of the market — the nine US size and style boxes, dividend
            and income, international developed and emerging, gold, silver, energy and the rest — and asks how
            expensive each one is today relative to its own twenty-year history. Not against each other. Against
            itself.
          </div>
          <div className={styles.paragraph}>
            Then it says so in plain English: what you are buying, why it is priced where it is, what could go
            wrong, and which funds own it and at what cost. It will not tell you what to buy. It will tell you what
            is cheap.
          </div>
        </div>

        <div className={styles.epigraph}>
          <div className={styles.quote}>&ldquo;Price is what you pay. Value is what you get.&rdquo;</div>
          <div className={styles.attribution}>Warren Buffett</div>
        </div>

        <InstallHint />

        <div className={styles.method}>
          <div className={styles.methodHeading}>Method</div>
          <div className={styles.methodBody}>
            Each slice is ranked against its own history since 2006 on forward P/E, CAPE and price-to-book, equally
            weighted. Real-asset slices use real price and cost-curve percentiles instead of earnings multiples.
            Below the 30th percentile is Cheap, above the 70th is Rich.
          </div>
        </div>

        <div className={styles.closingLine}>Named for someone whose name means soul.</div>

        <div className={styles.disclaimer}>
          Ruhi is informational only and is not investment advice. All figures shown are illustrative sample data,
          not sourced from a licensed feed, and must not be relied on to make investment decisions. Past performance
          does not indicate future results. Using this app does not create an advisory or fiduciary relationship.
        </div>
      </div>
    </div>
  );
}
