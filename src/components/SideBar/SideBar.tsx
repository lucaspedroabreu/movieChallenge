import { useContext } from "react";
import { MovieContext } from "../../hooks/MovieContext";
import { Button } from "./Button";


export function SideBar() {

	const { genres, selectedGenreId, handleClickGenre } = useContext(MovieContext)


	return (
		<nav className="sidebar">
			<span>Watch<p>Me</p></span>

			<div className="buttons-container">
				{genres.map(genre => (
					<Button
						key={String(genre.id)}
						title={genre.title}
						iconName={genre.name}
						onClick={() => handleClickGenre(genre.id)}
						selected={selectedGenreId === genre.id}
					/>
				))}
			</div>

		</nav>
	)
}