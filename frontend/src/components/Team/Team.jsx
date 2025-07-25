import React from "react";
import "./Team.css";
import teamMember1 from "../../assets/images/team1.jpg"; // Update with actual images
import teamMember2 from "../../assets/images/team2.jpg";
import teamMember3 from "../../assets/images/team3.jpg";

const Team = () => {
  return (
    <section id="team" className="team">
      <h2 className="team-title">Meet The Team</h2>

      <div className="team-container">
        {/* Team Member 1 */}
        <div className="team-card">
          <img src={teamMember1} alt="Alwin Jaison" className="team-img" />
          <div className="team-info">
            <h3>Alwin Jaison</h3>
            <p>Christ University</p>
            <span>Masters of Computer Application</span>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="team-card">
          <img src={teamMember2} alt="Rahul Kumar" className="team-img" />
          <div className="team-info">
            <h3>Rahul Kumar</h3>
            <p>Christ University</p>
            <span>Masters of Computer Application</span>
          </div>
        </div>

        {/* Team Member 3 */}
        <div className="team-card">
          <img src={teamMember3} alt="Rajesh Kanna Sir" className="team-img" />
          <div className="team-info">
            <h3>Rajesh Kanna Sir</h3>
            <p>Christ University</p>
            <span>Faculty, Department of Computer Science</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
