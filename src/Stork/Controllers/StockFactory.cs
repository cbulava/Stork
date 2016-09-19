
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net;
using System.Diagnostics;

namespace Stork.Controllers
{
    public class StockFactory
    {

        public string getMSFTJson()
        {
            WebClient webClient = new WebClient();
            String json;
            String url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27MSFT%27)&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
            using (WebClient wc = new WebClient())
            {
                json = wc.DownloadString(url);
            }
            return json;
        }
    }
}
