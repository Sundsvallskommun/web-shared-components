import React from 'react';

function SparkleIcon() {
  return (
    <span className="sparkle-icon">
      <div>
        <div className="sparkle-vert-lg"></div>
        <div className="sparkle-horizontal-lg"></div>
      </div>
      <div>
        <div className="ml-[4px] twinkling-3">
          <div className="sparkle-vert-sm"></div>
          <div className="sparkle-horizontal-sm"></div>
        </div>
        <div className="mt-[-4px] twinkling-2">
          <div className="sparkle-vert-sm"></div>
          <div className="sparkle-horizontal-sm"></div>
        </div>
      </div>
    </span>
  );
}
export default SparkleIcon;
