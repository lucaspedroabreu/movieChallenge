
import { SideBar } from './components/SideBar/SideBar';
import { Content } from './components/Main/Content';


import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';


import MovieProvider from './hooks/MovieContext';

export function App() {

	return (
		<MovieProvider>
			<div style={{ display: 'flex', flexDirection: 'row' }}>

				<SideBar />
				<Content />

			</div>
		</MovieProvider>
	)
}