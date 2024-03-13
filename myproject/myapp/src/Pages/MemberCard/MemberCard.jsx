import React from 'react';
import './MemberCard.css'; // This will be your CSS file

const MemberCard = ({ member }) => {
  return (
    <div className="member-container">
      <div className="member-tests">
        <h2>{member.name}</h2>
        {member.tests.map((test, index) => (
          <div key={index} className="test">
            <span className="test-date">{test.date}</span>
            <span className="test-score">{test.score}</span>
          </div>
        ))}
      </div>
      <div className="member-details">
        <div className="detail name">{member.name}</div>
        <div className="detail mobile">{member.mobile}</div>
        <div className="detail email">{member.email}</div>
      </div>
    </div>
  );
};

export default MemberCard;
