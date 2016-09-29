using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Web;

namespace StorkServer.Business {
    public class StockUtilities {

        static string baseAddress = "https://query.yahooapis.com/v1/public/yql?";

        public static void getQuote(string symbol, string[] fields) {
            StringBuilder address = new StringBuilder();
            address.Append(baseAddress);
            address.Append("q=" + System.Web.HttpUtility.UrlEncode("env 'store://datatables.org/alltableswithkeys';"));
            address.Append(System.Web.HttpUtility.UrlEncode("select * from yahoo.finance.quotes where symbol in (\"MSFT\")"));
            address.Append("&format=json");
            address.Append("&callback=");

            string results = "";

            Console.WriteLine(address.ToString());

            using (WebClient wc = new WebClient()) {
                results = wc.DownloadString(address.ToString());
            }

            Console.WriteLine(results);
        }
    }
}
