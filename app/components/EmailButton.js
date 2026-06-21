'use client';

const EMAIL = 'nt2613@nyu.edu';
const DEFAULT_SUBJECT = 'Opportunity for Nirman Taterh';

function buildMailLinks(subject, body) {
  const encodedSubject = encodeURIComponent(subject || DEFAULT_SUBJECT);
  const encodedBody = body ? `&body=${encodeURIComponent(body)}` : '';
  const mailto = `mailto:${EMAIL}?subject=${encodedSubject}${encodedBody}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodedSubject}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  return { mailto, gmail };
}

export default function EmailButton({ className, children, subject = DEFAULT_SUBJECT, body }) {
  const { mailto, gmail } = buildMailLinks(subject, body);

  function handleClick(e) {
    e.preventDefault();
    window.location.href = mailto;
    setTimeout(() => {
      if (!document.hidden) {
        window.open(gmail, '_blank', 'noopener');
      }
    }, 600);
  }

  return (
    <a href={mailto} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
