using System;
using System.Text;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Configuration;

namespace StorkServer.Business {
    public class StockUtilities {

        static string baseAddress = "http://marketdata.websol.barchart.com/getQuote.json?key=";

        public static ServerResponse getQuote(string symbol, string[] fields) {
            bool success = true;
            string message = "";
            StringBuilder address = new StringBuilder();
            address.Append(baseAddress);
            address.Append(ConfigurationManager.AppSettings["BarchartKey"]);

            address.Append("&symbols=");
            address.Append(symbol);
            address.Append("&fields=");
            for (int i = 0; i < fields.Length; i++) {
                if (i != 0) {
                    address.Append(',');
                }
                address.Append(System.Web.HttpUtility.UrlEncode(fields[i]));
            }
            

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

            JObject jsonresults;
            try {
                JObject dataObject = JObject.Parse(results);
                JArray relevant = (JArray)dataObject.GetValue("results");

                jsonresults = new JObject();

                //remove extraneous fields
                if (!fields[0].Equals("*")) {
                    JObject partialRelevant = new JObject();
                    for (int i = 0; i < fields.Length; i++) {
                        if (relevant[0][fields[i]] != null) {
                            partialRelevant[fields[i]] = relevant[0][fields[i]];
                        }
                    }

                    relevant[0] = partialRelevant;
                }


                jsonresults.Add("results", relevant[0]);

                
            }
            catch (JsonReaderException e) {
                success = false;
                message = "there was an error parsing results returned from stock provider, the api key might have been entered wrong";
                jsonresults = null;
            }

            return new ServerResponse(success, message, jsonresults);

        }
    }
}
