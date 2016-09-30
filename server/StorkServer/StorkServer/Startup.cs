﻿using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;
using System;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Threading;
using System.Web.Http;
using StorkServer.Business;
using System.Web.Http.Cors;

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
                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
            }
            
        }
    }
}
