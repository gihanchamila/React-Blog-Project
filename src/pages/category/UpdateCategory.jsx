const UpdateCategory = () => {
  return (
    <div>
      <button className="button button-block">Go Back</button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
