// Bingkai kayu berukir (pita rebung + paku emas) yang dipakai ulang di banyak tempat.
export default function Bingkai({ className = "", children, ...rest }) {
  return (
    <div className={`bingkai ${className}`.trim()} {...rest}>
      <i className="pita t" /><i className="pita b" /><i className="pita l" /><i className="pita r" />
      <i className="paku a" /><i className="paku b" /><i className="paku c" /><i className="paku d" />
      {children}
    </div>
  );
}
