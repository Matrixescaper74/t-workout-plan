export default function LevoPanel({ taken, onToggle, isReadOnly = false }) {
  const handleClick = () => {
    if (isReadOnly) return;
    onToggle();
  };

  return (
    <div style={{
      padding: "12px 16px",
      borderRadius: 10,
      background: taken ? "#E8F5E9" : "#FFFFFF",
      border: taken ? "1px solid #A5D6A7" : "1px dashed rgba(0,0,0,0.15)",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 12,
      cursor: isReadOnly ? "default" : "pointer",
      userSelect: "none",
    }}
    onClick={handleClick}
    role={isReadOnly ? undefined : "button"}
    aria-pressed={!!taken}
    >
      <div style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        border: taken ? "none" : "2px solid #4C4C57",
        background: taken ? "#2D6B7C" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.15s",
      }}>
        {taken && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5L6.5 12L13 4.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div style={{ fontSize: 14, color: "#1A1A1F", fontWeight: taken ? "bold" : "normal" }}>
        💊 {taken ? "Took levothyroxine today" : "Take levothyroxine"}
      </div>
    </div>
  );
}
