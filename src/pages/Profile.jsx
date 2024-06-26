const Profile = () => {
  return (
    <div>
      <button className="button button-block">Go Back</button>

      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Update profile</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Jhon Doe"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="doe@gmail.com"
            />
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
