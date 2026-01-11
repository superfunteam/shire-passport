import { useApp } from '../context/AppContext';
import { badges, BADGE_TYPES } from '../data/badges';
import { formatCertificateDate } from '../utils/exportPng';

/**
 * Hidden template that gets captured for PNG export
 * This is rendered off-screen and captured by html2canvas
 */
export default function ExportTemplate() {
  const { name, badges: claimedBadges, isSecretUnlocked } = useApp();

  const claimedCount = Object.values(claimedBadges).filter(b => b?.claimed).length;
  const primaryBadges = badges.filter(b => b.type !== BADGE_TYPES.SECRET);
  const secretBadges = badges.filter(b => b.type === BADGE_TYPES.SECRET);

  return (
    <div
      id="passport-export-template"
      style={{
        display: 'none',
        width: '1080px',
        height: '1920px',
        backgroundColor: '#f9f6f0',
        fontFamily: 'Cinzel, serif',
        padding: '60px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '52px',
            fontWeight: '700',
            color: '#1f1a13',
            margin: '0 0 10px',
          }}
        >
          The Shire Passport
        </h1>
        <p
          style={{
            fontSize: '20px',
            color: '#5c4d3a',
            fontStyle: 'italic',
            margin: '0',
            fontFamily: 'Crimson Text, serif',
          }}
        >
          Official Documentation of One's Journey Through Middle-earth
        </p>
      </div>

      {/* Recipient */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f0ebe0',
          borderRadius: '16px',
        }}
      >
        <p style={{ fontSize: '16px', color: '#8b7355', margin: '0 0 8px' }}>
          This certifies that
        </p>
        <p
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: '#4a6741',
            margin: '0',
          }}
        >
          {name}
        </p>
        <p style={{ fontSize: '16px', color: '#8b7355', margin: '8px 0 0' }}>
          has completed the sacred marathon
        </p>
      </div>

      {/* Date */}
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#5c4d3a', margin: '0 0 30px' }}>
        {formatCertificateDate()}
      </p>

      {/* Badge Grid - Primary */}
      <div style={{ marginBottom: '30px' }}>
        <p
          style={{
            fontSize: '14px',
            color: '#8b7355',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '15px',
          }}
        >
          Journey Badges
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {primaryBadges.map((badge) => {
            const isClaimed = claimedBadges[badge.id]?.claimed;
            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '50% 50% 24% 24%',
                    border: '12px solid white',
                    overflow: 'hidden',
                    opacity: isClaimed ? 1 : 0.35,
                    filter: isClaimed ? 'none' : 'grayscale(100%)',
                    boxShadow: '0 4px 8px rgba(31, 26, 19, 0.25)',
                  }}
                >
                  <img
                    src={badge.image}
                    alt={badge.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    color: isClaimed ? '#1f1a13' : '#8b7355',
                    textAlign: 'center',
                    lineHeight: '1.2',
                  }}
                >
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secret Badges */}
      <div style={{ marginBottom: '30px' }}>
        <p
          style={{
            fontSize: '14px',
            color: '#d4af37',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '15px',
          }}
        >
          Secret Achievements
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          {secretBadges.map((badge) => {
            const isClaimed = claimedBadges[badge.id]?.claimed;

            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '50% 50% 24% 24%',
                    border: isClaimed ? '3px solid #d4af37' : '3px solid white',
                    overflow: 'hidden',
                    opacity: isClaimed ? 1 : 0.35,
                    filter: isClaimed ? 'none' : 'grayscale(100%)',
                    boxShadow: '0 4px 8px rgba(31, 26, 19, 0.25)',
                  }}
                >
                  <img
                    src={badge.image}
                    alt={badge.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    color: isClaimed ? '#1f1a13' : '#8b7355',
                    textAlign: 'center',
                    lineHeight: '1.2',
                  }}
                >
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#4a6741',
          borderRadius: '16px',
          marginBottom: '30px',
        }}
      >
        <p
          style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#f9f6f0',
            margin: '0',
          }}
        >
          {claimedCount} / {badges.length}
        </p>
        <p style={{ fontSize: '18px', color: '#d9e5d9', margin: '5px 0 0' }}>
          Badges Collected
        </p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#8b7355', margin: '0 0 5px' }}>
          Hosted by Sophia and Matt
        </p>
        <p
          style={{
            fontSize: '12px',
            color: '#a68d6b',
            fontStyle: 'italic',
            fontFamily: 'Crimson Text, serif',
          }}
        >
          "The road goes ever on and on..."
        </p>
      </div>
    </div>
  );
}
