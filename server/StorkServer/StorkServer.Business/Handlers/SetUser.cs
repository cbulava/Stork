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
        public void setUser(int Id, string username, string useremail, string password, string widgetList) {
            UserTableTableAdapter newUser = new UserTableTableAdapter();

            newUser.Insert(Id, username, useremail, password, widgetList);
        }
    }
}
