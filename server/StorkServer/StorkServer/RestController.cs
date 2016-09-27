using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using StorkServer.Business;
using StorkServer.Models;

namespace StorkServer {
    [RoutePrefix("user")] //The default route for all functions within the class
    /*
     * Right now this class serves more as an example of how a controller will look.
     */
    public class UsersController : ApiController {
        // GET user
        [Route("")] //Must add the empty string as a route for any function utilizing the routePrefix
        [HttpGet] //Must declare what type of http request the function handles
        public ServerResponse getAllUsers() {
            ServerResponse sr = null; //TODO CALL UserUtilites getAllUsers
            //IEnumerable<string>
            return sr;
        }

        // POST user
        [Route("")]
        [HttpPost]
        //To recieve data from a POST call use the [FromBody] tag
        public ServerResponse createUser([FromBody]UserCreationModel value) {
            bool success = true;
            string message = "";

            //check to see data recieved is as desired
            if (value == null) {
                success = false;
                message = "no data in payload";
            }
            else if (value.email == null) {
                success = false;
                message = "no email specified";
            }
            else if (value.password == null) {
                success = false;
                message = "no password specified";
            }
            else if (value.passwordConf == null) {
                success = false;
                message = "no password confirmation specified";
            }

            ServerResponse sr;
            //if all data present, go to business logic
            if (success) {
                sr = UserUtilities.createUser(value.email, value.password, value.passwordConf);
            }
            else {
                sr = new ServerResponse(success, message, null);
            }
            return sr;
        }

        //login user
        [Route("login")]
        [HttpPost]
        public ServerResponse Userlogin([FromBody]LoginModel logininfo) {
            bool success = true;
            string message="";

            if (logininfo == null) {
                success = false;
                message = "no data in payload";
            }
            else if(logininfo.email == null) {
                success = false;
                message = "no email specified";
            }
            else if (logininfo.password == null) {
                success = false;
                message = "no password specified";
            }

            ServerResponse sr;
            if (success) {
                sr = UserUtilities.loginUser(logininfo.email, logininfo.password);
            }
            else {
                sr = new ServerResponse(success, message, null);
            }

            return sr;
        }

        [Route("logout")]
        [HttpPost]
        public ServerResponse UserLogout([FromBody]logoutModel logoutinfo) {
            bool success = true;
            string message = "";
            ServerResponse sr;
            if (logoutinfo == null) {
                success = false;
                message = "no data in payload";
            }
            else if (logoutinfo.id == -1){
                success = false;
                message = "id invalid";
            }
            
            if (success) {
                sr = UserUtilities.logoutUser(logoutinfo.id);
            }
            else {
                sr = new ServerResponse(success, message, null);
            }
             

            return sr;
        }

        // update a user
        [Route("{id:int}")] //if collecting a variable from the url utilize format {varname : type}
        [HttpPut] 
        public ServerResponse updateUser(int id, [FromBody]UserUpdateModel updateinfo) {
            bool success = true;
            string message = "";
            ServerResponse sr;
            if (updateinfo == null) {
                success = false;
                message = "no data in payload";
            }
            else if (updateinfo.oldEmail == null) {
                success = false;
                message = "oldEmail not specified";
            }
            else if (updateinfo.newEmail == null) {
                success = false;
                message = "newEmail not specified";
            }
            else if (updateinfo.oldPassword == null) {
                success = false;
                message = "oldPassword not specified";
            }
            else if (updateinfo.newPassword == null) {
                success = false;
                message = "newPassword not specified";
            }
            else if (updateinfo.newPasswordConf == null) {
                success = false;
                message = "newPasswordConf not specified";
            }

            if (success) {
                sr = UserUtilities.updateUser(updateinfo.oldEmail, updateinfo.newEmail, updateinfo.oldPassword, updateinfo.newPassword, updateinfo.newPasswordConf);
            }
            else {
                sr = new ServerResponse(false, message, null);
            }

            return sr;
        }


        // DELETE user
        [Route("{id:int}")]
        [HttpDelete]
        public void Delete(int id) {
            ServerResponse sr = new ServerResponse(false, "not implemented yet", null);
        }
    }
}
