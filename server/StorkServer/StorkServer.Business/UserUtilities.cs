﻿using System;
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

        public static ServerResponse getUserDashboard(long userID)
        {
            UserModel existing = SqliteHandler.getUser(userID);
            if (existing == null)
            {
                return new ServerResponse(false, "user not found", null);
            }

            return new ServerResponse(true, "dashboard loaded successfully", existing.widgetList);

        }

        public static ServerResponse getUserWidget(long widgetID)
        {

            WidgetModel widget = SqliteHandler.getWidget(widgetID);

            if (widget == null) {
                return new ServerResponse(false, "widget not found", null);
            }

            return new ServerResponse(true, "widget loaded succesfully", widget);
        }


        public static ServerResponse deleteUserWidget( long widgetID) {
            WidgetModel widget = SqliteHandler.getWidget(widgetID);
            //find user, set = to existing

            if (widget == null) {
                return new ServerResponse(false, "widget not found", null);
            }

            SqliteHandler.deleteWidget(widgetID);

            return new ServerResponse(true, "widget deleted succesfully", null);


        }
        public static ServerResponse updateUserWidget(long widgetID, WidgetModel widget) {
            WidgetModel oldWidget = SqliteHandler.getWidget(widgetID);

            if (oldWidget == null) {
                return new ServerResponse(false, "widget not found", null);
            }

            SqliteHandler.updateWidget(widgetID, widget);

            oldWidget = SqliteHandler.getWidget(widgetID);

            return new ServerResponse(true, "widget updated successfully", oldWidget);
        }

        public static ServerResponse addUserWidget(long userId, WidgetModel widget) {
            UserModel user = SqliteHandler.getUser(userId);
            if (user == null) {
                return new ServerResponse(false, "user could not be found", null);
            }

            long wid = SqliteHandler.createWidget(userId, widget);

            return new ServerResponse(true, "widget was successfully created", wid);
        }
    }

    //function to take stock symbol and use yahoo api to get response
    //return as array of strings
}
