using StorkServer.Sql.StorkDatabaseDataSetTableAdapters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Business.Handlers
{
    public class GetUser
    {
        public void getUser(string username)
        {
            UserTableTableAdapter newUser = new UserTableTableAdapter();

            newUser.GetDataBy(username);
        }
    }
}
