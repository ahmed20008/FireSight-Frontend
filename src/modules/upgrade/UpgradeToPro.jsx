import React from 'react'
import authenticatedLayout from '../../layout/AuthenticatedLayout'
import HeadingHeader from '../shared/components/HeadingHeader';
import "../../assets/css/upgrade.css"

const UpgradeToPro = () => {
  return (
    <>
      <HeadingHeader text={"Upgrade to Pro"} />
      <div className="background">
        <div className="container">
          <div className="panel pricing-table">
            <div className="pricing-plan">
              <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" className="pricing-img" />
              <h2 className="pricing-header">Basic</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">Only 1 Camera</li>
                <li className="pricing-features-item">Team Support</li>
              </ul>
              <span className="pricing-price">Free</span>
              <a href="#" className="pricing-button is-featured">Free trial (Current Plan)</a>
            </div>
            <div className="pricing-plan">
              <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" className="pricing-img" />
              <h2 className="pricing-header">Standard</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">Upto 5 Cameras</li>
                <li className="pricing-features-item">Team Support</li>
              </ul>
              <span className="pricing-price">$100</span>
              <a href="#" className="pricing-button">Sign up</a>
            </div>
            <div className="pricing-plan">
              <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" className="pricing-img" />
              <h2 className="pricing-header">Premium</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">Unlimited Cameras</li>
                <li className="pricing-features-item">Team Support</li>
              </ul>
              <span className="pricing-price">$150</span>
              <a href="#" className="pricing-button">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default authenticatedLayout(UpgradeToPro);