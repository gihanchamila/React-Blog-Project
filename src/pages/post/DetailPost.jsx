import placeImage from "../../assets/images/place.jpeg";

const DetailPost = () => {
  return (
    <div>
      <button className="button button-block">Go Back</button>
      <button className="button button-block">Update Post</button>
      <button className="button button-block">Delete Post</button>
      <div className="detail-container">
        <h2 className="post-title">Post Title</h2>
        <h5 className="post-category">Category: Category 1</h5>
        <h5 className="post-category">Created at:2023-10-01 14:43:52</h5>
        <h5 className="post-category">Updated at: 2023-10-01 14:43:52</h5>
        <p className="post-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam,
          vel molestias accusamus mollitia non nostrum aliquid officiis ad
          necessitatibus, vitae dicta aperiam voluptates sint et laboriosam!
          Blanditiis fugit quidem minus vero! Tempore obcaecati saepe ex velit,
          aperiam eos sed necessitatibus cum sunt magni unde ipsam eius enim,
          similique placeat.
        </p>

        <img src={placeImage} alt="mern" />
      </div>
    </div>
  );
};

export default DetailPost;
