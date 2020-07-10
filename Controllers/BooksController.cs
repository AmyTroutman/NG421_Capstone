using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace capstone.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private ApplicationDbContext _context;
        public BooksController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Book> Get()
        {            
            return _context.Books.ToArray();   
        }
        [HttpPost]
        public Book Add([FromBody]Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return book;
        }
    }
}
