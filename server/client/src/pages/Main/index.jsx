import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/yay.png";
import styles from "./styles.module.scss";
import bgg from"../../images/bgg.jpg"
import { fontWeight } from "@mui/system";

const navLinks = [
	{ name: "About", link: "/about" },
	{ name: "Support", link: "/support" },
	{ name: "Download", link: "/download" },
	{ name: "Sign up", link: "/signup" },
	{ name: "Log in", link: "/login" },
];

const companyLInks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
	"For Artists",
	"Developers",
	"Advertising",
	"Investors",
	"Vendors",
];

const usefulLInks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
	"legal",
	"privacy center",
	"privacy policy",
	"Cookies",
	"About ads",
	"Additional CA Privacy Disclosures",
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container} >
				<Link to="/" className={styles.nav_logo}>
					<img src={logo} alt="logo" />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main} style={{alignItem:"center",textAlign:"center"}}>
					<h1 style={{textShadow:"2px 2px gray", textAlign:"center"}}>Bring Music To Life</h1>
					<p style={{textShadow:"2px 0px gray",fontSize: "5rem"}}>Listen and discover <br /> In perfect harmony.<br /></p>
					<Link to="/signup">
						<Button
							label="GET STARTED"
							style={{ color: "pruple", width: "18rem", fontSize: "1.4rem" , fontWeight:"50"}}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						<img src={logo} alt="logo" />
					</Link>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Company</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Communities</div>
						{communitiesLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Useful links</div>
						{usefulLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2} style={{ alignItems :"center", textAlign:"center"}}>
					<div className={styles.footer_2_links} style={{ alignItems :"center", textAlign:"center"}}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}style={{ alignItems :"center", textAlign:"center"}}>
						<CopyrightIcon />
						<span>2022 Samma3ni</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;
