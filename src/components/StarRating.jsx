import { useState } from 'react';

export default function StarRating({ value = 0, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className={`star-rating ${readOnly ? 'read-only' : ''}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
        <span
          key={star}
          className={`star ${star <= display ? 'filled' : ''}`}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          onClick={() => !readOnly && onChange && onChange(star)}
        >
          ★
        </span>
      ))}
      {!readOnly && <span className="rating-value">{value > 0 ? value : ''}</span>}
    </div>
  );
}
