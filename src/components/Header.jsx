export default function Header({ children }) {
  return (
    <div id="header-wrapper">
      {/* TODO: Add logo element */}
      <h1 id="header-title">Candlelight Lacquer</h1>
      {children}
    </div>
  );
}
