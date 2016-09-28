using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Business {
    public class ServerResponse {

        public bool success { get; set; }
        public string message { get; set; }
        public Object payload { get; set; }

        public ServerResponse() {

        }

        public ServerResponse(bool success, string message, Object payload) {
            this.success = success;
            this.message = message;
            this.payload = payload;
        }
    }
}
