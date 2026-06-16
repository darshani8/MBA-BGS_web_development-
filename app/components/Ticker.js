export default function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="announcements">
      <div className="ticker-track">
        <div className="grp" id="tickGrp">
          <span className="ticker-item">
            <span className="pip"></span>
            <b>Admissions Open for 2026–27</b> · Apply now for MBA
          </span>
          <span className="ticker-item">
            <span className="sep">◆</span> 50% fee concession on first 45 Seats till June 30th — Call Now
          </span>
          <span className="ticker-item">
            <span className="sep">◆</span> Early-bird scholarships up to ₹1,00,000 closing soon
          </span>
          <span className="ticker-item">
            <span className="sep">◆</span> 100% placement assistance · 180+ recruiting partners
          </span>
          <span className="ticker-item">
            <span className="sep">◆</span> Approved by AICTE · Affiliated to VTU, Belagavi
          </span>
          <span className="ticker-item">
            <span className="sep">◆</span> Campus tours every Saturday · Book your visit
          </span>
        </div>
      </div>
    </div>
  );
}
