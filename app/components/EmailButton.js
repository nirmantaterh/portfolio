'use client';

const EMAIL = 'nt2613@nyu.edu';
const SUBJECT = 'Opportunity for Nirman Taterh';
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

export default function EmailButton({ className, children }) {
  function handleClick(e) {
    e.preventDefault();
    // Try mailto first (opens native mail app if configured)
    window.location.href = MAILTO;
    // After 600ms, if still on page, open Gmail as fallback
    setTimeout(() => {
      if (!document.hidden) {
        window.open(GMAIL, '_blank', 'noopener');
      }
    }, 600);
  }

  return (
    <a href={MAILTO} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
