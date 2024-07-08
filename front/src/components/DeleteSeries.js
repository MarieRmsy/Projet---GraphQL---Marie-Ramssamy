import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_SERIES, GET_SERIES } from '../graphql/seriesQueries';

const DeleteSeriesPage = () => {
  const [selectedSeries, setSelectedSeries] = useState('');
  const [deleteSeries] = useMutation(DELETE_SERIES);

  const { loading, error, data, refetch } = useQuery(GET_SERIES);

  useEffect(() => {
    if (data) {
      // Sélectionner la première série par défaut
      if (data.series.length > 0) {
        setSelectedSeries(data.series[0].title);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteSeries({ variables: { title: selectedSeries } });
      // Réinitialiser la sélection après la suppression
      await refetch(); // Rafraîchir les données des séries après la suppression
      if (data.series.length > 1) {
        setSelectedSeries(data.series[0].title);
      } else {
        setSelectedSeries('');
      }
    } catch (error) {
      console.error('Error deleting series:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sélectionner la série à supprimer :
        <select value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)} required>
          {data.series.map((series) => (
            <option key={series.id} value={series.title}>
              {series.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Supprimer la Série</button>
    </form>
  );
};

export default DeleteSeriesPage;
