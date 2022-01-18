import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api";

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface MovieProps {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

interface MovieContextDTO {
	movies: MovieProps[];
	genres: GenreResponseProps[];
	selectedGenre: GenreResponseProps;
	selectedGenreId: number;
	handleClickGenre: (id: number) => void;
}

interface MovieProviderProps {
	children: ReactNode;
}

export const MovieContext = createContext<MovieContextDTO>({} as MovieContextDTO)

export default function MovieProvider({ children }: MovieProviderProps) {

	const [movies, setMovies] = useState<MovieProps[]>([]);
	const [genres, setGenres] = useState<GenreResponseProps[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
	const [selectedGenreId, setSelectedGenreId] = useState(1);

	useEffect(() => {
		api.get<GenreResponseProps[]>('genres').then(response => {
			setGenres(response.data);
		});
	}, []);

	useEffect(() => {
		api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
			setMovies(response.data);
		});

		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
			setSelectedGenre(response.data);
		})
	}, [selectedGenreId]);

	function handleClickGenre(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<MovieContext.Provider value={{ movies, genres, selectedGenre, selectedGenreId, handleClickGenre }}>
			{children}
		</MovieContext.Provider>
	)
}
