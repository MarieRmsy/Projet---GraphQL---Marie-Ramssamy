import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthorsPage from './pages/AuthorsPage';
import FilmsPage from './pages/FilmsPage';
import SeriesPage from './pages/SeriesPage';
import AddFilmPage from './pages/AddFilmPage';
import AddAuthorPage from './pages/AddAuthorPage';
import DeleteFilmPage from './pages/DeleteFilmPage';
import DeleteAuthorPage from './pages/DeleteAuthorPage';
import ModifyFilmPage from './pages/ModifyFilmPage';
import ModifyAuthorPage from './pages/ModifyAuthorPage';
import AddSeriesPage from './pages/AddSeriesPage';
import DeleteSeriesPage from './pages/DeleteSeriesPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
        <header>
            <h1>N E T F L I X</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/authors">Liste des Realisateurs</Link>
                  <ul>
                    <li><Link to="/add-author">Ajouter Realisateur</Link></li>
                    <li><Link to="/modify-author">Modifier Realisateur</Link></li>
                    <li><Link to="/delete-author">Supprimer Realisateur</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/films">Liste des Films</Link>
                  <ul>
                    <li><Link to="/add-film">Ajouter Film</Link></li>
                    <li><Link to="/modify-film">Modifier Film</Link></li>
                    <li><Link to="/delete-film">Supprimer Film</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/series">Liste des Séries</Link>
                  <ul>
                    <li><Link to="/add-series">Ajouter Série</Link></li>
                    <li><Link to="/delete-series">Supprimer Série</Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/series" element={<SeriesPage />} />
              <Route path="/add-film" element={<AddFilmPage />} />
              <Route path="/add-author" element={<AddAuthorPage />} />
              <Route path="/delete-film" element={<DeleteFilmPage />} />
              <Route path="/delete-author" element={<DeleteAuthorPage />} />
              <Route path="/modify-Film" element={<ModifyFilmPage />} />
              <Route path="/modify-author" element={<ModifyAuthorPage />} />
              <Route path="/add-series" element={<AddSeriesPage />} />
              <Route path="/delete-series" element={<DeleteSeriesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
