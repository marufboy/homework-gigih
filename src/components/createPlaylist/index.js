const CreatePlaylist = ({ playlist, handleSubmit, handleFormChange }) => (
  <form className="container-form" onSubmit={handleSubmit}>
    <label htmlFor="name" className="titleLabel">
      Playlist Name
    </label>
    <input name="name" value={playlist.name} onChange={handleFormChange} />
    <label htmlFor="description" className="titleLabel">
      Description
    </label>
    <textarea
      rows="4"
      cols="30"
      name="description"
      value={playlist.description}
      onChange={handleFormChange}
      style={{resize: 'none'}}
    />
    <button className="neutral-btn" type="submit">
      Create Playlist
    </button>
  </form>
);

export default CreatePlaylist;
