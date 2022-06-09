const { PlayList, validate } = require("../models/playList");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const Joi = require("joi");



// create playlist
const createPlaylist=async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playList = await PlayList({ ...req.body, user: user._id }).save();
	user.playlists.push(playList._id);
	await user.save();

	res.status(201).send({ data: playList });
};

// edit playlist by id
const updatePlaylist= async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send({ message: "Playlist not found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to edit!" });

	playlist.name = req.body.name;
	playlist.desc = req.body.desc;
	await playlist.save();

	res.status(200).send({ message: "Updated successfully" });
};

// add song to playlist
const addSongToPlaylist= async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		songId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to add!" });

	if (playlist.songs.indexOf(req.body.songId) === -1) {
		playlist.songs.push(req.body.songId);
	}
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Added to playlist" });
};

// remove song from playlist
const deleteSongFromPlaylist= async (req, res) => {
	const schema = Joi.object({
		playlistId: Joi.string().required(),
		songId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to Remove!" });

	const index = playlist.songs.indexOf(req.body.songId);
	playlist.songs.splice(index, 1);
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Removed from playlist" });
};

// user playlists
const userPlaylists= async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlists = await PlayList.find({ _id: user.playlists });
	res.status(200).send({ data: playlists });
};

// get random playlists
const getRandomPlaylists= async (req, res) => {
	const playlists = await PlayList.aggregate([{ $sample: { size: 10 } }]);
	res.status(200).send({ data: playlists });
};

// get playlist by id
const getPlaylistById= async (req, res) => {
	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send("not found");

	const songs = await Song.find({ _id: playlist.songs });
	res.status(200).send({ data: { playlist, songs } });
};

// get all playlists
const getAllPlaylists= async (req, res) => {
	const playlists = await PlayList.find();
	res.status(200).send({ data: playlists });
};

// delete playlist by id
const deletePlaylistById= async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.params.id);
	if (!user._id.equals(playlist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to delete!" });

	const index = user.playlists.indexOf(req.params.id);
	user.playlists.splice(index, 1);
	await user.save();
	await playlist.remove();
	res.status(200).send({ message: "Removed from library" });
};


module.exports={
    createPlaylist,
 updatePlaylist,
 addSongToPlaylist,
deleteSongFromPlaylist,
userPlaylists,
getRandomPlaylists,
getPlaylistById,
getAllPlaylists,
deletePlaylistById,
}