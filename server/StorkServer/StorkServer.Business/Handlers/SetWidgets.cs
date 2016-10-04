using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Business.Handlers
{
    public class SetWidgets
    {
        public void setWidgets(User user)
        {
            UserTableTableAdapter newUser = new UserTableTableAdapter();

            newUser.Update(user.username, user.useremail, user.password, user.widgetList);
        }
    }
}
