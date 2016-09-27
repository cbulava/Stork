using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Business
{
    class UserLogin
    {
        public struct userEntity
        {
            public string email;
            public string password;
            public int userId;
        }
        //user login
        //

        public int loginUser(string email, string password)
        {
            int status = 1;//0fail/1success
            //userEntity user = new userEntity();
            
             

            //check email/password combination


            return status;
        }




    }
}
