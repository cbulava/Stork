using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StorkServer;

namespace StorkServer.Business {
    class UserUtilities {

        //functions should preferably be static as they should be stateless
        static ServerResponse createUser(string email, string password, string passwordConf) {
            //check to see if the email is already taken
            UserModel existing = null; //CHANGE TO SQL FUNCTION TO GET USER BY EMAIL
            if (existing != null) {
                //return a failure with an error message an no payload
                return new ServerResponse(false, "email already exists", null);
            }
            //check to see if passwords match
            if (password.Equals(passwordConf) == false) {
                return new ServerResponse(false, "passwords do not match", null);
            }

            //Down the line do some call to send an email to the user, for now do nothing

            UserModel newUser = new UserModel(); //create a new user using given info TODO CHANGE TO SQL FUNCTION TO CREATE AND STORE USER
            //return a success with a success message and put the user into the payload
            return new ServerResponse(true, "account created successfully", newUser);
        }
    }
}
