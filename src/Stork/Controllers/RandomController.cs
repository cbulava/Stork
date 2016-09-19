using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;


namespace Stork.Controllers
{
    [Route("api/[controller]")]
    public class RandomController : Controller
    {
        [HttpGet]
        public async Task<ContentResult> Get()
        {
            Controllers.StockFactory c = new Controllers.StockFactory();
            
            string json;

            json = c.getMSFTJson();
            
            return new ContentResult { Content = json, ContentType = new Microsoft.Net.Http.Headers.MediaTypeHeaderValue("application/json") };

            //var rand = new Random();
            //await Task.Delay(rand.Next(0, 50)); // Emulate tiny latency...
            //return new JsonResult(new { numbers = Enumerable.Range(1, 10).Select(i => i * rand.NextDouble()).ToArray() });
        }
    }
}