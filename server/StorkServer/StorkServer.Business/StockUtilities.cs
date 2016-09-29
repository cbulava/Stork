using System;
using System.Text;
using System.Net;
using Newtonsoft.Json.Linq;

namespace StorkServer.Business {
    public class StockUtilities {

        static string baseAddress = "https://query.yahooapis.com/v1/public/yql?";

        public static ServerResponse getQuote(string symbol, string[] fields) {
            bool success = true;
            string message = "";
            StringBuilder address = new StringBuilder();
            address.Append(baseAddress);
            address.Append("q=" + System.Web.HttpUtility.UrlEncode("env 'store://datatables.org/alltableswithkeys';"));
            address.Append(System.Web.HttpUtility.UrlEncode("select "));
            for (int i = 0; i < fields.Length; i++) {
                if (i != 0) {
                    address.Append(',');
                }
                address.Append(System.Web.HttpUtility.UrlEncode(fields[i]));
            }
            address.Append(System.Web.HttpUtility.UrlEncode(" from yahoo.finance.quotes where symbol in (\"" + symbol + "\")"));
            address.Append("&format=json");
            address.Append("&callback=");

            string results = "";

            using (WebClient wc = new WebClient()) {
                try {
                    results = wc.DownloadString(address.ToString());
                }
                catch (WebException) {
                    success = false;
                    message = "There was an error with querying the stock provider";
                }
            }

            JObject dataObject = JObject.Parse(results);
            JObject relevant = (JObject)dataObject.GetValue("query");
            relevant = (JObject)relevant.GetValue("results");
            relevant = (JObject)relevant.GetValue("quote");

            JObject jsonresults = new JObject();
            jsonresults.Add("results", relevant);

            return new ServerResponse(success, message, jsonresults);
        }
    }
}
