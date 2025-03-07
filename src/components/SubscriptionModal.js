import React, { useState } from "react";
import "../styles/SubscriptionModal.css";

const plans = [
  { name: "Basic", price: "$5.99/mo" },
  { name: "Standard", price: "$8.99/mo" },
  { name: "Premium", price: "$15.99/mo" },
];

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="sub-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Choose a Plan</h2>

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${selectedPlan.name === plan.name ? "selected" : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
          </div>
        ))}

        <button className="subscribe-btn">Subscribe to {selectedPlan.name}</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
