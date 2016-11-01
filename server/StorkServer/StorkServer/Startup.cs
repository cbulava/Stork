using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;
using System;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Threading;
using System.Web.Http;
using StorkServer.Business;
using System.Web.Http.Cors;
using System.Configuration;
using System.Web.Http.Routing;
using System.Net;
using System.Collections.Generic;
using System.Net.Http;

/*
 * Startup class for Web API initilization
*/
namespace StorkServer {
    // Startup is run when WebApp.Start<Startup> is called below in main
    public class Startup {
        public void Configuration(IAppBuilder appBuilder) {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            //map the routes for REST API
            config.MapHttpAttributeRoutes();
            //Make the server return JSON by default
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.EnableCors();
            appBuilder.UseWebApi(config);
        }
        //Main entry point of program. Set up of database / business logic layer can be added here
        static void Main() {
            //check to see if stock API key is set up
            if (ConfigurationManager.AppSettings["BarchartKey"] == null || ConfigurationManager.AppSettings["BarchartKey"] == "" || ConfigurationManager.AppSettings["BarchartKey"] == "KEY GOES HERE") {
                Console.WriteLine("The Barchart API key could not be found, please enter the key into the 'keys.config' file");
                Console.WriteLine("For developers the keys.config file can be found in the google drive");
                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
                return;
            }
            //startup the DB
            UserUtilities.StartupDB();

            int port = 9000;
            string baseAddress = "http://*:" + port;
            //NOTE: If get error here, need to run either the application / visual studio in
            //administrator mode, due to listening to all addresses. Furthermore if having issue connecting
            //to this server from an outside computer make sure windows firewall has the desired port on an inbound rule,
            //also make sure the router has forwarded the port to the host machine
            try {
                using (WebApp.Start<Startup>(url: baseAddress)) {
                    Console.WriteLine("Server Started up on port " + port);

                    //keep running the web app
                    Thread.Sleep(Timeout.Infinite);
                }
            }
            //Catch the error that is thrown when admin mode requirement is not met
            catch (TargetInvocationException e) {
                Console.WriteLine("Please run the application in administrator mode.");
                Console.WriteLine("Alternatively, run 'allowFirewall.cmd' in adminstrator mode to allow connection");
                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
            }

        }
    }

}
