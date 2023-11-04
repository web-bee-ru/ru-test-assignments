import { Link } from 'wouter';

export  const Layout = ({ children }) => (
  <div className="container">
    <div className="d-flex gap-3 mb-2">
      <Link href="/">Resume</Link>
      <Link href="/map">Map</Link>
      <Link href="/time">Time</Link>
    </div>
    <div id="content">{children}</div>
  </div>
);
