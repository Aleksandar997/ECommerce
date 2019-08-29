using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Models;
using ECommerceAPI.Repository.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Implementation
{
    public class UserRepository : RepositoryBase, IUserRepository
    {
        private IUserBuilder _userBuilder;
        public UserRepository(string connectionString, IUserBuilder userBuilder) : base(connectionString)
        {
            _userBuilder = userBuilder;
        }

        public async Task<ResponseBase<User>> LoginUser(string username, string password, int cultureId)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        Username = username,
                        Password = password,
                        CultureId = cultureId
                    });

                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[User_Login]", param, null, null, CommandType.StoredProcedure))
                    {
                        var user = _userBuilder.BuildInformation(multi.ReadSingleOrDefault<User>())
                                               .BuildRoles(multi.Read<Role>().ToList())
                                               .BuildMenus(multi.Read<Menu>().ToList())
                                               .BuildPermissions(multi.Read<Permission>().ToList())
                                               .Build();
                        return new ResponseBase<User>
                        {
                            Status = ResponseStatus.Success,
                            Data = user
                        };
                    }
                }
            });
        }

        public async Task<ResponseBase<IEnumerable<User>>> SelectAllUsers()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    //var users = connection._sqlConnection.
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[User_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var users = multi.Read<User>().ToList();
                        var roles = multi.Read<Role>().ToList();
                        var menus = multi.Read<Menu>().ToList();
                        var permissions = multi.Read<Permission>().ToList();
                        for (int i = 0; i < users.Count; i++)
                        {
                            users[i] = _userBuilder.BuildInformation(users[i])
                                               .BuildMenus(menus.Where(m => m.UserId == users[i].UserId).ToList())
                                               .BuildRoles(roles.Where(r => r.UserId == users[i].UserId).ToList())
                                               .BuildPermissions(permissions.Where(p => p.UserId == users[i].UserId).ToList())
                                               .Build();
                        }
                        return new ResponseBase<IEnumerable<User>>()
                        {
                            Data = users
                        };
                    }
                }

            });
        }
    }
}
