import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div>
      <h2>About the Devs</h2>
      <section>
        <div>
          <h3>Aidan Liddiard</h3>
          <p>
            <span>Located in:</span> Portland, OR
          </p>
          <p>
            <span>Next travel destination:</span> XXX
          </p>
          <div className="icons">
            <Link
              to={{ pathname: 'https://github.com/aidanliddiard' }}
              target="_blank"
            >
              <img src="github.png" />
            </Link>
            <Link
              to={{
                pathname:
                  'https://www.linkedin.com/in/aidan-liddiard-283a991b3/',
              }}
              target="_blank"
            >
              <img src="linkedin.png" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
