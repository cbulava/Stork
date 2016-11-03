using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using StorkServer.Business;
using StorkServer.Models;
using System.Web.Http.Cors;
using StorkServer.Sql.Models;
using System.Net.Http;
using System.Net;

namespace StorkServer {
    /*
     * Right now this class serves more as an example of how a controller will look.
     */
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class RestController : ApiController {
        // GET user

        [Route("user")] //Must add the empty string as a route for any function utilizing the routePrefix
        [HttpGet] //Must declare what type of http request the function handles
        public ServerResponse getAllUsers() {
            ServerResponse sr = null; //TODO CALL UserUtilites getAllUsers
            //IEnumerable<string>
            return sr;
        }

        // POST user
        [Route("user")]
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
        [Route("user/login")]
        [HttpPost]
        public ServerResponse Userlogin([FromBody]LoginModel logininfo) {
            bool success = true;
            string message = "";

            if (logininfo == null) {
                success = false;
                message = "no data in payload";
            }
            else if (logininfo.email == null) {
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

        [Route("user/logout")]
        [HttpPost]
        public ServerResponse UserLogout([FromBody]logoutModel logoutinfo) {
            bool success = true;
            string message = "";
            ServerResponse sr;
            if (logoutinfo == null) {
                success = false;
                message = "no data in payload";
            }
            else if (logoutinfo.id == -1) {
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
        [Route("user/{id:int}")] //if collecting a variable from the url utilize format {varname : type}
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
        [Route("user/{id:int}")]
        [HttpDelete]
        public ServerResponse Delete(int id) {
            ServerResponse sr = new ServerResponse(false, "not implemented yet", null);
            return sr;
        }

        //GET dashbaord
        [Route("user/{id:int}/dashboard")]
        [HttpGet]
        public ServerResponse getDashboard(int id) {
            ServerResponse sr;
            sr = UserUtilities.getUserDashboard(id);
            return sr;
        }

        //ADD a dashboard item
        [Route("user/{id:int}/dashboard")]
        [HttpPost]
        public ServerResponse addWidget(int id, [FromBody] WidgetModel widget) {
            ServerResponse sr;
            bool success = true;
            string message = "";
            if (widget == null) {
                success = false;
                message = "no widget found in the payload";
            }

            if (!success) {
                sr = new ServerResponse(success, message, null);
            }

            return UserUtilities.addUserWidget(id, widget);
        }

        //GET specific widget
        [Route("user/{id:int}/dashboard/{widgetid:int}")]
        [HttpGet]
        public ServerResponse getWidget(int id, int widgetid) {
            ServerResponse sr;
            sr = UserUtilities.getUserWidget(widgetid);
            return sr;
        }

        //Delete Widget
        [Route("user/{id:int}/dashboard/{widgetid:int}")]
        [HttpDelete]
        public ServerResponse deleteWidget(int id, int widgetid) {
            ServerResponse sr;
            sr = UserUtilities.deleteUserWidget(widgetid);
            return sr;
        }
        //Update Widget
        [Route("user/{id:int}/dashboard/{widgetid:int}")]
        [HttpPut]
        public ServerResponse updateWidget(int id, int widgetid, [FromBody] WidgetModel widget) {
            ServerResponse sr;
            bool success = true;
            string message = "";
            if (widget == null) {
                success = false;
                message = "no updated widget given in payload";
            }
            if (success) {
                sr = UserUtilities.updateUserWidget( widgetid, widget);
            }
            else {
                sr = new ServerResponse(success, message, null);
            }
            
            return sr;
        }



        //GET STOCK
        [Route("stock/{symbol}")]
        [HttpPost]
        public ServerResponse getQuote(string symbol, [FromBody] StockRequestModel payload) {
            
            ServerResponse sr;
            string[] fields;
            //if user didn't specify anything, give them everything!
            if (payload == null || payload.fields.Count() == 0 || payload.fields.Contains("*") ){
                fields = new string[] { "*" };
            }
            else {

                fields = payload.fields.ToArray();
            }


            sr = StockUtilities.getQuote(symbol, fields);
            return sr;
        }

        /*[Route("*")]
        [AcceptVerbs("GET", "POST", "PUT", "DELETE")]//Include what ever methods you want to handle
        [AllowAnonymous]//So I can use it on authenticated controllers
        public ServerResponse HandleUnknownAction(string actionName) {
            return new ServerResponse(false, "resource could not be found", null);
        }*/
        [Route("{*url}")]
        [HttpGet, HttpPost, HttpPut, HttpDelete, HttpHead, HttpOptions, AcceptVerbs("PATCH")] 
        public HttpResponseMessage Handle404() {
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NotFound);
            responseMessage.ReasonPhrase = "The requested resource is not found";
            ServerResponse sr = new ServerResponse(false, "resource could not be found", null);
            responseMessage.Content = new StringContent( sr.ToString());
            return responseMessage;
        }
    }
}
