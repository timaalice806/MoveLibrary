using System;
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
        public void Post([FromBody]Movie value)
        {
            var addMovie = value;
            _context.Movies.Add(addMovie);
            _context.SaveChanges();
        }

        // PUT api/movie/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
          
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            // Delete movie from db logic
        }
    }
}