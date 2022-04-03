const CreatePlaylist = ({playlist, handleSubmit, handleFormChange}) => (
    <form className="container" onSubmit={handleSubmit}>
        <label htmlFor="title" className="titleLabel">Title</label>
        <input name="name" value={playlist.name} onChange={handleFormChange}/>
        <label htmlFor="desc" className="titleLabel">Description</label>
        <input name="description" value={playlist.description} onChange={handleFormChange}/>
        <button type="submit">Create Playlist</button>
    </form>
);

export default CreatePlaylist;