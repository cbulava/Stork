using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace StorkServer.Business
{
    public class DatabaseResponse
    {
        private string _email = string.Empty;
        private string _password = string.Empty;
        private int _userID = 0;
        //add for 
        //dashboard
        //widget(s)

        //read data as table?
        public DatabaseResponse(DataTable dt)
        {

            foreach (DataRow r in dt.Rows)
            {
                foreach (DataColumn c in dt.Columns)
                {

                }//inner for

            }//outer for


        }


        public string email
        {
            get { return _email; }
        }

        public string password
        {
            get { return _password; }
        }

        public int userID
        {
            get { return _userID; }
        }
    }
}