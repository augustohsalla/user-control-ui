using System;
using System.Reflection.Metadata;
using EFCoreInMemoryDbDemo;
using Microsoft.EntityFrameworkCore;
using user_api_new.Services;

namespace user_api_new.Services
{
    
    public class UserService : IUserInterface
    {
        private ApiContext _context;

        public UserService(
            ApiContext context)
        {
            _context = context;
        }

        private User getUser(string userName)
        {
            var user = _context.Users.ToList().Find(u => u.Username.Equals(userName));
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }

        public IEnumerable<User> SearchUsers(string field)
        {
            field = field.ToLower();
            var users = _context.Users.Where(user => user.Username.ToLower().Contains(field) && user.Name.ToLower().Contains(field) && user.Email.ToLower().Contains(field) );

            return users;
        }

        public User GetByUsername(string username)
        {
            return getUser(username);
        }

        public void Create(User user)
        {
            if (_context.Users.Any(x => x.Email == user.Email || x.Username == user.Username))
                throw new Exception("Username or email already taken");
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Update(User model)
        {
            
                var user = getUser(model.Username);

                if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
                    throw new Exception("Username or email already taken");

                user.Name = model.Name;
                user.Email = model.Email;
                user.Userwebsite = model.Userwebsite;

                _context.Users.Update(user);
                _context.SaveChanges();
                    }

        public void Delete(string Username)
        {
            var user = getUser(Username);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }


    }
}