import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import {
	deletePlayList,
	removeSongFromPlaylist,
} from "../../redux/playListSlice/apiCalls";
import Song from "../../components/Song";
import PlaylistModel from "../../components/PlaylistModel";
import { IconButton, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";
import love from "../../images/love.jpg"

const Playlist = () => {
	const [playlist, setPlaylist] = useState({});
	const [songs, setSongs] = useState([]);
	const [model, setModel] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { id } = useParams();

	const history = useHistory();

	const getPlaylistSongs = async (id) => {
		try {
			setIsFetching(true);
			const url = "http://localhost:8080/api/playlists/getplaylist/" + id;
			const { data } = await axiosInstance.get(url);
			setPlaylist(data.data.playlist);
			setSongs(data.data.songs);
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	const handleDeletePlaylist = async () => {
		try{setIsFetching(true);
			const url = "http://localhost:8080/api/playlists/remove/" + id;
			const { data } = await axiosInstance.delete(url);
			setPlaylist(data.data.playlist)
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
		//if (res) history.push("/home");
	};

	const handleRemoveSong = async (songId) => {
		const originalSongs = [...songs];
		const payload = { playlistId: playlist._id, songId };
		const filterSongs = originalSongs.filter((song) => song._id !== songId);
		setSongs(filterSongs);
		const res = await removeSongFromPlaylist(payload, dispatch);
		!res && setSongs(originalSongs);
	};

	useEffect(() => {
		getPlaylistSongs(id);
	}, [id]);

	return (
		<div className={styles.container}>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{!isFetching && (
				<Fragment>
					<div className={styles.head}>
						<div className={styles.head_gradient}></div>
						{playlist.img === "" ? (
							<img
								src={love}
								alt={playlist.name}
								style={{ background: "#919496" }}
							/>
						) : (
							<img src={love} alt={playlist.name} />
						)}

						<div className={styles.playlist_info}>
							<p>Playlist</p>
							<h1>{playlist.name}</h1>
							<span>{playlist.desc}</span>
						</div>

						{playlist.user === user._id && (
							<div className={styles.actions_container}>
								<IconButton onClick={() => setModel(true)}>
									<EditIcon />
								</IconButton>
								<IconButton onClick={handleDeletePlaylist}>
									<DeleteIcon />
								</IconButton>
							</div>
						)}
					</div>
					<div className={styles.body}>
						<div className={styles.body_nav}>
							<div className={styles.left}>
								<span>#</span>
								<p>Title</p>
							</div>
							<div className={styles.center}>
								<p>Artist</p>
							</div>
							<div className={styles.right}>
								<AccessTimeIcon />
							</div>
						</div>
						{songs.map((song) => (
							<Fragment key={song._id}>
								<Song
									song={song}
									playlist={playlist}
									handleRemoveSong={handleRemoveSong}
								/>
							</Fragment>
						))}
					</div>
					{model && (
						<PlaylistModel
							closeModel={() => setModel(false)}
							playlist={playlist}
						/>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default Playlist;