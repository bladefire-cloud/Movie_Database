import React from 'react';

const MovieCrew = ({ movieCrew }) => {
    return (
        <>
        <td>{movieCrew.name}</td>
        <td>{movieCrew.job}</td>
        <td>{movieCrew.department}</td>
        </>
    );
};

export default MovieCrew;