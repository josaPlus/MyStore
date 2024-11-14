const express = require('express');
const id = require('faker/lib/locales/id_ID');
const router = express.Router();

let movies = [
  {
    id: 1,
    title: 'El padrino',
    year: 1980,
    category: 'Drama',
  },
  {
    id: 2,
    title: 'Scarface',
    year: 1983,
    category: 'Drama',
  },
  {
    id: 3,
    title: 'El señor de los anillos',
    year: 2001,
    category: 'Fantasia',
  },
  {
    id: 4,
    title: 'Harry Potter',
    year: 2001,
    category: 'Fantasia',
  },
  {
    id: 5,
    title: 'El origen',
    year: 2010,
    category: 'Ciencia Ficcion',
  },
  {
    id: 6,
    title: 'Interestelar',
    year: 2014,
    category: 'Ciencia Ficcion',
  },
  {
    id: 7,
    title: 'El rey leon',
    year: 1994,
    category: 'Animacion',
  },
  {
    id: 8,
    title: 'Toy Story',
    year: 1995,
    category: 'Animacion',
  },
  {
    id: 9,
    title: 'El conjuro',
    year: 2013,
    category: 'Terror',
  },
  {
    id: 10,
    title: 'El aro',
    year: 2002,
    category: 'Terror',
  },
];


router.get('/', (req, res) => {
  res.json(movies);
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({message: 'Movie not found'});
  }
});

router.post('/', (req, res) => {
  const {title, year, category} = req.body
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    category
  };

  movies.push(newMovie);
  res.status(201).json({
    message: 'Movie created',
    data: newMovie
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const {title, year, category} = req.body;
  const movie = movies.find((movie) => movie.id == id);
  if (movie) {
    if (title) movie.title = title;
    if (year) movie.year = year;
    if (category) movie.category = category;
    res.json({
      message: 'Movie updated',
      data: movie
    });
  } else {
    res.status(404).json({message: 'Movie not found'});
  }
});


router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const movie = movies.findIndex((movie) => movie.id == id);
  if (movie !== -1) {
    movies.splice(movie, 1);
    res.json({
      message: 'Movie deleted',
      id
    });
  } else {
    res.status(404).json({message: 'Movie not found'});
  }
});


module.exports = router;

// practica

// en vase a la practica anterior, crear todas las funcionalidades CRUD para todas sus entidades