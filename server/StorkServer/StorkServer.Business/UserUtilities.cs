using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer;
using System.Data.SqlClient;
using System.Data.SQLite;
using StorkServer.Sql.Models;
using StorkServer.Sql;

namespace StorkServer.Business {
    public class UserUtilities {

        public static void StartupDB() {
            StorkServer.Sql.SqliteHandler.InitDB();
            //testing 
            long uid = SqliteHandler.createUser("email", "password");
            WidgetModel widget = new WidgetModel();
            widget.refresh = 10;
            widget.addStock("MSFT");
            widget.addStock("GOOG");
            widget.height = 24;
            long wid =  SqliteHandler.createWidget(uid, widget);

            widget = new WidgetModel();
            widget.refresh = 13;
            widget.addStock("MSfFT");
            widget.addStock("GOfOG");
            widget.height = 4;
            SqliteHandler.updateWidget(wid, widget);

            WidgetModel[] w = SqliteHandler.getAllWidgets(uid);
            Console.WriteLine(w[0].stockList[0]);
            Console.WriteLine(w[0].refresh);
            Console.WriteLine(w[0].height);

        }

        //functions should preferably be static as they should be stateless
        public static ServerResponse createUser(string email, string password, string passwordConf) {
            //check to see if the email is already taken
            long id = SqliteHandler.getUserId(email);
            if (id != -1) {
                //return a failure with an error message an no payload
                return new ServerResponse(false, "email already exists", null);
            }
            //check to see if passwords match
            if (password.Equals(passwordConf) == false) {
                return new ServerResponse(false, "passwords do not match", null);
            }

            //Down the line do some call to send an email to the user, for now do nothing
            //grab the user id of the created user
            id = SqliteHandler.createUser(email, password);
            if (id == -1) {
                //there was some failure
                return new ServerResponse(false, "there was an error creating the user", null);
            }


            UserModel newUser = SqliteHandler.getUser(id); //grab the created user
            if (newUser != null) {
                //return a success with a success message and put the user into the payload
                return new ServerResponse(true, "account created successfully", newUser);
            }
            else {
                //there was some failure
                return new ServerResponse(false, "there was an error grabbing the created the user", null);
            }
            
        }

        public static ServerResponse loginUser(string email, string password)
        {

            long id = SqliteHandler.getUserId(email);
            if (id == -1) {
                //return a failure with an error message an no payload
                return new ServerResponse(false, "email doesn't exist", null);
            }
            string realPassword = SqliteHandler.getUserPassword(id);
            if (realPassword.Equals(password)) {
                UserModel user = SqliteHandler.getUser(id);
                return new ServerResponse(true, "user login successfull", user);
            }
            //if not successful
            else
            {
                //...
                //sql call returns no match
                return new ServerResponse(false, "password doesn't match", null);
            }




        }

        public static ServerResponse logoutUser (long userID)
        {

            //for now just verify that a user exists to be criteria
            UserModel user = SqliteHandler.getUser(userID);

            if (user != null)
            {
                return new ServerResponse(true, "user logged out", null);
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

        public static ServerResponse deleteUser(long id)
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
