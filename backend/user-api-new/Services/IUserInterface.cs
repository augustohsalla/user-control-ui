using System;
namespace user_api_new.Services
{
	public interface IUserInterface
    {
        IEnumerable<User> GetAllUsers();
        Task <IEnumerable<User>> SearchUsers(string Username);
        User GetByUsername(string Username);
        void Create(User user);
        void Update(User user);
        void Delete(string Username);
    }
}

