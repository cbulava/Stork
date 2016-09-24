using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer;
using System.Data.SqlClient;

namespace StorkServer.Business {
    class UserUtilities {

        //functions should preferably be static as they should be stateless
        static ServerResponse createUser(string email, string password, string passwordConf) {
            //check to see if the email is already taken
            UserModel existing = null; //CHANGE TO SQL FUNCTION TO GET USER BY EMAIL
                                //(@"SELECT userName FROM (databaseName) WHERE email = @email")
            if (existing != null) {
                //return a failure with an error message an no payload
                return new ServerResponse(false, "email already exists", null);
            }
            //check to see if passwords match
            if (password.Equals(passwordConf) == false) {
                return new ServerResponse(false, "passwords do not match", null);
            }

            //Down the line do some call to send an email to the user, for now do nothing

            UserModel newUser = new UserModel(); //create a new user using given info 
            //TODO CHANGE TO SQL FUNCTION TO CREATE AND STORE USER
            //return a success with a success message and put the user into the payload
            return new ServerResponse(true, "account created successfully", newUser);
        }

        static ServerResponse loginUser(string email, string password)
        {
            
            UserModel existing = null;
            
            //TODO sql connection code
            //SqlCommand cmd = new SqlCommand(@"Select userName FROM logins WHERE email=@email and password=@password", connection);
            //existing = cmd.ExecuteScalar();
            //.. 
            
            //if successful
            if (existing != null)
            {
                //existing = a user object
                return new ServerResponse(true, "user login successfull", existing);

            }
            //if not successful
            else
            {
                //...
                //sql call returns no match
                return new ServerResponse(false, "user login not found", null);
            }




        }

        static ServerResponse logoutUser (int userID)
        {
            bool loggedOut = false;

            if (loggedOut)
            {
                return new ServerResponse(true, "useer logged out", null);
            }
            else
            {
                return new ServerResponse(false, "unable to log out", null);
            }

        }

        static ServerResponse updateUser(string oldEmail, string newEmail, string oldPassword, string newPassword)
        {
            if((oldEmail == newEmail) && (oldPassword == newPassword)) 
            {
                return new ServerResponse(false, "nothing to update", null);
            }

            //sql code to update settings

            bool success = false;

            if (success)
            {
                return new ServerResponse(true, "user settings updated successfully", null);
            }
            else
            {
                return new ServerResponse(false, "failed to update user settings", null);
            }
            

        }

        static ServerResponse deleteUser(string email, string password)
        {
            UserModel existing = null;
            //find user, set = to existing

            if (existing == null)
            {
                return new ServerResponse(false, "user not found", null);
            }

            bool success = false;

            //sql to remove user from database
            //update success

            if (success)
            {
                return new ServerResponse(true, "user deleted successfully", null);
            }
            else
            {
                return new ServerResponse(false, "failed to delete user", null);
            }


        }





        
    }
}
