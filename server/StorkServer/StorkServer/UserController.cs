using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;


namespace StorkServer {
    [RoutePrefix("user")] //The default route for all functions within the class
    /*
     * Right now this class serves more as an example of how a controller will look.
     */
    public class UsersController : ApiController {
        // GET user
        [Route("")] //Must add the empty string as a route for any function utilizing the routePrefix
        [HttpGet] //Must declare what type of http request the function handles
        public IEnumerable<string> getAllUsers() {
            return new string[] { "user1", "user2" };
        }

        // GET user/id
        [Route("{id:int}")] //if collecting a variable from the url utilize format {varname : type}
        [HttpGet] 
        public string Get(int id) {
            return id.ToString();
        }

        // POST user
        [Route("")]
        [HttpPost]
        //To recieve data from a POST call use the [FromBody] tag
        public String repeatMessage([FromBody]string value) {
            Console.WriteLine(value);
            return value;
        }

        // PUT user
        [Route("")]
        [HttpPut]
        public void Put(int id, [FromBody]string value) {
        }

        // DELETE user
        [Route("")]
        [HttpDelete]
        public void Delete(int id) {
        }
    }
}
