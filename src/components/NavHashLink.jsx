/**
 * NavHashLink — anchor-style link that navigates to a section on the
 * home page from ANY route.
 *
 * Behaviour:
 *  - If already on `/`  → smooth-scrolls to `#sectionId`.
 *  - If on another page → navigates to `/`, then scrolls after mount.
 *
 * @param {string}   to        — hash path, e.g. `/#story`
 * @param {function} [onClick] — optional callback (e.g. close mobile menu)
 */
import { useNavigate, useLocation } from 'react-router-dom';

const SCROLL_DELAY_MS = 300;

export default function NavHashLink({ to, children, className, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    const sectionId = to.replace('/#', '');

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, SCROLL_DELAY_MS);
    }

    if (onClick) onClick();
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
