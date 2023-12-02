import React from 'react'
import authenticatedLayout from '../../layout/AuthenticatedLayout'
import HeadingHeader from '../shared/components/HeadingHeader';
import "../../assets/css/upgrade.css"

const UpgradeToPro = () => {
  return (
    <>
      <HeadingHeader text={"Upgrade to Pro"} />
      <div class="background">
        <div class="container">
          <div class="panel pricing-table">
            <div class="pricing-plan">
              <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" class="pricing-img" />
              <h2 class="pricing-header">Basic</h2>
              <ul class="pricing-features">
                <li class="pricing-features-item">Only 1 Camera</li>
                <li class="pricing-features-item">Team Support</li>
              </ul>
              <span class="pricing-price">Free</span>
              <a href="#" class="pricing-button is-featured">Free trial (Current Plan)</a>
            </div>
            <div class="pricing-plan">
              <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" class="pricing-img" />
              <h2 class="pricing-header">Standard</h2>
              <ul class="pricing-features">
                <li class="pricing-features-item">Upto 5 Cameras</li>
                <li class="pricing-features-item">Team Support</li>
              </ul>
              <span class="pricing-price">$100</span>
              <a href="#" class="pricing-button">Sign up</a>
            </div>
            <div class="pricing-plan">
              <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" class="pricing-img" />
              <h2 class="pricing-header">Premium</h2>
              <ul class="pricing-features">
                <li class="pricing-features-item">Unlimited Cameras</li>
                <li class="pricing-features-item">Team Support</li>
              </ul>
              <span class="pricing-price">$150</span>
              <a href="#" class="pricing-button">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default authenticatedLayout(UpgradeToPro);