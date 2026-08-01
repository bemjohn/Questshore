"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const TRUSTPILOT_SCRIPT_SRC = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
const TRUSTPILOT_TEMPLATE_ID = "56278e9abfbbba0bdcd568bc";
const TRUSTPILOT_BUSINESS_UNIT_ID = "6a620c5d5744cda5e7496f08";
const TRUSTPILOT_TOKEN = "35ddccc1-1995-4fe2-ab18-443480c53df9";

export default function TrustpilotWidget({ className = "" }) {
  const widgetRef = useRef(null);
  const pathname = usePathname();

  function loadWidget(force = false) {
    if (typeof window !== "undefined" && window.Trustpilot && widgetRef.current) {
      window.Trustpilot.loadFromElement(widgetRef.current, force);
    }
  }

  useEffect(() => {
    loadWidget(true);
  }, [pathname]);

  return (
    <>
      <Script
        src={TRUSTPILOT_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => loadWidget(true)}
      />
      <div className={`min-h-[52px] flex justify-center items-center my-4 w-full bg-transparent ${className}`}>
        <div
          ref={widgetRef}
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id={TRUSTPILOT_TEMPLATE_ID}
          data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
          data-style-height="52px"
          data-style-width="100%"
          data-theme="dark"
          data-token={TRUSTPILOT_TOKEN}
        >
          <a href="https://www.trustpilot.com/review/questashore.com" target="_blank" rel="noopener">
            Trustpilot
          </a>
        </div>
      </div>
    </>
  );
}
