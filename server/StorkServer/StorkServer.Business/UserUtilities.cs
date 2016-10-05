using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer;
using System.Data.SqlClient;
using StorkServer.Business.Models;
using System.Data.SQLite;

namespace StorkServer.Business {
    public class UserUtilities {

        public static void test() {
            StorkServer.Sql.SqliteHandler.InitDB();
            //SQLiteConnection connection = StorkServer.Sql.SqliteHandler.connect();
        }

        //functions should preferably be static as they should be stateless
        public static ServerResponse createUser(string email, string password, string passwordConf) {
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

        public static ServerResponse loginUser(string email, string password)
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

        public static ServerResponse logoutUser (int userID)
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

        public static ServerResponse updateUser(string oldEmail, string newEmail, string oldPassword, string newPassword, string newPasswordConf)
        {

            if (!newPassword.Equals(newPasswordConf)) {
                return new ServerResponse(false, "new passwords do not match", null);
            }

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

        public static ServerResponse deleteUser(string email, string password)
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

        public static ServerResponse getUserDashboard(int userID)
        {
            UserModel existing = null;
            //find user, set = to existing

            if (existing == null)
            {
                return new ServerResponse(false, "user not found", null);
            }

            bool success = false;

            //update success

            //get user dashboard object
            Object userDashboard = null;//temp
            //set success accordingly

            if (success)
            {
                return new ServerResponse(true, "dashboard loaded successfully", userDashboard);
            }
            else
            {
                return new ServerResponse(false, "failed to load user dashboard", null);
            }


        }

        public static ServerResponse getUserWidget(int userID, int widgetID)
        {
            UserModel existing = null;
            //find user, set = to existing

            if (existing == null)
            {
                return new ServerResponse(false, "user not found", null);
            }

            bool success = false;

            //update success

            //get dashboard object
            Object userDashboard = null;//temp

            //get widget object
            Object widgetObject = null;//temp


            if (success)
            {
                return new ServerResponse(true, "widget loaded succesfully", widgetObject);
            }
            else
            {
                return new ServerResponse(false, "failed to load widget", null);
            }


        }

        public static ServerResponse deleteUserWidget(int userID, int widgetID) {
            UserModel existing = null;
            //find user, set = to existing

            if (existing == null) {
                return new ServerResponse(false, "user not found", null);
            }

            bool success = false;

            //update success

            //get dashboard object
            Object userDashboard = null;//temp

            //get widget object
            Object widgetObject = null;//temp


            if (success) {
                return new ServerResponse(true, "widget deleted succesfully", widgetObject);
            }
            else {
                return new ServerResponse(false, "failed to load widget", null);
            }


        }
        public static ServerResponse updateUserWidget(int userID, int widgetID, WidgetModel widget) {
            UserModel existing = null;
            //find user, set = to existing

            if (existing == null) {
                return new ServerResponse(false, "user not found", null);
            }

            bool success = false;

            //update success

            //get dashboard object
            Object userDashboard = null;//temp

            //get widget object
            Object widgetObject = null;//temp


            if (success) {
                return new ServerResponse(true, "widget updated succesfully", widgetObject);
            }
            else {
                return new ServerResponse(false, "failed to load widget", null);
            }
        }
    }
}
