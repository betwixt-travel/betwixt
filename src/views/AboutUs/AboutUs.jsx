import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './AboutUs.css';

export default function AboutUs() {
  return (
    <>
      <h2 className={Styles.about}>About the Devs</h2>
      <section className={Styles.creators}>
        <div className={Styles.creatorCard}>
          <h3>Aidan Liddiard</h3>
          <p>
            <span>Located in:</span> Portland, OR
          </p>
          <p>
            <span>Next travel destination:</span> The Boundary Waters in Lake
            County, Minnesota
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
        <div className={Styles.creatorCard}>
          <h3>Denver McCarthy</h3>
          <p>
            <span>Located in:</span> Portland, OR
          </p>
          <p>
            <span>Next travel destination:</span> Grand Teton National Park
          </p>
          <div className="icons">
            <Link
              to={{ pathname: 'https://github.com/denvermccarthy' }}
              target="_blank"
            >
              <img src="github.png" />
            </Link>
            <Link
              to={{
                pathname: 'https://www.linkedin.com/in/denvermccarthy/',
              }}
              target="_blank"
            >
              <img src="linkedin.png" />
            </Link>
          </div>
        </div>
        <div className={Styles.creatorCard}>
          <h3>Marcus Ghiringhelli</h3>
          <p>
            <span>Located in:</span> Portland, OR
          </p>
          <p>
            <span>Next travel destination:</span> Pittsburg, Pennsylvania
          </p>
          <div className="icons">
            <Link
              to={{ pathname: 'https://github.com/m-ghiringhelli' }}
              target="_blank"
            >
              <img src="github.png" />
            </Link>
            <Link
              to={{
                pathname: 'https://www.linkedin.com/in/marcus-ghiringhelli/',
              }}
              target="_blank"
            >
              <img src="linkedin.png" />
            </Link>
          </div>
        </div>
        <div className={Styles.creatorCard}>
          <h3>Mary Martinez</h3>
          <p>
            <span>Located in:</span> Portland, OR
          </p>
          <p>
            <span>Next travel destination:</span> Kauai, Hawaii
          </p>
          <div className="icons">
            <Link
              to={{ pathname: 'https://github.com/mary-martinez' }}
              target="_blank"
            >
              <img src="github.png" />
            </Link>
            <Link
              to={{
                pathname: 'http://www.linkedin.com/in/mary-diana-martinez',
              }}
              target="_blank"
            >
              <img src="linkedin.png" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
