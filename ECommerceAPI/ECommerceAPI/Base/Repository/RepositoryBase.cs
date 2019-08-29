using ECommerceAPI.Base.Localization.Services.Implementation;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Repository
{
    public abstract class RepositoryBase
    {
        private readonly string _connectionString;

        protected RepositoryBase(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Connection CreateConnection()
        {
            return new Connection(_connectionString);
        }

        public async Task<ResponseBase<T>> ExecuteQuery<T>(Func<Task<ResponseBase<T>>> function)
        {
            try
            {
                return await function.Invoke();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    public class Connection : IDisposable
    {
        private readonly SqlConnection _sqlConnection;
        private readonly List<string> _message;
        public Connection(string connectionString)
        {
            _message = new List<string>();
            _sqlConnection = new SqlConnection(connectionString);
            _sqlConnection.InfoMessage += delegate (object sender, SqlInfoMessageEventArgs e)
            {
                _message.AddRange(e.Message.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries).ToList());
            };
        }

        public SqlConnection DbConnection => _sqlConnection;

        public List<ResponseMessage> Messages => _message.Select(p => new ResponseMessage { Code = p }).ToList();

        public void Dispose()
        {
            _sqlConnection.Dispose();
        }
    }
}
