using StorkServer.Sql.StorkDatabaseDataSetTableAdapters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StorkServer.Sql.StorkDatabaseDataSet;

namespace StorkServer.Business.Handlers
{
    public class SetWidgets
    {
        public void setWidgets(int Id, string username, string useremail, string password, string widgetList)
        {
            UserTableTableAdapter newUWidget = new UserTableTableAdapter();


            newWidget.Update(newUser);
        }
    }
}
