using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer
{
    /*
     * 
/user/login
POST - login a user
Fields: 
email: the email of the user to create
password: the desired password of the user
Returns
success: success status of the creation (0 = failure, 1 = pass)
message: the message from the server regarding success
id: the id of the user if it was a successful login
/user/logout
POST - logs out a user
Fields:
id: the id of the user to be logged out
Returns
success: success status of the creation (0 = failure, 1 = pass)
message: the message from the server regarding success
/user/{id}
PUT - update a user
Fields: 
oldEmail: the old email the user used
newEmail: the new email the user wants
oldPassword: the old password the user used
newPassword: the new password the user wants
Returns: 
success: success status of the update
message: the message from the server regarding success
DELETE - delete a user
Fields:
password: the password of the user
Returns:
success: success status of the update
message: the message from the server regarding success
*/

//function to query through yahoo info to update stock

    class UserUtilities
    {
        //userPOST - create a new user
        //Fields: email: the email of the user to create
        //password: the desired password of the user 
        //Returns
        //success: success status of the creation(0 = failure, 1 = pass)
        //message: the message from the server regarding success
        //GET - returns all users
        //Returns 
        //ids: array of user ids

        public int createUser(string email, string password)
        {
            int status = 0;

            //...


            return status;
        }



        public int 











    }
}
