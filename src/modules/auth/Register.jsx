import React, {useState} from "react";
import authLayout from "../../layout/AuthLayout";
import {Link} from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import {useNavigate} from "react-router-dom";
import {toastrOnTopCenter} from "../../utils/toastr";
import {signUp} from "../../api/AuthApi";

const Regsiter = () => {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };

  const [signupData, setSignupData] = useState(initialValue);
  const [processing, setProcessing] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setProcessing(true);

    signUp({...signupData})
      .then((response) => {
        navigate("/thank-you");
      })
      .catch((errors) => {
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  };
  return (
    <>
      <div className={styles.authContentHeading}>
        <h2>Welcome to Fire Sight.</h2>
      </div>
      <form onSubmit={handleRegister}>
        <div className={styles.authContentForm}>
          <div className="row">
            <div className="col-md-6 pe-md-1">
              <input className="mb-2" type="text" id="name" name="name" placeholder="Name" value={signupData.name} onChange={(e) => setSignupData({...signupData, name: e.target.value})} required />
            </div>
            <div className="col-md-6 ps-md-1">
              <input className="mb-2" type="tel" id="phone" name="phone" placeholder="Phone Number" value={signupData.phone} onChange={(e) => setSignupData({...signupData, phone: e.target.value})} required />
            </div>
            <div className="col-md-12">
              <input className="mb-2" type="email" id="email" name="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} required />
            </div>
            <div className="col-md-12">
              <input
                className="mb-2"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={signupData.address.address}
                onChange={(e) => setSignupData({...signupData, address: {...signupData.address, address: e.target.value}})}
                required
              />
            </div>
            <div className="col-md-4 pe-md-1">
              <input className="mb-2" type="text" id="city" name="city" placeholder="City" value={signupData.address.city} onChange={(e) => setSignupData({...signupData, address: {...signupData.address, city: e.target.value}})} required />
            </div>
            <div className="col-md-4 px-md-1">
              <input className="mb-2" type="text" id="state" name="state" placeholder="State" value={signupData.address.state} onChange={(e) => setSignupData({...signupData, address: {...signupData.address, state: e.target.value}})} required />
            </div>
            <div className="col-md-4 ps-md-1">
              <input
                className="mb-2"
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="Zipcode"
                value={signupData.address.zipcode}
                onChange={(e) => setSignupData({...signupData, address: {...signupData.address, zipcode: e.target.value}})}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.authSubmitbutton}>
          <button className="mt-3" type="submit">
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Request for Sign up"}
          </button>
        </div>
      </form>
      <p className={styles.loginForgotPassword}>
        <Link to="/" className="me-3">
          Login
        </Link>
      </p>
    </>
  );
};

export default authLayout(Regsiter);
