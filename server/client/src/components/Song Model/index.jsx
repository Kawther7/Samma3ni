import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";
import love from "../../images/love.jpg"

const Songe = () => {
	const [songs, setSongs] = useState([]);
    const [song, setSong] = useState({});

	const [model, setModel] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { id } = useParams();

	const history = useHistory();

	const getAllSongs = async (id) => {
		try {
			setIsFetching(true);
			const url = "http://localhost:8080/api/songs/getall/get";
			const { data } = await axiosInstance.get(url);
			setSongs(data.data.songs);
			setSong(data.data.songs.song);
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	


	useEffect(() => {
		getAllSongs();
	}, []);

	return (
		<div className={styles.container}>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "Plum" }} size="5rem" />
				</div>
			)}
			{!isFetching && (
				<Fragment>
					<div className={styles.head}>
						<div className={styles.head_gradient}></div>
						{song.img === "" ? (
							<img
								src="https://media.istockphoto.com/vectors/music-note-icon-vector-illustration-vector-id1175435360?k=20&m=1175435360&s=612x612&w=0&h=1yoTgUwobvdFlNxUQtB7_NnWOUD83XOMZHvxUzkOJJs="
								alt={song.name}
								style={{ background: "#919496" }}
							/>
						) : (
							<img src={song.img} alt={song.name} />
						)}

						<div className={styles.playlist_info}>
							<p>Song</p>
							<h1>{song.name}</h1>
							
						</div>

						
					</div>
					
					
					{model && (
						<PlaylistModel
							closeModel={() => setModel(false)}
							song={song}
						/>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default Songe;
