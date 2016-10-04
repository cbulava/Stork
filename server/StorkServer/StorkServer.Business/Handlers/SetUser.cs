using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer.Sql.StorkDatabaseDataSetTableAdapters;


namespace StorkServer.Business.Handlers
{
    public class SetUser
    {
        public void setUser(User user) {
            UserTableTableAdapter newUser = new UserTableTableAdapter();

            newUser.Insert(user.username,user.useremail,user.password,user.widgetList);
        }
    }
}
