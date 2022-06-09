const router = require("express").Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/UserController");
const {
  createSong,
  getAllSongs,
  updateSongById,
  deleteSongById,
  likeSong,
  getAllLikedSong,
} = require("../controllers/SongController");
const {
  createPlaylist,
  updatePlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  userPlaylists,
  getRandomPlaylists,
  getPlaylistById,
  getAllPlaylists,
  deletePlaylistById,
} = require("../controllers/PlaylistControllers");
const {search}=require("../controllers/SearchController")

router.post("/signup", signup);
router.post("/login", login);
router.get("/", admin, getAllUsers);
router.get("/:id", [validateObjectId, auth], getUserById);
router.put("/:id", [validateObjectId, auth], updateUserById);
router.delete("/:id", [validateObjectId, admin], deleteUserById);

router.post("/create", admin, createSong);
router.get("/getall/get", getAllSongs);
router.put("/update/:id", [validateObjectId, admin], updateSongById);
router.delete("/delete/:id", [validateObjectId, admin], deleteSongById);
router.put("/like/:id", [validateObjectId, auth], likeSong);
router.get("/liked/liked", auth, getAllLikedSong);

router.post("/createplaylist", auth, createPlaylist);
router.put("/edit/:id", [validateObjectId, auth], updatePlaylist);
router.put("/add-song/add", auth, addSongToPlaylist);
router.put("/remove-song/remove", auth, deleteSongFromPlaylist);
router.get("/favourite/:id", auth, userPlaylists);
router.get("/random/random", auth, getRandomPlaylists);
router.get("/getplaylist/:id", [validateObjectId, auth], getPlaylistById);
router.get("/getall/getall", auth, getAllPlaylists);
router.delete("/remove/:id", [validateObjectId, auth], deletePlaylistById);

router.get("/", auth, search)

module.exports = router;
