import "../Profile/Profile.css";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <sidebar />
      </section>
      <section className="profile__clothes-section">
        <clothessection />
      </section>
    </div>
  );
}

export default Profile;
