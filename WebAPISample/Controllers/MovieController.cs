﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            // Retrieve all movies from db logic
            return _context.Movies.ToList();
        }

        // GET api/movie/id
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var result = _context.Movies.Find(id);
            if (_context.Movies == null)
            {
                return NotFound().ToString();
            }
            else
            {
                return result.ToString();
            }
        }

        // POST api/movie
        [HttpPost]
        public void Post([FromBody]Movie movie)
        {
<<<<<<< HEAD
            var addMovie = value;
            _context.Movies.Add(addMovie);
            _context.SaveChanges();
=======
            // Create movie in db logic
            _context.Movies.Add(movie);
            _context.SaveChanges();

>>>>>>> a7c3a8d808f5b7088ca6cddf1cf91c2211891f4b
        }

        // PUT api/movie/5
        [HttpPut("{id}")]
<<<<<<< HEAD
        public void Put(int id, [FromBody]string value)
        {
          
=======
        public void Put(int MovieId, [FromBody]Movie movie)
        {
            // Update movie in db logic
            Movie oldMovie = _context.Movies.Find(movie.MovieId);
            oldMovie.Title = movie.Title;
            oldMovie.Genre = movie.Genre;
            oldMovie.Director = movie.Director;
            _context.SaveChanges();
>>>>>>> a7c3a8d808f5b7088ca6cddf1cf91c2211891f4b
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            // Delete movie from db logic
            var result = _context.Movies.Find(id);
            _context.Movies.Remove(result);
            _context.SaveChanges();
        }
    }
}