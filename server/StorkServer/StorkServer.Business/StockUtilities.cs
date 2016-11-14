using System;
using System.Text;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Configuration;

namespace StorkServer.Business {
    public class StockUtilities {

        public static string baseQuote = "http://marketdata.websol.barchart.com/getQuote.json?key=";
        public static string baseHistory = "http://marketdata.websol.barchart.com/getHistory.json?key=";


        private static ServerResponse barchartRequest(string baseAddress, string additionAddress, string[] fields, bool single) {
            bool success = true;
            string message = "";
            StringBuilder address = new StringBuilder();
            address.Append(baseAddress);
            address.Append(ConfigurationManager.AppSettings["BarchartKey"]);
            address.Append(additionAddress);
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
            JObject jsonresults = null;
            try {
                JObject dataObject = JObject.Parse(results);
                if (dataObject.GetValue("results").Type == JTokenType.Null) {
                    success = false;
                    message = ((JObject)dataObject.GetValue("status")).GetValue("message").ToString();

                }
                else {
                    JArray relevant = (JArray)dataObject.GetValue("results");

                    jsonresults = new JObject();

                    //remove extraneous fields
                    if (!fields[0].Equals("*")) {
                        
                        for (int j = 0; j < relevant.Count; j++) {
                            JObject partialRelevant = new JObject();
                            for (int i = 0; i < fields.Length; i++) {
                                if (relevant[j][fields[i]] != null) {
                                    partialRelevant[fields[i]] = relevant[j][fields[i]];
                                }
                            }

                            relevant[j] = partialRelevant;
                        }
                        
                    }

                    if (single) {
                        jsonresults.Add("results", relevant[0]);
                    }
                    else {
                        jsonresults.Add("results", relevant);
                    }

                }


            }
            catch (JsonReaderException e) {
                success = false;
                message = "there was an error parsing results returned from stock provider, the api key might have been entered wrong";
                jsonresults = null;
            }

            return new ServerResponse(success, message, jsonresults);
        }


        public static ServerResponse getQuote(string symbol, string[] fields) {

            StringBuilder additionString = new StringBuilder();

            additionString.Append("&symbols=");
            additionString.Append(symbol);
            additionString.Append("&fields=");
            for (int i = 0; i < fields.Length; i++) {
                if (i != 0) {
                    additionString.Append(',');
                }
                additionString.Append(System.Web.HttpUtility.UrlEncode(fields[i]));
            }


            return barchartRequest(baseQuote, additionString.ToString(), fields, true);
        }


        public static ServerResponse getHistoric(string symbol, string startDate, string endDate, string type, string interval, string[] fields) {
            StringBuilder additionString = new StringBuilder();
            additionString.Append("&symbol=");
            additionString.Append(symbol);
            additionString.Append("&type=");
            additionString.Append(type);
            additionString.Append("&interval=");
            additionString.Append(interval);
            additionString.Append("&startDate=");
            additionString.Append(startDate);
            additionString.Append("&endDate=");
            additionString.Append(endDate);


            return barchartRequest(baseHistory, additionString.ToString(), fields, false);
        }
    }
}
